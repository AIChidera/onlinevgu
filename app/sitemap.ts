import type { MetadataRoute } from 'next'
import { PROGRAMMES } from './programs/data'
import { getAllPrograms, getAllBlogPostSlugs } from '@/lib/sanity'
import { FALLBACK_POST_SUMMARIES } from '@/lib/blogFallbacks'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://onlinevgu.com'
  const now = new Date()

  const statics: MetadataRoute.Sitemap = [
    { url: base,               lastModified: now, changeFrequency: 'daily',   priority: 1   },
    { url: `${base}/programs`, lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/apply`,    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/contact`,  lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/blog`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
  ]

  const sanityPrograms = await getAllPrograms()
  const source = sanityPrograms.length > 0 ? sanityPrograms : PROGRAMMES

  const programs: MetadataRoute.Sitemap = source
    .filter(p => p.level !== 'cert')
    .map(p => ({
      url: `${base}/programs/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))

  const sanitySlugs = await getAllBlogPostSlugs()
  const blogSlugs = sanitySlugs.length > 0 ? sanitySlugs : FALLBACK_POST_SUMMARIES.map(p => p.slug)

  const blogPosts: MetadataRoute.Sitemap = blogSlugs.map(slug => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...statics, ...programs, ...blogPosts]
}
