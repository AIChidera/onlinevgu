import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'notice',
  title: 'Notice / Update',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g. "Odd Semester Academic Calendar 2026-27" or "MBA applications for July 2026 batch now open".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Which dedicated section on /updates this appears under.',
      options: {
        list: [
          { title: 'Academic Calendar', value: 'Academic Calendar' },
          { title: 'Newsletter',        value: 'Newsletter'        },
          { title: 'Announcement',      value: 'Announcement'      },
          { title: 'Important Notice',  value: 'Important Notice'  },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Used for sorting - newest first within each category.',
      validation: R => R.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'One or two sentences. Optional - leave blank if the title says it all.',
    }),
    defineField({
      name: 'attachment',
      title: 'Attachment (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' },
      description: 'Optional. If set, the item links to this file. Leave blank if using External Link instead.',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link',
      type: 'string',
      description: 'Full URL including https://. Optional. Use instead of an attachment to link off-site (e.g. an external notice portal). If both are set, the attachment takes priority.',
    }),
  ],

  orderings: [
    { title: 'Date (newest first)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'category', date: 'date' },
    prepare: ({ title, subtitle, date }) => ({ title, subtitle: `${subtitle} - ${date}` }),
  },
})
