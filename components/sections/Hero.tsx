'use client'

import Image from 'next/image'
import { IconCheck, IconArrowRight } from '@tabler/icons-react'
import SketchCircle   from '@/components/ui/sketch/SketchCircle'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

// TODO: swap with a real VGU campus / student photo when the asset is ready
const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop'

const TRUST_POINTS = [
  'UGC-Entitled',
  'NAAC A+',
  '50,000+ Learners',
  '95% Placement',
]

export default function Hero() {
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
      <SketchFlourish shape="swoop" color="yellow" opacity={0.06} strokeWidth={3.5} />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">

        {/* Copy column. Only the SketchCircle around "promotion" remains. */}
        <div className="relative max-w-[680px]">

          <p
            className="anim-load-left text-[12px] font-heading font-semibold uppercase tracking-[0.08em] mb-5 text-vgu-yellow"
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
            className="anim-load-left mt-5 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[620px]"
            style={{ animationDelay: '140ms' }}
          >
            Built for working professionals. Study evenings and weekends. Finish in 2-3 years.
          </p>

          {/* Inline trust-proof bar */}
          <div
            className="anim-load-left mt-7 grid grid-cols-2 gap-x-5 gap-y-2.5
                       sm:flex sm:flex-wrap sm:items-center sm:gap-x-6"
            style={{ animationDelay: '175ms' }}
          >
            {TRUST_POINTS.map((item) => (
              <div key={item} className="flex items-center gap-1.5">
                <IconCheck size={14} stroke={3} className="flex-none text-vgu-yellow" />
                <span className="text-[13px] font-heading font-semibold text-white/90">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs: primary inverted (white on dark), secondary ghost. */}
          <div
            className="anim-load-left relative mt-8 flex flex-wrap gap-3"
            style={{ animationDelay: '210ms' }}
          >
            <a
              href="#counsellor"
              data-apply-trigger
              className="inline-flex items-center justify-center gap-2 border-2 border-white bg-white hover:bg-transparent
                         text-vgu-red hover:text-white rounded-full px-9 py-4 text-[16px]
                         font-heading font-semibold transition-all duration-200
                         shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
            >
              Apply Now
              <IconArrowRight size={16} />
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center border-2 border-white/30
                         bg-transparent text-white hover:bg-white/10 hover:border-white/50
                         rounded-md px-6 py-3.5 text-[15px]
                         font-heading font-semibold transition-all duration-200"
            >
              Explore Programs
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
