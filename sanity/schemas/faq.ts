import { defineField, defineType } from 'sanity'

const PROGRAM_OPTIONS = [
  { title: '(Home page - general FAQ)',  value: ''             },
  { title: 'MBA',                        value: 'mba'          },
  { title: 'MBA Healthcare',             value: 'mba-healthcare' },
  { title: 'MCA',                        value: 'mca'          },
  { title: 'BCA',                        value: 'bca'          },
  { title: 'BBA',                        value: 'bba'          },
  { title: 'B.Com',                      value: 'bcom'         },
  { title: 'M.Com',                      value: 'mcom'         },
  { title: 'BA',                         value: 'ba'           },
  { title: 'MA',                         value: 'ma'           },
  { title: 'B.Sc',                       value: 'bsc'          },
  { title: 'M.Lib',                      value: 'mlib'         },
  { title: 'B.Lib',                      value: 'blib'         },
]

export default defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: R => R.required(),
    }),
    defineField({
      name: 'programSlug',
      title: 'Which Program / Page?',
      type: 'string',
      description: 'Select a program to attach this FAQ to that program\'s page. Leave as "Home page" to show it in the general FAQ section on the homepage.',
      options: {
        list: PROGRAM_OPTIONS,
      },
      initialValue: '',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first within the same page/program.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'question', subtitle: 'programSlug' },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: subtitle ? `Program: ${subtitle}` : 'Homepage FAQ',
    }),
  },
})
