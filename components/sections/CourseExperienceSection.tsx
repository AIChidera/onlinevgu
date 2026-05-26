'use client'

import { useState, useRef, useCallback } from 'react'
import {
  IconVideo,
  IconUserHeart,
  IconClipboardCheck,
  IconBooks,
  IconCertificate,
  IconBriefcase,
  IconPlayerPause,
  IconPlayerPlay,
  IconCheck,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

// ── Part B: Explorer panels ───────────────────────────────────────
interface Panel {
  label: string
  tag:   string
  title: string
  desc:  string
  bullets: string[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:  React.ComponentType<any>
  color: string
}

const PANELS: Panel[] = [
  {
    label:   'Live Classes',
    tag:     'Live & recorded',
    title:   'Never miss a moment.',
    desc:    'Attend live sessions or catch up with full recordings. Everything is available 24/7 on the platform.',
    bullets: ['Weekend & evening schedules', 'HD video with Q&A chat', 'Attendance auto-tracked', 'Lifetime access to recordings'],
    Icon:    IconVideo,
    color:   '#C04036',
  },
  {
    label:   'Mentor Access',
    tag:     '1-on-1 sessions',
    title:   'Your personal industry guide.',
    desc:    'Book 30-minute slots with 500+ vetted industry mentors, from startup founders to Fortune 500 leaders.',
    bullets: ['500+ mentors across sectors', 'Book slots in 60 seconds', 'Async chat between sessions', 'Recorded for review'],
    Icon:    IconUserHeart,
    color:   '#9333ea',
  },
  {
    label:   'Assessments',
    tag:     'Auto-graded',
    title:   'Test your knowledge, instantly.',
    desc:    'From weekly quizzes to proctored final exams, all managed on the platform with instant feedback.',
    bullets: ['Auto-graded MCQ quizzes', 'Online proctored exams', 'Assignment submissions', 'Instant feedback & rubrics'],
    Icon:    IconClipboardCheck,
    color:   '#059669',
  },
  {
    label:   'Library',
    tag:     '25,000+ resources',
    title:   'Research without limits.',
    desc:    "Access JSTOR, IEEE Xplore, and VGU's own digital library. All included, no extra subscription needed.",
    bullets: ['JSTOR & IEEE access', '25,000+ e-books & PDFs', 'Research paper database', 'Citation & reference tools'],
    Icon:    IconBooks,
    color:   '#0891b2',
  },
  {
    label:   'Coursera',
    tag:     'Included free',
    title:   '7,000+ courses. Zero extra cost.',
    desc:    'Every VGU programme includes a full Coursera licence. Learn from Google, IBM, Meta, and more at your own pace.',
    bullets: ['Google, IBM, Meta courses', 'Completion certificates', 'LinkedIn shareable badges', 'No extra subscription fee'],
    Icon:    IconCertificate,
    color:   '#0056D2',
  },
  {
    label:   'Career Centre',
    tag:     'End-to-end support',
    title:   'From classroom to career.',
    desc:    'Our placement team works with you from day one: resume reviews, mock interviews, and direct recruiter connections.',
    bullets: ['AI-powered resume builder', '500+ mock interviews/year', 'Live job board integration', 'Dedicated placement coordinator'],
    Icon:    IconBriefcase,
    color:   '#FFA412',
  },
]

const BOTTOM_STATS = [
  { value: '200+', label: 'Live sessions / month' },
  { value: '500+', label: 'Expert mentors'        },
  { value: '25k+', label: 'E-resources'           },
  { value: '93%',  label: 'Placement rate'        },
]

// ── Component ─────────────────────────────────────────────────────
export default function CourseExperienceSection() {
  const [playing, setPlaying] = useState(true)
  const [activePanel, setActivePanel] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause() } else { void v.play() }
    setPlaying((p) => !p)
  }, [playing])

  const panel = PANELS[activePanel]

  return (
    <div id="course-experience">
      {/* ══════════════════════════════════════════════════════
          PART A — VIDEO BANNER
      ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden" style={{ minHeight: '560px' }}>
        {/* Video bg (swap gradient for real video when supplied) */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover hidden"
          aria-hidden="true"
        >
          <source src="/videos/course-highlight.mp4" type="video/mp4" />
        </video>

        {/* Gradient fallback background */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 40%, #2d0f0b 70%, #110805 100%)' }}
        />
        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(17,8,5,0.82) 0%, rgba(17,8,5,0.1) 100%)' }}
        />

        {/* Pause / play pill — top right */}
        <button
          onClick={togglePlay}
          className="absolute top-6 right-6 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-body font-semibold text-white transition-colors duration-150"
          style={{ backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}
        >
          {playing ? <IconPlayerPause size={14} /> : <IconPlayerPlay size={14} />}
          {playing ? 'Pause' : 'Play'}
        </button>

        {/* Content grid */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-12 lg:px-8 md:px-5 h-full flex items-center py-20">
          <div className="grid grid-cols-[1fr_400px] gap-16 items-center w-full xl:grid-cols-[1fr_340px] lg:grid-cols-1 lg:gap-10">

            {/* Left: copy */}
            <div>
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-4">
                The VGU Platform
              </p>
              <h2
                className="font-heading font-black leading-[1.1] text-white md:text-[36px] sm:text-[30px]"
                style={{ fontSize: '52px', letterSpacing: '-0.5px' }}
              >
                Everything you need to
                learn, right <span className="text-vgu-yellow">in one place.</span>
              </h2>
              <p className="mt-5 text-[17px] font-body leading-[1.7] text-white/70 max-w-[480px] md:text-[15px]">
                Live classes, mentor sessions, a full digital library, Coursera access, and end-to-end
                career support, all inside the VGU learning platform.
              </p>
              <a
                href="#counsellor"
                className="mt-8 inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-dark text-white rounded-full px-8 py-3.5 text-[15px] font-semibold transition-colors duration-150 shadow-[0_4px_20px_rgba(192,64,54,0.4)]"
              >
                Explore the Platform
              </a>
            </div>

            {/* Right: device mockup */}
            <div className="relative flex justify-center lg:hidden">
              {/* Gold deco accents */}
              <svg className="absolute -top-6 -right-4 opacity-60" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                <line x1="20" y1="0" x2="20" y2="40" stroke="#FFA412" strokeWidth="2"/>
                <line x1="0" y1="20" x2="40" y2="20" stroke="#FFA412" strokeWidth="2"/>
              </svg>
              <svg className="absolute -bottom-4 -left-4 opacity-40" width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <polygon points="14,0 28,28 0,28" fill="none" stroke="#eecf63" strokeWidth="1.5"/>
              </svg>

              {/* Laptop frame */}
              <div className="animate-float-up-slow w-full max-w-[340px]">
                {/* Screen */}
                <div className="rounded-t-xl overflow-hidden border-[6px] border-white/20 shadow-[0_24px_48px_rgba(0,0,0,0.5)]">
                  <div
                    className="aspect-[16/10] flex flex-col"
                    style={{ background: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 100%)' }}
                  >
                    {/* Fake LMS top bar */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <div className="flex-1 h-4 rounded bg-white/10 mx-4" />
                    </div>
                    {/* LMS content skeleton */}
                    <div className="flex flex-1 gap-3 p-3">
                      <div className="w-24 flex flex-col gap-2">
                        {[60,80,70,90,65].map((w,i) => (
                          <div key={i} className="h-3 rounded-full bg-white/10" style={{ width: `${w}%` }}/>
                        ))}
                      </div>
                      <div className="flex-1 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-10 h-10 rounded-full bg-vgu-red/40 mx-auto mb-2 flex items-center justify-center">
                            <IconVideo size={18} className="text-white/70" />
                          </div>
                          <div className="h-2 w-20 bg-white/15 rounded mx-auto" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Laptop base */}
                <div className="h-3 rounded-b-sm bg-white/10 mx-2" />
                <div className="h-1.5 rounded-b-lg bg-white/5 mx-6" />
              </div>

              {/* Floating notification card */}
              <div
                className="absolute -bottom-4 -left-6 bg-white rounded-xl px-4 py-3 shadow-xl animate-float-up min-w-[180px]"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-heading font-bold text-[12px] text-gray-900">Class starting now</span>
                </div>
                <p className="text-[11px] font-body text-gray-500">Strategic Management · MBA Sem 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PART B — PLATFORM EXPLORER
      ══════════════════════════════════════════════════════ */}
      <section className="group relative overflow-hidden bg-[#F9FAFB] py-20 px-12 lg:px-8 md:px-5 md:py-14">
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div className="text-center mb-10">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Platform Features
            </p>
            <h3 className="font-heading font-extrabold text-[32px] tracking-tight text-gray-900 md:text-[24px]">
              Everything in the VGU Platform
            </h3>
          </div>

          {/* Explorer panel */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm grid grid-cols-[260px_1fr] lg:grid-cols-1">

            {/* Left nav */}
            <nav className="flex flex-col" style={{ background: '#821a12' }}>
              {PANELS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => setActivePanel(i)}
                  className={[
                    'flex items-center gap-3 px-5 py-4 text-left transition-all duration-150',
                    'border-l-[3px]',
                    activePanel === i
                      ? 'bg-white/10 border-vgu-yellow'
                      : 'border-transparent hover:bg-white/5 hover:border-white/30',
                  ].join(' ')}
                >
                  <p.Icon
                    size={18}
                    className={activePanel === i ? 'text-vgu-yellow' : 'text-white/50'}
                  />
                  <span className={[
                    'font-body font-semibold text-[14px]',
                    activePanel === i ? 'text-white' : 'text-white/60',
                  ].join(' ')}>
                    {p.label}
                  </span>
                </button>
              ))}
            </nav>

            {/* Right content */}
            <div className="bg-white grid grid-cols-[1fr_1.1fr] md:grid-cols-1">
              {/* Screen illustration */}
              <div
                className="flex items-center justify-center p-8 border-r border-gray-100 md:border-r-0 md:border-b"
                style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)' }}
              >
                <div className="w-full max-w-[260px]">
                  {/* Mini screen */}
                  <div className="rounded-xl border border-gray-200 overflow-hidden shadow-md">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 border-b border-gray-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-300" />
                        <div className="w-2 h-2 rounded-full bg-yellow-300" />
                        <div className="w-2 h-2 rounded-full bg-green-300" />
                      </div>
                      <div className="flex-1 h-3 bg-gray-200 rounded mx-2" />
                    </div>
                    <div
                      className="aspect-[4/3] flex flex-col items-center justify-center p-4 gap-3"
                      style={{ background: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 100%)' }}
                    >
                      <panel.Icon size={36} stroke={1.5} style={{ color: panel.color }} />
                      <div className="text-center">
                        <div className="font-heading font-bold text-[13px] text-white/80">{panel.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">VGU Learning Platform</div>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[11px] text-gray-400">
                    {panel.label} · VGU Platform
                  </p>
                </div>
              </div>

              {/* Detail */}
              <div className="p-8 flex flex-col justify-center md:p-6">
                <span
                  className="inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wide mb-4"
                  style={{ background: `${panel.color}15`, color: panel.color, border: `1px solid ${panel.color}30` }}
                >
                  {panel.tag}
                </span>
                <h4 className="font-heading font-extrabold text-[26px] tracking-tight text-gray-900 leading-[1.2] md:text-[22px]">
                  {panel.title}
                </h4>
                <p className="mt-3 text-[15px] font-body leading-[1.7] text-gray-500">
                  {panel.desc}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {panel.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] font-body text-gray-700">
                      <span className="flex-none w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <IconCheck size={11} className="text-green-600" stroke={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom stat pills */}
          <div className="mt-6 grid grid-cols-4 gap-3 sm:grid-cols-2">
            {BOTTOM_STATS.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-vgu-red hover:shadow-[0_4px_16px_rgba(192,64,54,0.12)]"
              >
                <div className="font-heading font-black text-[28px] leading-none text-vgu-red">{s.value}</div>
                <div className="mt-1 text-[12px] font-body text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
