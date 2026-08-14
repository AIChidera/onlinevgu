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
  // Only populated by getPlacementsTestimonials() - used in Success Stories.
  company?:      string
  journey?:      string
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
  videoUrl?:    string | null
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
  hiringPartners:     string[] | null
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

export type NoticeCategory = 'Academic Calendar' | 'Newsletter' | 'Announcement' | 'Important Notice'

export interface SanityNotice {
  _id:            string
  title:          string
  category:       NoticeCategory
  date:           string
  summary?:       string
  attachmentUrl?: string | null
  externalUrl?:   string | null
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

export interface SanityHomePageStep {
  badge: string
  title: string
  body:  string
  icon:  string
}

export interface SanityHomePageTrustLogo {
  name:    string
  logoUrl: string | null
  scale:   number
}

export interface SanityHomePagePlatformCard {
  heading:     string
  description: string
  statValue:   string
  statLabel:   string
}

// Singleton - one document total. Every field is optional; components fall
// back to their current hardcoded copy for anything left blank.
export interface SanityHomePage {
  heroImageUrl?:           string | null
  heroEyebrow?:            string
  heroHeadingPrefix?:      string
  heroHeadingHighlight?:   string
  heroHeadingSuffix?:      string
  heroSubtext?:            string
  heroBadgeText?:          string
  heroPrimaryCtaLabel?:    string
  heroSecondaryCtaLabel?:  string
  trustBarEyebrow?:        string
  trustBarLogos?:          SanityHomePageTrustLogo[]
  coursePlatformsEyebrow?: string
  coursePlatformsHeading?: string
  courseraCard?:           SanityHomePagePlatformCard
  linkedinCard?:           SanityHomePagePlatformCard
  stepsEyebrow?:           string
  stepsHeading?:           string
  stepsSubtext?:           string
  steps?:                  SanityHomePageStep[]
}

export interface SanityAboutPageIconCard {
  title?: string
  label?: string
  body:   string
  icon:   string
}

export interface SanityAboutPageStatCard {
  value?:  string
  label:   string
  detail:  string
  icon:    string
}

export interface SanityAboutPageAccreditation {
  name:        string
  fullName:    string
  detail:      string
  colorStyle:  'red' | 'yel' | 'dark'
  logoUrl?:    string | null
  status:      string
  ghostLetter: string
}

export interface SanityAboutPageProofStat {
  value: string
  label: string
}

export interface SanityAboutPageChip {
  label: string
  year:  string
}

// Singleton - one document total. Every field is optional; components fall
// back to their current hardcoded copy for anything left blank.
export interface SanityAboutPage {
  heroImageUrl?:          string | null
  heroEyebrow?:           string
  heroHeadingLine1?:      string
  heroHeadingLine2?:      string
  heroSubtext?:           string
  heroPrimaryCtaLabel?:   string
  heroSecondaryCtaLabel?: string
  statsCards?:            SanityAboutPageStatCard[]
  valuesEyebrow?:         string
  valuesHeading?:         string
  valuesPullQuote?:       string
  valuesParagraph?:       string
  values?:                SanityAboutPageIconCard[]
  accreditationsEyebrow?: string
  accreditationsHeading?: string
  accreditations?:        SanityAboutPageAccreditation[]
  pedagogyEyebrow?:       string
  pedagogyHeading?:       string
  pedagogySubtext?:       string
  pedagogy?:              SanityAboutPageIconCard[]
  leadershipEyebrow?:     string
  leadershipHeading?:     string
  leadershipSubtext?:     string
  leadershipRoles?:       string[]
  campusEyebrow?:         string
  campusHeadingLine1?:    string
  campusHeadingLine2?:    string
  campusParagraph?:       string
  campusImageUrl?:        string | null
  campusCtaLabel?:        string
  campusFeatures?:        SanityAboutPageIconCard[]
  campusProofStats?:      SanityAboutPageProofStat[]
  hiringEyebrow?:         string
  hiringHeading?:         string
  hiringSubtext?:         string
  hiringCtaLabel?:        string
  historyEyebrow?:        string
  historyHeading?:        string
  historyParagraph?:      string
  historyNaacCaption?:    string
  historyChips?:          SanityAboutPageChip[]
  alumniEyebrow?:         string
  alumniHeading?:         string
  alumniSubtext?:         string
  alumniFeatures?:        SanityAboutPageIconCard[]
  alumniCtaPrimaryLabel?:   string
  alumniCtaSecondaryLabel?: string
}

export interface SanityContactPageTrustPill {
  label: string
  icon:  string
}

export interface SanityContactPageChannel {
  label: string
  sub:   string
  cta:   string
  icon:  string
}

export interface SanityContactPageOfficeHour {
  day:   string
  hours: string
}

export interface SanityContactPageDepartment {
  label:        string
  desc:         string
  emailSubject: string
  icon:         string
}

export interface SanityContactPageFaq {
  question: string
  answer:   string
}

// Singleton - one document total. Every field is optional; components fall
// back to their current hardcoded copy for anything left blank.
export interface SanityContactPage {
  heroBadgeLabel?:      string
  heroHeadingLine1?:    string
  heroHeadingHighlight?: string
  heroSubtext?:         string
  trustPills?:          SanityContactPageTrustPill[]
  contactChannels?:     SanityContactPageChannel[]
  addressCardLabel?:    string
  officeHoursLabel?:    string
  officeHours?:         SanityContactPageOfficeHour[]
  socialsLabel?:        string
  formEyebrow?:         string
  formHeading?:         string
  mapEyebrow?:          string
  mapHeading?:          string
  mapSubtext?:          string
  departmentsEyebrow?:  string
  departmentsHeading?:  string
  departments?:         SanityContactPageDepartment[]
  miniFaqEyebrow?:      string
  miniFaqHeading?:      string
  miniFaqs?:            SanityContactPageFaq[]
  counsellorsEyebrow?:  string
  counsellorsHeading?:  string
}

export interface SanityCounsellor {
  _id:          string
  name:         string
  role:         string
  bio:          string
  languages:    string[]
  photoUrl:     string | null
  displayOrder: number
}

export interface SanityPlacementsPageStatCard {
  value?:  string
  label:   string
  detail:  string
  icon:    string
}

export interface SanityPlacementsPageCard {
  title: string
  body:  string
  icon:  string
}

export interface SanityPlacementsPageIndustry {
  title:     string
  body:      string
  companies: string
  icon:      string
}

export interface SanityPlacementsPageProcessStep {
  badge: string
  title: string
  body:  string
  time:  string
  icon:  string
}

// Singleton - one document total. Every field is optional; components fall
// back to their current hardcoded copy for anything left blank.
export interface SanityPlacementsPage {
  heroImageUrl?:           string | null
  heroEyebrow?:            string
  heroHeadingLine1?:       string
  heroHeadingHighlight?:   string
  heroSubtext?:            string
  heroPrimaryCtaLabel?:    string
  heroSecondaryCtaLabel?:  string
  statsCards?:             SanityPlacementsPageStatCard[]
  supportEyebrow?:         string
  supportHeading?:         string
  supportSubtext?:         string
  supportServices?:        SanityPlacementsPageCard[]
  hiringEyebrow?:          string
  hiringHeading?:          string
  hiringSubtext?:          string
  hiringFooterText?:       string
  industriesEyebrow?:      string
  industriesHeading?:      string
  industriesSubtext?:      string
  industries?:             SanityPlacementsPageIndustry[]
  processEyebrow?:         string
  processHeading?:         string
  processSubtext?:         string
  processSteps?:           SanityPlacementsPageProcessStep[]
  processFooterText?:      string
  successEyebrow?:         string
  successHeading?:         string
  successCtaPrimaryLabel?:   string
  successCtaSecondaryLabel?: string
}

// Singleton - one document total. Every field is optional; the /programs
// listing page falls back to its current hardcoded copy for anything blank.
export interface SanityProgramsListingPage {
  heroImageUrl?:           string | null
  heroEyebrow?:            string
  heroHeadingLine1?:       string
  heroHeadingLine2Prefix?: string
  heroHeadingHighlight?:   string
  heroSubtext?:            string
  heroPrimaryCtaLabel?:    string
  heroSecondaryCtaLabel?:  string
}

// ────────────────────────────────────────────────────────────
// Queries - all wrapped with unstable_cache for guaranteed
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
        videoUrl,
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
        socialInstagram, socialLinkedIn, socialFacebook, socialYouTube, socialX,
        hiringPartners
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
  // Company names shown in the hiring-partner ticker on About/Placements -
  // distinct from stats.hiringPartners, which is just the "500+" count.
  hiringPartnersList: string[]
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
    coursera:       '10,000+',
    yearEstablished: '2012',
  },
  socials: {
    linkedin:  'https://www.linkedin.com/school/vgu/',
    instagram: 'https://www.instagram.com/vgujaipur/',
    facebook:  'https://www.facebook.com/vgujpr',
    youtube:   'https://www.youtube.com/@VGUVITCampusJaipur',
    x:         'https://x.com/JaipurVgu',
  },
  hiringPartnersList: [
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'HCL',
    'IBM', 'Deloitte', 'EY', 'KPMG', 'Cognizant',
    'Amazon', 'Flipkart', 'HDFC Bank', 'ICICI Bank', 'Bajaj Finserv',
    'Reliance Industries', 'Tata Group', 'Mahindra', 'Zomato', 'PhonePe',
    'Tech Mahindra', 'Capgemini', 'LTIMindtree', 'Axis Bank', 'Mphasis',
  ],
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
    hiringPartnersList: (s?.hiringPartners?.length ? s.hiringPartners : FALLBACKS.hiringPartnersList) as string[],
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

