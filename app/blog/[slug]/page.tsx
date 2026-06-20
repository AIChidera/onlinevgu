import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import type { PortableTextComponents } from '@portabletext/react'
import {
  IconArrowLeft,
  IconArrowRight,
  IconClock,
} from '@tabler/icons-react'
import {
  getBlogPostBySlug,
  getAllBlogPostSlugs,
  getRelatedBlogPosts,
  urlFor,
} from '@/lib/sanity'
import {
  FALLBACK_POSTS,
  findFallbackPostBySlug,
  fallbackRelatedPosts,
} from '@/lib/blogFallbacks'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

export const revalidate = 3600

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const sanitySlugs = await getAllBlogPostSlugs()
  const fallbackSlugs = FALLBACK_POSTS.map(p => p.slug)
  const all = Array.from(new Set([...sanitySlugs, ...fallbackSlugs]))
  return all.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = (await getBlogPostBySlug(slug)) ?? findFallbackPostBySlug(slug)
  if (!post) return { title: 'Post not found - Online VGU Blog' }
  return {
    title: `${post.title} - Online VGU Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://onlinevgu.in/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://onlinevgu.in/blog/${post.slug}`,
      images: post.coverUrl ? [{ url: post.coverUrl }] : undefined,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  }
}

function formatDate(iso: string, long = false): string {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day:   'numeric',
      month: long ? 'long' : 'short',
      year:  'numeric',
    })
  } catch { return '' }
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mt-14 mb-5 md:text-[30px]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading font-bold text-[20px] leading-[1.3] text-neutral-900 mt-10 mb-3 md:text-[22px]">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading font-semibold text-[18px] leading-[1.4] text-neutral-900 mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-[17px] font-body leading-[1.75] text-neutral-700 mb-5">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="relative border-l-4 border-vgu-red pl-6 pr-2 my-8 italic text-[18px] font-body text-neutral-700 leading-[1.65]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-5 space-y-2 text-[17px] font-body text-neutral-700 leading-[1.7] list-disc pl-6 marker:text-vgu-red">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-5 space-y-2 text-[17px] font-body text-neutral-700 leading-[1.7] list-decimal pl-6 marker:font-bold marker:text-vgu-red">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-1">{children}</li>,
    number: ({ children }) => <li className="pl-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-neutral-900">{children}</strong>,
    em:     ({ children }) => <em className="italic">{children}</em>,
    code:   ({ children }) => (
      <code className="font-mono text-[15px] bg-neutral-100 px-1.5 py-0.5 rounded text-vgu-red-dark">{children}</code>
    ),
    link: ({ value, children }) => {
      const href = (value as { href?: string })?.href ?? '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className="text-vgu-red font-semibold underline decoration-vgu-red/40 underline-offset-2 hover:decoration-vgu-red transition-colors duration-150"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const v = value as any
      if (!v?.asset) return null
      const caption: string | undefined = v.caption
      return (
        <figure className="my-8 -mx-1 sm:-mx-2 md:mx-0">
          <div className="relative rounded-2xl overflow-hidden aspect-video shadow-[0_12px_40px_rgba(0,0,0,0.10)] bg-neutral-100">
            <Image
              src={urlFor(v).width(1440).url()}
              alt={v.alt || caption || ''}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 720px"
            />
          </div>
          {caption && (
            <figcaption className="mt-3 text-[13px] font-body text-neutral-500 text-center italic">{caption}</figcaption>
          )}
        </figure>
      )
    },
  },
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const sanityPost = await getBlogPostBySlug(slug)
  const post = sanityPost ?? findFallbackPostBySlug(slug)
  if (!post) notFound()

  const related = sanityPost
    ? await getRelatedBlogPosts(slug, post.category || null)
    : fallbackRelatedPosts(slug, post.category || null)

  const isInstitutional = /^(office\s+of|faculty|vgu|vivekananda)/i.test(
    post.author?.name?.trim() ?? ''
  )

  const jsonLd = {
    '@context':   'https://schema.org',
    '@type':      'Article',
    headline:     post.title,
    description:  post.excerpt,
    image:        post.coverUrl ? [post.coverUrl] : undefined,
    datePublished: post.publishedAt,
    author:       post.author?.name
                    ? { '@type': 'Person', name: post.author.name }
                    : undefined,
    publisher: {
      '@type': 'Organization',
      name:    'Vivekananda Global University',
      url:     'https://onlinevgu.in',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':   `https://onlinevgu.in/blog/${post.slug}`,
    },
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

      {/* ══ Hero — full-bleed cover image or brand gradient ══ */}
      <section className="relative overflow-hidden flex items-end" style={{ minHeight: 'min(62vh, 640px)' }}>

        {/* Background layer */}
        {post.coverUrl ? (
          <Image
            src={post.coverUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #3d0a07 0%, #821a12 55%, #C04036 100%)' }}
          />
        )}

        {/* Gradient veil — heavier at bottom so text is always legible */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background: post.coverUrl
              ? 'linear-gradient(to bottom, rgba(17,24,39,0.10) 0%, rgba(17,24,39,0.55) 45%, rgba(17,24,39,0.92) 100%)'
              : 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 100%)',
          }}
        />

        {/* Decorative flourish only on solid-colour hero (lost on photos) */}
        {!post.coverUrl && (
          <SketchFlourish shape="monogram" color="yellow" opacity={0.07} strokeWidth={28} trigger="mount" />
        )}

        {/* Back link — floated top-left */}
        <div className="absolute top-6 left-5 md:left-8 lg:left-12 z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 group/back text-[13px] font-heading font-semibold text-white/70 hover:text-white transition-colors duration-150"
          >
            <IconArrowLeft size={14} stroke={2.25} className="transition-transform duration-150 group-hover/back:-translate-x-0.5" />
            All stories
          </Link>
        </div>

        {/* Content pinned to the bottom of the hero */}
        <div className="relative z-10 w-full px-5 md:px-8 lg:px-12 pb-12 lg:pb-16 pt-28">
          <div className="mx-auto max-w-[820px]">

            {/* Category · date · read time */}
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              {post.category && (
                <span
                  className="anim-load-left inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-3 py-1 text-[11px] font-heading font-bold uppercase tracking-[0.06em] text-white"
                  style={{ animationDelay: '0ms' }}
                >
                  {post.category}
                </span>
              )}
              <span
                className="anim-load-left text-[12px] font-body text-white/60"
                style={{ animationDelay: '30ms' }}
              >
                {formatDate(post.publishedAt, true)}
              </span>
              {post.readTime && (
                <span
                  className="anim-load-left text-[12px] font-body text-white/55 inline-flex items-center gap-1"
                  style={{ animationDelay: '60ms' }}
                >
                  <IconClock size={12} stroke={2} /> {post.readTime}
                </span>
              )}
            </div>

            {/* Headline */}
            <h1
              className="anim-load-left font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.15] text-white mb-5 md:text-[38px] lg:text-[48px]"
              style={{ animationDelay: '80ms' }}
            >
              {post.title}
            </h1>

            {/* Excerpt as lede */}
            <p
              className="anim-load-left text-[16px] font-body leading-[1.65] text-white/75 mb-8 lg:text-[18px] max-w-[640px]"
              style={{ animationDelay: '160ms' }}
            >
              {post.excerpt}
            </p>

            {/* Author strip */}
            {post.author && (
              <div
                className="anim-load-left flex items-center gap-4 pt-6 border-t border-white/20"
                style={{ animationDelay: '220ms' }}
              >
                <div className={[
                  'w-11 h-11 rounded-full overflow-hidden flex-none ring-2',
                  isInstitutional ? 'ring-vgu-yellow/70' : 'ring-white/40',
                ].join(' ')}>
                  {post.author.avatarUrl ? (
                    <Image
                      src={post.author.avatarUrl}
                      alt={post.author.name}
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  ) : isInstitutional ? (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #821a12, #5a1109)' }}>
                      <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true">
                        <path d="M2 5L10 17L18 5" stroke="#FFA412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center font-heading font-bold text-white text-[16px]"
                      style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                    >
                      {(post.author.name?.charAt(0) ?? 'V').toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-heading font-semibold text-[14px] text-white">{post.author.name}</div>
                  {post.author.title && (
                    <div className="text-[12px] font-body text-white/55">{post.author.title}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══ Body ══ */}
      <section className="bg-white px-5 md:px-8 lg:px-12 py-14 lg:py-20">
        <article data-animate="fade-up" className="mx-auto max-w-[720px]">
          <PortableText value={post.body ?? []} components={portableTextComponents} />
        </article>
      </section>

      {/* ══ Author card ══ */}
      {post.author && (post.author.name || post.author.title) && (
        <section className="bg-white border-t border-neutral-100 px-5 md:px-8 lg:px-12 py-12 lg:py-16">
          <div data-animate="fade-up" className="mx-auto max-w-[820px]">
            <div
              className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              style={{ background: 'linear-gradient(135deg, #ffffff 60%, rgba(244,215,193,0.35) 100%)' }}
            >
              <div className={[
                'w-20 h-20 rounded-full overflow-hidden flex-none ring-[3px] shadow-[0_6px_20px_rgba(0,0,0,0.10)]',
                isInstitutional ? 'ring-vgu-yellow/60' : 'ring-white',
              ].join(' ')}>
                {post.author.avatarUrl ? (
                  <Image
                    src={post.author.avatarUrl}
                    alt={post.author.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : isInstitutional ? (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #821a12, #5a1109)' }}>
                    <svg viewBox="0 0 20 20" width="30" height="30" fill="none" aria-hidden="true">
                      <path d="M2 5L10 17L18 5" stroke="#FFA412" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center font-heading font-bold text-white text-[28px]"
                    style={{ background: 'linear-gradient(135deg, #C04036, #821a12)' }}
                  >
                    {(post.author.name?.charAt(0) ?? 'V').toUpperCase()}
                  </div>
                )}
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-1">Written by</p>
                <div className="font-heading font-bold text-[18px] text-neutral-900">{post.author.name}</div>
                {post.author.title && (
                  <div className="text-[14px] font-body text-neutral-500 mt-0.5">{post.author.title}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══ Related programs ══ */}
      {post.relatedPrograms && post.relatedPrograms.length > 0 && (
        <section className="bg-neutral-50 px-5 md:px-8 lg:px-12 py-12 lg:py-16">
          <div className="mx-auto max-w-[1120px]">
            <div data-animate="fade-up" className="mb-8">
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Mentioned in this story
              </p>
              <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[28px]">
                Programs you might want to look at.
              </h2>
            </div>
            {/* Mobile: snap-scroll */}
            <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {post.relatedPrograms.map(p => (
                <div key={p.slug} className="snap-start flex-none w-[72vw] max-w-[260px]">
                  <Link
                    href={`/programs/${p.slug}`}
                    className="group/card flex flex-col h-full rounded-2xl border border-neutral-200 bg-white p-5 hover:border-vgu-red/25 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(192,64,54,0.10)] transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.04) 100%)' }}
                  >
                    <span className="inline-flex w-fit items-center rounded-full bg-vgu-red/10 border border-vgu-red/20 px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red mb-3">
                      {p.level === 'pg' ? 'PG' : p.level === 'ug' ? 'UG' : 'Cert'}
                    </span>
                    <h3 className="font-heading font-bold text-[17px] text-neutral-900 mb-1 group-hover/card:text-vgu-red transition-colors duration-150">
                      {p.name}
                    </h3>
                    <p className="text-[13px] font-body text-neutral-500 mb-4 line-clamp-2">{p.fullName}</p>
                    <div className="mt-auto flex items-center justify-between text-[13px] font-heading font-semibold">
                      <span className="text-neutral-600">{p.duration}</span>
                      <span className="text-vgu-red inline-flex items-center gap-1 group-hover/card:gap-2 transition-all duration-150">
                        View <IconArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Desktop: grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {post.relatedPrograms.map((p, i) => (
                <div key={p.slug} data-animate="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <Link
                    href={`/programs/${p.slug}`}
                    className="group/card flex flex-col h-full rounded-2xl border border-neutral-200 bg-white p-6 hover:border-vgu-red/25 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(192,64,54,0.10)] transition-all duration-200"
                    style={{ background: 'linear-gradient(135deg, #ffffff 60%, rgba(192,64,54,0.04) 100%)' }}
                  >
                    <span className="inline-flex w-fit items-center rounded-full bg-vgu-red/10 border border-vgu-red/20 px-2.5 py-0.5 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red mb-3">
                      {p.level === 'pg' ? 'PG' : p.level === 'ug' ? 'UG' : 'Cert'}
                    </span>
                    <h3 className="font-heading font-bold text-[18px] text-neutral-900 mb-1 group-hover/card:text-vgu-red transition-colors duration-150">
                      {p.name}
                    </h3>
                    <p className="text-[13px] font-body text-neutral-500 mb-4 line-clamp-2">{p.fullName}</p>
                    <div className="mt-auto flex items-center justify-between text-[13px] font-heading font-semibold">
                      <span className="text-neutral-600">{p.duration}</span>
                      <span className="text-vgu-red inline-flex items-center gap-1 group-hover/card:gap-2 transition-all duration-150">
                        View <IconArrowRight size={13} />
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Keep reading ══ */}
      {related.length > 0 && (
        <section className="relative bg-white overflow-hidden px-5 md:px-8 lg:px-12 py-16 lg:py-24 border-t border-neutral-100">
          <SketchFlourish shape="wave" color="red" opacity={0.03} strokeWidth={20} trigger="in-view" />
          <div className="relative z-10 mx-auto max-w-[1280px]">
            <div data-animate="fade-up" className="mb-10">
              <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
                Keep reading
              </p>
              <h2 className="font-heading font-bold text-[26px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[32px]">
                More from the Online VGU blog
              </h2>
            </div>

            {/* Mobile: snap-scroll strip */}
            <div className="md:hidden -mx-5 px-5 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {related.map(p => (
                <div key={p._id} className="snap-start flex-none w-[82vw] max-w-[320px]">
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group/card flex flex-col h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(192,64,54,0.12)] hover:border-vgu-red/20 transition-all duration-200"
                  >
                    <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                      {p.coverUrl ? (
                        <Image
                          src={p.coverUrl}
                          alt={p.title}
                          fill
                          sizes="320px"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }} />
                      )}
                      {p.category && (
                        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red shadow-sm">
                          {p.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="text-[12px] font-body text-neutral-400 mb-2">{formatDate(p.publishedAt)}</div>
                      <h3 className="font-heading font-bold text-[17px] leading-[1.3] text-neutral-900 mb-2 line-clamp-2 group-hover/card:text-vgu-red transition-colors duration-200">
                        {p.title}
                      </h3>
                      <p className="text-[14px] font-body text-neutral-500 leading-[1.65] line-clamp-2 mb-4">
                        {p.excerpt}
                      </p>
                      {p.author?.name && (
                        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden flex-none bg-vgu-red/10 flex items-center justify-center">
                            {p.author.avatarUrl ? (
                              <Image src={p.author.avatarUrl} alt={p.author.name} width={24} height={24} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-heading font-bold text-vgu-red text-[10px]">
                                {p.author.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] font-body text-neutral-500 truncate">{p.author.name}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {/* Desktop: 3-col grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <div key={p._id} data-animate="fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group/card flex flex-col h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(192,64,54,0.12)] hover:border-vgu-red/20 transition-all duration-200"
                  >
                    <div className="relative aspect-[16/9] bg-neutral-100 overflow-hidden">
                      {p.coverUrl ? (
                        <Image
                          src={p.coverUrl}
                          alt={p.title}
                          fill
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }} />
                      )}
                      {p.category && (
                        <span className="absolute top-3 left-3 inline-flex items-center rounded-full bg-white/95 backdrop-blur-sm px-2.5 py-1 text-[10px] font-heading font-bold uppercase tracking-[0.06em] text-vgu-red shadow-sm">
                          {p.category}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="text-[12px] font-body text-neutral-400 mb-2">{formatDate(p.publishedAt)}</div>
                      <h3 className="font-heading font-bold text-[17px] leading-[1.3] text-neutral-900 mb-2 line-clamp-2 group-hover/card:text-vgu-red transition-colors duration-200">
                        {p.title}
                      </h3>
                      <p className="text-[14px] font-body text-neutral-500 leading-[1.65] line-clamp-2 mb-4">
                        {p.excerpt}
                      </p>
                      {p.author?.name && (
                        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full overflow-hidden flex-none bg-vgu-red/10 flex items-center justify-center">
                            {p.author.avatarUrl ? (
                              <Image src={p.author.avatarUrl} alt={p.author.name} width={24} height={24} className="w-full h-full object-cover" />
                            ) : (
                              <span className="font-heading font-bold text-vgu-red text-[10px]">
                                {p.author.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <span className="text-[12px] font-body text-neutral-500 truncate">{p.author.name}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══ Closing CTA ══ */}
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
            <a
              href="#counsellor"
              data-apply-trigger
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[15px] rounded-full px-9 py-4 transition-all duration-200 shadow-[0_8px_24px_rgba(192,64,54,0.30)] hover:shadow-[0_14px_36px_rgba(130,26,18,0.40)] hover:-translate-y-0.5"
            >
              Talk to a Counsellor
              <IconArrowRight size={16} />
            </a>
            <a
              href="/programs"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 font-heading font-semibold text-[15px] rounded-md px-[30px] py-3 transition-all duration-200"
            >
              Browse Programs
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
