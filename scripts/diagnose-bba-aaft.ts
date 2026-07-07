/**
 * List every program-bba-aaft variant (published + drafts) in Sanity and
 * show the getAllPrograms query result so we can see what's being duplicated
 * on the frontend.
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
  console.log('=== Every doc matching slug "bba-aaft" ===')
  const bySlug = await client.fetch(
    `*[_type == "program" && slug.current == "bba-aaft"]{ _id, _rev, _createdAt, _updatedAt, name, "slug": slug.current }`
  )
  console.log(JSON.stringify(bySlug, null, 2))

  console.log('\n=== Every _id starting with "program-bba" ===')
  const byId = await client.fetch(
    `*[_id in path("program-bba-aaft") || _id in path("drafts.program-bba-aaft")]{ _id, _rev, name, "slug": slug.current }`
  )
  console.log(JSON.stringify(byId, null, 2))

  console.log('\n=== All programs (matches what getAllPrograms uses) ===')
  const all = await client.fetch(
    `*[_type == "program"] | order(coalesce(displayOrder, 999) asc) { _id, name, "slug": slug.current }`
  )
  console.log(JSON.stringify(all, null, 2))
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
