'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { IconArrowRight, IconClock } from '@tabler/icons-react'
import { DISCIPLINE_ORDER, type Discipline } from './data'
import { PROGRAM_META, type ProgramMeta } from './meta'

export interface ProgramGridItem {
  slug:            string
  name:            string
  fullName:        string
  level:           'ug' | 'pg' | 'cert'
  discipline:      string
  duration:        string
  fee:             string
  popular?:        boolean
  specialisations: string[]
  image?:          string | null
}

type Filter = 'all' | 'ug' | 'pg' | 'cert'

// Brand-palette accent rotation per discipline.
// vgu-red is the primary; vgu-yellow and vgu-red-dark add visual variety
// without leaving the brand. Swap to all vgu-red for monochrome.
const DISC_ACCENT: Record<string, string> = {
  'Management':             '#C04036', // vgu-red
  'Information Technology': '#FFA412', // vgu-yellow
  'Commerce':               '#821a12', // vgu-red-dark
  'Arts':                   '#C04036', // vgu-red
  'Science':                '#FFA412', // vgu-yellow
  'Data Science':           '#821a12', // vgu-red-dark
  'Media & Journalism':     '#C04036', // vgu-red
}

export default function ProgramsGrid({
  programmes,
  nextBatch,
}: {
  programmes: ProgramGridItem[]
  nextBatch:  string
}) {
  const [filter, setFilter] = useState<Filter>('all')
  const visible = filter === 'all' ? programmes : programmes.filter(p => p.level === filter)

  const FILTERS: { value: Filter; label: string; count: number }[] = [
    { value: 'all',  label: 'All Programs', count: programmes.length },
    { value: 'ug',   label: 'Bachelors',    count: programmes.filter(p => p.level === 'ug').length   },
    { value: 'pg',   label: 'Masters',      count: programmes.filter(p => p.level === 'pg').length   },
    { value: 'cert', label: 'Certificates', count: programmes.filter(p => p.level === 'cert').length },
  ]

  return (
    <section id="programs-grid" className="bg-neutral-50 py-12 px-5 md:px-8 lg:px-12 md:py-16">
      <div className="mx-auto max-w-[1280px]">

        {/* Header + filter row */}
        <div data-animate="fade-up" className="flex flex-wrap items-end justify-between gap-5 mb-10 md:mb-12">
          <div>
            <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-2">
              Browse Programs
            </p>
            <p className="text-[14px] font-body text-neutral-500">
              {visible.length} program{visible.length !== 1 ? 's' : ''} · Next batch {nextBatch}
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={[
                  'rounded-full px-4 py-2.5 text-[13px] font-heading font-semibold transition-all duration-150',
                  filter === f.value
                    ? 'bg-vgu-red text-white shadow-sm'
                    : 'bg-white border border-neutral-200 text-neutral-600 hover:border-vgu-red/50 hover:text-vgu-red',
                ].join(' ')}
              >
                {f.label}
                <span className={[
                  'ml-1.5 text-[11px] tabular-nums',
                  filter === f.value ? 'text-white/70' : 'text-neutral-400',
                ].join(' ')}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Discipline groups */}
        <div className="space-y-14">
          {DISCIPLINE_ORDER.map(discipline => {
            const programs = visible.filter(p => p.discipline === discipline)
            if (programs.length === 0) return null
            return (
              <DisciplineGroup
                key={discipline}
                discipline={discipline}
                programs={programs}
              />
            )
          })}
        </div>

      </div>
    </section>
  )
}

