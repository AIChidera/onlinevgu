/**
 * Clears the stuck `brochurePdf` field on a program doc so it goes back to
 * an empty state - safe for the user to re-upload in Studio.
 *
 * When a file upload is interrupted, Sanity leaves the field with just an
 * `_upload` object and no `asset` reference. That inconsistent shape then
 * crashes Studio with:
 *   "getAttribute only applies to plain objects"
 *
 * Run: npx tsx scripts/fix-stuck-brochure.ts bba-aaft
 * Or:  npx tsx scripts/fix-stuck-brochure.ts        (unsets on both new progs)
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

async function fix(slug: string) {
  const id = `program-${slug}`
  const doc = await client.getDocument(id)
  if (!doc) {
    console.log(`  ✗ ${slug}: doc not found`)
    return
  }
  const b = doc.brochurePdf as { asset?: unknown; _upload?: unknown } | undefined
  if (!b) {
    console.log(`  · ${slug}: brochurePdf already empty`)
    return
  }
  if (b.asset) {
    console.log(`  · ${slug}: brochurePdf has a valid asset - leaving alone`)
    return
  }
  await client.patch(id).unset(['brochurePdf']).commit({ autoGenerateArrayKeys: false })
  console.log(`  ✓ ${slug}: cleared stuck brochurePdf`)
}

async function main() {
  const slug = process.argv[2]
  const targets = slug ? [slug] : ['bba-aaft', 'mba-dfaa']
  console.log(`Fixing: ${targets.join(', ')}`)
  for (const t of targets) await fix(t)
  console.log('\nDone. Refresh Sanity Studio and try uploading again.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
