'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { IconClock, IconArrowRight } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'
import { PROGRAMMES, type Programme } from '@/app/programs/data'
import { PROGRAM_META, type ProgramMeta } from '@/app/programs/meta'

type Filter = 'all' | 'ug' | 'pg'

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Programs',  value: 'all' },
  { label: 'Undergraduate', value: 'ug'  },
  { label: 'Postgraduate',  value: 'pg'  },
]

export default function ProgramsSection() {
  const [filter, setFilter] = useState<Filter>('all')

  const degrees = PROGRAMMES.filter(p => p.level !== 'cert')
  const visible = (filter === 'all' ? degrees : degrees.filter(p => p.level === filter)).slice(0, 8)

  return (
    <section id="programs" className="group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <StrokeArt variant="light" />

      <div className="relative z-10 mx-auto max-w-[1280px]">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            UGC-Entitled Degrees
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[40px]">
            Find Your Perfect Program
          </h2>
          <p className="mt-4 text-[15px] font-body leading-[1.7] text-neutral-600 max-w-[520px] mx-auto lg:text-[17px]">
            Industry-aligned degrees delivered fully online, recognised by employers across India and beyond.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex gap-2 overflow-x-auto scrollbar-none -mx-5 px-5 pb-1 sm:justify-center sm:flex-wrap sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                aria-pressed={filter === f.value}
                className={[
                  'flex-none px-5 py-3 rounded-full text-[14px] font-heading font-semibold transition-all duration-200',
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

        {/* ── MOBILE: Manipal-style snap scroll ── */}
        <div className="sm:hidden -mx-5 px-5 flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4" style={{ WebkitOverflowScrolling: 'touch' }}>
          {visible.map((p, i) => (
            <div key={p.slug} className="snap-start flex-none w-[75vw] max-w-[285px]">
              <MobileProgramCard programme={p} meta={PROGRAM_META[p.slug]} delay={i * 80} />
            </div>
          ))}
        </div>

        {/* ── DESKTOP: 4-col grid ── */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((p, i) => (
            <ProgramCard key={p.slug} programme={p} meta={PROGRAM_META[p.slug]} delay={i * 80} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red hover:text-white rounded-full px-8 py-3.5 text-[15px] font-heading font-semibold transition-all duration-200"
          >
            Explore All {PROGRAMMES.length} Programs
            <IconArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  )
}

// ── Desktop grid card (original design, unchanged) ──────────────────────────
function ProgramCard({ programme: p, meta, delay = 0 }: { programme: Programme; meta: ProgramMeta; delay?: number }) {
  const levelLabel =
    p.level === 'ug'   ? 'Undergraduate' :
    p.level === 'pg'   ? 'Postgraduate'  :
                         'Certificate'

  return (
    <Link
      href={`/programs/${p.slug}`}
      data-animate="materialize"
      style={{ animationDelay: `${delay}ms` }}
      className="group/card flex flex-col rounded-[16px] overflow-hidden bg-white
                 border border-neutral-200
                 transition-all duration-300 hover:-translate-y-1.5
                 hover:shadow-[0_12px_32px_rgba(192,64,54,0.14)]"
    >
      {/* Image */}
      <div className="relative h-[200px] w-full flex-none overflow-hidden">
        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52) 0%, transparent 100%)' }}
        />
        {meta?.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-neutral-900 shadow-sm">
            {meta?.badge}
          </span>
        )}
        <span
          className="absolute bottom-3 right-3 z-10 rounded-[4px] px-2 py-0.5 text-[10px] font-heading font-bold text-white uppercase tracking-wide"
          style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.28)' }}
        >
          {levelLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <span className="self-start mb-3 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-wider text-neutral-500">
          {levelLabel}
        </span>
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-none shadow-sm mt-0.5"
            style={{ background: meta.iconBg }}
          >
            <meta.Icon size={17} stroke={1.5} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[18px] leading-[1.2] text-neutral-900">
              {p.name}
            </h3>
            <p className="text-[12px] font-body text-neutral-400 leading-snug mt-0.5">
              {p.fullName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-4">
          <IconClock size={12} stroke={1.5} className="flex-none" />
          <span>{p.duration}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
          <span className="text-vgu-red font-semibold">{p.fee}</span>
        </div>
        {p.specialisations.length > 0 && (
          <span className="self-start rounded-full bg-vgu-red/10 px-3 py-1 text-[11px] font-body font-semibold text-vgu-red mb-4">
            {p.specialisations.length} specialisation{p.specialisations.length !== 1 ? 's' : ''}
          </span>
        )}
        <div className="mt-auto pt-4 border-t border-neutral-100">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-vgu-red text-vgu-red px-4 py-2 text-[13px] font-heading font-semibold group-hover/card:bg-vgu-red group-hover/card:text-white transition-all duration-200">
            View Program
            <IconArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Mobile snap-scroll card ───────────────────────────────────────────────────
// Manipal-style photo header (taller, with badges + university name),
// then full desktop-matching content below.
function MobileProgramCard({ programme: p, meta, delay = 0 }: { programme: Programme; meta: ProgramMeta; delay?: number }) {
  const levelLabel =
    p.level === 'ug' ? 'Undergraduate' :
    p.level === 'pg' ? 'Postgraduate'  :
                       'Certificate'

  return (
    <Link
      href={`/programs/${p.slug}`}
      data-animate="materialize"
      style={{ animationDelay: `${delay}ms` }}
      className="group/card flex flex-col rounded-[16px] overflow-hidden bg-white
                 border border-neutral-200 shadow-[0_2px_12px_rgba(0,0,0,0.07)]
                 transition-all duration-300 hover:-translate-y-1
                 hover:shadow-[0_12px_32px_rgba(192,64,54,0.14)]"
    >
      {/* ── Photo / gradient banner ── */}
      <div className="relative h-[200px] w-full flex-none overflow-hidden">

        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
            sizes="285px"
          />
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: meta.iconBg }} />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <meta.Icon size={80} stroke={1} className="text-white opacity-[0.18]" />
            </div>
          </>
        )}

        {/* Scrim */}
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 100%)' }}
        />

        {/* Top-left: badge */}
        {meta?.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[11px] font-heading font-bold text-neutral-900 shadow-sm">
            {meta?.badge}
          </span>
        )}

        {/* Top-right: specialisation count */}
        {p.specialisations.length > 0 && (
          <span className="absolute top-3 right-3 z-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 px-2 py-0.5 text-[10px] font-body font-semibold text-white">
            {p.specialisations.length} specialisations
          </span>
        )}

        {/* Bottom of photo: university name */}
        <div className="absolute bottom-0 inset-x-0 z-10 px-3.5 pb-2.5">
          <p className="text-[10px] font-body text-white/80">Vivekananda Global University</p>
        </div>
      </div>

      {/* ── Content — same structure as desktop card ── */}
      <div className="flex flex-1 flex-col p-4">

        {/* Level badge */}
        <span className="self-start mb-3 rounded-full bg-neutral-100 px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-wider text-neutral-500">
          {levelLabel}
        </span>

        {/* Icon + name + fullName */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-none shadow-sm mt-0.5"
            style={{ background: meta.iconBg }}
          >
            <meta.Icon size={17} stroke={1.5} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-[17px] leading-[1.2] text-neutral-900">
              {p.name}
            </h3>
            <p className="text-[12px] font-body text-neutral-400 leading-snug mt-0.5">
              {p.fullName}
            </p>
          </div>
        </div>

        {/* Duration + fee */}
        <div className="flex items-center gap-2 text-[13px] text-neutral-500 mb-4">
          <IconClock size={12} stroke={1.5} className="flex-none" />
          <span>{p.duration}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
          <span className="text-vgu-red font-semibold">{p.fee}</span>
        </div>

        {/* Specialisations chip */}
        {p.specialisations.length > 0 && (
          <span className="self-start rounded-full bg-vgu-red/10 px-3 py-1 text-[11px] font-body font-semibold text-vgu-red mb-4">
            {p.specialisations.length} specialisation{p.specialisations.length !== 1 ? 's' : ''}
          </span>
        )}

        {/* CTA */}
        <div className="mt-auto pt-4 border-t border-neutral-100">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-vgu-red text-vgu-red px-4 py-2 text-[13px] font-heading font-semibold group-hover/card:bg-vgu-red group-hover/card:text-white transition-all duration-200">
            View Program
            <IconArrowRight size={13} />
          </span>
        </div>

      </div>
    </Link>
  )
}
