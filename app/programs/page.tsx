import type { Metadata } from 'next'
import Image from 'next/image'
import { IconDownload, IconChevronDown } from '@tabler/icons-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ProgramsGrid from './ProgramsGrid'
import { getAllPrograms, getSiteConfig } from '@/lib/sanity'
import { PROGRAMMES } from './data'

const HERO_IMAGE_SRC = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1400&q=80&auto=format&fit=crop'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'All Programs',
  description:
    'Browse UGC-recognised online programs from Vivekananda Global University. Degrees and certificates across Management, IT, Commerce, Arts, Science, Data Science, and Media. No entrance exam. 100% online.',
  alternates: { canonical: 'https://onlinevgu.com/programs' },
  openGraph: {
    title: 'All Programs | Online VGU',
    description: 'Browse UGC-recognised online programs. No entrance exam. 100% online.',
    url: 'https://onlinevgu.com/programs',
  },
}

export default async function ProgramsPage() {
  const [sanityPrograms, config] = await Promise.all([getAllPrograms(), getSiteConfig()])

  // Build a slugâ†’image map from the hardcoded fallback so we can fill gaps
  // when Sanity programmes don't yet have a hero image uploaded in the CMS.
  const fallbackImages: Record<string, string> = Object.fromEntries(
    PROGRAMMES.filter(p => p.image).map(p => [p.slug, p.image as string])
  )

  // Sanity is primary; fall back to static data until CMS is populated
  const programmes = sanityPrograms.length > 0
    ? sanityPrograms.map(sp => ({
        ...sp,
        image: sp.image ?? fallbackImages[sp.slug] ?? null,
      }))
    : PROGRAMMES.map(p => ({ _id: p.slug, slug: p.slug, name: p.name, fullName: p.fullName, level: p.level, discipline: p.discipline, duration: p.duration, fee: p.fee, popular: p.popular, specialisations: p.specialisations, image: p.image ?? null }))

  const count = programmes.length
  const disciplineCount = new Set(programmes.map(p => p.discipline)).size

  return (
    <>
      {/* â•â• Hero â•â• */}
      <section className="relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">

        {/* Photo + dark overlay (Bible Â§06 semi-transparent treatment) */}
        <Image src={HERO_IMAGE_SRC} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

        {/* Breadcrumb - pinned to the hero's own top edge, independent of the
            content column's py-16+ padding */}
        <div className="absolute top-0 left-0 right-0 z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12">
          <Breadcrumb items={[{ label: 'All Programs' }]} variant="overlay" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">

          {/* Copy column */}
          <div className="max-w-[680px]">
            <p
              className="anim-load-left text-[12px] font-heading font-semibold uppercase tracking-[0.08em] mb-6 text-vgu-yellow"
              style={{ animationDelay: '0ms' }}
            >
              UGC-Recognised Â· 100% Online
            </p>

            <h1
              className="anim-load-left font-heading font-bold tracking-tight leading-[1.1] text-white
                         text-[32px] md:text-[42px] lg:text-[48px]"
              style={{ animationDelay: '70ms' }}
            >
              Pick the degree that<br />
              fits <span className="text-vgu-yellow">your life.</span>
            </h1>

            <p
              className="anim-load-left mt-8 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[620px]"
              style={{ animationDelay: '140ms' }}
            >
              {count} online programs across {disciplineCount} disciplines. Learn from wherever you are.
            </p>

            {/* CTAs */}
            <div
              className="anim-load-left mt-12 flex flex-wrap items-center gap-3"
              style={{ animationDelay: '210ms' }}
            >
              <a
                href="#programs-grid"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
              >
                Browse Programs
                <IconChevronDown size={18} className="transition-transform duration-200 group-hover:translate-y-0.5" />
              </a>
              <a
                href="#brochure"
                data-brochure-trigger
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
              >
                <IconDownload size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                Download Brochure
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* â•â• Grid â•â• */}
      <ProgramsGrid programmes={programmes} nextBatch={config.nextBatch} />
    </>
  )
}
