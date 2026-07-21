/**
 * Seed Sanity with every content type EXCEPT programs (seed-programs.ts handles those).
 * Mirrors the hardcoded fallbacks currently rendered by:
 *   - Footer / Hero / Impact:        siteSettings
 *   - Testimonials section:          testimonial (4)
 *   - Home FAQ accordion:            faq (8)
 *   - Campus Immersions carousel:    campusEvent (5)
 *   - About page timeline:           milestone (8)
 *   - Per-program Faculty section:   faculty (96 entries across 12 programs)
 *
 * Uses createOrReplace with deterministic IDs so re-running is safe.
 * Images are downloaded from their source URLs once, uploaded to Sanity,
 * then referenced - admins can replace any of them in Studio later.
 *
 * Run: npx tsx scripts/seed-content.ts
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

// ─── Image upload helper ────────────────────────────────────────────────────
// Cache uploaded asset refs so the same URL is only uploaded once even if it
// appears across multiple docs (faculty M1, F1… are reused heavily).

const uploadCache = new Map<string, string>()

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  if (uploadCache.has(url)) return uploadCache.get(url)!
  try {
    const resp = await fetch(url)
    if (!resp.ok) {
      console.warn(`  ! image fetch failed: ${resp.status} ${url}`)
      return null
    }
    const buf = Buffer.from(await resp.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename })
    uploadCache.set(url, asset._id)
    return asset._id
  } catch (e) {
    console.warn(`  ! image upload failed: ${(e as Error).message}`)
    return null
  }
}

function imageRef(assetId: string | null) {
  return assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined
}

// ─── Site Settings ──────────────────────────────────────────────────────────

async function seedSiteSettings() {
  console.log('\n→ Site Settings')
  await client.createOrReplace({
    _id:   'siteSettings',
    _type: 'siteSettings',
    nextBatch:           'July 2026',
    admissionsOpen:      true,
    phoneDisplay:        '+91 80350 18677',
    whatsappNumber:      '919549086333',
    admissionsEmail:     'admissions@onlinevgu.com',
    address:             'Vivekananda Global University, Jaipur, Rajasthan 303012',
    statLearners:        '50,000+',
    statCountries:       '40+',
    statPlacement:       '95%',
    statRating:          '4.8/5',
    statPrograms:        '30+',
    statHiringPartners:  '500+',
    statCourseraCount:   '7,000+',
    statYearEstablished: '2012',
    socialInstagram:     'https://www.instagram.com/vgujaipur/',
    socialLinkedIn:      'https://www.linkedin.com/school/vgu/',
    socialFacebook:      'https://www.facebook.com/vgujpr',
    socialYouTube:       'https://www.youtube.com/@VGUVITCampusJaipur',
    socialX:             'https://x.com/JaipurVgu',
  })
  console.log('  ✓ siteSettings document')
}

// ─── Testimonials (4, all shown on homepage) ────────────────────────────────

const TESTIMONIALS = [
  {
    id: 'testimonial-priya-sharma', name: 'Priya Sharma', role: 'MBA · Batch 2023', program: 'MBA',
    quote: 'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal: live sessions on weekends, recorded lectures I could replay at midnight. My salary jumped 40% within six months of graduating.',
    outcomes: ['40% salary hike', 'Placed at Deloitte', 'Promoted in 6 months'],
    avatarUrl: 'https://images.unsplash.com/photo-1607189200597-4d0923ef98c6?w=200&q=80&auto=format&fit=crop&crop=faces',
    colorTheme: 'red', videoLabel: "Priya's journey · 2 min",
  },
  {
    id: 'testimonial-arjun-mehta', name: 'Arjun Mehta', role: 'BCA · Batch 2024', program: 'BCA',
    quote: "The coding curriculum covered Docker, Kubernetes, and React. By final semester I already had three freelance clients. VGU's placement cell got me into Infosys Digital before the exams were even over.",
    outcomes: ['3 freelance clients', 'Infosys Digital offer', 'Full-stack engineer'],
    avatarUrl: 'https://images.unsplash.com/photo-1581382575275-97901c2635b7?w=200&q=80&auto=format&fit=crop&crop=faces',
    colorTheme: 'blue', videoLabel: "Arjun's story · 2 min",
  },
  {
    id: 'testimonial-kavya-nair', name: 'Kavya Nair', role: 'MBA Healthcare · Batch 2023', program: 'MBA Healthcare',
    quote: "Hospital administration is a niche I never thought I could enter without a clinical background. VGU's healthcare MBA opened those doors. Apollo Hospitals called me before convocation.",
    outcomes: ['Apollo Hospitals offer', 'Healthcare manager', 'Zero entrance exam'],
    avatarUrl: 'https://images.unsplash.com/photo-1463335361701-e90f4c5045d0?w=200&q=80&auto=format&fit=crop&crop=faces',
    colorTheme: 'green', videoLabel: "Kavya's experience · 3 min",
  },
  {
    id: 'testimonial-rahul-verma', name: 'Rahul Verma', role: 'MCA · Batch 2024', program: 'MCA',
    quote: 'The Coursera integration meant I was simultaneously earning IBM and Google certificates while completing my MCA. My cloud architecture project got me hired. The placement cell connected me with Amazon India before I even graduated.',
    outcomes: ['Amazon India offer', 'IBM & Google certs', 'Cloud architect role'],
    avatarUrl: 'https://images.unsplash.com/photo-1649433658557-54cf58577c68?w=200&q=80&auto=format&fit=crop&crop=faces',
    colorTheme: 'purple', videoLabel: "Rahul's outcome · 2 min",
  },
]

async function seedTestimonials() {
  console.log('\n→ Testimonials')
  let order = 1
  for (const t of TESTIMONIALS) {
    const assetId = await uploadImageFromUrl(t.avatarUrl, `${t.id}.jpg`)
    await client.createOrReplace({
      _id: t.id, _type: 'testimonial',
      name: t.name, role: t.role, program: t.program, quote: t.quote, outcomes: t.outcomes,
      ...(assetId ? { avatar: imageRef(assetId) } : {}),
      colorTheme: t.colorTheme, videoLabel: t.videoLabel,
      showOnHomePage: true, displayOrder: order++,
    })
    console.log(`  ✓ ${t.name}`)
  }
}

// ─── Home FAQs (8) ──────────────────────────────────────────────────────────

const HOME_FAQS = [
  ['Are VGU online degrees valid and recognised by employers?',
    "Yes. VGU's online degrees are UGC-entitled (under the UGC's Distance Education Bureau), which means they carry the same legal standing as on-campus degrees from UGC-recognised universities. They are accepted by government employers, PSUs, and private companies alike."],
  ['Do I need to visit the campus at any point?',
    'No. Admissions, coursework, exams, and graduation are all 100% online. There is no mandatory campus visit. Optional on-campus immersion workshops are organised periodically but are never compulsory.'],
  ['Can I pursue a VGU online degree while working full-time?',
    'Absolutely - the programs are designed for working professionals. Live sessions are scheduled on evenings and weekends, and all classes are recorded so you can study at midnight or 6am, at your own pace.'],
  ['What is the minimum eligibility for online programs?',
    "For UG programs (B.Com, BBA, BCA, BA, B.Sc, B.Lib): 10+2 or equivalent from any recognised board, any stream, minimum 45% marks. For PG programs (MBA, MCA, M.Com, MA, M.Lib, Healthcare MBA): any bachelor's degree from a UGC-recognised university, minimum 50% marks."],
  ['Is there an entrance exam?',
    "No entrance exam is required for admission to VGU's online programs. Admission is based on merit from your qualifying examination marks."],
  ['How are exams conducted?',
    'Exams are conducted online through our AI-proctored exam portal at the end of each semester. You appear from home using a laptop with a webcam. The system ensures academic integrity without requiring a physical exam centre.'],
  ['What EMI options are available?',
    'No-cost EMI plans start at ₹2,999/month through 12 partner banks including HDFC, ICICI, Axis, SBI, and Kotak. You can also pay semester-wise. Merit scholarships of up to 50% are available.'],
  ['Will the degree certificate mention "online" or "distance"?',
    'No. The degree certificate issued by Vivekananda Global University does not state "online" or "distance." It is identical in format and language to the on-campus degree certificate.'],
]

async function seedFaqs() {
  console.log('\n→ Home FAQs')
  let i = 1
  for (const [q, a] of HOME_FAQS) {
    const id = `faq-home-${String(i).padStart(2, '0')}`
    await client.createOrReplace({
      _id: id, _type: 'faq',
      question: q, answer: a, programSlug: '', displayOrder: i,
    })
    console.log(`  ✓ ${i}. ${q.slice(0, 60)}…`)
    i++
  }
}

// ─── Campus Events (5) ──────────────────────────────────────────────────────

const CAMPUS_EVENTS = [
  {
    id: 'event-welcome-orientation',
    title: 'Panache, the annual cultural fest',
    subtitle: 'Three nights of dance, music, food, and the loudest VGU sing-along of the year.',
    tags: [{ label: 'Flagship', color: 'gold' }],
    colorTheme: 'red',
    photoUrl: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'event-industry-bootcamp',
    title: 'Open-air movie nights',
    subtitle: 'Friday screenings on the quad, with projector, snacks, and a few hundred students under one sky.',
    tags: [{ label: 'Social', color: 'gold' }],
    colorTheme: 'blue',
    photoUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'event-alumni-connect',
    title: 'Workshops & guest seminars',
    subtitle: 'Industry leaders and visiting faculty take you deep on AI, finance, design, and leadership.',
    tags: [{ label: 'Learn', color: 'gold' }],
    colorTheme: 'purple',
    photoUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'event-tech-innovation-lab',
    title: 'Hackathons & bootcamps',
    subtitle: 'Build real products in 48 hours with industry mentors, then pitch to recruiters on day three.',
    tags: [{ label: 'Build', color: 'gold' }],
    colorTheme: 'green',
    photoUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=85&auto=format&fit=crop',
  },
  {
    id: 'event-convocation',
    title: 'Convocation on campus',
    subtitle: 'Walk the stage, collect your degree, and celebrate two years of work with family by your side.',
    tags: [{ label: 'Milestone', color: 'gold' }],
    colorTheme: 'orange',
    photoUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&q=85&auto=format&fit=crop',
  },
]

async function seedCampusEvents() {
  console.log('\n→ Campus Events')
  let order = 1
  for (const e of CAMPUS_EVENTS) {
    const assetId = await uploadImageFromUrl(e.photoUrl, `${e.id}.jpg`)
    await client.createOrReplace({
      _id: e.id, _type: 'campusEvent',
      title: e.title, subtitle: e.subtitle, tags: e.tags, colorTheme: e.colorTheme,
      ...(assetId ? { photo: imageRef(assetId) } : {}),
      displayOrder: order++,
    })
    console.log(`  ✓ ${e.title}`)
  }
}

// ─── Milestones (About page, 8) ─────────────────────────────────────────────

const MILESTONES = [
  [2012, 'University established in Jaipur, Rajasthan'],
  [2015, 'First UGC-DEB approved online programs launched'],
  [2018, 'NAAC accreditation - A grade achieved'],
  [2019, 'Online division scaled - programs open to learners nationwide'],
  [2021, 'NAAC A+ reaccreditation - highest grade achieved'],
  [2022, 'Coursera institutional partnership - 7,000+ courses added free for all students'],
  [2023, '50,000+ online learners milestone crossed'],
  [2024, 'WES Canada recognition extended to online programs'],
] as const

async function seedMilestones() {
  console.log('\n→ Milestones')
  for (const [year, event] of MILESTONES) {
    const id = `milestone-${year}`
    await client.createOrReplace({
      _id: id, _type: 'milestone', year, event,
    })
    console.log(`  ✓ ${year}: ${event.slice(0, 60)}…`)
  }
}

// ─── Faculty (96 entries) ───────────────────────────────────────────────────
// Curated portrait pool - Unsplash IDs verified live before commit, weighted
// toward Indian/South-Asian academics so faculty headshots feel local rather
// than generic. uploadImageFromUrl caches by URL so each photo only uploads
// once even when reused across programs. Admins can replace any face in Studio.

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&q=80&auto=format&fit=crop&crop=faces`

// Male / male-presenting portraits (15 unique - verified Indian/South Asian)
const M = [
  u('1581382575275-97901c2635b7'),  // Indian professional, Bangalore
  u('1649433658557-54cf58577c68'),  // Indian young man, headshot
  u('1552642986-ccb41e7059e7'),     // Indian man, Bangalore
  u('1480429370139-e0132c086e2a'),  // Indian businessman, suit
  u('1616002851413-ebcc9611139d'),  // Indian man, professional
  u('1607081692251-d689f1b9af84'),  // South Asian man, professional
  u('1542183669-c4c74d629b34'),     // Indian man, Visakhapatnam
  u('1534339480783-6816b68be29c'),  // Indian man, Chandigarh
  u('1531123897727-8f129e1688ce'),  // Indian businessman
  u('1633332755192-727a05c4013d'),  // Older Indian man
  u('1622253692010-333f2da6031d'),  // Older South-Asian man
  u('1542178243-bc20204b769f'),     // Indian man, suit
  u('1614204424926-196a80bf0be8'),  // Indian professional
  u('1599566150163-29194dcaad36'),  // Indian gentleman
  u('1581091226825-a6a2a5aee158'),  // Indian man, casual-formal
]

// Female / female-presenting portraits (15 unique - verified Indian/South Asian)
const F = [
  u('1463335361701-e90f4c5045d0'),  // Indian woman, bindi portrait
  u('1607189200597-4d0923ef98c6'),  // Indian woman, Delhi
  u('1573165850883-9b0e18c44bd2'),  // South Asian woman, professional
  u('1618245472177-2a74ad3b994a'),  // Indian woman, portrait
  u('1646979201225-00e36437d09e'),  // Indian woman, red shawl
  u('1637589267610-6c66fc2a086b'),  // South Asian woman, business suit
  u('1759840278381-bf7d5e332050'),  // Indian woman, red kurta, West Bengal
  u('1728053914354-e1e3e09f6239'),  // Indian woman, blue shirt, Jabalpur
  u('1531746020798-e6953c6e8e04'),  // Indian woman, professional
  u('1607746882042-944635dfe10e'),  // Indian woman, teacher
  u('1573497620053-ea5300f94f21'),  // Indian woman, business
  u('1611432579699-484f7990b127'),  // Indian woman, professional
  u('1554151228-14d9def656e4'),     // Indian woman, formal
  u('1573496359142-b8d87734a5a2'),  // Indian woman, academic
  u('1573497019940-1c28c88b4f3e'),  // Indian woman, professional
]

type FacultyEntry = { name: string; title: string; credential: string; initials: string; color: 'red'|'blue'|'purple'|'amber'|'green'; sex: 'm' | 'f' }

const FACULTY: Record<string, FacultyEntry[]> = {
  mba: [
    { name: 'Dr. Rajesh Kumar',     title: 'Professor, Strategic Management',          credential: 'PhD, IIM Ahmedabad · 22 yrs exp',       initials: 'RK',  color: 'red',    sex: 'm'       },
    { name: 'Prof. Priya Sharma',   title: 'Associate Professor, Finance',             credential: 'MBA, XLRI · CFA Charterholder',         initials: 'PS',  color: 'blue',   sex: 'f'       },
    { name: 'Dr. Ankit Mehta',      title: 'Industry Faculty, Marketing',              credential: 'Ex-CMO, Hindustan Unilever · 18 yrs',   initials: 'AM',  color: 'purple', sex: 'm'       },
    { name: 'Prof. Sunita Tiwari',  title: 'Associate Professor, HR & OB',             credential: 'PhD, Symbiosis · SHRM Certified',       initials: 'ST',  color: 'amber',  sex: 'f'       },
    { name: 'Dr. Vikram Nair',      title: 'Professor, International Business',        credential: 'PhD, IIFT Delhi · 16 yrs exp',          initials: 'VN',  color: 'green',  sex: 'm'       },
    { name: 'Prof. Arunima Bose',   title: 'Associate Professor, Business Analytics',  credential: 'MS Analytics, ISB · 12 yrs exp',        initials: 'AB',  color: 'red',    sex: 'f'       },
    { name: 'Dr. Rohit Kapoor',     title: 'Faculty, Entrepreneurship',                credential: 'PhD, SRCC · Serial entrepreneur',       initials: 'RKp', color: 'blue',   sex: 'm'       },
    { name: 'Prof. Meenakshi Iyer', title: 'Industry Faculty, Operations',             credential: 'Ex-VP Ops, Infosys · 20 yrs exp',       initials: 'MI',  color: 'red',    sex: 'f'       },
  ],
  'mba-if': [
    { name: 'Dr. Vivek Kapoor',          title: 'Professor, International Finance',      credential: 'PhD, LBS London · 20 yrs exp',          initials: 'VK',  color: 'red',    sex: 'm'       },
    { name: 'Prof. Reena Krishnamurthy', title: 'Associate Professor, Forex Markets',    credential: 'MBA Finance, ISB · 15 yrs exp',         initials: 'RKr', color: 'amber',  sex: 'f'       },
    { name: 'Dr. Aditya Bhargava',       title: 'Industry Faculty, Global Banking',      credential: 'Ex-MD, Goldman Sachs India · 22 yrs',   initials: 'ABh', color: 'purple', sex: 'm'       },
    { name: 'Prof. Sneha Malhotra',      title: 'Associate Professor, ACCA Track',       credential: 'FCCA · CA · 14 yrs exp',                initials: 'SnM', color: 'red',    sex: 'f'       },
    { name: 'Dr. Karan Bhatia',          title: 'Professor, Investment Strategy',        credential: 'PhD, Wharton · 18 yrs exp',             initials: 'KBh', color: 'green',  sex: 'm'       },
    { name: 'Prof. Lakshmi Venkatesan',  title: 'Industry Faculty, CMA Track',           credential: 'CMA · CPA · 16 yrs exp',                initials: 'LVe', color: 'blue',   sex: 'f'       },
    { name: 'Dr. Rohan Subramanian',     title: 'Associate Professor, Financial Risk',   credential: 'PhD, IIM Bangalore · 13 yrs exp',       initials: 'RSu', color: 'blue',   sex: 'm'       },
    { name: 'Prof. Meera Krishnan',      title: 'Assistant Professor, Cross-Border Inv', credential: 'CFA · 12 yrs exp',                      initials: 'MKr', color: 'red',    sex: 'f'       },
  ],
  mca: [
    { name: 'Dr. Sanjay Gupta',     title: 'Professor, Algorithms & Systems',          credential: 'PhD, IIT Delhi · 17 yrs exp',           initials: 'SG',  color: 'red',    sex: 'm'       },
    { name: 'Prof. Neha Rastogi',   title: 'Associate Professor, Data Science',        credential: 'MS, Georgia Tech · Google-certified',   initials: 'NR',  color: 'blue',   sex: 'f'       },
    { name: 'Dr. Kiran Pillai',     title: 'Industry Faculty, Cloud & DevOps',         credential: 'Ex-Principal Eng, Microsoft · AWS SAA', initials: 'KP',  color: 'purple', sex: 'm'       },
    { name: 'Prof. Manish Joshi',   title: 'Associate Professor, Cybersecurity',       credential: 'CISSP · CEH · 15 yrs exp',              initials: 'MJ',  color: 'amber',  sex: 'm'       },
    { name: 'Dr. Deepti Agarwal',   title: 'Assistant Professor, AI & ML',             credential: 'PhD, IIT Kanpur · 14 yrs exp',          initials: 'DA',  color: 'green',  sex: 'f'       },
    { name: 'Prof. Rahul Mishra',   title: 'Industry Faculty, Full-Stack Dev',         credential: 'Ex-SDE II, Google · 11 yrs exp',        initials: 'RM',  color: 'red',    sex: 'm'       },
    { name: 'Dr. Priya Verma',      title: 'Assistant Professor, Computer Vision',     credential: 'PhD, IISc Bangalore · 9 yrs exp',       initials: 'PV',  color: 'blue',   sex: 'f'       },
    { name: 'Prof. Suresh Kumar',   title: 'Industry Faculty, Distributed Systems',    credential: 'Ex-Principal Eng, Flipkart · 15 yrs',   initials: 'SK',  color: 'red',    sex: 'm'       },
  ],
  bca: [
    { name: 'Prof. Deepak Verma',   title: 'Assistant Professor, Programming',         credential: 'MCA, NIT Jaipur · 10 yrs exp',          initials: 'DV',  color: 'red',    sex: 'm'       },
    { name: 'Dr. Shweta Reddy',     title: 'Assistant Professor, Web Dev',             credential: 'PhD, BITS Pilani · Full-stack dev',     initials: 'SR',  color: 'blue',   sex: 'f'       },
    { name: 'Prof. Alok Kumar',     title: 'Industry Faculty, Software Eng',           credential: 'Ex-SDE, Amazon · 12 yrs exp',           initials: 'AK',  color: 'purple', sex: 'm'       },
    { name: 'Dr. Kavita Singh',     title: 'Assistant Professor, Database Systems',    credential: 'PhD, NIT Trichy · 13 yrs exp',          initials: 'KSi', color: 'amber',  sex: 'f'       },
    { name: 'Prof. Ritesh Sharma',  title: 'Industry Faculty, Mobile Development',     credential: 'Ex-Android Engineer, Paytm · 10 yrs',   initials: 'RSh', color: 'green',  sex: 'm'       },
    { name: 'Dr. Aarti Patel',      title: 'Assistant Professor, Networks',            credential: 'PhD, IIT Roorkee · 11 yrs exp',         initials: 'AP',  color: 'red',    sex: 'f'       },
    { name: 'Prof. Siddharth Jain', title: 'Industry Faculty, UI/UX Design',           credential: 'Ex-Senior Designer, Swiggy · 9 yrs',    initials: 'SJ',  color: 'blue',   sex: 'm'       },
    { name: 'Dr. Nisha Gupta',      title: 'Assistant Professor, Algorithms',          credential: 'PhD, IIT Madras · 12 yrs exp',          initials: 'NG',  color: 'red',    sex: 'f'       },
  ],
  bba: [
    { name: 'Prof. Pradeep Dubey',   title: 'Assistant Professor, Management',         credential: 'MBA, MDI Gurgaon · 11 yrs exp',         initials: 'PD',  color: 'red',    sex: 'm'       },
    { name: 'Dr. Kavita Saxena',     title: 'Assistant Professor, Marketing',          credential: 'PhD, University of Delhi · 14 yrs',     initials: 'KSa', color: 'blue',   sex: 'f'       },
    { name: 'Prof. Varun Bajaj',     title: 'Industry Faculty, Entrepreneurship',      credential: 'Founder, 3 startups · Angel investor',  initials: 'VB',  color: 'amber',  sex: 'm'       },
    { name: 'Dr. Supriya Nair',      title: 'Associate Professor, Finance & Banking',  credential: 'PhD, IIM Kozhikode · 13 yrs',           initials: 'SN',  color: 'purple', sex: 'f'       },
    { name: 'Prof. Anil Rao',        title: 'Faculty, Business Law',                   credential: 'LLB + MBA, Symbiosis · 16 yrs exp',     initials: 'AR',  color: 'green',  sex: 'm'       },
    { name: 'Dr. Neelima Tripathi',  title: 'Associate Professor, Consumer Behaviour', credential: 'PhD, FMS Delhi · 12 yrs exp',           initials: 'NT',  color: 'red',    sex: 'f'       },
    { name: 'Prof. Harsh Vardhan',   title: 'Industry Faculty, Digital Marketing',     credential: 'Ex-Marketing Head, Myntra · 11 yrs',    initials: 'HV',  color: 'blue',   sex: 'm'       },
    { name: 'Dr. Sunita Joshi',      title: 'Associate Professor, Business Ethics',    credential: 'PhD, TISS Mumbai · 15 yrs exp',         initials: 'SJo', color: 'red',    sex: 'f'       },
  ],
  ba: [
    { name: 'Dr. Indira Mishra',      title: 'Professor, Political Science',           credential: 'PhD, JNU Delhi · 19 yrs exp',           initials: 'IM',  color: 'red',    sex: 'f'       },
    { name: 'Prof. Rohit Tripathi',   title: 'Associate Professor, English Lit',       credential: 'MA, Oxford · 13 yrs exp',               initials: 'RT',  color: 'blue',   sex: 'm'       },
    { name: 'Dr. Devika Chakraborty', title: 'Assistant Professor, Economics',         credential: 'PhD, Presidency Univ · 11 yrs exp',     initials: 'DC',  color: 'purple', sex: 'f'       },
    { name: 'Dr. Suniti Rao',         title: 'Associate Professor, Sociology',         credential: 'PhD, Hyderabad Central Univ · 15 yrs',  initials: 'SR',  color: 'amber',  sex: 'f'       },
    { name: 'Prof. Vikrant Singh',    title: 'Faculty, History & Public Admin',        credential: 'MA, Delhi Univ · NET/JRF · 11 yrs',     initials: 'VS',  color: 'green',  sex: 'm'       },
    { name: 'Dr. Pallavi Sharma',     title: 'Assistant Professor, Philosophy',        credential: 'PhD, BHU Varanasi · 14 yrs exp',        initials: 'PSh', color: 'red',    sex: 'f'       },
    { name: 'Prof. Meena Joshi',      title: 'Faculty, Media & Communication',         credential: 'MA, AJK-MCRC Jamia · 12 yrs exp',       initials: 'MJ',  color: 'blue',   sex: 'f'       },
    { name: 'Dr. Rajiv Gupta',        title: 'Associate Professor, Dev Economics',     credential: 'PhD, IGIDR Mumbai · 16 yrs exp',        initials: 'RGu', color: 'red',    sex: 'm'       },
  ],
  ma: [
    { name: 'Prof. Geeta Srinivasan', title: 'Professor, English Literature',          credential: 'PhD, Hyderabad Central · 21 yrs',       initials: 'GS',  color: 'red',    sex: 'f'       },
    { name: 'Dr. Bhupesh Naik',       title: 'Associate Professor, Sociology',         credential: 'PhD, TISS Mumbai · 15 yrs exp',         initials: 'BN',  color: 'blue',   sex: 'm'       },
    { name: 'Prof. Lakshmi Varma',    title: 'Assistant Professor, Economics',         credential: 'MA Economics, DSE Delhi · NET/JRF',     initials: 'LV',  color: 'purple', sex: 'f'       },
    { name: 'Dr. Abhinav Tiwari',     title: 'Associate Professor, Political Theory',  credential: 'PhD, JNU Delhi · NET · 14 yrs exp',     initials: 'AT',  color: 'amber',  sex: 'm'       },
    { name: 'Prof. Sandhya Iyer',     title: 'Assistant Professor, Comp Literature',   credential: 'PhD, EFLU Hyderabad · 12 yrs exp',      initials: 'SI',  color: 'green',  sex: 'f'       },
    { name: 'Dr. Anupam Roy',         title: 'Assistant Professor, Economic Policy',   credential: 'PhD, IGIDR Mumbai · 11 yrs exp',        initials: 'ARo', color: 'red',    sex: 'm'       },
    { name: 'Prof. Madhu Krishnan',   title: 'Faculty, Gender Studies & Sociology',    credential: 'PhD, TISS Mumbai · 16 yrs exp',         initials: 'MKr', color: 'blue',   sex: 'f'       },
    { name: 'Dr. Suresh Bose',        title: 'Associate Professor, Applied Linguistics', credential: 'PhD, BHU · TESOL certified',          initials: 'SBo', color: 'red',    sex: 'm'       },
  ],
  msc: [
    { name: 'Dr. Tarun Saxena',         title: 'Professor, Advanced Mathematics',         credential: 'PhD, IIT Bombay · 14 yrs exp',          initials: 'TS',  color: 'red',    sex: 'm'       },
    { name: 'Prof. Pooja Chauhan',      title: 'Assistant Professor, Math Statistics',    credential: 'M.Sc, BITS Pilani · Google ML cert',    initials: 'PC',  color: 'blue',   sex: 'f'       },
    { name: 'Dr. Kartik Nambiar',       title: 'Associate Professor, Algebra & Topology', credential: 'PhD, IISc Bangalore · 12 yrs exp',      initials: 'KaN', color: 'green',  sex: 'm'       },
    { name: 'Dr. Sameera Patel',        title: 'Assistant Professor, Applied Maths',      credential: 'PhD, Pune Univ · 13 yrs exp',           initials: 'SPa', color: 'purple', sex: 'f'       },
    { name: 'Prof. Rahul Desai',        title: 'Industry Faculty, Quantitative Analysis', credential: 'Ex-Quant Analyst, Edelweiss · 10 yrs',  initials: 'RDe', color: 'amber',  sex: 'm'       },
    { name: 'Dr. Anita Krishnamurthy',  title: 'Associate Professor, Number Theory',      credential: 'PhD, IISc Bangalore · 15 yrs exp',      initials: 'AKy', color: 'blue',   sex: 'f'       },
    { name: 'Prof. Sunil Sharma',       title: 'Assistant Professor, Probability',        credential: 'PhD, ISI Kolkata · 14 yrs exp',         initials: 'SSh', color: 'blue',   sex: 'm'       },
    { name: 'Dr. Neetu Singh',          title: 'Assistant Professor, Operations Research',credential: 'PhD, IIT Madras · 11 yrs exp',          initials: 'NSm', color: 'red',    sex: 'f'       },
  ],
  majmc: [
    { name: 'Dr. Vinay Singh',          title: 'Professor, Digital Journalism',            credential: 'PhD, AJK MCRC Jamia · 20 yrs exp',         initials: 'ViS', color: 'red',    sex: 'm'       },
    { name: 'Prof. Anjali Bose',        title: 'Associate Professor, Broadcast Media',     credential: 'MA, Cardiff Univ · Ex-NDTV · 14 yrs',      initials: 'AnB', color: 'amber',  sex: 'f'       },
    { name: 'Dr. Rajesh Khanna',        title: 'Industry Faculty, Public Relations',       credential: 'Ex-Chief PR Officer, Tata Group · 22 yrs', initials: 'RKh', color: 'purple', sex: 'm'       },
    { name: 'Prof. Neha Sharma',        title: 'Associate Professor, Multimedia Journ',    credential: 'MA, IIMC Delhi · 12 yrs exp',              initials: 'NSm', color: 'red',    sex: 'f'       },
    { name: 'Dr. Aditya Kapoor',        title: 'Professor, Media Studies',                 credential: 'PhD, JNU Delhi · 18 yrs exp',              initials: 'AdK', color: 'green',  sex: 'm'       },
    { name: 'Prof. Kavitha Iyer',       title: 'Industry Faculty, Corporate Comms',        credential: 'Ex-Communications Head, Wipro · 15 yrs',   initials: 'KaI', color: 'blue',   sex: 'f'       },
    { name: 'Dr. Sandeep Reddy',        title: 'Associate Professor, Investigative Journ', credential: 'PhD, IIMC Delhi · 13 yrs exp',             initials: 'SaR', color: 'blue',   sex: 'm'       },
    { name: 'Prof. Tara Menon',         title: 'Industry Faculty, Documentary Film',       credential: 'Filmmaker · National Award · 11 yrs',      initials: 'TaM', color: 'red',    sex: 'f'       },
  ],
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function seedFaculty() {
  console.log('\n→ Faculty')
  const total = Object.values(FACULTY).reduce((s, a) => s + a.length, 0)
  console.log(`  ${total} entries across ${Object.keys(FACULTY).length} programs`)

  // Global counters so each faculty member gets a distinct photo from the
  // 15-deep male/female pools, wrapping only after the pool is exhausted.
  let mIdx = 0, fIdx = 0
  for (const [programSlug, members] of Object.entries(FACULTY)) {
    let order = 1
    for (const f of members) {
      const photoUrl = f.sex === 'm' ? M[mIdx++ % M.length] : F[fIdx++ % F.length]
      const assetId = await uploadImageFromUrl(photoUrl, `faculty-${slugify(f.name)}.jpg`)
      // Doc ID is scoped per (program, name) so the same faculty teaching
      // multiple programs gets one doc per program - matches current display.
      const id = `faculty-${programSlug}-${slugify(f.name)}`
      await client.createOrReplace({
        _id: id, _type: 'faculty',
        name: f.name, title: f.title, credential: f.credential,
        initials: f.initials, avatarColor: f.color,
        ...(assetId ? { photo: imageRef(assetId) } : {}),
        programs: [programSlug],
        displayOrder: order++,
      })
    }
    console.log(`  ✓ ${programSlug} (${members.length})`)
  }
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  await seedSiteSettings()
  await seedFaqs()
  await seedMilestones()
  await seedTestimonials()
  await seedCampusEvents()
  await seedFaculty()

  console.log('\nDone. All content seeded.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
