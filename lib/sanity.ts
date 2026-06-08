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
})

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ────────────────────────────────────────────────────────────
// TypeScript Types
// ────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────
// Queries — all wrapped with unstable_cache for guaranteed
// function-level caching that is independent of how the
// Sanity client makes HTTP requests internally.
// ────────────────────────────────────────────────────────────

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
