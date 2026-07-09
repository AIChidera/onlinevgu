// Rich per-program data layered on top of the base PROGRAMS array in page.tsx.
// All values here are sensible placeholders aligned with VGU positioning -
// safe to source from CMS later via the same `fallback()` pattern.

export interface SalaryByRole { role: string; range: string; description?: string }
export interface Persona      { persona: string; description: string }
export interface DeptAtGlance { alumniPlaced: string; faculty: string; batchesCompleted: string; hiringPartners: string }
export interface FeeBreakdown { tuition: string; exam: string; tech: string; total: string; oneTime: string }

export interface ProgramExtras {
  overview:        string[]            // 2 short paragraphs
  whoItsFor:       Persona[]           // 3 personas
  deptAtGlance:    DeptAtGlance
  keyOutcomes:     string[]            // 4-6 outcome statements
  salariesByRole:  SalaryByRole[]      // role + range per career role
  feeBreakdown:    FeeBreakdown        // annual breakdown
}

// ============================================================
// SHARED across all programs (university-level policy)
// ============================================================

export const LIVE_SCHEDULE = {
  days:    'Saturday & Sunday',
  hours:   '10:00 AM - 1:00 PM IST',
  cadence: 'Weekly during academic terms',
}

export const SAMPLE_WEEK: { day: string; activity: string; hours: string }[] = [
  { day: 'Mon-Fri', activity: 'Self-paced LMS modules, recorded lectures and assignments', hours: '8-10 hrs total' },
  { day: 'Saturday', activity: 'Live faculty session and case discussion',                   hours: '3 hrs' },
  { day: 'Sunday',   activity: 'Live faculty session and Q&A',                               hours: '3 hrs' },
]

export const LMS_PLATFORM   = 'VGU Learning Platform - works on mobile and desktop'
export const MENTOR_CADENCE = 'Monthly 1-on-1 with a programme mentor'
export const COHORT_SIZE    = '110-140 learners per batch'

export const REQUIRED_DOCUMENTS: { name: string; note: string; level?: 'ug' | 'pg'; optional?: boolean }[] = [
  { name: '10th marksheet & passing certificate', note: 'Scanned PDF or image, both sides' },
  { name: '12th marksheet & passing certificate', note: 'Required for all admissions' },
  { name: "Bachelor's degree marksheet & certificate", note: 'For postgraduate admissions only', level: 'pg' },
  { name: 'Government photo ID',                  note: 'Aadhaar, PAN, Passport, or Driving License' },
  { name: 'Passport-size photograph',             note: 'Recent, white background, JPG or PNG' },
  { name: 'Category certificate',                 note: 'Only if claiming reservation', optional: true },
]

export const SCHOLARSHIP_TIERS: { criteria: string; benefit: string }[] = [
  { criteria: '90% or above in qualifying exam',           benefit: '50% tuition waiver' },
  { criteria: '80 to 89% in qualifying exam',              benefit: '25% tuition waiver' },
  { criteria: '70 to 79% in qualifying exam',              benefit: '15% tuition waiver' },
  { criteria: 'Defence personnel and dependants',          benefit: '25% tuition waiver' },
  { criteria: 'State or national sports achievers',        benefit: '25 to 50% tuition waiver' },
  { criteria: 'Differently-abled with valid certificate',  benefit: '25% tuition waiver' },
]

export const CAREER_SERVICES: { title: string; detail: string }[] = [
  { title: 'Personal placement officer', detail: 'Dedicated coach assigned to every batch' },
  { title: 'Resume & LinkedIn review',   detail: 'Two rounds of feedback from industry coaches' },
  { title: 'Mock interviews',            detail: '3+ HR and technical rounds before drives' },
  { title: 'Alumni network',             detail: '12,000+ alumni across India and the GCC' },
]

// ============================================================
// PER-PROGRAM rich data
// ============================================================

