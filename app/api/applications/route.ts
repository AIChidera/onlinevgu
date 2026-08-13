import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
import { ApplicationSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS } from '@/lib/resend'
import { checkRateLimit } from '@/lib/rateLimit'
import { appendToSheet, SHEET_TABS, istTimestamp } from '@/lib/googleSheets'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'

  const { success: rateLimitOk } = await checkRateLimit(`applications:${ip}`)
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
      const { error } = await supabaseAdmin.from('applications').insert({
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
      if (error) console.error('[applications] Supabase insert failed:', error.message)
    }
  } catch (err) {
    console.error('[applications] Supabase insert threw:', err)
  }

  // Fire the confirmation email and the Sheets row in the background -
  // waitUntil keeps the function alive long enough to finish after the
  // response has already gone back to the browser.
  waitUntil(notifyApplication(data, ip))

  return NextResponse.json({ success: true }, { status: 201 })
}

async function notifyApplication(data: {
  name: string; email: string; phone: string
  level: 'ug' | 'pg'; programme: string; intake: string
  consent: boolean; source?: string
}, ip: string) {
  const results = await Promise.allSettled([
    resend.emails.send({
      from:    FROM_ADDRESS,
      to:      data.email,
      subject: 'Your VGU application has started',
      html:    confirmationHtml(data.name, data.programme),
    }),
    appendToSheet(SHEET_TABS.APPLICATIONS, [
      istTimestamp(),
      data.name,
      data.email,
      data.phone,
      data.level.toUpperCase(),
      data.programme,
      data.intake,
      data.consent ? 'Yes' : 'No',
      data.source ?? 'modal-apply',
      ip,
    ]),
  ])
  const labels = ['confirmation email', 'Sheets row']
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`[applications] ${labels[i]} failed:`, r.reason)
  })
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

