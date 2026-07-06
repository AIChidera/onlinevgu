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
  'mba':    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80&auto=format&fit=crop',
  'mba-if': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop',
  'bca':    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80&auto=format&fit=crop',
  'mca':    'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=80&auto=format&fit=crop',
  'bba':    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80&auto=format&fit=crop',
  'ba':     'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80&auto=format&fit=crop',
  'ma':     'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80&auto=format&fit=crop',
  'msc':    'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&q=80&auto=format&fit=crop',
  'majmc':  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80&auto=format&fit=crop',
}
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80&auto=format&fit=crop'

const PROGRAMS: ProgramDetail[] = [
  {
    slug: 'mba', name: 'MBA', fullName: 'Master of Business Administration',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹75,000/yr', totalFee: '₹1,50,000', emi: '₹6,250/month',
    nextBatch: 'July 2026', popular: true,
    description: "VGU's most sought-after postgraduate degree - designed for working professionals who want to lead, not just manage. Build strategic, financial, and leadership expertise through live weekend sessions, real-world case studies, and mentorship from senior industry executives.",
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Open to all streams and professional backgrounds',
    ],
    highlights: [
      'Live weekend classes - attend from anywhere in India',
      '8 specialisations: Marketing, HR, Finance, Operations, Healthcare, Agri-Business, IT Management, International Business',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
      'Dedicated placement cell with 500+ hiring partners',
      'AI-proctored exams - appear from home, no exam centre needed',
      'Merit scholarships up to 50% available',
      'UGC-entitled degree - identical to an on-campus MBA certificate',
    ],
    specialisations: ['Marketing', 'Finance', 'Human Resources', 'Operations', 'Healthcare', 'Agri-Business', 'IT Management', 'International Business'],
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
  },
  {
    slug: 'mca', name: 'MCA', fullName: 'Master of Computer Applications',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹75,000/yr', totalFee: '₹1,50,000', emi: '₹6,250/month',
    nextBatch: 'July 2026',
    description: 'A rigorous, industry-aligned MCA built for the modern tech landscape. Cover programming fundamentals, machine learning, cloud computing, AI, and cybersecurity - all while building real projects, competing in hackathons, and preparing for cloud certifications.',
    eligibility: [
      "BCA, B.Sc (IT/CS/Mathematics), or any bachelor's with Mathematics at 10+2",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Industry-aligned curriculum: C, Java, Python, Machine Learning, Cloud, IoT, Blockchain',
      '3 specialisations: AI & Data Science, Cloud Tech & Cybersecurity, Cloud Computing & Full Stack',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
      'Hackathons and semester projects with industry judges',
      'Cloud and cybersecurity certification prep tracks',
      'Dedicated tech placement cell',
    ],
    specialisations: ['Cloud Tech & Cybersecurity', 'AI & Data Science', 'Cloud Computing & Full Stack'],
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
  },
  {
    slug: 'mba-if', name: 'MBA-IF', fullName: 'MBA in International Finance',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹1,20,000/yr', totalFee: '₹2,40,000', emi: '₹10,000/month',
    nextBatch: 'July 2026',
    description: 'A specialised 2-year online MBA focused entirely on international finance - with integrated ACCA, CMA, and FM professional certification tracks available at 60% lower cost than standalone certification. Built for finance professionals who want a global edge.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'Background in Commerce or Finance preferred but not mandatory',
      'No entrance exam required',
    ],
    highlights: [
      'Integrated ACCA, CMA & FM professional certification tracks',
      'Save 60% vs standalone ACCA/CMA certification costs',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
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
  },
  {
    slug: 'ma', name: 'MA', fullName: 'Master of Arts in English',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹36,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A specialised MA in English Literature from VGU - ideal for UGC-NET aspirants, civil services candidates, and those pursuing teaching or academic careers. Covers British, American, and Indian writing in English across four semesters, with a full dissertation in the final semester.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Specialised MA in English - UGC-NET aligned curriculum',
      'British, American, and Indian Literature in English covered across all four semesters',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
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
    description: 'An undergraduate business degree that builds strong management fundamentals - ideal for fresh graduates who want to fast-track into a business career or launch their own venture. Choose from General Management, Digital Marketing, Retail Management, or FinTech specialisation tracks.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream - Science, Commerce, or Arts',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '4 specialisations: General Management, Digital Marketing, Retail Management, FinTech',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
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
  },
  {
    slug: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹44,000/yr', totalFee: '₹1,32,000',
    nextBatch: 'July 2026',
    description: "Build a career in software development with hands-on coding labs every semester and real-world projects. VGU's BCA offers 6 specialisation tracks including AI, Blockchain, Cloud & Information Security, UX Design, and Data Science.",
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Mathematics or Computer Science preferred',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '6 specialisation tracks: General, UX Design, Data Science, Cloud & Information Security, Blockchain, Artificial Intelligence',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
      'Hands-on programming labs every semester - C, C++, Java, Python, DBMS, Graphics',
      'Major Project in final semester for portfolio and placement',
      'Indian Knowledge System and Universal Human Values modules',
      'UGC-entitled BCA - qualifies for MCA admission at any university',
    ],
    specialisations: ['General', 'Artificial Intelligence', 'Data Science', 'UX Design', 'Cloud Technology & Information Security', 'Blockchain Technology'],
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
  },
  {
    slug: 'ba', name: 'BA', fullName: 'Bachelor of Arts',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹24,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A flexible undergraduate degree with 8 specialisation streams - Economics, Political Science, English Literature, History, Psychology, and more. Strong academic foundation for civil services, law, journalism, and academia.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream accepted',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '8 specialisation streams: Economics, Political Science, English Literature, History, Psychology, Public Policy, International Relations, Computer Applications',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
      'Microsoft Office Practices and Visual Design Tool in Year 1',
      'Computer Applications module in Year 3',
      'Indian Knowledge System and Environmental Science curriculum',
      'Strong foundation for UPSC, state civil services, and UGC-NET',
    ],
    specialisations: ['Economics', 'Psychology', 'Political Science', 'Public Policy & Development', 'International Relations', 'English Literature', 'History', 'Computer Applications'],
    careerRoles: ['Economic Analyst', 'Policy Analyst', 'ESG Analyst', 'Content Writer', 'Social Media Strategist', 'Editor', 'Civil Services Officer', 'UX Researcher', 'Data Analyst', 'Journalist'],
    avgSalaryAfter: '₹3-6 LPA',
    topHirers: ['NDTV', 'The Hindu', 'Times of India', 'HT Media', 'NITI Aayog', 'UPSC', 'State PSCs', 'TCS', 'Amazon', 'Hindustan Unilever', 'NGOs & Think Tanks'],
    curriculum: [
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
  },
  {
    slug: 'msc', name: 'M.Sc', fullName: 'Master of Science in Mathematics',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹36,000/yr', totalFee: '₹72,000',
    nextBatch: 'July 2026',
    description: 'A 2-year online M.Sc in Mathematics from VGU covering advanced pure and applied mathematics - from abstract algebra and topology to fluid mechanics, AI, and operations research. Ideal for UGC-NET, GATE, research careers, and quantitative roles in finance and tech.',
    eligibility: [
      'B.Sc in Mathematics or related field from a UGC-recognised university',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Advanced mathematics: Abstract Algebra, Topology, Integral Transforms, Tensor Analysis, Fluid Mechanics',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
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
    description: 'A 2-year online MA in Journalism and Mass Communication from VGU - combining communication theory with hands-on production skills across print, radio, TV, digital journalism, advertising, and PR for the modern media industry.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Full-spectrum media training: print, radio, TV, digital, advertising, and PR',
      'Free Coursera Premium access for the full course duration - 7,000+ courses',
      'Photography and Video Production Techniques in Semester 3',
      'Digital Journalism, Rural Journalism, and Environment Journalism in Semester 4',
      'Research Project under faculty supervision in the final semester',
      'UGC-entitled degree - recognised for journalism and media roles',
    ],
    specialisations: ['Digital Journalism', 'Public Relations & Corporate Communication', 'Broadcast Media', 'Multimedia Journalism'],
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
  'mba':    ['mba-if', 'mca', 'bba'],
  'mba-if': ['mba', 'mca', 'bba'],
  'mca':    ['bca', 'mba', 'msc'],
  'bca':    ['mca', 'bba', 'msc'],
  'bba':    ['mba', 'bca', 'ba'],
  'ma':     ['ba', 'majmc', 'msc'],
  'ba':     ['bba', 'bca', 'ma'],
  'msc':    ['mca', 'bca', 'ma'],
  'majmc':  ['ma', 'mba', 'bba'],
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
    alternates: { canonical: `https://onlinevgu.in/programs/${prog.slug}` },
    openGraph: {
      title: `${prog.name} Online - ${prog.fullName} | VGU`,
      description: metaDesc,
      url: `https://onlinevgu.in/programs/${prog.slug}`,
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

  const [sanityProg, sanityFaqs, sanityTestimonials, allSanityProgs] = await Promise.all([
    getProgramBySlug(slug),
    getProgramFaqs(slug),
    getTestimonialsByProgram(slug),
    getAllPrograms(),
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
  const eligibility     = fallback(prog.eligibility,     hardcoded?.eligibility)
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
      sameAs: 'https://onlinevgu.in',
    },
    url: `https://onlinevgu.in/programs/${prog.slug}`,
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
      { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://onlinevgu.in' },
      { '@type': 'ListItem', position: 2, name: 'Programs', item: 'https://onlinevgu.in/programs' },
      { '@type': 'ListItem', position: 3, name: prog.name,  item: `https://onlinevgu.in/programs/${prog.slug}` },
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

      <Breadcrumb items={[{ label: 'All Courses', href: '/programs' }, { label: prog.name }]} />

      {/* ══ Hero ══ */}
      <section className="sketch-hover-group relative flex items-center overflow-hidden min-h-[480px] lg:min-h-[560px]">
        {/* Background image + brand-red overlay (50%) - swap heroImage for a program-specific asset */}
        <Image src={heroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div aria-hidden="true" className="absolute inset-0 bg-black/70" />

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
            <p className="anim-load-left mt-6 text-[16px] lg:text-[17px] font-body leading-[1.7] text-white/85 max-w-[620px] line-clamp-3" style={{ animationDelay: '140ms' }}>
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
                  <span className="text-white">July 2026 admissions are open</span>
                  <span className="w-1 h-1 rounded-full bg-white/35 flex-none" />
                  <span className="text-vgu-yellow">12 seats left</span>
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
                  className="group inline-flex items-center gap-3 rounded-md bg-white text-vgu-red font-heading font-bold text-[17px] px-10 py-[18px] transition-all duration-200 shadow-[0_6px_32px_rgba(255,255,255,0.22)] hover:shadow-[0_10px_48px_rgba(255,255,255,0.36)] hover:scale-[1.03] active:scale-[0.98]"
                >
                  Apply Now
                  <IconArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>

                {/* Secondary - ghost */}
                <a
                  href="#"
                  data-brochure-trigger
                  data-program={prog.name}
                  className="group inline-flex items-center gap-2 rounded-md border-2 border-white/60 bg-transparent hover:bg-white/10 hover:border-white text-white font-heading font-semibold text-[15px] px-7 py-[15px] transition-all duration-200"
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

      {/* ══ Main content ══ */}
      <section className="bg-neutral-50 pt-8 pb-12 px-5 md:px-8 lg:px-12 md:pt-10 md:pb-16">
        <div className="mx-auto max-w-[1280px]">

          {/* Back to Programs */}
          <div className="mb-6">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 text-[14px] font-heading font-semibold text-neutral-500 hover:text-vgu-red transition-colors duration-150"
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
                  <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                    Key Outcomes
                  </h2>
                </div>
                <KeyOutcomes outcomes={extras?.keyOutcomes ?? highlights} />
              </div>

              {/* Curriculum */}
              {curriculum && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Curriculum</p>
                    <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-8 lg:text-[32px]">
                      What You&apos;ll Study
                    </h2>
                  </div>
                  <CurriculumPreview curriculum={curriculum} />
                </div>
              )}

              {/* Coursera Premium Banner */}
              <div data-animate="fade-up" className="rounded-2xl overflow-hidden">
                <div className="relative bg-[#0056D2] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Dot texture */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />
                  {/* Depth gradient */}
                  <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent to-black/20" />

                  <div className="relative flex items-center gap-3.5 flex-1 min-w-0">
                    <div className="flex-none w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Image
                        src="/assets/trust/coursera.svg"
                        alt="Coursera"
                        width={30}
                        height={30}
                        className="rounded-md"
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <p className="font-heading font-bold text-[15px] text-white leading-tight">
                          Coursera Premium
                        </p>
                        <span className="rounded-full bg-vgu-yellow px-2.5 py-0.5 text-[10px] font-heading font-bold text-neutral-900">
                          Included Free
                        </span>
                      </div>
                      <p className="text-[12px] font-body text-white/75 leading-snug">
                        7,000+ courses from Google, IBM, Meta &amp; top universities - for the full duration of your program
                      </p>
                    </div>
                  </div>

                  <div className="relative flex flex-wrap gap-2">
                    {['Stackable certifications', 'Learn at your pace', 'Zero extra cost'].map(item => (
                      <span key={item} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1 text-[11px] font-body text-white/90">
                        <span className="text-vgu-yellow font-bold text-[10px]">✓</span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Specialisations */}
              {specialisations.length > 0 && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Focus areas</p>
                    <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                      Specialisations
                    </h2>
                  </div>
                  <SpecialisationCards specialisations={specialisations} />
                </div>
              )}

              {/* Career outcomes */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">Placement records</p>
                  <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
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

            </div>

            {/* ── Right: enrollment card (desktop only) ── */}
            <div className="hidden lg:block sticky top-[100px]">
              <EnrollmentCard prog={prog} />
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

      {/* ══ Faculty ══ */}
      <FacultySection slug={prog.slug} />

      {/* ══ Testimonials ══ */}
      <ProgramTestimonials slug={prog.slug} testimonials={mappedTestimonials} />

      {/* ══ Fees & scholarships ══ */}
      {extras && (
        <FeesScholarships
          totalFee={prog.totalFee}
          duration={prog.duration}
          feeBreakdown={extras.feeBreakdown}
          scholarshipTiers={SCHOLARSHIP_TIERS}
        />
      )}

      <CertificatePreview
        programName={prog.name}
        programFullName={prog.fullName}
        sampleImageUrl={sanityProg?.certificateSampleUrl}
      />

      <AdmissionSteps
        programName={prog.name}
        programLevel={prog.level === 'pg' ? 'pg' : 'ug'}
        eligibility={eligibility}
        documents={REQUIRED_DOCUMENTS}
      />
      <ProgramFAQ slug={prog.slug} faqs={mappedFaqs} />
      <RelatedPrograms programs={relatedPrograms} />

      {/* ══ All Programs CTA ══ */}
      <section className="sketch-hover-group relative bg-neutral-50 border-t border-neutral-200 py-20 px-5 md:px-8 lg:px-12 overflow-hidden">
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
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
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

      {/* ══ Mobile sticky CTA ══ */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-6px_20px_rgba(17,24,39,0.08)] px-4 pt-3"
        style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
      >
        <p className="text-[11px] font-body text-neutral-500 text-center mb-2">
          {prog.feePerYear}{prog.emi ? ` · EMI from ${prog.emi}` : ''}
        </p>
        <div className="flex items-center gap-3">
          <a
            href="#counsellor"
            data-apply-trigger
            data-program={prog.name}
            data-program-level={prog.level}
            className="flex-1 rounded-full bg-vgu-red hover:brightness-90 text-white py-3 text-[14px] font-semibold font-heading text-center transition-all duration-150 shadow-[0_4px_14px_rgba(192,64,54,0.32)]"
          >
            Apply Now
          </a>
          <a
            href="#counsellor"
            data-program={prog.name}
            className="flex-1 rounded-full bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/[0.06] py-3 text-[14px] font-semibold font-heading text-center transition-all duration-150"
          >
            Talk to Counsellor
          </a>
        </div>
      </div>
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

        {/* Coursera Premium callout */}
        <div className="flex items-center gap-3 rounded-xl bg-[#0056D2]/8 border border-[#0056D2]/20 px-4 py-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#0056D2] flex items-center justify-center flex-none shadow-sm">
            <Image src="/assets/trust/coursera.svg" alt="Coursera" width={22} height={22} className="rounded-md" />
          </div>
          <div>
            <p className="font-heading font-bold text-[13px] text-neutral-900">Coursera Premium - Included Free</p>
            <p className="text-[11px] font-body text-neutral-500">7,000+ courses for the full course duration</p>
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
              July 2026 admissions are open
              <span className="w-1 h-1 rounded-full bg-neutral-300 flex-none" />
              <span className="text-vgu-red">12 seats left</span>
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
