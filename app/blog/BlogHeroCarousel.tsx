'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  IconArrowRight,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
} from '@tabler/icons-react'
import type { SanityBlogPostSummary } from '@/lib/sanity'

const AUTO_ROTATE_MS = 6500

function formatDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '' }
}

export default function BlogHeroCarousel({ slides }: { slides: SanityBlogPostSummary[] }) {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length

  useEffect(() => {
    if (total <= 1 || paused) return
    const id = setInterval(() => setActive(a => (a + 1) % total), AUTO_ROTATE_MS)
    return () => clearInterval(id)
  }, [total, paused])

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total])
  const next = useCallback(() => setActive(a => (a + 1) % total), [total])

  if (total === 0) return null

  return (
    <section
      className="relative overflow-hidden min-h-[540px] lg:min-h-[720px] bg-neutral-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Featured stories"
    >
      {/* Stacked background images */}
      {slides.map((slide, i) => (
        <div
          key={`bg-${slide._id}`}
          className={[
            'absolute inset-0 transition-opacity duration-700 ease-in-out',
            active === i ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none',
          ].join(' ')}
          aria-hidden={active !== i}
        >
          {slide.coverUrl ? (
            <Image
              src={slide.coverUrl}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className={[
                'object-cover object-center transition-transform duration-[8000ms] ease-out',
                active === i ? 'scale-105' : 'scale-100',
              ].join(' ')}
            />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #821a12 0%, #C04036 50%, #821a12 100%)' }} />
          )}
          {/* Gradient overlay — softened left edge so campus photo contributes mood */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.58) 35%, rgba(0,0,0,0.34) 65%, rgba(0,0,0,0.20) 100%)' }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
        </div>
      ))}

      {/* Foreground content */}
      <div className="relative z-20 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-28 min-h-[540px] lg:min-h-[720px] flex items-center">
        <div className="relative w-full max-w-[720px]">
          {slides.map((slide, i) => {
            const isActive = active === i
            return (
              <div
                key={`fg-${slide._id}`}
                aria-hidden={!isActive}
                className={[
                  'transition-all duration-500 ease-out',
                  isActive
                    ? 'opacity-100 translate-y-0 relative pointer-events-auto'
                    : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none',
                ].join(' ')}
              >
                {/* Meta row */}
                <div className="flex items-center gap-3 mb-5 flex-wrap">
                  {slide.category && (
                    <span className="inline-flex items-center rounded-full bg-vgu-yellow px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-neutral-900 shadow-sm">
                      {slide.category}
                    </span>
                  )}
                  <span className="text-[12px] font-body text-white/70">{formatDate(slide.publishedAt)}</span>
                  {slide.readTime && (
                    <>
                      <span className="text-[12px] text-white/30">·</span>
                      <span className="text-[12px] font-body text-white/70 inline-flex items-center gap-1">
                        <IconClock size={12} stroke={2} /> {slide.readTime}
                      </span>
                    </>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-heading font-bold tracking-tight leading-[1.1] text-white text-[32px] md:text-[44px] lg:text-[54px]">
                  {slide.title}
                </h1>

                {/* Excerpt */}
                <p className="mt-5 text-[16px] lg:text-[18px] font-body leading-[1.65] text-white/85 max-w-[600px] line-clamp-2 sm:line-clamp-3">
                  {slide.excerpt}
                </p>

                {/* CTA row — stacks vertically on mobile, inline on sm+ */}
                <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <Link
                    href={`/blog/${slide.slug}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white bg-white hover:bg-transparent text-vgu-red hover:text-white rounded-full px-8 py-3.5 text-[16px] font-heading font-semibold transition-all duration-200 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
                  >
                    Read story
                    <IconArrowRight size={16} />
                  </Link>
                  <a
                    href="#all-stories"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 hover:border-white/70 text-white/80 hover:text-white rounded-full px-7 py-3.5 text-[16px] font-heading font-semibold transition-all duration-200"
                  >
                    All stories
                    <IconArrowRight size={16} />
                  </a>
                </div>

                {/* Author — hidden on mobile to keep hero clean */}
                {slide.author && (
                  <div className="hidden sm:flex mt-8 items-center gap-3 text-white/80">
                    <div className={[
                      'w-9 h-9 rounded-full overflow-hidden flex-none ring-2',
                      /^(office\s+of|faculty|vgu|vivekananda)/i.test(slide.author.name?.trim() ?? '')
                        ? 'ring-vgu-yellow/60'
                        : 'ring-white/30',
                    ].join(' ')}>
                      {slide.author.avatarUrl ? (
                        <Image
                          src={slide.author.avatarUrl}
                          alt={slide.author.name}
                          width={36}
                          height={36}
                          className="w-full h-full object-cover"
                        />
                      ) : /^(office\s+of|faculty|vgu|vivekananda)/i.test(slide.author.name?.trim() ?? '') ? (
                        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #821a12, #5a1109)' }}>
                          <svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true">
                            <path d="M2 5L10 17L18 5" stroke="#FFA412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-heading font-bold text-white text-[14px]" style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}>
                          {(slide.author.name?.charAt(0) ?? 'V').toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-semibold text-[13px] text-white truncate">{slide.author.name}</div>
                      {slide.author.title && (
                        <div className="text-[11px] font-body text-white/60 truncate">{slide.author.title}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Side arrows — hidden on mobile, dots handle navigation there */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            className="absolute left-5 lg:left-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 lg:h-14 lg:w-14 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-vgu-red hover:border-vgu-red hover:scale-110 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200"
            aria-label="Previous slide"
          >
            <IconChevronLeft size={24} stroke={2} className="lg:hidden" />
            <IconChevronLeft size={28} stroke={2} className="hidden lg:block" />
          </button>
          <button
            type="button"
            onClick={next}
            className="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-30 hidden sm:flex h-12 w-12 lg:h-14 lg:w-14 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-vgu-red hover:border-vgu-red hover:scale-110 hover:shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-200"
            aria-label="Next slide"
          >
            <IconChevronRight size={24} stroke={2} className="lg:hidden" />
            <IconChevronRight size={28} stroke={2} className="hidden lg:block" />
          </button>
        </>
      )}

      {/* Bottom dots */}
      {total > 1 && (
        <div className="absolute bottom-8 left-0 right-0 z-30 flex items-center justify-center">
          <div className="flex items-center gap-1">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="flex items-center justify-center h-10 px-1.5"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className={[
                    'block rounded-full transition-all duration-300',
                    active === i ? 'w-10 h-2 bg-vgu-yellow' : 'w-2 h-2 bg-white/40 hover:bg-white/70',
                  ].join(' ')}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
