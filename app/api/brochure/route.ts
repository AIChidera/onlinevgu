import { NextRequest, NextResponse } from 'next/server'
import { BrochureSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS, ADMISSIONS_EMAIL } from '@/lib/resend'

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

  try {
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: `Your VGU brochure for ${data.programInterest}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;margin:0 auto">
            <h2>Hi ${data.name},</h2>
            <p>Thank you for your interest in <strong>${data.programInterest}</strong> at Vivekananda Global University.</p>
            <p>Your program brochure is attached to this email. It contains the full curriculum, fee structure, admission process, and placement statistics.</p>
            <p>A counsellor may reach out to answer any questions. You can also call us at <strong>1800 123 456</strong> (toll-free, Mon–Sat 9am–7pm IST).</p>
            <p style="margin-top:32px;color:#666;font-size:13px">
              Vivekananda Global University · admissions@onlinevgu.in · 1800 123 456
            </p>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMISSIONS_EMAIL,
        subject: `Brochure request: ${data.name} — ${data.programInterest}`,
        html: `
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Program:</strong> ${data.programInterest}</p>
        `,
      }),
    ])
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
