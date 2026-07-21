import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
import { unstable_cache } from 'next/cache'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
  // Return only published documents. Without this, the token allows the
  // client to see drafts, which then leak onto the public site as duplicate
  // cards next to their published version.
  perspective: 'published',
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// TypeScript Types
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface SanityTestimonial {
  _id:           string
  name:          string
  role:          string
  program:       string
  quote:         string
  outcomes:      string[]
  avatarUrl:     string | null
  colorTheme:    'red' | 'blue' | 'green' | 'purple'
  videoLabel:    string
  videoUrl?:     string
  displayOrder:  number
}

export interface SanityFaq {
  _id:          string
  question:     string
  answer:       string
  programSlug:  string
  displayOrder: number
}

export interface SanityCampusEvent {
  _id:          string
  title:        string
  subtitle:     string
  tags:         { label: string; color: 'gold' | 'red' | 'green' }[]
  photoUrl:     string | null
  colorTheme:   'blue' | 'orange' | 'green' | 'purple' | 'red'
  displayOrder: number
}

export interface SanitySiteSettings {
  nextBatch:          string
  admissionsOpen:     boolean
  phoneDisplay:       string
  whatsappNumber:     string
  admissionsEmail:    string
  address:            string
  statLearners:       string
  statCountries:      string
  statPlacement:      string
  statRating:         string
  statPrograms:       string
  statHiringPartners: string
  statCourseraCount:  string
  statYearEstablished: string
  socialInstagram:    string | null
  socialLinkedIn:     string | null
  socialFacebook:     string | null
  socialYouTube:      string | null
  socialX:            string | null
}

export interface SanityFaculty {
  _id:          string
  name:         string
  title:        string
  credential:   string
  photoUrl:     string | null
  initials:     string
  avatarColor:  'red' | 'blue' | 'purple' | 'green' | 'amber'
  displayOrder: number
}

export interface SanityMilestone {
  _id:   string
  year:  number
  event: string
}

export interface SanityBlogAuthor {
  name:      string
  title:     string
  avatarUrl: string | null
}

