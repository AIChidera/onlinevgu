import { defineField, defineType, defineArrayMember } from 'sanity'
import { ICON_OPTIONS } from '@/lib/iconOptions'

const iconField = (name: string, title = 'Icon') =>
  defineField({ name, title, type: 'string', options: { list: [...ICON_OPTIONS], layout: 'dropdown' }, validation: R => R.required() })

// Singleton (one document total) holding every editable piece of About page
// copy/imagery that isn't already its own content type. Milestones (the
// History timeline itself) stay on the existing `milestone` schema; hiring
// partner company names live on Site Settings, shared with the Placements
// page. Every field here is optional - the About page renders its current
// hardcoded copy whenever a field is blank.
export default defineType({
  name: 'aboutPage',
  title: 'About Page Content',
  type: 'document',

  groups: [
    { name: 'hero',            title: 'Hero',      default: true },
    { name: 'stats',           title: 'Stats'                     },
    { name: 'values',          title: 'Mission & Values'          },
    { name: 'accreditations',  title: 'Accreditations'            },
    { name: 'pedagogy',        title: 'Pedagogy'                  },
    { name: 'leadership',      title: 'Leadership'                },
    { name: 'campus',          title: 'Campus Experience'         },
    { name: 'hiring',          title: 'Hiring Partners'           },
    { name: 'history',         title: 'History'                   },
    { name: 'alumni',          title: 'Alumni Community'          },
  ],

  fields: [
    // ── Hero ──────────────────────────────────────────────────────
    defineField({ name: 'heroImage', title: 'Hero Background Photo', type: 'image', options: { hotspot: true }, description: 'Landscape, 1400px+ wide. Leave empty to keep the current stock photo.', group: 'hero' }),
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'About Vivekananda Global University', group: 'hero' }),
    defineField({ name: 'heroHeadingLine1', title: 'Headline - after the year count', type: 'string', description: 'The number of years is calculated automatically from the founding year in Site Settings. E.g. "years of" in "12 years of academic excellence."', initialValue: 'years of', group: 'hero' }),
    defineField({ name: 'heroHeadingLine2', title: 'Headline - second line (highlighted)', type: 'string', initialValue: 'academic excellence.', group: 'hero' }),
    defineField({ name: 'heroSubtext', title: 'Subtext', type: 'text', rows: 3, description: 'Use {foundingYear} and {countries} anywhere to auto-insert those live values from Site Settings.', initialValue: 'Founded in {foundingYear} in Jaipur, VGU has grown into one of India\'s most respected NAAC A+ universities - now bringing that same quality online to learners across {countries} countries.', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Apply Now', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Our Programs', group: 'hero' }),

    // ── Stats strip ───────────────────────────────────────────────
    defineField({
      name: 'statsCards',
      title: '4 Stat Cards',
      type: 'array',
      description: 'Must have exactly 4 - the layout is a fixed 4-column grid. The big number itself is calculated live (founding year, learner count, country count) - these fields are just the label and caption under each number.',
      group: 'stats',
      validation: R => R.length(4).error('Exactly 4 stat cards are required - the layout is a fixed 4-column grid.'),
      initialValue: [
        { label: 'Year established',    detail: 'Jaipur, Rajasthan',           icon: 'buildingBank' },
        { label: 'Accreditation grade', detail: '3.29 / 4.0 CGPA · Valid 2027', icon: 'award', value: 'NAAC A+' },
        { label: 'Online learners',     detail: 'Across India & abroad',       icon: 'users' },
        { label: 'Countries',           detail: 'Global alumni network',       icon: 'globe' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Stat Card',
          fields: [
            defineField({ name: 'value', title: 'Override Value (optional)', type: 'string', description: 'Leave blank for the first, third, and fourth cards - those numbers are calculated live and stay accurate automatically. Only the "Accreditation grade" card needs a fixed value (e.g. "NAAC A+") since it has no live source.' }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'detail', title: 'Detail Caption', type: 'string', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),

    // ── Mission & Values ──────────────────────────────────────────
    defineField({ name: 'valuesEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our mission', group: 'values' }),
    defineField({ name: 'valuesHeading', title: 'Heading', type: 'string', initialValue: 'Making great education accessible to every serious learner.', group: 'values' }),
    defineField({ name: 'valuesPullQuote', title: 'Pull-Quote', type: 'text', rows: 2, initialValue: 'Geography, cost, or life stage should not determine the quality of education someone receives.', group: 'values' }),
    defineField({ name: 'valuesParagraph', title: 'Paragraph', type: 'text', rows: 3, initialValue: 'VGU Online exists to make a NAAC A+ degree available to working professionals, rural students, and career-changers - wherever they are. The certificate, legal standing, and employer recognition are identical to the on-campus version.', group: 'values' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'values',
      initialValue: [
        { title: 'Accessible quality',    body: 'Every Indian deserves access to a degree from a great university - not just those who can afford to leave home.', icon: 'school' },
        { title: 'Employer credibility',  body: 'UGC-entitled degrees. No asterisks, no footnotes. The same certificate an on-campus student receives.', icon: 'certificate' },
        { title: 'Real outcomes',         body: '95% placement rate - built on 500+ hiring partners and a placement cell that works year-round.', icon: 'trendingUp' },
        { title: 'Faculty with practice', body: 'Professors who consult for Fortune 500 companies and publish active research - not just career academics.', icon: 'brain' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Value',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    // ── Accreditations ────────────────────────────────────────────
    defineField({ name: 'accreditationsEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Recognised by', group: 'accreditations' }),
    defineField({ name: 'accreditationsHeading', title: 'Heading', type: 'string', initialValue: 'Accreditations & Recognition', group: 'accreditations' }),
    defineField({
      name: 'accreditations',
      title: 'Accreditations',
      type: 'array',
      group: 'accreditations',
      initialValue: [
        { name: 'UGC',     fullName: 'University Grants Commission',                  detail: 'Distance Education Bureau entitlement, degrees carry the same legal standing as on-campus qualifications.', colorStyle: 'red',  status: 'Entitled',   ghostLetter: 'U' },
        { name: 'NAAC A+', fullName: 'National Assessment and Accreditation Council', detail: 'Highest grade, 3.29 / 4.0 CGPA. First cycle accreditation in 2022, valid through 2027.',                  colorStyle: 'yel',  status: 'A+ Grade',   ghostLetter: 'N' },
        { name: 'AICTE',   fullName: 'All India Council for Technical Education',     detail: 'Approved programs in Technology and Management, ensuring curriculum meets national standards.',               colorStyle: 'dark', status: 'Approved',   ghostLetter: 'A' },
        { name: 'NIRF',    fullName: 'National Institutional Ranking Framework',      detail: 'Ranked by the Ministry of Education under the University and Management categories.',                          colorStyle: 'red',  status: 'Ranked',     ghostLetter: 'N' },
        { name: 'AIU',     fullName: 'Association of Indian Universities',            detail: 'Member institution, VGU degrees are recognised for equivalence by all AIU member universities.',               colorStyle: 'yel',  status: 'Member',     ghostLetter: 'A' },
        { name: 'WES',     fullName: 'World Education Services, Canada',              detail: 'International degree recognition, VGU graduates can use their degree for immigration and work abroad.',         colorStyle: 'dark', status: 'Recognised', ghostLetter: 'W' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Accreditation',
          fields: [
            defineField({ name: 'name', title: 'Short Name', type: 'string', description: 'E.g. "NAAC A+".', validation: R => R.required() }),
            defineField({ name: 'fullName', title: 'Full Name', type: 'string', validation: R => R.required() }),
            defineField({ name: 'detail', title: 'Detail', type: 'text', rows: 2, validation: R => R.required() }),
            defineField({
              name: 'colorStyle',
              title: 'Color Style',
              type: 'string',
              options: { list: [{ title: 'Red', value: 'red' }, { title: 'Yellow', value: 'yel' }, { title: 'Dark Red', value: 'dark' }], layout: 'radio' },
              initialValue: 'red',
              validation: R => R.required(),
            }),
            defineField({ name: 'logo', title: 'Logo Image (optional)', type: 'image', description: 'If left blank, a colored badge with the ghost letter below is shown instead.' }),
            defineField({ name: 'status', title: 'Status Badge Text', type: 'string', description: 'E.g. "A+ Grade", "Approved", "Member".', validation: R => R.required() }),
            defineField({ name: 'ghostLetter', title: 'Ghost Watermark Letter', type: 'string', description: 'A single large faint letter shown in the card background. Usually the first letter of the name.', validation: R => R.required().max(2) }),
          ],
          preview: { select: { title: 'name', subtitle: 'status', media: 'logo' } },
        }),
      ],
    }),

    // ── Pedagogy ──────────────────────────────────────────────────
    defineField({ name: 'pedagogyEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'How we teach', group: 'pedagogy' }),
    defineField({ name: 'pedagogyHeading', title: 'Heading', type: 'string', initialValue: 'Our Pedagogy', group: 'pedagogy' }),
    defineField({ name: 'pedagogySubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'Every VGU program is built on the same instructional foundation - designed for working adults who need flexibility without losing structure.', group: 'pedagogy' }),
    defineField({
      name: 'pedagogy',
      title: 'Pedagogy Items',
      type: 'array',
      group: 'pedagogy',
      initialValue: [
        { title: 'AI-Powered Video Lectures', body: 'Structured video modules with AI-generated summaries and topic breakdowns, so revision takes minutes, not hours.', icon: 'video' },
        { title: 'Live Interactive Classes',  body: 'Weekend live sessions with faculty, with real-time Q&A and doubt-clearing built in.', icon: 'broadcast' },
        { title: 'Recorded Sessions',         body: 'Missed a class? Every live session is recorded and stays available to rewatch anytime.', icon: 'playerPlay' },
        { title: 'Smart Assessment Tools',    body: 'Auto-graded quizzes and proctored exams that give instant feedback on where you stand.', icon: 'clipboardCheck' },
        { title: 'Discussion Forums',         body: 'Peer and faculty discussion boards for every course, open around the clock.', icon: 'messages' },
        { title: 'Industry Expert Talk',      body: 'Guest sessions from industry leaders connecting classroom learning to real-world practice.', icon: 'microphone2' },
        { title: 'Placement Support',         body: 'End-to-end placement assistance, from resume building to interview preparation.', icon: 'briefcase' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Pedagogy Item',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    // ── Leadership ────────────────────────────────────────────────
    defineField({ name: 'leadershipEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Leadership', group: 'leadership' }),
    defineField({ name: 'leadershipHeading', title: 'Heading', type: 'string', initialValue: 'Guided by experienced academic leadership', group: 'leadership' }),
    defineField({ name: 'leadershipSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'Full leadership profiles are being added. Here is how the university is led.', group: 'leadership' }),
    defineField({
      name: 'leadershipRoles',
      title: 'Leadership Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Role titles only - photos and bios aren\'t available yet.',
      initialValue: ['Chancellor', 'Vice-Chancellor', 'Registrar', 'Director, Online Education (CDOE)'],
      group: 'leadership',
    }),

    // ── Campus Experience ─────────────────────────────────────────
    defineField({ name: 'campusEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Campus experience', group: 'campus' }),
    defineField({ name: 'campusHeadingLine1', title: 'Headline - line 1', type: 'string', initialValue: 'Your degree is online.', group: 'campus' }),
    defineField({ name: 'campusHeadingLine2', title: 'Headline - line 2', type: 'string', initialValue: 'Your university is real.', group: 'campus' }),
    defineField({ name: 'campusParagraph', title: 'Paragraph', type: 'text', rows: 3, initialValue: 'Online doesn\'t mean isolated. VGU brings you to campus for immersions, connects you with faculty in person, and celebrates your graduation on the same stage as every other VGU student.', group: 'campus' }),
    defineField({ name: 'campusImage', title: 'Campus Photo', type: 'image', options: { hotspot: true }, description: 'Leave empty to keep the current stock photo.', group: 'campus' }),
    defineField({ name: 'campusCtaLabel', title: 'Button Label', type: 'string', initialValue: 'Explore programs', group: 'campus' }),
    defineField({
      name: 'campusFeatures',
      title: 'Campus Features',
      type: 'array',
      group: 'campus',
      initialValue: [
        { title: 'In-person campus immersions',   body: 'Step onto campus multiple times a year for workshops, labs, and hands-on sessions with faculty who bring real industry experience.', icon: 'school' },
        { title: 'Graduation ceremony on campus', body: 'Cross the same stage as every VGU student and receive your degree in Jaipur. A moment earned - properly celebrated.', icon: 'certificate' },
        { title: 'Faculty and peer meetups',      body: 'Connect face-to-face with classmates and professors. Build relationships that outlast the program.', icon: 'users' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Campus Feature',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'campusProofStats',
      title: 'Proof Strip (3 stats under the photo)',
      type: 'array',
      description: 'Must have exactly 3 - the layout is a fixed 3-column strip.',
      group: 'campus',
      validation: R => R.length(3).error('Exactly 3 stats are required - the layout is a fixed 3-column strip.'),
      initialValue: [
        { value: '3×',    label: 'Immersions per year' },
        { value: '100%',  label: 'On-campus degree' },
        { value: '50K+',  label: 'Alumni network' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Proof Stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string', validation: R => R.required() }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        }),
      ],
    }),

    // ── Hiring Partners (copy only - company list is on Site Settings) ──
    defineField({ name: 'hiringEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Hiring partners', group: 'hiring' }),
    defineField({ name: 'hiringHeading', title: 'Heading', type: 'string', description: 'Use {hiringPartners} to auto-insert the live hiring-partner count from Site Settings.', initialValue: '{hiringPartners} companies hire VGU graduates', group: 'hiring' }),
    defineField({ name: 'hiringSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'From India\'s biggest conglomerates to global tech firms - a VGU degree opens real doors.', group: 'hiring' }),
    defineField({ name: 'hiringCtaLabel', title: 'Button Label', type: 'string', initialValue: 'Start your career journey', group: 'hiring' }),

    // ── History ───────────────────────────────────────────────────
    defineField({ name: 'historyEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Our history', group: 'history' }),
    defineField({ name: 'historyHeading', title: 'Heading', type: 'string', initialValue: 'Years of steady impact', group: 'history' }),
    defineField({ name: 'historyParagraph', title: 'Paragraph', type: 'text', rows: 3, initialValue: 'From a single campus in Jaipur to a globally accessible online university - a decade-plus of making quality education reachable for every serious learner.', group: 'history' }),
    defineField({ name: 'historyNaacCaption', title: 'NAAC Card Caption', type: 'string', initialValue: 'First cycle 2022 · 3.29/4.0 CGPA · Valid 2027', group: 'history' }),
    defineField({
      name: 'historyChips',
      title: 'Recent Achievement Chips',
      type: 'array',
      group: 'history',
      description: 'The full timeline below is managed under Milestones, not here - these are just the 3 small highlight chips at the top of the sticky panel.',
      initialValue: [
        { label: 'QS 95th in India',  year: '2025' },
        { label: 'Google AI Campus',  year: '2024' },
        { label: 'IIRF 37th Pvt Uni', year: '2026' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Chip',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'year', title: 'Year', type: 'string', validation: R => R.required() }),
          ],
          preview: { select: { title: 'label', subtitle: 'year' } },
        }),
      ],
    }),

    // ── Alumni Community ──────────────────────────────────────────
    defineField({ name: 'alumniEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Alumni community', group: 'alumni' }),
    defineField({ name: 'alumniHeading', title: 'Heading', type: 'string', description: 'Use {learners} to auto-insert the live learner count.', initialValue: 'Join {learners} learners who didn\'t wait.', group: 'alumni' }),
    defineField({ name: 'alumniSubtext', title: 'Subtext', type: 'text', rows: 2, description: 'Use {countries} to auto-insert the live country count.', initialValue: 'Working professionals, fresh graduates, and career-changers from across India and {countries} countries - one alumni network.', group: 'alumni' }),
    defineField({
      name: 'alumniFeatures',
      title: '3 Alumni Feature Cards',
      type: 'array',
      description: 'Must have exactly 3 - the layout is a fixed 3-column grid. The big number is calculated live from Site Settings (learners / hiring partners / placement rate) - these fields are just the label, body, and icon.',
      group: 'alumni',
      validation: R => R.length(3).error('Exactly 3 feature cards are required - the layout is a fixed 3-column grid.'),
      initialValue: [
        { label: 'Learners and counting', body: 'Online learners from across India and many countries. A community that grows every semester.', icon: 'globe' },
        { label: 'Hiring partners',       body: 'AI-powered placement portal, unlimited mock interviews, and a placement cell working year-round.', icon: 'trendingUp' },
        { label: 'Placement rate',        body: 'Class of 2023. Built on real employer relationships and a curriculum aligned with what companies hire for.', icon: 'award' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Alumni Feature',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({ name: 'alumniCtaPrimaryLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Apply Now', group: 'alumni' }),
    defineField({ name: 'alumniCtaSecondaryLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Browse programs', group: 'alumni' }),
  ],

  preview: {
    prepare: () => ({ title: 'About Page Content', subtitle: 'Hero, Stats, Values, Accreditations, Pedagogy, Leadership, Campus, Hiring, History, Alumni' }),
  },
})
