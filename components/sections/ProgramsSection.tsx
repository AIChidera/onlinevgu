'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconClock, IconArrowRight } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import { PROGRAMMES, type Programme } from '@/app/programs/data'
import { PROGRAM_META, type ProgramMeta } from '@/app/programs/meta'
import type { SanityProgramSummary } from '@/lib/sanity'

type Filter = 'all' | 'ug' | 'pg'

const FILTER_DEFS: { label: string; value: Filter }[] = [
  { label: 'All Programs',  value: 'all' },
  { label: 'Undergraduate', value: 'ug'  },
  { label: 'Postgraduate',  value: 'pg'  },
]

const FALLBACK_IMAGES: Record<string, string> = Object.fromEntries(
  PROGRAMMES.filter(p => p.image).map(p => [p.slug, p.image as string])
)

function toProgram(p: SanityProgramSummary): Programme {
  return {
    slug:            p.slug,
    name:            p.name,
    fullName:        p.fullName,
    level:           p.level as Programme['level'],
    discipline:      p.discipline as Programme['discipline'],
    duration:        p.duration,
    fee:             p.fee,
    popular:         p.popular,
    specialisations: p.specialisations ?? [],
    image:           p.image ?? FALLBACK_IMAGES[p.slug],
  }
}

export default function ProgramsSection({ programmes: sanityProgrammes }: { programmes?: SanityProgramSummary[] }) {
  const [filter, setFilter] = useState<Filter>('all')

  const allProgrammes = sanityProgrammes && sanityProgrammes.length > 0
    ? sanityProgrammes.map(toProgram)
    : PROGRAMMES

  const degrees = allProgrammes.filter(p => p.level !== 'cert')
  const counts = {
    all: degrees.length,
    ug:  degrees.filter(p => p.level === 'ug').length,
    pg:  degrees.filter(p => p.level === 'pg').length,
  }
  const visible = (filter === 'all' ? degrees : degrees.filter(p => p.level === filter)).slice(0, 8)

  return (
    <section id="programs" className="sketch-hover-group group relative overflow-hidden bg-neutral-50 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />
      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* Header - left-aligned, filters right (md+) */}
        <div className="md:flex md:items-end md:justify-between md:gap-10 mb-10 md:mb-12">
          <div data-animate="fade-up" className="max-w-[640px]">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Our Programmes
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
              Choose your path. Build the career you want.
            </h2>
          </div>

          {/* Filter pills */}
          <div
            data-animate="fade-up"
            className="mt-6 md:mt-0 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1
                       sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 md:flex-none md:flex-wrap md:justify-end"
          >
            {FILTER_DEFS.map(f => {
              const active = filter === f.value
              return (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value)}
                  aria-pressed={active}
                  className={[
                    'flex-none inline-flex items-center gap-1.5 px-4 py-3 rounded-full text-[13px] md:text-[14px]',
                    'font-heading font-semibold transition-all duration-200',
                    active
                      ? 'bg-vgu-red text-white shadow-[0_2px_8px_rgba(192,64,54,0.35)]'
                      : 'bg-white border border-neutral-200 text-neutral-700 hover:border-vgu-red hover:text-vgu-red',
                  ].join(' ')}
                >
                  <span>{f.label}</span>
                  <span className={active ? 'text-white/75' : 'text-neutral-400'}>
                    ({counts[f.value]})
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── MOBILE: snap-scroll ── */}
        <div
          className="sm:hidden -mx-5 px-5 scroll-pl-5 flex gap-3 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-none pb-4"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {visible.map((p) => (
            <div key={p.slug} className="snap-start flex-none w-[75vw] max-w-[285px]">
              <MobileProgramCard programme={p} meta={PROGRAM_META[p.slug]} delay={0} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 4-col grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((p, i) => (
            <ProgramCard key={p.slug} programme={p} meta={PROGRAM_META[p.slug]} delay={i * 80} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red hover:text-white rounded-md px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
          >
            Explore All {degrees.length} Programs
            <IconArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Desktop card - Bible §08 anatomy
// ─────────────────────────────────────────────────────────────────────────────
function ProgramCard({ programme: p, meta, delay = 0 }: { programme: Programme; meta: ProgramMeta; delay?: number }) {
  const levelLabel = p.level === 'ug' ? 'UG' : p.level === 'pg' ? 'PG' : 'Cert'
  const hoverRing  = p.level === 'ug'
    ? '0 0 0 2px #FFA412, 0 12px 32px rgba(0,0,0,0.12)'
    : '0 0 0 2px #C04036, 0 12px 32px rgba(192,64,54,0.14)'

  return (
    <Link
      href={`/programs/${p.slug}`}
      data-animate="materialize"
      style={{ animationDelay: `${delay}ms`, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      className="group/card flex flex-col rounded-[16px] overflow-hidden bg-white
                 border border-neutral-200 transition-all duration-300 hover:-translate-y-1.5
                 hover:border-transparent"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = hoverRing }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)' }}
    >
      {/* Image */}
      <div className="relative h-[200px] w-full flex-none overflow-hidden">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: meta.iconBg }} />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '18px 18px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <meta.Icon size={88} stroke={1} className="text-white opacity-[0.18]" />
            </div>
          </>
        )}

        {/* Bottom image scrim */}
        <div className="absolute inset-x-0 bottom-0 h-16 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)' }} />

        {/* Top-left: Most popular / High demand */}
        {meta?.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-1 text-[11px] font-heading font-bold text-neutral-900 shadow-sm">
            {meta.badge}
          </span>
        )}

        {/* Top-right: level pill */}
        <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 backdrop-blur-sm border border-vgu-red/20 px-2.5 py-1 text-[10px] font-heading font-bold text-vgu-red uppercase tracking-wider">
          {levelLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="font-heading font-bold text-[22px] leading-[1.2] text-neutral-900 mb-1.5">
          {p.name}
        </h3>

        {/* Italic outcome line */}
        <p className="font-body italic text-[16px] text-neutral-600 leading-[1.5] mb-4">
          {meta?.outcome ?? 'Industry-aligned, UGC-entitled online degree.'}
        </p>

        {/* Duration */}
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-2">
          <IconClock size={13} stroke={1.75} className="flex-none" />
          <span>{p.duration}</span>
        </div>

        {/* Fee */}
        <div className="text-[15px] font-heading font-bold text-vgu-red mb-5">
          {p.fee}
        </div>

        {/* Full-width CTA */}
        <div className="mt-auto">
          <span className="flex items-center justify-center gap-1.5 rounded-full border-2 border-vgu-red text-vgu-red px-4 py-3 text-[13px] font-heading font-semibold
                           group-hover/card:bg-vgu-red group-hover/card:text-white transition-all duration-200">
            Explore Program
            <IconArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Mobile snap card
// ─────────────────────────────────────────────────────────────────────────────
function MobileProgramCard({ programme: p, meta, delay = 0 }: { programme: Programme; meta: ProgramMeta; delay?: number }) {
  const levelLabel = p.level === 'ug' ? 'UG' : p.level === 'pg' ? 'PG' : 'Cert'
  const hoverRing  = p.level === 'ug'
    ? '0 0 0 2px #FFA412, 0 12px 32px rgba(0,0,0,0.12)'
    : '0 0 0 2px #C04036, 0 12px 32px rgba(192,64,54,0.14)'

  return (
    <Link
      href={`/programs/${p.slug}`}
      data-animate="fade-up"
      style={{ animationDelay: `${delay}ms`, boxShadow: '0 2px 12px rgba(0,0,0,0.07)' }}
      className="group/card flex flex-col rounded-[16px] overflow-hidden bg-white
                 border border-neutral-200 transition-all duration-300 hover:-translate-y-1
                 hover:border-transparent"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = hoverRing }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.07)' }}
    >
      <div className="relative h-[180px] w-full flex-none overflow-hidden">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
            sizes="285px"
          />
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: meta.iconBg }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <meta.Icon size={80} stroke={1} className="text-white opacity-[0.18]" />
            </div>
          </>
        )}

        {/* Bottom image scrim */}
        <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)' }} />

        {meta?.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-1 text-[11px] font-heading font-bold text-neutral-900 shadow-sm">
            {meta.badge}
          </span>
        )}

        <span className="absolute top-3 right-3 z-10 rounded-full bg-white/95 backdrop-blur-sm border border-vgu-red/20 px-2.5 py-1 text-[10px] font-heading font-bold text-vgu-red uppercase tracking-wider">
          {levelLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading font-bold text-[20px] leading-[1.2] text-neutral-900 mb-1.5">
          {p.name}
        </h3>

        <p className="font-body italic text-[16px] text-neutral-600 leading-[1.5] mb-3">
          {meta?.outcome ?? 'Industry-aligned, UGC-entitled online degree.'}
        </p>

        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-1.5">
          <IconClock size={13} stroke={1.75} className="flex-none" />
          <span>{p.duration}</span>
        </div>

        <div className="text-[15px] font-heading font-bold text-vgu-red mb-4">
          {p.fee}
        </div>

        <div className="mt-auto">
          <span className="flex items-center justify-center gap-1.5 rounded-full border-2 border-vgu-red text-vgu-red px-4 py-3 text-[13px] font-heading font-semibold
                           group-hover/card:bg-vgu-red group-hover/card:text-white transition-all duration-200">
            Explore Program
            <IconArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}
