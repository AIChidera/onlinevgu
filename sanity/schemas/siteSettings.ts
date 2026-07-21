import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // â”€â”€ Admissions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    defineField({
      name: 'nextBatch',
      title: 'Next Batch Start Date',
      type: 'string',
      description: 'Shown on all program pages. E.g. "July 2026".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'admissionsOpen',
      title: 'Admissions Open?',
      type: 'boolean',
      description: 'Controls the "Admissions open" status badge across the site.',
      initialValue: true,
    }),

    // â”€â”€ Contact â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    defineField({
      name: 'phoneDisplay',
      title: 'Phone Number',
      type: 'string',
      description: 'Shown in emails and footer. E.g. "1800 123 456".',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number (digits only, no spaces)',
      type: 'string',
      description: 'Digits only, no + or spaces. E.g. "919876543210". Powers the WhatsApp chat button.',
    }),
    defineField({
      name: 'admissionsEmail',
      title: 'Admissions Email',
      type: 'string',
      description: 'Shown in footer and confirmation emails. E.g. "admissions@onlinevgu.com".',
    }),
    defineField({
      name: 'address',
      title: 'University Address',
      type: 'text',
      description: 'Shown in footer and Privacy page.',
    }),

    // â”€â”€ Key Stats â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    defineField({
      name: 'statLearners',
      title: 'Learners Enrolled (stat)',
      type: 'string',
      description: 'E.g. "50,000+".',
      initialValue: '50,000+',
    }),
    defineField({
      name: 'statCountries',
      title: 'Countries Represented (stat)',
      type: 'string',
      description: 'E.g. "40+".',
      initialValue: '40+',
    }),
    defineField({
      name: 'statPlacement',
      title: 'Placement Rate (stat)',
      type: 'string',
      description: 'E.g. "95%".',
      initialValue: '95%',
    }),
    defineField({
      name: 'statRating',
      title: 'Student Rating (stat)',
      type: 'string',
      description: 'E.g. "4.8/5".',
      initialValue: '4.8/5',
    }),
    defineField({
      name: 'statPrograms',
      title: 'Programs Offered (stat)',
      type: 'string',
      description: 'E.g. "30+".',
      initialValue: '30+',
    }),
    defineField({
      name: 'statHiringPartners',
      title: 'Hiring Partners (stat)',
      type: 'string',
      description: 'E.g. "500+".',
      initialValue: '500+',
    }),
    defineField({
      name: 'statCourseraCount',
      title: 'Coursera Courses (stat)',
      type: 'string',
      description: 'E.g. "7,000+".',
      initialValue: '7,000+',
    }),
    defineField({
      name: 'statYearEstablished',
      title: 'Year Established (stat)',
      type: 'string',
      initialValue: '2012',
    }),

    // â”€â”€ Social Media (stored as plain strings, not url type) â”€â”€â”€â”€â”€â”€â”€
    // The Sanity v5 url field validator crashes when opened in a direct
    // editor with no pre-existing value. Using string type is equivalent
    // for storage and avoids the issue.
    defineField({
      name: 'socialInstagram',
      title: 'Instagram URL',
      type: 'string',
      description: 'Full URL including https://. E.g. "https://instagram.com/onlinevgu".',
    }),
    defineField({
      name: 'socialLinkedIn',
      title: 'LinkedIn URL',
      type: 'string',
      description: 'Full URL including https://.',
    }),
    defineField({
      name: 'socialFacebook',
      title: 'Facebook URL',
      type: 'string',
      description: 'Full URL including https://.',
    }),
    defineField({
      name: 'socialYouTube',
      title: 'YouTube URL',
      type: 'string',
      description: 'Full URL including https://.',
    }),
    defineField({
      name: 'socialX',
      title: 'X (Twitter) URL',
      type: 'string',
      description: 'Full URL including https://.',
    }),

    // â”€â”€ Brochure â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    defineField({
      name: 'defaultBrochurePdf',
      title: 'Default Brochure (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'PDF emailed to leads when they request a brochure without selecting a specific program, or when the selected program has no brochure of its own. Max 10MB.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Site Settings', subtitle: 'Global site configuration' }),
  },
})
