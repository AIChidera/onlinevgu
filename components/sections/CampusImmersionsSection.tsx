'use client'

import { useState, useCallback, useEffect } from 'react'
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
}

const CARDS: Card[] = [
  {
    title:    'Welcome & Leadership Orientation',
    subtitle: 'Set your goals, meet your cohort, and hear from VGU leaders on day one.',
    tags:     [{ label: 'Day 1', color: 'gold' }, { label: 'Leadership', color: 'red' }, { label: 'Campus', color: 'green' }],
    gradient: 'from-[#C04036] via-[#9b2f26] to-[#821a12]',
    Icon:     IconStar,
  },
  {
    title:    'Industry Bootcamp & Case Studies',
    subtitle: 'Solve real business problems with industry mentors in intensive 2-day sprints.',
    tags:     [{ label: 'Bootcamp', color: 'red' }, { label: 'Case Studies', color: 'gold' }, { label: 'Industry', color: 'green' }],
    gradient: 'from-[#1d4ed8] via-[#1e40af] to-[#1e3a8a]',
    Icon:     IconBriefcase,
  },
  {
    title:    'Alumni Connect & Career Fair',
    subtitle: 'Build your network with 500+ alumni and meet top recruiters face to face.',
    tags:     [{ label: 'Networking', color: 'green' }, { label: 'Alumni', color: 'gold' }, { label: 'Placements', color: 'red' }],
    gradient: 'from-[#059669] via-[#047857] to-[#065f46]',
    Icon:     IconUsers,
  },
  {
    title:    'Tech & Innovation Lab Immersion',
    subtitle: 'Hands-on sessions in AI, robotics, and cloud labs at VGU\'s innovation centre.',
    tags:     [{ label: 'Tech', color: 'red' }, { label: 'Innovation', color: 'gold' }, { label: 'Hands-on', color: 'green' }],
    gradient: 'from-[#7c3aed] via-[#6d28d9] to-[#4c1d95]',
    Icon:     IconFlask,
  },
  {
    title:    'Convocation Ceremony',
    subtitle: 'Walk the stage, collect your degree, and celebrate with family and peers.',
    tags:     [{ label: 'Graduation', color: 'gold' }, { label: 'Ceremony', color: 'red' }, { label: 'Milestone', color: 'green' }],
    gradient: 'from-[#b45309] via-[#92400e] to-[#78350f]',
    Icon:     IconCertificate,
  },
]

const TAG_STYLES = {
  gold:  'bg-vgu-yellow/20 text-vgu-yellow border border-vgu-yellow/30',
  red:   'bg-white/15 text-white border border-white/25',
  green: 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30',
}

// position offset → transform + z-index
function getTransform(offset: number, isMobile: boolean) {
  if (isMobile) {
    switch (offset) {
      case 0: return { transform: 'translateX(0) scale(1)',                          zIndex: 10, opacity: 1 }
      case 1: return { transform: 'translateX(78%) scale(0.85)',                     zIndex: 7,  opacity: 0.6 }
      case 4: return { transform: 'translateX(-78%) scale(0.85)',                    zIndex: 7,  opacity: 0.6 }
      default:return { transform: 'translateX(0) scale(0)',                          zIndex: 0,  opacity: 0 }
    }
  }
  switch (offset) {
    case 0: return { transform: 'translateX(0) scale(1) rotateY(0deg)',              zIndex: 10, opacity: 1,    filter: 'brightness(1)' }
    case 1: return { transform: 'translateX(290px) scale(0.88) rotateY(-14deg)',     zIndex: 7,  opacity: 1,    filter: 'brightness(0.82)' }
    case 2: return { transform: 'translateX(520px) scale(0.75) rotateY(-22deg)',     zIndex: 4,  opacity: 1,    filter: 'brightness(0.65)' }
    case 3: return { transform: 'translateX(-520px) scale(0.75) rotateY(22deg)',     zIndex: 4,  opacity: 1,    filter: 'brightness(0.65)' }
    case 4: return { transform: 'translateX(-290px) scale(0.88) rotateY(14deg)',     zIndex: 7,  opacity: 1,    filter: 'brightness(0.82)' }
    default: return { transform: 'translateX(0) scale(0)',                           zIndex: 0,  opacity: 0,    filter: 'brightness(1)' }
  }
}

