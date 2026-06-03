import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'admissions', title: 'Admissions' },
    { name: 'contact',    title: 'Contact Info' },
    { name: 'stats',      title: 'Key Stats' },
    { name: 'social',     title: 'Social Media' },
  ],
  fields: [
    // ── Admissions ────────────────────────────────────────────────
    defineField({
      name: 'nextBatch',
      title: 'Next Batch Date',
      type: 'string',
      group: 'admissions',
      description: 'Displayed across all program pages. E.g. "July 2026".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'admissionsOpen',
      title: 'Admissions Open?',
      type: 'boolean',
      group: 'admissions',
      description: 'Controls the "Admissions open" status badge.',
      initialValue: true,
    }),

    // ── Contact ───────────────────────────────────────────────────
    defineField({
      name: 'phoneDisplay',
      title: 'Phone Number (display)',
      type: 'string',
      group: 'contact',
      description: 'Shown in emails and footer. E.g. "1800 123 456".',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (digits only)',
      type: 'string',
      group: 'contact',
      description: 'Digits only, no spaces or +. E.g. "919876543210". Used in the WhatsApp button link.',
    }),
    defineField({
      name: 'admissionsEmail',
      title: 'Admissions Email',
      type: 'string',
      group: 'contact',
      description: 'Shown in footer and emails. E.g. "admissions@onlinevgu.in".',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
      description: 'Shown in footer and privacy page.',
    }),

    // ── Key Stats ─────────────────────────────────────────────────
    defineField({
      name: 'statLearners',
      title: 'Learners Enrolled',
      type: 'string',
      group: 'stats',
      description: 'E.g. "50,000+".',
      initialValue: '50,000+',
    }),
    defineField({
      name: 'statCountries',
      title: 'Countries',
      type: 'string',
      group: 'stats',
      description: 'E.g. "40+".',
      initialValue: '40+',
    }),
    defineField({
      name: 'statPlacement',
      title: 'Placement Rate',
      type: 'string',
      group: 'stats',
      description: 'E.g. "95%".',
      initialValue: '95%',
    }),
    defineField({
      name: 'statRating',
      title: 'Student Rating',
      type: 'string',
      group: 'stats',
      description: 'E.g. "4.8/5".',
      initialValue: '4.8/5',
    }),
    defineField({
      name: 'statPrograms',
      title: 'Programs Offered',
      type: 'string',
      group: 'stats',
      description: 'E.g. "30+".',
      initialValue: '30+',
    }),
    defineField({
      name: 'statHiringPartners',
      title: 'Hiring Partners',
      type: 'string',
      group: 'stats',
      description: 'E.g. "500+".',
      initialValue: '500+',
    }),
    defineField({
      name: 'statCourseraCount',
      title: 'Coursera Courses',
      type: 'string',
      group: 'stats',
      description: 'E.g. "7,000+".',
      initialValue: '7,000+',
    }),
    defineField({
      name: 'statYearEstablished',
      title: 'Year Established',
      type: 'string',
      group: 'stats',
      initialValue: '2012',
    }),

    // ── Social ───────────────────────────────────────────────────
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'socialLinkedIn',
      title: 'LinkedIn URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'socialYouTube',
      title: 'YouTube URL',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'socialX',
      title: 'X (Twitter) URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    select: { title: 'nextBatch' },
    prepare: ({ title }) => ({ title: 'Site Settings', subtitle: `Next batch: ${title}` }),
  },
})
