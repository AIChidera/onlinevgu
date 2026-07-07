/**
 * Patches the siteSettings doc with the correct phone, WhatsApp, and social
 * URLs. Idempotent - safe to re-run. Only sets fields explicitly listed here
 * so nothing else on the doc is touched.
 *
 * Run: npx tsx scripts/fix-site-settings.ts
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

const CORRECTIONS = {
  phoneDisplay:     '+91 80350 18677',
  whatsappNumber:   '918035018677',
  socialLinkedIn:   'https://www.linkedin.com/school/vgu/',
  socialInstagram:  'https://www.instagram.com/vgujaipur/',
  socialYouTube:    'https://www.youtube.com/@VGUVITCampusJaipur',
  socialX:          'https://x.com/JaipurVgu',
  socialFacebook:   'https://www.facebook.com/vgujpr',
}

async function main() {
  // Find the siteSettings doc id first, since it's a singleton the id can vary
  const doc = await client.fetch<{ _id: string } | null>(`*[_type == "siteSettings"][0]{ _id }`)
  if (!doc) {
    console.error('No siteSettings document found. Aborting.')
    process.exit(1)
  }

  console.log(`Patching ${doc._id} ...`)

  await client.patch(doc._id).set(CORRECTIONS).commit()

  // Also patch the draft copy if one exists, so Studio doesn't show a stale
  // draft that overrides the published values.
  const draftId = `drafts.${doc._id}`
  const draft = await client.getDocument(draftId)
  if (draft) {
    await client.patch(draftId).set(CORRECTIONS).commit()
    console.log(`  · also patched draft: ${draftId}`)
  }

  console.log('Done.\n')
  for (const [k, v] of Object.entries(CORRECTIONS)) {
    console.log(`  ✓ ${k.padEnd(18)} = ${v}`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
