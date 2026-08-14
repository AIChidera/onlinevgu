import { defineField, defineType, defineArrayMember } from 'sanity'
import { ICON_OPTIONS } from '@/lib/iconOptions'

const iconField = (name: string, title = 'Icon') =>
  defineField({ name, title, type: 'string', options: { list: [...ICON_OPTIONS], layout: 'dropdown' }, validation: R => R.required() })

// Singleton (one document total) holding every editable piece of Placements
// page copy/imagery that isn't already its own content type. Hiring partner
// company names live on Site Settings, shared with the About page. Success
// Stories are the existing `testimonial` type (showOnPlacementsPage flag +
// company/journey fields) rather than a bespoke array. Every field here is
// optional - the page renders its current hardcoded copy whenever blank.
export default defineType({
  name: 'placementsPage',
  title: 'Placements Page Content',
  type: 'document',

  groups: [
    { name: 'hero',      title: 'Hero',            default: true },
    { name: 'stats',     title: 'Stats'                            },
    { name: 'support',   title: 'Career Support'                   },
    { name: 'hiring',    title: 'Hiring Partners'                  },
    { name: 'industries', title: 'Industries'                      },
    { name: 'process',   title: 'Placement Process'                },
    { name: 'success',   title: 'Success Stories'                  },
  ],

  fields: [
    // ── Hero ──────────────────────────────────────────────────────
    defineField({ name: 'heroImage', title: 'Hero Background Photo', type: 'image', options: { hotspot: true }, description: 'Landscape, 1400px+ wide. Leave empty to keep the current stock photo.', group: 'hero' }),
    defineField({ name: 'heroEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Placements & Careers', group: 'hero' }),
    defineField({ name: 'heroHeadingLine1', title: 'Headline - line 1', type: 'string', initialValue: 'Built for', group: 'hero' }),
    defineField({ name: 'heroHeadingHighlight', title: 'Headline - line 2 (highlighted)', type: 'string', initialValue: 'real careers.', group: 'hero' }),
    defineField({ name: 'heroSubtext', title: 'Subtext', type: 'text', rows: 2, description: 'Use {placement} to auto-insert the live placement-rate percentage from Site Settings.', initialValue: '{placement} of our 2023 batch placed within six months. Every learner gets the same support - no asterisks.', group: 'hero' }),
    defineField({ name: 'heroPrimaryCtaLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Apply Now', group: 'hero' }),
    defineField({ name: 'heroSecondaryCtaLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Browse Programs', group: 'hero' }),

    // ── Stats strip ───────────────────────────────────────────────
    defineField({
      name: 'statsCards',
      title: '4 Stat Cards',
      type: 'array',
      description: 'Must have exactly 4 - the layout is a fixed 4-column grid. The big number for Placement rate, Hiring partners, and Alumni network is calculated live from Site Settings - only the "Top recruiters" card needs a fixed value since it has no live source.',
      group: 'stats',
      validation: R => R.length(4).error('Exactly 4 stat cards are required - the layout is a fixed 4-column grid.'),
      initialValue: [
        { label: 'Placement rate',  detail: 'Class of 2023, within 6 months', icon: 'trendingUp' },
        { label: 'Hiring partners', detail: 'Across India and abroad',        icon: 'building' },
        { label: 'Top recruiters',  detail: 'TCS, Deloitte, Amazon and more', icon: 'award', value: '25+' },
        { label: 'Alumni network',  detail: 'Across many countries',         icon: 'users' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Stat Card',
          fields: [
            defineField({ name: 'value', title: 'Override Value (optional)', type: 'string', description: 'Leave blank for Placement rate, Hiring partners, and Alumni network - those numbers are calculated live. Only "Top recruiters" needs a fixed value (e.g. "25+").' }),
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'detail', title: 'Detail Caption', type: 'string', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),

    // ── Career Support ────────────────────────────────────────────
    defineField({ name: 'supportEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'How we support you', group: 'support' }),
    defineField({ name: 'supportHeading', title: 'Heading', type: 'string', initialValue: 'A placement cell that actually places you.', group: 'support' }),
    defineField({ name: 'supportSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'Every Online VGU learner gets the same end-to-end placement support that on-campus students receive. No extra cost, no asterisks.', group: 'support' }),
    defineField({
      name: 'supportServices',
      title: 'Support Services',
      type: 'array',
      group: 'support',
      initialValue: [
        { title: 'AI Placement Portal',        body: 'Personalised job matches scored against your skills, goals, and location preferences.', icon: 'brain' },
        { title: 'Unlimited Mock Interviews',  body: 'One-on-one practice rounds with industry mentors and recruiters, as many as you need.', icon: 'headset' },
        { title: 'Resume Review',              body: 'Personalised feedback from recruiters at the firms you actually want to work at.', icon: 'fileText' },
        { title: 'LinkedIn Optimisation',      body: 'Recruiter-ready profile, properly tagged, with a portfolio that gets clicks.', icon: 'brandLinkedin' },
        { title: 'Industry Expert Sessions',   body: 'Hiring managers and HR leads share what they actually look for in candidates.', icon: 'users' },
        { title: 'Year-round Placement Cell',  body: 'Dedicated support that runs all twelve months, not just at the end of your program.', icon: 'clock' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Support Service',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    // ── Hiring Partners (copy only - company list is on Site Settings) ──
    defineField({ name: 'hiringEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Where you\'ll work', group: 'hiring' }),
    defineField({ name: 'hiringHeading', title: 'Heading', type: 'string', description: 'Use {hiringPartners} to auto-insert the live hiring-partner count from Site Settings.', initialValue: '{hiringPartners} companies hire VGU graduates', group: 'hiring' }),
    defineField({ name: 'hiringSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'From India\'s biggest conglomerates to global tech firms across IT, finance, consulting, and more.', group: 'hiring' }),
    defineField({ name: 'hiringFooterText', title: 'Footer Text', type: 'string', initialValue: 'And 475+ more recruiters across India and abroad.', group: 'hiring' }),

    // ── Industries ────────────────────────────────────────────────
    defineField({ name: 'industriesEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Industries we place into', group: 'industries' }),
    defineField({ name: 'industriesHeading', title: 'Heading', type: 'string', initialValue: 'Hiring across every major sector.', group: 'industries' }),
    defineField({ name: 'industriesSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'Wherever your career heads next, the same team supports you with industry-specific prep, recruiter relationships, and alumni connections.', group: 'industries' }),
    defineField({
      name: 'industries',
      title: 'Industries',
      type: 'array',
      group: 'industries',
      initialValue: [
        { title: 'IT Services & Tech',       body: 'Application development, cloud, DevOps, data engineering, product roles.', companies: 'TCS · Infosys · HCL · Wipro · Cognizant', icon: 'deviceLaptop' },
        { title: 'BFSI & Fintech',           body: 'Banking operations, insurance, lending, fintech product, risk and compliance.', companies: 'HDFC Bank · ICICI Bank · Axis Bank · Bajaj Finserv · PhonePe', icon: 'buildingBank' },
        { title: 'Consulting & Advisory',    body: 'Strategy, audit, tax, technology consulting, and process advisory.', companies: 'Deloitte · EY · KPMG · Accenture · Capgemini', icon: 'briefcase' },
        { title: 'E-commerce & Internet',    body: 'Product, operations, growth, category management, and partnerships.', companies: 'Amazon · Flipkart · Zomato', icon: 'shoppingCart' },
        { title: 'Conglomerates',            body: 'Operations, projects, supply chain, and leadership rotation programs.', companies: 'Tata Group · Reliance Industries · Mahindra', icon: 'building' },
        { title: 'Healthcare & Pharma',      body: 'Healthcare administration, hospital operations, pharma management.', companies: 'Apollo · Fortis · Cipla · Sun Pharma', icon: 'stethoscope' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Industry',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            defineField({ name: 'companies', title: 'Example Companies', type: 'string', description: 'E.g. "TCS · Infosys · HCL".', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title', subtitle: 'companies' } },
        }),
      ],
    }),

    // ── Placement Process ─────────────────────────────────────────
    defineField({ name: 'processEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Your placement journey', group: 'process' }),
    defineField({ name: 'processHeading', title: 'Heading', type: 'string', initialValue: 'From profile build to first day of work.', group: 'process' }),
    defineField({ name: 'processSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'A four-stage process the placement cell runs with you, end-to-end.', group: 'process' }),
    defineField({
      name: 'processSteps',
      title: '4 Process Stages',
      type: 'array',
      description: 'Must have exactly 4 - the connecting line on desktop is laid out for 4 columns.',
      group: 'process',
      validation: R => R.length(4).error('Exactly 4 stages are required - the desktop layout is built for 4 columns.'),
      initialValue: [
        { badge: 'Stage 1', title: 'Profile Build',           body: 'Resume rebuild, LinkedIn polish, skill mapping. We baseline where you are.', time: '1-2 weeks', icon: 'userCheck' },
        { badge: 'Stage 2', title: 'Pre-Placement Training',  body: 'Mock interviews, group discussions, aptitude prep, industry sessions.', time: '4 weeks', icon: 'clipboardList' },
        { badge: 'Stage 3', title: 'Interview Scheduling',    body: 'Recruiter matches via the AI portal. We book slots, prep you, debrief after.', time: 'Rolling', icon: 'message' },
        { badge: 'Stage 4', title: 'Offer & Onboarding',      body: 'Negotiation guidance, joining support, alumni network introduction.', time: 'On offer', icon: 'certificate' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Stage',
          fields: [
            defineField({ name: 'badge', title: 'Badge Label', type: 'string', description: 'E.g. "Stage 1".', validation: R => R.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            defineField({ name: 'time', title: 'Timeframe', type: 'string', description: 'E.g. "1-2 weeks".', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'title', subtitle: 'badge' } },
        }),
      ],
    }),
    defineField({ name: 'processFooterText', title: 'Footer Text', type: 'string', initialValue: 'Placement support included with every program.', group: 'process' }),

    // ── Success Stories (header only - stories are `testimonial` docs) ──
    defineField({ name: 'successEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Real outcomes', group: 'success' }),
    defineField({ name: 'successHeading', title: 'Heading', type: 'string', initialValue: 'Where Online VGU degrees actually go.', group: 'success' }),
    defineField({ name: 'successCtaPrimaryLabel', title: 'Primary Button Label', type: 'string', initialValue: 'Apply Now', group: 'success' }),
    defineField({ name: 'successCtaSecondaryLabel', title: 'Secondary Button Label', type: 'string', initialValue: 'Browse Programs', group: 'success' }),
  ],

  preview: {
    prepare: () => ({ title: 'Placements Page Content', subtitle: 'Hero, Stats, Support, Hiring, Industries, Process, Success Stories' }),
  },
})
