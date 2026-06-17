'use client'

import Link from 'next/link'
import Image from 'next/image'
import { IconArrowRight, IconClock } from '@tabler/icons-react'

interface ProgCard {
  slug:       string
  name:       string
  fullName:   string
  level:      'ug' | 'pg'
  duration:   string
  feePerYear: string
  image?:     string
}

const LEVEL_CONFIG: Record<'ug' | 'pg', { grad: string; label: string; badgeCls: string; hoverRing: string }> = {
  ug: {
    grad:      'linear-gradient(135deg,#FFA412,#C04036)',
    label:     'Undergraduate',
    badgeCls:  'bg-vgu-yellow text-neutral-900 shadow-sm',
    hoverRing: '0_0_0_2px_#FFA412,0_14px_44px_rgba(0,0,0,0.12)',
  },
  pg: {
    grad:      'linear-gradient(135deg,#C04036,#821a12)',
    label:     'Postgraduate',
    badgeCls:  'bg-vgu-red text-white shadow-sm',
    hoverRing: '0_0_0_2px_#C04036,0_14px_44px_rgba(0,0,0,0.12)',
  },
}

function RelatedCard({ p, delay = 0 }: { p: ProgCard; delay?: number }) {
  const lv = LEVEL_CONFIG[p.level]
  return (
    <Link
      href={`/programs/${p.slug}`}
      data-animate="materialize"
      style={{ animationDelay: `${delay}ms` }}
      className="group flex flex-col rounded-2xl bg-white border border-neutral-200 overflow-hidden hover:border-transparent hover:-translate-y-1.5 transition-all duration-300 h-full"
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = lv.hoverRing }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '' }}
    >
      {/* Image / gradient header */}
      <div className="relative h-[148px] flex-none overflow-hidden" style={{ background: lv.grad }}>
        {/* Dot texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
        />
        {p.image && (
          <Image
            src={p.image}
            alt={p.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 639px) 260px, (max-width: 1023px) calc(50vw - 32px), (max-width: 1279px) calc(25vw - 32px), 280px"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
        {/* Level badge */}
        <span className={`absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-heading font-semibold uppercase tracking-[0.05em] ${lv.badgeCls}`}>
          {lv.label}
        </span>
        {/* Arrow circle */}
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full border border-white/30 bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-200">
          <IconArrowRight size={13} className="text-white group-hover:text-neutral-900 transition-colors duration-200" />
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-heading font-black text-[30px] leading-none text-neutral-900 mb-1 mt-1">
          {p.name}
        </h3>
        <p className="text-[13px] font-body text-neutral-500 flex-1 mb-4 leading-snug">{p.fullName}</p>

        <div className="flex items-center gap-2.5 pt-4 border-t border-neutral-100">
          <span className="flex items-center gap-1.5 text-[13px] font-body text-neutral-500">
            <IconClock size={13} stroke={1.5} className="text-neutral-400" />
            {p.duration}
          </span>
          <span className="flex-1" />
          <span className="font-heading font-bold text-[15px] text-vgu-red">{p.feePerYear}</span>
        </div>
      </div>
    </Link>
  )
}

export default function RelatedPrograms({ programs }: { programs: ProgCard[] }) {
  if (programs.length === 0) return null

  return (
    <section className="bg-neutral-50 border-t border-neutral-200 py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto max-w-[1280px]">

        <div className="text-center mb-10">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            You might also like
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 md:text-[36px] lg:text-[40px]">
            Related Programs
          </h2>
        </div>

        {/* Mobile: horizontal snap scroll */}
        <div
          className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-3"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {programs.map((p, i) => (
            <div key={p.slug} className="flex-none w-[260px] snap-start">
              <RelatedCard p={p} delay={i * 80} />
            </div>
          ))}
        </div>

        {/* Desktop: 4-column grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((p, i) => (
            <RelatedCard key={p.slug} p={p} delay={i * 80} />
          ))}
        </div>

      </div>
    </section>
  )
}
