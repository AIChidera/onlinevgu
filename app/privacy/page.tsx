import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Online VGU',
  description: 'How Vivekananda Global University collects, uses, and protects your personal data.',
  alternates: { canonical: 'https://onlinevgu.in/privacy' },
}

const LAST_UPDATED = 'June 2026'

export default function PrivacyPage() {
  return (
    <main className="bg-white">
      {/* Header */}
      <section
        className="py-16 px-5 md:px-8"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 50%, #110805 100%)' }}
      >
        <div className="mx-auto max-w-[760px]">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-4">
            Legal
          </p>
          <h1 className="font-heading font-bold text-[36px] md:text-[48px] tracking-[-1px] leading-[1.15] text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-[15px] font-body text-white/60">
            Last updated: {LAST_UPDATED}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-5 md:px-8">
        <div className="mx-auto max-w-[760px] font-body text-[16px] leading-[1.8] text-neutral-700">

          <p className="mb-8">
            Vivekananda Global University (&quot;VGU&quot;, &quot;we&quot;, &quot;us&quot;) operates the website{' '}
            <span className="font-semibold">onlinevgu.in</span>. This policy explains what personal data we
            collect when you use our website or contact us, how we use it, and your rights over it.
          </p>

          <Section title="1. What data we collect">
            <p>When you fill out any form on this website (enquiry, brochure request, contact form, or application), we collect:</p>
            <ul className="mt-3 flex flex-col gap-1.5 list-disc list-inside marker:text-vgu-red">
              <li>Your full name</li>
              <li>Email address</li>
              <li>Mobile phone number</li>
              <li>Program of interest and intended intake date</li>
              <li>Your IP address (for fraud prevention and rate limiting)</li>
              <li>Marketing attribution data (UTM source, medium, campaign) if you arrive via a link</li>
            </ul>
            <p className="mt-3">We do not collect payment information, government IDs, or sensitive personal data through this website.</p>
          </Section>

          <Section title="2. How we use your data">
            <ul className="flex flex-col gap-1.5 list-disc list-inside marker:text-vgu-red">
              <li>To respond to your enquiry and connect you with an admissions counsellor</li>
              <li>To send you the program brochure or other information you requested</li>
              <li>To send transactional emails confirming your enquiry or application</li>
              <li>To contact you by phone, WhatsApp, SMS, or email about your admission (you consent to this by submitting the form)</li>
              <li>To prevent spam and abuse via rate limiting</li>
            </ul>
            <p className="mt-3">
              We do not sell your data to third parties. We do not use it for advertising outside of our own admissions outreach.
            </p>
          </Section>

          <Section title="3. How we store your data">
            <p>
              Submitted form data is stored in a secure cloud database managed by{' '}
              <span className="font-semibold">Supabase</span> (database-as-a-service). Transactional
              emails are sent via <span className="font-semibold">Resend</span>. Both providers operate
              under industry-standard security practices including encryption in transit and at rest.
            </p>
            <p className="mt-3">
              Your data may be stored on servers outside India. By submitting a form on this website, you
              consent to this transfer.
            </p>
          </Section>

          <Section title="4. How long we keep your data">
            <p>
              Enquiry and lead data is retained for up to 3 years for admissions follow-up purposes, after
              which it is deleted unless you have enrolled or ongoing engagement with VGU.
            </p>
          </Section>

          <Section title="5. Your rights">
            <p>Under the Digital Personal Data Protection Act 2023 (India) and applicable law, you have the right to:</p>
            <ul className="mt-3 flex flex-col gap-1.5 list-disc list-inside marker:text-vgu-red">
              <li>Know what personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent to being contacted for marketing purposes</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email us at{' '}
              <a href="mailto:admissions@onlinevgu.in" className="text-vgu-red underline underline-offset-2">
                admissions@onlinevgu.in
              </a>{' '}
              with the subject line &quot;Privacy Request&quot;. We will respond within 30 days.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              This website does not currently use tracking cookies or third-party analytics. If this changes,
              this policy will be updated.
            </p>
          </Section>

          <Section title="7. Changes to this policy">
            <p>
              We may update this policy from time to time. The &quot;Last updated&quot; date at the top of this
              page reflects the most recent revision. Continued use of this website after changes constitutes
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              For privacy-related questions, write to us at:{' '}
              <a href="mailto:admissions@onlinevgu.in" className="text-vgu-red underline underline-offset-2">
                admissions@onlinevgu.in
              </a>
            </p>
            <address className="mt-3 not-italic text-neutral-600">
              Vivekananda Global University<br />
              VGU Campus, Jagatpura<br />
              Jaipur, Rajasthan - 303 012, India
            </address>
          </Section>

          <div className="mt-12 pt-8 border-t border-neutral-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-8 py-3.5 transition-all duration-200"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-heading font-bold text-[20px] text-neutral-900 mb-4 tracking-[-0.3px]">
        {title}
      </h2>
      {children}
    </div>
  )
}
