'use client'

import { useState } from 'react'
import Image from 'next/image'
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
  photo: string
  badge?: string
}

const PROGRAMS: Program[] = [
  {
    name: 'Online MBA',
    slug: 'online-mba',
    level: 'pg',
    duration: '2 Years',
    fee: '₹1,20,000',
    highlights: ['15 specialisations', 'Industry mentors', 'Live sessions'],
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop',
    badge: 'Most popular',
  },
  {
    name: 'MBA in Healthcare',
    slug: 'online-mba-healthcare',
    level: 'pg',
    duration: '2 Years',
    fee: '₹1,30,000',
    highlights: ['Healthcare focus', 'Hospital tie-ups', 'Internship support'],
    photo: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Online MCA',
    slug: 'online-mca',
    level: 'pg',
    duration: '2 Years',
    fee: '₹1,00,000',
    highlights: ['Cloud & AI tracks', 'Coding bootcamps', 'Tech placements'],
    photo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80&auto=format&fit=crop',
    badge: 'High demand',
  },
  {
    name: 'Online M.Com',
    slug: 'online-mcom',
    level: 'pg',
    duration: '2 Years',
    fee: '₹80,000',
    highlights: ['Finance & tax', 'CA prep support', 'Industry case studies'],
    photo: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Online MA',
    slug: 'online-ma',
    level: 'pg',
    duration: '2 Years',
    fee: '₹70,000',
    highlights: ['6 specialisations', 'Research-oriented', 'NET/SLET prep'],
    photo: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Online BBA',
    slug: 'online-bba',
    level: 'ug',
    duration: '3 Years',
    fee: '₹90,000',
    highlights: ['Management core', 'Startup ecosystem', 'Live projects'],
    photo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Online BCA',
    slug: 'online-bca',
    level: 'ug',
    duration: '3 Years',
    fee: '₹85,000',
    highlights: ['Full-stack dev', 'Python & Java', 'Hackathons'],
    photo: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80&auto=format&fit=crop',
  },
  {
    name: 'Online B.Com',
    slug: 'online-bcom',
    level: 'ug',
    duration: '3 Years',
    fee: '₹75,000',
    highlights: ['Accounting & audit', 'Tally & ERP', 'ICAI prep'],
    photo: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80&auto=format&fit=crop',
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
          UGC-entitled degrees, built for outcomes
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
      className="group flex flex-col rounded-2xl overflow-hidden border border-neutral-200 bg-white
                 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-transparent"
    >
      {/* Photo header */}
      <div className="relative h-[160px] overflow-hidden">
        <Image
          src={p.photo}
          alt={p.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        {p.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-neutral-900">
            {p.badge}
          </span>
        )}
        <div className="absolute bottom-3 left-3">
          <span className="rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-0.5 text-[11px] font-heading font-semibold text-white uppercase tracking-wide">
            {p.level === 'pg' ? 'Postgraduate' : 'Undergraduate'}
          </span>
        </div>
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
