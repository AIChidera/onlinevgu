'use client'

import { useState, useCallback, useEffect } from 'react'
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
import StrokeArt from '@/components/ui/StrokeArt'

interface Card {
  title:    string
  subtitle: string
  tags:     { label: string; color: 'gold' | 'red' | 'green' }[]
  gradient: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:     React.ComponentType<any>
  image?:   string
}

const CARDS: Card[] = [
  {
    title:    'Welcome & Leadership Orientation',
    subtitle: 'Set your goals, meet your cohort, and hear from VGU leaders on day one.',
    tags:     [{ label: 'Day 1', color: 'gold' }, { label: 'Leadership', color: 'red' }, { label: 'Campus', color: 'green' }],
    gradient: 'from-[#C04036] via-[#9b2f26] to-[#821a12]',
    Icon:     IconStar,
    image:    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Industry Bootcamp & Case Studies',
    subtitle: 'Solve real business problems with industry mentors in intensive 2-day sprints.',
    tags:     [{ label: 'Bootcamp', color: 'red' }, { label: 'Case Studies', color: 'gold' }, { label: 'Industry', color: 'green' }],
    gradient: 'from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a]',
    Icon:     IconBriefcase,
    image:    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Alumni Connect & Career Fair',
    subtitle: 'Build your network with 500+ alumni and meet top recruiters face to face.',
    tags:     [{ label: 'Networking', color: 'green' }, { label: 'Alumni', color: 'gold' }, { label: 'Placements', color: 'red' }],
    gradient: 'from-[#059669] via-[#047857] to-[#065f46]',
    Icon:     IconUsers,
    image:    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Tech & Innovation Lab Immersion',
    subtitle: 'Hands-on sessions in AI, robotics, and cloud labs at VGU\'s innovation centre.',
    tags:     [{ label: 'Tech', color: 'red' }, { label: 'Innovation', color: 'gold' }, { label: 'Hands-on', color: 'green' }],
    gradient: 'from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]',
    Icon:     IconFlask,
    image:    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=640&q=80&auto=format&fit=crop',
  },
  {
    title:    'Convocation Ceremony',
    subtitle: 'Walk the stage, collect your degree, and celebrate with family and peers.',
    tags:     [{ label: 'Graduation', color: 'gold' }, { label: 'Ceremony', color: 'red' }, { label: 'Milestone', color: 'green' }],
    gradient: 'from-[#b45309] via-[#92400e] to-[#78350f]',
    Icon:     IconCertificate,
    image:    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=640&q=80&auto=format&fit=crop',
  },
]

const TAG_STYLES = {
  gold:  'bg-vgu-yellow/20 text-vgu-yellow border border-vgu-yellow/30',
  red:   'bg-white/15 text-white border border-white/25',
  green: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30',
}

function getTransform(offset: number) {
  switch (offset) {
    case 0:  return { transform: 'translateX(0) scale(1) rotateY(0deg)',          zIndex: 10, opacity: 1, filter: 'brightness(1)'    }
    case 1:  return { transform: 'translateX(290px) scale(0.88) rotateY(-14deg)', zIndex: 7,  opacity: 1, filter: 'brightness(0.82)' }
    case 2:  return { transform: 'translateX(520px) scale(0.75) rotateY(-22deg)', zIndex: 4,  opacity: 1, filter: 'brightness(0.65)' }
    case 3:  return { transform: 'translateX(-520px) scale(0.75) rotateY(22deg)', zIndex: 4,  opacity: 1, filter: 'brightness(0.65)' }
    case 4:  return { transform: 'translateX(-290px) scale(0.88) rotateY(14deg)', zIndex: 7,  opacity: 1, filter: 'brightness(0.82)' }
    default: return { transform: 'translateX(0) scale(0)',                        zIndex: 0,  opacity: 0, filter: 'brightness(1)'    }
  }
}

