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
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

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
    desc:    'Every VGU program includes a full Coursera licence. Learn from Google, IBM, Meta, and more at your own pace.',
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
  { value: '200+',    label: 'Live sessions / month', Icon: IconVideo      },
  { value: '500+',    label: 'Expert mentors',        Icon: IconUserHeart  },
  { value: '25,000+', label: 'E-resources',           Icon: IconBooks      },
  { value: '95%',     label: 'Placement rate',        Icon: IconBriefcase  },
]

// ── Component ─────────────────────────────────────────────────────
export default function CourseExperienceSection() {
  const [playing, setPlaying]   = useState(false)
  const [activePanel, setActivePanel] = useState(0)
  const [fading, setFading]     = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref: copyRef, isVisible: copyVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause() } else { void v.play() }
    setPlaying((p) => !p)
  }, [playing])

  const selectPanel = useCallback((i: number) => {
    if (i === activePanel) return
    setFading(true)
    setTimeout(() => { setActivePanel(i); setFading(false) }, 150)
  }, [activePanel])

  const panel = PANELS[activePanel]

  return (
    <div id="course-experience">
      {/* ══════════════════════════════════════════════════════
          PART A - VIDEO BANNER
      ══════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden lg:min-h-[560px] group">
        {/* Gradient fallback — always rendered; shows while video loads or if it fails */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #110805 0%, #821a12 40%, #2d0f0b 70%, #110805 100%)' }}
        />

        {/* Background video */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="https://assets.mixkit.co/videos/preview/4763/4763-720.mp4" type="video/mp4" />
        </video>

        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Dark cinematic overlay — left heavy so text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(17,8,5,0.88) 0%, rgba(17,8,5,0.52) 60%, rgba(17,8,5,0.35) 100%)' }}
        />

        {/* Play / Pause badge — always visible on mobile, shows on hover on desktop */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-body font-semibold text-white backdrop-blur-md bg-black/40 border border-white/20 hover:bg-black/60 transition-all duration-200 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto"
        >
          {playing ? <IconPlayerPause size={14} className="flex-none" /> : <IconPlayerPlay size={14} className="flex-none" />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>

        {/* Content grid */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 h-full flex items-center py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 items-center w-full lg:grid-cols-[1fr_400px] lg:gap-16 xl:grid-cols-[1fr_340px]">

            {/* Left: copy */}
            <div
              ref={copyRef}
              className={['transition-all duration-700', copyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'].join(' ')}
            >
              <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-gold mb-4">
                The VGU Platform
              </p>
              <h2
                className="font-heading font-bold text-[30px] tracking-[-0.5px] leading-[1.1] text-white sm:text-[36px] md:text-[52px]"
              >
                Everything you need to
                learn, right <span className="text-vgu-yellow">in one place.</span>
              </h2>
              <p className="mt-5 text-[15px] font-body leading-[1.7] text-white/70 max-w-[480px] md:text-[17px]">
                Live classes, mentor sessions, a full digital library, Coursera access, and end-to-end
                career support, all inside the VGU learning platform.
              </p>
              <a
                href="#counsellor"
                className="mt-8 inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white rounded-full px-8 py-3.5 text-[15px] font-semibold transition-colors duration-150 shadow-[0_4px_20px_rgba(192,64,54,0.4)]"
              >
                Explore the Platform
              </a>
            </div>

            {/* Right: device mockup */}
            <div className="hidden lg:flex relative justify-center">
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
                className="absolute -bottom-4 -left-6 bg-white rounded-xl px-4 py-3 shadow-xl animate-float-up [animation-delay:1500ms] min-w-[180px]"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="font-heading font-bold text-[12px] text-neutral-900">Class starting now</span>
                </div>
                <p className="text-[11px] font-body text-neutral-500">Strategic Management · MBA Sem 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PART B - PLATFORM EXPLORER
      ══════════════════════════════════════════════════════ */}
      <section className="group relative overflow-hidden bg-neutral-50 py-14 px-5 md:px-8 lg:px-12 lg:py-20">
        <StrokeArt variant="light" />

        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-10">
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Platform Features
            </p>
            <h3 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 md:text-[32px]">
              Everything in the VGU Platform
            </h3>
          </div>

          {/* Explorer panel */}
          <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-sm grid grid-cols-1 lg:grid-cols-[260px_1fr]">

            {/* Left nav */}
            <nav className="flex flex-row overflow-x-auto bg-vgu-red-dark lg:flex-col lg:overflow-x-visible">
              {PANELS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => selectPanel(i)}
                  className={[
                    'flex items-center gap-2.5 px-4 py-3.5 text-left transition-all duration-150',
                    'flex-none whitespace-nowrap border-b-[3px]',
                    'lg:w-full lg:flex-none lg:whitespace-normal lg:border-b-0 lg:border-l-[3px]',
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
            <div className={['bg-white grid grid-cols-1 md:grid-cols-[1fr_1.1fr] transition-opacity duration-150', fading ? 'opacity-0' : 'opacity-100'].join(' ')}>
              {/* Screen illustration */}
              <div
                className="flex items-center justify-center p-8 border-b border-neutral-100 md:border-b-0 md:border-r"
                style={{ background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)' }}
              >
                <div className="w-full max-w-[260px]">
                  {/* Mini screen */}
                  <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-md">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-neutral-100">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-red-300" />
                        <div className="w-2 h-2 rounded-full bg-yellow-300" />
                        <div className="w-2 h-2 rounded-full bg-green-300" />
                      </div>
                      <div className="flex-1 h-3 bg-neutral-200 rounded mx-2" />
                    </div>
                    <div
                      className="aspect-[4/3] p-3 overflow-hidden"
                      style={{ background: 'linear-gradient(135deg, #1e1e2e 0%, #2d1b4e 100%)' }}
                    >
                      <PanelMockup index={activePanel} color={panel.color} />
                    </div>
                  </div>
                  <p className="mt-3 text-center text-[11px] text-neutral-400">
                    {panel.label} · VGU Platform
                  </p>
                </div>
              </div>

              {/* Detail */}
              <div className="p-5 md:p-8 flex flex-col justify-center">
                <span
                  className="inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-body font-bold uppercase tracking-wide mb-4"
                  style={{ background: `${panel.color}15`, color: panel.color, border: `1px solid ${panel.color}30` }}
                >
                  {panel.tag}
                </span>
                <h4 className="font-heading font-bold text-[22px] tracking-[-0.5px] text-neutral-900 leading-[1.2] md:text-[26px]">
                  {panel.title}
                </h4>
                <p className="mt-3 text-[15px] font-body leading-[1.7] text-neutral-500">
                  {panel.desc}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {panel.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[14px] font-body text-neutral-700">
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
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {BOTTOM_STATS.map((s, i) => (
              <div
                key={s.label}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                className="rounded-xl border border-neutral-200 bg-white px-5 py-4 text-center transition-all duration-200 hover:-translate-y-0.5 hover:border-vgu-red hover:shadow-[0_4px_16px_rgba(192,64,54,0.12)]"
              >
                <div className="flex justify-center mb-2">
                  <s.Icon size={18} stroke={1.5} className="text-vgu-red/60" />
                </div>
                <div className="font-heading font-black text-[28px] leading-none text-vgu-red">{s.value}</div>
                <div className="mt-1 text-[12px] font-body text-neutral-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// ── Per-panel contextual mockup sketches ──────────────────────────

function PanelMockup({ index, color }: { index: number; color: string }) {
  switch (index) {
    case 0: return ( // Live Classes
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-black/30 flex items-center justify-center relative overflow-hidden" style={{ height: '82px' }}>
          <div className="absolute top-2 left-2 flex items-center gap-1 rounded px-1.5 py-0.5 bg-red-500/80">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[8px] font-bold text-white tracking-wide">LIVE</span>
          </div>
          <div className="w-8 h-8 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color, background: color + '22' }}>
            <IconPlayerPlay size={12} style={{ color }} />
          </div>
        </div>
        <div className="h-1 rounded-full bg-white/10">
          <div className="h-full rounded-full w-[45%]" style={{ background: color }} />
        </div>
        {[0.9, 0.7, 0.8].map((w, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-white/15 flex-none" />
            <div className="h-1.5 rounded bg-white/15" style={{ width: `${w * 100}%` }} />
          </div>
        ))}
      </div>
    )
    case 1: return ( // Mentor Access
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 rounded-full border-2 bg-white/10 flex items-center justify-center" style={{ borderColor: color }}>
          <IconUserHeart size={18} style={{ color }} />
        </div>
        <div className="space-y-1 text-center">
          <div className="h-2 w-20 rounded bg-white/30 mx-auto" />
          <div className="h-1.5 w-16 rounded bg-white/15 mx-auto" />
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="w-3 h-3 rounded-sm" style={{ background: i <= 4 ? color : 'rgba(255,255,255,0.12)' }} />
          ))}
        </div>
        <div className="flex gap-1.5 flex-wrap justify-center">
          {['Finance', 'Strategy', 'MBA'].map(t => (
            <div key={t} className="px-1.5 py-0.5 rounded bg-white/10 text-[8px] font-bold text-white/60">{t}</div>
          ))}
        </div>
        <div className="px-4 py-1.5 rounded-full text-[9px] font-bold text-white" style={{ background: color + 'CC' }}>
          Book 30-min slot
        </div>
      </div>
    )
    case 2: return ( // Assessments
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1 flex-1 rounded-full bg-white/10">
            <div className="h-full rounded-full w-3/5" style={{ background: color }} />
          </div>
          <span className="text-[9px] text-white/40 flex-none">Q 3/5</span>
        </div>
        <div className="h-2 w-full rounded bg-white/20 mb-0.5" />
        <div className="h-2 w-4/5 rounded bg-white/15 mb-1" />
        {['A','B','C','D'].map((opt, i) => (
          <div key={opt} className="flex items-center gap-2 rounded-lg px-2 py-1.5 border"
               style={{ borderColor: i === 1 ? color : 'rgba(255,255,255,0.10)', background: i === 1 ? color + '20' : 'transparent' }}>
            <div className="w-3 h-3 rounded-full border flex-none"
                 style={{ borderColor: i === 1 ? color : 'rgba(255,255,255,0.2)', background: i === 1 ? color : 'transparent' }} />
            <div className="h-1.5 rounded flex-1" style={{ background: i === 1 ? color + '55' : 'rgba(255,255,255,0.12)' }} />
          </div>
        ))}
      </div>
    )
    case 3: return ( // Library
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 bg-white/10 border border-white/15">
          <div className="w-3 h-3 rounded-full border border-white/30 flex-none" />
          <div className="h-1.5 flex-1 rounded bg-white/20" />
        </div>
        {[1, 0.8, 0.95].map((w, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg p-2 bg-white/[0.04] border border-white/10">
            <div className="w-5 h-7 rounded-sm flex-none" style={{ background: color + (i === 0 ? 'CC' : i === 1 ? '80' : '55') }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 rounded bg-white/25" style={{ width: `${w * 100}%` }} />
              <div className="h-1 rounded bg-white/[0.12] w-3/5" />
            </div>
          </div>
        ))}
      </div>
    )
    case 4: return ( // Coursera
      <div className="flex flex-col gap-2">
        <div className="rounded-xl overflow-hidden border border-white/15">
          <div className="h-10 flex items-center px-3 gap-2" style={{ background: color + '35' }}>
            <div className="w-6 h-6 rounded flex items-center justify-center text-[10px] font-black text-white flex-none" style={{ background: color }}>G</div>
            <div className="space-y-1 flex-1">
              <div className="h-1.5 rounded bg-white/30 w-4/5" />
              <div className="h-1 rounded bg-white/15 w-3/5" />
            </div>
          </div>
          <div className="p-2.5 bg-white/[0.04] space-y-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-2.5 h-2.5 rounded-sm" style={{ background: i <= 4 ? '#FFA412' : 'rgba(255,255,255,0.12)' }} />
              ))}
            </div>
            <div>
              <div className="flex justify-between mb-0.5">
                <div className="text-[8px] text-white/35">Progress</div>
                <div className="text-[8px] text-white/35">72%</div>
              </div>
              <div className="h-1 rounded-full bg-white/10">
                <div className="h-full rounded-full w-[72%]" style={{ background: color }} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-1.5">
          <div className="flex-1 h-5 rounded bg-white/[0.06] border border-white/10" />
          <div className="flex-1 h-5 rounded bg-white/[0.06] border border-white/10" />
        </div>
      </div>
    )
    case 5: return ( // Career Centre
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map(i => (
          <div key={i} className="flex items-center gap-2 rounded-lg px-2 py-1.5 bg-white/[0.05] border border-white/10">
            <div className="w-6 h-6 rounded-lg flex-none" style={{ background: color + (i === 0 ? 'CC' : i === 1 ? '70' : '45') }} />
            <div className="flex-1 space-y-1 min-w-0">
              <div className="h-1.5 rounded bg-white/25 w-4/5" />
              <div className="h-1 rounded bg-white/[0.12] w-3/5" />
            </div>
            <div className="px-2 py-0.5 rounded-full text-[8px] font-bold flex-none"
                 style={{ background: i === 0 ? color : 'rgba(255,255,255,0.08)', color: i === 0 ? 'white' : 'rgba(255,255,255,0.35)' }}>
              Apply
            </div>
          </div>
        ))}
        <div className="text-center mt-0.5">
          <span className="text-[8px] text-white/25">500+ live openings</span>
        </div>
      </div>
    )
    default: return null
  }
}
