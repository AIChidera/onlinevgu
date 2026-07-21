import type { Metadata } from 'next'
import Link from 'next/link'
import {
  IconLayoutDashboard,
  IconVideo,
  IconCalendarEvent,
  IconClipboardCheck,
} from '@tabler/icons-react'

export const metadata: Metadata = {
  title: 'Student Portal - Coming Soon | Online VGU',
  description:
    'The Online VGU LMS - your dashboard for courses, live classes, assignments, and academic progress. Launching soon for enrolled students.',
  alternates: { canonical: 'https://onlinevgu.com/student-portal' },
  openGraph: {
    title: 'Student Portal - Coming Soon | Online VGU',
    description: 'The Online VGU LMS - launching soon for enrolled students.',
    url: 'https://onlinevgu.com/student-portal',
  },
}

const FEATURES = [
  { Icon: IconLayoutDashboard, label: 'Personalised dashboard' },
  { Icon: IconVideo,           label: 'Live & recorded classes' },
  { Icon: IconClipboardCheck,  label: 'Assignments & grades' },
  { Icon: IconCalendarEvent,   label: 'Calendar sync' },
]

export default function StudentPortalPage() {
  return (
    <main>
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center min-h-[calc(100dvh-72px)] px-5"
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
        <div className="relative z-10 text-center max-w-[640px] mx-auto py-20 md:py-24">

          {/* Eyebrow */}
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-yellow mb-5">
            Online VGU Â· LMS
          </p>

          {/* Heading */}
          <h1 className="font-heading font-bold text-[36px] md:text-[52px] tracking-[-1px] leading-[1.15] text-white mb-5 md:mb-6">
            Your learning hub.{' '}
            <span className="text-vgu-yellow">Coming soon.</span>
          </h1>

          {/* Body */}
          <p className="text-[16px] md:text-[18px] font-body leading-[1.7] text-white/70 mb-8 max-w-[500px] mx-auto">
            The Online VGU Student Portal is where you&apos;ll attend classes, submit
            assignments, track grades, and connect with faculty. We&apos;re putting the
            finishing touches on it.
          </p>

          {/* Pulse badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-5 py-2.5 mb-8 md:mb-10">
            <span className="relative flex h-2.5 w-2.5 flex-none" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vgu-yellow opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vgu-yellow" />
            </span>
            <span className="text-[13px] font-body font-semibold text-white/80">Launching soon</span>
          </div>

          {/* Feature chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10 md:mb-12">
            {FEATURES.map(({ Icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5"
              >
                <Icon size={14} stroke={2} className="text-vgu-yellow/85" />
                <span className="text-[12px] md:text-[13px] font-body font-medium text-white/80">
                  {label}
                </span>
              </div>
            ))}
          </div>

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
