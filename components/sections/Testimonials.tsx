'use client'

import { useState } from 'react'
import Image from 'next/image'
import { IconX, IconPlayerPlay } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

interface Story {
  name:      string
  role:      string
  program:   string
  quote:     string
  outcomes:  string[]
  avatar:    string
  videoBg:   string
  videoLabel: string
  videoUrl?: string
}

const STORIES: Story[] = [
  {
    name:      'Priya Sharma',
    role:      'MBA · Batch 2023',
    program:   'MBA',
    quote:     'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal: live sessions on weekends, recorded lectures I could replay at midnight. My salary jumped 40% within six months of graduating.',
    outcomes:  ['40% salary hike', 'Placed at Deloitte', 'Promoted in 6 months'],
    avatar:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&auto=format&fit=crop',
    videoBg:   'from-[#821a12] to-[#3b0d09]',
    videoLabel: 'Priya\'s journey · 2 min',
  },
  {
    name:      'Arjun Mehta',
    role:      'BCA · Batch 2024',
    program:   'BCA',
    quote:     'The coding curriculum covered Docker, Kubernetes, and React. By final semester I already had three freelance clients. VGU\'s placement cell got me into Infosys Digital before the exams were even over.',
    outcomes:  ['3 freelance clients', 'Infosys Digital offer', 'Full-stack engineer'],
    avatar:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
    videoBg:   'from-[#1e3a8a] to-[#0f172a]',
    videoLabel: 'Arjun\'s story · 2 min',
  },
  {
    name:      'Kavya Nair',
    role:      'MBA Healthcare · Batch 2023',
    program:   'MBA Healthcare',
    quote:     'Hospital administration is a niche I never thought I could enter without a clinical background. VGU\'s healthcare MBA opened those doors. Apollo Hospitals called me before convocation.',
    outcomes:  ['Apollo Hospitals offer', 'Healthcare manager', 'Zero entrance exam'],
    avatar:    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop',
    videoBg:   'from-[#065f46] to-[#022c22]',
    videoLabel: 'Kavya\'s experience · 3 min',
  },
  {
    name:      'Rahul Verma',
    role:      'MSc Data Science & AI · Batch 2024',
    program:   'MSc Data Science',
    quote:     'The Coursera integration meant I was simultaneously earning IBM and Google certificates while doing my MSc. My capstone on demand forecasting got me hired. Amazon India used the same model.',
    outcomes:  ['Amazon India offer', 'IBM & Google certs', 'Research published'],
    avatar:    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80&auto=format&fit=crop',
    videoBg:   'from-[#4c1d95] to-[#1e0a3c]',
    videoLabel: 'Rahul\'s outcome · 2 min',
  },
]

export default function Testimonials() {
  const [active, setActive]       = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const story = STORIES[active]

  return (
    <>
      <section id="testimonials" className="group relative overflow-hidden bg-[#F9FAFB] py-24 px-12 lg:px-8 md:px-5 md:py-16">
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Student Stories
            </p>
            <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-gray-900 md:text-[28px]">
              Real People. Real Outcomes.
            </h2>
          </div>

          {/* Featured panel */}
          <div className="grid gap-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm grid-cols-1 md:grid-cols-[1.1fr_1fr]">

            {/* LEFT — video panel */}
            <div
              className={`relative min-h-[420px] bg-gradient-to-br ${story.videoBg} flex items-center justify-center cursor-pointer group/video md:min-h-[280px]`}
              onClick={() => setModalOpen(true)}
              role="button"
              aria-label={`Play ${story.videoLabel}`}
            >
              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5" />
              <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full bg-white/5" />

              {/* Play button + pulse rings */}
              <div className="relative z-10 flex items-center justify-center">
                {/* Outer pulse ring */}
                <div className="absolute w-28 h-28 rounded-full border-2 border-white/20 group-hover/video:scale-110 transition-transform duration-300" />
                {/* Inner pulse ring — animates */}
                <div className="absolute w-20 h-20 rounded-full border-2 border-white/35 animate-pulse-ring" />
                {/* Play circle */}
                <div className="relative w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover/video:scale-110 group-hover/video:bg-white/30 transition-all duration-200">
                  <IconPlayerPlay size={24} className="text-white ml-1" fill="white" />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <p className="font-heading font-bold text-[15px] text-white">{story.name}</p>
                  <p className="text-[12px] font-body text-white/60">{story.videoLabel}</p>
                </div>
                <span className="rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-3 py-1 text-[11px] font-body font-semibold text-white/80 uppercase tracking-wide">
                  {story.program}
                </span>
              </div>
            </div>

            {/* RIGHT — quote panel */}
            <div className="bg-white p-8 flex flex-col justify-center md:p-6">
              {/* Giant quote mark */}
              <div
                className="font-heading font-extrabold leading-none select-none mb-2"
                style={{ fontSize: '72px', color: '#C04036', opacity: 0.18, lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote className="font-body text-[16px] leading-[1.75] text-gray-700 mt-[-18px]">
                {story.quote}
              </blockquote>

              {/* Outcomes */}
              <div className="mt-6 flex flex-wrap gap-2">
                {story.outcomes.map((o) => (
                  <span
                    key={o}
                    className="text-[12px] font-body font-semibold px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(192,64,54,0.07)',
                      border:     '1px solid rgba(192,64,54,0.18)',
                      color:      '#821a12',
                    }}
                  >
                    {o}
                  </span>
                ))}
              </div>

              {/* Author */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-full overflow-hidden flex-none border-2 border-vgu-red/20">
                  <Image
                    src={story.avatar}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div>
                  <p className="font-heading font-bold text-[15px] text-gray-900">{story.name}</p>
                  <p className="text-[12px] font-body text-gray-500">{story.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-2">
            {STORIES.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActive(i)}
                className={[
                  'flex items-center gap-3 rounded-xl p-3 text-left transition-all duration-200 bg-white',
                  'hover:shadow-md',
                  active === i
                    ? 'border-2 border-vgu-red shadow-sm'
                    : 'border-2 border-transparent border border-gray-200',
                ].join(' ')}
              >
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-none">
                  <Image src={s.avatar} alt={s.name} fill className="object-cover" sizes="40px" />
                </div>
                <div className="min-w-0">
                  <p className={`font-heading font-bold text-[13px] truncate ${active === i ? 'text-vgu-red' : 'text-gray-900'}`}>
                    {s.name}
                  </p>
                  <p className="text-[11px] font-body text-gray-500 truncate">{s.program}</p>
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
            className="relative w-full max-w-3xl rounded-2xl overflow-hidden bg-gray-900 aspect-video flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${story.videoBg} opacity-60`} />
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
