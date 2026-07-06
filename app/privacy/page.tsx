import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconShieldLock,
  IconClock,
  IconMail,
  IconMapPin,
  IconArrowLeft,
  IconCircleCheck,
  IconInfoCircle,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Online VGU',
  description:
    'How Vivekananda Global University collects, uses, and protects the personal data you share through the Online VGU platform.',
  alternates: { canonical: 'https://onlinevgu.in/privacy' },
}

const LAST_UPDATED = 'June 2026'
const CONTACT_EMAIL = 'admissions@onlinevgu.in'

const SECTIONS = [
  { id: 'data-collected',  num: '01', title: 'What data we collect' },
  { id: 'how-we-use',      num: '02', title: 'How we use your data' },
  { id: 'how-we-store',    num: '03', title: 'How we store your data' },
  { id: 'data-sharing',    num: '04', title: 'Data sharing' },
  { id: 'google-oauth',    num: '05', title: 'Google OAuth & API' },
  { id: 'retention',       num: '06', title: 'How long we keep your data' },
  { id: 'your-rights',     num: '07', title: 'Your rights' },
  { id: 'children',        num: '08', title: "Children's privacy" },
  { id: 'cookies',         num: '09', title: 'Cookies & tracking' },
  { id: 'changes',         num: '10', title: 'Changes to this policy' },
  { id: 'contact',         num: '11', title: 'Contact us' },
]