export const getNotices = unstable_cache(
  async (): Promise<SanityNotice[]> => {
    return sanityClient.fetch<SanityNotice[]>(
      `*[_type == "notice"] | order(date desc) {
        _id, title, category, date, summary,
        "attachmentUrl": attachment.asset->url,
        externalUrl
      }`,
      {}
    )
  },
  ['notices'],
  { revalidate: 3600, tags: ['notice'] }
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

// ────────────────────────────────────────────────────────────
// Blog queries
// ────────────────────────────────────────────────────────────

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

export const getHomePage = unstable_cache(
  async (): Promise<SanityHomePage | null> => {
    return sanityClient.fetch<SanityHomePage | null>(
      `*[_type == "homePage"][0] {
        "heroImageUrl": heroImage.asset->url,
        heroEyebrow, heroHeadingPrefix, heroHeadingHighlight, heroHeadingSuffix,
        heroSubtext, heroBadgeText, heroPrimaryCtaLabel, heroSecondaryCtaLabel,
        trustBarEyebrow,
        "trustBarLogos": trustBarLogos[] {
          name, "logoUrl": logo.asset->url, scale
        },
        coursePlatformsEyebrow, coursePlatformsHeading,
        courseraCard, linkedinCard,
        stepsEyebrow, stepsHeading, stepsSubtext,
        steps
      }`,
      {}
    )
  },
  ['home-page'],
  { revalidate: 3600, tags: ['homePage'] }
)

export const getAboutPage = unstable_cache(
  async (): Promise<SanityAboutPage | null> => {
    return sanityClient.fetch<SanityAboutPage | null>(
      `*[_type == "aboutPage"][0] {
        "heroImageUrl": heroImage.asset->url,
        heroEyebrow, heroHeadingLine1, heroHeadingLine2, heroSubtext,
        heroPrimaryCtaLabel, heroSecondaryCtaLabel,
        statsCards,
        valuesEyebrow, valuesHeading, valuesPullQuote, valuesParagraph, values,
        accreditationsEyebrow, accreditationsHeading,
        "accreditations": accreditations[] {
          name, fullName, detail, colorStyle,
          "logoUrl": logo.asset->url,
          status, ghostLetter
        },
        pedagogyEyebrow, pedagogyHeading, pedagogySubtext, pedagogy,
        leadershipEyebrow, leadershipHeading, leadershipSubtext, leadershipRoles,
        campusEyebrow, campusHeadingLine1, campusHeadingLine2, campusParagraph,
        "campusImageUrl": campusImage.asset->url,
        campusCtaLabel, campusFeatures, campusProofStats,
        hiringEyebrow, hiringHeading, hiringSubtext, hiringCtaLabel,
        historyEyebrow, historyHeading, historyParagraph, historyNaacCaption, historyChips,
        alumniEyebrow, alumniHeading, alumniSubtext, alumniFeatures,
        alumniCtaPrimaryLabel, alumniCtaSecondaryLabel
      }`,
      {}
    )
  },
  ['about-page'],
  { revalidate: 3600, tags: ['aboutPage'] }
)

export const getAboutTestimonials = unstable_cache(
  async (): Promise<SanityTestimonial[]> => {
    return sanityClient.fetch<SanityTestimonial[]>(
      `*[_type == "testimonial" && showOnAboutPage == true] | order(displayOrder asc) {
        _id, name, role, program, quote,
        outcomes,
        "avatarUrl": avatar.asset->url,
        colorTheme, videoLabel, videoUrl,
        displayOrder
      }`,
      {}
    )
  },
  ['about-testimonials'],
  { revalidate: 3600, tags: ['testimonial'] }
)

export const getContactPage = unstable_cache(
  async (): Promise<SanityContactPage | null> => {
    return sanityClient.fetch<SanityContactPage | null>(
      `*[_type == "contactPage"][0] {
        heroBadgeLabel, heroHeadingLine1, heroHeadingHighlight, heroSubtext, trustPills,
        contactChannels,
        addressCardLabel, officeHoursLabel, officeHours, socialsLabel,
        formEyebrow, formHeading,
        mapEyebrow, mapHeading, mapSubtext,
        departmentsEyebrow, departmentsHeading, departments,
        miniFaqEyebrow, miniFaqHeading, miniFaqs,
        counsellorsEyebrow, counsellorsHeading
      }`,
      {}
    )
  },
  ['contact-page'],
  { revalidate: 3600, tags: ['contactPage'] }
)

export const getCounsellors = unstable_cache(
  async (): Promise<SanityCounsellor[]> => {
    return sanityClient.fetch<SanityCounsellor[]>(
      `*[_type == "counsellor"] | order(displayOrder asc) {
        _id, name, role, bio, languages,
        "photoUrl": photo.asset->url,
        displayOrder
      }`,
      {}
    )
  },
  ['counsellors'],
  { revalidate: 3600, tags: ['counsellor'] }
)

export const getPlacementsPage = unstable_cache(
  async (): Promise<SanityPlacementsPage | null> => {
    return sanityClient.fetch<SanityPlacementsPage | null>(
      `*[_type == "placementsPage"][0] {
        "heroImageUrl": heroImage.asset->url,
        heroEyebrow, heroHeadingLine1, heroHeadingHighlight, heroSubtext,
        heroPrimaryCtaLabel, heroSecondaryCtaLabel,
        statsCards,
        supportEyebrow, supportHeading, supportSubtext, supportServices,
        hiringEyebrow, hiringHeading, hiringSubtext, hiringFooterText,
        industriesEyebrow, industriesHeading, industriesSubtext, industries,
        processEyebrow, processHeading, processSubtext, processSteps, processFooterText,
        successEyebrow, successHeading, successCtaPrimaryLabel, successCtaSecondaryLabel
      }`,
      {}
    )
  },
  ['placements-page'],
  { revalidate: 3600, tags: ['placementsPage'] }
)

export const getPlacementsTestimonials = unstable_cache(
  async (): Promise<SanityTestimonial[]> => {
    return sanityClient.fetch<SanityTestimonial[]>(
      `*[_type == "testimonial" && showOnPlacementsPage == true] | order(displayOrder asc) {
        _id, name, role, program, quote,
        outcomes,
        "avatarUrl": avatar.asset->url,
        colorTheme, videoLabel, videoUrl,
        displayOrder, company, journey
      }`,
      {}
    )
  },
  ['placements-testimonials'],
  { revalidate: 3600, tags: ['testimonial'] }
)

export const getProgramsListingPage = unstable_cache(
  async (): Promise<SanityProgramsListingPage | null> => {
    return sanityClient.fetch<SanityProgramsListingPage | null>(
      `*[_type == "programsListingPage"][0] {
        "heroImageUrl": heroImage.asset->url,
        heroEyebrow, heroHeadingLine1, heroHeadingLine2Prefix, heroHeadingHighlight,
        heroSubtext, heroPrimaryCtaLabel, heroSecondaryCtaLabel
      }`,
      {}
    )
  },
  ['programs-listing-page'],
  { revalidate: 3600, tags: ['programsListingPage'] }
)