export interface SanityBlogPostSummary {
  _id:         string
  slug:        string
  title:       string
  excerpt:     string
  category:    string
  publishedAt: string
  readTime:    string
  coverUrl:    string | null
  featured:    boolean
  author?:     SanityBlogAuthor
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = any

export interface SanityBlogPostRelatedProgram {
  slug:     string
  name:     string
  fullName: string
  duration: string
  level:    'ug' | 'pg' | 'cert'
}

export interface SanityBlogPost {
  _id:         string
  slug:        string
  title:       string
  excerpt:     string
  category:    string
  publishedAt: string
  readTime:    string
  coverUrl:    string | null
  featured:    boolean
  body:        PortableTextBlock[]
  author?:     SanityBlogAuthor
  relatedPrograms?: SanityBlogPostRelatedProgram[]
}

// Lightweight shape used for program listing, sitemap, and related-program cards.
export interface SanityProgramSummary {
  _id:            string
  slug:           string
  name:           string
  fullName:       string
  level:          'ug' | 'pg' | 'cert'
  discipline:     string
  duration:       string
  fee:            string   // aliased from feePerYear
  popular?:       boolean
  specialisations: string[]
  image?:         string | null  // aliased from heroImage.asset->url
  displayOrder?:  number
}

export interface SanityProgram {
  _id:            string
  slug:           string
  name:           string
  fullName:       string
  level:          'ug' | 'pg' | 'cert'
  discipline?:    string
  duration:       string
  semesters:      number
  feePerYear:     string
  totalFee:       string
  emi?:           string
  nextBatch?:     string
  popular?:       boolean
  description:    string
  eligibility:    string[]
  highlights:     string[]
  specialisations: string[]
  careerRoles:    string[]
  avgSalaryAfter?: string
  topHirers:      string[]
  curriculum?:    {
    year: string
    semesters: {
      label:        string
      totalCredits: number
      courses:      { name: string; credits: number; type: 'Core' | 'Elective' }[]
    }[]
  }[]
  heroImageUrl?:           string
  certificateSampleUrl?:  string
}

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Queries - all wrapped with unstable_cache for guaranteed
// function-level caching that is independent of how the
// Sanity client makes HTTP requests internally.
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export const getTestimonials = unstable_cache(
  async (): Promise<SanityTestimonial[]> => {
    return sanityClient.fetch<SanityTestimonial[]>(
      `*[_type == "testimonial" && showOnHomePage == true] | order(displayOrder asc) {
        _id, name, role, program, quote,
        outcomes,
        "avatarUrl": avatar.asset->url,
        colorTheme, videoLabel, videoUrl,
        displayOrder
      }`,
      {}
    )
  },
  ['testimonials'],
  { revalidate: 3600, tags: ['testimonial'] }
)

export const getHomeFaqs = unstable_cache(
  async (): Promise<SanityFaq[]> => {
    return sanityClient.fetch<SanityFaq[]>(
      `*[_type == "faq" && (programSlug == "" || !defined(programSlug))] | order(displayOrder asc) {
        _id, question, answer, programSlug, displayOrder
      }`,
      {}
    )
  },
  ['home-faqs'],
  { revalidate: 3600, tags: ['faq'] }
)

export const getProgramFaqs = unstable_cache(
  async (slug: string): Promise<SanityFaq[]> => {
    return sanityClient.fetch<SanityFaq[]>(
      `*[_type == "faq" && programSlug == $slug] | order(displayOrder asc) {
        _id, question, answer, programSlug, displayOrder
      }`,
      { slug }
    )
  },
  ['program-faqs'],
  { revalidate: 3600, tags: ['faq'] }
)

export const getCampusEvents = unstable_cache(
  async (): Promise<SanityCampusEvent[]> => {
    return sanityClient.fetch<SanityCampusEvent[]>(
      `*[_type == "campusEvent"] | order(displayOrder asc) {
        _id, title, subtitle, tags,
        "photoUrl": photo.asset->url,
        colorTheme, displayOrder
      }`,
      {}
    )
  },
  ['campus-events'],
  { revalidate: 3600, tags: ['campusEvent'] }
)

export const getSiteSettings = unstable_cache(
  async (): Promise<SanitySiteSettings | null> => {
    return sanityClient.fetch<SanitySiteSettings | null>(
      `*[_type == "siteSettings"][0] {
        nextBatch, admissionsOpen,
        phoneDisplay, whatsappNumber, admissionsEmail, address,
        statLearners, statCountries, statPlacement, statRating,
        statPrograms, statHiringPartners, statCourseraCount, statYearEstablished,
        socialInstagram, socialLinkedIn, socialFacebook, socialYouTube, socialX
      }`,
      {}
    )
  },
  ['site-settings'],
  { revalidate: 3600, tags: ['siteSettings'] }
)

// Resolved site config - single source of truth for values that Sanity manages.
// Every value falls back to a sensible default so a missing Sanity doc never
// breaks the site. Callers should prefer this over reading getSiteSettings()
// directly and applying `|| 'fallback'` inline.
export interface SiteConfig {
  phone:         string     // display form, e.g. "+91 80350 18677"
  phoneTel:      string     // tel: link form, e.g. "+918035018677"
  email:         string
  address:       string     // single-line form
  addressLines:  string[]   // split on newline for multi-line rendering
  whatsappNumber: string    // digits only, no + or space
  whatsappUrl:   string     // full pre-built https://wa.me/... URL
  nextBatch:     string
  foundingYear:  number
  admissionsOpen: boolean
  stats: {
    learners:       string
    countries:      string
    placement:      string
    rating:         string
    programs:       string
    hiringPartners: string
    coursera:       string
    yearEstablished: string
  }
  socials: {
    linkedin:  string
    instagram: string
    facebook:  string
    youtube:   string
    x:         string
  }
}

const WHATSAPP_DEFAULT_MESSAGE = 'Hi%2C%20I%20want%20to%20know%20more%20about%20VGU%20online%20programs'

// Hardcoded fallbacks - only used when Sanity fields are blank. Keeping them
// close to the resolver so there's one file to grep when auditing what values
// the site ships with by default.
const FALLBACKS = {
  phone:          '+91 80350 18677',
  email:          'admissions@onlinevgu.com',
  address:        'VGU Campus, Jagatpura\nJaipur, Rajasthan - 303 012, India',
  whatsappNumber: '918035018677',
  nextBatch:      'July 2026',
  foundingYear:   2012,
  admissionsOpen: true,
  stats: {
    learners:       '50,000+',
    countries:      '40+',
    placement:      '95%',
    rating:         '4.8/5',
    programs:       '30+',
    hiringPartners: '500+',
    coursera:       '7,000+',
    yearEstablished: '2012',
  },
  socials: {
    linkedin:  'https://www.linkedin.com/school/vgu/',
    instagram: 'https://www.instagram.com/vgujaipur/',
    facebook:  'https://www.facebook.com/vgujpr',
    youtube:   'https://www.youtube.com/@VGUVITCampusJaipur',
    x:         'https://x.com/JaipurVgu',
  },
} as const

export async function getSiteConfig(): Promise<SiteConfig> {
  const s = await getSiteSettings()

  const phone   = (s?.phoneDisplay || FALLBACKS.phone).trim()
  const phoneTel = '+' + phone.replace(/\D/g, '')
  const address = (s?.address || FALLBACKS.address).trim()
  const whatsappNumber = (s?.whatsappNumber || FALLBACKS.whatsappNumber).replace(/\D/g, '')
  const foundingYearStr = s?.statYearEstablished || FALLBACKS.stats.yearEstablished
  const foundingYearNum = parseInt(foundingYearStr, 10) || FALLBACKS.foundingYear

  return {
    phone,
    phoneTel,
    email:          s?.admissionsEmail || FALLBACKS.email,
    address,
    addressLines:   address.split('\n').map(l => l.trim()).filter(Boolean),
    whatsappNumber,
    whatsappUrl:    `https://wa.me/${whatsappNumber}?text=${WHATSAPP_DEFAULT_MESSAGE}`,
    nextBatch:      s?.nextBatch || FALLBACKS.nextBatch,
    foundingYear:   foundingYearNum,
    admissionsOpen: s?.admissionsOpen ?? FALLBACKS.admissionsOpen,
    stats: {
      learners:        s?.statLearners        || FALLBACKS.stats.learners,
      countries:       s?.statCountries       || FALLBACKS.stats.countries,
      placement:       s?.statPlacement       || FALLBACKS.stats.placement,
      rating:          s?.statRating          || FALLBACKS.stats.rating,
      programs:        s?.statPrograms        || FALLBACKS.stats.programs,
      hiringPartners:  s?.statHiringPartners  || FALLBACKS.stats.hiringPartners,
      coursera:        s?.statCourseraCount   || FALLBACKS.stats.coursera,
      yearEstablished: foundingYearStr,
    },
    socials: {
      linkedin:  s?.socialLinkedIn  || FALLBACKS.socials.linkedin,
      instagram: s?.socialInstagram || FALLBACKS.socials.instagram,
      facebook:  s?.socialFacebook  || FALLBACKS.socials.facebook,
      youtube:   s?.socialYouTube   || FALLBACKS.socials.youtube,
      x:         s?.socialX         || FALLBACKS.socials.x,
    },
  }
}

export const getFacultyByProgram = unstable_cache(
  async (slug: string): Promise<SanityFaculty[]> => {
    return sanityClient.fetch<SanityFaculty[]>(
      `*[_type == "faculty" && $slug in programs] | order(displayOrder asc) {
        _id, name, title, credential,
        "photoUrl": photo.asset->url,
        initials, avatarColor, displayOrder
      }`,
      { slug }
    )
  },
  ['faculty-by-program'],
  { revalidate: 3600, tags: ['faculty'] }
)

export const getMilestones = unstable_cache(
  async (): Promise<SanityMilestone[]> => {
    return sanityClient.fetch<SanityMilestone[]>(
      `*[_type == "milestone"] | order(year asc) {
        _id, year, event
      }`,
      {}
    )
  },
  ['milestones'],
  { revalidate: 3600, tags: ['milestone'] }
)

export const getAllPrograms = unstable_cache(
  async (): Promise<SanityProgramSummary[]> => {
    return sanityClient.fetch<SanityProgramSummary[]>(
      `*[_type == "program"] | order(coalesce(displayOrder, 999) asc) {
        _id,
        "slug": slug.current,
        name, fullName, level, discipline, duration,
        "fee": feePerYear,
        popular,
        specialisations,
        "image": heroImage.asset->url,
        displayOrder
      }`,
      {}
    )
  },
  ['all-programs'],
  { revalidate: 3600, tags: ['program'] }
)

export const getTestimonialsByProgram = unstable_cache(
  async (program: string): Promise<SanityTestimonial[]> => {
    return sanityClient.fetch<SanityTestimonial[]>(
      `*[_type == "testimonial" && program == $program] | order(displayOrder asc) {
        _id, name, role, program, quote,
        outcomes,
        "avatarUrl": avatar.asset->url,
        colorTheme, videoLabel, videoUrl,
        displayOrder
      }`,
      { program }
    )
  },
  ['testimonials-by-program'],
  { revalidate: 3600, tags: ['testimonial'] }
)

// Returns the program-specific brochure URL if uploaded, otherwise the global
// default brochure URL from siteSettings. Either can be null. Cached for an hour
// so the brochure API doesn't hit Sanity on every form submission.
export const getBrochureUrlForProgram = unstable_cache(
  async (programName: string): Promise<{ url: string | null; filename: string }> => {
    const result = await sanityClient.fetch<{
      programUrl: string | null
      defaultUrl: string | null
    }>(
      `{
        "programUrl":  *[_type == "program" && name == $programName][0].brochurePdf.asset->url,
        "defaultUrl": *[_type == "siteSettings"][0].defaultBrochurePdf.asset->url
      }`,
      { programName }
    )
    const url = result.programUrl ?? result.defaultUrl ?? null
    const safeName = programName.replace(/[^a-zA-Z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'program'
    return { url, filename: `VGU-${safeName}-brochure.pdf` }
  },
  ['brochure-url-for-program'],
  { revalidate: 3600, tags: ['program', 'siteSettings'] }
)

// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// Blog queries
// â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const BLOG_SUMMARY_PROJECTION = `
  _id,
  "slug": slug.current,
  title, excerpt, category, publishedAt, readTime,
  "coverUrl": coverImage.asset->url,
  featured,
  "author": author{ "name": select(name == "_custom" => customName, name), title, "avatarUrl": avatar.asset->url }
`

export const getAllBlogPosts = unstable_cache(
  async (): Promise<SanityBlogPostSummary[]> => {
    return sanityClient.fetch<SanityBlogPostSummary[]>(
      `*[_type == "blogPost" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]
        | order(publishedAt desc) { ${BLOG_SUMMARY_PROJECTION} }`,
      {}
    )
  },
  ['all-blog-posts'],
  { revalidate: 3600, tags: ['blogPost'] }
)

export const getAllBlogPostSlugs = unstable_cache(
  async (): Promise<string[]> => {
    return sanityClient.fetch<string[]>(
      `*[_type == "blogPost" && defined(slug.current)].slug.current`,
      {}
    )
  },
  ['all-blog-post-slugs'],
  { revalidate: 3600, tags: ['blogPost'] }
)

export const getBlogPostBySlug = unstable_cache(
  async (slug: string): Promise<SanityBlogPost | null> => {
    return sanityClient.fetch<SanityBlogPost | null>(
      `*[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        title, excerpt, category, publishedAt, readTime,
        "coverUrl": coverImage.asset->url,
        featured,
        body,
        "author": author{ "name": select(name == "_custom" => customName, name), title, "avatarUrl": avatar.asset->url },
        "relatedPrograms": relatedPrograms[]->{
          "slug": slug.current,
          name, fullName, duration, level
        }
      }`,
      { slug }
    )
  },
  ['blog-post-by-slug'],
  { revalidate: 3600, tags: ['blogPost'] }
)

export const getRelatedBlogPosts = unstable_cache(
  async (excludeSlug: string, category: string | null): Promise<SanityBlogPostSummary[]> => {
    const filter = category
      ? `_type == "blogPost" && slug.current != $excludeSlug && category == $category && defined(publishedAt) && publishedAt <= now()`
      : `_type == "blogPost" && slug.current != $excludeSlug && defined(publishedAt) && publishedAt <= now()`
    return sanityClient.fetch<SanityBlogPostSummary[]>(
      `*[${filter}] | order(publishedAt desc)[0...3] { ${BLOG_SUMMARY_PROJECTION} }`,
      category ? { excludeSlug, category } : { excludeSlug }
    )
  },
  ['related-blog-posts'],
  { revalidate: 3600, tags: ['blogPost'] }
)

export const getProgramBySlug = unstable_cache(
  async (slug: string): Promise<SanityProgram | null> => {
    return sanityClient.fetch<SanityProgram | null>(
      `*[_type == "program" && slug.current == $slug][0] {
        _id,
        "slug": slug.current,
        name, fullName, level, duration, semesters,
        feePerYear, totalFee, emi, nextBatch,
        popular, description,
        eligibility, highlights, specialisations,
        careerRoles, avgSalaryAfter, topHirers,
        curriculum,
        "heroImageUrl":          heroImage.asset->url,
        "certificateSampleUrl": certificateSample.asset->url
      }`,
      { slug }
    )
  },
  ['program-by-slug'],
  { revalidate: 3600, tags: ['program'] }
)
