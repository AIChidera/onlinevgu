import type { Metadata } from 'next'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAllPrograms,
  getProgramBySlug,
  getProgramFaqs,
  getTestimonialsByProgram,
  getSiteConfig,
} from '@/lib/sanity'
import {
  IconChevronRight,
  IconClock,
  IconDownload,
  IconShieldCheck,
  IconArrowRight,
  IconHeadset,
} from '@tabler/icons-react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import BrandIcon from '@/components/ui/BrandIcon'
import type { CurriculumYear } from './CurriculumPreview'
import KeyOutcomes from './KeyOutcomes'
import CurriculumPreview from './CurriculumPreview'
import HirerStrip from './HirerStrip'
import SpecialisationCards from './SpecialisationCards'
import CareerOutcomes from './CareerOutcomes'
import CareerServices from './CareerServices'

import LearningExperience from './LearningExperience'
import FeesScholarships from './FeesScholarships'
import FacultySection from './FacultySection'
import MobileStickyCTA from './MobileStickyCTA'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import {
  PROGRAM_EXTRAS,
  LIVE_SCHEDULE,
  SAMPLE_WEEK,
  LMS_PLATFORM,
  MENTOR_CADENCE,
  COHORT_SIZE,
  REQUIRED_DOCUMENTS,
  SCHOLARSHIP_TIERS,
  CAREER_SERVICES,
} from './programExtras'

// Below-fold client components - lazy loaded to reduce initial JS bundle
const PlacementStatsStrip = dynamic(() => import('./PlacementStatsStrip'), { ssr: false })
const AdmissionSteps      = dynamic(() => import('./AdmissionSteps'),      { ssr: false })
const CertificatePreview  = dynamic(() => import('./CertificatePreview'),  { ssr: false })
const ProgramTestimonials = dynamic(() => import('./ProgramTestimonials'), { ssr: false })
const ProgramFAQ          = dynamic(() => import('./ProgramFAQ'),          { ssr: false })
const RelatedPrograms     = dynamic(() => import('./RelatedPrograms'),     { ssr: false })

interface ProgramDetail {
  slug:            string
  name:            string
  fullName:        string
  level:           'ug' | 'pg'
  duration:        string
  semesters:       number
  feePerYear:      string
  totalFee:        string
  emi?:            string
  nextBatch:       string
  popular?:        boolean
  description:     string
  eligibility:     string[]
  highlights:      string[]
  specialisations: string[]
  careerRoles:     string[]
  avgSalaryAfter?: string
  topHirers?:      string[]
  curriculum?:     CurriculumYear[]
  heroImage?:      string  // e.g. '/images/programs/mba-hero.jpg'
}

// Placeholder hero images per program - replace with real assets when ready.
// Programs without an entry fall back to DEFAULT_HERO_IMAGE.
const HERO_IMAGES: Record<string, string> = {
  'mba':      'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80&auto=format&fit=crop',
  'mba-if':   'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop',
  'mba-dfaa': 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1400&q=80&auto=format&fit=crop',
  'bca':      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80&auto=format&fit=crop',
  'mca':      'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=80&auto=format&fit=crop',
  'bba':      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80&auto=format&fit=crop',
  'bba-aaft': 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1400&q=80&auto=format&fit=crop',
  'ba':       'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80&auto=format&fit=crop',
  'ma':       'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80&auto=format&fit=crop',
  'msc':      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80&auto=format&fit=crop',
  'majmc':    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80&auto=format&fit=crop',
}
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80&auto=format&fit=crop'

