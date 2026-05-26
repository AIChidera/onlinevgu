'use client'

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import {
  IconClipboardList,
  IconSchool,
  IconCreditCard,
  IconRocket,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

const STEPS = [
  {
    badge:  'Step 1',
    title:  'Register Online',
    body:   'Fill a quick enquiry form in under 2 minutes. A counsellor calls you within 2 hours.',
    Icon:   IconClipboardList,
  },
  {
    badge:  'Step 2',
    title:  'Choose Your Programme',
    body:   'Pick your degree and specialisation. Our advisors help you find the best fit.',
    Icon:   IconSchool,
  },
  {
    badge:  'Step 3',
    title:  'Pay Your Fees',
    body:   'Pay securely online in minutes. No-cost EMI available from ₹2,999/month.',
    Icon:   IconCreditCard,
  },
  {
    badge:  'Step 4',
    title:  'Start Learning',
    body:   'Get instant access to the learning portal — live classes begin on day one.',
    Icon:   IconRocket,
  },
]

const MICROCOPY = [
  { label: 'Next intake',       value: 'July 2025'          },
  { label: 'Min. qualification', value: '10+2 / Graduation' },
  { label: 'Entrance exam',     value: 'Not required'       },
]

export default function StepsSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="how-to-apply"
      className="group relative overflow-hidden bg-white py-24 px-12 lg:px-8 md:px-5 md:py-16"
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(192,64,54,0.12) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-16 md:mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Simple Admissions
          </p>
          <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-gray-900 md:text-[28px]">
            Join in 4 Simple Steps
          </h2>
          <p className="mt-4 text-[17px] font-body leading-[1.7] text-gray-500 max-w-[440px] mx-auto">
            No entrance exam. No campus visit. Enrol 100% online in under 30 minutes.
          </p>
        </div>

        {/* Steps + dashed connector */}
        <div ref={ref} className="relative">
          {/* Dashed SVG connector — desktop only */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute lg:hidden"
            style={{ top: '60px', left: 0, right: 0, width: '100%', height: '2px', overflow: 'visible' }}
            preserveAspectRatio="none"
          >
            <line
              x1="12.5%"
              y1="1"
              x2="87.5%"
              y2="1"
              stroke="#E5E7EB"
              strokeWidth="2"
              strokeDasharray="8 6"
            />
          </svg>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 gap-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.badge}
                className={[
                  'flex flex-col items-center text-center transition-all duration-500',
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                ].join(' ')}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                {/* Step badge + circle wrapper — gives space for the -10px badge */}
                <div className="relative mb-6 pt-3">
                  {/* Badge pill */}
                  <div
                    className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 rounded-full px-3 py-0.5 text-[11px] font-body font-bold text-white whitespace-nowrap"
                    style={{ background: '#C04036' }}
                  >
                    {step.badge}
                  </div>

                  {/* 100px circle */}
                  <div
                    className={[
                      'group/circle relative z-0 flex items-center justify-center rounded-full',
                      'transition-all duration-200',
                      'hover:bg-vgu-red hover:text-white hover:-translate-y-1',
                      'hover:shadow-[0_8px_24px_rgba(192,64,54,0.30)]',
                    ].join(' ')}
                    style={{
                      width: '100px',
                      height: '100px',
                      marginTop: '14px',
                      background: 'white',
                      border: '2px solid #C04036',
                    }}
                  >
                    <step.Icon
                      size={36}
                      stroke={1.5}
                      className="text-vgu-red group-hover/circle:text-white transition-colors duration-200"
                    />
                  </div>
                </div>

                <h3 className="font-heading font-bold text-[18px] leading-[1.3] text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-[14px] font-body leading-[1.7] text-gray-500 max-w-[200px]">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <a
            href="#counsellor"
            className="inline-flex items-center gap-2 rounded-full bg-vgu-red hover:bg-vgu-dark text-white transition-all duration-150 font-heading font-extrabold"
            style={{
              fontSize: '18px',
              padding: '18px 52px',
              boxShadow: '0 8px 24px rgba(192,64,54,0.30)',
            }}
          >
            Apply Now — It&apos;s Free
          </a>

          {/* Microcopy row — 3 items separated by dots */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {MICROCOPY.map((item, i) => (
              <span key={item.label} className="flex items-center gap-4">
                <span className="text-[13px] font-body text-gray-500">
                  <span className="text-gray-400">{item.label}:</span>{' '}
                  <span className="font-semibold text-gray-700">{item.value}</span>
                </span>
                {i < MICROCOPY.length - 1 && (
                  <span
                    className="flex-none rounded-full bg-gray-300"
                    style={{ width: '3px', height: '3px' }}
                    aria-hidden="true"
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
