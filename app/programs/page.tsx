import type { Metadata } from 'next'
import Image from 'next/image'
import { IconDownload, IconChevronDown } from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'

// Placeholder — replace with '/images/programs-hero-bg.jpg' when ready.
const HERO_IMAGE_SRC = 'https://images.unsplash.com/photo-1481026469463-66327c86e544?w=1400&q=80&auto=format&fit=crop'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProgramsGrid from './ProgramsGrid'
import { PROGRAMMES } from './data'

export const metadata: Metadata = {
  title: 'All Programs',
  description:
    'Browse 25 UGC-recognised online programs from Vivekananda Global University - degrees and certificates across Management, IT, Commerce, Arts, Science, Data Science, and Media. No entrance exam. 100% online.',
  alternates: {
    canonical: 'https://onlinevgu.in/programs',
  },
  openGraph: {
    title: 'All Programs | Online VGU',
    description: 'Browse 25 UGC-recognised online programs. No entrance exam. 100% online.',
    url: 'https://onlinevgu.in/programs',
  },
}

export default function ProgramsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'All Courses' }]} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden bg-white py-14 px-5 md:px-8 lg:px-12 lg:py-20">
        {/* Background image provision — set HERO_IMAGE_SRC above to activate */}
        {HERO_IMAGE_SRC && (
          <>
            <Image src={HERO_IMAGE_SRC} alt="" fill className="object-cover object-center" sizes="100vw" priority />
            <div className="absolute inset-0 bg-black/75" />
          </>
        )}

        <StrokeArt variant="light" />

        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${HERO_IMAGE_SRC ? 'opacity-0' : ''}`}>
          <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-l from-vgu-beige/25 to-transparent" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(192,64,54,0.9) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            <p
              className={`anim-load-left text-[12px] font-body font-bold uppercase tracking-[0.08em] mb-5 ${HERO_IMAGE_SRC ? 'text-vgu-yellow' : 'text-vgu-red'}`}
              style={{ animationDelay: '0ms' }}
            >
              UGC-Recognised · 100% Online · No Entrance Exam
            </p>

            <h1
              className={`anim-load-left font-heading font-bold text-[30px] tracking-[-1px] leading-[1.1] md:text-[38px] lg:text-[48px] ${HERO_IMAGE_SRC ? 'text-white' : 'text-neutral-900'}`}
              style={{ animationDelay: '70ms' }}
            >
              Find Your<br />
              <span className={HERO_IMAGE_SRC ? 'text-vgu-yellow' : 'text-vgu-red'}>Perfect Degree.</span>
            </h1>

            <p
              className={`anim-load-left mt-5 text-[15px] font-body leading-[1.7] max-w-[480px] lg:text-[17px] ${HERO_IMAGE_SRC ? 'text-white/75' : 'text-neutral-600'}`}
              style={{ animationDelay: '140ms' }}
            >
              {PROGRAMMES.length} online programs across degrees and certificates. Management, IT, Data Science, Commerce, Arts, Science, and Media.
              Earn a real, employer-recognised qualification from wherever you are.
            </p>

            {/* Stats */}
            <div className="anim-load-left mt-8 flex flex-wrap gap-8 md:gap-6" style={{ animationDelay: '210ms' }}>
              {[
                { value: `${PROGRAMMES.filter(p => p.level === 'ug').length}`,   label: 'UG Degrees'    },
                { value: `${PROGRAMMES.filter(p => p.level === 'pg').length}`,   label: 'PG Degrees'    },
                { value: `${PROGRAMMES.filter(p => p.level === 'cert').length}`, label: 'Certificates'  },
                { value: 'July 2026', label: 'Next batch'  },
              ].map(s => (
                <div key={s.label}>
                  <div className={`font-heading font-black text-[30px] leading-none ${HERO_IMAGE_SRC ? 'text-vgu-yellow' : 'text-vgu-red'}`}>
                    {s.value}
                  </div>
                  <div className={`mt-1 text-[13px] font-body ${HERO_IMAGE_SRC ? 'text-white/60' : 'text-neutral-500'}`}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="anim-load-left mt-9 flex flex-wrap gap-3" style={{ animationDelay: '280ms' }}>
              <a
                href="#programs-grid"
                className="inline-flex items-center gap-2 rounded-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red px-8 py-3.5 text-[15px] font-semibold font-heading transition-all duration-200 shadow-[0_4px_20px_rgba(192,64,54,0.28)]"
              >
                Browse Programs
                <IconChevronDown size={16} />
              </a>
              <a
                href="#counsellor"
                className="inline-flex items-center gap-2 rounded-full border-2 border-neutral-200 hover:border-vgu-red bg-white text-neutral-700 hover:text-vgu-red px-7 py-3.5 text-[15px] font-semibold font-heading transition-all duration-200"
              >
                <IconDownload size={16} />
                Download Program Guide
              </a>
            </div>
          </div>

          {/* ── Right: image placeholder + floating badges ── */}
          <div className="hidden xl:flex items-center justify-center">
            <div className="relative w-full py-8">
              <div className="relative w-full aspect-[4/3]">

                {/* Badge 1 - top-left: program count */}
                <div
                  className="absolute -top-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                  style={{ animationDelay: '0s' }}
                >
                  <div className="font-heading font-black text-[22px] leading-none text-vgu-red">{PROGRAMMES.length}</div>
                  <div className="mt-1 text-[11px] font-body text-neutral-600">Programs offered</div>
                </div>

                {/* Badge 2 - top-right: admissions open */}
                <div
                  className="absolute -top-3 right-5 z-10 animate-float-up flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                  style={{ animationDelay: '2s' }}
                >
                  <span className="relative flex h-2.5 w-2.5 flex-none">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <div>
                    <div className="font-heading text-[12px] font-bold text-neutral-900">Admissions Open</div>
                    <div className="text-[10px] font-body text-neutral-600">No entrance exam</div>
                  </div>
                </div>

                {/* Badge 3 - bottom-left: next batch */}
                <div
                  className="absolute -bottom-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200"
                  style={{ animationDelay: '0.7s' }}
                >
                  <div className="font-heading font-black text-[17px] leading-none text-vgu-red">July 2026</div>
                  <div className="mt-1 text-[11px] font-body text-neutral-600">Next batch starts</div>
                </div>

                {/* Badge 4 - bottom-right: MBA most popular */}
                <div
                  className="absolute -bottom-3 right-5 z-10 animate-float-up rounded-2xl bg-vgu-yellow px-4 py-3 shadow-[0_8px_28px_rgba(255,164,18,0.35)] border border-vgu-yellow"
                  style={{ animationDelay: '1.3s' }}
                >
                  <div className="font-heading font-black text-[17px] leading-none text-neutral-900">MBA ★</div>
                  <div className="mt-0.5 text-[11px] font-body font-semibold text-neutral-700">Most Popular</div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ══ Grid ══ */}
      <ProgramsGrid />
    </>
  )
}
