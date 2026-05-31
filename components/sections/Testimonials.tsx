'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { IconX, IconPlayerPlay } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

interface Story {
  name:       string
  role:       string
  program:    string
  quote:      string
  outcomes:   string[]
  avatar:     string
  videoBg:    string
  videoLabel: string
  videoUrl?:  string
  photo?:     string  // background for video panel, e.g. '/assets/testimonials/priya.jpg'
}

const STORIES: Story[] = [
  {
    name:       'Priya Sharma',
    role:       'MBA · Batch 2023',
    program:    'MBA',
    quote:      'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal: live sessions on weekends, recorded lectures I could replay at midnight. My salary jumped 40% within six months of graduating.',
    outcomes:   ['40% salary hike', 'Placed at Deloitte', 'Promoted in 6 months'],
    avatar:     'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
    videoBg:    'from-[#821a12] to-[#3b0d09]',
    videoLabel: 'Priya\'s journey · 2 min',
  },
  {
    name:       'Arjun Mehta',
    role:       'BCA · Batch 2024',
    program:    'BCA',
    quote:      'The coding curriculum covered Docker, Kubernetes, and React. By final semester I already had three freelance clients. VGU\'s placement cell got me into Infosys Digital before the exams were even over.',
    outcomes:   ['3 freelance clients', 'Infosys Digital offer', 'Full-stack engineer'],
    avatar:     'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    videoBg:    'from-[#1e3a8a] to-[#0f172a]',
    videoLabel: 'Arjun\'s story · 2 min',
  },
  {
    name:       'Kavya Nair',
    role:       'MBA Healthcare · Batch 2023',
    program:    'MBA Healthcare',
    quote:      'Hospital administration is a niche I never thought I could enter without a clinical background. VGU\'s healthcare MBA opened those doors. Apollo Hospitals called me before convocation.',
    outcomes:   ['Apollo Hospitals offer', 'Healthcare manager', 'Zero entrance exam'],
    avatar:     'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    videoBg:    'from-[#065f46] to-[#022c22]',
    videoLabel: 'Kavya\'s experience · 3 min',
  },
  {
    name:       'Rahul Verma',
    role:       'MCA · Batch 2024',
    program:    'MCA',
    quote:      'The Coursera integration meant I was simultaneously earning IBM and Google certificates while completing my MCA. My cloud architecture project got me hired. The placement cell connected me with Amazon India before I even graduated.',
    outcomes:   ['Amazon India offer', 'IBM & Google certs', 'Cloud architect role'],
    avatar:     'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop',
    videoBg:    'from-[#4c1d95] to-[#1e0a3c]',
    videoLabel: 'Rahul\'s outcome · 2 min',
  },
]

export default function Testimonials() {
  const [active, setActive]       = useState(0)
  const [fading, setFading]       = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const story = STORIES[active]

  // Close modal on ESC
  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setModalOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  // Fade transition when switching stories
  const selectStory = useCallback((i: number) => {
    if (i === active) return
    setFading(true)
    setTimeout(() => {
      setActive(i)
      setFading(false)
    }, 150)
  }, [active])

  // Touch swipe on featured panel to switch stories
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
        ? (active + 1) % STORIES.length
        : (active - 1 + STORIES.length) % STORIES.length
      selectStory(next)
    }
  }, [active, selectStory])

  return (
    <>
      <section id="testimonials" className="group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[1280px]">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Student Stories
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
              Real People. Real Outcomes.
            </h2>
          </div>

          {/* Featured panel - fades on story switch; swipeable on touch */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            data-animate="materialize"
            className={[
              'grid gap-0 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm',
              'grid-cols-1 md:grid-cols-[1.1fr_1fr]',
              'transition-opacity duration-150',
              fading ? 'opacity-0' : 'opacity-100',
            ].join(' ')}
          >
            {/* LEFT - video panel */}
            <div
              className="relative min-h-[280px] md:min-h-[380px] flex items-center justify-center cursor-pointer group/video overflow-hidden"
              onClick={() => setModalOpen(true)}
              role="button"
              aria-label={`Play ${story.videoLabel}`}
            >
              {/* Real photo when provided, gradient always as overlay/fallback */}
              {story.photo && (
                <Image
                  src={story.photo}
                  alt={story.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${story.videoBg} ${story.photo ? 'opacity-60' : ''}`} />

              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

              {/* Play button */}
              <div className="relative z-10 flex items-center justify-center">
                <div className="absolute w-28 h-28 rounded-full border-2 border-white/20 group-hover/video:scale-110 transition-transform duration-300" />
                {/* Pulsing inner ring */}
                <div className="absolute w-20 h-20 rounded-full border-2 border-white/35 animate-ping opacity-60" />
                <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover/video:scale-110 group-hover/video:bg-white/30 transition-all duration-200">
                  <IconPlayerPlay size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-end justify-between">
                <div>
                  <p className="font-heading font-bold text-[15px] text-white">{story.name}</p>
                  <p className="text-[12px] font-body text-white/60">{story.videoLabel}</p>
                </div>
                <span className="rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 text-[11px] font-body font-semibold text-white/80 uppercase tracking-wide">
                  {story.program}
                </span>
              </div>
            </div>

            {/* RIGHT - quote panel */}
            <div className="bg-white p-6 md:p-8 flex flex-col justify-center">
              {/* Giant quote mark */}
              <div
                className="font-heading font-extrabold leading-none select-none mb-2 text-vgu-red/[0.18]"
                style={{ fontSize: '72px', lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="font-body text-[16px] leading-[1.75] text-neutral-700 mt-[-18px] line-clamp-4 md:line-clamp-none">
                {story.quote}
              </blockquote>

              {/* Outcomes */}
              <div className="mt-6 flex flex-wrap gap-2">
                {story.outcomes.map((o) => (
                  <span
                    key={o}
                    className="text-[12px] font-body font-semibold px-3 py-1.5 rounded-full bg-vgu-red/[0.07] border border-vgu-red/[0.18] text-vgu-red-dark"
                  >
                    {o}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="mt-6 pt-5 border-t border-neutral-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-none border-2 border-vgu-red/20">
                  <Image src={story.avatar} alt={story.name} fill className="object-cover" sizes="44px" />
                </div>
                <div>
                  <p className="font-heading font-bold text-[15px] text-neutral-900">{story.name}</p>
                  <p className="text-[12px] font-body text-neutral-500">{story.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail strip - 2 col mobile, 4 col desktop */}
          <div data-animate="fade-up" className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STORIES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => selectStory(i)}
                className={[
                  'flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 bg-white',
                  'hover:shadow-md',
                  active === i
                    ? 'border-2 border-vgu-red shadow-sm'
                    : 'border-2 border-neutral-200',
                ].join(' ')}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                  <Image src={s.avatar} alt={s.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="min-w-0">
                  <p className={`font-heading font-bold text-[13px] truncate ${active === i ? 'text-vgu-red' : 'text-neutral-900'}`}>
                    {s.name}
                  </p>
                  <p className="text-[11px] font-body text-neutral-500 truncate">{s.program}</p>
                </div>
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Video modal */}
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