export default function PrivacyPage() {
  return (
    <main className="bg-white">

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #4a0d08 45%, #821a12 100%)' }}
      >
        <div aria-hidden="true" className="absolute -top-32 -right-24 h-[440px] w-[440px] rounded-full bg-vgu-red/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-40 -left-24 h-[380px] w-[380px] rounded-full bg-vgu-yellow/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-14 md:py-20 lg:py-24">
          <div className="max-w-[760px]">

            <div className="inline-flex items-center gap-2 mb-5 rounded-full bg-white/10 backdrop-blur-sm px-3.5 py-1.5 border border-white/15">
              <IconShieldLock size={14} className="text-vgu-yellow" stroke={2} />
              <span className="text-[11px] md:text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-white/90">
                Legal · Privacy
              </span>
            </div>

            <h1 className="font-heading font-bold text-[36px] md:text-[52px] lg:text-[60px] tracking-[-1px] leading-[1.1] text-white mb-4 md:mb-5">
              Privacy <span className="text-vgu-yellow">Policy</span>
            </h1>

            <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/75 max-w-[620px]">
              How Vivekananda Global University collects, uses, and protects the personal
              data you share through the Online VGU platform.
            </p>

            <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] md:text-[13px] font-body text-white/55">
              <span className="flex items-center gap-2">
                <IconClock size={14} stroke={2} className="text-vgu-yellow/80" />
                Last updated: {LAST_UPDATED}
              </span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span>Governed by the DPDP Act, 2023 (India) · GDPR · CCPA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">

          {/* Sticky TOC - desktop only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-4">
                On this page
              </p>
              <nav>
                <ul className="flex flex-col gap-2.5">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-baseline gap-2.5 text-[13px] font-body text-neutral-500 hover:text-vgu-red transition-colors duration-150"
                      >
                        <span className="font-heading font-semibold text-[11px] text-neutral-300 group-hover:text-vgu-red/70 transition-colors w-5 flex-none">
                          {s.num}
                        </span>
                        <span className="leading-[1.45]">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Article */}
          <article className="max-w-[720px] font-body text-[16px] leading-[1.8] text-neutral-700">

            {/* Lead */}
            <div className="mb-10 md:mb-12">
              <p className="text-[17px] md:text-[18px] leading-[1.75] text-neutral-700 text-justify">
                Vivekananda Global University (<span className="font-semibold text-neutral-900">&quot;VGU&quot;</span>,{' '}
                <span className="font-semibold text-neutral-900">&quot;we&quot;</span>,{' '}
                <span className="font-semibold text-neutral-900">&quot;us&quot;</span>) provides the{' '}
                <span className="font-heading font-semibold text-vgu-red">Online VGU</span> LMS platform
                at <span className="font-heading font-semibold text-vgu-red">onlinevgu.in</span>. We are committed to
                protecting your personal data and respecting your privacy in accordance with the Digital Personal Data
                Protection Act, 2023 (India), GDPR, CCPA, and the Google API Services User Data Policy.
              </p>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.75] text-neutral-700 text-justify">
                This policy explains what personal data we collect when you use our platform, how we use it, and
                the rights you have over it.
              </p>
            </div>

            {/* 01 */}
            <Section id="data-collected" num="01" title="What data we collect">
              <p className="mb-3 font-semibold text-neutral-800">Personal information</p>
              <RedBulletList
                items={[
                  'Full name, email address, and mobile phone number',
                  'Profile picture (if provided)',
                  'Program of interest and intended intake date',
                  'IP address (for fraud prevention and rate limiting)',
                  'Basic device data such as browser type and access time',
                  'Marketing attribution data (UTM source, medium, campaign) if you arrive via a link',
                ]}
              />
              <p className="mt-5 mb-3 font-semibold text-neutral-800">Academic information (enrolled students)</p>
              <RedBulletList
                items={[
                  'Courses enrolled in, session records, and attendance',
                  'Assignment submissions, grades, and academic progress',
                  'Learning activity and dashboard personalisation data',
                ]}
              />
              <Callout tone="muted">
                We do not collect payment card details, government IDs, or other sensitive personal data directly
                through this platform.
              </Callout>
            </Section>

            {/* 02 */}
            <Section id="how-we-use" num="02" title="How we use your data">
              <RedBulletList
                items={[
                  'To respond to your enquiry and connect you with an admissions counsellor',
                  'To send you the program brochure or information you requested',
                  'To send transactional emails confirming your enquiry or application',
                  'To contact you by phone, WhatsApp, SMS, or email about your admission (you consent to this by submitting the form)',
                  'To manage academic progress, attendance tracking, and grade reporting',
                  'To personalise your LMS dashboard and learning recommendations',
                  'To provide access to secure platform features such as Google Calendar sync and email notifications',
                  'To respond to support queries and feedback',
                  'To prevent spam and abuse via rate limiting',
                ]}
              />
              <Callout tone="emphasis">
                We do not sell your data to third parties. We do not use it for advertising outside of our own
                admissions outreach.
              </Callout>
            </Section>

            {/* 03 */}
            <Section id="how-we-store" num="03" title="How we store your data">
              <p>
                Submitted form and profile data is stored in a secure cloud database managed by{' '}
                <span className="font-semibold text-neutral-900">Supabase</span>. Transactional emails are sent
                via <span className="font-semibold text-neutral-900">Resend</span>. Both providers operate under
                industry-standard security practices including encryption in transit and at rest.
              </p>
              <p className="mt-3">
                Your data may be stored on servers located outside India. By creating an account or submitting a
                form on this platform, you consent to this transfer.
              </p>
            </Section>

            {/* 04 */}
            <Section id="data-sharing" num="04" title="Data sharing">
              <p>We do not sell or rent your data. Your data may be shared only with:</p>
              <RedBulletList
                items={[
                  'Authorised VGU admissions counsellors, faculty, and university administrators handling your application or studies',
                  'Service providers under strict data-processing agreements (cloud infrastructure, email delivery, LMS services)',
                  'Authorities or courts where required to comply with legal obligations',
                ]}
              />
            </Section>

            {/* 05 */}
            <Section id="google-oauth" num="05" title="Google OAuth & API">
              <p>
                If you sign in to the Online VGU platform using your Google Account, we use{' '}
                <span className="font-semibold text-neutral-900">OAuth 2.0</span> to authenticate your identity.
                We access your Google profile (name and email address) only with your explicit consent.
              </p>
              <RedBulletList
                items={[
                  'We use your Google profile name and email only to create and identify your platform account',
                  'We do not store or share your Google data with third parties',
                  'We do not access your Gmail, Drive, or any other Google service beyond what you explicitly grant',
                  'Google Calendar sync, if enabled, is used solely to display your class schedule and academic events',
                  'You may revoke Google access at any time from your Google Account settings',
                ]}
              />
              <Callout tone="muted">
                Our use of Google API data complies fully with the{' '}
                <span className="font-semibold">Google API Services User Data Policy</span>, including the
                Limited Use requirements.
              </Callout>
            </Section>

            {/* 06 */}
            <Section id="retention" num="06" title="How long we keep your data">
              <p>
                Enquiry and lead data is retained for up to{' '}
                <span className="font-semibold text-neutral-900">3 years</span> for admissions follow-up, after
                which it is deleted unless you have enrolled or have ongoing engagement with VGU.
              </p>
              <p className="mt-3">
                If you enrol, your academic data is retained for the duration of your studies and as required by
                university record-keeping and accreditation policies. You may request deletion of non-academic
                personal data at any time.
              </p>
            </Section>

            {/* 07 */}
            <Section id="your-rights" num="07" title="Your rights">
              <p>
                Under the Digital Personal Data Protection Act, 2023 (India) and applicable law, you have the
                right to:
              </p>
              <RedBulletList
                items={[
                  'Know what personal data we hold about you',
                  'Request correction of inaccurate data',
                  'Request deletion of your data',
                  'Withdraw consent to being contacted for marketing purposes',
                  'Request an export of your data in a portable format',
                  'Contact our Data Protection Officer with any concerns',
                ]}
              />
              <RightsCard email={CONTACT_EMAIL} />
            </Section>

            {/* 08 */}
            <Section id="children" num="08" title="Children's privacy">
              <p>
                This platform is intended for use by adults aged{' '}
                <span className="font-semibold text-neutral-900">18 years or older</span>. We do not knowingly
                collect personal data from minors. If you believe a minor has submitted information through this
                platform, please contact us immediately so we can delete it.
              </p>
            </Section>

            {/* 09 */}
            <Section id="cookies" num="09" title="Cookies & tracking">
              <p>
                We use cookies and similar tracking technologies to operate and improve the Online VGU platform.
                These include:
              </p>
              <RedBulletList
                items={[
                  'Essential cookies required for authentication, session management, and platform security',
                  'Analytics cookies to understand how learners navigate and use the platform (e.g., page views, feature usage)',
                  'Preference cookies to remember your settings such as language and dashboard layout',
                  'Google Calendar sync tokens, stored only if you explicitly connect your Google Calendar',
                ]}
              />
              <p className="mt-4">
                You may manage or disable non-essential cookies through your browser settings. Disabling essential
                cookies may affect platform functionality. Our full cookie list will be detailed in a cookie
                banner on first visit.
              </p>
            </Section>

            {/* 10 */}
            <Section id="changes" num="10" title="Changes to this policy">
              <p>
                We may update this policy from time to time. The{' '}
                <span className="font-semibold text-neutral-900">&quot;Last updated&quot;</span> date at the top
                of this page reflects the most recent revision. Continued use of this platform after changes
                constitutes acceptance of the updated policy.
              </p>
            </Section>

            {/* 11 */}
            <Section id="contact" num="11" title="Contact us" last>
              <p>
                For privacy-related questions, data requests, or to reach our Data Protection Officer, please
                use the details below.
              </p>
              <ContactCard email={CONTACT_EMAIL} />
            </Section>

            {/* Back to home */}
            <div className="mt-12 pt-8 border-t border-neutral-200">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md border-2 border-vgu-red bg-white text-vgu-red hover:bg-vgu-red hover:text-white font-heading font-semibold text-[15px] px-6 py-3 transition-all duration-200 whitespace-nowrap"
              >
                <IconArrowLeft size={16} stroke={2.25} />
                Back to Home
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  )
}

