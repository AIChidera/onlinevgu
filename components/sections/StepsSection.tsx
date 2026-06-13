import { NEXT_BATCH } from '@/lib/constants'
import {
  IconClipboardList,
  IconSchool,
  IconCreditCard,
  IconRocket,
} from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

const STEPS = [
  {
    badge:  'Step 1',
    title:  'Register Online',
    body:   'Fill the application form in under 2 minutes. A counsellor calls you within 2 hours.',
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
    body:   'Get instant portal access. Live classes from July 2026.',
    Icon:   IconRocket,
  },
]

const MICROCOPY = [
  { label: 'Next intake',            value: NEXT_BATCH       },
  { label: 'Entrance exam',          value: 'Not required'   },
  { label: 'Counsellor calls within', value: '2 hours'       },
]

export default function StepsSection() {
  return (
    <section
      id="how-to-apply"
      className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24"
    >
      <SketchFlourish shape="wave" color="red" opacity={0.06} strokeWidth={10} />
      {/* Subtle dot-grid texture - Bible §10 4-6% opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(192,64,54,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-12 md:mb-14">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Simple Admissions
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            From form to first class, in under 30 minutes.
          </h2>
          <p className="mt-4 text-[15px] font-body leading-[1.7] text-neutral-600 max-w-[520px] mx-auto lg:text-[17px]">
            No entrance exam. No campus visit. Enrol 100% online.
          </p>
        </div>

        {/* Steps + dashed connector */}
        <div className="relative">
          {/* Dashed connector - desktop 4-col only */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute hidden lg:block top-[75px] left-[12.5%] right-[12.5%] border-t-2 border-dashed border-vgu-red/[0.45]"
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 gap-y-10 md:gap-8 md:gap-y-12">
            {STEPS.map((step, i) => (
              <div
                key={step.badge}
                data-animate="fade-up"
                className="flex flex-col items-center text-center"
                style={{ animationDelay: `${i * 110}ms` }}
              >
                {/* Step badge + circle */}
                <div className="relative mb-6 pt-3">
                  <div className="absolute -top-0 left-1/2 -translate-x-1/2 z-10 rounded-full px-3 py-0.5 text-[11px] font-body font-bold text-white whitespace-nowrap bg-vgu-red">
                    {step.badge}
                  </div>

                  <div
                    className={[
                      'group/circle relative z-0 flex items-center justify-center rounded-full bg-white',
                      'w-[76px] h-[76px] mt-[10px] md:w-[100px] md:h-[100px] md:mt-[14px] border-2 border-vgu-red',
                      'transition-all duration-300',
                      'hover:bg-vgu-red hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(192,64,54,0.30)]',
                    ].join(' ')}
                  >
                    <step.Icon
                      size={28}
                      stroke={1.5}
                      className="md:hidden transition-colors duration-300 text-vgu-red group-hover/circle:text-white"
                    />
                    <step.Icon
                      size={36}
                      stroke={1.5}
                      className="hidden md:block transition-colors duration-300 text-vgu-red group-hover/circle:text-white"
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

          {/* Microcopy row */}
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
