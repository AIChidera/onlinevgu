/**
 * One-off script to seed ONLY the two new programs (MBA-DFAA and BBA-AAFT).
 *
 * Uses `createIfNotExists` (NOT `createOrReplace`) so if the docs already
 * exist in Sanity with admin-uploaded brochures, hero images, or certificate
 * samples, they are left untouched. Delete the docs manually in Studio first
 * if you want to re-seed.
 *
 * Run: npx tsx scripts/seed-new-programs.ts
 */
import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
})

const NEW_PROGRAMS = [
  {
    slug: 'mba-dfaa',
    name: 'MBA-DFAA',
    fullName: 'MBA in Digital Finance and Accounting Analytics',
    level: 'pg',
    discipline: 'Management',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹1,00,000/yr',
    totalFee: '₹2,00,000',
    emi: '₹8,333/month',
    displayOrder: 7,
    popular: false,
    description: 'A specialised 2-year online MBA built for finance and accounting professionals whose day job is being reshaped by digital tools. Covers the modern finance stack - digital payments, cloud ERP, accounting analytics, and AI-driven audit - alongside a full MBA management core.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Background in Commerce, Finance, or IT preferred but not mandatory',
    ],
    highlights: [
      'UGC-entitled MBA with a digital finance and analytics specialisation',
      'Digital finance stack: UPI, digital payments, cloud ERP, and open banking',
      'Accounting analytics: Excel-to-Power-BI pipelines, forecasting, and audit analytics',
      'AI for Finance & Accounting module in the final semester',
      'Aligned with modern CFO office skill expectations',
      'AI-proctored exams - no campus visit required',
    ],
    specialisations: ['Digital Finance', 'Accounting Analytics', 'FinTech Operations'],
    careerRoles: ['Finance Analyst', 'FP&A Analyst', 'Accounting Analytics Lead', 'FinTech Product Analyst', 'Audit Analytics Manager', 'Digital Finance Manager'],
    avgSalaryAfter: '₹10-18 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'HDFC Bank', 'Razorpay', 'PayU'],
  },
  {
    slug: 'bba-aaft',
    name: 'BBA-AAFT',
    fullName: 'BBA in Media & Entertainment Management (AAFT)',
    level: 'ug',
    discipline: 'Management',
    duration: '3 Years',
    semesters: 6,
    feePerYear: '₹60,000/yr',
    totalFee: '₹1,80,000',
    emi: '₹5,000/month',
    displayOrder: 10,
    popular: false,
    description: 'A 3-year online BBA delivered in partnership with the Asian Academy of Film and Television (AAFT) - one of India\'s oldest media schools. Combines a full BBA business core with the operating knowledge of the film, television, streaming, advertising and live entertainment industries.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream - Science, Commerce, or Arts',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled BBA delivered in partnership with AAFT (founded 1993)',
      'Specialisations: Film & Television Business, Digital Media Management, Event & Live Entertainment, Advertising & PR',
      'Live sessions with AAFT industry faculty from production, streaming, and advertising',
      'Capstone media business plan - pitch-ready proposal for a real venture or IP',
      'Valid for MBA admission at any Indian university',
      'AI-proctored exams - no campus visit required',
    ],
    specialisations: ['Film & Television Business', 'Digital Media Management', 'Event & Live Entertainment', 'Advertising & PR'],
    careerRoles: ['Production Coordinator', 'Line Producer', 'Content Strategist', 'OTT Operations Executive', 'Talent Manager', 'Event Manager'],
    avgSalaryAfter: '₹4-9 LPA',
    topHirers: ['Yash Raj Films', 'Dharma Productions', 'Sony Pictures', 'Netflix India', 'Amazon Prime Video', 'Zee Media', 'Ogilvy'],
  },
]

interface CourseItem { name: string; credits: number; type: 'Core' | 'Elective' }
interface SemData    { label: string; totalCredits: number; courses: CourseItem[] }
interface YearData   { year: string; semesters: SemData[] }

