import { NextRequest, NextResponse } from 'next/server'
import { waitUntil } from '@vercel/functions'
import { LeadSchema, type LeadInput } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS, ADMISSIONS_EMAIL, leadConfirmationHtml, leadNotificationHtml } from '@/lib/resend'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1'

  const { success: rateLimitOk } = await checkRateLimit(`leads:${ip}`)
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

  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const data = parsed.data

  // Persist to Supabase
  try {
    const supabaseAdmin = createAdminClient()
    if (supabaseAdmin) {
      const { error } = await supabaseAdmin.from('leads').insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        program_interest: data.programInterest,
        source: data.source ?? 'website',
        intake: data.intake,
        utm_source: data.utmSource,
        utm_medium: data.utmMedium,
        utm_campaign: data.utmCampaign,
        ip_address: ip,
      })
      if (error) console.error('[leads] Supabase insert failed:', error.message)
    }
  } catch (err) {
    console.error('[leads] Supabase insert threw:', err)
  }

  // Fire emails in the background - don't make the visitor wait on Resend's
  // round trip before the button gets to stop spinning.
  waitUntil(sendLeadEmails(data))

  return NextResponse.json({ success: true }, { status: 201 })
}

async function sendLeadEmails(data: LeadInput) {
  try {
    const results = await Promise.allSettled([
      resend.emails.send({
        from: FROM_ADDRESS,
        to: data.email,
        subject: 'We received your enquiry - VGU Online',
        html: leadConfirmationHtml(data.name, data.programInterest ?? 'your chosen program'),
      }),
      resend.emails.send({
        from: FROM_ADDRESS,
        to: ADMISSIONS_EMAIL,
        subject: `New lead: ${data.name} - ${data.programInterest ?? 'Not specified'}`,
        html: leadNotificationHtml({
          name: data.name,
          email: data.email,
          phone: data.phone,
          program: data.programInterest ?? 'Not specified',
          source: data.source,
          utmSource: data.utmSource,
          utmCampaign: data.utmCampaign,
        }),
      }),
    ])
    results.forEach((r, i) => {
      if (r.status === 'rejected') console.error(`[leads] Email ${i === 0 ? 'to submitter' : 'to admissions'} failed:`, r.reason)
    })
  } catch (err) {
    console.error('[leads] Resend threw:', err)
  }
}