/* ─── Subcomponents ───────────────────────────────────────── */

function Section({
  id,
  num,
  title,
  children,
  last,
}: {
  id: string
  num: string
  title: string
  children: React.ReactNode
  last?: boolean
}) {
  return (
    <section id={id} className={`scroll-mt-24 ${last ? '' : 'mb-12 md:mb-14'}`}>
      <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
        <div
          className="flex-none w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center text-white font-heading font-bold text-[13px] md:text-[14px]"
          style={{
            background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)',
            boxShadow: '0 6px 16px rgba(192,64,54,0.25)',
          }}
        >
          {num}
        </div>
        <h2 className="font-heading font-bold text-[20px] md:text-[26px] text-neutral-900 tracking-[-0.4px] leading-[1.25]">
          {title}
        </h2>
      </div>
      <div className="md:pl-[60px]">{children}</div>
    </section>
  )
}

function RedBulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 flex flex-col gap-2.5">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <span aria-hidden="true" className="flex-none mt-[10px] h-1.5 w-1.5 rounded-full bg-vgu-red" />
          <span className="leading-[1.65]">{it}</span>
        </li>
      ))}
    </ul>
  )
}

function Callout({ tone, children }: { tone: 'muted' | 'emphasis'; children: React.ReactNode }) {
  if (tone === 'emphasis') {
    return (
      <div className="mt-5 flex items-start gap-3 rounded-xl border border-vgu-red/15 bg-vgu-red/[0.04] p-4 md:p-5">
        <IconCircleCheck size={20} stroke={2} className="flex-none mt-0.5 text-vgu-red" />
        <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-800 font-medium">{children}</p>
      </div>
    )
  }
  return (
    <div className="mt-5 flex items-start gap-3 rounded-xl border border-neutral-200 bg-neutral-50 p-4 md:p-5">
      <IconInfoCircle size={20} stroke={2} className="flex-none mt-0.5 text-neutral-500" />
      <p className="text-[14px] md:text-[15px] leading-[1.65] text-neutral-700">{children}</p>
    </div>
  )
}

