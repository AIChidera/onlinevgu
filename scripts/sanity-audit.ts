/**
 * Audit Sanity dataset: count docs per schema type.
 * Run: npx tsx scripts/sanity-audit.ts
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

const TYPES = ['siteSettings', 'program', 'testimonial', 'faculty', 'faq', 'campusEvent', 'milestone']

async function main() {
  const counts = await client.fetch(
    `{
      ${TYPES.map(t => `"${t}": count(*[_type == "${t}"])`).join(',\n      ')}
    }`,
    {}
  )

  console.log('Sanity document counts:')
  for (const t of TYPES) console.log(`  ${t.padEnd(15)} ${counts[t]}`)

  // Sample doc per type
  for (const t of TYPES) {
    if (counts[t] === 0) continue
    const sample = await client.fetch(`*[_type == "${t}"][0..1]{ _id, _type, ...}`, {})
    console.log(`\n--- ${t} sample (${counts[t]} total) ---`)
    console.log(JSON.stringify(sample, null, 2).slice(0, 400))
  }
}

main().catch(e => { console.error(e); process.exit(1) })
