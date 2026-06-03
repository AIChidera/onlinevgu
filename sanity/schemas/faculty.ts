import { defineField, defineType } from 'sanity'

const PROGRAM_SLUGS = [
  { title: 'MBA',              value: 'mba'            },
  { title: 'MBA Healthcare',   value: 'mba-healthcare' },
  { title: 'MCA',              value: 'mca'            },
  { title: 'BCA',              value: 'bca'            },
  { title: 'BBA',              value: 'bba'            },
  { title: 'B.Com',            value: 'bcom'           },
  { title: 'M.Com',            value: 'mcom'           },
  { title: 'BA',               value: 'ba'             },
  { title: 'MA',               value: 'ma'             },
  { title: 'B.Sc',             value: 'bsc'            },
  { title: 'M.Lib',            value: 'mlib'           },
  { title: 'B.Lib',            value: 'blib'           },
]

export default defineType({
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: R => R.required(),
    }),
    defineField({
      name: 'title',
      title: 'Job Title',
      type: 'string',
      description: 'E.g. "Professor, Strategic Management".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'credential',
      title: 'Credential / Background',
      type: 'string',
      description: 'One line shown as a chip. E.g. "PhD, IIM Ahmedabad · 22 yrs exp".',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Square crop. 400×400px recommended. If no photo, the initials will be shown instead.',
    }),
    defineField({
      name: 'initials',
      title: 'Initials (avatar fallback)',
      type: 'string',
      description: '2 letters shown when no photo is uploaded. E.g. "RK".',
      validation: R => R.max(3),
    }),
    defineField({
      name: 'avatarColor',
      title: 'Avatar Background Color (when no photo)',
      type: 'string',
      description: 'Color shown behind the initials.',
      options: {
        list: [
          { title: 'Red',    value: 'red'    },
          { title: 'Blue',   value: 'blue'   },
          { title: 'Purple', value: 'purple' },
          { title: 'Green',  value: 'green'  },
          { title: 'Amber',  value: 'amber'  },
        ],
        layout: 'radio',
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'programs',
      title: 'Teaches In Programs',
      type: 'array',
      of: [
        {
          type: 'string',
          options: { list: PROGRAM_SLUGS },
        },
      ],
      description: 'Select all programs this faculty member teaches in.',
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order (within each program)',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Name A-Z',      name: 'nameAsc',         by: [{ field: 'name',         direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'name', subtitle: 'title', media: 'photo' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle, media }),
  },
})
