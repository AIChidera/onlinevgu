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
  'Commerce',
  'Arts',
  'Science',
  'Data Science',
  'Media & Journalism',
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

export const PROGRAMMES: Programme[] = [

  // ── Management — Degrees ───────────────────────────────────────
  {
    slug: 'bba', name: 'BBA', fullName: 'Bachelor of Business Administration',
    level: 'ug', discipline: 'Management', duration: '3 Years', fee: '₹55,000/yr',
    specialisations: ['Finance', 'Marketing', 'Human Resources', 'International Business'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mba', name: 'MBA', fullName: 'Master of Business Administration',
    level: 'pg', discipline: 'Management', duration: '2 Years', fee: '₹85,000/yr',
    popular: true,
    specialisations: ['Finance', 'Marketing', 'Human Resources', 'Operations Management', 'Business Analytics', 'International Business'],
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mba-healthcare', name: 'Healthcare MBA', fullName: 'MBA in Healthcare Management',
    level: 'pg', discipline: 'Management', duration: '2 Years', fee: '₹90,000/yr',
    specialisations: ['Hospital Administration', 'Healthcare Operations', 'Pharma Management', 'Health Insurance'],
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80&auto=format&fit=crop',
  },

  // ── Management — Certificates ──────────────────────────────────
  {
    slug: 'pg-cert-digital-marketing', name: 'PG Cert: Digital Marketing', fullName: 'PG Certificate in Digital Marketing',
    level: 'cert', discipline: 'Management', duration: '6 Months', fee: '₹38,000',
    specialisations: ['SEO & SEM', 'Social Media', 'Content Strategy', 'Analytics'],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-supply-chain', name: 'PG Cert: Supply Chain', fullName: 'PG Certificate in Supply Chain Management',
    level: 'cert', discipline: 'Management', duration: '6 Months', fee: '₹35,000',
    specialisations: ['Logistics', 'Procurement', 'Operations', 'Inventory Management'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-hr', name: 'PG Cert: HRM', fullName: 'PG Certificate in Human Resource Management',
    level: 'cert', discipline: 'Management', duration: '6 Months', fee: '₹35,000',
    specialisations: ['Talent Acquisition', 'Performance Management', 'HR Analytics'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-project-mgmt', name: 'PG Cert: Project Management', fullName: 'PG Certificate in Project Management',
    level: 'cert', discipline: 'Management', duration: '6 Months', fee: '₹35,000',
    specialisations: ['Agile', 'Scrum', 'Risk Management', 'PMP Prep'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-finance', name: 'PG Cert: Finance', fullName: 'PG Certificate in Financial Management',
    level: 'cert', discipline: 'Management', duration: '6 Months', fee: '₹38,000',
    specialisations: ['Investment Analysis', 'Corporate Finance', 'Risk & Compliance'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop',
  },

  // ── Information Technology — Degrees ───────────────────────────
  {
    slug: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications',
    level: 'ug', discipline: 'Information Technology', duration: '3 Years', fee: '₹60,000/yr',
    specialisations: ['Data Science', 'Cloud Computing', 'Cybersecurity', 'Software Engineering'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mca', name: 'MCA', fullName: 'Master of Computer Applications',
    level: 'pg', discipline: 'Information Technology', duration: '2 Years', fee: '₹75,000/yr',
    specialisations: ['Data Science', 'Cloud Computing', 'AI & Machine Learning', 'Cybersecurity'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80&auto=format&fit=crop',
  },

  // ── Information Technology — Certificates ──────────────────────
  {
    slug: 'pg-cert-cloud', name: 'PG Cert: Cloud Computing', fullName: 'PG Certificate in Cloud Computing',
    level: 'cert', discipline: 'Information Technology', duration: '6 Months', fee: '₹40,000',
    specialisations: ['AWS', 'Azure', 'DevOps', 'Cloud Architecture'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-cybersecurity', name: 'PG Cert: Cybersecurity', fullName: 'PG Certificate in Cybersecurity',
    level: 'cert', discipline: 'Information Technology', duration: '6 Months', fee: '₹42,000',
    specialisations: ['Ethical Hacking', 'Network Security', 'Forensics'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-fullstack', name: 'PG Cert: Full-Stack Dev', fullName: 'PG Certificate in Full-Stack Development',
    level: 'cert', discipline: 'Information Technology', duration: '6 Months', fee: '₹40,000',
    specialisations: ['React', 'Node.js', 'Databases', 'REST APIs'],
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop',
  },

  // ── Commerce — Degrees ─────────────────────────────────────────
  {
    slug: 'bcom', name: 'B.Com', fullName: 'Bachelor of Commerce',
    level: 'ug', discipline: 'Commerce', duration: '3 Years', fee: '₹45,000/yr',
    specialisations: ['Accounting & Finance', 'Business Management', 'Taxation'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mcom', name: 'M.Com', fullName: 'Master of Commerce',
    level: 'pg', discipline: 'Commerce', duration: '2 Years', fee: '₹55,000/yr',
    specialisations: ['Finance', 'Accounting & Taxation', 'Business Management'],
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80&auto=format&fit=crop',
  },

  // ── Arts — Degrees ─────────────────────────────────────────────
  {
    slug: 'ba', name: 'BA', fullName: 'Bachelor of Arts',
    level: 'ug', discipline: 'Arts', duration: '3 Years', fee: '₹40,000/yr',
    specialisations: ['English', 'Economics', 'Political Science', 'Sociology'],
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'ma', name: 'MA', fullName: 'Master of Arts',
    level: 'pg', discipline: 'Arts', duration: '2 Years', fee: '₹50,000/yr',
    specialisations: ['English', 'Economics', 'Political Science', 'Sociology'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop',
  },

  // ── Science — Degrees ──────────────────────────────────────────
  {
    slug: 'bsc', name: 'B.Sc', fullName: 'Bachelor of Science',
    level: 'ug', discipline: 'Science', duration: '3 Years', fee: '₹50,000/yr',
    specialisations: ['Computer Science', 'Mathematics', 'Environmental Science'],
    image: 'https://images.unsplash.com/photo-1532094349884-543559c03d7f?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'blib', name: 'B.Lib', fullName: 'Bachelor of Library Science',
    level: 'ug', discipline: 'Science', duration: '1 Year', fee: '₹35,000/yr',
    specialisations: [],
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'mlib', name: 'M.Lib', fullName: 'Master of Library Science',
    level: 'pg', discipline: 'Science', duration: '1 Year', fee: '₹40,000/yr',
    specialisations: [],
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80&auto=format&fit=crop',
  },

  // ── Data Science — Certificates ────────────────────────────────
  {
    slug: 'pg-cert-data-science', name: 'PG Cert: Data Science', fullName: 'PG Certificate in Data Science',
    level: 'cert', discipline: 'Data Science', duration: '6 Months', fee: '₹45,000',
    popular: true,
    specialisations: ['Python for Data Science', 'Machine Learning', 'Data Visualisation', 'Statistics'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-business-analytics', name: 'PG Cert: Business Analytics', fullName: 'PG Certificate in Business Analytics',
    level: 'cert', discipline: 'Data Science', duration: '6 Months', fee: '₹42,000',
    specialisations: ['Power BI', 'SQL', 'Tableau', 'Predictive Analytics'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-ml-ai', name: 'PG Cert: ML & AI', fullName: 'PG Certificate in Machine Learning & AI',
    level: 'cert', discipline: 'Data Science', duration: '6 Months', fee: '₹45,000',
    specialisations: ['Deep Learning', 'NLP', 'Computer Vision', 'Generative AI'],
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop',
  },

  // ── Media & Journalism — Certificates ─────────────────────────
  {
    slug: 'pg-cert-media', name: 'PG Cert: Media & Journalism', fullName: 'PG Certificate in Media & Journalism',
    level: 'cert', discipline: 'Media & Journalism', duration: '6 Months', fee: '₹32,000',
    specialisations: ['Print Journalism', 'Broadcast Media', 'Digital News', 'Investigative Reporting'],
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80&auto=format&fit=crop',
  },
  {
    slug: 'pg-cert-digital-comms', name: 'PG Cert: Digital Communications', fullName: 'PG Certificate in Digital Communications & PR',
    level: 'cert', discipline: 'Media & Journalism', duration: '6 Months', fee: '₹30,000',
    specialisations: ['Content Marketing', 'PR Strategy', 'Social Media Management', 'Brand Storytelling'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&auto=format&fit=crop',
  },
]
