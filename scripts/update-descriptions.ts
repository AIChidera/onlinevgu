/**
 * Shorten every program's Sanity description to ~110-135 chars so the hero
 * hero blurb fits 3 lines on mobile without ugly mid-word truncation.
 * Only patches the `description` field, nothing else.
 *
 * Run: npx tsx scripts/update-descriptions.ts
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

const DESCRIPTIONS: Record<string, string> = {
  'mba':      "VGU's flagship MBA for working professionals. Live weekend classes, 8 specialisations, and real-world case studies.",
  'mca':      'An industry-aligned MCA covering programming, machine learning, cloud, AI, and cybersecurity with hackathons and cert prep.',
  'mba-if':   'A 2-year MBA in international finance with integrated ACCA, CMA, and FM certification tracks. Built for a global edge.',
  'mba-dfaa': 'An MBA for finance pros in the digital era. Covers UPI, cloud ERP, accounting analytics, and AI-driven audit.',
  'bba-aaft': "A BBA delivered with AAFT, India's leading media school. Business fundamentals meets film, TV, streaming, and entertainment.",
  'ma':       'A specialised MA in English Literature. Built for UGC-NET aspirants, civil services candidates, and future educators.',
  'bba':      'A business degree for fresh graduates. 4 tracks: General Management, Digital Marketing, Retail Management, FinTech.',
  'bca':      'A career-ready BCA with hands-on coding labs every semester. Tracks in AI, Blockchain, Cloud, UX Design, and Data Science.',
  'ba':       'A flexible BA with 8 streams including Economics, Political Science, Literature, and Psychology. Strong civil services base.',
  'msc':      'A 2-year M.Sc in Mathematics covering pure, applied, and computational maths. Aligned with UGC-NET and GATE.',
  'majmc':    'An MA in Journalism combining theory with hands-on production across print, radio, TV, digital, and advertising.',
}

async function main() {
  console.log('Patching program descriptions...')
  for (const [slug, description] of Object.entries(DESCRIPTIONS)) {
    const id = `program-${slug}`

    // Patch the published doc.
    await client.patch(id).set({ description }).commit()

    // If a draft exists (unlikely but possible), patch it too so Studio stays clean.
    const draftId = `drafts.${id}`
    const draft = await client.getDocument(draftId)
    if (draft) {
      await client.patch(draftId).set({ description }).commit()
    }

    console.log(`  ✓ ${slug.padEnd(10)} (${description.length} chars)`)
  }
  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
