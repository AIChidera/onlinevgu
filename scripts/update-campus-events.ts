/**
 * One-off update: refresh Campus Event docs in Sanity to match the
 * homepage CampusImmersionsSection content.
 *
 * Idempotent: createOrReplace with the same _ids as seed-content.ts, so
 * the 5 existing docs are upserted in place. Other content types (testimonials,
 * faculty, milestones, settings, faqs) are NOT touched, so any admin edits are safe.
 *
 * Run: npx tsx scripts/update-campus-events.ts
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

async function uploadImageFromUrl(url: string, filename: string): Promise<string | null> {
  try {
    const resp = await fetch(url)
    if (!resp.ok) {
      console.warn(`  ! fetch failed ${resp.status}: ${url}`)
      return null
    }
    const buf = Buffer.from(await resp.arrayBuffer())
    const asset = await client.assets.upload('image', buf, { filename })
    return asset._id
  } catch (e) {
    console.warn(`  ! upload failed: ${(e as Error).message}`)
    return null
  }
}

function imageRef(assetId: string) {
  return { _type: 'image', asset: { _type: 'reference', _ref: assetId } }
}

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

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  console.log('→ Updating Campus Events in Sanity')
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

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