export const PROGRAM_EXTRAS: Record<string, ProgramExtras> = {

  // ── MBA ──────────────────────────────────────────────
  mba: {
    overview: [
      "The Online MBA at VGU is a two-year UGC-entitled degree designed for working professionals who want to move into senior management without pausing their careers. Live weekend classes are taught by faculty drawn from VGU's full-time MBA programme, with eight specialisation tracks ranging from Marketing to International Business.",
      "Beyond the core curriculum, learners get free Coursera Premium access for the full duration, a dedicated placement cell, and structured case-based learning that mirrors how decisions are made inside Indian companies. The degree certificate carries no 'online' tag - it is identical to the on-campus MBA awarded by VGU.",
    ],
    whoItsFor: [
      { persona: 'Working professionals targeting promotion',  description: '2-7 years experience, ready to move from individual contributor to team lead or manager.' },
      { persona: 'Mid-career managers eyeing leadership',      description: '7+ years experience, looking for an MBA that fits around a senior role and family commitments.' },
      { persona: 'Founders and intrapreneurs',                 description: 'Building or operating a business and need the financial, strategy and operations toolkit to scale.' },
    ],
    deptAtGlance: { alumniPlaced: '5,800+', faculty: '85', batchesCompleted: '24', hiringPartners: '500+' },
    keyOutcomes: [
      'Lead cross-functional teams of 5-15 people across marketing, finance and operations.',
      'Read a P&L, build a 3-year financial model and present it to the board.',
      'Run end-to-end strategy projects using case-method analysis and structured frameworks.',
      'Negotiate vendor contracts, partnerships and salaries with confidence.',
      'Build and defend a business plan good enough to raise external funding.',
    ],
    salariesByRole: [
      { role: 'Business Manager',               range: '₹9-15 LPA',  description: 'Runs day-to-day operations and drives unit performance.' },
      { role: 'Finance Director',               range: '₹18-28 LPA', description: 'Leads financial planning, reporting, and compliance.' },
      { role: 'Marketing Manager',              range: '₹10-16 LPA', description: 'Plans brand campaigns and drives customer acquisition.' },
      { role: 'HR Manager',                     range: '₹9-14 LPA',  description: 'Handles recruitment, performance, and employee relations.' },
      { role: 'Operations Manager',             range: '₹10-16 LPA', description: 'Manages supply chain, vendors, and process improvement.' },
      { role: 'Healthcare Administrator',       range: '₹11-18 LPA', description: 'Runs hospital ops, clinic networks, and billing systems.' },
      { role: 'IT Manager',                     range: '₹14-22 LPA', description: 'Oversees tech infrastructure and digital transformation.' },
      { role: 'International Business Manager', range: '₹15-24 LPA', description: 'Manages cross-border trade and overseas partnerships.' },
    ],
    feeBreakdown: { tuition: '₹60,000', exam: '₹9,000', tech: '₹6,000', total: '₹75,000', oneTime: '₹1,500' },
  },

  // ── MBA-IF ───────────────────────────────────────────
  'mba-if': {
    overview: [
      "The MBA in International Finance is a specialised two-year online MBA with embedded ACCA, CMA or FM professional certification tracks - taken at roughly 60% less than the cost of pursuing those qualifications separately. It is built for finance professionals who want a global accounting credential alongside an Indian MBA.",
      "Faculty for the finance core include practitioners with CFA charters and international banking backgrounds. The final semester adds an AI for Finance module covering machine learning applications in forecasting, fraud detection and portfolio analysis.",
    ],
    whoItsFor: [
      { persona: 'Finance professionals targeting a global role',  description: 'CA articles, FP&A analysts or treasury staff who want the ACCA or CMA credential alongside an Indian MBA.' },
      { persona: 'Commerce graduates entering finance',            description: 'B.Com or BBA graduates looking for a credential-heavy first MBA that opens international finance doors.' },
      { persona: 'Mid-career bankers and consultants',             description: 'Professionals in retail or corporate banking looking to specialise into investment banking, treasury or risk.' },
    ],
    deptAtGlance: { alumniPlaced: '1,400+', faculty: '32', batchesCompleted: '12', hiringPartners: '240+' },
    keyOutcomes: [
      'Pass the ACCA, CMA or FM foundation papers as part of your degree assessment.',
      'Build IFRS-compliant financial statements from raw ledger data.',
      'Run a corporate valuation using DCF and comparable-company methods.',
      'Hedge currency and commodity risk for a mid-sized exporter.',
      'Use AI tools for forecasting, fraud detection and portfolio screening.',
    ],
    salariesByRole: [
      { role: 'CFO',                  range: '₹28-50 LPA' },
      { role: 'Finance Director',     range: '₹22-35 LPA' },
      { role: 'Investment Analyst',   range: '₹14-22 LPA' },
      { role: 'Portfolio Manager',    range: '₹18-30 LPA' },
      { role: 'Financial Analyst',    range: '₹10-16 LPA' },
      { role: 'Risk Manager',         range: '₹16-24 LPA' },
      { role: 'Treasury Analyst',     range: '₹12-20 LPA' },
      { role: 'Forex Trader',         range: '₹14-26 LPA' },
    ],
    feeBreakdown: { tuition: '₹95,000', exam: '₹15,000', tech: '₹10,000', total: '₹1,20,000', oneTime: '₹1,500' },
  },

  // ── MBA-DFAA ─────────────────────────────────────────
  'mba-dfaa': {
    overview: [
      "The MBA in Digital Finance and Accounting Analytics is a two-year online MBA that pairs the standard management core with the modern digital finance and accounting stack. The programme is built for the finance and accounting professional whose day job is being reshaped by digital payments, cloud ERP, and analytics.",
      "Learners cover Power BI and analytics pipelines from Semester 1, run financial modelling and audit analytics projects in Semester 3, and close with an AI for Finance and Accounting module and a capstone project in the final semester.",
    ],
    whoItsFor: [
      { persona: 'CA articles and finance analysts',        description: 'Early-career finance professionals who want an MBA that keeps pace with digital-first CFO expectations.' },
      { persona: 'FP&A and management-accounting staff',    description: 'Analysts and controllers looking to add analytics, modelling and audit-tech skills to their profile.' },
      { persona: 'FinTech and payments professionals',      description: 'Operators inside digital payment, lending or wealth-tech companies stepping into product or finance-lead roles.' },
    ],
    deptAtGlance: { alumniPlaced: '400+', faculty: '28', batchesCompleted: '3', hiringPartners: '180+' },
    keyOutcomes: [
      'Build accounting analytics pipelines from spreadsheets into Power BI.',
      'Run a full DCF valuation and defend the assumptions in a stakeholder review.',
      'Design a monthly close in a cloud ERP - Zoho, NetSuite or SAP S/4HANA.',
      'Apply AI and machine learning to forecasting, fraud detection and audit sampling.',
      'Move into digital finance, FP&A analytics, or audit-tech roles at Big Four and product companies.',
    ],
    salariesByRole: [
      { role: 'Finance Analyst',              range: '₹8-14 LPA' },
      { role: 'FP&A Analyst',                 range: '₹10-18 LPA' },
      { role: 'Accounting Analytics Lead',    range: '₹12-20 LPA' },
      { role: 'FinTech Product Analyst',      range: '₹12-22 LPA' },
      { role: 'Audit Analytics Manager',      range: '₹14-24 LPA' },
      { role: 'Digital Finance Manager',      range: '₹15-26 LPA' },
      { role: 'Controller',                   range: '₹16-28 LPA' },
      { role: 'Risk & Compliance Analyst',    range: '₹10-18 LPA' },
    ],
    feeBreakdown: { tuition: '₹80,000', exam: '₹12,000', tech: '₹8,000', total: '₹1,00,000', oneTime: '₹1,500' },
  },

  // ── BBA-AAFT ─────────────────────────────────────────
  'bba-aaft': {
    overview: [
      "The BBA in Media & Entertainment Management is a three-year online BBA delivered in partnership with the Asian Academy of Film and Television - AAFT, founded in 1993 and one of India's oldest media institutions. It combines a full BBA business core with the operating knowledge of the film, television, streaming, advertising and live entertainment industries.",
      "Learners cover production management, OTT platform economics, IP and licensing, media analytics and event management alongside the standard BBA subjects. The programme closes with a capstone media business plan - a pitch-ready proposal for a real venture or IP.",
    ],
    whoItsFor: [
      { persona: 'Fresh 10+2 students targeting media',          description: 'Students who want to work in film, TV, streaming or advertising, and need a UGC-recognised business degree that matches the industry.' },
      { persona: 'Content creators going professional',           description: 'YouTubers, podcasters and independent filmmakers who need business fundamentals to scale their work into a company.' },
      { persona: 'Family businesses in media and events',         description: 'Successors preparing to take over a family production house, event agency or media property.' },
    ],
    deptAtGlance: { alumniPlaced: '600+', faculty: '32', batchesCompleted: '3', hiringPartners: '210+' },
    keyOutcomes: [
      'Manage a small production shoot end-to-end - budget, crew, schedule and delivery.',
      'Read a streaming platform economics deck and evaluate a content acquisition deal.',
      'Draft a content licensing agreement with correct rights and revenue-share clauses.',
      'Plan and run a mid-sized live event with sponsorship, ticketing and vendor management.',
      'Move into MBA admission or entry-level roles at production houses, agencies and platforms.',
    ],
    salariesByRole: [
      { role: 'Production Coordinator',        range: '₹4-7 LPA' },
      { role: 'Line Producer',                 range: '₹6-12 LPA' },
      { role: 'Content Strategist',            range: '₹5-10 LPA' },
      { role: 'OTT Operations Executive',      range: '₹5-9 LPA' },
      { role: 'Talent Manager',                range: '₹4-8 LPA' },
      { role: 'Advertising Account Executive', range: '₹4-8 LPA' },
      { role: 'Event Manager',                 range: '₹4-9 LPA' },
      { role: 'PR Executive',                  range: '₹4-8 LPA' },
    ],
    feeBreakdown: { tuition: '₹48,000', exam: '₹7,000', tech: '₹5,000', total: '₹60,000', oneTime: '₹1,500' },
  },

  // ── MCA ──────────────────────────────────────────────
  mca: {
    overview: [
      "The Online MCA is a two-year master's in computer applications built around the modern tech stack - Java and Python core, then deep specialisation in AI, cloud computing or cybersecurity. Coursework alternates between conceptual modules and applied projects every semester.",
      "Learners get hackathon participation, semester capstones with industry judges, and certification prep tracks for AWS, Azure and cybersecurity. Placements lean heavily towards mid-size product companies and the IT services majors.",
    ],
    whoItsFor: [
      { persona: 'BCA and B.Sc graduates moving up',              description: 'Fresh CS or IT graduates wanting a UGC-entitled master\'s without a 2-year campus commitment.' },
      { persona: 'Working developers chasing senior roles',       description: '2-5 years coding experience, need the credential to move into architect or lead positions.' },
      { persona: 'Non-CS engineers switching to software',        description: 'Engineers from mechanical, civil or electrical streams who want a structured route into software.' },
    ],
    deptAtGlance: { alumniPlaced: '4,100+', faculty: '68', batchesCompleted: '20', hiringPartners: '420+' },
    keyOutcomes: [
      'Ship a production-grade application from scratch using Python or Java.',
      'Train and deploy a basic ML model to production using cloud infrastructure.',
      'Design and secure a multi-tier system across AWS or Azure.',
      'Run penetration tests using industry-standard ethical-hacking tools.',
      'Lead a small dev team and walk through your code in technical interviews.',
    ],
    salariesByRole: [
      { role: 'Software Developer',          range: '₹6-12 LPA' },
      { role: 'Data Scientist',              range: '₹10-18 LPA' },
      { role: 'Machine Learning Engineer',   range: '₹12-20 LPA' },
      { role: 'Cybersecurity Analyst',       range: '₹8-15 LPA' },
      { role: 'DevOps Engineer',             range: '₹10-18 LPA' },
      { role: 'Web Developer',               range: '₹6-10 LPA' },
      { role: 'Blockchain Developer',        range: '₹10-18 LPA' },
      { role: 'Database Administrator',      range: '₹7-13 LPA' },
    ],
    feeBreakdown: { tuition: '₹60,000', exam: '₹9,000', tech: '₹6,000', total: '₹75,000', oneTime: '₹1,500' },
  },

  // ── BCA ──────────────────────────────────────────────
  bca: {
    overview: [
      "The Online BCA is a three-year undergraduate degree in computer applications, with six specialisation tracks covering Artificial Intelligence, Blockchain, Cloud Computing, UX Design, Data Science and General Programming. Coding labs run every semester, and the final-year Major Project sits at the centre of the placement portfolio.",
      "Designed for fresh 10+2 students and early-career professionals, the programme is structured around live weekend sessions, self-paced LMS material and project-based assessment. It is UGC-entitled and qualifies graduates for MCA admission at any Indian university.",
    ],
    whoItsFor: [
      { persona: 'Fresh 10+2 students entering tech',             description: 'Looking for a flexible undergraduate degree that lets you start working or freelancing while you study.' },
      { persona: 'Working IT-support staff',                       description: 'Help-desk and infrastructure professionals who want to move into development or analytics roles.' },
      { persona: 'Career switchers from non-tech backgrounds',     description: 'People rebuilding careers in tech who need a structured foundation without quitting their day job.' },
    ],
    deptAtGlance: { alumniPlaced: '3,600+', faculty: '54', batchesCompleted: '18', hiringPartners: '380+' },
    keyOutcomes: [
      'Write, test and ship code in C, C++, Java and Python.',
      'Build full-stack web applications with a database back end.',
      'Apply machine learning to a real dataset and present the result.',
      'Use Git, AWS basics and standard developer tools in a team setting.',
      'Walk into MCA or industry interviews with a 4-project portfolio.',
    ],
    salariesByRole: [
      { role: 'Software Developer',     range: '₹4-8 LPA' },
      { role: 'AI Developer',           range: '₹6-12 LPA' },
      { role: 'ML Engineer',            range: '₹6-14 LPA' },
      { role: 'Data Analyst',           range: '₹4-9 LPA' },
      { role: 'UX/UI Designer',         range: '₹5-10 LPA' },
      { role: 'Blockchain Developer',   range: '₹6-14 LPA' },
      { role: 'Cloud Engineer',         range: '₹6-12 LPA' },
      { role: 'Cybersecurity Analyst',  range: '₹5-11 LPA' },
      { role: 'Web Application Developer', range: '₹4-9 LPA' },
    ],
    feeBreakdown: { tuition: '₹35,000', exam: '₹5,000', tech: '₹4,000', total: '₹44,000', oneTime: '₹1,500' },
  },

  // ── BBA ──────────────────────────────────────────────
  bba: {
    overview: [
      "The Online BBA is a three-year undergraduate business degree built for students who want to enter the workforce or start a venture quickly. Four specialisation tracks cover General Management, Digital Marketing, Retail Management and FinTech, each anchored by a Research Project and Corporate Readiness module in the final year.",
      "The course is taught largely through case studies and live group exercises - the same teaching method used in MBA programmes - so graduates leave with the analytical reflexes employers expect from a business hire.",
    ],
    whoItsFor: [
      { persona: 'Fresh 10+2 students aimed at corporate jobs',   description: 'A flexible business degree that lets you intern, freelance or start a side business while you study.' },
      { persona: 'Family-business successors',                     description: 'Students preparing to take over a family enterprise and need formal business education to do it well.' },
      { persona: 'Working sales and operations staff',             description: 'Early-career professionals in sales, retail or operations who need the credential to be promoted.' },
    ],
    deptAtGlance: { alumniPlaced: '3,100+', faculty: '48', batchesCompleted: '18', hiringPartners: '360+' },
    keyOutcomes: [
      'Build a basic profit-and-loss statement and read a balance sheet.',
      'Run a small digital marketing campaign end-to-end with paid and organic channels.',
      'Use Excel and Google Sheets at a business-analyst level.',
      'Draft a 1-page business plan and pitch it to non-finance stakeholders.',
      'Move into MBA admission or junior management roles immediately after graduation.',
    ],
    salariesByRole: [
      { role: 'Business Analyst',                range: '₹4-8 LPA' },
      { role: 'Management Trainee',              range: '₹4-7 LPA' },
      { role: 'Customer Relationship Manager',   range: '₹3-6 LPA' },
      { role: 'Digital Marketing Executive',     range: '₹4-8 LPA' },
      { role: 'SEO/SEM Specialist',              range: '₹4-9 LPA' },
      { role: 'Retail Store Manager',            range: '₹4-7 LPA' },
      { role: 'FinTech Associate',               range: '₹5-9 LPA' },
      { role: 'Operations Coordinator',          range: '₹3-6 LPA' },
    ],
    feeBreakdown: { tuition: '₹35,000', exam: '₹5,000', tech: '₹4,000', total: '₹44,000', oneTime: '₹1,500' },
  },

  // ── BA ───────────────────────────────────────────────
  ba: {
    overview: [
      "The Online BA is a three-year liberal-arts undergraduate degree with eight specialisation streams - Economics, Political Science, Psychology, Public Policy, International Relations, English Literature, History and Computer Applications. It is the flagship preparation route at VGU for civil services aspirants and academia-bound students.",
      "Year 1 includes hands-on Microsoft Office and Visual Design modules, Year 3 closes with Computer Applications and Environmental Science. The breadth is intentional - graduates exit with a strong general-knowledge foundation alongside their chosen specialisation.",
    ],
    whoItsFor: [
      { persona: 'UPSC and state civil services aspirants',       description: 'Students who want a structured undergraduate degree that aligns with civil services prelims and mains preparation.' },
      { persona: 'Future journalists, lawyers and academics',     description: 'Career paths that depend on critical reading, structured writing and humanities depth.' },
      { persona: 'Working professionals needing a graduation',    description: 'Mid-career staff who skipped college and need a UGC-recognised graduation to clear the eligibility bar.' },
    ],
    deptAtGlance: { alumniPlaced: '2,100+', faculty: '38', batchesCompleted: '18', hiringPartners: '220+' },
    keyOutcomes: [
      'Write structured, evidence-backed essays in formal academic English.',
      'Read and summarise long-form reports - government, policy or research.',
      'Use research databases and standard citation formats to support claims.',
      'Sit for UGC-NET, UPSC prelims or state PSC examinations with a solid base.',
      'Move into MA, MBA, LLB or PG-Diploma admission anywhere in India.',
    ],
    salariesByRole: [
      { role: 'Economic Analyst',          range: '₹4-8 LPA' },
      { role: 'Policy Analyst',            range: '₹5-10 LPA' },
      { role: 'ESG Analyst',               range: '₹5-9 LPA' },
      { role: 'Content Writer',            range: '₹3-6 LPA' },
      { role: 'Social Media Strategist',   range: '₹3-7 LPA' },
      { role: 'Editor',                    range: '₹4-8 LPA' },
      { role: 'Civil Services Officer',    range: '₹7-14 LPA' },
      { role: 'UX Researcher',             range: '₹6-12 LPA' },
      { role: 'Data Analyst',              range: '₹4-8 LPA' },
      { role: 'Journalist',                range: '₹3-7 LPA' },
    ],
    feeBreakdown: { tuition: '₹19,000', exam: '₹3,000', tech: '₹2,000', total: '₹24,000', oneTime: '₹1,500' },
  },

  // ── MA ───────────────────────────────────────────────
  ma: {
    overview: [
      "The Online MA in English is a two-year specialised master's that covers British, American and Indian literature in English across all four semesters, with structured Language & Linguistics modules every term. It closes with a full-credit Dissertation in Semester 4 supervised by a faculty advisor.",
      "The syllabus is aligned with the UGC-NET Paper II structure for English, making it a strong route for aspirants of academic and research careers. Civil services candidates use it for optional-subject depth, and content professionals use it for academic credibility.",
    ],
    whoItsFor: [
      { persona: 'UGC-NET aspirants',                              description: 'Students preparing for the UGC-NET English paper who want a structured master\'s alongside it.' },
      { persona: 'Civil services candidates',                      description: 'UPSC and PSC aspirants choosing English Literature as an optional subject.' },
      { persona: 'Working content and editorial professionals',    description: 'Writers, editors and journalists who need the postgraduate credential to move into senior roles.' },
    ],
    deptAtGlance: { alumniPlaced: '1,200+', faculty: '24', batchesCompleted: '14', hiringPartners: '180+' },
    keyOutcomes: [
      'Apply critical theory frameworks to a literary text and defend the reading in writing.',
      'Produce a 10,000-word dissertation with proper structure, citation and argument.',
      'Sit for UGC-NET English paper with strong topical and theoretical coverage.',
      'Teach undergraduate English at a university or college level.',
      'Move into editorial, content-strategy or academic-publishing roles.',
    ],
    salariesByRole: [
      { role: 'Content Writer',           range: '₹4-7 LPA' },
      { role: 'Copywriter',               range: '₹4-8 LPA' },
      { role: 'Editor',                   range: '₹5-10 LPA' },
      { role: 'Proofreader',              range: '₹3-6 LPA' },
      { role: 'Lecturer',                 range: '₹5-9 LPA' },
      { role: 'UGC-NET Qualified Teacher', range: '₹6-12 LPA' },
      { role: 'Civil Services Officer',   range: '₹8-15 LPA' },
      { role: 'Researcher',               range: '₹5-10 LPA' },
    ],
    feeBreakdown: { tuition: '₹29,000', exam: '₹4,000', tech: '₹3,000', total: '₹36,000', oneTime: '₹1,500' },
  },

  // ── MSc ──────────────────────────────────────────────
  msc: {
    overview: [
      "The Online M.Sc in Mathematics is a two-year postgraduate degree covering advanced pure and applied mathematics - abstract algebra, topology, integral transforms, tensor analysis and fluid mechanics - alongside applied programming modules in MAT-LAB and C++.",
      "Semester 4 closes with a credit-heavy research project and an Artificial Intelligence module that bridges classical mathematics into modern data science. The syllabus aligns with UGC-NET Mathematics for academic-track aspirants.",
    ],
    whoItsFor: [
      { persona: 'B.Sc Mathematics graduates moving to research',  description: 'Students aiming for Ph.D. admission, NET-JRF qualification or quantitative research roles.' },
      { persona: 'School and college teachers',                    description: 'Educators looking to upgrade to a postgraduate qualification while continuing to teach.' },
      { persona: 'Aspiring quants and data scientists',            description: 'Math graduates targeting analytics, actuarial science or quant-finance roles after the degree.' },
    ],
    deptAtGlance: { alumniPlaced: '920+', faculty: '22', batchesCompleted: '14', hiringPartners: '200+' },
    keyOutcomes: [
      'Solve advanced ODEs and PDEs using analytical and numerical methods.',
      'Use MAT-LAB and C++ to model real engineering and finance problems.',
      'Sit for UGC-NET, GATE or actuarial exams with a strong foundation.',
      'Read peer-reviewed mathematics papers and present the proofs.',
      'Apply for Ph.D. admissions or take entry-level quant or analytics roles.',
    ],
    salariesByRole: [
      { role: 'Data Analyst',                   range: '₹5-10 LPA' },
      { role: 'Data Scientist',                 range: '₹8-14 LPA' },
      { role: 'Actuarial Science Professional', range: '₹7-15 LPA' },
      { role: 'Operations Research Analyst',    range: '₹6-12 LPA' },
      { role: 'Quantitative Analyst',           range: '₹10-20 LPA' },
      { role: 'Lecturer',                       range: '₹5-9 LPA' },
      { role: 'Statistician',                   range: '₹6-12 LPA' },
    ],
    feeBreakdown: { tuition: '₹29,000', exam: '₹4,000', tech: '₹3,000', total: '₹36,000', oneTime: '₹1,500' },
  },

  // ── MAJMC ────────────────────────────────────────────
  majmc: {
    overview: [
      "The Online MA in Journalism & Mass Communication is a two-year master's that pairs communication theory with production skills across print, radio, television, digital journalism, advertising and public relations.",
      "Production-heavy modules include Photography, Video Production Techniques and Multimedia Journalism. The final semester adds a Research Project alongside specialist modules in Digital, Rural and Environment Journalism.",
    ],
    whoItsFor: [
      { persona: 'Working reporters and producers',                description: 'Newsroom and production staff who need the postgraduate credential to climb into editorial or producer roles.' },
      { persona: 'PR and corporate-communication professionals',   description: 'Agency and in-house communications staff specialising into senior strategist roles.' },
      { persona: 'Content creators going professional',            description: 'YouTubers, podcasters and freelancers wanting a formal communications foundation.' },
    ],
    deptAtGlance: { alumniPlaced: '870+', faculty: '26', batchesCompleted: '14', hiringPartners: '220+' },
    keyOutcomes: [
      'Report, write and file a news story under deadline pressure.',
      'Shoot, edit and publish a 3-minute video package end-to-end.',
      'Plan and execute a PR campaign with measurable outcomes.',
      'Build and run a multi-channel content strategy across digital platforms.',
      'Sit for UGC-NET in Mass Communication or move into senior editorial roles.',
    ],
    salariesByRole: [
      { role: 'Reporter',                      range: '₹3-7 LPA' },
      { role: 'Anchor',                        range: '₹5-12 LPA' },
      { role: 'Podcast Creator',               range: '₹4-10 LPA' },
      { role: 'Video Producer',                range: '₹5-11 LPA' },
      { role: 'Advertising Copywriter',        range: '₹4-9 LPA' },
      { role: 'PR Manager',                    range: '₹6-14 LPA' },
      { role: 'Digital Marketing Executive',   range: '₹4-9 LPA' },
      { role: 'Media Analyst',                 range: '₹5-10 LPA' },
    ],
    feeBreakdown: { tuition: '₹29,000', exam: '₹4,000', tech: '₹3,000', total: '₹36,000', oneTime: '₹1,500' },
  },
}
