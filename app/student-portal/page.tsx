import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconLayoutDashboard,
  IconClipboardList,
  IconCreditCard,
  IconChartBar,
  IconLogin,
  IconHeadset,
  IconArrowUpRight,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Student Portal - Online VGU',
  description:
    'Quick access for enrolled Online VGU students - LMS, examination forms, exam fee payment, results, student login, and academic support.',
  alternates: { canonical: 'https://onlinevgu.com/student-portal' },
  openGraph: {
    title: 'Student Portal - Online VGU',
    description: 'Quick access to LMS, exams, results, and support for enrolled students.',
    url: 'https://onlinevgu.com/student-portal',
  },
}

// Same destinations as the footer's "For Enrolled Students" column - kept in
// one place here (external systems, not built by us) so enrolled students
// have a single obvious page to bookmark rather than hunting the footer.
const QUICK_ACCESS = [
  {
    Icon:  IconLayoutDashboard,
    label: 'LMS',
    desc:  'BBA & MBA learners',
    href:  'https://lms.onlinevgu.com/login',
  },
  {
    Icon:  IconLayoutDashboard,
    label: 'LMS',
    desc:  'BA, BCA, MCA, M.Sc., MA English, MAJMC',
    href:  'https://ol.vgu.universitycopilot.com/login',
  },
  {
    Icon:  IconClipboardList,
    label: 'Examination Forms',
    desc:  'Register for upcoming exams',
    href:  'https://vguerp.epravesh.com/public/login',
  },
  {
    Icon:  IconCreditCard,
    label: 'Examination Fee Payment',
    desc:  'Pay your exam fee online',
    href:  'https://smartpay.easebuzz.in/168702/f96d8ee7dc46400ba2df37045bc2db65',
  },
  {
    Icon:  IconChartBar,
    label: 'Results',
    desc:  'Check your semester results',
    href:  'https://vguerp.epravesh.com/public/login',
  },
  {
    Icon:  IconLogin,
    label: 'Student Login',
    desc:  'VGU ERP student portal',
    href:  'https://vguerp.epravesh.com/public/login',
  },
]

export default function StudentPortalPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 38%, #2d0f0b 68%, #110805 100%)' }}
      >
        {/* Dot grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Warm glow accents */}
        <div className="absolute -top-40 -right-40 w-[560px] h-[560px] rounded-full bg-vgu-red/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full bg-vgu-yellow/10 blur-3xl pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[900px] px-5 md:px-8 lg:px-12 py-16 md:py-20 text-center">

          {/* Eyebrow */}
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-5">
            Online VGU · Student Portal
          </p>

          {/* Heading */}
          <h1 className="font-heading font-bold text-[32px] md:text-[46px] tracking-[-1px] leading-[1.15] text-white mb-5">
            Everything you need, one page away.
          </h1>

          {/* Body */}
          <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/70 mb-10 max-w-[560px] mx-auto">
            Quick access to your LMS, exam forms, fee payment, results, and support -
            whichever program you&apos;re enrolled in.
          </p>

          {/* Quick access grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left mb-10">
            {QUICK_ACCESS.map((item, i) => (
              <a
                key={item.label + item.desc}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                data-animate="fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
                className="group flex items-start gap-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-vgu-yellow/40 hover:bg-white/[0.09] p-4 transition-all duration-200"
              >
                <div className="flex-none w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-vgu-yellow/15 transition-colors duration-200">
                  <item.Icon size={20} stroke={1.75} className="text-vgu-yellow" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-heading font-bold text-[15px] text-white leading-tight">{item.label}</p>
                    <IconArrowUpRight size={14} stroke={2.25} className="flex-none text-white/40 group-hover:text-vgu-yellow transition-colors duration-200" />
                  </div>
                  <p className="text-[12.5px] font-body text-white/55 mt-1 leading-snug">{item.desc}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Academic support - separated, since it's a conversation not a login */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3.5 rounded-2xl bg-white/[0.06] border border-white/10 hover:border-vgu-yellow/40 hover:bg-white/[0.09] px-5 py-4 text-left transition-all duration-200 mb-10 w-full sm:w-auto"
          >
            <div className="flex-none w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-vgu-yellow/15 transition-colors duration-200">
              <IconHeadset size={20} stroke={1.75} className="text-vgu-yellow" />
            </div>
            <div>
              <p className="font-heading font-bold text-[15px] text-white leading-tight">Academic Support</p>
              <p className="text-[12.5px] font-body text-white/55 mt-1 leading-snug">Reach the student support team directly</p>
            </div>
          </Link>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-md bg-vgu-red hover:bg-vgu-red-dark text-white font-heading font-semibold text-[15px] px-7 md:px-8 py-3.5 transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.35)] whitespace-nowrap"
            >
              Explore Programs
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-md border-2 border-white/30 hover:bg-white/10 text-white font-heading font-semibold text-[15px] px-6 md:px-[30px] py-3 transition-all duration-200 whitespace-nowrap"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
