import { defineField, defineType, defineArrayMember } from 'sanity'
import { ICON_OPTIONS } from '@/lib/iconOptions'

const iconField = (name: string, title = 'Icon') =>
  defineField({ name, title, type: 'string', options: { list: [...ICON_OPTIONS], layout: 'dropdown' }, validation: R => R.required() })

// Singleton (one document total) holding every editable piece of Contact
// page copy. Phone/email/WhatsApp/address/socials themselves stay on Site
// Settings (Site-Wide) since they're already the single source of truth
// used across the whole site - this schema only covers this page's own
// section headings, descriptive copy, and per-card labels. Counsellor
// profiles are their own document type (`counsellor`), not embedded here.
export default defineType({
  name: 'contactPage',
  title: 'Contact Page Content',
  type: 'document',

  groups: [
    { name: 'hero',        title: 'Hero', default: true },
    { name: 'channels',    title: 'Quick Channels'       },
    { name: 'reachUs',     title: 'Reach Us'              },
    { name: 'form',        title: 'Form Section'          },
    { name: 'map',         title: 'Map'                   },
    { name: 'departments', title: 'Departments'           },
    { name: 'miniFaq',     title: 'Mini-FAQ'              },
    { name: 'counsellors', title: 'Counsellors'           },
  ],

  fields: [
    // ── Hero ──────────────────────────────────────────────────────
    defineField({ name: 'heroBadgeLabel', title: 'Badge Label', type: 'string', initialValue: 'Talk to a counsellor', group: 'hero' }),
    defineField({ name: 'heroHeadingLine1', title: 'Headline - part 1', type: 'string', initialValue: 'Real people.', group: 'hero' }),
    defineField({ name: 'heroHeadingHighlight', title: 'Headline - highlighted part', type: 'string', initialValue: 'Honest answers.', group: 'hero' }),
    defineField({ name: 'heroSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'No chatbots. No hold queues. A trained VGU admissions counsellor will answer your questions for free.', group: 'hero' }),
    defineField({
      name: 'trustPills',
      title: 'Trust Pills',
      type: 'array',
      group: 'hero',
      initialValue: [
        { label: 'Response within 2 hours', icon: 'bolt' },
        { label: 'Free · No obligation',     icon: 'circleCheck' },
        { label: 'Mon-Sat, 9am-7pm IST',      icon: 'clock' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Pill',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),

    // ── Quick Channels ────────────────────────────────────────────
    defineField({
      name: 'contactChannels',
      title: '4 Contact Channel Cards',
      type: 'array',
      description: 'Must have exactly 4 - the layout is a fixed 4-column grid. The phone number / email / WhatsApp link shown on each card always uses the live values from Site Settings, so only the label, caption, and button text are editable here.',
      group: 'channels',
      validation: R => R.length(4).error('Exactly 4 channel cards are required - the layout is a fixed 4-column grid.'),
      initialValue: [
        { label: 'Admission queries', sub: 'Mon-Sat, 9am-7pm IST',    cta: 'Call now',    icon: 'phone' },
        { label: 'Student helpline',  sub: 'For enrolled students',   cta: 'Call now',    icon: 'headset' },
        { label: 'WhatsApp',          sub: 'Usually replies in 15 min', cta: 'Chat now',  icon: 'brandWhatsapp' },
        { label: 'Email',             sub: 'Replies within 24 hours', cta: 'Send email',  icon: 'mail' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Channel',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'sub', title: 'Caption', type: 'string', validation: R => R.required() }),
            defineField({ name: 'cta', title: 'Button Text', type: 'string', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label', subtitle: 'sub' } },
        }),
      ],
    }),

    // ── Reach Us card stack ───────────────────────────────────────
    defineField({ name: 'addressCardLabel', title: 'Address Card Label', type: 'string', description: 'Used on both the address card and the map\'s floating info card.', initialValue: 'Campus address', group: 'reachUs' }),
    defineField({ name: 'officeHoursLabel', title: 'Office Hours Card Label', type: 'string', initialValue: 'Office hours (IST)', group: 'reachUs' }),
    defineField({
      name: 'officeHours',
      title: 'Office Hours',
      type: 'array',
      group: 'reachUs',
      initialValue: [
        { day: 'Monday - Friday', hours: '9:00 am - 7:00 pm' },
        { day: 'Saturday',        hours: '9:00 am - 5:00 pm' },
        { day: 'Sunday',          hours: 'Closed' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Row',
          fields: [
            defineField({ name: 'day', title: 'Day(s)', type: 'string', validation: R => R.required() }),
            defineField({ name: 'hours', title: 'Hours (or "Closed")', type: 'string', validation: R => R.required() }),
          ],
          preview: { select: { title: 'day', subtitle: 'hours' } },
        }),
      ],
    }),
    defineField({ name: 'socialsLabel', title: 'Socials Card Label', type: 'string', description: 'The social links themselves come from Site Settings.', initialValue: 'Find us on', group: 'reachUs' }),

    // ── Form section header ───────────────────────────────────────
    defineField({ name: 'formEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Send us a message', group: 'form' }),
    defineField({ name: 'formHeading', title: 'Heading', type: 'string', initialValue: 'Tell us how we can help', group: 'form' }),

    // ── Map ───────────────────────────────────────────────────────
    defineField({ name: 'mapEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Visit our campus', group: 'map' }),
    defineField({ name: 'mapHeading', title: 'Heading', type: 'string', initialValue: 'Find us in Jaipur', group: 'map' }),
    defineField({ name: 'mapSubtext', title: 'Subtext', type: 'text', rows: 2, initialValue: 'Drop by the VGU campus in Jagatpura for a guided tour, or attend one of our scheduled immersion events.', group: 'map' }),

    // ── Departments ───────────────────────────────────────────────
    defineField({ name: 'departmentsEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Find the right team', group: 'departments' }),
    defineField({ name: 'departmentsHeading', title: 'Heading', type: 'string', initialValue: 'Who would you like to reach?', group: 'departments' }),
    defineField({
      name: 'departments',
      title: '4 Department Cards',
      type: 'array',
      description: 'Must have exactly 4 - the layout is a fixed 4-column grid. Each card links to a "mailto:" using the Site Settings email address with this subject line pre-filled.',
      group: 'departments',
      validation: R => R.length(4).error('Exactly 4 department cards are required - the layout is a fixed 4-column grid.'),
      initialValue: [
        { label: 'Admissions',           desc: 'Programme info, eligibility, fees, and the application process.',       emailSubject: 'Admissions enquiry',  icon: 'users' },
        { label: 'Student Support',      desc: 'LMS access, exam queries, and technical issues for enrolled students.', emailSubject: 'Student support',     icon: 'lifebuoy' },
        { label: 'Alumni Relations',     desc: 'Reconnect with VGU, share your updates, or join the alumni network.',   emailSubject: 'Alumni',              icon: 'award' },
        { label: 'Press & Partnerships', desc: 'Media enquiries, corporate tie-ups, and content collaborations.',       emailSubject: 'Press / Partnership', icon: 'briefcase' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Department',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string', validation: R => R.required() }),
            defineField({ name: 'desc', title: 'Description', type: 'text', rows: 2, validation: R => R.required() }),
            defineField({ name: 'emailSubject', title: 'Email Subject Line', type: 'string', validation: R => R.required() }),
            iconField('icon'),
          ],
          preview: { select: { title: 'label', subtitle: 'emailSubject' } },
        }),
      ],
    }),

    // ── Mini-FAQ ──────────────────────────────────────────────────
    defineField({ name: 'miniFaqEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Before you contact us', group: 'miniFaq' }),
    defineField({ name: 'miniFaqHeading', title: 'Heading', type: 'string', initialValue: 'Quick answers', group: 'miniFaq' }),
    defineField({
      name: 'miniFaqs',
      title: 'Mini-FAQs',
      type: 'array',
      description: 'Use {email} and {phone} anywhere in an answer to auto-insert the live values from Site Settings.',
      group: 'miniFaq',
      initialValue: [
        { question: 'Are VGU online degrees UGC-recognised?', answer: 'Yes. VGU\'s online programmes are UGC-entitled through the Distance Education Bureau (DEB), and the university is NAAC A+ accredited. Your degree is fully recognised by employers, government bodies, and other universities in India.' },
        { question: 'Can I pay fees in monthly EMIs?', answer: 'Yes. We offer 0% interest EMI plans starting from ₹2,999/month through our finance partners. A counsellor can walk you through the options that match your programme and budget.' },
        { question: 'How long does the application process take?', answer: 'Most applications are reviewed within 2-3 business days. A counsellor will reach out to confirm your details, request any missing documents, and guide you through the next steps.' },
        { question: 'Can I visit the campus before enrolling?', answer: 'Yes. The VGU campus in Jagatpura, Jaipur is open for visits Monday to Saturday. Email {email} or call {phone} to schedule a guided tour.' },
      ],
      of: [
        defineArrayMember({
          type: 'object',
          title: 'FAQ',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: R => R.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 3, validation: R => R.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // ── Counsellors section header (cards themselves are the `counsellor` type) ──
    defineField({ name: 'counsellorsEyebrow', title: 'Eyebrow', type: 'string', initialValue: 'Meet your counsellors', group: 'counsellors' }),
    defineField({ name: 'counsellorsHeading', title: 'Heading', type: 'string', initialValue: 'Real people you\'ll actually talk to', group: 'counsellors' }),
  ],

  preview: {
    prepare: () => ({ title: 'Contact Page Content', subtitle: 'Hero, Channels, Reach Us, Form, Map, Departments, Mini-FAQ, Counsellors' }),
  },
})