export default function CampusImmersionsSection() {
  const [active, setActive]   = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const total = CARDS.length

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const prev = useCallback(() => setActive((a) => (a - 1 + total) % total), [total])
  const next = useCallback(() => setActive((a) => (a + 1) % total), [total])

  return (
    <section id="campus" className="group relative overflow-hidden bg-[#F9FAFB] py-24 md:py-16">
      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto max-w-[1280px] px-12 lg:px-8 md:px-5">
        {/* Header */}
        <div className="text-center mb-16 md:mb-10">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            On-Campus Experiences
          </p>
          <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-gray-900 md:text-[28px]">
            Campus Immersions
          </h2>
          <p className="mt-4 text-[17px] font-body leading-[1.7] text-gray-500 max-w-[500px] mx-auto">
            Online learning, real-world moments. Join us on campus for five unforgettable experiences.
          </p>
        </div>
      </div>

      {/* Carousel track — full width, overflow visible */}
      <div className="relative z-10 flex justify-center" style={{ perspective: '1200px', perspectiveOrigin: 'center center' }}>
        <div className="relative" style={{ width: '320px', height: '420px' }}>
          {CARDS.map((card, i) => {
            const offset = (i - active + total) % total
            const pos = getTransform(offset, isMobile)
            const clickable = offset === 4 || offset === 1 // left1 or right1

            return (
              <div
                key={card.title}
                onClick={clickable ? () => setActive(i) : undefined}
                className={[
                  'absolute inset-0 rounded-2xl overflow-hidden select-none',
                  'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  clickable ? 'cursor-pointer' : '',
                  offset === 2 || offset === 3 ? 'pointer-events-none' : '',
                ].join(' ')}
                style={{
                  transformStyle: 'preserve-3d',
                  ...pos,
                }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`} />
                {/* Decorative circles */}
                <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/10" />
                <div className="absolute -left-8 -bottom-8 w-36 h-36 rounded-full bg-white/08" />
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <card.Icon size={80} stroke={1} className="text-white/25" />
                </div>

                {/* Bottom overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-16"
                  style={{ background: 'linear-gradient(to top, rgba(130,26,18,0.95) 0%, rgba(130,26,18,0.6) 50%, transparent 100%)' }}
                >
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {card.tags.map((t) => (
                      <span key={t.label} className={`text-[10px] font-body font-semibold px-2.5 py-0.5 rounded-full ${TAG_STYLES[t.color]}`}>
                        {t.label}
                      </span>
                    ))}
                  </div>
                  {/* Title */}
                  <h3 className="font-heading font-bold text-[18px] leading-[1.3] text-white">
                    {card.title}
                  </h3>
                  {/* Subtitle — only on center card */}
                  <p className={[
                    'mt-1.5 text-[13px] font-body text-white/70 leading-[1.5] transition-all duration-300',
                    offset === 0 ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden',
                  ].join(' ')}>
                    {card.subtitle}
                  </p>
                </div>

                {/* Click hint for side cards */}
                {clickable && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors duration-200">
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 text-[12px] font-body font-semibold text-white">
                      View
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mt-14 flex flex-col items-center gap-5 md:mt-10">
        {/* Arrow buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="h-11 w-11 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-vgu-red hover:text-vgu-red hover:shadow-md transition-all duration-150"
            aria-label="Previous"
          >
            <IconChevronLeft size={20} />
          </button>

          {/* Dot nav */}
          <div className="flex items-center gap-2">
            {CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={[
                  'rounded-full transition-all duration-200',
                  active === i
                    ? 'w-6 h-2.5 bg-vgu-red'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-vgu-red/50',
                ].join(' ')}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="h-11 w-11 rounded-full border-2 border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-vgu-red hover:text-vgu-red hover:shadow-md transition-all duration-150"
            aria-label="Next"
          >
            <IconChevronRight size={20} />
          </button>
        </div>

        {/* Card counter */}
        <p className="text-[13px] font-body text-gray-400">
          {active + 1} / {total}
        </p>
      </div>
    </section>
  )
}
