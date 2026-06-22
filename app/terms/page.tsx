import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconFileText,
  IconClock,
  IconMail,
  IconMapPin,
  IconArrowLeft,
  IconCircleCheck,
  IconInfoCircle,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Online VGU',
  description:
    'The terms and conditions governing your use of the Online VGU platform and website operated by Vivekananda Global University.',
  alternates: { canonical: 'https://onlinevgu.in/terms' },
}

const LAST_UPDATED = 'June 2026'
const CONTACT_EMAIL = 'admissions@onlinevgu.in'

const SECTIONS = [
  { id: 'acceptance',       num: '01', title: 'Acceptance of terms' },
  { id: 'eligibility',      num: '02', title: 'Who may use this platform' },
  { id: 'enquiries',        num: '03', title: 'Admissions enquiries & forms' },
  { id: 'lms-use',          num: '04', title: 'LMS use & student responsibilities' },
  { id: 'academic',         num: '05', title: 'Academic integrity' },
  { id: 'ip',               num: '06', title: 'Intellectual property' },
  { id: 'third-party',      num: '07', title: 'Third-party services' },
  { id: 'fees',             num: '08', title: 'Fees & payments' },
  { id: 'liability',        num: '09', title: 'Limitation of liability' },
  { id: 'suspension',       num: '10', title: 'Suspension & termination' },
  { id: 'governing-law',    num: '11', title: 'Governing law & jurisdiction' },
  { id: 'changes',          num: '12', title: 'Changes to these terms' },
  { id: 'contact',          num: '13', title: 'Contact us' },
]

