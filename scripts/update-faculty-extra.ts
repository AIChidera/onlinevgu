/**
 * One-off update: push faculty for the 3 programs that were missing from Sanity
 * (mba-if, msc, majmc). Uses the same Unsplash photos used as fallbacks in
 * app/programs/[slug]/FacultySection.tsx so the rendered output is consistent
 * whether Sanity is populated or not.
 *
 * Idempotent: createOrReplace with deterministic IDs. Existing faculty for the
 * other 6 programs (mba, mca, bca, bba, ba, ma) are NOT touched.
 *
 * Run: npx tsx scripts/update-faculty-extra.ts
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
    if (!resp.ok) {
      console.warn(`  ! fetch failed ${resp.status}: ${url}`)
      return null
    }
    const buf = Buffer.from(await resp.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename })
    uploadCache.set(url, asset._id)
    return asset._id
  } catch (e) {
    console.warn(`  ! upload failed: ${(e as Error).message}`)
    return null
  }
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Same Unsplash URLs as FacultySection.tsx so the rendered faces match the fallback.
const M1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&crop=faces'
const M2 = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop&crop=faces'
const M3 = 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80&auto=format&fit=crop&crop=faces'
const M4 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop&crop=faces'
const M5 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80&auto=format&fit=crop&crop=faces'
const M6 = 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&q=80&auto=format&fit=crop&crop=faces'
const M7 = 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80&auto=format&fit=crop&crop=faces'
const M8 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop&crop=faces'

const F1 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop&crop=faces'
const F2 = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80&auto=format&fit=crop&crop=faces'
const F3 = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&crop=faces'
const F4 = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80&auto=format&fit=crop&crop=faces'
const F5 = 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=400&q=80&auto=format&fit=crop&crop=faces'
const F6 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80&auto=format&fit=crop&crop=faces'
const F7 = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop&crop=faces'
const F8 = 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80&auto=format&fit=crop&crop=faces'

interface FacultyDef {
  name:       string
  title:      string
  credential: string
  initials:   string
  color:      'red' | 'blue' | 'purple' | 'amber' | 'green' | 'slate'
  photoUrl:   string
}

const NEW_FACULTY: Record<string, FacultyDef[]> = {
  'mba-if': [
    { name: 'Dr. Vivek Kapoor',         title: 'Professor, International Finance',      credential: 'PhD, LBS London · 20 yrs exp',          initials: 'VK',  color: 'red',    photoUrl: M1 },
    { name: 'Prof. Reena Krishnamurthy', title: 'Associate Professor, Forex Markets',    credential: 'MBA Finance, ISB · 15 yrs exp',         initials: 'RKr', color: 'amber',  photoUrl: F1 },
    { name: 'Dr. Aditya Bhargava',      title: 'Industry Faculty, Global Banking',      credential: 'Ex-MD, Goldman Sachs India · 22 yrs',   initials: 'ABh', color: 'purple', photoUrl: M2 },
    { name: 'Prof. Sneha Malhotra',     title: 'Associate Professor, ACCA Track',       credential: 'FCCA · CA · 14 yrs exp',                initials: 'SnM', color: 'red',    photoUrl: F2 },
    { name: 'Dr. Karan Bhatia',         title: 'Professor, Investment Strategy',        credential: 'PhD, Wharton · 18 yrs exp',             initials: 'KBh', color: 'green',  photoUrl: M3 },
    { name: 'Prof. Lakshmi Venkatesan', title: 'Industry Faculty, CMA Track',           credential: 'CMA · CPA · 16 yrs exp',                initials: 'LVe', color: 'slate',  photoUrl: F3 },
    { name: 'Dr. Rohan Subramanian',    title: 'Associate Professor, Financial Risk',   credential: 'PhD, IIM Bangalore · 13 yrs exp',       initials: 'RSu', color: 'blue',   photoUrl: M4 },
    { name: 'Prof. Meera Krishnan',     title: 'Assistant Professor, Cross-Border Inv', credential: 'CFA · 12 yrs exp',                      initials: 'MKr', color: 'red',    photoUrl: F4 },
  ],
  msc: [
    { name: 'Dr. Tarun Saxena',         title: 'Professor, Advanced Mathematics',         credential: 'PhD, IIT Bombay · 14 yrs exp',         initials: 'TS',  color: 'red',    photoUrl: M5 },
    { name: 'Prof. Pooja Chauhan',      title: 'Assistant Professor, Math Statistics',    credential: 'M.Sc, BITS Pilani · Google ML cert',   initials: 'PC',  color: 'blue',   photoUrl: F5 },
    { name: 'Dr. Kartik Nambiar',       title: 'Associate Professor, Algebra & Topology', credential: 'PhD, IISc Bangalore · 12 yrs exp',     initials: 'KaN', color: 'green',  photoUrl: M6 },
    { name: 'Dr. Sameera Patel',        title: 'Assistant Professor, Applied Maths',      credential: 'PhD, Pune Univ · 13 yrs exp',          initials: 'SPa', color: 'purple', photoUrl: F6 },
    { name: 'Prof. Rahul Desai',        title: 'Industry Faculty, Quantitative Analysis', credential: 'Ex-Quant Analyst, Edelweiss · 10 yrs', initials: 'RDe', color: 'amber',  photoUrl: M7 },
    { name: 'Dr. Anita Krishnamurthy',  title: 'Associate Professor, Number Theory',      credential: 'PhD, IISc Bangalore · 15 yrs exp',     initials: 'AKy', color: 'slate',  photoUrl: F7 },
    { name: 'Prof. Sunil Sharma',       title: 'Assistant Professor, Probability',        credential: 'PhD, ISI Kolkata · 14 yrs exp',        initials: 'SSh', color: 'blue',   photoUrl: M8 },
    { name: 'Dr. Neetu Singh',          title: 'Assistant Professor, Operations Research',credential: 'PhD, IIT Madras · 11 yrs exp',         initials: 'NSm', color: 'red',    photoUrl: F8 },
  ],
  majmc: [
    { name: 'Dr. Vinay Singh',          title: 'Professor, Digital Journalism',            credential: 'PhD, AJK MCRC Jamia · 20 yrs exp',     initials: 'ViS', color: 'red',    photoUrl: M1 },
    { name: 'Prof. Anjali Bose',        title: 'Associate Professor, Broadcast Media',     credential: 'MA, Cardiff Univ · Ex-NDTV · 14 yrs',  initials: 'AnB', color: 'amber',  photoUrl: F1 },
    { name: 'Dr. Rajesh Khanna',        title: 'Industry Faculty, Public Relations',       credential: 'Ex-Chief PR Officer, Tata Group · 22 yrs', initials: 'RKh', color: 'purple', photoUrl: M2 },
    { name: 'Prof. Neha Sharma',        title: 'Associate Professor, Multimedia Journ',    credential: 'MA, IIMC Delhi · 12 yrs exp',          initials: 'NSm', color: 'red',    photoUrl: F2 },
    { name: 'Dr. Aditya Kapoor',        title: 'Professor, Media Studies',                 credential: 'PhD, JNU Delhi · 18 yrs exp',          initials: 'AdK', color: 'green',  photoUrl: M3 },
    { name: 'Prof. Kavitha Iyer',       title: 'Industry Faculty, Corporate Comms',        credential: 'Ex-Communications Head, Wipro · 15 yrs', initials: 'KaI', color: 'slate',  photoUrl: F3 },
    { name: 'Dr. Sandeep Reddy',        title: 'Associate Professor, Investigative Journ', credential: 'PhD, IIMC Delhi · 13 yrs exp',         initials: 'SaR', color: 'blue',   photoUrl: M4 },
    { name: 'Prof. Tara Menon',         title: 'Industry Faculty, Documentary Film',       credential: 'Filmmaker · National Award · 11 yrs', initials: 'TaM', color: 'red',    photoUrl: F4 },
  ],
}

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  for (const [programSlug, members] of Object.entries(NEW_FACULTY)) {
    console.log(`\n→ ${programSlug}`)
    let order = 1
    for (const f of members) {
      const assetId = await uploadImageFromUrl(f.photoUrl, `faculty-${slugify(f.name)}.jpg`)
      const id = `faculty-${programSlug}-${slugify(f.name)}`
      await client.createOrReplace({
        _id: id, _type: 'faculty',
        name: f.name, title: f.title, credential: f.credential,
        initials: f.initials, avatarColor: f.color,
        ...(assetId ? { photo: imageRef(assetId) } : {}),
        programs: [programSlug],
        displayOrder: order++,
      })
      console.log(`  ✓ ${f.name}`)
    }
  }

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