const CURRICULUM_DATA: Record<string, YearData[]> = {
  'mba-dfaa': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 23, courses: [
        { name: 'Managerial Economics', credits: 3, type: 'Core' },
        { name: 'Financial Accounting', credits: 4, type: 'Core' },
        { name: 'Organisational Behaviour', credits: 3, type: 'Core' },
        { name: 'Business Statistics', credits: 4, type: 'Core' },
        { name: 'Digital Finance Foundations', credits: 3, type: 'Core' },
        { name: 'Business Communication', credits: 3, type: 'Core' },
        { name: 'Spreadsheet Modelling Lab', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 24, courses: [
        { name: 'Corporate Finance', credits: 4, type: 'Core' },
        { name: 'Management Accounting', credits: 4, type: 'Core' },
        { name: 'Marketing Management', credits: 3, type: 'Core' },
        { name: 'Cloud ERP Systems', credits: 3, type: 'Core' },
        { name: 'Financial Reporting Standards', credits: 4, type: 'Core' },
        { name: 'Data Visualisation for Finance', credits: 3, type: 'Core' },
        { name: 'Legal Aspects of Business', credits: 3, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 23, courses: [
        { name: 'Digital Payments and Open Banking', credits: 4, type: 'Core' },
        { name: 'Accounting Analytics with Power BI', credits: 4, type: 'Core' },
        { name: 'Financial Modelling and Valuation', credits: 4, type: 'Core' },
        { name: 'Risk and Compliance', credits: 3, type: 'Core' },
        { name: 'Elective 1', credits: 4, type: 'Elective' },
        { name: 'Elective 2', credits: 4, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 22, courses: [
        { name: 'AI for Finance and Accounting', credits: 4, type: 'Core' },
        { name: 'Audit Analytics', credits: 4, type: 'Core' },
        { name: 'Capstone Project', credits: 8, type: 'Core' },
        { name: 'Corporate Readiness', credits: 3, type: 'Core' },
        { name: 'Elective 3', credits: 3, type: 'Elective' },
      ]},
    ]},
  ],

  'bba-aaft': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'Fundamentals of Management', credits: 3, type: 'Core' },
        { name: 'Introduction to Media and Entertainment Industry', credits: 4, type: 'Core' },
        { name: 'Business Communication', credits: 3, type: 'Core' },
        { name: 'Business Accounting', credits: 4, type: 'Core' },
        { name: 'History of Cinema and Television', credits: 3, type: 'Core' },
        { name: 'Environmental Science', credits: 3, type: 'Core' },
        { name: 'Elective 1', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'Managerial Economics', credits: 3, type: 'Core' },
        { name: 'Principles of Marketing', credits: 3, type: 'Core' },
        { name: 'Media Laws and Ethics', credits: 4, type: 'Core' },
        { name: 'Storytelling for Business', credits: 3, type: 'Core' },
        { name: 'Human Resource Management', credits: 3, type: 'Core' },
        { name: 'Statistics for Business', credits: 4, type: 'Core' },
        { name: 'Elective 2', credits: 2, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 21, courses: [
        { name: 'Production Management', credits: 4, type: 'Core' },
        { name: 'Digital Media Platforms and OTT', credits: 4, type: 'Core' },
        { name: 'Advertising and Brand Management', credits: 3, type: 'Core' },
        { name: 'Business Environment', credits: 3, type: 'Core' },
        { name: 'Financial Management for Media', credits: 3, type: 'Core' },
        { name: 'Elective 3', credits: 2, type: 'Elective' },
        { name: 'Elective 4', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 22, courses: [
        { name: 'Event and Live Entertainment Management', credits: 4, type: 'Core' },
        { name: 'Public Relations and Corporate Communication', credits: 3, type: 'Core' },
        { name: 'Media Research and Analytics', credits: 4, type: 'Core' },
        { name: 'IP Rights and Content Licensing', credits: 3, type: 'Core' },
        { name: 'Distribution and Exhibition', credits: 3, type: 'Core' },
        { name: 'Elective 5', credits: 2, type: 'Elective' },
        { name: 'Elective 6', credits: 3, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 3', semesters: [
      { label: 'Semester 5', totalCredits: 22, courses: [
        { name: 'Strategic Management', credits: 4, type: 'Core' },
        { name: 'International Media Business', credits: 3, type: 'Core' },
        { name: 'Talent Management and Casting', credits: 3, type: 'Core' },
        { name: 'Content Marketing and Social Media', credits: 3, type: 'Core' },
        { name: 'Entrepreneurship in Media', credits: 4, type: 'Core' },
        { name: 'Elective 7', credits: 2, type: 'Elective' },
        { name: 'Elective 8', credits: 3, type: 'Elective' },
      ]},
      { label: 'Semester 6', totalCredits: 20, courses: [
        { name: 'Capstone Media Business Plan', credits: 8, type: 'Core' },
        { name: 'Corporate Readiness', credits: 3, type: 'Core' },
        { name: 'Indian Knowledge System', credits: 3, type: 'Core' },
        { name: 'Elective 9', credits: 3, type: 'Elective' },
        { name: 'Elective 10', credits: 3, type: 'Elective' },
      ]},
    ]},
  ],
}

function toCurriculumDoc(data: YearData[]) {
  return data.map((year, yi) => ({
    _key: `y${yi}`,
    year: year.year,
    semesters: year.semesters.map((sem, si) => ({
      _key:         `s${yi}${si}`,
      label:        sem.label,
      totalCredits: sem.totalCredits,
      courses: sem.courses.map((c, ci) => ({
        _key:    `c${yi}${si}${ci}`,
        name:    c.name,
        credits: c.credits,
        type:    c.type,
      })),
    })),
  }))
}

async function seed() {
  console.log(`Connecting to project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)

  for (const prog of NEW_PROGRAMS) {
    const doc = {
      _type:       'program',
      _id:         `program-${prog.slug}`,
      name:        prog.name,
      fullName:    prog.fullName,
      slug:        { _type: 'slug', current: prog.slug },
      level:       prog.level,
      discipline:  prog.discipline,
      duration:    prog.duration,
      semesters:   prog.semesters,
      feePerYear:  prog.feePerYear,
      totalFee:    prog.totalFee,
      ...(prog.emi ? { emi: prog.emi } : {}),
      nextBatch:   'July 2026',
      displayOrder: prog.displayOrder,
      popular:     prog.popular,
      description: prog.description,
      eligibility: prog.eligibility,
      highlights:  prog.highlights,
      specialisations: prog.specialisations,
      careerRoles: prog.careerRoles,
      ...(prog.avgSalaryAfter ? { avgSalaryAfter: prog.avgSalaryAfter } : {}),
      topHirers:   prog.topHirers,
      ...(CURRICULUM_DATA[prog.slug] ? { curriculum: toCurriculumDoc(CURRICULUM_DATA[prog.slug]!) } : {}),
    }

    // createIfNotExists = safe, non-destructive. If the program already exists,
    // this call is a no-op and admin-uploaded fields (brochurePdf, heroImage,
    // certificateSample) stay untouched.
    const result = await client.createIfNotExists(doc)
    const created = result._createdAt === result._updatedAt
    console.log(`  ${created ? '✓ created' : '· already exists (skipped)'}: ${prog.name} - ${prog.fullName}`)
  }

  console.log(`\nDone. Ready for you to upload brochures in Sanity Studio.`)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
