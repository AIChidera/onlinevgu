import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Student Name',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Batch Year',
      type: 'string',
      description: 'Shown under the name. E.g. "MBA · Batch 2023".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'program',
      title: 'Program (display text)',
      type: 'string',
      description: 'E.g. "MBA" or "MBA Healthcare". Used in filter tabs if added later.',
    }),
    defineField({
      name: 'quote',
      title: 'Testimonial Quote',
      type: 'text',
      rows: 4,
      description: 'The student\'s own words. 2-4 sentences is ideal.',
      validation: R => R.required(),
    }),
    defineField({
      name: 'outcomes',
      title: 'Key Outcomes',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Up to 3 achievement chips. E.g. "40% salary hike", "Placed at Deloitte".',
    }),
    defineField({
      name: 'avatar',
      title: 'Student Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Square or portrait crop. 200×200px minimum.',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Card Color Theme',
      type: 'string',
      description: 'Background color for the video/media panel.',
      options: {
        list: [
          { title: 'Red (default)',   value: 'red'    },
          { title: 'Blue',            value: 'blue'   },
          { title: 'Green',           value: 'green'  },
          { title: 'Purple',          value: 'purple' },
        ],
        layout: 'radio',
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'videoLabel',
      title: 'Video Label',
      type: 'string',
      description: 'Text on the play button. E.g. "Priya\'s journey · 2 min".',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (optional)',
      type: 'url',
      description: 'YouTube or Vimeo link. If blank, the play button is decorative.',
    }),
    defineField({
      name: 'showOnHomePage',
      title: 'Show on Homepage',
      type: 'boolean',
      description: 'Tick to include this student in the homepage Testimonials section.',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (homepage uses 4 in order).',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'name', subtitle: 'role', media: 'avatar' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})
