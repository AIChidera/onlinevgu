import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'
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

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string
  params?: Record<string, unknown>
  tags?: string[]
}): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    next: { tags, revalidate: 3600 },
  })
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
// Fields are aliased in the GROQ query so that consumers get `fee` and `image`
// without field-name mismatch.
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
// Queries
// ────────────────────────────────────────────────────────────

const IMAGE_URL = `asset->url`

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  const query = `*[_type == "testimonial" && showOnHomePage == true] | order(displayOrder asc) {
    _id, name, role, program, quote,
    outcomes,
    "avatarUrl": avatar.${IMAGE_URL},
    colorTheme, videoLabel, videoUrl,
    displayOrder
  }`
  return sanityFetch<SanityTestimonial[]>({ query, tags: ['testimonial'] })
}

export async function getHomeFaqs(): Promise<SanityFaq[]> {
  const query = `*[_type == "faq" && (programSlug == "" || !defined(programSlug))] | order(displayOrder asc) {
    _id, question, answer, programSlug, displayOrder
  }`
  return sanityFetch<SanityFaq[]>({ query, tags: ['faq'] })
}

export async function getProgramFaqs(slug: string): Promise<SanityFaq[]> {
  const query = `*[_type == "faq" && programSlug == $slug] | order(displayOrder asc) {
    _id, question, answer, programSlug, displayOrder
  }`
  return sanityFetch<SanityFaq[]>({ query, params: { slug }, tags: ['faq'] })
}

export async function getCampusEvents(): Promise<SanityCampusEvent[]> {
  const query = `*[_type == "campusEvent"] | order(displayOrder asc) {
    _id, title, subtitle, tags,
    "photoUrl": photo.${IMAGE_URL},
    colorTheme, displayOrder
  }`
  return sanityFetch<SanityCampusEvent[]>({ query, tags: ['campusEvent'] })
}

export async function getSiteSettings(): Promise<SanitySiteSettings | null> {
  const query = `*[_type == "siteSettings"][0] {
    nextBatch, admissionsOpen,
    phoneDisplay, whatsappNumber, admissionsEmail, address,
    statLearners, statCountries, statPlacement, statRating,
    statPrograms, statHiringPartners, statCourseraCount, statYearEstablished,
    socialInstagram, socialLinkedIn, socialFacebook, socialYouTube, socialX
  }`
  return sanityFetch<SanitySiteSettings | null>({ query, tags: ['siteSettings'] })
}

export async function getFacultyByProgram(slug: string): Promise<SanityFaculty[]> {
  const query = `*[_type == "faculty" && $slug in programs] | order(displayOrder asc) {
    _id, name, title, credential,
    "photoUrl": photo.${IMAGE_URL},
    initials, avatarColor, displayOrder
  }`
  return sanityFetch<SanityFaculty[]>({ query, params: { slug }, tags: ['faculty'] })
}

export async function getMilestones(): Promise<SanityMilestone[]> {
  const query = `*[_type == "milestone"] | order(year asc) {
    _id, year, event
  }`
  return sanityFetch<SanityMilestone[]>({ query, tags: ['milestone'] })
}

export async function getAllPrograms(): Promise<SanityProgramSummary[]> {
  const query = `*[_type == "program"] | order(coalesce(displayOrder, 999) asc) {
    _id,
    "slug": slug.current,
    name, fullName, level, discipline, duration,
    "fee": feePerYear,
    popular,
    specialisations,
    "image": heroImage.${IMAGE_URL},
    displayOrder
  }`
  return sanityFetch<SanityProgramSummary[]>({ query, tags: ['program'] })
}

export async function getTestimonialsByProgram(program: string): Promise<SanityTestimonial[]> {
  const query = `*[_type == "testimonial" && program == $program] | order(displayOrder asc) {
    _id, name, role, program, quote,
    outcomes,
    "avatarUrl": avatar.${IMAGE_URL},
    colorTheme, videoLabel, videoUrl,
    displayOrder
  }`
  return sanityFetch<SanityTestimonial[]>({ query, params: { program }, tags: ['testimonial'] })
}

export async function getProgramBySlug(slug: string): Promise<SanityProgram | null> {
  const query = `*[_type == "program" && slug.current == $slug][0] {
    _id,
    "slug": slug.current,
    name, fullName, level, duration, semesters,
    feePerYear, totalFee, emi, nextBatch,
    popular, description,
    eligibility, highlights, specialisations,
    careerRoles, avgSalaryAfter, topHirers,
    curriculum,
    "heroImageUrl":          heroImage.${IMAGE_URL},
    "certificateSampleUrl": certificateSample.${IMAGE_URL}
  }`
  return sanityFetch<SanityProgram | null>({ query, params: { slug }, tags: ['program'] })
}
