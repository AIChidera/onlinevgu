'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import BrandIcon from '@/components/ui/BrandIcon'
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
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
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

// All panels use vgu-red as accent except Coursera (project brand exception).
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
    color:   '#C04036',
  },
  {
    label:   'Assessments',
    tag:     'Auto-graded',
    title:   'Test your knowledge, instantly.',
    desc:    'From weekly quizzes to proctored final exams, all managed on the platform with instant feedback.',
    bullets: ['Auto-graded MCQ quizzes', 'Online proctored exams', 'Assignment submissions', 'Instant feedback & rubrics'],
    Icon:    IconClipboardCheck,
    color:   '#C04036',
  },
  {
    label:   'Library',
    tag:     '25,000+ resources',
    title:   'Research without limits.',
    desc:    "Access JSTOR, IEEE Xplore, and VGU's own digital library. All included, no extra subscription needed.",
    bullets: ['JSTOR & IEEE access', '25,000+ e-books & PDFs', 'Research paper database', 'Citation & reference tools'],
    Icon:    IconBooks,
    color:   '#C04036',
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
    color:   '#C04036',
  },
]

const BOTTOM_STATS = [
  { value: '200+',    label: 'Live sessions / month', Icon: IconVideo      },
  { value: '500+',    label: 'Expert mentors',        Icon: IconUserHeart  },
  { value: '25,000+', label: 'E-resources',           Icon: IconBooks      },
]

