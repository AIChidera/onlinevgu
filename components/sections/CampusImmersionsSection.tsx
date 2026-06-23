'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import {
  IconStar,
  IconBriefcase,
  IconUsers,
  IconFlask,
  IconCertificate,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityCampusEvent } from '@/lib/sanity'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyIcon = React.ComponentType<any>

const THEME_MAP: Record<string, { gradient: string; Icon: AnyIcon }> = {
  blue:   { gradient: 'from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a]', Icon: IconBriefcase  },
  orange: { gradient: 'from-[#b45309] via-[#92400e] to-[#78350f]', Icon: IconCertificate },
  green:  { gradient: 'from-[#059669] via-[#047857] to-[#065f46]', Icon: IconUsers       },
  purple: { gradient: 'from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]', Icon: IconFlask       },
  red:    { gradient: 'from-[#C04036] via-[#9b2f26] to-[#821a12]', Icon: IconStar        },
}

interface Card {
  title:    string
  subtitle: string
  tag:      string
  gradient: string
  Icon:     AnyIcon
  image?:   string
}

function fromSanityEvent(e: SanityCampusEvent): Card {
  const theme = THEME_MAP[e.colorTheme] ?? THEME_MAP.blue
  const firstTag = (e.tags ?? [])[0]
  return {
    title:    e.title,
    subtitle: e.subtitle ?? '',
    tag:      firstTag?.label?.toUpperCase() ?? 'EVENT',
    gradient: theme.gradient,
    Icon:     theme.Icon,
    image:    e.photoUrl ?? undefined,
  }
}

// Fallback CARDS - updated to reflect actual VGU campus events open to online students
const CARDS: Card[] = [
  {
    title:    'Panache, the annual cultural fest',
    subtitle: 'Three nights of dance, music, food, and the loudest VGU sing-along of the year.',
    tag:      'FLAGSHIP',
    gradient: 'from-[#C04036] via-[#9b2f26] to-[#821a12]',
    Icon:     IconStar,
    image:    'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Open-air movie nights',
    subtitle: 'Friday screenings on the quad, with projector, snacks, and a few hundred students under one sky.',
    tag:      'SOCIAL',
    gradient: 'from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a]',
    Icon:     IconStar,
    image:    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Workshops & guest seminars',
    subtitle: 'Industry leaders and visiting faculty take you deep on AI, finance, design, and leadership.',
    tag:      'LEARN',
    gradient: 'from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]',
    Icon:     IconFlask,
    image:    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Hackathons & bootcamps',
    subtitle: 'Build real products in 48 hours with industry mentors, then pitch to recruiters on day three.',
    tag:      'BUILD',
    gradient: 'from-[#059669] via-[#047857] to-[#065f46]',
    Icon:     IconBriefcase,
    image:    'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Convocation on campus',
    subtitle: 'Walk the stage, collect your degree, and celebrate two years of work with family by your side.',
    tag:      'MILESTONE',
    gradient: 'from-[#b45309] via-[#92400e] to-[#78350f]',
    Icon:     IconCertificate,
    image:    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=640&q=80&auto=format&fit=crop',
  },
]

// Softer 3D - Bible §05 light source: subtle depth, not casino rotation
function getTransform(offset: number) {
  switch (offset) {
    case 0:  return { transform: 'translateX(0) scale(1) rotateY(0deg)',           zIndex: 10, opacity: 1,    filter: 'brightness(1)'    }
    case 1:  return { transform: 'translateX(280px) scale(0.92) rotateY(-7deg)',   zIndex: 7,  opacity: 1,    filter: 'brightness(0.92)' }
    case 2:  return { transform: 'translateX(500px) scale(0.82) rotateY(-12deg)',  zIndex: 4,  opacity: 0.9,  filter: 'brightness(0.80)' }
    case 3:  return { transform: 'translateX(-500px) scale(0.82) rotateY(12deg)',  zIndex: 4,  opacity: 0.9,  filter: 'brightness(0.80)' }
    case 4:  return { transform: 'translateX(-280px) scale(0.92) rotateY(7deg)',   zIndex: 7,  opacity: 1,    filter: 'brightness(0.92)' }
    default: return { transform: 'translateX(0) scale(0)',                         zIndex: 0,  opacity: 0,    filter: 'brightness(1)'    }
  }
}

