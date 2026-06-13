'use client'

import { useState, useEffect, useRef } from 'react'
import {
  IconUsers,
  IconTrendingUp,
  IconCertificate,
  IconStar,
  IconArrowRight,
} from '@tabler/icons-react'
import SketchCircle   from '@/components/ui/sketch/SketchCircle'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

interface Stat {
  target:   number
  suffix:   string
  decimals: number
  label:    string
  sub:      string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:     React.ComponentType<any>
}

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

    const DURATION = 2133
    let rafId: number
    let startTime: number | null = null

    const tick = (now: number) => {
      if (startTime === null) startTime = now
      const elapsed = Math.max(0, now - startTime - delay)
      const progress = Math.min(elapsed / DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(target * eased)
      if (progress < 1) rafId = requestAnimationFrame(tick)
      else setDisplayed(target)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isActive, target, delay])

  return <>{formatNum(displayed, decimals)}{suffix}</>
}

interface ImpactProps {
  statLearners?:  number   // fallback 50,000
  statCountries?: number   // fallback 40
  statPlacement?: number   // fallback 95
  statRating?:    number   // fallback 4.8
  statCoursera?:  number   // fallback 7,000
}

export default function ImpactSection({
  statLearners  = 50000,
  statCountries = 40,
  statPlacement = 95,
  statRating    = 4.8,
  statCoursera  = 7000,
}: ImpactProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0 })

  const STATS: Stat[] = [
    {
      target:   statLearners,
      suffix:   '+',
      decimals: 0,
      label:    'Learners enrolled',
      sub:      `Across India & ${statCountries}+ countries`,
      Icon:     IconUsers,
    },
    {
      target:   statPlacement,
      suffix:   '%',
      decimals: 0,
      label:    'Placement rate',
      sub:      '2023 batch · within 6 months',
      Icon:     IconTrendingUp,
    },
    {
      target:   statCoursera,
      suffix:   '+',
      decimals: 0,
      label:    'Coursera courses',
      sub:      'Included with every degree',
      Icon:     IconCertificate,
    },
    {
      target:   statRating,
      suffix:   '/5',
      decimals: 1,
      label:    'Student rating',
      sub:      'From 12,400+ reviews',
      Icon:     IconStar,
    },
  ]

  return (
    <section id="impact" className="sketch-hover-group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <SketchFlourish shape="wave" color="red" opacity={0.05} strokeWidth={10} />
      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-12 md:mb-14">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Our Impact
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            <span className="relative inline-block">
              13 years
              <SketchCircle color="red" delayMs={200} />
            </span>
            . 50,000 careers changed.
          </h2>
          <p className="mt-3 text-[13px] font-body italic text-neutral-500">
            As of 2026 · 2023 placement report
          </p>
        </div>

        {/* 4 stats - flat band, no cards (Bible §09) */}
        <div
          ref={ref}
          className="grid grid-cols-2 gap-y-12 gap-x-6 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-neutral-200"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              data-animate="materialize"
              className="text-center lg:px-6"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Icon - Bible §09: 24-32px, brand colour, 60% opacity */}
              <div className="flex justify-center mb-3 md:mb-4">
                <s.Icon size={28} stroke={1.5} className="text-vgu-red opacity-60" />
              </div>

              {/* Number - monumental */}
              <div className="font-heading font-black tracking-[-0.02em] leading-none text-vgu-red tabular-nums text-[44px] sm:text-[54px] lg:text-[64px]">
                <CountUp
                  target={s.target}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  isActive={isVisible}
                  delay={i * 80}
                />
              </div>

              {/* Label - Tier 2 */}
              <div className="mt-3 font-heading font-bold text-[14px] md:text-[15px] text-neutral-900 leading-tight">
                {s.label}
              </div>

              {/* Sub-line - Tier 3 */}
              <div className="mt-1.5 text-[12px] md:text-[13px] font-body text-neutral-500 leading-tight">
                {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Soft CTA → BrochureModal */}
        <div data-animate="fade-up" className="mt-12 md:mt-14 text-center">
          <a
            href="#brochure"
            data-brochure-trigger
            className="inline-flex items-center gap-2 text-[15px] font-heading font-semibold text-vgu-red hover:text-vgu-red-dark transition-colors duration-200 underline underline-offset-4 decoration-2 decoration-vgu-red/30 hover:decoration-vgu-red"
          >
            Get the full placement &amp; program report
            <IconArrowRight size={16} stroke={2.25} />
          </a>
          <p className="mt-2 text-[12px] font-body text-neutral-500">
            2026 VGU online brochure · PDF
          </p>
        </div>

      </div>
    </section>
  )
}
