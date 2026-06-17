'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { IconX, IconPlayerPlay, IconArrowRight, IconTrendingUp } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityTestimonial } from '@/lib/sanity'

const COLOR_TO_GRADIENT: Record<string, string> = {
  red:    'from-[#821a12] to-[#3b0d09]',
  blue:   'from-[#1e3a8a] to-[#0f172a]',
  green:  'from-[#065f46] to-[#022c22]',
  purple: 'from-[#4c1d95] to-[#1e0a3c]',
}

function fromSanity(t: SanityTestimonial): Story {
  return {
    name:            t.name,
    role:            t.role,
    program:         t.program,
    quote:           t.quote,
    outcomes:        t.outcomes ?? [],
    avatar:          t.avatarUrl ?? '',
    videoBg:         COLOR_TO_GRADIENT[t.colorTheme] ?? COLOR_TO_GRADIENT.red,
    videoLabel:      t.videoLabel ?? '',
    videoUrl:        t.videoUrl,
    // Optional new fields - Sanity may not have these yet
    before:          (t as unknown as { before?: string }).before,
    after:           (t as unknown as { after?: string }).after,
    headlineOutcome: (t as unknown as { headlineOutcome?: string }).headlineOutcome,
    photo:           (t as unknown as { photoUrl?: string }).photoUrl ?? t.avatarUrl ?? '',
  }
}

interface Story {
  name:             string
  role:             string
  program:          string
  quote:            string
  outcomes:         string[]
  avatar:           string
  videoBg:          string
  videoLabel:       string
  videoUrl?:        string
  photo?:           string  // large photo for left panel background
  before?:          string  // Bible §09 transformation: starting point
  after?:           string  // Bible §09 transformation: outcome
  headlineOutcome?: string  // Bible §09: one specific outcome chip
}

const STORIES: Story[] = [
  {
    name:            'Priya Sharma',
    role:            'MBA · Class of 2023',
    program:         'MBA',
    quote:           'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal: live sessions on weekends, recorded lectures I could replay at midnight. My salary jumped 40% within six months of graduating.',
    before:          'Operations Lead, mid-tier IT firm',
    after:           'Senior Manager, Deloitte',
    headlineOutcome: '40% salary hike in 6 months',
    outcomes:        ['40% salary hike', 'Placed at Deloitte', 'Promoted in 6 months'],
    avatar:          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
    photo:           'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format&fit=crop',
    videoBg:         'from-[#821a12] to-[#3b0d09]',
    videoLabel:      'Priya\'s journey · 2 min',
  },
  {
    name:            'Arjun Mehta',
    role:            'BCA · Class of 2024',
    program:         'BCA',
    quote:           'The coding curriculum covered Docker, Kubernetes, and React. By final semester I already had three freelance clients. VGU\'s placement cell got me into Infosys Digital before the exams were even over.',
    before:          'School-leaver, no industry experience',
    after:           'Full-stack engineer, Infosys Digital',
    headlineOutcome: 'Hired before final exams',
    outcomes:        ['3 freelance clients', 'Infosys Digital offer', 'Full-stack engineer'],
    avatar:          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    photo:           'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format&fit=crop',
    videoBg:         'from-[#1e3a8a] to-[#0f172a]',
    videoLabel:      'Arjun\'s story · 2 min',
  },
  {
    name:            'Kavya Nair',
    role:            'MBA Healthcare · Class of 2023',
    program:         'MBA Healthcare',
    quote:           'Hospital administration is a niche I never thought I could enter without a clinical background. VGU\'s healthcare MBA opened those doors. Apollo Hospitals called me before convocation.',
    before:          'Pharma sales rep · no admin background',
    after:           'Healthcare Manager, Apollo Hospitals',
    headlineOutcome: 'Hired before convocation',
    outcomes:        ['Apollo Hospitals offer', 'Healthcare manager', 'Zero entrance exam'],
    avatar:          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    photo:           'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80&auto=format&fit=crop',
    videoBg:         'from-[#065f46] to-[#022c22]',
    videoLabel:      'Kavya\'s experience · 3 min',
  },
  {
    name:            'Rahul Verma',
    role:            'MCA · Class of 2024',
    program:         'MCA',
    quote:           'The Coursera integration meant I was simultaneously earning IBM and Google certificates while completing my MCA. My cloud architecture project got me hired. The placement cell connected me with Amazon India before I even graduated.',
    before:          'Junior dev · 2 years experience',
    after:           'Cloud architect, Amazon India',
    headlineOutcome: 'Amazon India offer · pre-graduation',
    outcomes:        ['Amazon India offer', 'IBM & Google certs', 'Cloud architect role'],
    avatar:          'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop',
    photo:           'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80&auto=format&fit=crop',
    videoBg:         'from-[#4c1d95] to-[#1e0a3c]',
    videoLabel:      'Rahul\'s outcome · 2 min',
  },
]

