/**
 * One-off cleanup: delete Sanity faculty docs that point at program slugs
 * which no longer exist in the catalogue. The 9 real programs are:
 * mba, mba-if, mca, bca, bba, ba, ma, msc, majmc.
 *
 * Anything else (mba-healthcare, bcom, mcom, bsc, mlib, blib) is orphaned
 * and should be removed from Studio for tidiness.
 *
 * Run: npx tsx scripts/cleanup-orphaned-faculty.ts
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

const DEAD_SLUGS = ['mba-healthcare', 'bcom', 'mcom', 'bsc', 'mlib', 'blib']

interface OrphanDoc { _id: string; name: string; programs: string[] }

async function main() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('Missing SANITY_API_TOKEN in .env.local')
    process.exit(1)
  }

  console.log(`\n→ Finding faculty docs scoped to dead program slugs: ${DEAD_SLUGS.join(', ')}`)
  const orphans = await client.fetch<OrphanDoc[]>(
    `*[_type == "faculty" && count(programs[@ in $dead]) > 0]{ _id, name, programs }`,
    { dead: DEAD_SLUGS }
  )

  if (orphans.length === 0) {
    console.log('  No orphaned faculty docs found. Nothing to delete.')
    return
  }

  console.log(`  Found ${orphans.length} orphaned doc(s):`)
  for (const o of orphans) {
    console.log(`    - ${o._id} (${o.name}) → programs: ${o.programs.join(', ')}`)
  }

  console.log('\n→ Deleting…')
  for (const o of orphans) {
    await client.delete(o._id)
    console.log(`  ✓ deleted ${o._id}`)
  }

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
