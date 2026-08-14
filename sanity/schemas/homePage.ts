import { defineField, defineType, defineArrayMember } from 'sanity'
import { ICON_OPTIONS } from '@/lib/iconOptions'

// Singleton (one document total) holding every editable piece of Home page
// copy/imagery that isn't already its own content type (programs, stats,
// campus events, testimonials, and FAQs stay in their own schemas and are
// unaffected by this one). Every field here is optional - the Home page
// renders its current hardcoded copy whenever a field is blank, so creating
// this document and leaving it empty changes nothing on the live site.
export default defineType({
  name: 'homePage',
  title: 'Home Page Content',
  type: 'document',

  groups: [
    { name: 'hero',            title: 'Hero',             default: true },
    { name: 'trustBar',        title: 'Trust Bar'                        },
    { name: 'coursePlatforms', title: 'Course Platforms'                 },
    { name: 'admissionSteps',  title: 'Admission Steps'                  },
  ],

  fields: [
    // ── Hero ──────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Background Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-bleed photo behind the hero text, with a dark overlay. Landscape, 1400px+ wide. Leave empty to keep the current stock photo.',
      group: 'hero',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow (small label above headline)',
      type: 'string',
      initialValue: 'UGC-Entitled · Online Degrees',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadingPrefix',
      title: 'Headline - part 1',
      type: 'string',
      description: 'E.g. "Your next" in "Your next promotion starts here."',
      initialValue: 'Your next',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Headline - highlighted word',
      type: 'string',
      description: 'Shown in gold with a hand-drawn circle around it. Keep this short - one or two words.',
      initialValue: 'promotion',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadingSuffix',
      title: 'Headline - part 2',
      type: 'string',
      description: 'E.g. "starts here." in "Your next promotion starts here."',
      initialValue: 'starts here.',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      initialValue: 'Built for working professionals. Study evenings and weekends. Finish in 2-3 years.',
      group: 'hero',
    }),
    defineField({
      name: 'heroBadgeText',
      title: 'Ranking Badge Text',
      type: 'string',
      description: 'Shown in the gold pill badge with an award icon, above the buttons.',
      initialValue: 'Top Online University in Rajasthan',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Apply Now',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      initialValue: 'Explore Programs',
      group: 'hero',
    }),

    // ── Trust Bar ─────────────────────────────────────────────────
    defineField({
      name: 'trustBarEyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Accredited · Recognised · Ranked',
      group: 'trustBar',
    }),
    defineField({
      name: 'trustBarLogos',
      title: 'Accreditation Logos',
      type: 'array',
      description: 'Leave empty to keep the default NAAC / UGC / AICTE / QS / Coursera badges. If you add any logo here, it fully replaces the default set - add every badge you want shown, not just the one you\'re changing.',
      group: 'trustBar',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Logo',
          fields: [
            defineField({ name: 'name', title: 'Name (alt text)', type: 'string', description: 'E.g. "NAAC A+".', validation: R => R.required() }),
            defineField({ name: 'logo', title: 'Logo Image', type: 'image', description: 'Transparent PNG or SVG works best.', validation: R => R.required() }),
            defineField({
              name: 'scale',
              title: 'Display Scale',
              type: 'number',
              description: 'Corrects for logos with a lot of built-in padding so every badge looks the same size. Start at 1 and adjust if a logo looks too small/large next to the others.',
              initialValue: 1,
            }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
    }),

    // ── Course Platforms ──────────────────────────────────────────
    defineField({
      name: 'coursePlatformsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Why Online VGU',
      group: 'coursePlatforms',
    }),
    defineField({
      name: 'coursePlatformsHeading',
      title: 'Heading',
      type: 'string',
      initialValue: '10,000+ courses. Two platforms. Included free.',
      group: 'coursePlatforms',
    }),
    defineField({
      name: 'courseraCard',
      title: 'Coursera Card',
      type: 'object',
      group: 'coursePlatforms',
      description: 'The partner-logo grid inside this card (Google, IBM, Meta...) is not editable here - it\'s tied to fixed brand icons in code.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: '10,000+ world-class courses at no extra cost.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'Every VGU program comes bundled with a full Coursera licence. Earn certificates from Google, IBM, Meta and more, shareable directly to your LinkedIn profile.' }),
        defineField({ name: 'statValue', title: 'Stat Value', type: 'string', initialValue: '10,000+' }),
        defineField({ name: 'statLabel', title: 'Stat Label', type: 'string', initialValue: 'courses available' }),
      ],
    }),
    defineField({
      name: 'linkedinCard',
      title: 'LinkedIn Learning Card',
      type: 'object',
      group: 'coursePlatforms',
      description: 'The category grid inside this card (Business, Technology...) is not editable here - it\'s tied to fixed icons in code.',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string', initialValue: 'Expert-led courses, zero extra cost.' }),
        defineField({ name: 'description', title: 'Description', type: 'text', rows: 3, initialValue: 'Every VGU program also includes LinkedIn Learning access. Build skills across business, technology, and creative disciplines, with certificates that post straight to your profile.' }),
        defineField({ name: 'statValue', title: 'Stat Value', type: 'string', initialValue: 'Included' }),
        defineField({ name: 'statLabel', title: 'Stat Label', type: 'string', initialValue: 'for your full program duration' }),
      ],
    }),

    // ── Admission Steps ───────────────────────────────────────────
    defineField({
      name: 'stepsEyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Simple Admissions',
      group: 'admissionSteps',
    }),
    defineField({
      name: 'stepsHeading',
      title: 'Heading',
      type: 'string',
      initialValue: 'From form to first class, in under 30 minutes.',
      group: 'admissionSteps',
    }),
    defineField({
      name: 'stepsSubtext',
      title: 'Subtext',
      type: 'string',
      initialValue: 'No entrance exam. No campus visit. Enrol 100% online.',
      group: 'admissionSteps',
    }),
    defineField({
      name: 'steps',
      title: '4 Admission Steps',
      type: 'array',
      description: 'Must have exactly 4 steps - the connecting line on desktop is laid out for 4 columns. Use {nextBatch} anywhere in a step\'s body text to auto-insert the real next-batch date from Site Settings.',
      group: 'admissionSteps',
      validation: R => R.length(4).error('Exactly 4 steps are required - the desktop layout is built for 4 columns.'),
      initialValue: [
        { badge: 'Step 1', title: 'Register Online',    body: 'Fill the application form in under 2 minutes. A counsellor calls you within 2 hours.', icon: 'clipboardList' },
        { badge: 'Step 2', title: 'Choose Your Program', body: 'Pick your degree and specialisation. Our advisors help you find the best fit.',          icon: 'school'        },
        { badge: 'Step 3', title: 'Pay Your Fees',       body: 'Pay securely online in minutes. No-cost EMI available from ₹2,999/month.',                icon: 'creditCard'    },
        { badge: 'Step 4', title: 'Start Learning',      body: 'Get instant portal access. Live classes from {nextBatch}.',                               icon: 'deviceLaptop'  },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Step',
          fields: [
            defineField({ name: 'badge', title: 'Badge Label', type: 'string', description: 'E.g. "Step 1".', validation: R => R.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: R => R.required() }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 2, validation: R => R.required() }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: { list: [...ICON_OPTIONS], layout: 'dropdown' },
              validation: R => R.required(),
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'badge' } },
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: 'Home Page Content', subtitle: 'Hero, Trust Bar, Course Platforms, Admission Steps' }),
  },
})
