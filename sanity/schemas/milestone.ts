import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'milestone',
  title: 'Milestone (About Page)',
  type: 'document',
  fields: [
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      description: 'E.g. 2012.',
      validation: R => R.required().integer().min(2000).max(2099),
    }),
    defineField({
      name: 'event',
      title: 'Event / Achievement',
      type: 'string',
      description: 'One-line description. E.g. "VGU established in Jaipur".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (typically chronological by year).',
    }),
  ],

  orderings: [
    { title: 'Chronological (oldest first)', name: 'yearAsc',        by: [{ field: 'year',         direction: 'asc'  }] },
    { title: 'Display Order',               name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc'  }] },
  ],

  preview: {
    select: { title: 'event', subtitle: 'year' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: String(subtitle) }),
  },
})
