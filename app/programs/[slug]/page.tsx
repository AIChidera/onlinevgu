import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PROGRAMMES } from '../data'
import {
  IconChevronRight,
  IconClock,
  IconDownload,
  IconShieldCheck,
  IconArrowRight,
  IconHeadset,
} from '@tabler/icons-react'
import StrokeArt from '@/components/ui/StrokeArt'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ActivityTicker from './ActivityTicker'
import ProgramHighlights from './ProgramHighlights'
import CurriculumPreview, { type CurriculumYear } from './CurriculumPreview'
import FacultySection from './FacultySection'
import HirerStrip from './HirerStrip'
import SpecialisationCards from './SpecialisationCards'
import PlacementStatsStrip from './PlacementStatsStrip'
import AdmissionSteps from './AdmissionSteps'
import CertificatePreview from './CertificatePreview'
import ProgramTestimonials from './ProgramTestimonials'
import ProgramFAQ from './ProgramFAQ'
import RelatedPrograms from './RelatedPrograms'
import ScrollToTop from './ScrollToTop'
import CareerOutcomes from './CareerOutcomes'

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

const SEATS_FILLED: Record<string, number> = {
  'mba':            89,
  'mba-healthcare': 84,
  'bca':            83,
  'mca':            81,
  'bba':            77,
  'bcom':           74,
  'mcom':           72,
  'ba':             68,
  'bsc':            66,
  'ma':             64,
  'mlib':           62,
  'blib':           58,
}

function getSeatsFilled(slug: string): number {
  return SEATS_FILLED[slug] ?? 65
}

// Placeholder hero images per program — replace with real assets when ready.
// Programs without an entry fall back to DEFAULT_HERO_IMAGE.
const HERO_IMAGES: Record<string, string> = {
  'mba':            'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1400&q=80&auto=format&fit=crop',
  'mba-healthcare': 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80&auto=format&fit=crop',
  'bca':            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1400&q=80&auto=format&fit=crop',
  'mca':            'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1400&q=80&auto=format&fit=crop',
  'bba':            'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1400&q=80&auto=format&fit=crop',
  'bcom':           'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1400&q=80&auto=format&fit=crop',
  'mcom':           'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=80&auto=format&fit=crop',
  'ba':             'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1400&q=80&auto=format&fit=crop',
  'ma':             'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80&auto=format&fit=crop',
  'bsc':            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1400&q=80&auto=format&fit=crop',
  'mlib':           'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1400&q=80&auto=format&fit=crop',
  'blib':           'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1400&q=80&auto=format&fit=crop',
}
const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1400&q=80&auto=format&fit=crop'

