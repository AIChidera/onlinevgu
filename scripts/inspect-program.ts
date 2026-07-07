/**
 * Fetch a program doc from Sanity to inspect its shape for schema mismatches.
 * Run: npx tsx scripts/inspect-program.ts bba-aaft
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

async function main() {
  const slug = process.argv[2] ?? 'bba-aaft'
  const id = `program-${slug}`
  const doc = await client.getDocument(id)
  console.log(JSON.stringify(doc, null, 2))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
