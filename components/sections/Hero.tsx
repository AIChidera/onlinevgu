import Image from 'next/image'
import { IconAward } from '@tabler/icons-react'
import SketchCircle   from '@/components/ui/sketch/SketchCircle'
import type { SanityHomePage } from '@/lib/sanity'

// TODO: swap with a real VGU campus / student photo when the asset is ready
const HERO_IMAGE_SRC =
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&q=80&auto=format&fit=crop'

interface HeroProps {
  nextBatch?: string
  home?: SanityHomePage | null
}

export default function Hero({ nextBatch = 'July 2026', home }: HeroProps) {
  const imageSrc      = home?.heroImageUrl || HERO_IMAGE_SRC
  const eyebrow        = home?.heroEyebrow || 'UGC-Entitled · Online Degrees'
  const headingPrefix  = home?.heroHeadingPrefix || 'Your next'
  const headingHighlight = home?.heroHeadingHighlight || 'promotion'
  const headingSuffix  = home?.heroHeadingSuffix || 'starts here.'
  const subtext        = home?.heroSubtext || 'Built for working professionals. Study evenings and weekends. Finish in 2-3 years.'
  const badgeText       = home?.heroBadgeText || 'Top Online University in Rajasthan'
  const primaryCta     = home?.heroPrimaryCtaLabel || 'Apply Now'
  const secondaryCta   = home?.heroSecondaryCtaLabel || 'Explore Programs'

  return (
    <section className="sketch-hover-group group relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">

      {/* Photo + dark overlay (Bible §06 semi-transparent treatment) */}
      <Image
        src={imageSrc}
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
            {eyebrow}
          </p>

          <h1
            className="anim-load-left font-heading font-bold tracking-tight leading-[1.05] text-white
                       text-[44px] md:text-[60px] lg:text-[72px]"
            style={{ animationDelay: '70ms' }}
          >
            {headingPrefix}{' '}
            <span className="relative inline-block text-vgu-yellow">
              {headingHighlight}
              <SketchCircle delayMs={600} />
            </span><br />
            {headingSuffix}
          </h1>

          <p
            className="anim-load-left mt-8 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/70 md:text-white/85 max-w-[620px]"
            style={{ animationDelay: '140ms' }}
          >
            {subtext}
          </p>

          {/* Ranking badge - last trust signal before the CTAs, distinct from
              the eyebrow above and the plain trust-strip below. Solid gold
              fill (not glass) so it's the boldest colored element in the
              hero - deliberately, since it's the newest, strongest claim. */}
          <div
            className="anim-load-left vgu-badge-shimmer relative overflow-hidden mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-vgu-yellow to-vgu-gold pl-2 pr-4 py-2 w-fit shadow-[0_4px_20px_rgba(255,164,18,0.4)]"
            style={{ animationDelay: '175ms' }}
          >
            <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-white">
              <IconAward size={14} className="text-vgu-red" stroke={2.5} />
            </span>
            <span className="text-[13px] font-heading font-extrabold text-neutral-900 tracking-tight">
              {badgeText}
            </span>
          </div>

          {/* CTAs */}
          <div
            className="anim-load-left relative mt-5 flex flex-col gap-4"
            style={{ animationDelay: '210ms' }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#counsellor"
                data-apply-trigger
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
              >
                {primaryCta}
              </a>
              <a
                href="#programs"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
              >
                {secondaryCta}
              </a>
            </div>

            {/* Trust micro-strip */}
            <p className="text-[12px] font-body text-white/75">
              No entrance exam <span className="text-white/35">·</span> UGC recognised{' '}
              <span className="text-white/35">·</span> {nextBatch} admissions are open
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
