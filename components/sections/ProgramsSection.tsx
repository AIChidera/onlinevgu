'use client'

import { useState } from 'react'
import Link from 'next/link'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/ui/Button'

interface Program {
  name: string
  slug: string
  level: 'ug' | 'pg'
  duration: string
  fee: string
  highlights: string[]
  gradient: string
  icon: string
  badge?: string
}

const PROGRAMS: Program[] = [
  {
    name: 'Online MBA',
    slug: 'online-mba',
    level: 'pg',
    duration: '2 years',
    fee: '₹1,20,000',
    highlights: ['15 specialisations', 'Industry mentors', 'Live sessions'],
    gradient: 'linear-gradient(135deg,#C04036 0%,#821a12 100%)',
    icon: '📈',
    badge: 'Most popular',
  },
  {
    name: 'MBA in Healthcare',
    slug: 'online-mba-healthcare',
    level: 'pg',
    duration: '2 years',
    fee: '₹1,30,000',
    highlights: ['Healthcare focus', 'Hospital tie-ups', 'Internship support'],
    gradient: 'linear-gradient(135deg,#e11d48 0%,#9f1239 100%)',
    icon: '🏥',
  },
  {
    name: 'Online MCA',
    slug: 'online-mca',
    level: 'pg',
    duration: '2 years',
    fee: '₹1,00,000',
    highlights: ['Cloud & AI tracks', 'Coding bootcamps', 'Tech placements'],
    gradient: 'linear-gradient(135deg,#2563eb 0%,#1e3a8a 100%)',
    icon: '💻',
    badge: 'High demand',
  },
  {
    name: 'Online M.Com',
    slug: 'online-mcom',
    level: 'pg',
    duration: '2 years',
    fee: '₹80,000',
    highlights: ['Finance & tax', 'CA prep support', 'Industry case studies'],
    gradient: 'linear-gradient(135deg,#0d9488 0%,#134e4a 100%)',
    icon: '📊',
  },
  {
    name: 'Online MA',
    slug: 'online-ma',
    level: 'pg',
    duration: '2 years',
    fee: '₹70,000',
    highlights: ['6 specialisations', 'Research-oriented', 'NET/SLET prep'],
    gradient: 'linear-gradient(135deg,#7c3aed 0%,#4c1d95 100%)',
    icon: '🎓',
  },
  {
    name: 'Online BBA',
    slug: 'online-bba',
    level: 'ug',
    duration: '3 years',
    fee: '₹90,000',
    highlights: ['Management core', 'Startup ecosystem', 'Live projects'],
    gradient: 'linear-gradient(135deg,#ea580c 0%,#7c2d12 100%)',
    icon: '🚀',
  },
  {
    name: 'Online BCA',
    slug: 'online-bca',
    level: 'ug',
    duration: '3 years',
    fee: '₹85,000',
    highlights: ['Full-stack dev', 'Python & Java', 'Hackathons'],
    gradient: 'linear-gradient(135deg,#4f46e5 0%,#312e81 100%)',
    icon: '⚡',
  },
  {
    name: 'Online B.Com',
    slug: 'online-bcom',
    level: 'ug',
    duration: '3 years',
    fee: '₹75,000',
    highlights: ['Accounting & audit', 'Tally & ERP', 'ICAI prep'],
    gradient: 'linear-gradient(135deg,#059669 0%,#064e3b 100%)',
    icon: '💰',
  },
]

const FILTERS = [
  { label: 'All programs', value: 'all' },
  { label: 'Postgraduate', value: 'pg' },
  { label: 'Undergraduate', value: 'ug' },
]

export default function ProgramsSection() {
  const [filter, setFilter] = useState<'all' | 'ug' | 'pg'>('all')

  const visible = PROGRAMS.filter((p) => filter === 'all' || p.level === filter)

  return (
    <SectionWrapper id="programs" bg="light">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          UGC-entitled online degrees
        </p>
        <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
          Find your program
        </h2>
        <p className="mt-3 text-[17px] text-neutral-600 max-w-[520px] mx-auto leading-relaxed">
          Flexible, industry-aligned degrees designed for working professionals and fresh graduates.
        </p>

        <div className="mt-6 flex justify-center gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value as typeof filter)}
              className={[
                'px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all duration-200',
                filter === f.value
                  ? 'bg-vgu-red text-white shadow-sm'
                  : 'bg-white border border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red',
              ].join(' ')}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1">
        {visible.map((p) => (
          <ProgramCard key={p.slug} program={p} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button variant="secondary" as="a" href="/programs" size="lg">
          View all programs →
        </Button>
      </div>
    </SectionWrapper>
  )
}

function ProgramCard({ program: p }: { program: Program }) {
  return (
    <Link
      href={`/programs/${p.slug}`}
      className="group flex flex-col rounded-xl overflow-hidden border border-neutral-200 bg-white
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-transparent"
    >
      {/* Colored header */}
      <div
        className="relative flex h-[130px] items-end px-5 pb-4 overflow-hidden"
        style={{ background: p.gradient }}
      >
        {/* Dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <span className="relative z-10 text-[36px] leading-none">{p.icon}</span>
        {p.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-neutral-900">
            {p.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-[17px] font-bold text-neutral-900 leading-tight">
          {p.name}
        </h3>
        <div className="mt-1 flex gap-3 text-[13px] text-neutral-500">
          <span>{p.duration}</span>
          <span>·</span>
          <span>{p.fee}</span>
        </div>

        <ul className="mt-3 flex flex-col gap-1.5">
          {p.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-[13px] text-neutral-600">
              <span className="h-1.5 w-1.5 flex-none rounded-full bg-vgu-red/60" />
              {h}
            </li>
          ))}
        </ul>

        <div className="mt-4 pt-3 border-t border-neutral-100">
          <span className="text-sm font-heading font-semibold text-vgu-red group-hover:underline underline-offset-2">
            Explore program →
          </span>
        </div>
      </div>
    </Link>
  )
}
