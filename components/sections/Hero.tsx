'use client'

import Image from 'next/image'
import StrokeArt from '@/components/ui/StrokeArt'

// Placeholder — replace with a real asset path like '/images/hero-bg.jpg' when ready.
const HERO_IMAGE_SRC = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop'

export default function Hero() {
  return (
    <section className="group relative bg-white flex items-center overflow-hidden">

      {/* Background image provision — set HERO_IMAGE_SRC above to activate */}
      {HERO_IMAGE_SRC && (
        <>
          <Image src={HERO_IMAGE_SRC} alt="" fill className="object-cover object-center" sizes="100vw" priority />
          <div className="absolute inset-0 bg-black/55" />
        </>
      )}

      {/* Subtle right-side gradient wash (hidden when image is active) */}
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${HERO_IMAGE_SRC ? 'opacity-0' : ''}`}>
        <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-vgu-beige/25 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(192,64,54,0.9) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-8 xl:gap-16 items-center">

        {/* ── Left: copy ─────────────────────────────────── */}
        <div>
          <p
            className={`anim-load-left text-[12px] font-body font-bold uppercase tracking-[0.08em] mb-5 ${HERO_IMAGE_SRC ? 'text-vgu-yellow' : 'text-vgu-red'}`}
            style={{ animationDelay: '0ms' }}
          >
            UGC-Entitled · Online Degrees
          </p>

          <h1
            className={`anim-load-left font-heading font-black text-[34px] tracking-tight leading-[1.1] md:text-[40px] lg:text-[48px] ${HERO_IMAGE_SRC ? 'text-white' : 'text-neutral-900'}`}
            style={{ animationDelay: '70ms' }}
          >
            Learn online.<br />
            Earn a degree that<br />
            <span className={HERO_IMAGE_SRC ? 'text-vgu-yellow' : 'text-vgu-red'}>opens doors.</span>
          </h1>

          <p
            className={`anim-load-left mt-5 text-[15px] font-body leading-[1.7] max-w-[480px] lg:text-[17px] ${HERO_IMAGE_SRC ? 'text-white/75' : 'text-neutral-600'}`}
            style={{ animationDelay: '140ms' }}
          >
            VGU&apos;s UGC-entitled online degrees are recognised by employers across
            India and beyond. Study fully online, at your own pace.
          </p>

          <div className="anim-load-left mt-9 flex gap-3" style={{ animationDelay: '210ms' }}>
            <a
              href="#counsellor"
              data-apply-trigger
              className="flex-1 text-center border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red rounded-full px-4 py-3.5 text-[14px] xl:px-8 xl:text-[15px] font-semibold transition-all duration-200 shadow-[0_4px_20px_rgba(192,64,54,0.28)]"
            >
              Apply Now
            </a>
            <a
              href="#programs"
              className="flex-1 text-center bg-white border-2 border-neutral-200 hover:border-vgu-red text-neutral-900 hover:text-vgu-red rounded-md px-4 py-3 text-[14px] xl:px-8 xl:text-[15px] font-semibold transition-all duration-200"
            >
              Explore Programs
            </a>
          </div>

          {/* Mobile hero visual - only shows below xl where the right column is hidden */}
          <div className="anim-load-left xl:hidden mt-8 rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)', animationDelay: '280ms' }}>
            <div className="relative px-5 py-5">
              {/* Decorative circles */}
              <div aria-hidden="true" className="pointer-events-none absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/10" />
              <div aria-hidden="true" className="pointer-events-none absolute -left-5 -bottom-5 w-24 h-24 rounded-full bg-white/[0.07]" />

              <div className="relative z-10">
                {/* Wordmark + badge row */}
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="font-heading font-black text-[20px] text-white leading-none">Online VGU</p>
                    <p className="mt-1 text-[12px] font-body text-white/65">Vivekananda Global University</p>
                  </div>
                  <div className="flex gap-1.5">
                    {['NAAC A+', 'UGC', 'AICTE'].map(b => (
                      <span key={b} className="rounded-full bg-white/20 border border-white/30 px-2.5 py-0.5 text-[10px] font-heading font-bold text-white">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4-stat row */}
                <div className="grid grid-cols-4 gap-1 pt-4 border-t border-white/20">
                  {[
                    { value: '50K+', label: 'Learners'  },
                    { value: '95%',  label: 'Placed'    },
                    { value: '4.8',  label: 'Rating'    },
                    { value: '30+',  label: 'Programs'  },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <div className="font-heading font-black text-[17px] text-vgu-yellow leading-none">{s.value}</div>
                      <div className="mt-0.5 text-[10px] font-body text-white/60">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right: placeholder image + floating badges ── */}
        <div className="hidden xl:flex items-center justify-center">
          {/*
            py-8 gives 32 px above and below the image so badges at
            -top-5 / -bottom-5 (20 px) stay fully within this wrapper.
            No horizontal bleed - badges use positive left/right values.
          */}
          <div className="relative w-full py-8">
            {/* Badges float over the background image in the right column */}
            <div className="relative w-full aspect-[4/3]">

              {/* Badge 1 - top-left, straddles the top edge */}
              <div
                className="absolute -top-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                style={{ animationDelay: '0s' }}
              >
                <div className="font-heading font-black text-[22px] leading-none text-vgu-red">50,000+</div>
                <div className="mt-1 text-[11px] font-body text-neutral-600">Learners enrolled</div>
              </div>

              {/* Badge 2 - top-right, staggered slightly lower */}
              <div
                className="absolute -top-3 right-5 z-10 animate-float-up flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                style={{ animationDelay: '2s' }}
              >
                <span className="relative flex h-2.5 w-2.5 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <div>
                  <div className="font-heading text-[12px] font-bold text-neutral-900">Live now</div>
                  <div className="text-[10px] font-body text-neutral-600">Counsellor available</div>
                </div>
              </div>

              {/* Badge 3 - bottom-left, straddles the bottom edge */}
              <div
                className="absolute -bottom-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                style={{ animationDelay: '0.7s' }}
              >
                <div className="font-heading font-black text-[22px] leading-none text-vgu-red">95%</div>
                <div className="mt-1 text-[11px] font-body text-neutral-600">Placement rate</div>
              </div>

              {/* Badge 4 - bottom-right, staggered slightly higher */}
              <div
                className="absolute -bottom-3 right-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                style={{ animationDelay: '1.3s' }}
              >
                <div className="flex gap-0.5 text-vgu-yellow text-[13px]">★★★★★</div>
                <div className="font-heading font-black text-[18px] leading-none text-vgu-red mt-1">4.8 / 5</div>
                <div className="mt-0.5 text-[11px] font-body text-neutral-600">12,400+ reviews</div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
