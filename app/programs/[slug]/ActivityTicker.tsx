'use client'

import { useMemo } from 'react'

const ENROLMENTS_THIS_MONTH: Record<string, number> = {
  mba:       167,
  'mba-if':   52,
  mca:       134,
  bca:       121,
  bba:       108,
  ba:         73,
  ma:         49,
  msc:        41,
  majmc:      38,
}

const ACTIVE_TOTAL: Record<string, number> = {
  mba:      4842,
  'mba-if': 1136,
  mca:      3271,
  bca:      2895,
  bba:      2440,
  ba:       1683,
  ma:        927,
  msc:       714,
  majmc:     682,
}

const NAMES = [
  'Aarav', 'Arjun', 'Vivaan', 'Aditya', 'Vihaan', 'Sai', 'Aryan', 'Dhruv',
  'Kabir', 'Reyansh', 'Priya', 'Ananya', 'Pooja', 'Sneha', 'Kavya', 'Divya',
  'Rohit', 'Amit', 'Rahul', 'Vikas', 'Riya', 'Neha', 'Shreya', 'Meera',
  'Ishaan', 'Kartik', 'Manish', 'Nikhil', 'Sakshi', 'Tanvi', 'Akash', 'Deepak',
  'Ritika', 'Anjali', 'Simran', 'Harshit', 'Varun', 'Karthik',
]

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Indore', 'Bhopal', 'Nagpur',
  'Coimbatore', 'Visakhapatnam', 'Patna', 'Ranchi', 'Bhubaneswar', 'Surat',
]

const ACTION_TEXTS = [
  'just enrolled',
  'just downloaded the brochure',
  'just applied',
]

// Seeded LCG shuffle - same output on server and client (no hydration mismatch).
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const j = Math.abs(s) % (i + 1)
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

type Msg = { name: string; city: string; action: string }

export default function ActivityTicker({ slug, name }: { slug: string; name: string }) {
  const enrolled  = ENROLMENTS_THIS_MONTH[slug] ?? 60
  const active    = ACTIVE_TOTAL[slug]           ?? 1200
  const activeStr = active.toLocaleString('en-IN')

  const messages: Msg[] = useMemo(() => {
    const seed   = hashStr(slug + name)
    const names  = seededShuffle(NAMES,  seed)
    const cities = seededShuffle(CITIES, seed ^ 0xdeadbeef)
    const total  = Math.max(names.length, cities.length * 2)
    return Array.from({ length: total }, (_, i) => ({
      name:   names[i % names.length],
      city:   cities[i % cities.length],
      action: ACTION_TEXTS[i % ACTION_TEXTS.length],
    }))
  }, [slug, name])

  // Double the array so the CSS -50% translateX creates a seamless loop.
  const track: Msg[] = [...messages, ...messages]

  return (
    <div className="bg-neutral-900 border-b border-white/[0.06] overflow-hidden">
      <style>{`
        @keyframes vgu-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .vgu-ticker-track {
          animation: vgu-ticker 180s linear infinite;
          will-change: transform;
        }
        .vgu-ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="mx-auto max-w-[1280px] flex items-stretch h-[44px]">

        {/* LIVE pill */}
        <div className="relative z-10 flex-none flex items-center gap-2 pl-4 pr-5">
          <span className="relative flex h-2 w-2 flex-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="text-[11px] font-heading font-bold text-green-400 uppercase tracking-[0.1em]">
            Live
          </span>
          {/* right-side fade bleeding into ticker */}
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-neutral-900 pointer-events-none" />
        </div>

        {/* Scrolling track */}
        <div className="relative flex-1 overflow-hidden flex items-center min-w-0">
          {/* Edge fades */}
          <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-neutral-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-900 to-transparent z-10 pointer-events-none" />

          <div className="vgu-ticker-track flex items-center whitespace-nowrap">
            {track.map((msg, i) => (
              <span key={i} className="whitespace-nowrap text-[13px]">
                <span className="font-heading font-bold text-white">{msg.name}</span>
                <span className="font-body text-white/55"> from </span>
                <span className="font-heading font-bold text-white">{msg.city}</span>
                <span className="font-body text-white/55"> {msg.action}</span>
                <span className="text-white/20 select-none px-5">·</span>
              </span>
            ))}
          </div>
        </div>

        {/* Pinned aggregate stats - desktop only */}
        <div className="hidden md:flex flex-none items-center gap-4 pl-5 pr-5 border-l border-white/[0.08]">
          <span className="inline-flex items-center gap-1.5 text-[12px]">
            <span className="font-heading font-bold text-vgu-yellow">{enrolled}</span>
            <span className="font-body text-white/50">enrolled this month</span>
          </span>
          <span className="text-white/20 select-none text-[12px]">·</span>
          <span className="inline-flex items-center gap-1.5 text-[12px]">
            <span className="font-heading font-bold text-white">{activeStr}+</span>
            <span className="font-body text-white/50">active learners</span>
          </span>
        </div>

      </div>
    </div>
  )
}
