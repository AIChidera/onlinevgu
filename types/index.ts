// ── Program ───────────────────────────────────────────────────

export interface Program {
  _id: string
  _type: 'program'
  slug: { current: string }
  name: string
  code: string
  level: 'ug' | 'pg'
  duration: string
  durationMonths: number
  totalFeeInr: number
  feePerYearInr: number
  emiPerMonth: number
  emiMonths: number
  specialisations: string[]
  color: string          // CSS gradient string
  icon: string           // icon name
  tag: string
  popular?: boolean
  tagline: string
  description: string
  highlights: ProgramHighlight[]
  semesters: Semester[]
  faculty: FacultyMember[]
  faqs: FAQ[]
  approvals: string[]
  nextBatch: string
}

export interface ProgramHighlight {
  icon: string
  title: string
  description: string
}

export interface Semester {
  number: number
  title: string
  courses: string[]
}

// ── Faculty ───────────────────────────────────────────────────

export interface FacultyMember {
  _id: string
  name: string
  role: string
  bio: string
  topic: string
  photo: SanityImage
  linkedIn?: string
}

// ── Testimonial ───────────────────────────────────────────────

export interface Testimonial {
  _id: string
  name: string
  initials: string
  role: string
  currentPosition: string
  company: string
  city: string
  quote: string
  outcome: string
  photo: SanityImage
  program: { name: string; slug: { current: string } }
  rating: number
  featured: boolean
}

// ── FAQ ───────────────────────────────────────────────────────

export interface FAQ {
  _id: string
  question: string
  answer: string
  category: 'general' | 'fees' | 'admissions' | 'programs' | 'placements'
  order: number
}

// ── Blog ──────────────────────────────────────────────────────

export interface BlogPost {
  _id: string
  _type: 'blogPost'
  slug: { current: string }
  title: string
  excerpt: string
  coverImage: SanityImage
  author: { name: string; photo: SanityImage }
  publishedAt: string
  category: string
  readingTime: number
  body: unknown // Portable Text blocks
}

// ── Lead / CRM ────────────────────────────────────────────────

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  programInterest: string
  source?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  ipAddress?: string
  createdAt: string
  contacted: boolean
}

// ── Sanity primitives ─────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
}

// ── Site config ───────────────────────────────────────────────

export interface SiteConfig {
  phone: string
  whatsapp: string
  email: string
  address: string
  nextBatch: string
  emiFrom: number
}
