import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'campusEvent',
  title: 'Campus Immersion Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'E.g. "Leadership Summit".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle / Location',
      type: 'string',
      description: 'E.g. "VGU Campus, Jaipur".',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Short labels shown on the card. Add 2-4 tags.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Tag',
          fields: [
            defineField({ name: 'label', title: 'Tag Text', type: 'string', description: 'E.g. "3 Days".' }),
            defineField({
              name: 'color',
              title: 'Tag Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Gold',  value: 'gold'  },
                  { title: 'Red',   value: 'red'   },
                  { title: 'Green', value: 'green' },
                ],
                layout: 'radio',
              },
              initialValue: 'gold',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'color' } },
        }),
      ],
    }),
    defineField({
      name: 'photo',
      title: 'Event Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Landscape photo. 1200×800px recommended.',
    }),
    defineField({
      name: 'colorTheme',
      title: 'Card Color Theme',
      type: 'string',
      description: 'Background gradient shown before the photo loads or when no photo is set.',
      options: {
        list: [
          { title: 'Blue',   value: 'blue'   },
          { title: 'Orange', value: 'orange' },
          { title: 'Green',  value: 'green'  },
          { title: 'Purple', value: 'purple' },
          { title: 'Red',    value: 'red'    },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the Campus Immersions carousel.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'title', subtitle: 'subtitle', media: 'photo' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})
