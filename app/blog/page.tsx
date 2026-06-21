import type { Metadata } from 'next'
import Link from 'next/link'
import { IconArrowRight, IconBook2, IconNotes, IconTag, IconUsers, IconCalendarStar } from '@tabler/icons-react'
import { getAllBlogPosts } from '@/lib/sanity'
import { FALLBACK_POST_SUMMARIES } from '@/lib/blogFallbacks'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BlogIndex from './BlogIndex'
import BlogHeroCarousel from './BlogHeroCarousel'
import BlogNewsletterStrip from './BlogNewsletterStrip'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Blog - Online VGU Career Guides & Alumni Stories',
  description:
    'Career guides, alumni outcomes, and program breakdowns from VGU faculty and the placement cell. Practical writing for working professionals and fresh graduates.',
  alternates: { canonical: 'https://onlinevgu.in/blog' },
  openGraph: {
    title: 'Blog - Online VGU',
    description: 'Career guides, alumni outcomes, and program breakdowns from VGU.',
    url: 'https://onlinevgu.in/blog',
  },
}

const CATEGORIES = ['All', 'Career', 'Education', 'Programs', 'Industry', 'Campus']

// Atmospheric campus photographs reused as the hero backdrops so the foreground
// content (post title + meta) reads cleanly regardless of post cover artwork.
const HERO_BACKGROUNDS = [
  'https://blog.vgu.ac.in/assets/img/building.jpg',
  'https://blog.vgu.ac.in/assets/img/sports.jpg',
]