function DisciplineGroup({
  discipline, programs,
}: {
  discipline: Discipline
  programs:   ProgramGridItem[]
}) {
  const accent = DISC_ACCENT[discipline] ?? '#C04036'

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-1 h-6 rounded-full flex-none" style={{ background: accent }} />
        <h3 className="font-heading font-bold text-[20px] text-neutral-800">{discipline}</h3>
        <span className="text-[12px] font-body text-neutral-400">
          {programs.length} program{programs.length !== 1 ? 's' : ''}
        </span>
        <div className="flex-1 h-px bg-neutral-200 hidden sm:block" />
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex sm:hidden gap-4 overflow-x-auto pb-3 -mx-5 px-5 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {programs.map((p, pi) => (
          <div key={p.slug} data-animate="materialize" style={{ animationDelay: `${pi * 70}ms` }} className="flex-none w-[260px] snap-start">
            <ProgramCard programme={p} meta={PROGRAM_META[p.slug]} />
          </div>
        ))}
      </div>

      {/* Tablet + Desktop: grid */}
      <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {programs.map((p, pi) => (
          <div key={p.slug} data-animate="materialize" style={{ animationDelay: `${pi * 70}ms` }} className="h-full">
            <ProgramCard programme={p} meta={PROGRAM_META[p.slug]} />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProgramCard({ programme: p, meta }: { programme: ProgramGridItem; meta: ProgramMeta | undefined }) {
  const levelLabel = p.level === 'ug' ? 'Bachelor' : p.level === 'pg' ? 'Master' : 'Certificate'
  const shown = p.specialisations.slice(0, 2)
  const extra = p.specialisations.length - shown.length
  const iconBg = meta?.iconBg ?? 'linear-gradient(135deg,#C04036,#821a12)'
  const isCert = p.level === 'cert'

  return (
    <article className="group relative flex flex-col h-full bg-white rounded-2xl border border-neutral-200 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] hover:border-transparent">

      {/* Whole-card link for ug/pg (Bible §07 one primary action) */}
      {!isCert && (
        <Link href={`/programs/${p.slug}`} className="absolute inset-0 z-[1]" aria-label={`View ${p.name} details`} tabIndex={-1} />
      )}

      {/* Image / gradient header */}
      <div className="relative h-[148px] flex-none overflow-hidden" style={{ background: iconBg }}>

        {p.image && (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 639px) 260px, (max-width: 767px) calc(50vw - 40px), (max-width: 1279px) calc(33vw - 40px), 300px"
          />
        )}

        {!p.image && meta && (
          <>
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.9) 1px,transparent 1px)', backgroundSize: '18px 18px' }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <meta.Icon size={110} stroke={0.7} className="text-white opacity-[0.10]" />
            </div>
          </>
        )}

        {(meta?.badge || p.popular) && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 rounded-full bg-vgu-yellow px-2.5 py-1 text-[10px] font-heading font-bold text-neutral-900 shadow-sm">
            {meta?.badge ?? '★ Most Popular'}
          </span>
        )}

        <span className="absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-heading font-bold text-white uppercase tracking-wide border border-white/25 bg-black/20 backdrop-blur-sm">
          {levelLabel}
        </span>

        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/55 to-transparent px-4 pb-3 pt-10">
          <div className="flex items-center justify-between">
            <span className="text-white/75 text-[11px] font-body inline-flex items-center gap-1">
              <IconClock size={10} stroke={2} />
              {p.duration}
            </span>
            <span className="font-heading font-black text-[14px] text-white">{p.fee}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 lg:p-5">

        <div className="flex items-start gap-3 mb-3">
          {meta && (
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-none shadow-sm mt-0.5" style={{ background: iconBg }}>
              <meta.Icon size={15} stroke={1.5} className="text-white" />
            </div>
          )}
          <div>
            <h3 className="font-heading font-bold text-[17px] leading-[1.25] text-neutral-900 group-hover:text-vgu-red transition-colors duration-200">
              {p.name}
            </h3>
            <p className="text-[11px] font-body text-neutral-400 leading-snug">{p.fullName}</p>
          </div>
        </div>

        {shown.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {shown.map(s => (
              <span key={s} className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-body text-neutral-600">{s}</span>
            ))}
            {extra > 0 && (
              <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-body text-neutral-400">+{extra} more</span>
            )}
          </div>
        )}
      </div>

      {/* Cert cards: single Enquire CTA (no detail page exists). ug/pg cards: whole-card link, no inner CTA. */}
      {isCert && (
        <div className="relative z-[2] px-4 lg:px-5 pb-4 lg:pb-5 pt-0">
          <a
            href="#counsellor"
            data-apply-trigger
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border-2 border-vgu-red text-vgu-red hover:bg-vgu-red hover:text-white py-2.5 text-[13px] font-semibold font-heading transition-all duration-150"
          >
            Enquire <IconArrowRight size={12} />
          </a>
        </div>
      )}

    </article>
  )
}
