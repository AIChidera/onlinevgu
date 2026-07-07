/**
 * One-time script to seed Sanity with the 11 programs confirmed by admin.
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
      'UGC-entitled degree - valid for government jobs, higher studies, and teaching roles',
      'Choose from English, Political Science, Sociology, Economics, and History specialisations',
      'Weekend live sessions - study without leaving your job',
      'Dissertation project in Year 3 under faculty supervision',
      'Directly prepares for UPSC, state PCS, and UGC-NET',
      'AI-proctored exams - no campus visit required',
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
    description: 'A 3-year online BBA from VGU that gives you a full management education - finance, marketing, HR, and operations - without putting your life on hold. Built for fresh graduates who want a business career and working students who need flexibility.',
    eligibility: [
      '10+2 from any recognised board (any stream)',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled BBA - valid for MBA admission at any Indian university',
      'Finance, Marketing, and HR specialisations',
      'Startup simulation in Year 2 - run a business, not just study one',
      'Industry mentor assigned at start of Year 2',
      'Weekend live sessions with recordings available within 48 hours',
      'AI-proctored exams - no campus visit required',
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
    description: 'A 3-year online BCA from VGU covering the full software development stack - from C and Python to React, cloud, and cybersecurity. Designed for students who want a tech career but cannot attend a full-time campus programme.',
    eligibility: [
      '10+2 from any recognised board',
      'Minimum 45% aggregate marks',
      'Mathematics at 10+2 level preferred but not mandatory',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled BCA - qualifies for MCA admission at any university',
      'Learn C, Python, Java, JavaScript, React, Node.js, SQL, and AWS',
      'Capstone project in Year 3 - build a real application for your portfolio',
      'Cloud and Cybersecurity specialisation tracks',
      'AI-proctored exams - no campus visit required',
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
    description: 'A 2-year online MA from VGU for graduates who want to go deeper into humanities and social sciences - or prepare for UGC-NET, civil services, or a teaching career. Research-led curriculum with a full dissertation in the final semester.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled MA - valid for UGC-NET, lecturership, and government roles',
      'Specialisations in English, Political Science, Sociology, Economics, and History',
      'Dissertation in Semester 4 under dedicated faculty supervision',
      'Directly aligned with UPSC and state civil services syllabi',
      'Weekend live sessions - ideal for working graduates',
      'AI-proctored exams - no campus visit required',
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
      'UGC-entitled MBA - same legal standing as any on-campus MBA',
      'Specialisations: Finance, Marketing, HR, Operations, Business Analytics',
      'Live sessions on weekends - recordings within 48 hours',
      '500+ hiring partners with dedicated placement support from Semester 1',
      'Annual hiring expo where companies interview students directly',
      'AI-proctored exams - no campus visit required',
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
    description: 'A specialised 2-year online MBA focused entirely on international finance - cross-border investments, forex markets, global banking, and financial risk management. Built for finance professionals and graduates who want a global edge in one of the highest-paying career tracks.',
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
      'AI-proctored exams - no campus visit required',
    ],
    specialisations: ['International Banking', 'Forex & Derivatives', 'Global Investment Management', 'Financial Risk'],
    careerRoles: ['Investment Analyst', 'Forex Trader', 'Risk Manager', 'International Finance Manager', 'Treasury Analyst'],
    avgSalaryAfter: '₹12-22 LPA',
    topHirers: ['HSBC', 'Standard Chartered', 'Citibank', 'JP Morgan', 'ICICI Bank', 'Kotak Mahindra'],
  },

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
    displayOrder: 8,
    popular: false,
    description: 'A 2-year online MCA from VGU covering advanced software engineering, cloud architecture, AI/ML, and data science. The natural next step after a BCA or B.Sc - and a direct route into senior tech roles at product companies and MNCs.',
    eligibility: [
      'BCA, B.Sc (IT/CS/Mathematics) or equivalent',
      'Any bachelor\'s degree with Mathematics at 10+2 level',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled MCA - valid for government and private sector tech roles',
      'Cloud (AWS), AI/ML, and Cybersecurity specialisation tracks',
      'Semester hackathons - several students hired directly at expo',
      'AWS Certified Solutions Architect prep included in cloud track',
      'Faculty with Microsoft, Google, and product company backgrounds',
      'AI-proctored exams - no campus visit required',
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
    displayOrder: 11,
    popular: false,
    description: 'A 2-year online MA in Journalism and Mass Communication from VGU for graduates who want to work in media, digital content, public relations, or broadcasting. Combines media theory with hands-on production skills for the modern newsroom.',
    eligibility: [
      "Bachelor's degree from a UGC-recognised university (any stream)",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled degree - recognised for journalism and media roles',
      'Digital journalism, broadcast, PR, and advertising tracks',
      'Industry faculty from leading newsrooms and media agencies',
      'Portfolio project - produce real content across mediums',
      'Covers print, broadcast, digital, and social media journalism',
      'AI-proctored exams - no campus visit required',
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
    description: 'A 2-year online M.Sc in Mathematics from VGU for graduates who want to go deep into pure and applied mathematics - from abstract algebra to data modelling and operations research. Ideal preparation for UGC-NET, research, and quantitative roles in finance and tech.',
    eligibility: [
      "B.Sc in Mathematics or related field from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'UGC-entitled M.Sc - valid for UGC-NET, GATE, and lecturership',
      'Pure mathematics, statistics, and applied mathematics tracks',
      'Research dissertation in Semester 4',
      'Aligned with UGC-NET Mathematics syllabus',
      'Prepares for quantitative analyst and data science roles',
      'AI-proctored exams - no campus visit required',
    ],
    specialisations: ['Pure Mathematics', 'Applied Mathematics & Statistics', 'Operations Research'],
    careerRoles: ['Mathematician', 'Data Analyst', 'Quantitative Analyst', 'Actuary', 'Lecturer', 'Statistician'],
    topHirers: ['Universities', 'RBI', 'ISRO', 'Insurance Companies', 'Financial Firms'],
  },
]

// ─── Curriculum data (official PDF - credits + Core/Elective) ────────────────

interface CourseItem { name: string; credits: number; type: 'Core' | 'Elective' }
interface SemData    { label: string; totalCredits: number; courses: CourseItem[] }
interface YearData   { year: string; semesters: SemData[] }

const CURRICULUM_DATA: Record<string, YearData[]> = {

  'ba': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'English-I', credits: 6, type: 'Core' },
        { name: 'Microsoft Office Practices', credits: 4, type: 'Core' },
        { name: 'Elective I - Subject 1', credits: 4, type: 'Elective' },
        { name: 'Elective II - Subject 2', credits: 4, type: 'Elective' },
        { name: 'Elective III - Subject 3', credits: 4, type: 'Elective' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'English-II', credits: 6, type: 'Core' },
        { name: 'Visual Design Tool', credits: 4, type: 'Core' },
        { name: 'Elective I', credits: 4, type: 'Elective' },
        { name: 'Elective II', credits: 4, type: 'Elective' },
        { name: 'Elective III', credits: 4, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 22, courses: [
        { name: 'Communication Skills', credits: 6, type: 'Core' },
        { name: 'Entrepreneurship Development', credits: 4, type: 'Core' },
        { name: 'Elective I', credits: 4, type: 'Elective' },
        { name: 'Elective II', credits: 4, type: 'Elective' },
        { name: 'Elective III', credits: 4, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 21, courses: [
        { name: 'Foundation of Mathematics', credits: 6, type: 'Core' },
        { name: 'Universal Human Values', credits: 3, type: 'Core' },
        { name: 'Elective I', credits: 4, type: 'Elective' },
        { name: 'Elective II', credits: 4, type: 'Elective' },
        { name: 'Elective III', credits: 4, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 3', semesters: [
      { label: 'Semester 5', totalCredits: 20, courses: [
        { name: 'Elementary of Computer Applications', credits: 6, type: 'Core' },
        { name: 'Computer Applications Lab', credits: 2, type: 'Core' },
        { name: 'Elective I', credits: 4, type: 'Elective' },
        { name: 'Elective II', credits: 4, type: 'Elective' },
        { name: 'Elective III', credits: 4, type: 'Elective' },
      ]},
      { label: 'Semester 6', totalCredits: 22, courses: [
        { name: 'Environmental Science', credits: 6, type: 'Core' },
        { name: 'Indian Knowledge System', credits: 4, type: 'Core' },
        { name: 'Elective I', credits: 4, type: 'Elective' },
        { name: 'Elective II', credits: 4, type: 'Elective' },
        { name: 'Elective III', credits: 4, type: 'Elective' },
      ]},
    ]},
  ],

  'bba': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 21, courses: [
        { name: 'Fundamentals of Management', credits: 3, type: 'Core' },
        { name: 'Business Accounting', credits: 4, type: 'Core' },
        { name: 'Business Law', credits: 3, type: 'Core' },
        { name: 'Entrepreneurship Development', credits: 3, type: 'Core' },
        { name: 'Business Communication', credits: 3, type: 'Core' },
        { name: 'Environmental Science', credits: 3, type: 'Core' },
        { name: 'Elective 1', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'Managerial Economics', credits: 3, type: 'Core' },
        { name: 'Statistics for Business Decision', credits: 4, type: 'Core' },
        { name: 'Organizational Behavior', credits: 3, type: 'Core' },
        { name: 'Human Resource Management', credits: 3, type: 'Core' },
        { name: 'Principles of Marketing', credits: 3, type: 'Core' },
        { name: 'Business Analytics', credits: 4, type: 'Core' },
        { name: 'Elective 2', credits: 2, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 19, courses: [
        { name: 'Macroeconomics for Managers', credits: 3, type: 'Core' },
        { name: 'Business Environment', credits: 3, type: 'Core' },
        { name: 'System Analysis and Design', credits: 3, type: 'Core' },
        { name: 'Business Ethics and CSR', credits: 3, type: 'Core' },
        { name: 'Business Policy and Strategic Management', credits: 3, type: 'Core' },
        { name: 'Elective 3', credits: 2, type: 'Elective' },
        { name: 'Elective 4', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 21, courses: [
        { name: 'Business Research Methods', credits: 4, type: 'Core' },
        { name: 'Operations Research', credits: 4, type: 'Core' },
        { name: 'E-Commerce', credits: 3, type: 'Core' },
        { name: 'Cyber Crimes and Law', credits: 3, type: 'Core' },
        { name: 'International Business', credits: 3, type: 'Core' },
        { name: 'Elective 5', credits: 2, type: 'Elective' },
        { name: 'Elective 6', credits: 2, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 3', semesters: [
      { label: 'Semester 5', totalCredits: 22, courses: [
        { name: 'Quantitative Techniques', credits: 4, type: 'Core' },
        { name: 'Production and Operation Management', credits: 4, type: 'Core' },
        { name: 'Enterprise Resource Planning', credits: 3, type: 'Core' },
        { name: 'Total Quality Management', credits: 3, type: 'Core' },
        { name: 'Project Management', credits: 4, type: 'Core' },
        { name: 'Elective 7', credits: 2, type: 'Elective' },
        { name: 'Elective 8', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 6', totalCredits: 19, courses: [
        { name: 'Research Project', credits: 8, type: 'Core' },
        { name: 'Corporate Tax Management', credits: 4, type: 'Core' },
        { name: 'Corporate Readiness', credits: 3, type: 'Core' },
        { name: 'Elective 9', credits: 2, type: 'Elective' },
        { name: 'Elective 10', credits: 2, type: 'Elective' },
      ]},
    ]},
  ],

  'bca': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'Basic Mathematics', credits: 4, type: 'Core' },
        { name: 'Fundamental of C', credits: 2, type: 'Core' },
        { name: 'Basic Electronics', credits: 4, type: 'Core' },
        { name: 'Principle of Programming Languages', credits: 4, type: 'Core' },
        { name: 'Fundamentals of C Lab', credits: 4, type: 'Core' },
        { name: 'PC Software and Automation', credits: 2, type: 'Core' },
        { name: 'Elective 1', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 2', totalCredits: 20, courses: [
        { name: 'Object Oriented Programming with C++', credits: 4, type: 'Core' },
        { name: 'Data Structures and Algorithms', credits: 4, type: 'Core' },
        { name: 'Management Information System', credits: 4, type: 'Core' },
        { name: 'OOP with C++ Lab', credits: 2, type: 'Core' },
        { name: 'Data Structures Lab', credits: 2, type: 'Core' },
        { name: 'Soft Skill and Professional Aptitude', credits: 2, type: 'Core' },
        { name: 'Elective 2', credits: 2, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 20, courses: [
        { name: 'Database Management Systems', credits: 4, type: 'Core' },
        { name: 'Computer Networks', credits: 4, type: 'Core' },
        { name: 'Internet and Web Application', credits: 4, type: 'Core' },
        { name: 'DBMS Lab', credits: 2, type: 'Core' },
        { name: 'Internet & Web Programming Lab', credits: 2, type: 'Core' },
        { name: 'Elective 3', credits: 2, type: 'Elective' },
        { name: 'Elective 4', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 20, courses: [
        { name: 'Programming in Java', credits: 4, type: 'Core' },
        { name: 'Operating Systems', credits: 4, type: 'Core' },
        { name: 'Computer Graphics and Visualization', credits: 4, type: 'Core' },
        { name: 'Computer Graphics Lab', credits: 2, type: 'Core' },
        { name: 'Programming in Java Lab', credits: 2, type: 'Core' },
        { name: 'Elective 5', credits: 2, type: 'Elective' },
        { name: 'Elective 6', credits: 2, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 3', semesters: [
      { label: 'Semester 5', totalCredits: 20, courses: [
        { name: 'Software Engineering', credits: 4, type: 'Core' },
        { name: 'Software Engineering Lab', credits: 2, type: 'Core' },
        { name: 'Python Programming', credits: 4, type: 'Core' },
        { name: 'Python Lab', credits: 2, type: 'Core' },
        { name: 'Project Formulation and Appraisal', credits: 4, type: 'Core' },
        { name: 'Elective 7', credits: 2, type: 'Elective' },
        { name: 'Elective 8', credits: 2, type: 'Elective' },
      ]},
      { label: 'Semester 6', totalCredits: 22, courses: [
        { name: 'Major Project', credits: 8, type: 'Core' },
        { name: 'Indian Knowledge System', credits: 4, type: 'Core' },
        { name: 'Universal Human Values', credits: 4, type: 'Core' },
        { name: 'Automation Concepts and Techniques', credits: 2, type: 'Core' },
        { name: 'Elective 9', credits: 2, type: 'Elective' },
        { name: 'Elective 10', credits: 2, type: 'Elective' },
      ]},
    ]},
  ],

  'ma': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'Language & Communication Skills I', credits: 4, type: 'Core' },
        { name: 'Chaucer and Sixteenth Century Literature', credits: 4, type: 'Core' },
        { name: 'Eighteenth and Nineteenth Century Literature', credits: 4, type: 'Core' },
        { name: 'Nineteenth Century Literature I', credits: 3, type: 'Core' },
        { name: 'American Literature I', credits: 4, type: 'Core' },
        { name: 'Language & Linguistics I', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'Language & Communication Skills II', credits: 4, type: 'Core' },
        { name: 'Seventeenth Century Literature', credits: 4, type: 'Core' },
        { name: 'Eighteenth Century Literature II', credits: 4, type: 'Core' },
        { name: 'Nineteenth Century Literature II', credits: 3, type: 'Core' },
        { name: 'American Literature II', credits: 4, type: 'Core' },
        { name: 'Language & Linguistics II', credits: 3, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 22, courses: [
        { name: 'Literary Criticism and Theory I', credits: 4, type: 'Core' },
        { name: 'Twentieth Century Literature I', credits: 4, type: 'Core' },
        { name: 'Indian Writing in English I', credits: 4, type: 'Core' },
        { name: 'Nineteenth Century Literature III', credits: 3, type: 'Core' },
        { name: 'American Literature III', credits: 4, type: 'Core' },
        { name: 'Language & Linguistics III', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 4', totalCredits: 20, courses: [
        { name: 'Literary Theory and Criticism II', credits: 4, type: 'Core' },
        { name: 'Twentieth Century Literature II', credits: 4, type: 'Core' },
        { name: 'Indian Writing in English II', credits: 4, type: 'Core' },
        { name: 'Dissertation', credits: 8, type: 'Core' },
      ]},
    ]},
  ],

  'mba': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 24, courses: [
        { name: 'Managerial Economics', credits: 4, type: 'Core' },
        { name: 'Quantitative Methods for Management', credits: 4, type: 'Core' },
        { name: 'Accounting for Managers', credits: 4, type: 'Core' },
        { name: 'Legal Aspects of Business', credits: 4, type: 'Core' },
        { name: 'Management Concepts and Organizational Behaviour', credits: 3, type: 'Core' },
        { name: 'Business Environment', credits: 3, type: 'Core' },
        { name: 'Business Communication', credits: 2, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 25, courses: [
        { name: 'Human Resource Management', credits: 3, type: 'Core' },
        { name: 'Financial Management', credits: 4, type: 'Core' },
        { name: 'Marketing Management', credits: 3, type: 'Core' },
        { name: 'Research Methodology', credits: 4, type: 'Core' },
        { name: 'Management Information System', credits: 3, type: 'Core' },
        { name: 'International Business Management', credits: 3, type: 'Core' },
        { name: 'Total Quality Management', credits: 3, type: 'Core' },
        { name: 'Digital Marketing', credits: 2, type: 'Core' },
        { name: 'Innovation & Design Thinking', credits: 2, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 23, courses: [
        { name: 'Project Management', credits: 3, type: 'Core' },
        { name: 'Supply Chain Management', credits: 3, type: 'Core' },
        { name: 'Strategic Management', credits: 3, type: 'Core' },
        { name: 'Entrepreneurship & Innovation Management', credits: 2, type: 'Core' },
        { name: 'Elective 1', credits: 3, type: 'Elective' },
        { name: 'Elective 2', credits: 3, type: 'Elective' },
        { name: 'Elective 3', credits: 3, type: 'Elective' },
        { name: 'Elective 4', credits: 3, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 20, courses: [
        { name: 'Research Project', credits: 8, type: 'Core' },
        { name: 'Corporate Readiness', credits: 3, type: 'Core' },
        { name: 'Indian Knowledge System', credits: 3, type: 'Core' },
        { name: 'Elective 5', credits: 3, type: 'Elective' },
        { name: 'Elective 6', credits: 3, type: 'Elective' },
      ]},
    ]},
  ],

  'mba-if': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 23, courses: [
        { name: 'Managerial Economics', credits: 3, type: 'Core' },
        { name: 'Managerial Practices and Organizational Behaviour', credits: 3, type: 'Core' },
        { name: 'Business & Technology', credits: 3, type: 'Core' },
        { name: 'Marketing Management', credits: 3, type: 'Core' },
        { name: 'Financial Accounting', credits: 4, type: 'Core' },
        { name: 'Strategic Management Accounting', credits: 4, type: 'Core' },
        { name: 'Operations and Production Management', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'Introduction to Research Method', credits: 3, type: 'Core' },
        { name: 'Corporate and Business Law', credits: 4, type: 'Core' },
        { name: 'Corporate Management - I', credits: 3, type: 'Core' },
        { name: 'Elective 1 (ACCA/CMA/FM Track)', credits: 4, type: 'Elective' },
        { name: 'Elective 2', credits: 4, type: 'Elective' },
        { name: 'Elective 3', credits: 4, type: 'Elective' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 23, courses: [
        { name: 'Financial Management for Managers', credits: 4, type: 'Core' },
        { name: 'Corporate Management - II', credits: 4, type: 'Core' },
        { name: 'Human Resource Management', credits: 3, type: 'Core' },
        { name: 'Elective 4', credits: 4, type: 'Elective' },
        { name: 'Elective 5', credits: 4, type: 'Elective' },
        { name: 'Elective 6', credits: 4, type: 'Elective' },
      ]},
      { label: 'Semester 4', totalCredits: 24, courses: [
        { name: 'AI for Finance', credits: 4, type: 'Core' },
        { name: 'Taxation', credits: 4, type: 'Core' },
        { name: 'Corporate Management - III', credits: 4, type: 'Core' },
        { name: 'Elective 7', credits: 4, type: 'Elective' },
        { name: 'Elective 8', credits: 4, type: 'Elective' },
        { name: 'Elective 9', credits: 4, type: 'Elective' },
      ]},
    ]},
  ],

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

  'mca': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 23, courses: [
        { name: 'Mathematical Foundation for Computer Application', credits: 3, type: 'Core' },
        { name: 'Fundamental of Computer and Programming in C Lab', credits: 4, type: 'Core' },
        { name: 'Operating Systems', credits: 4, type: 'Core' },
        { name: 'Database Management System', credits: 4, type: 'Core' },
        { name: 'Software Engineering and Project Management', credits: 3, type: 'Core' },
        { name: 'Virtualization & Cloud Technology', credits: 3, type: 'Core' },
        { name: 'Web Technology Lab', credits: 2, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 23, courses: [
        { name: 'Object Oriented Programming using Java', credits: 4, type: 'Core' },
        { name: 'Data Structures and Algorithms Using C', credits: 4, type: 'Core' },
        { name: 'Machine Learning with Python', credits: 4, type: 'Core' },
        { name: 'Computer Networks', credits: 4, type: 'Core' },
        { name: 'Introduction to Data Science', credits: 3, type: 'Core' },
        { name: 'Linux and Shell Programming', credits: 4, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 25, courses: [
        { name: 'Deep Learning', credits: 4, type: 'Core' },
        { name: 'Natural Language Processing', credits: 4, type: 'Core' },
        { name: 'Artificial Intelligence & Intelligent Agents', credits: 3, type: 'Core' },
        { name: 'Big Data Analytics', credits: 4, type: 'Core' },
        { name: 'Internet of Things', credits: 4, type: 'Core' },
        { name: 'Cloud Security', credits: 3, type: 'Core' },
        { name: 'Cryptography', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 4', totalCredits: 21, courses: [
        { name: 'Cloud Operations', credits: 4, type: 'Core' },
        { name: 'Ethical Hacking', credits: 3, type: 'Core' },
        { name: 'Blockchain', credits: 3, type: 'Core' },
        { name: 'Business Intelligence', credits: 3, type: 'Core' },
        { name: 'Project', credits: 8, type: 'Core' },
      ]},
    ]},
  ],

  'majmc': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'Communication Theory', credits: 4, type: 'Core' },
        { name: 'Journalism: Concepts & Principles', credits: 4, type: 'Core' },
        { name: 'Print Media: Production Tools & Techniques', credits: 4, type: 'Core' },
        { name: 'Media Laws & Ethics', credits: 4, type: 'Core' },
        { name: 'Media Management', credits: 4, type: 'Core' },
        { name: 'Writing For Media', credits: 2, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 19, courses: [
        { name: 'Radio: Concepts & Principles', credits: 4, type: 'Core' },
        { name: 'Advertising: Concepts & Principles', credits: 4, type: 'Core' },
        { name: 'New Media', credits: 3, type: 'Core' },
        { name: 'Media & Communication Research', credits: 3, type: 'Core' },
        { name: 'TV & Film Appreciation', credits: 3, type: 'Core' },
        { name: 'Business Journalism', credits: 2, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 22, courses: [
        { name: 'Photography', credits: 4, type: 'Core' },
        { name: 'Video Production Techniques & Programme Formats', credits: 4, type: 'Core' },
        { name: 'Global Media', credits: 4, type: 'Core' },
        { name: 'Development Communication', credits: 4, type: 'Core' },
        { name: 'Public Relations & Corporate Communication', credits: 3, type: 'Core' },
        { name: 'Multimedia Journalism', credits: 3, type: 'Core' },
      ]},
      { label: 'Semester 4', totalCredits: 24, courses: [
        { name: 'Digital Journalism', credits: 4, type: 'Core' },
        { name: 'Media and Society', credits: 3, type: 'Core' },
        { name: 'Research Project', credits: 8, type: 'Core' },
        { name: 'Rural Journalism', credits: 3, type: 'Core' },
        { name: 'Environment Journalism', credits: 3, type: 'Core' },
        { name: 'Marketing Management', credits: 3, type: 'Core' },
      ]},
    ]},
  ],

  'msc': [
    { year: 'Year 1', semesters: [
      { label: 'Semester 1', totalCredits: 22, courses: [
        { name: 'Advanced Abstract Algebra', credits: 4, type: 'Core' },
        { name: 'Topology', credits: 4, type: 'Core' },
        { name: 'Integral Transforms', credits: 4, type: 'Core' },
        { name: 'Special Functions', credits: 4, type: 'Core' },
        { name: 'MAT-LAB', credits: 2, type: 'Core' },
        { name: 'Object Oriented Programming with C++ Theory & Lab', credits: 4, type: 'Core' },
      ]},
      { label: 'Semester 2', totalCredits: 22, courses: [
        { name: 'Mathematical Programming', credits: 4, type: 'Core' },
        { name: 'Advanced Numerical Analysis', credits: 4, type: 'Core' },
        { name: 'Integral Equations and Calculus of Variations', credits: 4, type: 'Core' },
        { name: 'Discrete Mathematical Structures', credits: 4, type: 'Core' },
        { name: 'Numerical Analysis Lab', credits: 2, type: 'Core' },
        { name: 'Computer System Organization', credits: 4, type: 'Core' },
      ]},
    ]},
    { year: 'Year 2', semesters: [
      { label: 'Semester 3', totalCredits: 22, courses: [
        { name: 'Advanced Linear Algebra', credits: 4, type: 'Core' },
        { name: 'Advanced Differential Equations', credits: 4, type: 'Core' },
        { name: 'Tensor Analysis', credits: 4, type: 'Core' },
        { name: 'Fluid Mechanics', credits: 4, type: 'Core' },
        { name: 'Mathematics in Multimedia', credits: 4, type: 'Core' },
        { name: 'Mathematical Programming Lab', credits: 2, type: 'Core' },
      ]},
      { label: 'Semester 4', totalCredits: 22, courses: [
        { name: 'Project', credits: 8, type: 'Core' },
        { name: 'Artificial Intelligence', credits: 2, type: 'Core' },
        { name: 'Mathematical Statistics', credits: 4, type: 'Core' },
        { name: 'Operation Research', credits: 4, type: 'Core' },
        { name: 'Partial Differential Equations', credits: 4, type: 'Core' },
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
      ...(CURRICULUM_DATA[prog.slug] ? { curriculum: toCurriculumDoc(CURRICULUM_DATA[prog.slug]!) } : {}),
    }

    await client.createOrReplace(doc)
    console.log(`  ✓ ${prog.name} - ${prog.fullName}`)
  }

  console.log(`\nDone. ${PROGRAMS.length} programs seeded.`)
}

seed().catch(err => {
  console.error(err)
  process.exit(1)
})
