/**
 * Promote a stuck draft to published, then delete the draft.
 * Used to unstick a document that the Studio Publish button won't commit.
 *
 * Run: npx tsx scripts/promote-draft.ts program-bba-aaft
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
  const publishedId = process.argv[2]
  if (!publishedId) {
    console.error('Usage: npx tsx scripts/promote-draft.ts <published-doc-id>')
    process.exit(1)
  }
  const draftId = `drafts.${publishedId}`

  const draft = await client.getDocument(draftId)
  if (!draft) {
    console.log(`No draft found at ${draftId}. Nothing to promote.`)
    return
  }

  // Copy draft contents onto the published id, minus the drafts. prefix.
  const promoted = { ...draft, _id: publishedId }
  // These fields belong to the draft doc itself and shouldn't be copied.
  delete (promoted as Record<string, unknown>)._rev
  delete (promoted as Record<string, unknown>)._system

  await client.createOrReplace(promoted as never)
  console.log(`✓ Published: copied draft onto ${publishedId}`)

  await client.delete(draftId)
  console.log(`✓ Deleted stale draft: ${draftId}`)

  console.log('\nDone.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