const PROGRAMS: ProgramDetail[] = [
  {
    slug: 'mba', name: 'MBA', fullName: 'Master of Business Administration',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹75,000/yr', totalFee: '₹1,50,000', emi: '₹6,250/month',
    nextBatch: 'July 2026', popular: true,
    description: "VGU's flagship MBA for working professionals. Live weekend classes, 9 specialisations, and real-world case studies.",
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Open to all streams and professional backgrounds',
    ],
    highlights: [
      'Live weekend classes - attend from anywhere in India',
      '9 specialisations: Human Resource Management, Finance Management, Marketing, Digital Marketing, Agri Business, IT Management, International Business Management, Operations Management, Healthcare Management',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Dedicated placement cell with 500+ hiring partners',
      'AI-proctored exams - appear from home, no exam centre needed',
      'Merit scholarships up to 50% available',
      'UGC-entitled degree - identical to an on-campus MBA certificate',
    ],
    specialisations: ['Human Resource Management', 'Finance Management', 'Marketing', 'Digital Marketing', 'Agri Business', 'IT Management', 'International Business Management', 'Operations Management', 'Healthcare Management'],
    careerRoles: ['Business Manager', 'Finance Director', 'Marketing Manager', 'HR Manager', 'Operations Manager', 'Healthcare Administrator', 'IT Manager', 'International Business Manager'],
    avgSalaryAfter: '₹10-18 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Accenture', 'Amazon', 'HDFC Bank', 'ICICI Bank', 'Reliance Industries', 'Tata Group', 'Hindustan Unilever'],
    curriculum: [
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
        { label: 'Semester 2', totalCredits: 27, courses: [
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
          { name: 'Marketing Elective', credits: 3, type: 'Elective' },
          { name: 'Finance Management Elective', credits: 3, type: 'Elective' },
          { name: 'Human Resource Management Elective', credits: 3, type: 'Elective' },
          { name: 'Operations Management Elective', credits: 3, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 20, courses: [
          { name: 'Research Project', credits: 8, type: 'Core' },
          { name: 'Corporate Readiness', credits: 3, type: 'Core' },
          { name: 'Indian Knowledge System', credits: 3, type: 'Core' },
          { name: 'Healthcare Management Elective', credits: 3, type: 'Elective' },
          { name: 'IT Management Elective', credits: 3, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'mca', name: 'MCA', fullName: 'Master of Computer Applications',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹75,000/yr', totalFee: '₹1,50,000', emi: '₹6,250/month',
    nextBatch: 'July 2026',
    description: 'An industry-aligned MCA covering programming, machine learning, cloud, AI, and cybersecurity with hackathons and cert prep.',
    eligibility: [
      "BCA, B.Sc (IT/CS/Mathematics), or any bachelor's with Mathematics at 10+2",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Industry-aligned curriculum: C, Java, Python, Machine Learning, Cloud, IoT, Blockchain',
      '3 specialisations: Artificial Intelligence & Data Science, Cloud Technology & Cyber Security, Cyber Crime & Forensic Science',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Hackathons and semester projects with industry judges',
      'Cloud and cybersecurity certification prep tracks',
      'Dedicated tech placement cell',
    ],
    specialisations: ['Artificial Intelligence & Data Science', 'Cloud Technology & Cyber Security', 'Cyber Crime & Forensic Science'],
    careerRoles: ['Software Developer', 'Data Scientist', 'Machine Learning Engineer', 'Cybersecurity Analyst', 'DevOps Engineer', 'Web Developer', 'Blockchain Developer', 'Database Administrator'],
    avgSalaryAfter: '₹6-14 LPA',
    topHirers: ['TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'Google', 'Microsoft', 'Cognizant', 'Capgemini', 'Flipkart', 'LTIMindtree', 'Oracle'],
    curriculum: [
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
          { name: 'Linux and Shell Programming', credits: 4, type: 'Core' },
          { name: 'Introduction to Data Science (Artificial Intelligence & Data Science)', credits: 3, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 25, courses: [
          { name: 'Artificial Intelligence & Intelligent Agents', credits: 3, type: 'Core' },
          { name: 'Big Data Analytics', credits: 4, type: 'Core' },
          { name: 'Internet of Things', credits: 4, type: 'Core' },
          { name: 'Cloud Security', credits: 3, type: 'Core' },
          { name: 'Cryptography', credits: 3, type: 'Core' },
          { name: 'Deep Learning (Artificial Intelligence & Data Science)', credits: 4, type: 'Elective' },
          { name: 'Natural Language Processing (Artificial Intelligence & Data Science)', credits: 4, type: 'Elective' },
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
  },
  {
    slug: 'mba-if', name: 'MBA-IF', fullName: 'MBA in International Finance',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹1,20,000/yr', totalFee: '₹2,40,000', emi: '₹10,000/month',
    nextBatch: 'July 2026',
    description: 'A 2-year MBA in international finance with integrated ACCA, CMA, and FM certification tracks. Built for a global edge.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'Background in Commerce or Finance preferred but not mandatory',
      'No entrance exam required',
    ],
    highlights: [
      'Integrated ACCA, CMA & FM professional certification tracks',
      'Save 60% vs standalone ACCA/CMA certification costs',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Faculty with CFA and international banking experience',
      'AI for Finance module in the final semester',
      'UGC-entitled MBA with international finance specialisation',
    ],
    specialisations: ['CMA Track', 'ACCA Track', 'FM Track'],
    careerRoles: ['CFO', 'Finance Director', 'Investment Analyst', 'Portfolio Manager', 'Financial Analyst', 'Risk Manager', 'Treasury Analyst', 'Forex Trader'],
    avgSalaryAfter: '₹12-22 LPA',
    topHirers: ['HSBC', 'Standard Chartered', 'Citibank', 'JP Morgan', 'ICICI Bank', 'Kotak Mahindra', 'Deloitte', 'KPMG', 'EY', 'PwC'],
    curriculum: [
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
          { name: 'Audit & Assurance (ACCA)', credits: 4, type: 'Elective' },
          { name: 'Internal Control (CMA)', credits: 4, type: 'Elective' },
          { name: 'SEBI Investor Certification (FM)', credits: 4, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 23, courses: [
          { name: 'Financial Management for Managers', credits: 4, type: 'Core' },
          { name: 'Corporate Management - II', credits: 4, type: 'Core' },
          { name: 'Human Resource Management', credits: 3, type: 'Core' },
          { name: 'Costing (ACCA)', credits: 4, type: 'Elective' },
          { name: 'Cost Accounting (CMA)', credits: 4, type: 'Elective' },
          { name: 'Mutual Funds (FM)', credits: 4, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 24, courses: [
          { name: 'AI for Finance', credits: 4, type: 'Core' },
          { name: 'Taxation', credits: 4, type: 'Core' },
          { name: 'Corporate Management - III', credits: 4, type: 'Core' },
          { name: 'Financial Reporting (ACCA)', credits: 4, type: 'Elective' },
          { name: 'Performance Analysis (CMA)', credits: 4, type: 'Elective' },
          { name: 'Equity Derivatives (FM)', credits: 4, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'mba-dfaa', name: 'MBA-DFAA', fullName: 'MBA in Digital Finance and Accounting Analytics',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹1,00,000/yr', totalFee: '₹2,00,000', emi: '₹8,333/month',
    nextBatch: 'July 2026',
    description: 'An MBA built around the tools modern finance teams actually run on - SAP FICO, TallyPrime, Zoho Books, Power BI, and AI-for-finance - with a 1-year paid internship at a CA firm or industry desk.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'Background in Commerce, Finance, or IT preferred but not mandatory',
      'No entrance exam required',
    ],
    highlights: [
      '1-year paid internship integrated into the curriculum with CA firms and industry',
      'Hands-on with 15+ real tools: SAP FICO, SAP S/4HANA, TallyPrime, Zoho Books, QuickBooks, Xero, Power BI, and AI platforms',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Certifications earned: ICA course completion, SAP FICO/HANA end-user, Zoho Books',
      '360-degree career support across India, USA, UK, and Australia',
      'UGC-entitled MBA with a digital finance and accounting analytics focus',
    ],
    specialisations: ['Digital Finance', 'Accounting Analytics', 'FinTech Operations'],
    careerRoles: ['Finance Analyst', 'FP&A Analyst', 'Accounting Analytics Lead', 'FinTech Product Analyst', 'Audit Analytics Manager', 'Digital Finance Manager', 'Controller', 'Risk & Compliance Analyst'],
    avgSalaryAfter: '₹10-18 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Razorpay', 'PayU', 'Zoho', 'Infosys BPM', 'Genpact', 'WNS'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', totalCredits: 24, courses: [
          { name: 'Managerial Concepts and Organizational Behaviour', credits: 4, type: 'Core' },
          { name: 'Business Environment', credits: 3, type: 'Core' },
          { name: 'Marketing Management', credits: 3, type: 'Core' },
          { name: 'Legal Aspects of Business', credits: 3, type: 'Core' },
          { name: 'Accounting for Managers (IND AS)', credits: 4, type: 'Core' },
          { name: 'Business Communication', credits: 3, type: 'Core' },
          { name: 'Business Analytics I', credits: 4, type: 'Core' },
        ]},
        { label: 'Semester 2', totalCredits: 25, courses: [
          { name: 'Financial Management', credits: 4, type: 'Core' },
          { name: 'Marketing Management II', credits: 3, type: 'Core' },
          { name: 'Human Resource Management', credits: 3, type: 'Core' },
          { name: 'International Business Management', credits: 3, type: 'Core' },
          { name: 'Digital Accounting: Tally', credits: 4, type: 'Core' },
          { name: 'Direct Tax with Simulation', credits: 4, type: 'Core' },
          { name: 'GST with Simulation', credits: 4, type: 'Core' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 23, courses: [
          { name: 'Project Management', credits: 3, type: 'Core' },
          { name: 'Entrepreneurship and Innovation & Design', credits: 3, type: 'Core' },
          { name: 'Research Methodology', credits: 3, type: 'Core' },
          { name: 'Internship - I', credits: 4, type: 'Core' },
          { name: 'Digital Accounting: ZOHO Books', credits: 2, type: 'Core' },
          { name: 'Business Analytics II', credits: 3, type: 'Core' },
          { name: 'SAP-FICO', credits: 3, type: 'Core' },
          { name: 'Generally Accepted Accounting Principles (US GAAP)', credits: 2, type: 'Core' },
        ]},
        { label: 'Semester 4', totalCredits: 20, courses: [
          { name: 'Internship - II', credits: 6, type: 'Core' },
          { name: 'AI for Finance', credits: 4, type: 'Core' },
          { name: 'Costing & Auditing', credits: 4, type: 'Core' },
          { name: 'QuickBooks', credits: 3, type: 'Core' },
          { name: 'Xero', credits: 3, type: 'Core' },
        ]},
      ]},
    ],
  },
  {
    slug: 'bba-aaft', name: 'BBA-AAFT', fullName: 'BBA in Accounting Analytics & Financial Technology',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹44,000/yr', totalFee: '₹1,32,000', emi: '₹3,667/month',
    nextBatch: 'July 2026',
    description: 'A BBA built for the accounting and fintech stack employers actually use - Tally, GST, Advanced Excel, Power BI, and AI-for-finance tools, with a paid internship at a CA firm.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream - Science, Commerce, or Arts',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '1-year paid internship integrated into the curriculum with leading CA firms',
      'Hands-on with 12+ real tools: TallyPrime, Zoho Books, Advanced Excel, Power BI, GST, TDS, ITR filing, and AI platforms',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      '4 industry certifications earned during the program, including Cambridge English',
      'A new applied elective every semester - Tally to GST to Excel to Power BI',
      'UGC-entitled BBA - valid for MBA admission at any Indian university',
    ],
    specialisations: ['Digital Accounting', 'Taxation & Analytics', 'Financial Technology', 'Analytics & Auditing'],
    careerRoles: ['Accounts Executive', 'Junior Accountant', 'AP/AR Executive', 'Senior Accountant', 'Financial Analyst', 'Tax Associate', 'MIS Analyst', 'Forensic Accountant'],
    avgSalaryAfter: '₹4-9 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'TCS', 'Infosys', 'Genpact', 'WNS', 'Reliance Industries'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', totalCredits: 21, courses: [
          { name: 'Fundamentals of Management', credits: 3, type: 'Core' },
          { name: 'Business Accounting', credits: 4, type: 'Core' },
          { name: 'Business Law', credits: 3, type: 'Core' },
          { name: 'Business Economics', credits: 3, type: 'Core' },
          { name: 'Business Statistics', credits: 3, type: 'Core' },
          { name: 'Business Communication', credits: 3, type: 'Core' },
          { name: 'Digital Accounting: Tally', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 2', totalCredits: 22, courses: [
          { name: 'Human Resource Management', credits: 3, type: 'Core' },
          { name: 'Marketing Management', credits: 3, type: 'Core' },
          { name: 'Financial Accounting', credits: 4, type: 'Core' },
          { name: 'Business Environment', credits: 3, type: 'Core' },
          { name: 'E-Commerce', credits: 4, type: 'Core' },
          { name: 'Environmental Science', credits: 3, type: 'Core' },
          { name: 'Taxation & Analytics: GST with Simulation', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 19, courses: [
          { name: 'Strategic Management', credits: 3, type: 'Core' },
          { name: 'Enterprise Resource Planning', credits: 5, type: 'Core' },
          { name: 'Cost Accounting', credits: 4, type: 'Core' },
          { name: 'Business Research Methods', credits: 3, type: 'Core' },
          { name: 'Advanced MS Excel', credits: 2, type: 'Elective' },
          { name: 'Direct Tax', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 21, courses: [
          { name: 'Operations Management', credits: 5, type: 'Core' },
          { name: 'Corporate Finance', credits: 3, type: 'Core' },
          { name: 'Taxation', credits: 5, type: 'Core' },
          { name: 'Internship - I', credits: 4, type: 'Core' },
          { name: 'Cambridge English', credits: 2, type: 'Elective' },
          { name: 'ZOHO Books', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', totalCredits: 22, courses: [
          { name: 'Financial Statement Analysis', credits: 5, type: 'Core' },
          { name: 'Auditing Principles', credits: 4, type: 'Core' },
          { name: 'Entrepreneurship Development', credits: 4, type: 'Core' },
          { name: 'Internship - II', credits: 5, type: 'Core' },
          { name: 'Finalization of Accounts', credits: 2, type: 'Elective' },
          { name: 'AI for Finance', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 6', totalCredits: 19, courses: [
          { name: 'Capstone Project', credits: 8, type: 'Core' },
          { name: 'Corporate Readiness', credits: 4, type: 'Core' },
          { name: 'Indian Knowledge System', credits: 3, type: 'Core' },
          { name: 'Power BI', credits: 2, type: 'Elective' },
          { name: 'Costing & Auditing', credits: 2, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'ma', name: 'MA English', fullName: 'Master of Arts in English',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹36,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A specialised MA in English Literature. Built for UGC-NET aspirants, civil services candidates, and future educators.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Specialised MA in English - UGC-NET aligned curriculum',
      'British, American, and Indian Literature in English covered across all four semesters',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Full dissertation in Semester 4 under faculty supervision',
      'Language & Linguistics modules in every semester',
      'Strong preparation for civil services and academic careers',
    ],
    specialisations: [],
    careerRoles: ['Content Writer', 'Copywriter', 'Editor', 'Proofreader', 'Lecturer', 'UGC-NET Qualified Teacher', 'Civil Services Officer', 'Researcher'],
    avgSalaryAfter: '₹4-8 LPA',
    topHirers: ['NDTV', 'The Hindu', 'Times of India', 'HT Media', 'NITI Aayog', 'State PSCs', 'Universities', 'Think Tanks', 'NGOs'],
    curriculum: [
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
  },
  {
    slug: 'bba', name: 'BBA', fullName: 'Bachelor of Business Administration',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹44,000/yr', totalFee: '₹1,32,000',
    nextBatch: 'July 2026',
    description: 'A business degree for fresh graduates. 4 tracks: General Management, Digital Marketing, Retail Management, FinTech.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream - Science, Commerce, or Arts',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '4 specialisations: General Management, Digital Marketing, Retail Management, FinTech',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Research Project and Corporate Readiness modules in final year',
      'Industry mentors from Fortune 500 companies and startups',
      'Dedicated placement support from day one',
      'UGC-entitled BBA - valid for MBA admission at any Indian university',
    ],
    specialisations: ['General Management', 'Digital Marketing', 'Retail Management', 'FinTech'],
    careerRoles: ['Business Analyst', 'Management Trainee', 'Customer Relationship Manager', 'Digital Marketing Executive', 'SEO/SEM Specialist', 'Retail Store Manager', 'FinTech Associate', 'Operations Coordinator'],
    avgSalaryAfter: '₹4-8 LPA',
    topHirers: ['Reliance Industries', 'Tata Group', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Deloitte', 'KPMG', 'Amazon', 'Flipkart', 'Hindustan Unilever', 'ITC', 'TCS', 'Infosys', 'Wipro'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', totalCredits: 21, courses: [
          { name: 'Fundamentals of Management', credits: 3, type: 'Core' },
          { name: 'Business Accounting', credits: 4, type: 'Core' },
          { name: 'Business Law', credits: 3, type: 'Core' },
          { name: 'Entrepreneurship Development', credits: 3, type: 'Core' },
          { name: 'Business Communication', credits: 3, type: 'Core' },
          { name: 'Environmental Science', credits: 3, type: 'Core' },
          { name: 'Fundamentals of Financial Technology (FinTech)', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 2', totalCredits: 22, courses: [
          { name: 'Managerial Economics', credits: 3, type: 'Core' },
          { name: 'Statistics for Business Decision', credits: 4, type: 'Core' },
          { name: 'Organizational Behavior', credits: 3, type: 'Core' },
          { name: 'Human Resource Management', credits: 3, type: 'Core' },
          { name: 'Principles of Marketing', credits: 3, type: 'Core' },
          { name: 'Business Analytics', credits: 4, type: 'Core' },
          { name: 'Introduction to Digital Marketing (Digital Marketing)', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 19, courses: [
          { name: 'Macroeconomics for Managers', credits: 3, type: 'Core' },
          { name: 'Business Environment', credits: 3, type: 'Core' },
          { name: 'System Analysis and Design', credits: 3, type: 'Core' },
          { name: 'Business Ethics and CSR', credits: 3, type: 'Core' },
          { name: 'Business Policy and Strategic Management', credits: 3, type: 'Core' },
          { name: 'Management Accounting (General Management)', credits: 2, type: 'Elective' },
          { name: 'Store Operations and Inventory (Retail Management)', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 21, courses: [
          { name: 'Business Research Methods', credits: 4, type: 'Core' },
          { name: 'Operations Research', credits: 4, type: 'Core' },
          { name: 'E-Commerce', credits: 3, type: 'Core' },
          { name: 'Cyber Crimes and Law', credits: 3, type: 'Core' },
          { name: 'International Business', credits: 3, type: 'Core' },
          { name: 'Search Engine Marketing (Digital Marketing)', credits: 2, type: 'Elective' },
          { name: 'Banking Service Design & Blueprinting (FinTech)', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', totalCredits: 22, courses: [
          { name: 'Quantitative Techniques', credits: 4, type: 'Core' },
          { name: 'Production and Operation Management', credits: 4, type: 'Core' },
          { name: 'Enterprise Resource Planning', credits: 3, type: 'Core' },
          { name: 'Total Quality Management', credits: 3, type: 'Core' },
          { name: 'Project Management', credits: 4, type: 'Core' },
          { name: 'Cost Accounting (General Management)', credits: 2, type: 'Elective' },
          { name: 'E-Retailing (Retail Management)', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 6', totalCredits: 19, courses: [
          { name: 'Research Project', credits: 8, type: 'Core' },
          { name: 'Corporate Tax Management', credits: 4, type: 'Core' },
          { name: 'Corporate Readiness', credits: 3, type: 'Core' },
          { name: 'Content Strategy (Digital Marketing)', credits: 2, type: 'Elective' },
          { name: 'Digital Banking Trends & Omni-Channel Experience (FinTech)', credits: 2, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹44,000/yr', totalFee: '₹1,32,000',
    nextBatch: 'July 2026',
    description: 'A career-ready BCA with hands-on coding labs every semester. Tracks in Artificial Intelligence, Data Science, CTIS, Blockchain, and UI & UX.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Mathematics or Computer Science preferred',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '5 specialisation tracks: Artificial Intelligence, Data Science, CTIS, Blockchain, UI & UX',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Hands-on programming labs every semester - C, C++, Java, Python, DBMS, Graphics',
      'Major Project in final semester for portfolio and placement',
      'Indian Knowledge System and Universal Human Values modules',
      'UGC-entitled BCA - qualifies for MCA admission at any university',
    ],
    specialisations: ['Artificial Intelligence', 'Data Science', 'CTIS', 'Blockchain', 'UI & UX'],
    careerRoles: ['Software Developer', 'AI Developer', 'ML Engineer', 'Data Analyst', 'UX/UI Designer', 'Blockchain Developer', 'Cloud Engineer', 'Cybersecurity Analyst', 'Web Application Developer'],
    avgSalaryAfter: '₹4-9 LPA',
    topHirers: ['TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'Google', 'Microsoft', 'Cognizant', 'Capgemini', 'Flipkart', 'LTIMindtree', 'Mphasis', 'Oracle'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', totalCredits: 22, courses: [
          { name: 'Basic Mathematics', credits: 4, type: 'Core' },
          { name: 'Fundamental of C', credits: 2, type: 'Core' },
          { name: 'Basic Electronics', credits: 4, type: 'Core' },
          { name: 'Principle of Programming Languages', credits: 4, type: 'Core' },
          { name: 'Fundamentals of C Lab', credits: 4, type: 'Core' },
          { name: 'PC Software and Automation', credits: 2, type: 'Core' },
          { name: 'Multimedia Systems', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 2', totalCredits: 20, courses: [
          { name: 'Object Oriented Programming with C++', credits: 4, type: 'Core' },
          { name: 'Data Structures and Algorithms', credits: 4, type: 'Core' },
          { name: 'Management Information System', credits: 4, type: 'Core' },
          { name: 'OOP with C++ Lab', credits: 2, type: 'Core' },
          { name: 'Data Structures Lab', credits: 2, type: 'Core' },
          { name: 'Soft Skill and Professional Aptitude', credits: 2, type: 'Core' },
          { name: 'Introduction to UX Design (UI & UX)', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 20, courses: [
          { name: 'Database Management Systems', credits: 4, type: 'Core' },
          { name: 'Computer Networks', credits: 4, type: 'Core' },
          { name: 'Internet and Web Application', credits: 4, type: 'Core' },
          { name: 'DBMS Lab', credits: 2, type: 'Core' },
          { name: 'Internet & Web Programming Lab', credits: 2, type: 'Core' },
          { name: 'Artificial Intelligence', credits: 2, type: 'Elective' },
          { name: 'Fundamentals of Blockchain Technology (Blockchain)', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 20, courses: [
          { name: 'Programming in Java', credits: 4, type: 'Core' },
          { name: 'Operating Systems', credits: 4, type: 'Core' },
          { name: 'Computer Graphics and Visualization', credits: 4, type: 'Core' },
          { name: 'Computer Graphics Lab', credits: 2, type: 'Core' },
          { name: 'Programming in Java Lab', credits: 2, type: 'Core' },
          { name: 'Machine Learning (Data Science)', credits: 2, type: 'Elective' },
          { name: 'Cloud Web Services (CTIS)', credits: 2, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', totalCredits: 20, courses: [
          { name: 'Software Engineering', credits: 4, type: 'Core' },
          { name: 'Software Engineering Lab', credits: 2, type: 'Core' },
          { name: 'Python Programming', credits: 4, type: 'Core' },
          { name: 'Python Lab', credits: 2, type: 'Core' },
          { name: 'Project Formulation and Appraisal', credits: 4, type: 'Core' },
          { name: 'Data Mining & Prediction (Data Science)', credits: 2, type: 'Elective' },
          { name: 'Usability Testing (UI & UX)', credits: 2, type: 'Elective' },
        ]},
        { label: 'Semester 6', totalCredits: 22, courses: [
          { name: 'Major Project', credits: 8, type: 'Core' },
          { name: 'Indian Knowledge System', credits: 4, type: 'Core' },
          { name: 'Universal Human Values', credits: 4, type: 'Core' },
          { name: 'Automation Concepts and Techniques', credits: 2, type: 'Core' },
          { name: 'Software Project Management', credits: 2, type: 'Elective' },
          { name: 'Blockchain Economics (Blockchain)', credits: 2, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'ba', name: 'BA', fullName: 'Bachelor of Arts',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹24,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A flexible BA where you pick 3 discipline streams from 7 at the start and follow all 3 through every semester - Economics, Political Science, English Literature, History, Public Policy, International Relations, or Computer Applications. Strong civil services base.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream accepted',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Choose 3 discipline streams from 7 at admission, and study all 3 through every semester',
      '7 streams available: Economics, Political Science, English Literature, History, Public Policy & Development, International Relations, Computer Applications',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Microsoft Office Practices and Visual Design Tool in Year 1',
      'Indian Knowledge System and Environmental Science curriculum',
      'Strong foundation for UPSC, state civil services, and UGC-NET',
    ],
    specialisations: ['Economics', 'Political Science', 'Public Policy & Development', 'International Relations', 'English Literature', 'History', 'Computer Applications'],
    careerRoles: ['Economic Analyst', 'Policy Analyst', 'ESG Analyst', 'Content Writer', 'Social Media Strategist', 'Editor', 'Civil Services Officer', 'UX Researcher', 'Data Analyst', 'Journalist'],
    avgSalaryAfter: '₹3-6 LPA',
    topHirers: ['NDTV', 'The Hindu', 'Times of India', 'HT Media', 'NITI Aayog', 'UPSC', 'State PSCs', 'TCS', 'Amazon', 'Hindustan Unilever', 'NGOs & Think Tanks'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', totalCredits: 22, courses: [
          { name: 'English-I', credits: 6, type: 'Core' },
          { name: 'Microsoft Office Practices', credits: 4, type: 'Core' },
          { name: 'Microeconomics (Economics)', credits: 4, type: 'Elective' },
          { name: 'Political Theory (Political Science)', credits: 4, type: 'Elective' },
          { name: 'Introduction to Literature (English Literature)', credits: 4, type: 'Elective' },
        ]},
        { label: 'Semester 2', totalCredits: 22, courses: [
          { name: 'English-II', credits: 6, type: 'Core' },
          { name: 'Visual Design Tool', credits: 4, type: 'Core' },
          { name: 'Macroeconomics (Economics)', credits: 4, type: 'Elective' },
          { name: 'Indian Political System (Political Science)', credits: 4, type: 'Elective' },
          { name: 'Indian Writing in English (English Literature)', credits: 4, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', totalCredits: 22, courses: [
          { name: 'Communication Skills', credits: 6, type: 'Core' },
          { name: 'Entrepreneurship Development', credits: 4, type: 'Core' },
          { name: 'Economics of Development and Planning (Economics)', credits: 4, type: 'Elective' },
          { name: 'Western Political Thought (Political Science)', credits: 4, type: 'Elective' },
          { name: 'British Poetry & Drama, 14th-17th Century (English Literature)', credits: 4, type: 'Elective' },
        ]},
        { label: 'Semester 4', totalCredits: 21, courses: [
          { name: 'Foundation of Mathematics', credits: 6, type: 'Core' },
          { name: 'Universal Human Values', credits: 3, type: 'Core' },
          { name: 'Foreign Trade and Public Finance (Economics)', credits: 4, type: 'Elective' },
          { name: 'Comparative Politics & Government (Political Science)', credits: 4, type: 'Elective' },
          { name: '20th Century British Literature (English Literature)', credits: 4, type: 'Elective' },
        ]},
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', totalCredits: 20, courses: [
          { name: 'Elementary of Computer Applications', credits: 6, type: 'Core' },
          { name: 'Computer Applications Lab', credits: 2, type: 'Core' },
          { name: 'Indian Economy (Economics)', credits: 4, type: 'Elective' },
          { name: 'International Politics (Political Science)', credits: 4, type: 'Elective' },
          { name: "Women's Writing (English Literature)", credits: 4, type: 'Elective' },
        ]},
        { label: 'Semester 6', totalCredits: 22, courses: [
          { name: 'Environmental Science', credits: 6, type: 'Core' },
          { name: 'Indian Knowledge System', credits: 4, type: 'Core' },
          { name: 'Statistical Techniques (Economics)', credits: 4, type: 'Elective' },
          { name: 'Introduction to the Constitution of India (Political Science)', credits: 4, type: 'Elective' },
          { name: 'Literary Criticism (English Literature)', credits: 4, type: 'Elective' },
        ]},
      ]},
    ],
  },
  {
    slug: 'msc', name: 'M.Sc', fullName: 'Master of Science in Mathematics',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹36,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A 2-year M.Sc in Mathematics covering pure, applied, and computational maths. Aligned with UGC-NET and GATE.',
    eligibility: [
      'B.Sc in Mathematics or related field from a UGC-recognised university',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Advanced mathematics: Abstract Algebra, Topology, Integral Transforms, Tensor Analysis, Fluid Mechanics',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Programming modules: MAT-LAB, C++, and Artificial Intelligence in Semester 4',
      'Research dissertation (Major Project) in Semester 4',
      'Aligned with UGC-NET Mathematics syllabus',
      'Preparation for quantitative analyst and data science roles',
    ],
    specialisations: [],
    careerRoles: ['Data Analyst', 'Data Scientist', 'Actuarial Science Professional', 'Operations Research Analyst', 'Quantitative Analyst', 'Lecturer', 'Statistician'],
    avgSalaryAfter: '₹5-10 LPA',
    topHirers: ['Universities', 'RBI', 'ISRO', 'Insurance Companies', 'Financial Firms', 'NITI Aayog'],
    curriculum: [
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
  },
  {
    slug: 'majmc', name: 'MAJMC', fullName: 'Master of Arts in Journalism & Mass Communication',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹36,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'An MA in Journalism combining theory with hands-on production across print, radio, TV, digital, and advertising.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Full-spectrum media training: print, radio, TV, digital, advertising, and PR',
      'Free Coursera Premium access for the full course duration - 10,000+ courses',
      'Photography and Video Production Techniques in Semester 3',
      'Digital Journalism, Rural Journalism, and Environment Journalism in Semester 4',
      'Research Project under faculty supervision in the final semester',
      'UGC-entitled degree - recognised for journalism and media roles',
    ],
    specialisations: [],
    careerRoles: ['Reporter', 'Anchor', 'Podcast Creator', 'Video Producer', 'Advertising Copywriter', 'PR Manager', 'Digital Marketing Executive', 'Media Analyst'],
    avgSalaryAfter: '₹4-9 LPA',
    topHirers: ['Times Group', 'NDTV', 'Hindustan Times', 'Ogilvy', 'Weber Shandwick', 'Edelman', 'Republic TV', 'News18'],
    curriculum: [
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
  },
]

const PROGRAM_MAP = new Map(PROGRAMS.map(p => [p.slug, p]))

// Returns field if it is a non-empty array, otherwise falls back to the hardcoded value.
function fallback(field: unknown, fb?: string[]): string[] {
  return Array.isArray(field) && (field as unknown[]).length > 0 ? (field as string[]) : (fb ?? [])
}

const RELATED: Record<string, string[]> = {
  'mba':      ['mba-if', 'mba-dfaa', 'mca'],
  'mba-if':   ['mba-dfaa', 'mba', 'mca'],
  'mba-dfaa': ['mba-if', 'mba', 'mca'],
  'mca':      ['bca', 'mba', 'msc'],
  'bca':      ['mca', 'bba', 'msc'],
  'bba':      ['bba-aaft', 'mba', 'bca'],
  'bba-aaft': ['bba', 'majmc', 'mba'],
  'ma':       ['ba', 'majmc', 'msc'],
  'ba':       ['bba', 'bca', 'ma'],
  'msc':      ['mca', 'bca', 'ma'],
  'majmc':    ['bba-aaft', 'ma', 'mba'],
}

interface Props {
  params: Promise<{ slug: string }>
}

export const revalidate = 3600
export const dynamicParams = false

export async function generateStaticParams() {
  const sanity = await getAllPrograms()
  // Only degree programs have detail pages (certs open a counsellor modal)
  const sanitySlug  = sanity.filter(p => p.level !== 'cert').map(p => ({ slug: p.slug }))
  const fallback    = PROGRAMS.map(p => ({ slug: p.slug }))
  // Union - Sanity takes priority; fallback fills gaps when CMS is empty
  const seen = new Set<string>()
  return [...sanitySlug, ...fallback].filter(s => seen.has(s.slug) ? false : (seen.add(s.slug), true))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sanityProg = await getProgramBySlug(slug)
  const prog = sanityProg ?? PROGRAM_MAP.get(slug)
  if (!prog) return { title: 'Program not found' }
  const metaDesc = (prog.description ?? '').replace(/—/g, '-').replace(/–/g, '-')
  return {
    title: `${prog.name} Online - ${prog.fullName} | VGU`,
    description: metaDesc,
    alternates: { canonical: `https://onlinevgu.com/programs/${prog.slug}` },
    openGraph: {
      title: `${prog.name} Online - ${prog.fullName} | VGU`,
      description: metaDesc,
      url: `https://onlinevgu.com/programs/${prog.slug}`,
    },
  }
}

const COLOR_GRAD: Record<string, string> = {
  red:    'linear-gradient(135deg,#C04036,#821a12)',
  blue:   'linear-gradient(135deg,#2563eb,#1d4ed8)',
  purple: 'linear-gradient(135deg,#7c3aed,#4c1d95)',
  green:  'linear-gradient(135deg,#059669,#065f46)',
  amber:  'linear-gradient(135deg,#d97706,#92400e)',
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params

  const [sanityProg, sanityFaqs, sanityTestimonials, allSanityProgs, config] = await Promise.all([
    getProgramBySlug(slug),
    getProgramFaqs(slug),
    getTestimonialsByProgram(slug),
    getAllPrograms(),
    getSiteConfig(),
  ])

  // Sanity is primary; fall back to hardcoded when CMS is not yet populated
  const prog = sanityProg ?? PROGRAM_MAP.get(slug)
  if (!prog) notFound()

  // Field-level fallback: Sanity may return null for array fields even when the
  // document exists. Extract safe arrays here so JSX never calls .map() on null.
  const hardcoded      = PROGRAM_MAP.get(slug)
  const highlights      = fallback(prog.highlights,      hardcoded?.highlights)
  const careerRoles     = fallback(prog.careerRoles,     hardcoded?.careerRoles)
  const specialisations = fallback(prog.specialisations, hardcoded?.specialisations)
  const topHirers       = fallback(prog.topHirers,       hardcoded?.topHirers)

  const totalProgramCount = allSanityProgs.length > 0 ? allSanityProgs.length : PROGRAMS.length
  const heroImage       = sanityProg?.heroImageUrl ?? HERO_IMAGES[prog.slug] ?? DEFAULT_HERO_IMAGE
  const totalFeeNumeric = prog.totalFee.replace(/[^0-9]/g, '')
  const description     = (prog.description ?? '').replace(/—/g, '-').replace(/–/g, '-')

  // Rich per-program content (overview, key outcomes, dept stats, fee breakdown).
  // Missing slug is acceptable - sections that depend on extras are gated below.
  const extras = PROGRAM_EXTRAS[prog.slug]

  // Related programs - try Sanity data first, fall back to hardcoded map
  const relatedPrograms = (RELATED[prog.slug] ?? []).flatMap(s => {
    const sp = allSanityProgs.find(p => p.slug === s)
    if (sp && (sp.level === 'ug' || sp.level === 'pg')) return [{ slug: sp.slug, name: sp.name, fullName: sp.fullName, level: sp.level, duration: sp.duration, feePerYear: sp.fee, image: sp.image ?? HERO_IMAGES[s] ?? undefined }]
    const hp = PROGRAM_MAP.get(s)
    if (hp) return [{ slug: hp.slug, name: hp.name, fullName: hp.fullName, level: hp.level, duration: hp.duration, feePerYear: hp.feePerYear, image: HERO_IMAGES[s] }]
    return []
  })

  // Curriculum never stored in Sanity seed - always fall back to hardcoded map
  const curriculum = (prog as ProgramDetail).curriculum ?? PROGRAM_MAP.get(slug)?.curriculum

  // Map Sanity FAQs → {q, a} expected by ProgramFAQ; undefined = use fallback
  const mappedFaqs = sanityFaqs.length > 0
    ? sanityFaqs.map(f => ({ q: f.question, a: f.answer }))
    : undefined

  // Map Sanity testimonials → shape expected by ProgramTestimonials; undefined = use fallback
  const mappedTestimonials = sanityTestimonials.length > 0
    ? sanityTestimonials.map(t => ({
        name:      t.name,
        batch:     t.role,
        initials:  t.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2),
        photoGrad: COLOR_GRAD[t.colorTheme] ?? COLOR_GRAD.red,
        quote:     t.quote,
        photo:     t.avatarUrl ?? undefined,
      }))
    : undefined

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${prog.fullName} Online - Vivekananda Global University`,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Vivekananda Global University',
      sameAs: 'https://onlinevgu.com',
    },
    url: `https://onlinevgu.com/programs/${prog.slug}`,
    educationalCredentialAwarded: prog.fullName,
    offers: {
      '@type': 'Offer',
      price: totalFeeNumeric,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://onlinevgu.com' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://onlinevgu.com/programs' },
      { '@type': 'ListItem', position: 3, name: prog.name,  item: `https://onlinevgu.com/programs/${prog.slug}` },
    ],
  }

  return (
    <div className="pb-16 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* ══ Hero ══ */}
      <section className="sketch-hover-group relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">
        {/* Background image + brand-red overlay (50%) - swap heroImage for a program-specific asset */}
        <Image src={heroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

        {/* Breadcrumb - pinned to the hero's own top edge, independent of the
            content column's py-16+ padding */}
        <div className="absolute top-0 left-0 right-0 z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12">
          <Breadcrumb items={[{ label: 'All Courses', href: '/programs' }, { label: prog.name }]} variant="overlay" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 md:px-8 lg:px-12 py-16 md:py-20 lg:py-24">

          {/* Copy column */}
          <div className="max-w-[680px]">
            {/* Badges */}
            <div className="anim-load-left flex flex-wrap items-center gap-2 mb-6" style={{ animationDelay: '0ms' }}>
              <span className="rounded-full bg-white/20 border border-white/25 px-3.5 py-1 text-[12px] font-heading font-bold uppercase tracking-[0.05em] text-white">
                {prog.level === 'ug' ? 'Undergraduate' : 'Postgraduate'}
              </span>
              {prog.popular && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow px-3.5 py-1 text-[12px] font-heading font-bold text-neutral-900">
                  ★ Most Popular
                </span>
              )}
            </div>

            {/* Name */}
            <h1 className="anim-load-left font-heading font-bold tracking-[-0.5px] leading-[1.05] text-white text-[38px] sm:text-[48px] lg:text-[56px]" style={{ animationDelay: '70ms' }}>
              {prog.name}
            </h1>
            <p className="anim-load-left mt-2 text-[16px] font-body text-white/70 lg:text-[17px]" style={{ animationDelay: '100ms' }}>
              {prog.fullName}
            </p>
            <p className="anim-load-left mt-6 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[620px] line-clamp-4 sm:line-clamp-3" style={{ animationDelay: '140ms' }}>
              {description}
            </p>

            {/* Stat chips + next batch - one wrap row on mobile */}
            <div className="anim-load-left mt-8 flex flex-row flex-wrap items-center gap-x-3 gap-y-2" style={{ animationDelay: '210ms' }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 border border-white/25 px-3.5 py-1.5 text-[13px] font-body font-semibold text-white">
                <IconClock size={14} stroke={1.75} />
                {prog.duration} · {prog.semesters} semesters
              </span>
              {prog.emi && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/25 border border-vgu-yellow/40 px-3.5 py-1.5 text-[13px] font-body font-semibold text-vgu-yellow">
                  EMI from {prog.emi}
                </span>
              )}
              <span className="inline-flex items-center gap-2 text-[13px] font-body font-semibold text-white/80">
                <span className="relative flex h-2 w-2 flex-none">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-white">{config.nextBatch} admissions are open</span>
                </span>
              </span>
            </div>

            {/* CTAs */}
            <div className="anim-load-left mt-12 flex flex-col gap-4" style={{ animationDelay: '310ms' }}>
              <div className="flex flex-wrap items-center gap-3">
                {/* Primary - white inverted, pairs with the red navbar CTA */}
                <a
                  href="#counsellor"
                  data-apply-trigger
                  data-program={prog.name}
                  data-program-level={prog.level}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Apply Now
                  <IconArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary - ghost */}
                <a
                  href="#"
                  data-brochure-trigger
                  data-program={prog.name}
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[16px] px-7 py-[15px] transition-all duration-200"
                >
                  <IconDownload size={15} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                  Download Brochure
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <PlacementStatsStrip slug={prog.slug} />

      {/* ══ Fees & scholarships ══ - financing and merit support surfaced
          right after the hero and stats strip, ahead of curriculum/faculty
          detail, since affordability is one of the first things a
          prospective student needs to confirm before reading further. */}
      {extras && (
        <FeesScholarships
          totalFee={prog.totalFee}
          duration={prog.duration}
          feeBreakdown={extras.feeBreakdown}
          scholarshipTiers={SCHOLARSHIP_TIERS}
        />
      )}

      {/* ══ Main content ══ */}
      <section className="bg-neutral-50 pt-12 pb-8 px-5 md:px-8 lg:px-12 md:pt-12 md:pb-16">
        <div className="mx-auto max-w-[1280px]">

          {/* Back to Programs */}
          <div className="mb-6">
            <Link
              href="/programs"
              className="inline-flex items-center min-h-[44px] gap-2 text-[14px] font-heading font-semibold text-neutral-500 hover:text-vgu-red transition-colors duration-150"
            >
              <IconChevronRight size={14} className="rotate-180" />
              All Programs
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">

            {/* ── Left ── */}
            <div className="flex flex-col min-w-0 divide-y divide-neutral-100 [&>*]:pt-12 [&>*:first-child]:pt-0">

              {/* Key Outcomes */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">What you&apos;ll be able to do</p>
                  <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                    Key Outcomes
                  </h2>
                </div>
                <KeyOutcomes outcomes={extras?.keyOutcomes ?? highlights} />
              </div>

              {/* Career outcomes - benefits (what you'll gain) lead, before the
                  curriculum mechanics that substantiate them. */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Placement records</p>
                  <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                    Career Opportunities after {prog.name}
                  </h2>
                </div>
                <CareerOutcomes roles={extras?.salariesByRole ?? careerRoles} />
                {topHirers.length > 0 && (
                  <div className="mt-8">
                    <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-4">Top hirers</p>
                    <HirerStrip hirers={topHirers} />
                  </div>
                )}
                <div className="mt-10">
                  <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.06em] text-neutral-400 mb-4">Career services included</p>
                  <CareerServices services={CAREER_SERVICES} />
                </div>
              </div>

              {/* Curriculum */}
              {curriculum && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Curriculum</p>
                    <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-8 lg:text-[32px]">
                      What You&apos;ll Study
                    </h2>
                  </div>
                  <CurriculumPreview curriculum={curriculum} />
                </div>
              )}

              {/* Specialisations */}
              {specialisations.length > 0 && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Focus areas</p>
                    <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                      Specialisations
                    </h2>
                  </div>
                  <SpecialisationCards specialisations={specialisations} />
                </div>
              )}

            </div>

            {/* ── Right: enrollment card (desktop only) ── */}
            <div className="hidden lg:block sticky top-[100px]">
              <EnrollmentCard prog={{ ...prog, nextBatch: config.nextBatch }} />
            </div>

          </div>
        </div>
      </section>

      {/* ══ How you'll study ══ */}
      <LearningExperience
        liveSchedule={LIVE_SCHEDULE}
        sampleWeek={SAMPLE_WEEK}
        lmsPlatform={LMS_PLATFORM}
        mentorCadence={MENTOR_CADENCE}
        cohortSize={COHORT_SIZE}
      />

      {/* ══ Testimonials ══ - peer social proof right after the salary/career
          payoff above, while that outcome-driven momentum is still fresh. */}
      <ProgramTestimonials slug={prog.slug} testimonials={mappedTestimonials} />

      {/* ══ Faculty ══ - authority-based trust follows peer proof. */}
      <FacultySection slug={prog.slug} />

      {/* ══ Included learning platforms value stack ══ - what's included,
          positioned right before the price to raise perceived value ahead
          of the fee reveal. Coursera and LinkedIn Learning share one card
          under a single "included" header instead of two separate stacked
          banners, so adding LinkedIn Learning doesn't add height or a
          second competing block - it reads as one bundled benefit. */}
      <section className="bg-white py-10 lg:py-12 px-5 md:px-8 lg:px-12 border-t border-neutral-100">
        <div className="mx-auto max-w-[1280px]">
          <div data-animate="fade-up" className="rounded-2xl overflow-hidden border border-neutral-200">

            {/* Shared header strip */}
            <div className="flex items-center justify-between px-6 py-2.5 bg-neutral-900">
              <p className="text-[11px] font-heading font-bold uppercase tracking-[0.08em] text-white/60">
                Included with every program
              </p>
              <span className="rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[10px] font-heading font-bold text-neutral-900">
                Zero extra cost
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {/* Coursera */}
              <div className="relative flex items-center gap-3.5 px-6 py-5" style={{ background: 'linear-gradient(135deg, #0056D2 0%, #00368a 100%)' }}>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="relative flex-none w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <Image src="/assets/trust/coursera.svg" alt="Coursera" width={30} height={30} className="rounded-md" />
                </div>
                <div className="relative min-w-0">
                  <p className="font-heading font-bold text-[15px] text-white leading-tight">Coursera Premium</p>
                  <p className="text-[12px] font-body text-white/75 leading-snug mt-0.5">
                    10,000+ courses from Google, IBM, Meta &amp; top universities
                  </p>
                </div>
              </div>

              {/* LinkedIn Learning */}
              <div className="relative flex items-center gap-3.5 px-6 py-5" style={{ background: 'linear-gradient(135deg, #0A66C2 0%, #084d92 100%)' }}>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 pointer-events-none opacity-[0.05]"
                  style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="relative flex-none w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden">
                  <BrandIcon name="LinkedIn Learning" />
                </div>
                <div className="relative min-w-0">
                  <p className="font-heading font-bold text-[15px] text-white leading-tight">LinkedIn Learning</p>
                  <p className="text-[12px] font-body text-white/75 leading-snug mt-0.5">
                    Expert-led courses in business, tech &amp; creative skills
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertificatePreview
        programName={prog.name}
        programFullName={prog.fullName}
        sampleImageUrl={sanityProg?.certificateSampleUrl}
        foundingYear={config.foundingYear}
      />

      <AdmissionSteps
        programName={prog.name}
        programLevel={prog.level === 'pg' ? 'pg' : 'ug'}
        documents={REQUIRED_DOCUMENTS}
        eligibility={prog.eligibility}
      />
      <ProgramFAQ slug={prog.slug} faqs={mappedFaqs} />
      <RelatedPrograms programs={relatedPrograms} />

      {/* ══ All Programs CTA ══ */}
      <section className="sketch-hover-group relative bg-neutral-50 border-t border-neutral-200 py-16 lg:py-20 px-5 md:px-8 lg:px-12 overflow-hidden">
        {/* Subtle dot grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{ backgroundImage: 'radial-gradient(circle, #111827 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <SketchFlourish shape="wave" color="red" opacity={0.04} strokeWidth={20} trigger="hover" />
        <div data-animate="fade-up" className="relative mx-auto max-w-[1280px] text-center">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Explore more
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
            Find the program that fits you.
          </h2>

          {/* Context chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {[`${totalProgramCount} programs`, '7 disciplines', 'No entrance exam', '100% online'].map(chip => (
              <span key={chip} className="rounded-full bg-white border border-neutral-200 px-3.5 py-1.5 text-[12px] font-heading font-semibold text-neutral-600 shadow-sm">
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2.5 rounded-md border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red px-8 py-3.5 text-[15px] font-semibold font-heading transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.28)] hover:shadow-[0_2px_8px_rgba(192,64,54,0.12)]"
            >
              <IconArrowRight size={16} className="rotate-180" />
              All Programs
            </Link>
            <a
              href="#counsellor"
              data-counsellor-trigger
              className="inline-flex items-center gap-2 rounded-md border-2 border-neutral-300 bg-white hover:border-vgu-red hover:text-vgu-red text-neutral-700 px-8 py-3.5 text-[15px] font-semibold font-heading transition-all duration-200"
            >
              <IconHeadset size={16} />
              Talk to a Counsellor
            </a>
          </div>
        </div>
      </section>

      <MobileStickyCTA
        feePerYear={prog.feePerYear}
        emi={prog.emi}
        programName={prog.name}
        programLevel={prog.level === 'pg' ? 'pg' : 'ug'}
      />
    </div>
  )
}

interface EnrollmentProg { feePerYear: string; totalFee: string; emi?: string; nextBatch?: string; name: string }
function EnrollmentCard({ prog }: { prog: EnrollmentProg }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(17,24,39,0.08)] overflow-hidden">

      {/* Red header */}
      <div
        className="px-6 pt-6 pb-5"
        style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }}
      >
        <p className="text-[11px] font-heading font-semibold uppercase tracking-[0.08em] text-white/55 mb-1">Annual Fee</p>
        <div className="font-heading font-black text-[40px] leading-none text-white">{prog.feePerYear}</div>
        <p className="text-[13px] font-body text-white/65 mt-2">Total program cost: {prog.totalFee}</p>
        {prog.emi && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[12px] font-body font-semibold text-white">
            No-cost EMI from {prog.emi}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Coursera + LinkedIn Learning callout - one row, overlapping badges,
            so pairing the two platforms doesn't cost any extra sidebar height. */}
        <div className="flex items-center gap-3 rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 mb-3">
          <div className="flex-none flex items-center -space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#0056D2] ring-2 ring-white flex items-center justify-center shadow-sm">
              <Image src="/assets/trust/coursera.svg" alt="Coursera" width={20} height={20} className="rounded-sm" />
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] ring-2 ring-white flex items-center justify-center shadow-sm overflow-hidden">
              <BrandIcon name="LinkedIn Learning" />
            </div>
          </div>
          <div>
            <p className="font-heading font-bold text-[13px] text-neutral-900">Coursera + LinkedIn Learning</p>
            <p className="text-[11px] font-body text-neutral-500">Both included free, for your full course duration</p>
          </div>
        </div>

        {/* Scholarship callout */}
        <div className="flex items-center gap-3 rounded-xl bg-vgu-yellow/10 border border-vgu-yellow/25 px-4 py-3 mb-4">
          <span className="text-vgu-yellow text-[18px] flex-none leading-none">★</span>
          <div>
            <p className="font-heading font-bold text-[13px] text-neutral-900">Merit scholarships available</p>
            <p className="text-[11px] font-body text-neutral-500">Up to 50% fee waiver for eligible students</p>
          </div>
        </div>

        {/* Admissions status */}
        <div className="flex items-center gap-3 rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 mb-5">
          <span className="relative flex h-2.5 w-2.5 flex-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <div>
            <p className="inline-flex items-center flex-wrap gap-x-1.5 font-heading font-bold text-[13px] text-neutral-900">
              {prog.nextBatch} admissions are open
            </p>
            <p className="text-[11px] font-body text-neutral-500 mt-0.5">Enroll before seats fill up</p>
          </div>
        </div>

        {/* Apply */}
        <a
          href="#counsellor"
          data-apply-trigger
          data-program={prog.name}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-vgu-red hover:brightness-90 text-white py-3.5 text-[15px] font-semibold font-heading text-center transition-all duration-200 mb-3 shadow-[0_4px_16px_rgba(192,64,54,0.28)] hover:shadow-[0_6px_24px_rgba(192,64,54,0.42)]"
        >
          Apply Now
          <IconArrowRight size={16} />
        </a>

        {/* Brochure */}
        <a
          href="#"
          data-brochure-trigger
          data-program={prog.name}
          className="w-full flex items-center justify-center gap-2 rounded-full bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/[0.06] py-3 text-[14px] font-semibold font-heading text-center transition-all duration-200"
        >
          <IconDownload size={15} />
          Download Brochure
        </a>

        {/* Counsellor link */}
        <a
          href="#counsellor"
          data-program={prog.name}
          className="w-full flex items-center justify-center gap-1.5 text-[13px] font-body font-semibold text-neutral-500 hover:text-vgu-red transition-colors duration-150 mt-2 py-1"
        >
          <IconHeadset size={14} />
          Talk to a Counsellor
        </a>

        {/* Trust signals */}
        <div className="mt-5 pt-5 border-t border-neutral-100 flex gap-2">
          {[
            'UGC Recognised',
            'NAAC A+',
          ].map(label => (
            <span key={label} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-body font-semibold text-neutral-600">
              <IconShieldCheck size={11} className="text-vgu-red flex-none" />
              {label}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