const PROGRAMS: ProgramDetail[] = [
  {
    slug: 'mba', name: 'MBA', fullName: 'Master of Business Administration',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹85,000/yr', totalFee: '₹1,70,000', emi: '₹7,084/month',
    nextBatch: 'July 2026', popular: true,
    description: "VGU's most sought-after postgraduate degree - designed for working professionals who want to lead, not just manage. You'll build strategic, financial, and leadership expertise through live weekend sessions, real-world case studies, and mentorship from senior industry executives.",
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
      'Open to all streams and professional backgrounds',
    ],
    highlights: [
      'Live weekend classes - attend from anywhere in India',
      '6 specialisations: Finance, Marketing, HR, Operations, Analytics, International Business',
      'Full Coursera licence - 7,000+ courses at zero extra cost',
      'Dedicated placement cell with 500+ hiring partners',
      'AI-proctored exams - appear from home, no exam centre needed',
      'Merit scholarships up to 50% available',
      'UGC-entitled degree - identical to an on-campus MBA certificate',
    ],
    specialisations: ['Finance', 'Marketing', 'Human Resources', 'Operations Management', 'Business Analytics', 'International Business'],
    careerRoles: ['Business Manager', 'Marketing Manager', 'Finance Analyst', 'HR Manager', 'Operations Head', 'Business Analyst', 'Product Manager', 'Entrepreneur'],
    avgSalaryAfter: '₹10-18 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'Grant Thornton', 'TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Bajaj Finserv', 'Kotak Mahindra Bank', 'Reliance Industries', 'Tata Group', 'Mahindra', 'Hindustan Unilever', 'ITC'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', subjects: ['Principles of Management', 'Business Economics', 'Financial Accounting', 'Organisational Behaviour', 'Business Communication'] },
        { label: 'Semester 2', subjects: ['Marketing Management', 'Human Resource Management', 'Business Statistics', 'Operations Management', 'Corporate Law'] },
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', subjects: ['Strategic Management', 'Specialisation Core I', 'Specialisation Core II', 'Business Research Methods', 'Entrepreneurship & Innovation'] },
        { label: 'Semester 4', subjects: ['Specialisation Elective I', 'Specialisation Elective II', 'Capstone Project', 'Industry Internship'] },
      ]},
    ],
  },
  {
    slug: 'mca', name: 'MCA', fullName: 'Master of Computer Applications',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹75,000/yr', totalFee: '₹1,50,000',
    nextBatch: 'July 2026',
    description: 'A rigorous, industry-aligned MCA built for the modern tech landscape. Cover full-stack development, cloud computing, AI/ML, and cybersecurity - all while building real projects, competing in hackathons, and preparing for AWS certification.',
    eligibility: [
      "BCA, B.Sc (IT/CS/Mathematics), or any bachelor's with Mathematics at 10+2",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Industry-aligned curriculum: Python, Java, React, Node.js, AWS',
      '4 specialisations: Data Science, Cloud Computing, AI/ML, Cybersecurity',
      'Hackathons every semester with industry judges',
      'AWS and cloud certification prep tracks',
      'Dedicated tech placement cell',
      'Full Coursera licence with Google, IBM, and Meta courses',
    ],
    specialisations: ['Data Science', 'Cloud Computing', 'AI & Machine Learning', 'Cybersecurity'],
    careerRoles: ['Software Engineer', 'Full-Stack Developer', 'Data Scientist', 'Cloud Architect', 'DevOps Engineer', 'Cybersecurity Analyst', 'AI/ML Engineer'],
    avgSalaryAfter: '₹6-14 LPA',
    topHirers: ['TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'Google', 'Microsoft', 'Cognizant', 'Capgemini', 'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'PhonePe', 'LTIMindtree', 'Mphasis', 'Persistent Systems', 'Oracle', "Byju's", 'Reliance Industries', 'HDFC Bank'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', subjects: ['Python Programming', 'Data Structures & Algorithms', 'Database Management Systems', 'Computer Networks', 'Discrete Mathematics'] },
        { label: 'Semester 2', subjects: ['Web Technologies (HTML/CSS/JS)', 'Operating Systems', 'Object-Oriented Programming (Java)', 'Software Engineering', 'Linux Fundamentals'] },
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', subjects: ['Specialisation Core I', 'Specialisation Core II', 'Cloud Computing (AWS/Azure)', 'Machine Learning Fundamentals', 'Cybersecurity Essentials'] },
        { label: 'Semester 4', subjects: ['Specialisation Elective I', 'Specialisation Elective II', 'Capstone Project', 'Hackathon & Industry Expo'] },
      ]},
    ],
  },
  {
    slug: 'mcom', name: 'M.Com', fullName: 'Master of Commerce',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹55,000/yr', totalFee: '₹1,10,000',
    nextBatch: 'July 2026',
    description: 'A deep-dive into advanced accounting, taxation, financial markets, and corporate law - built for commerce graduates targeting senior finance roles, CA/CMA preparation, or a research career in commerce.',
    eligibility: [
      'B.Com or equivalent from a UGC-recognised university',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Advanced accounting and audit standards',
      'Direct and indirect taxation (GST, income tax)',
      'Financial markets, derivatives, and investment analysis',
      'Corporate law and governance modules',
      'CA/CMA exam prep support',
      'Industry case studies and live projects',
    ],
    specialisations: ['Finance', 'Accounting & Taxation', 'Business Management'],
    careerRoles: ['Senior Accountant', 'Tax Consultant', 'Financial Analyst', 'Audit Manager', 'Finance Controller', 'Investment Analyst'],
    avgSalaryAfter: '₹5-10 LPA',
    topHirers: ['Deloitte', 'KPMG', 'EY', 'PwC', 'Grant Thornton', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Bajaj Finserv', 'HDFC Life', 'ICICI Prudential', 'TCS', 'Infosys', 'Wipro', 'Reliance Industries', 'Tata Group', 'Hindustan Unilever', 'ITC', 'Amazon', 'Accenture', 'Mahindra', "Byju's"],
  },
  {
    slug: 'ma', name: 'MA', fullName: 'Master of Arts',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹50,000/yr', totalFee: '₹1,00,000',
    nextBatch: 'July 2026',
    description: 'A research-oriented postgraduate arts degree ideal for UGC-NET aspirants, civil services candidates, and academics - with specialisations across English, Economics, Political Science, and Sociology.',
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '4 specialisations: English, Economics, Political Science, Sociology',
      'UGC-NET and SLET exam prep guidance',
      'Research methodology and academic writing training',
      'Dissertation and thesis supervision',
      'Faculty with active research publications',
      'Strong foundation for civil services and law',
    ],
    specialisations: ['English', 'Economics', 'Political Science', 'Sociology'],
    careerRoles: ['Assistant Professor', 'Research Analyst', 'Civil Services Officer', 'Journalist', 'Policy Analyst', 'Content Strategist'],
    avgSalaryAfter: '₹4-8 LPA',
    topHirers: ['NDTV', 'The Hindu', 'Times of India', 'HT Media', 'NITI Aayog', 'State PSCs', 'Deloitte', 'KPMG', 'TCS', 'Infosys', 'Amazon', "Byju's", 'Reliance Industries', 'Tata Group', 'Mahindra', 'Hindustan Unilever', 'ITC', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Accenture', 'Wipro', 'NGOs & Think Tanks', 'Flipkart'],
  },
  {
    slug: 'mlib', name: 'M.Lib', fullName: 'Master of Library Science',
    level: 'pg', duration: '1 Year', semesters: 2,
    feePerYear: '₹40,000/yr', totalFee: '₹40,000',
    nextBatch: 'July 2026',
    description: 'Advanced library and information science for professionals seeking senior positions in academic libraries, public institutions, and digital archives.',
    eligibility: [
      'B.Lib or B.Lib.I.Sc from a UGC-recognised university',
      'Minimum 50% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Digital library management and information systems',
      'Archival science and preservation methods',
      'Information retrieval and advanced cataloguing',
      'Research methodology in library science',
      'Qualifies for senior librarian and director roles',
    ],
    specialisations: [],
    careerRoles: ['Senior Librarian', 'Digital Archivist', 'Information Specialist', 'Library Director', 'Knowledge Manager'],
    avgSalaryAfter: '₹4-7 LPA',
    topHirers: ['University Libraries', 'National Library', 'INFLIBNET', 'DELNET', 'State Archives', 'Government Archives', 'School Libraries', 'College Libraries', 'ISRO', 'ICAR', 'NITI Aayog', 'TCS', 'Infosys', 'Amazon', 'Reliance Industries', 'Tata Group', 'HDFC Bank', 'ICICI Bank', 'KPMG', 'Deloitte', "Byju's", 'Accenture', 'Wipro', 'HCL'],
  },
  {
    slug: 'mba-healthcare', name: 'Healthcare MBA', fullName: 'MBA in Healthcare Management',
    level: 'pg', duration: '2 Years', semesters: 4,
    feePerYear: '₹90,000/yr', totalFee: '₹1,80,000',
    nextBatch: 'July 2026',
    description: "An MBA purpose-built for healthcare professionals - blending core management with hospital administration, health policy, pharma operations, and medical finance. Designed for MBBS, BDS, nursing, and allied health graduates who want to lead healthcare organisations.",
    eligibility: [
      "Any bachelor's degree from a UGC-recognised university",
      'Minimum 50% aggregate marks',
      'Preferred: MBBS, BDS, BPT, B.Sc Nursing, BHMS, or allied health background',
      'No entrance exam required',
    ],
    highlights: [
      'Hospital tie-ups for live case studies and projects',
      'Health policy, economics, and medical finance modules',
      '4 specialisations: Hospital Administration, Healthcare Operations, Pharma Management, Health Insurance',
      'CMO and CXO-led live sessions',
      'Dedicated healthcare placement cell',
      'Full Coursera access with healthcare leadership tracks',
    ],
    specialisations: ['Hospital Administration', 'Healthcare Operations', 'Pharma Management', 'Health Insurance'],
    careerRoles: ['Hospital Administrator', 'Healthcare Manager', 'Pharma Operations Head', 'Health Insurance Manager', 'Clinical Operations Lead', 'Healthcare Consultant'],
    avgSalaryAfter: '₹8-14 LPA',
    topHirers: ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Cipla', 'Sun Pharma', "Dr. Reddy's", 'Manipal Hospitals', 'Narayana Health', 'Medanta', 'HDFC Life', 'Deloitte', 'KPMG', 'EY', 'Accenture', 'TCS', 'Wipro', 'HCL', 'IBM', 'HDFC Bank', 'ICICI Bank', 'Reliance Industries', 'Tata Group', 'Mahindra', 'Bajaj Finserv'],
  },
  {
    slug: 'bba', name: 'BBA', fullName: 'Bachelor of Business Administration',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹55,000/yr', totalFee: '₹1,65,000',
    nextBatch: 'July 2026',
    description: 'A comprehensive undergraduate business degree that builds strong management fundamentals alongside practical entrepreneurial skills - ideal for fresh graduates who want to fast-track into a business career or launch their own venture.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream - Science, Commerce, or Arts',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Core business curriculum: Management, Finance, Marketing, Operations',
      'Live startup simulation projects each year',
      'Industry mentors from Fortune 500 companies and startups',
      'Full Coursera licence with 7,000+ professional courses',
      'Dedicated placement support from day one',
      '4 specialisations: Finance, Marketing, HR, International Business',
    ],
    specialisations: ['Finance', 'Marketing', 'Human Resources', 'International Business'],
    careerRoles: ['Business Development Executive', 'Marketing Analyst', 'HR Associate', 'Operations Executive', 'Management Trainee', 'Entrepreneur'],
    avgSalaryAfter: '₹4-8 LPA',
    topHirers: ['Reliance Industries', 'Tata Group', 'Mahindra', 'HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Bajaj Finserv', 'Deloitte', 'KPMG', 'EY', 'Accenture', 'Amazon', 'Flipkart', 'Hindustan Unilever', 'ITC', "Byju's", 'TCS', 'Infosys', 'Wipro', 'HDFC Life', 'Mphasis', 'Persistent Systems'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', subjects: ['Principles of Management', 'Business Mathematics', 'Financial Accounting', 'Business Communication', 'Microeconomics'] },
        { label: 'Semester 2', subjects: ['Marketing Fundamentals', 'Business Law', 'Macroeconomics', 'Organisational Behaviour', 'IT for Business'] },
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', subjects: ['Financial Management', 'Human Resource Management', 'Operations Management', 'Business Research Methods', 'Specialisation Core I'] },
        { label: 'Semester 4', subjects: ['Strategic Management', 'Entrepreneurship', 'Specialisation Core II', 'Business Analytics Basics'] },
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', subjects: ['Specialisation Elective I', 'Specialisation Elective II', 'International Business', 'Project Management'] },
        { label: 'Semester 6', subjects: ['Industry Internship', 'Capstone Business Simulation', 'Leadership & Ethics', 'Startup Studio'] },
      ]},
    ],
  },
  {
    slug: 'bca', name: 'BCA', fullName: 'Bachelor of Computer Applications',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹60,000/yr', totalFee: '₹1,80,000',
    nextBatch: 'July 2026',
    description: "Build a career in software development with hands-on coding, modern frameworks, and real-world projects. VGU's BCA covers the full development stack - from programming fundamentals to cloud and AI - preparing you for immediate employment or higher studies.",
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Mathematics or Computer Science preferred',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Full-stack curriculum: Python, Java, React, Node.js',
      '4 specialisations: Data Science, Cloud Computing, Cybersecurity, Software Engineering',
      'Hackathons and a capstone project in the final year',
      'Open-source contribution programme',
      'AWS fundamentals and cloud certification prep',
      'Tech internship placement support',
    ],
    specialisations: ['Data Science', 'Cloud Computing', 'Cybersecurity', 'Software Engineering'],
    careerRoles: ['Junior Software Developer', 'Frontend Developer', 'Backend Developer', 'Data Analyst', 'Web Developer', 'IT Support Specialist'],
    avgSalaryAfter: '₹10-15 LPA',
    topHirers: ['TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Tech Mahindra', 'Accenture', 'Amazon', 'Google', 'Microsoft', 'Cognizant', 'Capgemini', 'Flipkart', 'Swiggy', 'Zomato', 'Paytm', 'PhonePe', 'LTIMindtree', 'Mphasis', 'Persistent Systems', 'Oracle', "Byju's", 'Reliance Industries', 'HDFC Bank'],
    curriculum: [
      { year: 'Year 1', semesters: [
        { label: 'Semester 1', subjects: ['Programming in C', 'Mathematics I', 'Web Design Basics (HTML/CSS)', 'Digital Fundamentals', 'English Communication'] },
        { label: 'Semester 2', subjects: ['Python Programming', 'Mathematics II', 'Database Concepts (SQL)', 'Data Structures', 'Operating Systems'] },
      ]},
      { year: 'Year 2', semesters: [
        { label: 'Semester 3', subjects: ['Java OOP', 'Computer Networks', 'Frontend Development (React)', 'Software Engineering', 'Specialisation Core I'] },
        { label: 'Semester 4', subjects: ['Backend Development (Node.js)', 'Cloud Computing Basics (AWS)', 'Algorithms', 'Linux & Shell Scripting'] },
      ]},
      { year: 'Year 3', semesters: [
        { label: 'Semester 5', subjects: ['Specialisation Elective I', 'Specialisation Elective II', 'DevOps & CI/CD', 'Open-Source Contribution Project'] },
        { label: 'Semester 6', subjects: ['Capstone Full-Stack Project', 'Hackathon Expo', 'Tech Interview Prep', 'Industry Internship'] },
      ]},
    ],
  },
  {
    slug: 'bcom', name: 'B.Com', fullName: 'Bachelor of Commerce',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹45,000/yr', totalFee: '₹1,35,000',
    nextBatch: 'July 2026',
    description: 'A solid foundation in accounting, finance, taxation, and business law - the most popular undergraduate commerce degree in India, now 100% online. Ideal for students preparing for CA articleship, banking careers, or corporate finance roles.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Commerce, Science, or Arts stream accepted',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Core subjects: Financial Accounting, Business Law, Taxation, Economics',
      'Tally, ERP, and accounting software hands-on training',
      'ICAI articleship eligibility upon graduation',
      '3 specialisations: Accounting & Finance, Business Management, Taxation',
      'Electives in banking, insurance, and financial markets',
      'Professional certificates via Coursera included',
    ],
    specialisations: ['Accounting & Finance', 'Business Management', 'Taxation'],
    careerRoles: ['Accountant', 'Tax Consultant', 'Banking Officer', 'Finance Executive', 'CA Articleship', 'Audit Assistant'],
    avgSalaryAfter: '₹3-7 LPA',
    topHirers: ['HDFC Bank', 'ICICI Bank', 'SBI', 'Axis Bank', 'Kotak Mahindra Bank', 'Bajaj Finserv', 'HDFC Life', 'ICICI Prudential', 'Deloitte', 'KPMG', 'EY', 'PwC', 'Grant Thornton', 'TCS', 'Infosys', 'Wipro', 'Reliance Industries', 'Tata Group', 'Mahindra', 'Hindustan Unilever', 'ITC', 'Amazon', 'Accenture', "Byju's"],
  },
  {
    slug: 'ba', name: 'BA', fullName: 'Bachelor of Arts',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹40,000/yr', totalFee: '₹1,20,000',
    nextBatch: 'July 2026',
    description: 'A flexible, interdisciplinary undergraduate degree across English, Economics, Political Science, and Sociology - a strong academic foundation for civil services, law, journalism, academia, and the social sector.',
    eligibility: [
      '10+2 or equivalent from any recognised board',
      'Any stream accepted',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '4 specialisations: English, Economics, Political Science, Sociology',
      'Strong foundation for UPSC and state civil services',
      'Academic writing and critical thinking curriculum',
      'Electives in History, Public Administration, and Philosophy',
      'Research project in the final year',
      'Faculty with active research backgrounds',
    ],
    specialisations: ['English', 'Economics', 'Political Science', 'Sociology'],
    careerRoles: ['Civil Services Officer (UPSC)', 'Journalist', 'Content Writer', 'Teacher', 'Social Worker', 'Policy Researcher'],
    avgSalaryAfter: '₹3-6 LPA',
    topHirers: ['NDTV', 'The Hindu', 'Times of India', 'HT Media', 'NITI Aayog', 'UPSC', 'State PSCs', 'Deloitte', 'KPMG', 'TCS', 'Infosys', 'Amazon', "Byju's", 'Reliance Industries', 'Tata Group', 'Hindustan Unilever', 'ITC', 'HDFC Bank', 'ICICI Bank', 'Accenture', 'Wipro', 'NGOs & Think Tanks', 'Flipkart', 'Mahindra'],
  },
  {
    slug: 'bsc', name: 'B.Sc', fullName: 'Bachelor of Science',
    level: 'ug', duration: '3 Years', semesters: 6,
    feePerYear: '₹50,000/yr', totalFee: '₹1,50,000',
    nextBatch: 'July 2026',
    description: 'A science degree focused on Mathematics, Statistics, and Computer Science - ideal for students targeting data analytics, actuarial science, research roles, or a seamless pathway into MCA or M.Sc.',
    eligibility: [
      '10+2 with Science and Mathematics from any recognised board',
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      '3 specialisations: Computer Science, Mathematics, Environmental Science',
      'Data science and Python programming tracks',
      'Statistics and probability for analytics careers',
      'Research project in the final year',
      'Strong pathway to MCA, M.Sc, or data roles',
      'Coursera data analytics and science certificates included',
    ],
    specialisations: ['Computer Science', 'Mathematics', 'Environmental Science'],
    careerRoles: ['Data Analyst', 'Research Associate', 'Statistician', 'Lab Technician', 'Environmental Consultant', 'IT Support'],
    avgSalaryAfter: '₹3-7 LPA',
    topHirers: ['TCS', 'Infosys', 'Wipro', 'HCL', 'IBM', 'Accenture', 'Amazon', 'Cognizant', 'ISRO', 'ICAR', 'Google', 'Microsoft', 'Flipkart', "Byju's", 'Reliance Industries', 'Tata Group', "Dr. Reddy's", 'KPMG', 'Deloitte', 'HDFC Bank', 'ICICI Bank', 'Oracle', 'LTIMindtree', 'Environmental Labs'],
  },
  {
    slug: 'blib', name: 'B.Lib', fullName: 'Bachelor of Library Science',
    level: 'ug', duration: '1 Year', semesters: 2,
    feePerYear: '₹35,000/yr', totalFee: '₹35,000',
    nextBatch: 'July 2026',
    description: 'A one-year professional qualification in library and information science - the standard entry credential for librarian positions in schools, colleges, public libraries, and government institutions.',
    eligibility: [
      "Any bachelor's degree from a recognised university",
      'Minimum 45% aggregate marks',
      'No entrance exam required',
    ],
    highlights: [
      'Library management systems and cataloguing techniques',
      'Digital library and e-resource management',
      'School and college library administration',
      'Standard qualification for government librarian recruitment',
      'Direct pathway to M.Lib for career advancement',
    ],
    specialisations: [],
    careerRoles: ['School Librarian', 'College Librarian', 'Public Library Assistant', 'Digital Archivist', 'Information Assistant'],
    avgSalaryAfter: '₹2.5-5 LPA',
    topHirers: ['School Libraries', 'College Libraries', 'University Libraries', 'National Library', 'INFLIBNET', 'DELNET', 'State Archives', 'Government Archives', 'ISRO', 'ICAR', 'NITI Aayog', 'TCS', 'Infosys', 'Amazon', 'Reliance Industries', 'Tata Group', 'HDFC Bank', 'ICICI Bank', "Byju's", 'Accenture', 'Wipro', 'Mahindra', 'KPMG', 'Deloitte'],
  },
]