export default function CampusImmersionsSection({ events: sanityEvents = [] }: { events?: SanityCampusEvent[] }) {
  const activeCards = sanityEvents.length > 0 ? sanityEvents.map(fromSanityEvent) : CARDS
  const [active, setActive] = useState(0)
  const total = activeCards.length

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total])
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total])

  return (
    <section id="campus" className="sketch-hover-group group relative overflow-hidden bg-neutral-900 py-16 lg:py-24">
      <SketchFlourish shape="swoop" color="white" opacity={0.07} strokeWidth={28} />
      <SketchFlourish shape="wave"  color="white" opacity={0.05} strokeWidth={20} className="translate-y-1/3" />
      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            On-Campus Experiences
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-white md:text-[36px] lg:text-[40px]">
            More than classes. More than online.
          </h2>
          <p className="md:hidden mt-4 text-[15px] font-body leading-[1.7] text-white/60 max-w-[560px] mx-auto">
            Online students are invited to VGU&apos;s signature campus event.
          </p>
          <p className="hidden md:block mt-4 text-[15px] lg:text-[17px] font-body leading-[1.7] text-white/60 max-w-[560px] mx-auto">
            Online students are invited to VGU&apos;s signature campus events. No extra cost.
          </p>
        </div>
      </div>

      <div data-animate="fade-up" className="relative z-10">

      {/* ── MOBILE: native CSS snap scroll ── */}
      <div
        className="md:hidden relative z-10 px-5 scroll-pl-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {activeCards.map((card) => (
          <div
            key={card.title}
            className="snap-start flex-none w-[78vw] max-w-[300px] rounded-2xl overflow-hidden relative select-none"
            style={{ height: '360px' }}
          >
            {card.image ? (
              <Image src={card.image} alt={card.title} fill className="object-cover" sizes="300px" />
            ) : (
              <>
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10" />
                <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-white/[0.08]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <card.Icon size={72} stroke={1} className="text-white/20" />
                </div>
              </>
            )}

            {/* Single tag - top-left */}
            <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
              {card.tag}
            </span>

            {/* Scrim + content */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 pt-20"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 55%, transparent 100%)' }}
            >
              <h3 className="font-heading font-bold text-[17px] leading-[1.3] text-white">
                {card.title}
              </h3>
              <p className="mt-1.5 text-[12px] font-body text-white/75 leading-[1.5]">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: soft 3D carousel ── */}
      <div
        className="hidden md:flex relative z-10 justify-center mt-6"
        style={{ perspective: '1400px', perspectiveOrigin: 'center center' }}
      >
        <div className="relative" style={{ width: '320px', height: '420px' }}>
          {activeCards.map((card, i) => {
            const offset    = (i - active + total) % total
            const pos       = getTransform(offset)
            const clickable = offset === 1 || offset === 4

            return (
              <div
                key={card.title}
                onClick={clickable ? () => setActive(i) : undefined}
                className={[
                  'absolute inset-0 rounded-2xl overflow-hidden select-none',
                  'transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  clickable ? 'cursor-pointer hover:scale-[1.02]' : '',
                  offset === 2 || offset === 3 ? 'pointer-events-none' : '',
                ].join(' ')}
                style={{ transformStyle: 'preserve-3d', ...pos }}
              >
                {card.image ? (
                  <Image src={card.image} alt={card.title} fill className="object-cover" sizes="320px" />
                ) : (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                    <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10" />
                    <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-white/[0.08]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <card.Icon size={80} stroke={1} className="text-white/25" />
                    </div>
                  </>
                )}

                {/* Single tag - top-left */}
                <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-wider text-neutral-900 shadow-sm">
                  {card.tag}
                </span>

                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-16"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, transparent 100%)' }}
                >
                  <h3 className="font-heading font-bold text-[18px] leading-[1.3] text-white">
                    {card.title}
                  </h3>
                  {/* Subtitle now ALWAYS visible - Bible §08 transparency */}
                  <p className="mt-1.5 text-[13px] font-body text-white/75 leading-[1.5]">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop controls + lead CTA */}
      <div className="hidden md:flex relative z-10 mt-14 flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="h-11 w-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:border-vgu-red hover:bg-vgu-red hover:text-white hover:shadow-lg transition-all duration-150"
            aria-label="Previous"
          >
            <IconChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {activeCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="flex items-center justify-center h-11 px-1.5"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={[
                  'block rounded-full transition-all duration-200',
                  active === i
                    ? 'w-6 h-2.5 bg-vgu-red'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/60',
                ].join(' ')} />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="h-11 w-11 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:border-vgu-red hover:bg-vgu-red hover:text-white hover:shadow-lg transition-all duration-150"
            aria-label="Next"
          >
            <IconChevronRight size={20} />
          </button>
        </div>

        <p className="text-[13px] font-body text-white/35">
          {active + 1} / {total}
        </p>
      </div>

      </div>{/* end animated wrapper */}
    </section>
  )
}
