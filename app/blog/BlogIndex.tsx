'use client'

import { useState, useMemo, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconClock, IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import type { SanityBlogPostSummary } from '@/lib/sanity'

const POSTS_PER_PAGE = 6

function formatDate(iso: string): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch { return '' }
}

function isInstitutional(name: string): boolean {
  return /^(office\s+of|faculty|vgu|vivekananda)/i.test(name?.trim() ?? '')
}

function getPageNums(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages: (number | '…')[] = [1]
  if (current > 3) pages.push('…')
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p)
  if (current < total - 2) pages.push('…')
  pages.push(total)
  return pages
}

export default function BlogIndex({
  posts,
  categories,
  eyebrow,
  title,
}: {
  posts:      SanityBlogPostSummary[]
  categories: string[]
  eyebrow?:   string
  title?:     string
}) {
  const [active, setActive] = useState<string>('All')
  const [page, setPage] = useState(1)

  useEffect(() => { setPage(1) }, [active])

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: posts.length }
    for (const cat of categories) {
      if (cat === 'All') continue
      map[cat] = posts.filter(p => p.category === cat).length
    }
    return map
  }, [posts, categories])

  const shownCategories = categories.filter(cat => cat === 'All' || (counts[cat] ?? 0) > 0)
  const visible = active === 'All' ? posts : posts.filter(p => p.category === active)

  // On the 'All' view, pin the featured post above the grid and exclude it from pagination
  const isFeaturedView = active === 'All'
  const potentialFeatured = isFeaturedView && visible.length > 0
    ? (visible.find(p => p.featured) ?? visible[0])
    : null

  const regularVisible = potentialFeatured
    ? visible.filter(p => p._id !== potentialFeatured._id)
    : visible

  const totalPages = Math.max(1, Math.ceil(regularVisible.length / POSTS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const regularPosts = regularVisible.slice((safePage - 1) * POSTS_PER_PAGE, safePage * POSTS_PER_PAGE)

  const showFeatured = isFeaturedView && safePage === 1 && potentialFeatured !== null
  const featuredPost = showFeatured ? potentialFeatured : null

  const showFrom = regularVisible.length === 0 ? 0 : (safePage - 1) * POSTS_PER_PAGE + 1
  const showTo = Math.min(safePage * POSTS_PER_PAGE, regularVisible.length)

  return (
    <section id="all-stories" className="bg-neutral-50 px-5 md:px-8 lg:px-12 pt-14 pb-16 lg:pt-20 lg:pb-24">
      <div className="mx-auto max-w-[1280px]">
        {(eyebrow || title) && (
          <div data-animate="fade-up" className="mb-8 lg:mb-10 max-w-[760px]">
            {eyebrow && (
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px]">
                {title}
              </h2>
            )}
          </div>
        )}

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 lg:mb-12">
          {shownCategories.map(cat => {
            const isActive = active === cat
            const count = counts[cat] ?? 0
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActive(cat)}
                className={[
                  'inline-flex items-center gap-2 rounded-full px-4 py-2 min-h-[44px] text-[13px] font-heading font-semibold transition-all duration-150 whitespace-nowrap',
                  isActive
                    ? 'bg-vgu-red text-white shadow-[0_6px_18px_rgba(192,64,54,0.30)]'
                    : 'bg-white text-neutral-700 border border-neutral-200 hover:border-vgu-red hover:text-vgu-red shadow-sm',
                ].join(' ')}
              >
                {cat}
                <span
                  className={[
                    'inline-flex items-center justify-center rounded-full min-w-[20px] px-1.5 text-[11px] font-heading font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500',
                  ].join(' ')}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Cards */}
        {(regularPosts.length > 0 || featuredPost) ? (
          <>
            {/* ── Featured editorial post ── */}
            {featuredPost && (
              <>
                {/* Mobile featured card - full-width, more prominent */}
                <div data-animate="fade-up" className="md:hidden mb-10">
                  <FeaturedCard post={featuredPost} />
                </div>

                {/* Desktop featured card - 2-col editorial layout */}
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  data-animate="materialize"
                  className="hidden md:grid grid-cols-[3fr_2fr] mb-12 rounded-2xl overflow-hidden border border-neutral-200/70 bg-white shadow-[0_4px_32px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_56px_rgba(192,64,54,0.13)] hover:border-vgu-red/20 hover:-translate-y-1 transition-all duration-300 ease-out group/featured"
                  style={{ minHeight: 320 }}
                >
                  {/* Image side */}
                  <div className="relative overflow-hidden bg-neutral-100">
                    {featuredPost.coverUrl ? (
                      <Image
                        src={featuredPost.coverUrl}
                        alt={featuredPost.title}
                        fill
                        sizes="(max-width: 1280px) 58vw, 740px"
                        className="object-cover transition-transform duration-700 ease-out group-hover/featured:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-vgu-red to-vgu-red-dark" />
                    )}
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/8" />
                    <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-vgu-yellow px-3 py-1.5 text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-neutral-900 shadow-sm">
                      Featured
                    </span>
                  </div>

                  {/* Content side */}
                  <div className="flex flex-col p-8 lg:p-10">
                    <div className="flex-1">
                      {featuredPost.category && (
                        <span className="inline-flex items-center rounded-full bg-vgu-red/8 px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.07em] text-vgu-red mb-4">
                          {featuredPost.category}
                        </span>
                      )}
                      <h2 className="font-heading font-bold text-[22px] lg:text-[26px] leading-[1.25] tracking-[-0.5px] text-neutral-900 mb-4 group-hover/featured:text-vgu-red transition-colors duration-200">
                        {featuredPost.title}
                      </h2>
                      <p className="text-[16px] font-body text-neutral-500 leading-[1.65] line-clamp-4">
                        {featuredPost.excerpt}
                      </p>
                    </div>

                    <div className="mt-6">
                      {featuredPost.author && (
                        <div className="flex items-center gap-3 mb-5">
                          <AuthorAvatar name={featuredPost.author.name} avatarUrl={featuredPost.author.avatarUrl} size={32} />
                          <div className="min-w-0">
                            <div className="text-[13px] font-heading font-semibold text-neutral-800 truncate">{featuredPost.author.name}</div>
                            {featuredPost.author.title && <div className="text-[11px] font-body text-neutral-400 truncate">{featuredPost.author.title}</div>}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                        <div className="flex items-center gap-2 text-[12px] font-body text-neutral-400">
                          <span>{formatDate(featuredPost.publishedAt)}</span>
                          {featuredPost.readTime && (
                            <>
                              <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
                              <span className="inline-flex items-center gap-1">
                                <IconClock size={11} stroke={2} className="flex-none" />
                                {featuredPost.readTime}
                              </span>
                            </>
                          )}
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[13px] font-heading font-semibold text-vgu-red group-hover/featured:gap-2.5 transition-all duration-200 flex-none">
                          Read <IconArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            )}

            {/* Mobile: horizontal snap-scroll strip */}
            <div className="md:hidden -mx-5 px-5 scroll-pl-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex gap-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {regularPosts.map((post) => (
                <div key={post._id} className="snap-start flex-none w-[82vw] max-w-[320px]">
                  <PostCard post={post} delay={0} />
                </div>
              ))}
            </div>

            {/* Desktop: 3-col grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post, i) => (
                <PostCard key={post._id} post={post} delay={i * 60} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-[15px] font-body text-neutral-500">
              No posts in <span className="font-semibold text-neutral-700">{active}</span> just yet. Try another category.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-14 flex flex-col items-center gap-5">
            {/* Progress label */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <div
                    key={p}
                    className={[
                      'rounded-full transition-all duration-300',
                      p === safePage
                        ? 'w-6 h-1.5 bg-vgu-red'
                        : 'w-1.5 h-1.5 bg-neutral-300',
                    ].join(' ')}
                  />
                ))}
              </div>
              <p className="text-[12px] font-heading font-semibold text-neutral-400 uppercase tracking-[0.06em]">
                Showing {showFrom}-{showTo} of {visible.length} stories
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Prev */}
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className={[
                  'inline-flex items-center gap-1.5 pl-3 pr-4 h-11 rounded-md border-2 font-heading font-semibold text-[13px] transition-all duration-150',
                  safePage === 1
                    ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                    : 'border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red hover:bg-vgu-red/[0.03]',
                ].join(' ')}
              >
                <IconChevronLeft size={14} stroke={2.5} />
                Prev
              </button>

              {/* Page numbers */}
              <div className="flex items-center gap-1.5">
                {getPageNums(safePage, totalPages).map((p, i) =>
                  p === '…' ? (
                    <span key={`e${i}`} className="w-8 text-center text-[13px] text-neutral-300 select-none font-body">
                      ···
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      className={[
                        'w-11 h-11 rounded-full text-[14px] font-heading font-semibold transition-all duration-200',
                        safePage === p
                          ? 'bg-vgu-red text-white shadow-[0_4px_14px_rgba(192,64,54,0.35)] scale-105'
                          : 'bg-white border border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red hover:scale-105',
                      ].join(' ')}
                    >
                      {p}
                    </button>
                  )
                )}
              </div>

              {/* Next */}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className={[
                  'inline-flex items-center gap-1.5 pl-4 pr-3 h-11 rounded-md border-2 font-heading font-semibold text-[13px] transition-all duration-150',
                  safePage === totalPages
                    ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
                    : 'border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red hover:bg-vgu-red/[0.03]',
                ].join(' ')}
              >
                Next
                <IconChevronRight size={14} stroke={2.5} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function AuthorAvatar({ name, avatarUrl, size }: { name: string; avatarUrl?: string | null; size: number }) {
  const inst = isInstitutional(name)
  return (
    <div
      className={['rounded-full overflow-hidden flex-none ring-1', inst ? 'ring-vgu-yellow/50' : 'ring-neutral-200'].join(' ')}
      style={{ width: size, height: size, minWidth: size }}
    >
      {avatarUrl ? (
        <Image src={avatarUrl} alt={name} width={size} height={size} className="w-full h-full object-cover" />
      ) : inst ? (
        <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #821a12, #5a1109)' }}>
          <svg viewBox="0 0 20 20" width={Math.round(size * 0.4)} height={Math.round(size * 0.4)} fill="none" aria-hidden="true">
            <path d="M2 5L10 17L18 5" stroke="#FFA412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      ) : (
        <div
          className="w-full h-full flex items-center justify-center font-heading font-bold text-white"
          style={{ background: 'linear-gradient(135deg, #C04036, #821a12)', fontSize: Math.round(size * 0.4) }}
        >
          {(name?.charAt(0) ?? 'V').toUpperCase()}
        </div>
      )}
    </div>
  )
}

function FeaturedCard({ post }: { post: SanityBlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/feat flex flex-col rounded-2xl border border-neutral-200/70 bg-white overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_24px_56px_rgba(192,64,54,0.14)] hover:border-vgu-red/25 transition-all duration-300 ease-out"
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden flex-none">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/feat:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-vgu-red to-vgu-red-dark" />
        )}
        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-vgu-yellow px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-neutral-900 shadow-sm">
          Featured
        </span>
        {post.category && (
          <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200/50 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red shadow-sm">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-2 mb-3 text-[12px] font-body text-neutral-400">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
              <span className="inline-flex items-center gap-1">
                <IconClock size={11} stroke={2} className="flex-none" />
                {post.readTime}
              </span>
            </>
          )}
        </div>
        <h2 className="font-heading font-bold text-[20px] leading-[1.3] text-neutral-900 mb-3 line-clamp-2 group-hover/feat:text-vgu-red transition-colors duration-200">
          {post.title}
        </h2>
        <p className="text-[16px] font-body text-neutral-500 leading-[1.65] line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="flex-1" />
        {post.author ? (
          <div className="flex items-center gap-2.5 pt-4 border-t border-neutral-100">
            <AuthorAvatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={30} />
            <span className="text-[13px] font-heading font-semibold text-neutral-700 truncate flex-1 min-w-0">
              {post.author.name}
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-heading font-semibold text-vgu-red opacity-0 translate-x-1.5 group-hover/feat:opacity-100 group-hover/feat:translate-x-0 transition-all duration-200 flex-none">
              Read <IconArrowRight size={13} />
            </span>
          </div>
        ) : (
          <div className="pt-4 border-t border-neutral-100">
            <span className="text-[13px] font-heading font-semibold text-vgu-red inline-flex items-center gap-1.5 group-hover/feat:gap-2.5 transition-all duration-200">
              Read post <IconArrowRight size={14} />
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}

function PostCard({ post, delay }: { post: SanityBlogPostSummary; delay: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      data-animate="fade-up"
      style={{ animationDelay: `${delay}ms` }}
      className="group/card flex flex-col rounded-2xl border border-neutral-200/70 bg-white overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:-translate-y-3 hover:shadow-[0_28px_64px_rgba(192,64,54,0.13)] hover:border-vgu-red/25 transition-all duration-300 ease-out"
    >
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden flex-none">
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-[1.06]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-vgu-red to-vgu-red-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
        {post.category && (
          <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm border border-neutral-200/60 px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red shadow-sm">
            {post.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Meta row */}
        <div className="flex items-center gap-2 mb-3.5 text-[12px] font-body text-neutral-400">
          <span>{formatDate(post.publishedAt)}</span>
          {post.readTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
              <span className="inline-flex items-center gap-1">
                <IconClock size={11} stroke={2} className="flex-none" />
                {post.readTime}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-[18px] leading-[1.3] text-neutral-900 mb-3 line-clamp-2 group-hover/card:text-vgu-red transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[16px] font-body text-neutral-500 leading-[1.65] line-clamp-3 mb-5">
          {post.excerpt}
        </p>

        <div className="flex-1" />

        {/* Footer */}
        {post.author ? (
          <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
            <AuthorAvatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={32} />
            <span className="text-[13px] font-heading font-semibold text-neutral-700 truncate flex-1 min-w-0">
              {post.author.name}
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-heading font-semibold text-vgu-red opacity-0 translate-x-2 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-200 flex-none">
              Read <IconArrowRight size={13} />
            </span>
          </div>
        ) : (
          <div className="pt-4 border-t border-neutral-100 flex items-center gap-1">
            <span className="text-[13px] font-heading font-semibold text-vgu-red inline-flex items-center gap-1.5 group-hover/card:gap-2.5 transition-all duration-200">
              Read post <IconArrowRight size={14} />
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
