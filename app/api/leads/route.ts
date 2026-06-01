import { NextRequest, NextResponse } from 'next/server'
import { LeadSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase'
import { resend, FROM_ADDRESS, ADMISSIONS_EMAIL, leadConfirmationHtml, leadNotificationHtml } from '@/lib/resend'

// Rate limiting - only active when Upstash env vars are set
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
    return ratelimit.limit(`leads:${ip}`)
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
      await supabaseAdmin.from('leads').insert({
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
    }
  } catch {
    // Non-fatal - still send emails
  }

  // Send emails (non-blocking failures)
  try {
    await Promise.allSettled([
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
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
