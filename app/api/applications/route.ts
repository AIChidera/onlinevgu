import { NextRequest, NextResponse } from 'next/server'
import { ApplicationSchema } from '@/lib/validations'
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
    return ratelimit.limit(`applications:${ip}`)
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

  const parsed = ApplicationSchema.safeParse(body)
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
      await supabaseAdmin.from('applications').insert({
        name:       data.name,
        email:      data.email,
        phone:      data.phone,
        level:      data.level,
        programme:  data.programme,
        intake:     data.intake,
        consent:    data.consent,
        source:     data.source ?? 'modal-apply',
        ip_address: ip,
      })
    }
  } catch {
    // Non-fatal - still send emails
  }

  try {
    await Promise.allSettled([
      resend.emails.send({
        from:    FROM_ADDRESS,
        to:      data.email,
        subject: 'Your VGU application has started',
        html:    confirmationHtml(data.name, data.programme),
      }),
      resend.emails.send({
        from:    FROM_ADDRESS,
        to:      ADMISSIONS_EMAIL,
        subject: `New application: ${data.name} - ${data.programme} (${data.level.toUpperCase()})`,
        html:    notificationHtml(data),
      }),
    ])
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ success: true }, { status: 201 })
}

function confirmationHtml(name: string, programme: string): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#C04036;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px">Online VGU</h1>
      </div>
      <div style="padding:32px;background:#fff">
        <h2 style="color:#111827">Hi ${name},</h2>
        <p style="color:#4B5563;line-height:1.7">
          Your application for <strong>${programme}</strong> at Vivekananda Global University
          has been received.
        </p>
        <p style="color:#4B5563;line-height:1.7">
          A VGU admissions counsellor will call you within 2 hours to walk you through the
          next steps. You can also reach us at
          <a href="tel:+918035018677" style="color:#C04036">+91 80350 18677</a>
          (Mon-Sat, 9am-7pm IST).
        </p>
        <div style="margin:24px 0;background:#F9FAFB;border-left:4px solid #C04036;padding:16px 20px">
          <p style="margin:0;font-size:13px;color:#6B7280">What happens next</p>
          <ul style="margin:8px 0 0;padding-left:20px;color:#374151;line-height:1.9;font-size:14px">
            <li>A counsellor calls you within 2 hours</li>
            <li>Document checklist sent to this email</li>
            <li>Enrolment completed in under 30 minutes</li>
          </ul>
        </div>
      </div>
      <div style="padding:16px 32px;background:#F9FAFB;font-size:12px;color:#9CA3AF">
        &copy; ${new Date().getFullYear()} Vivekananda Global University. All rights reserved.
      </div>
    </div>
  `
}

function notificationHtml(data: {
  name: string; email: string; phone: string
  level: string; programme: string; intake: string
}): string {
  const row = (label: string, value: string, highlight = false) => `
    <tr>
      <td style="padding:10px 12px;color:#6B7280;font-size:13px;white-space:nowrap">${label}</td>
      <td style="padding:10px 12px;color:${highlight ? '#C04036' : '#111827'};font-size:14px;font-weight:${highlight ? 700 : 400}">${value}</td>
    </tr>`
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#111827;padding:16px 24px">
        <p style="color:#9CA3AF;margin:0;font-size:11px;text-transform:uppercase;letter-spacing:0.08em">New Application - Online VGU</p>
      </div>
      <div style="padding:24px;background:#fff">
        <table style="width:100%;border-collapse:collapse">
          ${row('Name',      data.name)}
          ${row('Email',     data.email)}
          ${row('Phone',     data.phone)}
          ${row('Level',     data.level.toUpperCase())}
          ${row('Programme', data.programme, true)}
          ${row('Intake',    data.intake)}
        </table>
      </div>
    </div>
  `
}
