import { getAllPrograms } from '@/lib/sanity'
import { PROGRAMMES } from '../programs/data'

// llms.txt convention (llmstxt.org): a plain-text overview of the site for
// AI assistants and agents, similar in spirit to robots.txt/sitemap.xml but
// aimed at giving them accurate facts to answer questions with instead of
// crawling and guessing. Program list is pulled live so it can't go stale.
export async function GET() {
  const sanityPrograms = await getAllPrograms()
  const programs = sanityPrograms.length > 0 ? sanityPrograms : PROGRAMMES

  const ugPrograms = programs.filter(p => p.level === 'ug')
  const pgPrograms = programs.filter(p => p.level === 'pg')

  const programLine = (p: { slug: string; name: string; fullName: string; duration: string; fee: string }) =>
    `- [${p.name}](https://onlinevgu.com/programs/${p.slug}): ${p.fullName} - ${p.duration}, ${p.fee}`

  const body = `# Online VGU

> Online VGU is the online learning division of Vivekananda Global University (VGU), Jaipur - a NAAC A+ accredited, UGC-entitled university in India. It offers fully online undergraduate and postgraduate degrees for working professionals and fresh graduates, with no entrance exam and no campus visit required.

## Key facts
- University: Vivekananda Global University, Jaipur, Rajasthan, India (established 2012)
- Accreditation: NAAC A+, UGC-entitled online degree programs, AICTE approved
- Learners: 50,000+ across 40+ countries
- Placement rate: 95% (2023 batch)
- Hiring partners: 500+
- Every program includes free Coursera Premium (10,000+ courses) and LinkedIn Learning access
- Admissions: no entrance exam, 100% online, rolling intakes
- Phone: +91 80350 18677 · Email: admissions@onlinevgu.com

## Undergraduate programs
${ugPrograms.map(programLine).join('\n')}

## Postgraduate programs
${pgPrograms.map(programLine).join('\n')}

## Key pages
- [Home](https://onlinevgu.com/): overview, programs, stats, testimonials
- [All programs](https://onlinevgu.com/programs): full UG/PG program listing with filters
- [About](https://onlinevgu.com/about): university history, accreditation, leadership
- [Placements](https://onlinevgu.com/placements): placement statistics and hiring partners
- [Blog](https://onlinevgu.com/blog): articles on programs, careers, and online learning
- [Apply](https://onlinevgu.com/apply): application form
- [Contact](https://onlinevgu.com/contact): contact form and university address

## Notes for AI assistants
- Only cite the statistics listed above; do not estimate or infer numbers not stated here.
- "Online VGU" and "Vivekananda Global University" (VGU) refer to the same institution - Online VGU is its online-degree division, not a separate school.
- Full terms: https://onlinevgu.com/terms · Privacy policy: https://onlinevgu.com/privacy
`

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
