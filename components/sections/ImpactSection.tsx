'use client'

import { useState, useEffect, useRef } from 'react'
import {
  IconUsers,
  IconWorld,
  IconTrendingUp,
  IconStar,
  IconBriefcase,
  IconBook2,
  IconCertificate,
  IconSchool,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { FOUNDING_YEAR } from '@/lib/constants'

// ── Data ───────────────────────────────────────────────────────────

interface MainStat {
  target:   number
  suffix:   string
  decimals: number
  label:    string
  sub:      string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:     React.ComponentType<any>
}

interface ExtraStat {
  target:   number
  suffix:   string
  decimals: number
  label:    string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:     React.ComponentType<any>
}

const MAIN_STATS: MainStat[] = [
  {
    target: 50000, suffix: '+', decimals: 0,
    label: 'Learners Enrolled',
    sub:   'Across India & beyond',
    Icon:  IconUsers,
  },
  {
    target: 40, suffix: '+', decimals: 0,
    label: 'Countries Represented',
    sub:   'Global learner community',
    Icon:  IconWorld,
  },
  {
    target: 95, suffix: '%', decimals: 0,
    label: 'Placement Rate',
    sub:   'Within 6 months of graduation',
    Icon:  IconTrendingUp,
  },
  {
    target: 4.8, suffix: '/5', decimals: 1,
    label: 'Student Rating',
    sub:   'From 12,400+ reviews',
    Icon:  IconStar,
  },
]

// All values sourced from verified spec stats
const EXTRA_STATS: ExtraStat[] = [
  { target: 500,  suffix: '+', decimals: 0, label: 'Hiring Partners',     Icon: IconBriefcase   },
  { target: 30,   suffix: '+', decimals: 0, label: 'Programs Offered',    Icon: IconBook2       },
  { target: 7000, suffix: '+', decimals: 0, label: 'Coursera Courses',    Icon: IconCertificate },
  { target: new Date().getFullYear() - FOUNDING_YEAR, suffix: '+', decimals: 0, label: 'Years of Excellence', Icon: IconSchool },
]

// ── Count-up ───────────────────────────────────────────────────────

function formatNum(n: number, decimals: number): string {
  if (decimals > 0) return n.toFixed(decimals)
  const r = Math.round(n)
  return r >= 1000 ? r.toLocaleString('en-US') : String(r)
}

function CountUp({
  target, suffix = '', decimals = 0, isActive, delay = 0,
}: {
  target: number; suffix?: string; decimals?: number; isActive: boolean; delay?: number
}) {
  const [displayed, setDisplayed] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!isActive || started.current) return
    started.current = true

    const DURATION = 2133 // 0.75× the original speed
    let rafId: number
    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = Math.max(0, now - startTime - delay)
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      setDisplayed(target * eased)
      if (progress < 1) rafId = requestAnimationFrame(tick)
      else setDisplayed(target) // snap to exact final value
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isActive, target, delay])

  return <>{formatNum(displayed, decimals)}{suffix}</>
}

// ── Section ────────────────────────────────────────────────────────

export default function ImpactSection() {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="impact" className="group relative overflow-hidden bg-vgu-dark py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <div className="opacity-40">
        <StrokeArt variant="dark" />
      </div>

      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,164,18,0.08)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(192,64,54,0.3)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-14">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-3">
            Our Impact
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-white md:text-[40px]">
            Numbers That Speak for Themselves
          </h2>
        </div>

        {/* 4 main stat tiles */}
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {MAIN_STATS.map((s, i) => (
            <div
              key={s.label}
              className={[
                'relative rounded-2xl border p-4 md:p-6 text-center transition-all duration-300',
                'hover:-translate-y-1 hover:shadow-[0_0_0_2px_#FFA412,0_8px_32px_rgba(0,0,0,0.28)]',
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
              ].join(' ')}
              style={{
                background: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(255,255,255,0.12)',
                transitionDelay: `${i * 80}ms`,
              }}
            >
              {/* Icon */}
              <div className="flex justify-center mb-3 md:mb-4">
                <div
                  className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,164,18,0.14)' }}
                >
                  <s.Icon size={18} stroke={1.5} className="text-vgu-gold" />
                </div>
              </div>

              {/* Animated number */}
              <div className="font-heading font-black leading-none text-vgu-gold text-[24px] sm:text-[34px] lg:text-[46px]">
                <CountUp
                  target={s.target}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  isActive={isVisible}
                  delay={i * 80}
                />
              </div>

              <div className="mt-2 md:mt-3 font-heading font-bold text-[13px] md:text-[15px] text-white leading-tight">
                {s.label}
              </div>
              <div className="mt-1 md:mt-1.5 text-[11px] md:text-[12px] font-body text-white/50">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Extra stats strip */}
        <div
          className="mt-6 rounded-2xl overflow-hidden"
          style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div
            className="px-8 py-3.5 border-b"
            style={{ borderColor: 'rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.15)' }}
          >
            <p className="text-[11px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold/70 text-center">
              At a Glance
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4">
            {EXTRA_STATS.map((s, i) => (
              <div
                key={s.label}
                className={[
                  'flex items-center gap-3 py-5 px-6',
                  i % 2 === 0 ? 'border-r' : '',
                  i < 2      ? 'border-b lg:border-b-0' : '',
                  i < 3      ? 'lg:border-r' : '',
                ].join(' ')}
                style={{ borderColor: 'rgba(255,255,255,0.08)' }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-none"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <s.Icon size={17} stroke={1.5} className="text-vgu-gold/70" />
                </div>
                <div>
                  <div className="font-heading font-black text-[22px] leading-none text-vgu-gold">
                    <CountUp
                      target={s.target}
                      suffix={s.suffix}
                      decimals={s.decimals}
                      isActive={isVisible}
                      delay={i * 60 + 400}
                    />
                  </div>
                  <div className="mt-1 text-[12px] font-body text-white/55 leading-tight">
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
