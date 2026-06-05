/**
 * One-time script to seed Sanity with the 9 programs confirmed by admin.
 * Run: npx tsx scripts/seed-programs.ts
 * Uses createOrReplace with deterministic IDs so it is safe to re-run.
 */
import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:  process.env.SANITY_API_TOKEN,
  useCdn: false,
})

// ─── Program data confirmed by admin (screenshots 2026-06-05) ────────────────

const PROGRAMS = [

  // ── UG ──────────────────────────────────────────────────────────────────────

  {
    slug: 'ba',
    name: 'BA',
    fullName: 'Bachelor of Arts',
    level: 'ug',
    discipline: 'Arts',
    duration: '3 Years',
    semesters: 6,
    feePerYear: '₹24,000/yr',
    totalFee: '₹72,000',
    displayOrder: 1,
    popular: false,
    description: 'A 3-year online Bachelor of Arts from Vivekananda Global University, UGC-entitled and equivalent in every way to an on-campus BA. Study on weekends and build a strong foundation in humanities, social science, or economics without stepping away from your work or family.',
    eligibility: [
      '10+2 from any recognised board (any stream)',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled degree — valid for government jobs, higher studies, and teaching roles',
      'Choose from English, Political Science, Sociology, Economics, and History specialisations',
      'Weekend live sessions — study without leaving your job',
      'Dissertation project in Year 3 under faculty supervision',
      'Directly prepares for UPSC, state PCS, and UGC-NET',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['English', 'Political Science', 'Sociology', 'Economics', 'History'],
    careerRoles: ['Civil Services Officer', 'Content Writer', 'Social Worker', 'Researcher', 'Journalist', 'Teacher'],
    topHirers: ['Government Departments', 'NGOs', 'Media Houses', 'Educational Institutions'],
  },

  {
    slug: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    level: 'ug',
    discipline: 'Management',
    duration: '3 Years',
    semesters: 6,
    feePerYear: '₹44,000/yr',
    totalFee: '₹1,32,000',
    displayOrder: 2,
    popular: false,
    description: 'A 3-year online BBA from VGU that gives you a full management education — finance, marketing, HR, and operations — without putting your life on hold. Built for fresh graduates who want a business career and working students who need flexibility.',
    eligibility: [
      '10+2 from any recognised board (any stream)',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled BBA — valid for MBA admission at any Indian university',
      'Finance, Marketing, and HR specialisations',
      'Startup simulation in Year 2 — run a business, not just study one',
      'Industry mentor assigned at start of Year 2',
      'Weekend live sessions with recordings available within 48 hours',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['Finance', 'Marketing', 'Human Resource Management'],
    careerRoles: ['Business Analyst', 'Marketing Executive', 'HR Associate', 'Operations Manager', 'Management Trainee'],
    topHirers: ['HDFC Bank', 'Wipro', 'Reliance', 'Deloitte', 'Amazon'],
  },

  {
    slug: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    level: 'ug',
    discipline: 'Information Technology',
    duration: '3 Years',
    semesters: 6,
    feePerYear: '₹44,000/yr',
    totalFee: '₹1,32,000',
    displayOrder: 3,
    popular: false,
    description: 'A 3-year online BCA from VGU covering the full software development stack — from C and Python to React, cloud, and cybersecurity. Designed for students who want a tech career but cannot attend a full-time campus programme.',
    eligibility: [
      '10+2 from any recognised board',
      'Minimum 45% aggregate marks',
      'Mathematics at 10+2 level preferred but not mandatory',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled BCA — qualifies for MCA admission at any university',
      'Learn C, Python, Java, JavaScript, React, Node.js, SQL, and AWS',
      'Capstone project in Year 3 — build a real application for your portfolio',
      'Cloud and Cybersecurity specialisation tracks',
      'AI-proctored exams — no campus visit required',
      '93% placement rate with direct introductions to hiring partners',
    ],
    specialisations: ['Software Engineering', 'Cloud Computing', 'Cybersecurity', 'Data Science'],
    careerRoles: ['Software Developer', 'Web Developer', 'Cloud Engineer', 'QA Engineer', 'System Analyst'],
    topHirers: ['Infosys', 'TCS', 'HCL', 'Wipro', 'Tech Mahindra'],
  },

  // ── PG ──────────────────────────────────────────────────────────────────────

  {
    slug: 'ma',
    name: 'MA',
    fullName: 'Master of Arts',
    level: 'pg',
    discipline: 'Arts',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹36,000/yr',
    totalFee: '₹72,000',
    displayOrder: 4,
    popular: false,
    description: 'A 2-year online MA from VGU for graduates who want to go deeper into humanities and social sciences — or prepare for UGC-NET, civil services, or a teaching career. Research-led curriculum with a full dissertation in the final semester.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled MA — valid for UGC-NET, lecturership, and government roles',
      'Specialisations in English, Political Science, Sociology, Economics, and History',
      'Dissertation in Semester 4 under dedicated faculty supervision',
      'Directly aligned with UPSC and state civil services syllabi',
      'Weekend live sessions — ideal for working graduates',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['English', 'Political Science', 'Sociology', 'Economics', 'History'],
    careerRoles: ['Lecturer', 'Researcher', 'Civil Services Officer', 'Content Strategist', 'Policy Analyst'],
    topHirers: ['Universities', 'Government Departments', 'Think Tanks', 'Media Organisations'],
  },

  {
    slug: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    level: 'pg',
    discipline: 'Management',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹75,000/yr',
    totalFee: '₹1,50,000',
    emi: '₹6,250/month',
    displayOrder: 5,
    popular: true,
    description: 'The most popular programme at VGU. A 2-year online MBA designed for working professionals who want to move into leadership roles without pausing their careers. Choose a specialisation at the start of Year 2 and graduate with a UGC-recognised degree recognised by every employer in India.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Working professionals and fresh graduates both eligible',
    ],
    highlights: [
      'UGC-entitled MBA — same legal standing as any on-campus MBA',
      'Specialisations: Finance, Marketing, HR, Operations, Business Analytics',
      'Live sessions on weekends — recordings within 48 hours',
      '500+ hiring partners with dedicated placement support from Semester 1',
      'Annual hiring expo where companies interview students directly',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['Finance', 'Marketing', 'Human Resource Management', 'Operations Management', 'Business Analytics'],
    careerRoles: ['Business Manager', 'Marketing Manager', 'Finance Manager', 'HR Manager', 'Operations Head', 'Product Manager'],
    avgSalaryAfter: '₹10-18 LPA',
    topHirers: ['Deloitte', 'KPMG', 'TCS', 'Wipro', 'Amazon', 'Infosys'],
  },

  {
    slug: 'mba-if',
    name: 'MBA-IF',
    fullName: 'MBA in International Finance',
    level: 'pg',
    discipline: 'Management',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹1,20,000/yr',
    totalFee: '₹2,40,000',
    emi: '₹10,000/month',
    displayOrder: 6,
    popular: false,
    description: 'A specialised 2-year online MBA focused entirely on international finance — cross-border investments, forex markets, global banking, and financial risk management. Built for finance professionals and graduates who want a global edge in one of the highest-paying career tracks.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Background in Commerce or Finance preferred but not mandatory',
    ],
    highlights: [
      'UGC-entitled degree with international finance specialisation',
      'Forex markets, global banking, financial derivatives, and risk management',
      'Faculty with CFA and international banking experience',
      'Live case studies from global financial events',
      'Aligned with CFA Foundation and FRM exam syllabi',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['International Banking', 'Forex & Derivatives', 'Global Investment Management', 'Financial Risk'],
    careerRoles: ['Investment Analyst', 'Forex Trader', 'Risk Manager', 'International Finance Manager', 'Treasury Analyst'],
    avgSalaryAfter: '₹12-22 LPA',
    topHirers: ['HSBC', 'Standard Chartered', 'Citibank', 'JP Morgan', 'ICICI Bank', 'Kotak Mahindra'],
  },

  {
    slug: 'mca',
    name: 'MCA',
    fullName: 'Master of Computer Applications',
    level: 'pg',
    discipline: 'Information Technology',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹75,000/yr',
    totalFee: '₹1,50,000',
    emi: '₹6,250/month',
    displayOrder: 7,
    popular: false,
    description: 'A 2-year online MCA from VGU covering advanced software engineering, cloud architecture, AI/ML, and data science. The natural next step after a BCA or B.Sc — and a direct route into senior tech roles at product companies and MNCs.',
    eligibility: [
      'BCA, B.Sc (IT/CS/Mathematics) or equivalent',
      'Any bachelor\'s degree with Mathematics at 10+2 level',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled MCA — valid for government and private sector tech roles',
      'Cloud (AWS), AI/ML, and Cybersecurity specialisation tracks',
      'Semester hackathons — several students hired directly at expo',
      'AWS Certified Solutions Architect prep included in cloud track',
      'Faculty with Microsoft, Google, and product company backgrounds',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['Cloud Computing', 'Artificial Intelligence & Machine Learning', 'Cybersecurity', 'Data Science'],
    careerRoles: ['Software Engineer', 'Cloud Architect', 'Data Scientist', 'AI Engineer', 'DevOps Engineer', 'Full Stack Developer'],
    avgSalaryAfter: '₹8-16 LPA',
    topHirers: ['Infosys', 'TCS', 'HCL', 'Wipro', 'IBM', 'Accenture'],
  },

  {
    slug: 'majmc',
    name: 'MAJMC',
    fullName: 'Master of Arts in Journalism & Mass Communication',
    level: 'pg',
    discipline: 'Media & Journalism',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹36,000/yr',
    totalFee: '₹72,000',
    displayOrder: 8,
    popular: false,
    description: 'A 2-year online MA in Journalism and Mass Communication from VGU for graduates who want to work in media, digital content, public relations, or broadcasting. Combines media theory with hands-on production skills for the modern newsroom.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled degree — recognised for journalism and media roles',
      'Digital journalism, broadcast, PR, and advertising tracks',
      'Industry faculty from leading newsrooms and media agencies',
      'Portfolio project — produce real content across mediums',
      'Covers print, broadcast, digital, and social media journalism',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['Digital Journalism', 'Broadcast Media', 'Public Relations & Advertising', 'New Media & Social Media'],
    careerRoles: ['Journalist', 'Digital Content Strategist', 'PR Manager', 'Broadcast Producer', 'Media Planner', 'Communications Officer'],
    topHirers: ['Times Group', 'NDTV', 'Hindustan Times', 'Ogilvy', 'Weber Shandwick'],
  },

  {
    slug: 'msc',
    name: 'M.Sc',
    fullName: 'Master of Science in Mathematics',
    level: 'pg',
    discipline: 'Science',
    duration: '2 Years',
    semesters: 4,
    feePerYear: '₹36,000/yr',
    totalFee: '₹72,000',
    displayOrder: 9,
    popular: false,
    description: 'A 2-year online M.Sc in Mathematics from VGU for graduates who want to go deep into pure and applied mathematics — from abstract algebra to data modelling and operations research. Ideal preparation for UGC-NET, research, and quantitative roles in finance and tech.',
    eligibility: [
      "B.Sc in Mathematics or related field from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled M.Sc — valid for UGC-NET, GATE, and lecturership',
      'Pure mathematics, statistics, and applied mathematics tracks',
      'Research dissertation in Semester 4',
      'Aligned with UGC-NET Mathematics syllabus',
      'Prepares for quantitative analyst and data science roles',
      'AI-proctored exams — no campus visit required',
    ],
    specialisations: ['Pure Mathematics', 'Applied Mathematics & Statistics', 'Operations Research'],
    careerRoles: ['Mathematician', 'Data Analyst', 'Quantitative Analyst', 'Actuary', 'Lecturer', 'Statistician'],
    topHirers: ['Universities', 'RBI', 'ISRO', 'Insurance Companies', 'Financial Firms'],
  },
]

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  console.log(`Connecting to project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)

  for (const prog of PROGRAMS) {
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
      ...(prog.emi          ? { emi: prog.emi }                   : {}),
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
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${prog.name} — ${prog.fullName}`)
  }

  console.log(`\nDone. ${PROGRAMS.length} programs seeded.`)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
