import { Resend } from 'resend'

// Returns a Resend client only when the API key is configured.
// Returns a no-op stub at build time / when env var is missing.
let _resend: Resend | null = null

function getResend(): Resend {
  if (_resend) return _resend
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.warn('[resend] RESEND_API_KEY is not set — emails will not be sent')
    // Return a stub that silently no-ops
    return {
      emails: {
        send: async () => ({ data: null, error: null }),
      },
    } as unknown as Resend
  }
  _resend = new Resend(key)
  return _resend
}

export const resend = {
  emails: {
    send: (payload: Parameters<Resend['emails']['send']>[0]) =>
      getResend().emails.send(payload),
  },
}

export const FROM_ADDRESS   = 'Online VGU <noreply@onlinevgu.in>'
export const ADMISSIONS_EMAIL = 'admissions@onlinevgu.in'

// ── Templates ──────────────────────────────────────────────────

export function leadConfirmationHtml(name: string, program: string) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#C04036;padding:24px 32px">
        <h1 style="color:#fff;margin:0;font-size:22px">Online VGU</h1>
      </div>
      <div style="padding:32px;background:#fff">
        <h2 style="color:#111827">Hi ${name},</h2>
        <p style="color:#4B5563;line-height:1.7">
          Thanks for your interest in the <strong>${program}</strong> programme.
          An admissions advisor will call you within <strong>24 hours</strong>.
        </p>
        <p style="color:#4B5563;line-height:1.7">
          In the meantime, you can reach us at
          <a href="tel:+911800123456" style="color:#C04036">1800 123 456</a>
          (Mon–Sat, 9am–7pm IST).
        </p>
        <a href="https://onlinevgu.in/programs"
           style="display:inline-block;margin-top:24px;padding:14px 32px;
                  background:#C04036;color:#fff;border-radius:9999px;
                  text-decoration:none;font-weight:600">
          Explore programmes →
        </a>
      </div>
      <div style="padding:16px 32px;background:#F9FAFB;font-size:12px;color:#9CA3AF">
        © ${new Date().getFullYear()} Vivekananda Global University. All rights reserved.
      </div>
    </div>
  `
}

export function leadNotificationHtml(data: {
  name: string
  email: string
  phone: string
  program: string
  source?: string
  utmSource?: string
  utmCampaign?: string
}) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px">
      <h2 style="color:#C04036">New Lead — Online VGU</h2>
      <table style="width:100%;border-collapse:collapse">
        ${Object.entries(data)
          .map(
            ([k, v]) => `
          <tr>
            <td style="padding:8px 12px;background:#F9FAFB;font-weight:600;width:40%">${k}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #E5E7EB">${v ?? '—'}</td>
          </tr>`
          )
          .join('')}
      </table>
    </div>
  `
}
