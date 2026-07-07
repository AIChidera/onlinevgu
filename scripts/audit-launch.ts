/**
 * Audit checklist items 1 and 2:
 *   1. Site Settings filled
 *   2. Brochures uploaded (default + per-program)
 *
 * Run: npx tsx scripts/audit-launch.ts
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
  perspective: 'published',
})

function badge(ok: boolean) { return ok ? '  ✓' : '  ✗' }

async function main() {
  console.log('═══════════════════════════════════════════════════════')
  console.log('  1. SITE SETTINGS')
  console.log('═══════════════════════════════════════════════════════')

  const settings = await client.fetch<Record<string, unknown> | null>(
    `*[_type == "siteSettings"][0]`
  )
  if (!settings) {
    console.log('  ✗ No siteSettings doc found. FAIL.')
    process.exit(1)
  }

  const settingChecks: [string, string][] = [
    ['nextBatch',           'Next Batch Start Date'],
    ['admissionsOpen',      'Admissions Open?'],
    ['phoneDisplay',        'Phone Number'],
    ['whatsappNumber',      'WhatsApp Number'],
    ['admissionsEmail',     'Admissions Email'],
    ['address',             'University Address'],
    ['statLearners',        'Learners Enrolled'],
    ['statCountries',       'Countries Represented'],
    ['statPlacement',       'Placement Rate'],
    ['statRating',          'Student Rating'],
    ['statPrograms',        'Programs Offered'],
    ['statHiringPartners',  'Hiring Partners'],
    ['statCourseraCount',   'Coursera Courses'],
    ['statYearEstablished', 'Year Established'],
    ['socialLinkedIn',      'Social - LinkedIn'],
    ['socialInstagram',     'Social - Instagram'],
    ['socialYouTube',       'Social - YouTube'],
    ['socialX',             'Social - X'],
    ['socialFacebook',      'Social - Facebook'],
  ]

  let missing = 0
  for (const [key, label] of settingChecks) {
    const val = settings[key]
    const ok = val !== undefined && val !== null && val !== ''
    if (!ok) missing++
    const display = ok ? String(val).substring(0, 60) : 'MISSING'
    console.log(`${badge(ok)}  ${label.padEnd(25)}  ${display}`)
  }

  const defaultBrochure = settings.defaultBrochurePdf as { asset?: unknown } | undefined
  const hasDefaultBrochure = !!(defaultBrochure && defaultBrochure.asset)
  console.log(`${badge(hasDefaultBrochure)}  Default Brochure PDF       ${hasDefaultBrochure ? 'uploaded' : 'MISSING'}`)

  console.log('')
  console.log('═══════════════════════════════════════════════════════')
  console.log('  2. PROGRAM BROCHURES')
  console.log('═══════════════════════════════════════════════════════')

  const programs = await client.fetch<Array<{ slug: string; name: string; brochurePdf?: { asset?: unknown } }>>(
    `*[_type == "program"] | order(coalesce(displayOrder, 999) asc) {
      "slug": slug.current,
      name,
      brochurePdf
    }`
  )

  let programsWithoutBrochure = 0
  for (const p of programs) {
    const has = !!(p.brochurePdf && p.brochurePdf.asset)
    if (!has) programsWithoutBrochure++
    const note = has
      ? ''
      : (hasDefaultBrochure ? '  (empty - will send default brochure)' : '  MISSING')
    console.log(`${badge(has || hasDefaultBrochure)}  ${p.name.padEnd(10)} (${p.slug})${note}`)
  }

  console.log('')
  console.log('═══════════════════════════════════════════════════════')
  console.log('  SUMMARY')
  console.log('═══════════════════════════════════════════════════════')
  console.log(`  Site Settings:      ${missing === 0 ? 'all filled ✓' : `${missing} field(s) missing ✗`}`)
  console.log(`  Default Brochure:   ${hasDefaultBrochure ? 'uploaded ✓' : 'MISSING ✗ (email fallback will be text-only)'}`)
  console.log(`  Program Brochures:  ${programs.length - programsWithoutBrochure}/${programs.length} uploaded`)
  console.log('')
  const brochuresOk = hasDefaultBrochure  // default covers any program without its own
  if (missing === 0 && brochuresOk) {
    console.log('  Items 1 and 2 are DONE. Ready to move on.')
  } else {
    console.log('  Some items still incomplete. See above.')
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
