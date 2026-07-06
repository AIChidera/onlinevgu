/**
 * Patch script: replace all faculty photos in Sanity with verified professional portraits.
 * Also fixes the two home-page testimonials that used wrong photos (elderly woman, brick wall).
 *
 * Run: npx tsx scripts/patch-faculty-photos.ts
 *
 * Safe to re-run: uses createOrReplace with the same deterministic IDs as the original seed.
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

const uploadCache = new Map<string, string>()

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  if (uploadCache.has(url)) return uploadCache.get(url)!
  try {
    const resp = await fetch(url)
    if (!resp.ok) { console.warn(`  ! fetch failed ${resp.status}: ${url}`); return null }
    const buf = Buffer.from(await resp.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename })
    uploadCache.set(url, asset._id)
    return asset._id
  } catch (e) {
    console.warn(`  ! upload failed: ${(e as Error).message}`)
    return null
  }
}

function imageRef(assetId: string | null) {
  return assetId ? { _type: 'image', asset: { _type: 'reference', _ref: assetId } } : undefined
}

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=400&q=80&auto=format&fit=crop&crop=faces`

// ── Verified professional male portraits ──────────────────────────────────────
// All visually confirmed: professional attire, clean/office backgrounds.
const M = [
  u('1472099645785-5658abf4ff4e'),  // middle-aged, glasses, studio - professor look
  u('1560250097-0b93528c311a'),     // glasses + dark blazer, office window
  u('1519085360753-af0119f7cbe7'),  // dark suit, senior professional
  u('1507003211169-0a1dd7228f2d'),  // warm confident smile, professional
  u('1570295999919-56ceb5ecca61'),  // clean studio headshot, professional
  u('1566753323558-f4e0952af115'),  // glasses, smart-casual
  u('1566492031773-4f4e44671857'),  // beard + glasses, thoughtful
  u('1500648767791-00dcc994a43e'),  // studio portrait, professional
  u('1531427186611-ecfd6d936c79'),  // smiling, blue shirt, professional
  u('1590086782957-93c06ef21604'),  // professional headshot, clean background
  u('1480429370139-e0132c086e2a'),  // formal striped suit, professional
  u('1547425260-76bcadfb4f2c'),    // beard + glasses, tech professional
  u('1729157661483-ed21901ed892'), // bearded, white shirt, senior professional
  u('1612349317150-e413f6a5b16d'), // South Asian professional, business formal
  u('1472099645785-5658abf4ff4e'),  // repeat slot 15 - same professor look
]

// ── Verified professional female portraits ────────────────────────────────────
// All visually confirmed: professional attire, no traditional/casual dress.
const F = [
  u('1573497019940-1c28c88b4f3e'),  // blazer, office background - professional
  u('1580489944761-15a19d654956'),  // dark hair, warm smile, professional
  u('1573165850883-9b0e18c44bd2'),  // at laptop, office - professional
  u('1494790108377-be9c29b29330'),  // dark curly hair, composed, professional
  u('1531123897727-8f129e1688ce'),  // short hair, direct gaze, professional
  u('1637589267610-6c66fc2a086b'),  // black blazer, arms crossed - professional
  u('1508214751196-bcfd4ca60f91'),  // warm outdoor portrait, professional
  u('1589571894960-20bbe2828d0a'),  // natural outdoor, professional
  u('1607189200597-4d0923ef98c6'),  // long dark hair, South Asian, professional
  u('1551836022-d5d88e9218df'),    // glasses, laptop - academic professional
  u('1573496359142-b8d87734a5a2'), // blazer, office window - professional
  u('1534528741775-53994a69daeb'), // composed, professional portrait
  u('1516534775068-ba3e7458af70'), // at laptop, research context - professional
  u('1438761681033-6461ffad8d80'), // natural light portrait, professional
  u('1573497019940-1c28c88b4f3e'),  // repeat slot 15 - blazer professional
]

type FacultyEntry = { name: string; title: string; credential: string; initials: string; color: 'red'|'blue'|'purple'|'amber'|'green'; sex: 'm' | 'f' }

const FACULTY: Record<string, FacultyEntry[]> = {
  mba: [
    { name: 'Dr. Rajesh Kumar',     title: 'Professor, Strategic Management',          credential: 'PhD, IIM Ahmedabad · 22 yrs exp',       initials: 'RK',  color: 'red',    sex: 'm' },
    { name: 'Prof. Priya Sharma',   title: 'Associate Professor, Finance',             credential: 'MBA, XLRI · CFA Charterholder',         initials: 'PS',  color: 'blue',   sex: 'f' },
    { name: 'Dr. Ankit Mehta',      title: 'Industry Faculty, Marketing',              credential: 'Ex-CMO, Hindustan Unilever · 18 yrs',   initials: 'AM',  color: 'purple', sex: 'm' },
    { name: 'Prof. Sunita Tiwari',  title: 'Associate Professor, HR & OB',             credential: 'PhD, Symbiosis · SHRM Certified',       initials: 'ST',  color: 'amber',  sex: 'f' },
    { name: 'Dr. Vikram Nair',      title: 'Professor, International Business',        credential: 'PhD, IIFT Delhi · 16 yrs exp',          initials: 'VN',  color: 'green',  sex: 'm' },
    { name: 'Prof. Arunima Bose',   title: 'Associate Professor, Business Analytics',  credential: 'MS Analytics, ISB · 12 yrs exp',        initials: 'AB',  color: 'red',    sex: 'f' },
    { name: 'Dr. Rohit Kapoor',     title: 'Faculty, Entrepreneurship',                credential: 'PhD, SRCC · Serial entrepreneur',       initials: 'RKp', color: 'blue',   sex: 'm' },
    { name: 'Prof. Meenakshi Iyer', title: 'Industry Faculty, Operations',             credential: 'Ex-VP Ops, Infosys · 20 yrs exp',       initials: 'MI',  color: 'red',    sex: 'f' },
  ],
  'mba-if': [
    { name: 'Dr. Vivek Kapoor',          title: 'Professor, International Finance',      credential: 'PhD, LBS London · 20 yrs exp',          initials: 'VK',  color: 'red',    sex: 'm' },
    { name: 'Prof. Reena Krishnamurthy', title: 'Associate Professor, Forex Markets',    credential: 'MBA Finance, ISB · 15 yrs exp',         initials: 'RKr', color: 'amber',  sex: 'f' },
    { name: 'Dr. Aditya Bhargava',       title: 'Industry Faculty, Global Banking',      credential: 'Ex-MD, Goldman Sachs India · 22 yrs',   initials: 'ABh', color: 'purple', sex: 'm' },
    { name: 'Prof. Sneha Malhotra',      title: 'Associate Professor, ACCA Track',       credential: 'FCCA · CA · 14 yrs exp',                initials: 'SnM', color: 'red',    sex: 'f' },
    { name: 'Dr. Karan Bhatia',          title: 'Professor, Investment Strategy',        credential: 'PhD, Wharton · 18 yrs exp',             initials: 'KBh', color: 'green',  sex: 'm' },
    { name: 'Prof. Lakshmi Venkatesan',  title: 'Industry Faculty, CMA Track',           credential: 'CMA · CPA · 16 yrs exp',                initials: 'LVe', color: 'blue',   sex: 'f' },
    { name: 'Dr. Rohan Subramanian',     title: 'Associate Professor, Financial Risk',   credential: 'PhD, IIM Bangalore · 13 yrs exp',       initials: 'RSu', color: 'blue',   sex: 'm' },
    { name: 'Prof. Meera Krishnan',      title: 'Assistant Professor, Cross-Border Inv', credential: 'CFA · 12 yrs exp',                      initials: 'MKr', color: 'red',    sex: 'f' },
  ],
  mca: [
    { name: 'Dr. Sanjay Gupta',     title: 'Professor, Algorithms & Systems',          credential: 'PhD, IIT Delhi · 17 yrs exp',           initials: 'SG',  color: 'red',    sex: 'm' },
    { name: 'Prof. Neha Rastogi',   title: 'Associate Professor, Data Science',        credential: 'MS, Georgia Tech · Google-certified',   initials: 'NR',  color: 'blue',   sex: 'f' },
    { name: 'Dr. Kiran Pillai',     title: 'Industry Faculty, Cloud & DevOps',         credential: 'Ex-Principal Eng, Microsoft · AWS SAA', initials: 'KP',  color: 'purple', sex: 'm' },
    { name: 'Prof. Manish Joshi',   title: 'Associate Professor, Cybersecurity',       credential: 'CISSP · CEH · 15 yrs exp',              initials: 'MJ',  color: 'amber',  sex: 'm' },
    { name: 'Dr. Deepti Agarwal',   title: 'Assistant Professor, AI & ML',             credential: 'PhD, IIT Kanpur · 14 yrs exp',          initials: 'DA',  color: 'green',  sex: 'f' },
    { name: 'Prof. Rahul Mishra',   title: 'Industry Faculty, Full-Stack Dev',         credential: 'Ex-SDE II, Google · 11 yrs exp',        initials: 'RM',  color: 'red',    sex: 'm' },
    { name: 'Dr. Priya Verma',      title: 'Assistant Professor, Computer Vision',     credential: 'PhD, IISc Bangalore · 9 yrs exp',       initials: 'PV',  color: 'blue',   sex: 'f' },
    { name: 'Prof. Suresh Kumar',   title: 'Industry Faculty, Distributed Systems',    credential: 'Ex-Principal Eng, Flipkart · 15 yrs',   initials: 'SK',  color: 'red',    sex: 'm' },
  ],
  bca: [
    { name: 'Prof. Deepak Verma',   title: 'Assistant Professor, Programming',         credential: 'MCA, NIT Jaipur · 10 yrs exp',          initials: 'DV',  color: 'red',    sex: 'm' },
    { name: 'Dr. Shweta Reddy',     title: 'Assistant Professor, Web Dev',             credential: 'PhD, BITS Pilani · Full-stack dev',     initials: 'SR',  color: 'blue',   sex: 'f' },
    { name: 'Prof. Alok Kumar',     title: 'Industry Faculty, Software Eng',           credential: 'Ex-SDE, Amazon · 12 yrs exp',           initials: 'AK',  color: 'purple', sex: 'm' },
    { name: 'Dr. Kavita Singh',     title: 'Assistant Professor, Database Systems',    credential: 'PhD, NIT Trichy · 13 yrs exp',          initials: 'KSi', color: 'amber',  sex: 'f' },
    { name: 'Prof. Ritesh Sharma',  title: 'Industry Faculty, Mobile Development',     credential: 'Ex-Android Engineer, Paytm · 10 yrs',   initials: 'RSh', color: 'green',  sex: 'm' },
    { name: 'Dr. Aarti Patel',      title: 'Assistant Professor, Networks',            credential: 'PhD, IIT Roorkee · 11 yrs exp',         initials: 'AP',  color: 'red',    sex: 'f' },
    { name: 'Prof. Siddharth Jain', title: 'Industry Faculty, UI/UX Design',           credential: 'Ex-Senior Designer, Swiggy · 9 yrs',    initials: 'SJ',  color: 'blue',   sex: 'm' },
    { name: 'Dr. Nisha Gupta',      title: 'Assistant Professor, Algorithms',          credential: 'PhD, IIT Madras · 12 yrs exp',          initials: 'NG',  color: 'red',    sex: 'f' },
  ],
  bba: [
    { name: 'Prof. Pradeep Dubey',   title: 'Assistant Professor, Management',         credential: 'MBA, MDI Gurgaon · 11 yrs exp',         initials: 'PD',  color: 'red',    sex: 'm' },
    { name: 'Dr. Kavita Saxena',     title: 'Assistant Professor, Marketing',          credential: 'PhD, University of Delhi · 14 yrs',     initials: 'KSa', color: 'blue',   sex: 'f' },
    { name: 'Prof. Varun Bajaj',     title: 'Industry Faculty, Entrepreneurship',      credential: 'Founder, 3 startups · Angel investor',  initials: 'VB',  color: 'amber',  sex: 'm' },
    { name: 'Dr. Supriya Nair',      title: 'Associate Professor, Finance & Banking',  credential: 'PhD, IIM Kozhikode · 13 yrs',           initials: 'SN',  color: 'purple', sex: 'f' },
    { name: 'Prof. Anil Rao',        title: 'Faculty, Business Law',                   credential: 'LLB + MBA, Symbiosis · 16 yrs exp',     initials: 'AR',  color: 'green',  sex: 'm' },
    { name: 'Dr. Neelima Tripathi',  title: 'Associate Professor, Consumer Behaviour', credential: 'PhD, FMS Delhi · 12 yrs exp',           initials: 'NT',  color: 'red',    sex: 'f' },
    { name: 'Prof. Harsh Vardhan',   title: 'Industry Faculty, Digital Marketing',     credential: 'Ex-Marketing Head, Myntra · 11 yrs',    initials: 'HV',  color: 'blue',   sex: 'm' },
    { name: 'Dr. Sunita Joshi',      title: 'Associate Professor, Business Ethics',    credential: 'PhD, TISS Mumbai · 15 yrs exp',         initials: 'SJo', color: 'red',    sex: 'f' },
  ],
  ba: [
    { name: 'Dr. Indira Mishra',      title: 'Professor, Political Science',           credential: 'PhD, JNU Delhi · 19 yrs exp',           initials: 'IM',  color: 'red',    sex: 'f' },
    { name: 'Prof. Rohit Tripathi',   title: 'Associate Professor, English Lit',       credential: 'MA, Oxford · 13 yrs exp',               initials: 'RT',  color: 'blue',   sex: 'm' },
    { name: 'Dr. Devika Chakraborty', title: 'Assistant Professor, Economics',         credential: 'PhD, Presidency Univ · 11 yrs exp',     initials: 'DC',  color: 'purple', sex: 'f' },
    { name: 'Dr. Suniti Rao',         title: 'Associate Professor, Sociology',         credential: 'PhD, Hyderabad Central Univ · 15 yrs',  initials: 'SR',  color: 'amber',  sex: 'f' },
    { name: 'Prof. Vikrant Singh',    title: 'Faculty, History & Public Admin',        credential: 'MA, Delhi Univ · NET/JRF · 11 yrs',     initials: 'VS',  color: 'green',  sex: 'm' },
    { name: 'Dr. Pallavi Sharma',     title: 'Assistant Professor, Philosophy',        credential: 'PhD, BHU Varanasi · 14 yrs exp',        initials: 'PSh', color: 'red',    sex: 'f' },
    { name: 'Prof. Meena Joshi',      title: 'Faculty, Media & Communication',         credential: 'MA, AJK-MCRC Jamia · 12 yrs exp',       initials: 'MJ',  color: 'blue',   sex: 'f' },
    { name: 'Dr. Rajiv Gupta',        title: 'Associate Professor, Dev Economics',     credential: 'PhD, IGIDR Mumbai · 16 yrs exp',        initials: 'RGu', color: 'red',    sex: 'm' },
  ],
  ma: [
    { name: 'Prof. Geeta Srinivasan', title: 'Professor, English Literature',          credential: 'PhD, Hyderabad Central · 21 yrs',       initials: 'GS',  color: 'red',    sex: 'f' },
    { name: 'Dr. Bhupesh Naik',       title: 'Associate Professor, Sociology',         credential: 'PhD, TISS Mumbai · 15 yrs exp',         initials: 'BN',  color: 'blue',   sex: 'm' },
    { name: 'Prof. Lakshmi Varma',    title: 'Assistant Professor, Economics',         credential: 'MA Economics, DSE Delhi · NET/JRF',     initials: 'LV',  color: 'purple', sex: 'f' },
    { name: 'Dr. Abhinav Tiwari',     title: 'Associate Professor, Political Theory',  credential: 'PhD, JNU Delhi · NET · 14 yrs exp',     initials: 'AT',  color: 'amber',  sex: 'm' },
    { name: 'Prof. Sandhya Iyer',     title: 'Assistant Professor, Comp Literature',   credential: 'PhD, EFLU Hyderabad · 12 yrs exp',      initials: 'SI',  color: 'green',  sex: 'f' },
    { name: 'Dr. Anupam Roy',         title: 'Assistant Professor, Economic Policy',   credential: 'PhD, IGIDR Mumbai · 11 yrs exp',        initials: 'ARo', color: 'red',    sex: 'm' },
    { name: 'Prof. Madhu Krishnan',   title: 'Faculty, Gender Studies & Sociology',    credential: 'PhD, TISS Mumbai · 16 yrs exp',         initials: 'MKr', color: 'blue',   sex: 'f' },
    { name: 'Dr. Suresh Bose',        title: 'Associate Professor, Applied Linguistics', credential: 'PhD, BHU · TESOL certified',          initials: 'SBo', color: 'red',    sex: 'm' },
  ],
  msc: [
    { name: 'Dr. Tarun Saxena',         title: 'Professor, Advanced Mathematics',         credential: 'PhD, IIT Bombay · 14 yrs exp',          initials: 'TS',  color: 'red',    sex: 'm' },
    { name: 'Prof. Pooja Chauhan',      title: 'Assistant Professor, Math Statistics',    credential: 'M.Sc, BITS Pilani · Google ML cert',    initials: 'PC',  color: 'blue',   sex: 'f' },
    { name: 'Dr. Kartik Nambiar',       title: 'Associate Professor, Algebra & Topology', credential: 'PhD, IISc Bangalore · 12 yrs exp',      initials: 'KaN', color: 'green',  sex: 'm' },
    { name: 'Dr. Sameera Patel',        title: 'Assistant Professor, Applied Maths',      credential: 'PhD, Pune Univ · 13 yrs exp',           initials: 'SPa', color: 'purple', sex: 'f' },
    { name: 'Prof. Rahul Desai',        title: 'Industry Faculty, Quantitative Analysis', credential: 'Ex-Quant Analyst, Edelweiss · 10 yrs',  initials: 'RDe', color: 'amber',  sex: 'm' },
    { name: 'Dr. Anita Krishnamurthy',  title: 'Associate Professor, Number Theory',      credential: 'PhD, IISc Bangalore · 15 yrs exp',      initials: 'AKy', color: 'blue',   sex: 'f' },
    { name: 'Prof. Sunil Sharma',       title: 'Assistant Professor, Probability',        credential: 'PhD, ISI Kolkata · 14 yrs exp',         initials: 'SSh', color: 'blue',   sex: 'm' },
    { name: 'Dr. Neetu Singh',          title: 'Assistant Professor, Operations Research', credential: 'PhD, IIT Madras · 11 yrs exp',         initials: 'NSm', color: 'red',    sex: 'f' },
  ],
  majmc: [
    { name: 'Dr. Vinay Singh',     title: 'Professor, Digital Journalism',            credential: 'PhD, AJK MCRC Jamia · 20 yrs exp',         initials: 'ViS', color: 'red',    sex: 'm' },
    { name: 'Prof. Anjali Bose',   title: 'Associate Professor, Broadcast Media',     credential: 'MA, Cardiff Univ · Ex-NDTV · 14 yrs',      initials: 'AnB', color: 'amber',  sex: 'f' },
    { name: 'Dr. Rajesh Khanna',   title: 'Industry Faculty, Public Relations',       credential: 'Ex-Chief PR Officer, Tata Group · 22 yrs', initials: 'RKh', color: 'purple', sex: 'm' },
    { name: 'Prof. Neha Sharma',   title: 'Associate Professor, Multimedia Journ',    credential: 'MA, IIMC Delhi · 12 yrs exp',              initials: 'NSm', color: 'red',    sex: 'f' },
    { name: 'Dr. Aditya Kapoor',   title: 'Professor, Media Studies',                 credential: 'PhD, JNU Delhi · 18 yrs exp',              initials: 'AdK', color: 'green',  sex: 'm' },
    { name: 'Prof. Kavitha Iyer',  title: 'Industry Faculty, Corporate Comms',        credential: 'Ex-Communications Head, Wipro · 15 yrs',   initials: 'KaI', color: 'blue',   sex: 'f' },
    { name: 'Dr. Sandeep Reddy',   title: 'Associate Professor, Investigative Journ', credential: 'PhD, IIMC Delhi · 13 yrs exp',             initials: 'SaR', color: 'blue',   sex: 'm' },
    { name: 'Prof. Tara Menon',    title: 'Industry Faculty, Documentary Film',       credential: 'Filmmaker · National Award · 11 yrs',      initials: 'TaM', color: 'red',    sex: 'f' },
  ],
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

async function patchFaculty() {
  console.log('\n→ Patching faculty photos')
  const total = Object.values(FACULTY).reduce((s, a) => s + a.length, 0)
  console.log(`  ${total} entries across ${Object.keys(FACULTY).length} programs`)

  let mIdx = 0, fIdx = 0
  for (const [programSlug, members] of Object.entries(FACULTY)) {
    let order = 1
    for (const f of members) {
      const photoUrl = f.sex === 'm' ? M[mIdx++ % M.length] : F[fIdx++ % F.length]
      const assetId  = await uploadImageFromUrl(photoUrl, `faculty-${slugify(f.name)}.jpg`)
      const id = `faculty-${programSlug}-${slugify(f.name)}`
      await client.createOrReplace({
        _id: id, _type: 'faculty',
        name: f.name, title: f.title, credential: f.credential,
        initials: f.initials, avatarColor: f.color,
        ...(assetId ? { photo: imageRef(assetId) } : {}),
        programs: [programSlug],
        displayOrder: order++,
      })
      process.stdout.write('.')
    }
    console.log(` ✓ ${programSlug}`)
  }
}

async function patchTestimonialPhotos() {
  console.log('\n→ Patching home-page testimonial photos that used wrong images')

  // Kavya Nair used the elderly-woman photo - replace with a professional South Asian woman
  const kavyaUrl = u('1573497019940-1c28c88b4f3e')
  const kavyaAsset = await uploadImageFromUrl(kavyaUrl, 'testimonial-kavya-nair.jpg')
  if (kavyaAsset) {
    await client.patch('testimonial-kavya-nair')
      .set({ avatar: imageRef(kavyaAsset) })
      .commit()
    console.log('  ✓ Kavya Nair')
  }

  // Arjun Mehta used a casual street photo - replace with professional headshot
  const arjunUrl = u('1560250097-0b93528c311a')
  const arjunAsset = await uploadImageFromUrl(arjunUrl, 'testimonial-arjun-mehta.jpg')
  if (arjunAsset) {
    await client.patch('testimonial-arjun-mehta')
      .set({ avatar: imageRef(arjunAsset) })
      .commit()
    console.log('  ✓ Arjun Mehta')
  }
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }
  await patchFaculty()
  await patchTestimonialPhotos()
  console.log('\nDone.')
}

main().catch(err => { console.error(err); process.exit(1) })
