import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'counsellor',
  title: 'Counsellor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Specialty',
      type: 'string',
      description: 'E.g. "MBA & PG Specialist".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
      validation: R => R.required(),
    }),
    defineField({
      name: 'languages',
      title: 'Languages Spoken',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'E.g. "English", "Hindi", "Marathi".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Square or portrait crop. 400×400px recommended.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})
