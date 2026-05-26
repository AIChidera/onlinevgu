'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import SectionWrapper from '@/components/layout/SectionWrapper'

const REASONS = [
  {
    icon: '🎓',
    title: 'UGC-entitled degrees',
    body: 'Our online degrees carry the same weight as on-campus qualifications — recognised by employers and eligible for higher studies.',
  },
  {
    icon: '🏅',
    title: 'NAAC A+ accredited',
    body: 'VGU holds the highest NAAC grade, placing us among India\'s top universities by quality of education.',
  },
  {
    icon: '⏰',
    title: 'Learn on your schedule',
    body: 'Live sessions are recorded. Study at 6am or midnight — your pace, your timeline, without pausing your career.',
  },
  {
    icon: '👨‍🏫',
    title: 'Industry-active faculty',
    body: 'Learn from professors who still consult for Fortune 500 companies, publish research, and work with startups.',
  },
  {
    icon: '💼',
    title: '95% placement support',
    body: 'Dedicated career centre with 500+ hiring partners. Mock interviews, LinkedIn optimisation, and referral networks.',
  },
  {
    icon: '🌍',
    title: 'Global recognition',
    body: 'Degrees recognised by WES Canada and equivalent bodies in the UAE, UK, Australia, and 35 other countries.',
  },
  {
    icon: '💳',
    title: 'Affordable EMIs',
    body: 'Start learning from ₹2,999/month with no-cost EMI plans via 12 partner banks. Scholarships available.',
  },
  {
    icon: '📱',
    title: 'App-first learning',
    body: 'Download lectures, join live classes, submit assignments, and track grades — all from one mobile app.',
  },
]

export default function WhyVGU() {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 })

  return (
    <SectionWrapper id="why-vgu" bg="light">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          Why choose us
        </p>
        <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
          Everything you need to succeed online
        </h2>
        <p className="mt-3 text-[17px] text-neutral-600 max-w-[480px] mx-auto leading-relaxed">
          25 years of academic excellence, now accessible from wherever you are.
        </p>
      </div>

      <div
        ref={ref}
        className="grid grid-cols-4 gap-6 xl:grid-cols-2 md:grid-cols-1"
      >
        {REASONS.map((r, i) => (
          <div
            key={r.title}
            className={[
              'group rounded-2xl p-6 border border-neutral-200 bg-white',
              'transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-vgu-red/30',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
            ].join(' ')}
            style={{ transitionDelay: `${Math.floor(i / 4) * 100 + (i % 4) * 60}ms` }}
          >
            <div className="mb-3 text-[32px] leading-none">{r.icon}</div>
            <h3 className="font-heading text-[16px] font-bold text-neutral-900 mb-2">{r.title}</h3>
            <p className="text-[14px] text-neutral-600 leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
