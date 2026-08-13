import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
import { ContactSchema, type ContactInput } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS } from '@/lib/resend'
import { checkRateLimit } from '@/lib/rateLimit'
import { appendToSheet, SHEET_TABS, istTimestamp } from '@/lib/googleSheets'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'

  const { success: rateLimitOk } = await checkRateLimit(`contact:${ip}`)
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
    const supabaseAdmin = createAdminClient()
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from('contact_messages').insert({
        name:       data.name,
        email:      data.email,
        phone:      data.phone,
        subject:    data.subject,
        message:    data.message,
        ip_address: ip,
      })
      if (error) console.error('[contact] Supabase insert failed:', error.message)
    }
  } catch (err) {
    console.error('[contact] Supabase insert threw:', err)
  }

  // Fire the confirmation email and the Sheets row in the background - don't
  // make the visitor wait on either round trip before the button stops
  // spinning.
  waitUntil(notifyContactMessage(data, ip))

  return NextResponse.json({ success: true }, { status: 201 })
}

async function notifyContactMessage(data: ContactInput, ip: string) {
  const results = await Promise.allSettled([
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
              <a href="tel:+918035018677" style="color:#C04036">+91 80350 18677</a>
              (Mon-Sat, 9am-7pm IST).
            </p>
          </div>
          <div style="padding:16px 32px;background:#F9FAFB;font-size:12px;color:#9CA3AF">
            © ${new Date().getFullYear()} Vivekananda Global University. All rights reserved.
          </div>
        </div>
      `,
    }),
    appendToSheet(SHEET_TABS.CONTACT, [
      istTimestamp(),
      data.name,
      data.email,
      data.phone,
      data.subject,
      data.message,
      ip,
    ]),
  ])
  const labels = ['confirmation email', 'Sheets row']
  results.forEach((r, i) => {
    if (r.status === 'rejected') console.error(`[contact] ${labels[i]} failed:`, r.reason)
  })
}
