'use client'
import { useState, useEffect } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { IconForms, IconFileCheck, IconCreditCard, IconDeviceLaptop } from '@tabler/icons-react'

const STEPS = [
  {
    num: '01',
    Icon: IconForms,
    title: 'Apply Online',
    desc: 'Fill the 5-minute form. No entrance exam, no hassle.',
    time: '5 min',
    grad:   'linear-gradient(135deg,#C04036,#821a12)',
    color:  '#C04036',
    shadow: 'rgba(192,64,54,0.38)',
    ring:   'rgba(192,64,54,0.22)',
  },
  {
    num: '02',
    Icon: IconFileCheck,
    title: 'Verify Documents',
    desc: 'Upload soft copies of your degree and ID. Our team verifies within 24 hours.',
    time: '24 hrs',
    grad:   'linear-gradient(135deg,#2563eb,#1d4ed8)',
    color:  '#2563eb',
    shadow: 'rgba(37,99,235,0.38)',
    ring:   'rgba(37,99,235,0.22)',
  },
  {
    num: '03',
    Icon: IconCreditCard,
    title: 'Pay & Enroll',
    desc: 'Pay the full fee or choose a no-cost EMI plan. Instant enrollment confirmation.',
    time: 'Instant',
    grad:   'linear-gradient(135deg,#7c3aed,#4c1d95)',
    color:  '#7c3aed',
    shadow: 'rgba(124,58,237,0.38)',
    ring:   'rgba(124,58,237,0.22)',
  },
  {
    num: '04',
    Icon: IconDeviceLaptop,
    title: 'Start Learning',
    desc: 'Access the LMS immediately. Your first live session starts within 7 days.',
    time: '7 days',
    grad:   'linear-gradient(135deg,#059669,#065f46)',
    color:  '#059669',
    shadow: 'rgba(5,150,105,0.38)',
    ring:   'rgba(5,150,105,0.22)',
  },
]

export default function AdmissionSteps() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })
  const [activeStep, setActiveStep] = useState(-1)
  const [isPaused, setIsPaused]     = useState(false)

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
    <section className="bg-neutral-50 border-t border-neutral-200 py-16 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">

        <div className="text-center mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">Admissions</p>
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 lg:text-[32px]">
            Enroll in 4 Simple Steps
          </h2>
          <p className="mt-3 text-[16px] font-body text-neutral-500 max-w-[400px] mx-auto">
            No campus visit, no entrance exam. Everything happens online.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 relative"
          onMouseEnter={() => { setIsPaused(true); setActiveStep(-1) }}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Connecting line - desktop only */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-neutral-200 z-0" aria-hidden="true" />

          {STEPS.map((s, i) => (
            <div
              key={s.num}
              className={[
                'relative z-10 flex flex-col items-center text-center group transition-all duration-500',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
              ].join(' ')}
              style={{ transitionDelay: `${i * 110}ms` }}
            >
              {/* Icon circle */}
              <div
                className={[
                  'w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300',
                  activeStep === i
                    ? 'scale-110 -translate-y-1'
                    : 'shadow-md group-hover:scale-110 group-hover:shadow-lg',
                ].join(' ')}
                style={{
                  background: s.grad,
                  boxShadow: activeStep === i
                    ? `0 0 0 4px ${s.ring}, 0 12px 32px ${s.shadow}`
                    : undefined,
                }}
              >
                <s.Icon size={28} stroke={1.5} className="text-white" />
              </div>

              {/* Step label */}
              <span className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-neutral-400 mb-1">
                Step {s.num}
              </span>

              <h3 className="font-heading font-bold text-[17px] text-neutral-900 mb-2">{s.title}</h3>

              {/* flex-1 pushes the chip to the bottom of every cell */}
              <p className="text-[13px] font-body text-neutral-500 leading-relaxed max-w-[200px] flex-1">
                {s.desc}
              </p>

              {/* Time chip - mt-3 so it's not glued to the text */}
              <span
                className={[
                  'mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-body font-semibold transition-all duration-300 border',
                  activeStep === i ? 'text-white' : 'bg-white border-neutral-200 text-neutral-600',
                ].join(' ')}
                style={activeStep === i ? { background: s.color, borderColor: s.color } : {}}
              >
                {s.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