// ── Component ─────────────────────────────────────────────────────
export default function CourseExperienceSection() {
  const [playing, setPlaying]   = useState(false)
  const [activePanel, setActivePanel] = useState(0)
  const [fading, setFading]     = useState(false)
  const videoRef    = useRef<HTMLVideoElement>(null)
  const { ref: copyRef, isVisible: copyVisible } = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 })

  useEffect(() => {
    const v = videoRef.current
    if (v) v.playbackRate = 0.6
  }, [])

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
      <div
        className="relative overflow-hidden group cursor-pointer min-h-[480px] md:min-h-[560px] lg:min-h-[640px]"
        onClick={togglePlay}
        aria-label={playing ? 'Pause video' : 'Play video'}
      >
        {/* Gradient fallback - always rendered; shows while video loads or if it fails */}
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
          className="absolute inset-0 w-full h-full object-cover video-pan"
          aria-hidden="true"
        >
          <source src="https://videos.pexels.com/video-files/7683478/7683478-hd_1920_1080_30fps.mp4" type="video/mp4" />
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

        {/* Dark cinematic overlay - left heavy so text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(17,8,5,0.88) 0%, rgba(17,8,5,0.52) 60%, rgba(17,8,5,0.35) 100%)' }}
        />

        {/* Play / Pause badge - stop propagation so it doesn't double-fire with the outer onClick */}
        <button
          onClick={(e) => { e.stopPropagation(); togglePlay(); }}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="absolute top-5 right-5 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-body font-semibold text-white backdrop-blur-md bg-black/40 border border-white/20 hover:bg-black/60 transition-all duration-200 shadow-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 md:pointer-events-none md:group-hover:pointer-events-auto"
        >
          {playing ? <IconPlayerPause size={14} className="flex-none" /> : <IconPlayerPlay size={14} className="flex-none" />}
          <span>{playing ? 'Pause' : 'Play'}</span>
        </button>

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 h-full flex items-center py-12 md:py-16 lg:py-20">
          <div
            ref={copyRef}
            className={['w-full max-w-[680px] transition-all duration-700', copyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'].join(' ')}
          >
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-gold mb-4">
              The VGU Platform
            </p>
            <h2 className="font-heading font-bold text-[30px] tracking-[-0.5px] leading-[1.1] text-white sm:text-[36px] md:text-[48px]">
              Everything you need to
              learn, right <span className="text-vgu-yellow">in one place.</span>
            </h2>
            <p className="mt-5 text-[15px] font-body leading-[1.7] text-white/70 max-w-[520px] md:text-[17px]">
              Live classes, mentor sessions, a full digital library, Coursera access, and end-to-end
              career support, all inside the VGU learning platform.
            </p>
            <a
              href="#counsellor"
              data-counsellor-trigger
              onClick={(e) => e.stopPropagation()}
              className="mt-8 inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white rounded-full px-8 py-3.5 text-[15px] font-heading font-semibold transition-colors duration-150 shadow-[0_4px_20px_rgba(192,64,54,0.4)]"
            >
              Explore the Platform
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          PART B - PLATFORM EXPLORER
      ══════════════════════════════════════════════════════ */}
      <section className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-14 px-5 md:px-8 lg:px-12 lg:py-20">
        <SketchFlourish shape="arc" color="red" opacity={0.06} strokeWidth={10} />
        <div className="relative z-10 mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="text-center mb-10">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Platform Features
            </p>
            <h3 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 md:text-[32px]">
              Explore the platform, feature by feature.
            </h3>
          </div>

          {/* Explorer panel */}
          <div data-animate="materialize" className="rounded-2xl overflow-hidden border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.08)] grid grid-cols-1 lg:grid-cols-[260px_1fr]">

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
                style={{ background: 'linear-gradient(135deg, #fafaf8 0%, #f4f0ed 100%)' }}
              >
                <div key={activePanel} className="w-full max-w-[260px] mockup-entry">
                  {/* Mini screen */}
                  <div className="rounded-xl border border-neutral-200 overflow-hidden shadow-md mockup-float">
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
                  className="inline-flex items-center self-start px-3 py-1 rounded-full text-[11px] font-heading font-semibold uppercase tracking-wide mb-4"
                  style={{ background: `${panel.color}15`, color: panel.color, border: `1px solid ${panel.color}30` }}
                >
                  {panel.tag}
                </span>
                <h4 className="font-heading font-bold text-[22px] tracking-[-0.5px] text-neutral-900 leading-[1.2] md:text-[26px]">
                  {panel.title}
                </h4>
                <p className="mt-3 text-[16px] font-body leading-[1.7] text-neutral-500">
                  {panel.desc}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {panel.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-[16px] font-body text-neutral-700">
                      <span className="flex-none w-5 h-5 rounded-full bg-vgu-red/10 flex items-center justify-center mt-0.5">
                        <IconCheck size={11} className="text-vgu-red" stroke={3} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom stat pills:
              Mobile  → tight horizontal row per card (icon left, value right)
              Tablet+ → centered 3-col grid (icon on top) */}
          <div className="mt-6 flex flex-col gap-2.5 sm:grid sm:grid-cols-3 sm:gap-3">
            {BOTTOM_STATS.map((s, i) => (
              <div
                key={s.label}
                data-animate="fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
                className="flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-all duration-200 hover:border-vgu-red hover:shadow-[0_4px_16px_rgba(192,64,54,0.12)]
                           sm:flex-col sm:items-stretch sm:gap-0 sm:text-center sm:px-5 sm:py-4 sm:hover:-translate-y-0.5"
              >
                <div className="flex-none sm:flex sm:justify-center sm:mb-2">
                  <s.Icon size={20} stroke={1.5} className="text-vgu-red/60" />
                </div>
                <div className="flex-1 min-w-0 flex items-baseline gap-2 sm:flex-none sm:flex-col sm:gap-0 sm:items-stretch">
                  <div className="font-heading font-black text-[24px] leading-none text-vgu-red sm:text-[28px]">{s.value}</div>
                  <div className="text-[12px] font-body text-neutral-500 leading-tight sm:mt-1">{s.label}</div>
                </div>
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
      <div className="flex flex-col gap-2 h-full">
        <div className="relative rounded-lg overflow-hidden flex-none" style={{ height: '88px', background: '#0d0d1a' }}>
          <div className="absolute top-1.5 left-1.5 flex items-center gap-1 rounded px-1.5 py-0.5 bg-red-500">
            <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
            <span className="text-[7px] font-bold text-white tracking-wide">LIVE</span>
          </div>
          <div className="absolute top-1.5 right-1.5 text-[7px] text-white/50">48 watching</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full border border-white/30 bg-white/10 flex items-center justify-center">
              <IconPlayerPlay size={10} className="text-white ml-0.5" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-2 pb-2 pt-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}>
            <p className="text-[8px] font-bold text-white leading-tight">Strategic Management</p>
            <p className="text-[7px] text-white/50">Dr. Arjun Mehta · Week 4 / 12</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
            <div className="h-full w-[45%] bar-fill" style={{ background: color }} />
          </div>
        </div>
        <div className="space-y-1.5 flex-1">
          {[
            { name: 'Priya R.', msg: 'Can we revisit the BCG matrix?', photo: 'https://images.unsplash.com/photo-1463335361701-e90f4c5045d0?w=28&q=80&auto=format&fit=crop&crop=faces' },
            { name: 'Raj K.',   msg: 'Great session, very clear!',     photo: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=28&q=80&auto=format&fit=crop&crop=faces' },
            { name: 'Meera S.', msg: 'When is the assignment due?',    photo: 'https://images.unsplash.com/photo-1607189200597-4d0923ef98c6?w=28&q=80&auto=format&fit=crop&crop=faces' },
          ].map((m, i) => (
            <div key={i} className="flex items-start gap-1.5">
              <div className="w-3.5 h-3.5 rounded-full flex-none overflow-hidden flex-shrink-0">
                <Image src={m.photo} alt={m.name} width={14} height={14} unoptimized className="object-cover w-full h-full" />
              </div>
              <p className="text-[7px] leading-tight">
                <span className="font-bold text-white/70">{m.name}: </span>
                <span className="text-white/45">{m.msg}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    )

    case 1: return ( // Mentor Access
      <div className="flex flex-col gap-2">
        <div className="rounded-lg bg-white/[0.06] border border-white/10 p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full flex-none overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=80&q=80&auto=format&fit=crop&crop=faces" alt="Rahul Verma" width={32} height={32} unoptimized className="object-cover w-full h-full" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] font-bold text-white leading-tight">Rahul Verma</p>
              <p className="text-[7px] text-white/50">VP Product · Flipkart</p>
            </div>
            <span className="text-[8px] font-bold text-vgu-yellow flex-none">★ 4.9</span>
          </div>
          <div className="flex gap-1 mb-2.5">
            {['Product', 'Strategy', 'MBA'].map(t => (
              <span key={t} className="px-1.5 py-0.5 rounded-full text-[6px] font-bold text-white/60 bg-white/10">{t}</span>
            ))}
          </div>
          <p className="text-[7px] text-white/35 mb-1.5">Available slots</p>
          <div className="space-y-1">
            {[
              { slot: 'Today  6:30 PM', active: true  },
              { slot: 'Tomorrow  7:00 PM', active: false },
            ].map(({ slot, active }) => (
              <div key={slot} className="flex items-center justify-between rounded px-2 py-1 border"
                   style={{ borderColor: active ? color + '80' : 'rgba(255,255,255,0.10)', background: active ? color + '20' : 'transparent' }}>
                <span className="text-[8px] text-white/70">{slot}</span>
                {active && (
                  <span className="text-[7px] font-bold text-white px-1.5 py-0.5 rounded-full" style={{ background: color }}>Book</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )

    case 2: return ( // Assessments
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[7px] text-white/40">Question 3 of 5</span>
          <span className="text-[8px] font-bold text-vgu-yellow">12:45</span>
        </div>
        <div className="h-0.5 rounded-full bg-white/10 mb-1">
          <div className="h-full rounded-full w-3/5 bar-fill" style={{ background: color }} />
        </div>
        <p className="text-[8px] font-semibold text-white/80 leading-tight mb-1">
          Which best describes Porter&apos;s Five Forces?
        </p>
        {[
          'A macro-environmental scan tool',
          'An industry competitive analysis model',
          'A financial performance metric',
          'A supply chain framework',
        ].map((opt, i) => (
          <div key={opt} className="flex items-center gap-1.5 rounded px-1.5 py-1 border"
               style={{ borderColor: i === 1 ? color : 'rgba(255,255,255,0.08)', background: i === 1 ? color + '22' : 'transparent' }}>
            <div className="w-2.5 h-2.5 rounded-full border flex-none"
                 style={{ borderColor: i === 1 ? color : 'rgba(255,255,255,0.2)', background: i === 1 ? color : 'transparent' }} />
            <span className="text-[7px] text-white/70 leading-tight">{opt}</span>
          </div>
        ))}
      </div>
    )

    case 3: return ( // Library
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 rounded px-2 py-1.5 bg-white/10 border border-white/15 mb-0.5">
          <span className="text-[9px] text-white/30">⌕</span>
          <span className="text-[7px] text-white/60">International Finance</span>
        </div>
        <p className="text-[7px] text-white/30">3 results in your library</p>
        {[
          { title: 'Global Financial Management', author: 'Shapiro, A.C.', bg: '#C04036' },
          { title: 'International Corp. Finance',  author: 'Madura, J.',    bg: '#FFA412' },
          { title: 'FX Markets and Institutions',  author: 'Pilbeam, K.',   bg: '#821a12' },
        ].map((book, i) => (
          <div key={i} className="flex items-center gap-2 rounded p-1.5 bg-white/[0.04] border border-white/10">
            <div className="w-4 h-5 rounded-sm flex-none" style={{ background: book.bg }} />
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-bold text-white/80 leading-tight truncate">{book.title}</p>
              <p className="text-[6px] text-white/40">{book.author}</p>
            </div>
            <span className="text-[6px] font-bold flex-none" style={{ color }}>PDF</span>
          </div>
        ))}
      </div>
    )

    case 4: return ( // Coursera
      <div className="flex flex-col gap-2">
        <div className="rounded-lg overflow-hidden border border-white/15">
          <div className="h-8 flex items-center px-2 gap-1.5" style={{ background: '#0056D2' }}>
            <div className="w-4 h-4 rounded overflow-hidden flex-none">
              <BrandIcon name="Coursera" />
            </div>
            <span className="text-[8px] font-bold text-white">Coursera</span>
            <span className="ml-auto text-[6px] text-white/60">Included free</span>
          </div>
          <div className="p-2 bg-white/[0.04]">
            <div className="flex items-center gap-1.5 mb-0.5">
              <div className="w-3 h-3 rounded-sm overflow-hidden flex-none">
                <BrandIcon name="Google" />
              </div>
              <p className="text-[8px] font-bold text-white/80 leading-tight">Google Project Management</p>
            </div>
            <p className="text-[7px] text-white/40 mb-1.5">Certificate · 6 months · Google</p>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[7px] text-white/35">Progress</span>
              <span className="text-[7px] font-bold text-vgu-yellow">72%</span>
            </div>
            <div className="h-1 rounded-full bg-white/10">
              <div className="h-full rounded-full w-[72%] bar-fill" style={{ background: '#0056D2' }} />
            </div>
          </div>
        </div>
        {[
          { label: 'IBM Data Science',   brand: 'IBM'  },
          { label: 'Meta Front-End Dev', brand: 'Meta' },
        ].map((c) => (
          <div key={c.label} className="flex items-center gap-2 rounded px-2 py-1.5 bg-white/[0.04] border border-white/10">
            <div className="w-3 h-3 rounded-sm overflow-hidden flex-none">
              <BrandIcon name={c.brand} />
            </div>
            <span className="text-[7px] text-white/60">{c.label}</span>
          </div>
        ))}
      </div>
    )

    case 5: return ( // Career Centre
      <div className="flex flex-col gap-1.5">
        <p className="text-[7px] text-white/35 mb-0.5">500+ live openings · Updated today</p>
        {[
          { role: 'Business Analyst', company: 'TCS',       status: 'Applied',     statusBg: color     },
          { role: 'Product Manager',  company: 'Razorpay',  status: 'Shortlisted', statusBg: '#22c55e' },
          { role: 'Finance Lead',     company: 'HDFC Bank', status: 'New',         statusBg: '#FFA412' },
        ].map((job) => (
          <div key={job.company} className="flex items-center gap-2 rounded px-2 py-1.5 bg-white/[0.05] border border-white/10">
            <div className="w-6 h-6 rounded-lg flex-none overflow-hidden">
              <BrandIcon name={job.company} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[7px] font-bold text-white/80 leading-tight">{job.role}</p>
              <p className="text-[6px] text-white/40">{job.company}</p>
            </div>
            <span className="text-[6px] font-bold px-1.5 py-0.5 rounded-full flex-none text-white"
                  style={{ background: job.statusBg + 'CC' }}>{job.status}</span>
          </div>
        ))}
      </div>
    )

    default: return null
  }
}
