import { NextRequest, NextResponse } from 'next/server'
import { ContactSchema } from '@/lib/validations'
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
    return ratelimit.limit(`contact:${ip}`)
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

  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data

  try {
    await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: `We received your message - VGU Online`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#C04036;padding:24px 32px">
              <h1 style="color:#fff;margin:0;font-size:22px">Online VGU</h1>
            </div>
            <div style="padding:32px;background:#fff">
              <h2 style="color:#111827">Hi ${data.name},</h2>
              <p style="color:#4B5563;line-height:1.7">
                Thanks for reaching out. We have received your message and will
                respond within <strong>24 hours</strong>.
              </p>
              <p style="color:#4B5563;line-height:1.7">
                For urgent enquiries, call us at
                <a href="tel:+911800123456" style="color:#C04036">1800 123 456</a>
                (Mon-Sat, 9am-7pm IST).
              </p>
            </div>
            <div style="padding:16px 32px;background:#F9FAFB;font-size:12px;color:#9CA3AF">
              © ${new Date().getFullYear()} Vivekananda Global University. All rights reserved.
            </div>
          </div>
        `,
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMISSIONS_EMAIL,
        subject: `Contact form: ${data.subject} - ${data.name}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px">
            <h2 style="color:#C04036">Contact Form Submission</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="border-left:3px solid #C04036;margin:0;padding:12px 16px;background:#F9FAFB;color:#374151">
              ${data.message.replace(/\n/g, '<br>')}
            </blockquote>
          </div>
        `,
      }),
    ])
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
