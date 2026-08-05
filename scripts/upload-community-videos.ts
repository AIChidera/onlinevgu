/**
 * One-off script to wire the 3 real VGU community videos (sourced from the
 * official @vguonline YouTube channel) into Sanity:
 *   - Panache highlights      -> campusEvent "event-welcome-orientation"
 *   - 1st Convocation         -> campusEvent "event-convocation"
 *   - "From Doubt to Success" -> testimonial "testimonial-kavya-nair" (replaces
 *     the fictional "Kavya Nair / MBA Healthcare" persona - MBA Healthcare
 *     isn't even a real VGU program - with a real, unscripted student video)
 *
 * Run: npx tsx scripts/upload-community-videos.ts
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

const VIDEOS_DIR = 'C:\\Users\\nwang\\AppData\\Local\\Temp\\claude\\c--Users-nwang-Desktop-onlinevgu\\cd0ad424-590d-4a58-b6ea-6e381313eb35\\scratchpad\\videos'

async function uploadImage(filename: string) {
  const filePath = path.join(VIDEOS_DIR, filename)
  return client.assets.upload('image', fs.createReadStream(filePath), { filename })
}

async function run() {
  const panacheAsset = await uploadImage('panache.jpg')
  await client
    .patch('event-welcome-orientation')
    .set({
      videoUrl: 'https://www.youtube.com/watch?v=Wpc1GJwGMqA',
      photo: { _type: 'image', asset: { _type: 'reference', _ref: panacheAsset._id } },
    })
    .commit()
  console.log('OK campusEvent Panache -> video wired')

  const convocationAsset = await uploadImage('convocation.jpg')
  await client
    .patch('event-convocation')
    .set({
      videoUrl: 'https://www.youtube.com/watch?v=GskP8W79f04',
      photo: { _type: 'image', asset: { _type: 'reference', _ref: convocationAsset._id } },
    })
    .commit()
  console.log('OK campusEvent Convocation -> video wired')

  const studentAsset = await uploadImage('doubt-to-success.jpg')
  await client
    .patch('testimonial-kavya-nair')
    .set({
      name:       'Straight From Our Learners',
      role:       '',
      program:    'Real Story',
      quote:      'This learner takes you through their honest, first-person journey with Online VGU: the doubts, the challenges, and what changed along the way.',
      outcomes:   [],
      avatar:     { _type: 'image', asset: { _type: 'reference', _ref: studentAsset._id } },
      colorTheme: 'green',
      videoLabel: 'From Doubt to Success · 2 min',
      videoUrl:   'https://www.youtube.com/watch?v=K5zbXlB9E1k',
    })
    .unset(['before', 'after', 'headlineOutcome'])
    .commit()
  console.log('OK testimonial Kavya Nair -> replaced with real video story')
}

run().then(() => {
  console.log('Done.')
  process.exit(0)
}).catch(err => {
  console.error(err)
  process.exit(1)
})
