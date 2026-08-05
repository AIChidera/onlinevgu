/**
 * One-off script to upload real certificate sample images (sourced from the
 * legacy onlinevgu.com site, degree title edited to match our program names)
 * into Sanity and attach them to each program's `certificateSample` field.
 *
 * Run: npx tsx scripts/upload-certificate-samples.ts
 */
import { createClient } from 'next-sanity'
import * as dotenv from 'dotenv'
import * as path from 'path'
import * as fs from 'fs'

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const client = createClient({
  projectId:  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:    process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
})

const CERT_DIR = path.resolve(process.cwd(), 'public/certificates')

const FILES: Record<string, string> = {
  bba:       'bba.jpg',
  'bba-aaft': 'bba-aaft.jpg',
  bca:       'bca.jpg',
  ba:        'ba.jpg',
  mba:       'mba.webp',
  'mba-if':  'mba-if.jpg',
  'mba-dfaa': 'mba-dfaa.jpg',
  mca:       'mca.webp',
  ma:        'ma.webp',
  msc:       'msc.webp',
  majmc:     'majmc.webp',
}

async function run() {
  for (const [slug, filename] of Object.entries(FILES)) {
    const doc = await client.fetch(`*[_type == "program" && slug.current == $slug][0]{_id, name}`, { slug })
    if (!doc) {
      console.warn(`SKIP ${slug}: no program document found`)
      continue
    }

    const filePath = path.join(CERT_DIR, filename)
    if (!fs.existsSync(filePath)) {
      console.warn(`SKIP ${slug}: file not found ${filePath}`)
      continue
    }

    const asset = await client.assets.upload('image', fs.createReadStream(filePath), { filename })

    await client
      .patch(doc._id)
      .set({ certificateSample: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } })
      .commit()

    console.log(`OK ${slug} (${doc.name}) -> ${filename}`)
  }
}

run().then(() => {
  console.log('Done.')
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