export default function CampusImmersionsSection() {
  const [active, setActive]         = useState(0)
  const [paused, setPaused]         = useState(false)
  const [advanceKey, setAdvanceKey] = useState(0)
  const total = CARDS.length

  // Auto-advance on desktop (pauses on hover)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((a) => (a + 1) % total), 4000)
    return () => clearInterval(id)
  }, [paused, total, advanceKey])

  const prev = useCallback(() => {
    setActive((a) => (a - 1 + total) % total)
    setAdvanceKey((k) => k + 1)
  }, [total])
  const next = useCallback(() => {
    setActive((a) => (a + 1) % total)
    setAdvanceKey((k) => k + 1)
  }, [total])

  return (
    <section
      id="campus"
      className="group relative overflow-hidden bg-neutral-50 py-16 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            On-Campus Experiences
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
            Campus Immersions
          </h2>
          <p className="mt-4 text-[15px] font-body leading-[1.7] text-neutral-600 max-w-[500px] mx-auto lg:text-[17px]">
            Online learning, real-world moments. Join us on campus for five unforgettable experiences.
          </p>
        </div>
      </div>

      {/* ── MOBILE: native CSS snap scroll (identical mechanism to Programs cards) ── */}
      <div className="md:hidden relative z-10 -mx-5 px-5 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
        {CARDS.map((card) => (
          <div
            key={card.title}
            className="snap-start flex-none w-[78vw] max-w-[300px] rounded-2xl overflow-hidden relative select-none"
            style={{ height: '360px' }}
          >
            {/* Background */}
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

            {/* Scrim + content */}
            <div
              className="absolute inset-x-0 bottom-0 p-5 pt-20"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 60%, transparent 100%)' }}
            >
              <div className="flex flex-wrap gap-1.5 mb-3">
                {card.tags.map((t) => (
                  <span key={t.label} className={`text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full ${TAG_STYLES[t.color]}`}>
                    {t.label}
                  </span>
                ))}
              </div>
              <h3 className="font-heading font-bold text-[17px] leading-[1.3] text-white">
                {card.title}
              </h3>
              <p className="mt-1.5 text-[12px] font-body text-white/65 leading-[1.5]">
                {card.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP: 3D perspective carousel ── */}
      <div
        className="hidden md:flex relative z-10 justify-center mt-6"
        style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}
      >
        <div className="relative" style={{ width: '320px', height: '420px' }}>
          {CARDS.map((card, i) => {
            const offset    = (i - active + total) % total
            const pos       = getTransform(offset)
            const clickable = offset === 1 || offset === 4

            return (
              <div
                key={card.title}
                onClick={clickable ? () => { setActive(i); setAdvanceKey((k) => k + 1) } : undefined}
                className={[
                  'absolute inset-0 rounded-2xl overflow-hidden select-none',
                  'transition-all duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
                  clickable ? 'cursor-pointer' : '',
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

                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-16"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.40) 55%, transparent 100%)' }}
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.tags.map((t) => (
                      <span key={t.label} className={`text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full ${TAG_STYLES[t.color]}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-[18px] leading-[1.3] text-white">
                    {card.title}
                  </h3>
                  <p className={[
                    'mt-1.5 text-[13px] font-body text-white/70 leading-[1.5] transition-all duration-300',
                    offset === 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden',
                  ].join(' ')}>
                    {card.subtitle}
                  </p>
                </div>

                {clickable && (
                  <div className="group/hint absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-200">
                    <div className="opacity-40 group-hover/hint:opacity-100 transition-opacity duration-200 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-[12px] font-body font-semibold text-white">
                      View
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Desktop controls only */}
      <div className="hidden md:flex relative z-10 mt-14 flex-col items-center gap-5">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="h-11 w-11 rounded-full border-2 border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-vgu-red hover:text-vgu-red hover:shadow-md transition-all duration-150"
            aria-label="Previous"
          >
            <IconChevronLeft size={20} />
          </button>

          <div className="flex items-center gap-1">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActive(i); setAdvanceKey((k) => k + 1) }}
                className="flex items-center justify-center h-11 px-1.5"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={[
                  'block rounded-full transition-all duration-200',
                  active === i
                    ? 'w-6 h-2.5 bg-vgu-red'
                    : 'w-2.5 h-2.5 bg-neutral-300 hover:bg-vgu-red/50',
                ].join(' ')} />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="h-11 w-11 rounded-full border-2 border-neutral-200 bg-white flex items-center justify-center text-neutral-600 hover:border-vgu-red hover:text-vgu-red hover:shadow-md transition-all duration-150"
            aria-label="Next"
          >
            <IconChevronRight size={20} />
          </button>
        </div>

        <p className="text-[13px] font-body text-neutral-400">
          {active + 1} of {total} experiences
        </p>
      </div>
    </section>
  )
}
