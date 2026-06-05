export type Level = 'ug' | 'pg' | 'cert'

export type Discipline =
  | 'Management'
  | 'Information Technology'
  | 'Commerce'
  | 'Arts'
  | 'Science'
  | 'Data Science'
  | 'Media & Journalism'

export const DISCIPLINE_ORDER: Discipline[] = [
  'Management',
  'Information Technology',
  'Arts',
  'Science',
  'Media & Journalism',
  'Commerce',
  'Data Science',
]

export interface Programme {
  slug:            string
  name:            string
  fullName:        string
  level:           Level
  discipline:      Discipline
  duration:        string
  fee:             string
  popular?:        boolean
  specialisations: string[]
  image?:          string
}

// Baseline: 9 programs confirmed by admin (2026-06-05).
// Sanity is primary; this array is the fallback when CMS is empty.
export const PROGRAMMES: Programme[] = [

  // ── Management ─────────────────────────────────────────────────
  {
    slug: 'bba', name: 'BBA', fullName: 'Bachelor of Business Administration',
    level: 'ug', discipline: 'Management', duration: '3 Years', fee: '₹44,000/yr',
    specialisations: ['General Management', 'Digital Marketing', 'Retail Management', 'FinTech'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mba', name: 'MBA', fullName: 'Master of Business Administration',
    level: 'pg', discipline: 'Management', duration: '2 Years', fee: '₹75,000/yr',
    popular: true,
    specialisations: ['Marketing', 'Human Resources', 'Finance', 'Operations', 'Healthcare', 'Agri-Business', 'IT Management', 'International Business'],
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mba-if', name: 'MBA-IF', fullName: 'MBA in International Finance',
    level: 'pg', discipline: 'Management', duration: '2 Years', fee: '₹1,20,000/yr',
    specialisations: ['ACCA Track', 'CMA Track', 'FM Track'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop',
  },

  // ── Information Technology ──────────────────────────────────────
  {
    slug: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications',
    level: 'ug', discipline: 'Information Technology', duration: '3 Years', fee: '₹44,000/yr',
    specialisations: ['General', 'UX Design', 'Data Science', 'Cloud Technology & Information Security', 'Blockchain Technology', 'Artificial Intelligence'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mca', name: 'MCA', fullName: 'Master of Computer Applications',
    level: 'pg', discipline: 'Information Technology', duration: '2 Years', fee: '₹75,000/yr',
    specialisations: ['AI & Data Science', 'Cloud Tech & Cybersecurity', 'Cloud Computing & Full Stack'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop',
  },

  // ── Arts ───────────────────────────────────────────────────────
  {
    slug: 'ba', name: 'BA', fullName: 'Bachelor of Arts',
    level: 'ug', discipline: 'Arts', duration: '3 Years', fee: '₹24,000/yr',
    specialisations: ['Economics', 'Political Science', 'Public Policy & Development', 'International Relations', 'English Literature', 'History', 'Computer Applications', 'Psychology'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ma', name: 'MA', fullName: 'Master of Arts in English',
    level: 'pg', discipline: 'Arts', duration: '2 Years', fee: '₹36,000/yr',
    specialisations: [],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
  },

  // ── Science ────────────────────────────────────────────────────
  {
    slug: 'msc', name: 'M.Sc', fullName: 'Master of Science in Mathematics',
    level: 'pg', discipline: 'Science', duration: '2 Years', fee: '₹36,000/yr',
    specialisations: [],
    image: 'https://images.unsplash.com/photo-1532094349884-543559c03d7f?w=800&q=80&auto=format&fit=crop',
  },

  // ── Media & Journalism ─────────────────────────────────────────
  {
    slug: 'majmc', name: 'MAJMC', fullName: 'Master of Arts in Journalism & Mass Communication',
    level: 'pg', discipline: 'Media & Journalism', duration: '2 Years', fee: '₹36,000/yr',
    specialisations: ['Digital Journalism', 'Broadcast Media', 'Public Relations & Corporate Communication', 'Multimedia Journalism'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop',
  },
]
