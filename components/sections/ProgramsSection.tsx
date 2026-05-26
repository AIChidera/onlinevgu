'use client'

import { useState } from 'react'
import {
  IconBriefcase,
  IconCode,
  IconHeartRateMonitor,
  IconTie,
  IconDeviceLaptop,
  IconBrain,
  IconArrowRight,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

interface Program {
  name:     string
  slug:     string
  level:    'ug' | 'pg'
  duration: string
  fee:      string
  highlights: string[]
  gradient: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon:     React.ComponentType<any>
  badge?:   string
}

const PROGRAMS: Program[] = [
  {
    name:     'BBA',
    slug:     'bba',
    level:    'ug',
    duration: '3 years',
    fee:      'from ₹45,000/yr',
    highlights: ['Management fundamentals', 'Startup ecosystem', 'Live projects'],
    gradient: 'from-[#C04036] to-[#821a12]',
    Icon:     IconBriefcase,
  },
  {
    name:     'BCA',
    slug:     'bca',
    level:    'ug',
    duration: '3 years',
    fee:      'from ₹45,000/yr',
    highlights: ['Full-stack development', 'Python & Java', 'Hackathons'],
    gradient: 'from-[#1d4ed8] to-[#1e3a8a]',
    Icon:     IconCode,
    badge:    'High demand',
  },
  {
    name:     'MBA Healthcare',
    slug:     'mba-healthcare',
    level:    'pg',
    duration: '2 years',
    fee:      'from ₹60,000/yr',
    highlights: ['Healthcare management', 'Hospital tie-ups', 'Internship support'],
    gradient: 'from-[#059669] to-[#065f46]',
    Icon:     IconHeartRateMonitor,
  },
  {
    name:     'Executive MBA',
    slug:     'exec-mba',
    level:    'pg',
    duration: '18 months',
    fee:      'from ₹75,000/yr',
    highlights: ['For working professionals', 'Weekend live sessions', 'Leadership track'],
    gradient: 'from-[#9333ea] to-[#6b21a8]',
    Icon:     IconTie,
    badge:    'Most popular',
  },
  {
    name:     'MCA',
    slug:     'mca',
    level:    'pg',
    duration: '2 years',
    fee:      'from ₹55,000/yr',
    highlights: ['Cloud & AI tracks', 'Coding bootcamps', 'Tech placements'],
    gradient: 'from-[#0891b2] to-[#155e75]',
    Icon:     IconDeviceLaptop,
  },
  {
    name:     'MSc Data Science & AI',
    slug:     'msc-data-science',
    level:    'pg',
    duration: '2 years',
    fee:      'from ₹65,000/yr',
    highlights: ['ML & deep learning', 'Coursera integration', 'Industry capstone'],
    gradient: 'from-[#ea580c] to-[#9a3412]',
    Icon:     IconBrain,
    badge:    'New',
  },
]

const FILTERS = [
  { label: 'All Programmes', value: 'all' },
  { label: 'Undergraduate',  value: 'ug'  },
  { label: 'Postgraduate',   value: 'pg'  },
]

export default function ProgramsSection() {
  const [filter, setFilter] = useState<'all' | 'ug' | 'pg'>('all')
  const visible = PROGRAMS.filter((p) => filter === 'all' || p.level === filter)

  return (
    <section id="programs" className="group relative overflow-hidden bg-white py-24 px-12 lg:px-8 md:px-5 md:py-16">
      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            UGC-Entitled Degrees
          </p>
          <h2 className="font-heading font-extrabold text-[40px] tracking-tight leading-[1.2] text-gray-900 md:text-[28px]">
            Find Your Perfect Programme
          </h2>
          <p className="mt-4 text-[17px] font-body leading-[1.7] text-gray-500 max-w-[520px] mx-auto">
            Industry-aligned degrees delivered fully online, recognised by employers across India and beyond.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            {FILTERS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value as typeof filter)}
                className={[
                  'px-6 py-2.5 rounded-full text-[14px] font-body font-semibold transition-all duration-200',
                  filter === f.value
                    ? 'bg-vgu-red text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-gray-600 hover:border-vgu-red hover:text-vgu-red',
                ].join(' ')}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
          {visible.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <a
            href="/programs"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-red-50 rounded-lg px-8 py-3 text-[15px] font-semibold transition-colors duration-150"
          >
            Explore All Programmes
            <IconArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}

function ProgramCard({ program: p }: { program: Program }) {
  return (
    <a
      href={`/programs/${p.slug}`}
      className="group/card flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(192,64,54,0.12)]"
    >
      {/* Gradient image placeholder (swap for next/image when photos supplied) */}
      <div className={`relative h-[180px] bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10" />
        <div className="absolute -left-4 -bottom-6 w-20 h-20 rounded-full bg-white/10" />
        {/* Icon */}
        <p.Icon size={44} stroke={1.5} className="text-white/80 relative z-10" />
        {/* Level pill */}
        <span className="absolute bottom-3 left-3 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-body font-semibold text-white uppercase tracking-wide">
          {p.level === 'ug' ? 'Undergraduate' : 'Postgraduate'}
        </span>
        {/* Badge */}
        {p.badge && (
          <span className="absolute top-3 right-3 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-gray-900">
            {p.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading font-semibold text-[20px] leading-[1.3] text-gray-900">
          {p.name}
        </h3>
        <div className="mt-1.5 flex items-center gap-2 text-[13px] text-gray-500">
          <span>{p.duration}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300 flex-none" />
          <span className="text-vgu-red font-semibold">{p.fee}</span>
        </div>

        <ul className="mt-4 flex flex-col gap-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[13px] font-body text-gray-600">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-vgu-red/50" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[14px] font-semibold font-body text-vgu-red group-hover/card:underline underline-offset-2">
            Learn more
          </span>
          <IconArrowRight size={15} className="text-vgu-red opacity-0 group-hover/card:opacity-100 transition-opacity duration-150" />
        </div>
      </div>
    </a>
  )
}