const PROGRAM_MAP = new Map(PROGRAMS.map(p => [p.slug, p]))
const PROG_IMAGE  = new Map(PROGRAMMES.map(p => [p.slug, p.image]))

const RELATED: Record<string, string[]> = {
  'mba':            ['mca', 'bba', 'mcom'],
  'mca':            ['bca', 'mba', 'bsc'],
  'mba-healthcare': ['mba', 'mca', 'bca'],
  'bca':            ['mca', 'bsc', 'bba'],
  'bba':            ['bca', 'mba', 'bcom'],
  'bcom':           ['bba', 'ba', 'mcom'],
  'mcom':           ['bcom', 'mba', 'ma'],
  'ma':             ['ba', 'mcom', 'mba'],
  'ba':             ['bba', 'bcom', 'bsc'],
  'bsc':            ['bca', 'ba', 'mca'],
  'mlib':           ['blib', 'ma', 'ba'],
  'blib':           ['mlib', 'ba', 'ma'],
}

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return PROGRAMS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const prog = PROGRAM_MAP.get(slug)
  if (!prog) return { title: 'Program not found' }
  return {
    title: `${prog.name} Online - ${prog.fullName} | VGU`,
    description: prog.description,
    alternates: { canonical: `https://onlinevgu.in/programs/${prog.slug}` },
    openGraph: {
      title: `${prog.name} Online - ${prog.fullName} | VGU`,
      description: prog.description,
      url: `https://onlinevgu.in/programs/${prog.slug}`,
    },
  }
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params
  const prog = PROGRAM_MAP.get(slug)
  if (!prog) notFound()

  const seatsFilled = getSeatsFilled(prog.slug)
  const heroImage   = prog.heroImage ?? HERO_IMAGES[prog.slug] ?? DEFAULT_HERO_IMAGE
  const totalFeeNumeric = prog.totalFee.replace(/[^0-9]/g, '')

  const relatedPrograms = (RELATED[prog.slug] ?? [])
    .flatMap(s => { const p = PROGRAM_MAP.get(s); return p ? [{ slug: p.slug, name: p.name, fullName: p.fullName, level: p.level, duration: p.duration, feePerYear: p.feePerYear, image: PROG_IMAGE.get(s) }] : [] })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: `${prog.fullName} Online - Vivekananda Global University`,
    description: prog.description,
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

  return (
    <div className="pb-16 lg:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'All Courses', href: '/programs' }, { label: prog.name }]} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden">
        {/* Background image — swap heroImage on the program object for a program-specific asset */}
        <Image src={heroImage} alt="" fill className="object-cover object-center" sizes="100vw" priority />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(192,64,54,0.88) 0%, rgba(130,26,18,0.92) 100%)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="opacity-40 absolute inset-0">
          <StrokeArt variant="dark" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-12 md:py-14 lg:py-20 grid grid-cols-1 xl:grid-cols-[55fr_45fr] gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Badges */}
            <div className="anim-load-left flex flex-wrap items-center gap-2 mb-5" style={{ animationDelay: '0ms' }}>
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
            <h1 className="anim-load-left font-heading font-black text-[38px] tracking-[-2px] leading-[0.95] text-white sm:text-[48px] lg:text-[64px]" style={{ animationDelay: '70ms' }}>
              {prog.name}
            </h1>
            <p className="anim-load-left mt-2.5 text-[15px] font-body text-white/65 tracking-[-0.2px] lg:text-[17px]" style={{ animationDelay: '100ms' }}>
              {prog.fullName}
            </p>
            <p className="anim-load-left mt-4 text-[14px] font-body leading-[1.7] text-white/80 max-w-[520px] md:text-[15px] lg:text-[16px]" style={{ animationDelay: '140ms' }}>
              {prog.description}
            </p>

            {/* Stat chips */}
            <div className="anim-load-left mt-7 flex flex-wrap gap-2.5" style={{ animationDelay: '210ms' }}>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-[13px] font-body font-semibold text-white">
                <IconClock size={14} stroke={1.5} />
                {prog.duration} · {prog.semesters} semesters
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-[13px] font-body font-semibold text-white">
                {prog.feePerYear} annual
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-[13px] font-body font-semibold text-white">
                Total {prog.totalFee}
              </span>
              {prog.emi && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/25 border border-vgu-yellow/40 px-4 py-2 text-[13px] font-body font-semibold text-vgu-yellow">
                  EMI from {prog.emi}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-yellow/25 border border-vgu-yellow/40 px-4 py-2 text-[13px] font-body font-semibold text-vgu-yellow">
                ★ 4.8/5 · 2,400+ reviews
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-4 py-2 text-[13px] font-body font-semibold text-white">
                🔥 {seatsFilled}% seats filled
              </span>
            </div>

            {/* Next batch chip */}
            <div className="anim-load-left mt-3 inline-flex items-center gap-2.5" style={{ animationDelay: '250ms' }}>
              <span className="relative flex h-2 w-2 flex-none">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="text-[13px] font-body font-semibold text-white/70">
                Next batch: <span className="text-white">{prog.nextBatch}</span> · Admissions open
              </span>
            </div>

            {/* CTAs */}
            <div className="anim-load-left mt-8 flex flex-wrap gap-3" style={{ animationDelay: '310ms' }}>
              <a
                href="#counsellor"
                data-apply-trigger
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white hover:bg-transparent text-vgu-red hover:text-white font-heading font-semibold text-[15px] px-8 py-3.5 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              >
                Apply Now
                <IconArrowRight size={16} />
              </a>
              <a
                href="#"
                data-brochure-trigger
                data-program={prog.name}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-transparent hover:bg-white text-white hover:text-vgu-red font-heading font-semibold text-[15px] px-7 py-3.5 transition-all duration-200"
              >
                <IconDownload size={16} />
                Download Brochure
              </a>
            </div>
          </div>

          {/* ── Right: placeholder + floating badges ── */}
          <div className="hidden xl:flex items-center justify-center">
            <div className="relative w-full py-8">
              <div className="relative w-full aspect-[4/3]">

                {/* Badge 1 - top-left */}
                <div
                  className="absolute -top-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.22)] border border-neutral-200"
                  style={{ animationDelay: '0s' }}
                >
                  <div className="font-heading font-black text-[20px] leading-none text-vgu-red">UGC</div>
                  <div className="mt-1 text-[11px] font-body text-neutral-600">Recognised degree</div>
                </div>

                {/* Badge 2 - top-right */}
                <div
                  className="absolute -top-3 right-5 z-10 animate-float-up flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_8px_28px_rgba(17,24,39,0.22)] border border-neutral-200"
                  style={{ animationDelay: '2s' }}
                >
                  <span className="relative flex h-2.5 w-2.5 flex-none">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>
                  <div>
                    <div className="font-heading text-[12px] font-bold text-neutral-900">Admissions Open</div>
                    <div className="text-[10px] font-body text-neutral-600">No entrance exam</div>
                  </div>
                </div>

                {/* Badge 3 - bottom-left: seats progress */}
                <div
                  className="absolute -bottom-5 left-5 z-10 animate-float-up rounded-2xl bg-white px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.22)] border border-neutral-200 min-w-[190px]"
                  style={{ animationDelay: '0.7s' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-heading font-bold text-[13px] text-neutral-900">{seatsFilled}% seats filled</span>
                    <span className="text-[11px] font-body text-vgu-red font-semibold">Limited</span>
                  </div>
                  <div className="h-2 rounded-full bg-neutral-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-vgu-yellow to-vgu-red"
                      style={{ width: `${seatsFilled}%` }}
                    />
                  </div>
                  <div className="mt-1 text-[10px] font-body text-neutral-500">for {prog.nextBatch} batch</div>
                </div>

                {/* Badge 4 - bottom-right */}
                <div
                  className={[
                    'absolute -bottom-3 right-5 z-10 animate-float-up rounded-2xl px-4 py-3 shadow-[0_8px_28px_rgba(17,24,39,0.22)] border',
                    prog.popular
                      ? 'bg-vgu-yellow border-vgu-yellow'
                      : 'bg-white border-neutral-200',
                  ].join(' ')}
                  style={{ animationDelay: '1.3s' }}
                >
                  {prog.popular ? (
                    <>
                      <div className="font-heading font-black text-[17px] leading-none text-neutral-900">★ #1</div>
                      <div className="mt-0.5 text-[11px] font-body font-semibold text-neutral-700">Most Popular</div>
                    </>
                  ) : (
                    <>
                      <div className="font-heading font-black text-[17px] leading-none text-vgu-red">{prog.nextBatch}</div>
                      <div className="mt-0.5 text-[11px] font-body text-neutral-600">Next batch</div>
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <ActivityTicker />
      <PlacementStatsStrip slug={prog.slug} />

      {/* ══ Main content ══ */}
      <section className="bg-white py-12 px-5 md:px-8 lg:px-12 md:py-16">
        <div className="mx-auto max-w-[1280px]">

          {/* Back to Programs */}
          <div className="mb-10">
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
            <div className="flex flex-col gap-14 min-w-0">

              {/* Highlights */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">What you get</p>
                  <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-8 lg:text-[32px]">
                    Program Highlights
                  </h2>
                </div>
                <ProgramHighlights highlights={prog.highlights} />
              </div>

              {/* Curriculum */}
              {prog.curriculum && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">Curriculum</p>
                    <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-8 lg:text-[32px]">
                      What You&apos;ll Study
                    </h2>
                  </div>
                  <CurriculumPreview curriculum={prog.curriculum} />
                </div>
              )}

              {/* Specialisations */}
              {prog.specialisations.length > 0 && (
                <div>
                  <div data-animate="fade-up">
                    <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">Focus areas</p>
                    <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                      Specialisations
                    </h2>
                  </div>
                  <SpecialisationCards specialisations={prog.specialisations} />
                </div>
              )}

              {/* Career outcomes */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">After graduation</p>
                  <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                    Career Outcomes
                  </h2>
                </div>
                <CareerOutcomes roles={prog.careerRoles} />
                {prog.topHirers && prog.topHirers.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[12px] font-body font-bold uppercase tracking-[0.06em] text-neutral-400 mb-4">Top hirers</p>
                    <HirerStrip hirers={prog.topHirers} />
                  </div>
                )}
              </div>

              {/* Eligibility */}
              <div>
                <div data-animate="fade-up">
                  <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">Entry criteria</p>
                  <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-6 lg:text-[32px]">
                    Eligibility
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {prog.eligibility.map((e, ei) => {
                    const GRADS = [
                      'linear-gradient(135deg,#C04036,#821a12)',
                      'linear-gradient(135deg,#2563eb,#1d4ed8)',
                      'linear-gradient(135deg,#7c3aed,#4c1d95)',
                      'linear-gradient(135deg,#059669,#065f46)',
                      'linear-gradient(135deg,#d97706,#92400e)',
                    ]
                    const grad = GRADS[ei % GRADS.length]
                    return (
                      <div
                        key={e}
                        data-animate="fade-up"
                        style={{ animationDelay: `${ei * 80}ms` }}
                        className="group/crit flex items-start gap-4 rounded-2xl bg-white border border-neutral-200 p-5 hover:border-neutral-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(17,24,39,0.07)] transition-all duration-200"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex-none flex items-center justify-center text-[15px] font-heading font-black text-white shadow-sm transition-transform duration-200 group-hover/crit:scale-110"
                          style={{ background: grad }}
                        >
                          {String(ei + 1).padStart(2, '0')}
                        </div>
                        <p className="text-[14px] font-body leading-snug text-neutral-800 pt-2">{e}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>

            {/* ── Right: enrollment card (desktop only) ── */}
            <div className="hidden lg:block sticky top-[100px]">
              <EnrollmentCard prog={prog} seatsFilled={seatsFilled} />
            </div>

          </div>
        </div>
      </section>

      <AdmissionSteps />
      <CertificatePreview programName={prog.name} programFullName={prog.fullName} />
      <FacultySection slug={prog.slug} />
      <ProgramTestimonials slug={prog.slug} />
      <ProgramFAQ slug={prog.slug} />
      <RelatedPrograms programs={relatedPrograms} />

      {/* ══ All Programs CTA ══ */}
      <section className="bg-neutral-50 border-t border-neutral-200 py-16 px-5 md:px-8 lg:px-12">
        <div data-animate="fade-up" className="mx-auto max-w-[1280px] text-center">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Explore more
          </p>
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 mb-3 lg:text-[32px]">
            Not sure this is the right program?
          </h2>
          <p className="text-[16px] font-body leading-[1.7] text-neutral-500 max-w-[440px] mx-auto mb-8">
            Browse all {PROGRAMS.length} UG and PG programs and find the one that fits your goals and background.
          </p>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2.5 rounded-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red px-8 py-3.5 text-[15px] font-semibold font-heading transition-all duration-200 shadow-[0_4px_16px_rgba(192,64,54,0.28)] hover:shadow-[0_2px_8px_rgba(192,64,54,0.12)]"
          >
            <IconArrowRight size={16} className="rotate-180" />
            All Programs
          </Link>
        </div>
      </section>

      {/* ══ Mobile sticky CTA ══ */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 px-4 pt-3 flex items-center gap-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
        <a
          href="#counsellor"
          data-apply-trigger
          className="flex-1 rounded-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red py-2.5 text-[14px] font-semibold font-heading text-center transition-all duration-150"
        >
          Apply Now
        </a>
        <a
          href="#counsellor"
          className="flex-1 rounded-full border-2 border-neutral-200 hover:border-vgu-red text-neutral-700 hover:text-vgu-red py-2.5 text-[14px] font-semibold font-heading text-center transition-all duration-150"
        >
          Talk to Counsellor
        </a>
      </div>

      <ScrollToTop />
    </div>
  )
}

function EnrollmentCard({ prog, seatsFilled }: { prog: ProgramDetail; seatsFilled: number }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(17,24,39,0.08)] overflow-hidden">

      {/* Red header */}
      <div
        className="px-6 pt-6 pb-4"
        style={{ background: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)' }}
      >
        <p className="text-[11px] font-body font-bold uppercase tracking-[0.08em] text-white/55 mb-1">Annual Fee</p>
        <div className="font-heading font-black text-[40px] leading-none text-white">{prog.feePerYear}</div>
        <p className="text-[13px] font-body text-white/65 mt-2">Total program cost: {prog.totalFee}</p>
        {prog.emi && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 border border-white/20 px-3.5 py-1.5 text-[12px] font-body font-semibold text-white">
            No-cost EMI from {prog.emi}
          </div>
        )}

        {/* Seats progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[12px] font-body font-bold text-white/80">{seatsFilled}% seats filled</span>
            <span className="text-[11px] font-body text-vgu-yellow font-semibold">Only {100 - seatsFilled} left</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-vgu-yellow to-white/90"
              style={{ width: `${seatsFilled}%` }}
            />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6">

        {/* Scholarship callout */}
        <div className="flex items-center gap-3 rounded-xl bg-vgu-yellow/10 border border-vgu-yellow/25 px-4 py-3 mb-4">
          <span className="text-vgu-yellow text-[18px] flex-none leading-none">★</span>
          <div>
            <p className="font-heading font-bold text-[13px] text-neutral-900">Merit scholarships available</p>
            <p className="text-[11px] font-body text-neutral-500">Up to 50% fee waiver for eligible students</p>
          </div>
        </div>

        {/* Next batch */}
        <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 px-4 py-3 mb-5">
          <span className="relative flex h-2.5 w-2.5 flex-none">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <div>
            <p className="font-heading font-bold text-[13px] text-neutral-900">Next batch: {prog.nextBatch}</p>
            <p className="text-[11px] font-body text-neutral-500">Limited seats - admissions now open</p>
          </div>
        </div>

        {/* Apply */}
        <a
          href="#counsellor"
          data-apply-trigger
          className="w-full flex items-center justify-center gap-2 rounded-full border-2 border-vgu-red bg-vgu-red hover:bg-white text-white hover:text-vgu-red py-3.5 text-[15px] font-semibold font-heading text-center transition-all duration-200 mb-3 shadow-[0_4px_16px_rgba(192,64,54,0.28)]"
        >
          Apply Now
          <IconArrowRight size={16} />
        </a>

        {/* Brochure */}
        <a
          href="#"
          data-brochure-trigger
          data-program={prog.name}
          className="w-full flex items-center justify-center gap-2 rounded-full border-2 border-vgu-red bg-transparent hover:bg-vgu-red text-vgu-red hover:text-white py-3 text-[14px] font-semibold font-heading text-center transition-all duration-200"
        >
          <IconDownload size={15} />
          Download Brochure
        </a>

        {/* Counsellor link */}
        <a
          href="#counsellor"
          className="w-full flex items-center justify-center gap-1.5 text-[13px] font-body font-semibold text-neutral-500 hover:text-vgu-red transition-colors duration-150 mt-2 py-1"
        >
          <IconHeadset size={14} />
          Talk to a Counsellor
        </a>

        {/* Trust signals */}
        <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-wrap gap-2">
          {[
            'UGC Recognised',
            'NAAC A+',
            'No entrance exam',
          ].map(label => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-[11px] font-body font-semibold text-neutral-600">
              <IconShieldCheck size={11} className="text-vgu-red flex-none" />
              {label}
            </span>
          ))}
        </div>

      </div>
    </div>
  )
}