export default async function BlogPage() {
  const sanityPosts = await getAllBlogPosts()
  const allPosts = sanityPosts.length > 0 ? sanityPosts : FALLBACK_POST_SUMMARIES
  const hasContent = allPosts.length > 0

  // Hero shows the top N posts but uses the cleaner campus photos as backdrops
  // (matches the source blog's 2-slide hero structure).
  const heroSlides = allPosts.slice(0, HERO_BACKGROUNDS.length).map((post, i) => ({
    ...post,
    coverUrl: HERO_BACKGROUNDS[i] ?? post.coverUrl,
  }))

  return (
    <div>
      <Breadcrumb items={[{ label: 'Blog' }]} />

      {/* ══ Hero carousel ══ */}
      {hasContent && <BlogHeroCarousel slides={heroSlides} />}

      {/* ══ Empty state (only when no posts at all) ══ */}
      {!hasContent && (
        <section className="bg-neutral-50 px-5 md:px-8 lg:px-12 py-20 lg:py-28">
          <div className="mx-auto max-w-[600px] text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-vgu-red/10 flex items-center justify-center mb-6">
              <IconBook2 size={30} stroke={1.5} className="text-vgu-red" />
            </div>
            <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-4 md:text-[32px]">
              Stories on the way.
            </h2>
            <p className="text-[16px] font-body leading-[1.7] text-neutral-600 mb-8 lg:text-[17px]">
              Our faculty and placement team are writing the first batch of career guides, alumni outcomes, and program breakdowns. The first stories land soon.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#counsellor"
                data-apply-trigger
                className="inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[15px] rounded-full px-9 py-4 transition-all duration-200 shadow-[0_8px_24px_rgba(192,64,54,0.30)] hover:shadow-[0_14px_36px_rgba(130,26,18,0.40)] hover:-translate-y-0.5"
              >
                Apply Now
                <IconArrowRight size={16} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 font-heading font-semibold text-[15px] rounded-md px-[30px] py-3 transition-all duration-200"
              >
                Explore Programs
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ Stats trust strip ══ */}
      {hasContent && (
        <section className="group relative bg-white border-y border-neutral-100 overflow-hidden px-5 md:px-8 lg:px-12 py-4 md:py-6">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 150% at 0% 50%, rgba(192,64,54,0.06) 0%, transparent 100%)' }} />
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 150% at 100% 50%, rgba(192,64,54,0.06) 0%, transparent 100%)' }} />
          <div className="relative mx-auto max-w-[1280px] grid grid-cols-2 sm:flex sm:flex-wrap sm:items-stretch sm:justify-center gap-3 md:gap-6">
            {/* Each stat is a self-contained lift card */}
            <div data-animate="fade-up" style={{ animationDelay: '0ms' }} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white px-5 py-4 hover:border-vgu-red/25 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-none bg-vgu-red/10 shadow-[0_4px_14px_rgba(192,64,54,0.22)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3">
                <IconNotes size={19} className="text-vgu-red" stroke={2} />
              </div>
              <div>
                <p className="font-heading font-bold text-[20px] leading-none text-neutral-900 mb-1">{allPosts.length}</p>
                <p className="text-[11px] font-body text-neutral-500 uppercase tracking-[0.07em]">Stories published</p>
              </div>
            </div>
            <div data-animate="fade-up" style={{ animationDelay: '80ms' }} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white px-5 py-4 hover:border-vgu-red/25 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-none bg-vgu-red/10 shadow-[0_4px_14px_rgba(192,64,54,0.22)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3">
                <IconTag size={19} className="text-vgu-red" stroke={2} />
              </div>
              <div>
                <p className="font-heading font-bold text-[20px] leading-none text-neutral-900 mb-1">5</p>
                <p className="text-[11px] font-body text-neutral-500 uppercase tracking-[0.07em]">Topics covered</p>
              </div>
            </div>
            <div data-animate="fade-up" style={{ animationDelay: '160ms' }} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white px-5 py-4 hover:border-vgu-red/25 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-none bg-vgu-red/10 shadow-[0_4px_14px_rgba(192,64,54,0.22)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3">
                <IconUsers size={19} className="text-vgu-red" stroke={2} />
              </div>
              <div>
                <p className="font-heading font-bold text-[20px] leading-none text-neutral-900 mb-1">50,000+</p>
                <p className="text-[11px] font-body text-neutral-500 uppercase tracking-[0.07em]">Active readers</p>
              </div>
            </div>
            <div data-animate="fade-up" style={{ animationDelay: '240ms' }} className="flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white px-5 py-4 hover:border-vgu-red/25 hover:-translate-y-1.5 hover:shadow-[0_12px_32px_rgba(192,64,54,0.12)] transition-all duration-200 cursor-default">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-none bg-vgu-red/10 shadow-[0_4px_14px_rgba(192,64,54,0.22)] transition-all duration-200 group-hover:scale-110 group-hover:rotate-3">
                <IconCalendarStar size={19} className="text-vgu-red" stroke={2} />
              </div>
              <div>
                <p className="font-heading font-bold text-[20px] leading-none text-neutral-900 mb-1">Weekly</p>
                <p className="text-[11px] font-body text-neutral-500 uppercase tracking-[0.07em]">Fresh content</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ Filter + grid (with section heading) ══ */}
      {hasContent && (
        <BlogIndex
          posts={allPosts}
          categories={CATEGORIES}
          eyebrow="All stories"
          title="Career guides, alumni outcomes, and honest answers."
        />
      )}

      {/* ══ Newsletter strip ══ */}
      {hasContent && <BlogNewsletterStrip />}

      {/* ══ Closing CTA ══ */}
      {hasContent && (
        <section className="bg-neutral-50 px-5 md:px-8 lg:px-12 py-16 lg:py-24">
          <div data-animate="fade-up" className="mx-auto max-w-[760px] text-center">
            <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
              Ready when you are
            </p>
            <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-5 md:text-[36px]">
              Read enough? Let&apos;s help you choose your path.
            </h2>
            <p className="text-[16px] font-body leading-[1.7] text-neutral-600 mb-8 lg:text-[17px]">
              Talk to a counsellor. We&apos;ll help you pick the right program, walk you through the placement cell&apos;s support, and answer anything else on your mind.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#counsellor"
                data-apply-trigger
                className="inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[15px] rounded-full px-9 py-4 transition-all duration-200 shadow-[0_8px_24px_rgba(192,64,54,0.30)] hover:shadow-[0_14px_36px_rgba(130,26,18,0.40)] hover:-translate-y-0.5"
              >
                Talk to a Counsellor
                <IconArrowRight size={16} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 font-heading font-semibold text-[15px] rounded-md px-[30px] py-3 transition-all duration-200"
              >
                Browse Programs
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