export default function TermsPage() {
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
              <IconFileText size={14} className="text-vgu-yellow" stroke={2} />
              <span className="text-[11px] md:text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-white/90">
                Legal · Terms
              </span>
            </div>

            <h1 className="font-heading font-bold text-[36px] md:text-[52px] lg:text-[60px] tracking-[-1px] leading-[1.1] text-white mb-4 md:mb-5">
              Terms &amp; <span className="text-vgu-yellow">Conditions</span>
            </h1>

            <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/75 max-w-[620px]">
              The terms governing your use of the Online VGU website and LMS platform
              operated by Vivekananda Global University.
            </p>

            <div className="mt-6 md:mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] md:text-[13px] font-body text-white/55">
              <span className="flex items-center gap-2">
                <IconClock size={14} stroke={2} className="text-vgu-yellow/80" />
                Last updated: {LAST_UPDATED}
              </span>
              <span className="hidden sm:inline text-white/20">·</span>
              <span>Governed by the laws of India · Jurisdiction: Jaipur, Rajasthan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="py-12 md:py-16 lg:py-20 px-5 md:px-8 lg:px-12">
        <div className="mx-auto max-w-[1280px] grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8 lg:gap-16">

          {/* Sticky TOC — desktop only */}
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
                These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the{' '}
                <span className="font-heading font-semibold text-vgu-red">Online VGU</span> website and LMS
                platform at <span className="font-heading font-semibold text-vgu-red">onlinevgu.in</span>,
                operated by{' '}
                <span className="font-semibold text-neutral-900">Vivekananda Global University</span>{' '}
                (&quot;VGU&quot;, &quot;we&quot;, &quot;us&quot;), a NAAC A+ accredited university based in
                Jaipur, Rajasthan, India.
              </p>
              <p className="mt-4 text-[16px] md:text-[17px] leading-[1.75] text-neutral-700">
                By accessing this website, submitting an enquiry, or creating an account on the platform, you
                confirm that you have read, understood, and agreed to be bound by these Terms. If you do not
                agree, please do not use the platform.
              </p>
            </div>

            {/* 01 */}
            <Section id="acceptance" num="01" title="Acceptance of terms">
              <p>
                By accessing or using any part of the Online VGU platform - including the public website,
                enquiry forms, student portal, or LMS - you enter into a binding agreement with VGU under
                these Terms. Your continued use following any update to these Terms constitutes acceptance of
                the revised version.
              </p>
              <p className="mt-3 text-justify">
                These Terms apply to all visitors, prospective students, enrolled students, faculty, and
                any other authorised users of the platform.
              </p>
            </Section>

            {/* 02 */}
            <Section id="eligibility" num="02" title="Who may use this platform">
              <p>
                Use of the Online VGU platform is restricted to individuals who meet all of the following
                criteria:
              </p>
              <RedBulletList
                items={[
                  'Aged 18 years or older',
                  'Legally capable of entering into a binding contract under applicable law',
                  'Accessing the platform for lawful purposes only',
                  'For LMS and student portal access: enrolled students, registered faculty, or authorised VGU staff',
                ]}
              />
              <p className="mt-4">
                VGU reserves the right to verify eligibility and to deny access to any person who does not
                meet these requirements.
              </p>
            </Section>

            {/* 03 */}
            <Section id="enquiries" num="03" title="Admissions enquiries & forms">
              <p>
                When you submit an enquiry, brochure request, or application form on this website, you
                acknowledge and agree that:
              </p>
              <RedBulletList
                items={[
                  'The information you provide is accurate, complete, and current',
                  'VGU or its authorised admissions counsellors may contact you by phone, WhatsApp, SMS, or email to follow up on your enquiry',
                  'Submitting an enquiry does not constitute an offer of admission or guarantee of enrolment',
                  'Admission is subject to eligibility criteria, seat availability, and VGU\'s admissions policies in force at the time of application',
                  'Programme fees, intake dates, and other details displayed on this website are indicative and subject to change without prior notice',
                ]}
              />
              <Callout tone="muted">
                For confirmed fee structures and admission requirements, please speak with an admissions
                counsellor or refer to the official VGU prospectus.
              </Callout>
            </Section>

            {/* 04 */}
            <Section id="lms-use" num="04" title="LMS use & student responsibilities">
              <p>
                As an enrolled student or authorised user of the Online VGU LMS, you agree to:
              </p>
              <RedBulletList
                items={[
                  'Use the platform solely for academic and administrative purposes related to your enrolled programme',
                  'Keep your login credentials confidential and not share them with any other person',
                  'Notify VGU immediately at admissions@onlinevgu.in if you suspect unauthorised access to your account',
                  'Not attempt to disrupt, overload, or otherwise interfere with the platform\'s infrastructure or availability',
                  'Not scrape, copy, or harvest content from the platform using automated tools',
                  'Comply with all applicable VGU student regulations, codes of conduct, and examination rules',
                  'Report any technical issues, errors, or security concerns to the support team promptly',
                ]}
              />
            </Section>

            {/* 05 */}
            <Section id="academic" num="05" title="Academic integrity">
              <p>
                VGU upholds the highest standards of academic integrity. As a student on this platform, you
                agree that:
              </p>
              <RedBulletList
                items={[
                  'All assignments, assessments, and examination submissions are your own original work unless explicitly stated otherwise',
                  'You will not engage in plagiarism, cheating, impersonation, or any other form of academic dishonesty',
                  'You will not use AI-generated content, proxy candidates, or third-party services to complete assessments on your behalf',
                  'Breaches of academic integrity may result in grade penalties, suspension, or permanent expulsion from the programme',
                ]}
              />
              <Callout tone="emphasis">
                Academic misconduct is taken seriously and investigated under VGU&apos;s Academic Integrity
                Policy. VGU uses plagiarism detection and proctoring tools as part of its assessment process.
              </Callout>
            </Section>

            {/* 06 */}
            <Section id="ip" num="06" title="Intellectual property">
              <p>
                All content made available through the Online VGU platform - including but not limited to
                course materials, lecture videos, study guides, assessments, platform UI, graphics, and
                branding - is the intellectual property of Vivekananda Global University or its licensed
                content partners.
              </p>
              <RedBulletList
                items={[
                  'You may access and use platform content solely for your personal, non-commercial, educational purposes',
                  'You may not reproduce, distribute, modify, create derivative works from, or publicly display any platform content without prior written permission from VGU',
                  'Recording or screenshotting live or pre-recorded classes for redistribution is strictly prohibited',
                  'The Online VGU name, logo, and brand assets are trademarks of VGU and may not be used without written consent',
                ]}
              />
            </Section>

            {/* 07 */}
            <Section id="third-party" num="07" title="Third-party services">
              <p>
                The Online VGU platform integrates with third-party services to enhance your learning
                experience. These currently include:
              </p>
              <RedBulletList
                items={[
                  'Google OAuth 2.0 for account authentication',
                  'Google Calendar for class schedule and event synchronisation',
                  'Coursera for access to 7,000+ supplementary online courses',
                  'Supabase for secure data storage',
                  'Resend for transactional email delivery',
                ]}
              />
              <p className="mt-4">
                Your use of these third-party services is governed by their respective terms of service and
                privacy policies. VGU is not responsible for the availability, content, or conduct of any
                third-party service, or for any loss or damage arising from your use of them.
              </p>
              <p className="mt-3">
                Links to external websites from this platform do not imply VGU&apos;s endorsement of those
                sites or their content.
              </p>
            </Section>

            {/* 08 */}
            <Section id="fees" num="08" title="Fees & payments">
              <p>
                Programme fees are set by VGU and communicated to students at the time of admission.
                By enrolling, you agree that:
              </p>
              <RedBulletList
                items={[
                  'Fees are due as per the payment schedule provided in your admission offer letter',
                  'Late payments may attract penalties as per VGU\'s fee policy',
                  'Fees paid are non-refundable except as provided under VGU\'s Refund Policy (available on request)',
                  'VGU reserves the right to revise fee structures for future academic years with reasonable notice',
                  'Non-payment of fees may result in suspension of LMS access and academic records being withheld',
                ]}
              />
              <Callout tone="muted">
                Fee payments are processed through VGU&apos;s official payment gateway. Never make payments
                to any account not officially communicated by VGU. Contact admissions@onlinevgu.in to
                verify payment details.
              </Callout>
            </Section>

            {/* 09 */}
            <Section id="liability" num="09" title="Limitation of liability">
              <p>
                The Online VGU platform is provided on an{' '}
                <span className="font-semibold text-neutral-900">&quot;as is&quot;</span> and{' '}
                <span className="font-semibold text-neutral-900">&quot;as available&quot;</span> basis.
                To the fullest extent permitted by applicable law:
              </p>
              <RedBulletList
                items={[
                  'VGU makes no warranties, express or implied, regarding the platform\'s availability, accuracy, or fitness for a particular purpose',
                  'VGU is not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the platform',
                  'VGU is not responsible for any loss of data, interruption of service, or security breach caused by circumstances beyond its reasonable control',
                  'In no event shall VGU\'s total liability to you exceed the fees paid by you to VGU in the 12 months preceding the event giving rise to the claim',
                ]}
              />
            </Section>

            {/* 10 */}
            <Section id="suspension" num="10" title="Suspension & termination">
              <p>
                VGU reserves the right to suspend, restrict, or permanently terminate your access to the
                Online VGU platform at its discretion, including in cases of:
              </p>
              <RedBulletList
                items={[
                  'Violation of any provision of these Terms',
                  'Academic misconduct or breach of the VGU student code of conduct',
                  'Non-payment of programme fees',
                  'Any conduct that VGU determines, in its sole judgement, to be harmful to the platform, other users, or the university',
                  'A requirement by applicable law or a court order',
                ]}
              />
              <p className="mt-4">
                Upon termination, your right to access the platform ceases immediately. Sections of these
                Terms that by their nature should survive termination (including intellectual property,
                limitation of liability, and governing law) will continue to apply.
              </p>
            </Section>

            {/* 11 */}
            <Section id="governing-law" num="11" title="Governing law & jurisdiction">
              <p>
                These Terms are governed by and construed in accordance with the laws of India. Any dispute
                arising out of or in connection with these Terms - including any question regarding their
                existence, validity, or termination - shall be subject to the exclusive jurisdiction of the
                courts of <span className="font-semibold text-neutral-900">Jaipur, Rajasthan, India</span>.
              </p>
              <p className="mt-3">
                VGU encourages users to contact us directly to resolve any concerns before initiating formal
                proceedings.
              </p>
            </Section>

            {/* 12 */}
            <Section id="changes" num="12" title="Changes to these terms">
              <p>
                VGU may update these Terms from time to time to reflect changes in law, platform features,
                or university policy. The{' '}
                <span className="font-semibold text-neutral-900">&quot;Last updated&quot;</span> date at the
                top of this page indicates the most recent revision.
              </p>
              <p className="mt-3">
                Where changes are significant, we will notify enrolled students via email or an in-platform
                notification. Continued use of the platform after the effective date of any update
                constitutes your acceptance of the revised Terms.
              </p>
            </Section>

            {/* 13 */}
            <Section id="contact" num="13" title="Contact us" last>
              <p>
                If you have any questions about these Terms, please reach out to us using the details below.
                We aim to respond to all queries within 5 business days.
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

function ContactCard({ email }: { email: string }) {
  return (
    <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Email tile — clickable, red-tinted shadow always visible */}
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
            Email us
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