export default function Testimonials({ stories: sanityStories = [] }: { stories?: SanityTestimonial[] }) {
  const activeStories = sanityStories.length > 0 ? sanityStories.map(fromSanity) : STORIES
  const [active, setActive]       = useState(0)
  const [fading, setFading]       = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const story = activeStories[active]

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  const selectStory = useCallback((i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 150)
  }, [active])

  const touchStartX = useRef(0)
  const touchStartY = useRef(0)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
  }, [])
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = touchStartX.current - e.changedTouches[0].clientX
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 30) {
      const next = dx > 0
        ? (active + 1) % activeStories.length
        : (active - 1 + activeStories.length) % activeStories.length
      selectStory(next)
    }
  }, [active, selectStory, activeStories.length])

  return (
    <>
      <section id="testimonials" className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <SketchFlourish shape="wave" color="red" opacity={0.05} strokeWidth={10} />
        <div className="relative z-10 mx-auto max-w-[1280px]">

          {/* Header */}
          <div data-animate="fade-up" className="text-center mb-12">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Student Stories
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              Real People. Real Outcomes.
            </h2>
          </div>

          {/* Featured panel */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-animate="materialize"
            className={[
              'grid gap-0 rounded-2xl overflow-hidden border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)]',
              'grid-cols-1 md:grid-cols-[1.1fr_1fr]',
              'transition-opacity duration-150',
              fading ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            {/* LEFT - video panel (real student photo + tinted gradient) */}
            <div
              className="relative min-h-[280px] md:min-h-[420px] flex items-center justify-center cursor-pointer group/video overflow-hidden"
              onClick={() => setModalOpen(true)}
              role="button"
              aria-label={`Play ${story.videoLabel}`}
            >
              {story.photo && (
                <Image
                  src={story.photo}
                  alt={story.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              )}
              {/* Brand tint over photo for legibility */}
              <div className={`absolute inset-0 bg-gradient-to-br ${story.videoBg} ${story.photo ? 'opacity-55' : ''}`} />

              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

              {/* Play button (placeholder - opens "video coming soon" modal) */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="absolute w-28 h-28 rounded-full border-2 border-white/20 group-hover/video:scale-110 transition-transform duration-300" />
                <div className="absolute w-20 h-20 rounded-full border-2 border-white/35 animate-ping opacity-60" />
                <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover/video:scale-110 group-hover/video:bg-white/30 transition-all duration-200">
                  <IconPlayerPlay size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
                <div>
                  <p className="font-heading font-bold text-[15px] text-white">{story.name}</p>
                  <p className="text-[12px] font-body text-white/65">{story.videoLabel}</p>
                </div>
                <span className="rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 text-[11px] font-body font-semibold text-white/85 uppercase tracking-wide">
                  {story.program}
                </span>
              </div>
            </div>

            {/* RIGHT - quote panel · Bible §10 yellow left accent */}
            <div className="bg-white p-6 md:p-8 flex flex-col justify-center border-l-0 border-t-[3px] border-t-vgu-yellow md:border-t-0 md:border-l-[3px] md:border-l-vgu-yellow">

              {/* Headline outcome chip - Bible §09 one specific outcome */}
              {story.headlineOutcome && (
                <div className="inline-flex self-start items-center gap-1.5 bg-vgu-red/[0.07] border border-vgu-red/20 rounded-full px-3 py-1 mb-5">
                  <IconTrendingUp size={13} className="text-vgu-red flex-none" stroke={2.5} />
                  <span className="text-[12px] font-heading font-bold text-vgu-red-dark uppercase tracking-wide">
                    {story.headlineOutcome}
                  </span>
                </div>
              )}

              {/* Quote with mark behind - Bible §09 visual anchor */}
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -top-4 -left-2 select-none pointer-events-none font-heading font-extrabold leading-none text-vgu-red/[0.15]"
                  style={{ fontSize: '100px', lineHeight: 1 }}
                >
                  &ldquo;
                </div>
                <blockquote className="relative font-body text-[17px] md:text-[19px] leading-[1.65] text-neutral-700 pl-2">
                  {story.quote}
                </blockquote>
              </div>

              {/* Author + before → after - Bible §09 transformation */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-start gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-none border-2 border-vgu-red/20">
                  <Image src={story.avatar} alt={story.name} fill className="object-cover" sizes="44px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-bold text-[15px] text-neutral-900">{story.name}</p>
                  <p className="text-[12px] font-body text-neutral-500">{story.role}</p>
                  {story.before && story.after && (
                    <div className="mt-2 flex items-center flex-wrap gap-x-1.5 gap-y-0.5 text-[12px] font-body">
                      <span className="text-neutral-500">{story.before}</span>
                      <IconArrowRight size={12} className="text-vgu-red flex-none" stroke={2.25} />
                      <span className="font-semibold text-neutral-900">{story.after}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail strip - Bible §10 3px bottom accent on active */}
          <div data-animate="fade-up" className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {activeStories.map((s, i) => (
              <button
                key={s.name}
                onClick={() => selectStory(i)}
                className={[
                  'flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 bg-neutral-50',
                  'border border-neutral-200 hover:shadow-md',
                  active === i
                    ? 'shadow-[inset_0_-3px_0_0_#C04036,0_2px_8px_rgba(0,0,0,0.06)]'
                    : '',
                ].join(' ')}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                  <Image src={s.avatar} alt={s.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="min-w-0">
                  <p className="font-heading font-bold text-[13px] truncate text-neutral-900">
                    {s.name}
                  </p>
                  <p className="text-[11px] font-body text-neutral-500 truncate">{s.program}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Video modal - "video coming soon" placeholder (real videos populated later) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-neutral-900 aspect-video flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {story.photo && (
              <Image src={story.photo} alt={story.name} fill className="object-cover opacity-40" sizes="896px" />
            )}
            <div className={`absolute inset-0 bg-gradient-to-br ${story.videoBg} ${story.photo ? 'opacity-50' : 'opacity-60'}`} />
            <div className="relative z-10 text-center px-8">
              <p className="font-heading font-bold text-[20px] text-white mb-2">{story.videoLabel}</p>
              <p className="font-body text-[14px] text-white/60">Video coming soon.</p>
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
              aria-label="Close"
            >
              <IconX size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