function RightsCard({ email }: { email: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-vgu-yellow/40 bg-vgu-yellow/[0.10] p-5 md:p-6">
      <p className="font-heading font-semibold text-[15px] md:text-[16px] text-neutral-900 mb-2">
        How to exercise your rights
      </p>
      <p className="text-[14px] md:text-[15px] leading-[1.7] text-neutral-700">
        Email us with the subject line{' '}
        <span className="font-semibold text-neutral-900">&quot;Privacy Request&quot;</span> and we will
        respond within 30 days.
      </p>
      <a
        href={`mailto:${email}?subject=Privacy%20Request`}
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-vgu-red hover:bg-white border-2 border-vgu-red text-white hover:text-vgu-red font-heading font-semibold text-[13px] md:text-[14px] px-5 py-2.5 transition-all duration-200 whitespace-nowrap"
      >
        <IconMail size={15} stroke={2.25} />
        {email}
      </a>
    </div>
  )
}

function ContactCard({ email }: { email: string }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Email tile - clickable, red-tinted shadow always visible */}
      <a
        href={`mailto:${email}`}
        className="group flex items-start gap-4 rounded-2xl bg-white p-5 md:p-6
                   border border-vgu-red/15
                   shadow-[0_8px_28px_rgba(192,64,54,0.14)]
                   hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(192,64,54,0.24)]
                   transition-all duration-300"
      >
        <div
          className="flex-none w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
          style={{ background: 'linear-gradient(135deg,#C04036,#821a12)', boxShadow: '0 6px 18px rgba(192,64,54,0.35)' }}
        >
          <IconMail size={20} stroke={2} className="text-white" />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5">
            Data Protection Officer
          </p>
          <p className="font-heading font-bold text-[14px] md:text-[15px] text-neutral-900 group-hover:text-vgu-red transition-colors duration-200 break-all leading-snug">
            {email}
          </p>
        </div>
      </a>

      {/* Address tile */}
      <div
        className="flex items-start gap-4 rounded-2xl bg-white p-5 md:p-6
                   border border-neutral-100
                   shadow-[0_8px_28px_rgba(17,24,39,0.09)]
                   hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(17,24,39,0.14)]
                   transition-all duration-300"
      >
        <div
          className="flex-none w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#C04036,#821a12)', boxShadow: '0 6px 18px rgba(192,64,54,0.35)' }}
        >
          <IconMapPin size={20} stroke={2} className="text-white" />
        </div>
        <div className="min-w-0 pt-0.5">
          <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-neutral-400 mb-1.5">
            Postal address
          </p>
          <address className="not-italic text-[13px] md:text-[14px] leading-[1.6] text-neutral-700 font-body">
            Vivekananda Global University<br />
            VGU Campus, Jagatpura<br />
            Jaipur, Rajasthan - 303 012, India
          </address>
        </div>
      </div>
    </div>
  )
}
