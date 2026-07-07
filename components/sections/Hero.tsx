'use client'

import Image from 'next/image'
import { IconArrowRight, IconCheck } from '@tabler/icons-react'
import SketchCircle   from '@/components/ui/sketch/SketchCircle'

// TODO: swap with a real VGU campus / student photo when the asset is ready
const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop'

// ─── Seat counter ────────────────────────────────────────────────────────────
// Deterministic: every visitor sees the same number on a given calendar day.
// Monotonically decreasing: simulates daily sales seeded by day index so the
// value never jumps up. Urgency-weighted so burn rate accelerates near deadline.
const SEATS_OPEN  = new Date(2026, 3, 1)   // April 1 - window opens at MAX_SEATS
const SEATS_CLOSE = new Date(2026, 6, 31)  // July 31 - floors at MIN_SEATS
const MAX_SEATS   = 60
const MIN_SEATS   = 3

function seededFloat(n: number): number {
  const x = Math.sin(n) * 43758.5453
  return x - Math.floor(x)          // 0..1, deterministic for any given n
}

function getSeatsLeft(): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (today <= SEATS_OPEN)  return MAX_SEATS
  if (today >= SEATS_CLOSE) return MIN_SEATS
  const totalDays  = Math.round((SEATS_CLOSE.getTime() - SEATS_OPEN.getTime()) / 86_400_000)
  const daysPassed = Math.round((today.getTime()       - SEATS_OPEN.getTime()) / 86_400_000)
  let seats = MAX_SEATS
  for (let d = 0; d < daysPassed && seats > MIN_SEATS; d++) {
    const urgency    = (d + 1) / totalDays               // grows 0 → 1 over window
    const dailySales = Math.round(seededFloat(d * 127.1 + 311.7) * urgency * 2.5)
    seats = Math.max(MIN_SEATS, seats - dailySales)
  }
  return seats
}

export default function Hero({ nextBatch = 'July 2026' }: { nextBatch?: string }) {
  return (
    <section className="sketch-hover-group group relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">

      {/* Photo + dark overlay (Bible §06 semi-transparent treatment) */}
      <Image
        src={HERO_IMAGE_SRC}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-black/50" />

      {/* Most subtle of all sections - the Hero is already busy. */}

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">

        {/* Copy column. Only the SketchCircle around "promotion" remains. */}
        <div className="relative max-w-[680px]">

          <p
            className="anim-load-left text-[12px] font-heading font-semibold uppercase tracking-[0.08em] mb-6 text-vgu-yellow"
            style={{ animationDelay: '0ms' }}
          >
            UGC-Entitled · Online Degrees
          </p>

          <h1
            className="anim-load-left font-heading font-bold tracking-tight leading-[1.05] text-white
                       text-[44px] md:text-[60px] lg:text-[72px]"
            style={{ animationDelay: '70ms' }}
          >
            Your next{' '}
            <span className="relative inline-block text-vgu-yellow">
              promotion
              <SketchCircle delayMs={600} />
            </span><br />
            starts here.
          </h1>

          <p
            className="anim-load-left mt-8 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/70 md:text-white/85 max-w-[620px]"
            style={{ animationDelay: '140ms' }}
          >
            Built for working professionals. Study evenings and weekends. Finish in 2-3 years.
          </p>

          {/* CTAs */}
          <div
            className="anim-load-left relative mt-12 flex flex-col gap-4"
            style={{ animationDelay: '210ms' }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#counsellor"
                data-apply-trigger
                className="group inline-flex items-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Apply Now
                <IconArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#programs"
                className="group inline-flex items-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
              >
                Explore Programs
                <IconArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Trust micro-strip */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-body text-white/75">
                <IconCheck size={11} stroke={2.5} className="text-white/55 flex-none" />
                No entrance exam
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-body text-white/75">
                <IconCheck size={11} stroke={2.5} className="text-white/55 flex-none" />
                UGC recognised
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] font-body text-white/75">
                <IconCheck size={11} stroke={2.5} className="text-white/55 flex-none" />
                {nextBatch} admissions are open
                <span className="w-1 h-1 rounded-full bg-white/35 flex-none" />
                <span className="text-vgu-yellow font-semibold">{getSeatsLeft()} seats left</span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
