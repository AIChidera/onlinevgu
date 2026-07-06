import { NextRequest, NextResponse } from 'next/server'
import { BrochureSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS, ADMISSIONS_EMAIL } from '@/lib/resend'
import { getBrochureUrlForProgram } from '@/lib/sanity'

// Downloads the PDF from Sanity's CDN so it can be attached to the email.
// Skips silently on failure (request still succeeds without attachment).
async function fetchBrochureAttachment(programName: string) {
  try {
    const { url, filename } = await getBrochureUrlForProgram(programName)
    if (!url) return null
    const resp = await fetch(url)
    if (!resp.ok) return null
    const buf = Buffer.from(await resp.arrayBuffer())
    // Resend rejects attachments over ~10MB; skip if oversized to keep the
    // email sending instead of failing the whole submission.
    if (buf.byteLength > 10 * 1024 * 1024) {
      console.warn(`[brochure] PDF for ${programName} exceeds 10MB, skipping attach`)
      return null
    }
    return { filename, content: buf }
  } catch (e) {
    console.warn(`[brochure] attachment fetch failed: ${(e as Error).message}`)
    return null
  }
}

async function checkRateLimit(ip: string): Promise<{ success: boolean }> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return { success: true }

  try {
    const { Ratelimit } = await import('@upstash/ratelimit')
    const { Redis } = await import('@upstash/redis')
    const redis = new Redis({ url, token })
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, '10 m'),
      analytics: false,
    })
    return ratelimit.limit(`brochure:${ip}`)
  } catch {
    return { success: true }
  }
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'

  const { success: rateLimitOk } = await checkRateLimit(ip)
  if (!rateLimitOk) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = BrochureSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data

  try {
    const supabaseAdmin = createAdminClient()
    if (supabaseAdmin) {
      await supabaseAdmin.from('brochure_requests').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        program_interest: data.programInterest,
        ip_address: ip,
      })
    }
  } catch {
    // Non-fatal
  }

  // Pull the right PDF from Sanity (per-program → defaults to siteSettings).
  // Runs in parallel with the email composition for minimal added latency.
  const attachment = await fetchBrochureAttachment(data.programInterest)

  const bodyCopy = attachment
    ? `Your <strong>${data.programInterest}</strong> brochure is attached to this email.
       It covers the full curriculum, fee structure, eligibility, and placement statistics.`
    : `Thank you for your interest in <strong>${data.programInterest}</strong> at
       Vivekananda Global University. Our admissions team will send your program
       brochure to this email shortly.`

  try {
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: `Your VGU brochure for ${data.programInterest}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#C04036;padding:24px 32px">
              <h1 style="color:#fff;margin:0;font-size:22px">Online VGU</h1>
            </div>
            <div style="padding:32px;background:#fff">
              <h2 style="color:#111827">Hi ${data.name},</h2>
              <p style="color:#4B5563;line-height:1.7">${bodyCopy}</p>
              <p style="color:#4B5563;line-height:1.7">
                A counsellor may reach out to answer any questions.
                You can also call us at
                <a href="tel:+918035018677" style="color:#C04036">+91 80350 18677</a>
                (Mon-Sat, 9am-7pm IST).
              </p>
            </div>
            <div style="padding:16px 32px;background:#F9FAFB;font-size:12px;color:#9CA3AF">
              © ${new Date().getFullYear()} Vivekananda Global University. All rights reserved.
            </div>
          </div>
        `,
        ...(attachment ? { attachments: [attachment] } : {}),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMISSIONS_EMAIL,
        subject: `Brochure request: ${data.name} - ${data.programInterest}`,
        html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Program:</strong> ${data.programInterest}</p>
          <p><strong>PDF sent:</strong> ${attachment ? attachment.filename : 'No PDF on file - admin to follow up'}</p>
        `,
      }),
    ])
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
