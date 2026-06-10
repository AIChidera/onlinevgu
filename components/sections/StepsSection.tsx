'use client'

import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { NEXT_BATCH } from '@/lib/constants'
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
    title:  'Choose Your Program',
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
    body:   'Get instant access to the learning portal. Live classes begin on day one.',
    Icon:   IconRocket,
  },
]

const MICROCOPY = [
  { label: 'Next intake',   value: NEXT_BATCH     },
  { label: 'Entrance exam', value: 'Not required' },
]

export default function StepsSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.08 })
  const [activeStep, setActiveStep] = useState(-1)
  const [isPaused, setIsPaused]     = useState(false)

  // Auto-cycle animation: each circle fills for 750ms, then 1500ms pause before restart.
  // Pauses entirely when the user hovers the steps area (CSS hover takes over).
  useEffect(() => {
    if (isPaused || !isVisible) return

    let step = 0
    let timerId: ReturnType<typeof setTimeout>

    function advance() {
      setActiveStep(step)
      if (step < STEPS.length - 1) {
        step++
        timerId = setTimeout(advance, 1250)
      } else {
        // Last step shown — pause 1250ms then reset and wait 2000ms before restarting
        timerId = setTimeout(() => {
          setActiveStep(-1)
          step = 0
          timerId = setTimeout(advance, 2000)
        }, 750)
      }
    }

    timerId = setTimeout(advance, 800)
    return () => clearTimeout(timerId)
  }, [isPaused, isVisible])

  return (
    <section
      id="how-to-apply"
      className="group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24"
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
        <div data-animate="fade-up" className="text-center mb-16 md:mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Simple Admissions
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
            Join in 4 Simple Steps
          </h2>
          <p className="mt-4 text-[15px] font-body leading-[1.7] text-neutral-600 max-w-[440px] mx-auto lg:text-[17px]">
            No entrance exam. No campus visit. Enrol 100% online in under 30 minutes.
          </p>
        </div>

        {/* Steps + dashed connector */}
        <div
          ref={ref}
          className="relative"
          onMouseEnter={() => { setIsPaused(true); setActiveStep(-1) }}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Dashed connector - desktop 4-col only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block top-[75px] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-vgu-red/[0.65]"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10 md:gap-8 md:gap-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.badge}
                data-animate="fade-up"
                className="flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                {/* Step badge + circle wrapper */}
                <div className="relative mb-6 pt-3">
                  {/* Badge pill */}
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 rounded-full px-3 py-0.5 text-[11px] font-body font-bold text-white whitespace-nowrap bg-vgu-red">
                    {step.badge}
                  </div>

                  {/* Circle — smaller on mobile, full 100px on desktop */}
                  <div
                    className={[
                      'group/circle relative z-0 flex items-center justify-center rounded-full',
                      'w-[76px] h-[76px] mt-[10px] md:w-[100px] md:h-[100px] md:mt-[14px] border-2 border-vgu-red',
                      'transition-all duration-300',
                      'hover:bg-vgu-red hover:-translate-y-1',
                      'hover:shadow-[0_8px_24px_rgba(192,64,54,0.30)]',
                      activeStep === i ? 'bg-vgu-red' : 'bg-white',
                    ].join(' ')}
                  >
                    <step.Icon
                      size={28}
                      stroke={1.5}
                      className={[
                        'transition-colors duration-300 md:hidden',
                        activeStep === i
                          ? 'text-white'
                          : 'text-vgu-red group-hover/circle:text-white',
                      ].join(' ')}
                    />
                    <step.Icon
                      size={36}
                      stroke={1.5}
                      className={[
                        'transition-colors duration-300 hidden md:block',
                        activeStep === i
                          ? 'text-white'
                          : 'text-vgu-red group-hover/circle:text-white',
                      ].join(' ')}
                    />
                  </div>
                </div>

                <h3 className="font-heading font-semibold text-[15px] leading-[1.3] text-neutral-900 mb-2 md:font-bold md:text-[18px]">
                  {step.title}
                </h3>
                <p className="text-[14px] font-body leading-[1.7] text-neutral-500 max-w-[200px]">
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
            data-apply-trigger
            className="inline-flex items-center gap-2 rounded-full border-2 border-vgu-red text-vgu-red bg-white hover:bg-vgu-red hover:text-white transition-all duration-150 font-heading font-semibold text-[18px] py-[18px] px-[52px] shadow-[0_8px_24px_rgba(192,64,54,0.30)]"
          >
            Apply Now
          </a>

          {/* Microcopy row - 3 items separated by dots */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {MICROCOPY.map((item, i) => (
              <span key={item.label} className="flex items-center gap-4">
                <span className="text-[13px] font-body text-neutral-500">
                  <span className="text-neutral-400">{item.label}:</span>{' '}
                  <span className="font-semibold text-neutral-700">{item.value}</span>
                </span>
                {i < MICROCOPY.length - 1 && (
                  <span className="flex-none w-[3px] h-[3px] rounded-full bg-neutral-300" aria-hidden="true" />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
