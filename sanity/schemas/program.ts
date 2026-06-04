import { defineField, defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    // ── Basic Info ────────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Short Name',
      type: 'string',
      description: 'Abbreviation used in cards and headings. E.g. "MBA".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      description: 'Full program name. E.g. "Master of Business Administration".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      description: 'URL path for this program (e.g. "mba" -> /programs/mba). Set once, do not change.',
      options: { source: 'name', maxLength: 96 },
      validation: R => R.required(),
    }),
    defineField({
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          { title: 'Undergraduate (UG - 10+2 entry)', value: 'ug' },
          { title: 'Postgraduate (PG - degree entry)', value: 'pg' },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'E.g. "2 Years" or "1 Year".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'semesters',
      title: 'Number of Semesters',
      type: 'number',
      validation: R => R.required().integer().positive(),
    }),
    defineField({
      name: 'popular',
      title: 'Mark as Most Popular',
      type: 'boolean',
      description: 'Shows a "Most Popular" badge on the hero and card.',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first in the programs grid.',
    }),

    // ── Fees & Batch ──────────────────────────────────────────────
    defineField({
      name: 'feePerYear',
      title: 'Fee Per Year',
      type: 'string',
      description: 'Shown in program chips. E.g. "Rs 85,000/yr".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'totalFee',
      title: 'Total Program Fee',
      type: 'string',
      description: 'E.g. "Rs 1,70,000".',
      validation: R => R.required(),
    }),
    defineField({
      name: 'emi',
      title: 'EMI Option',
      type: 'string',
      description: 'Leave blank if no EMI is available. E.g. "Rs 7,084/month".',
    }),
    defineField({
      name: 'nextBatch',
      title: 'Next Batch Date',
      type: 'string',
      description: 'E.g. "July 2026". If blank, the global Site Settings value is used.',
    }),

    // ── Content ───────────────────────────────────────────────────
    defineField({
      name: 'description',
      title: 'Program Description',
      type: 'text',
      rows: 5,
      description: '2-4 sentences. Shown in the hero and used as the page meta description.',
      validation: R => R.required(),
    }),
    defineField({
      name: 'highlights',
      title: 'Program Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Key selling points shown as cards. Aim for 5-8 items.',
    }),
    defineField({
      name: 'eligibility',
      title: 'Eligibility Criteria',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'One bullet per requirement.',
    }),
    defineField({
      name: 'specialisations',
      title: 'Specialisations',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Leave empty if the program has no specialisations.',
    }),

    // ── Careers ───────────────────────────────────────────────────
    defineField({
      name: 'careerRoles',
      title: 'Career Roles',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Job titles graduates typically land. Shown in Career Outcomes section.',
    }),
    defineField({
      name: 'avgSalaryAfter',
      title: 'Average Salary After Graduation',
      type: 'string',
      description: 'E.g. "Rs 10-18 LPA". Leave blank if unknown.',
    }),
    defineField({
      name: 'topHirers',
      title: 'Top Hiring Companies',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Companies that actively hire from this program.',
    }),

    // ── Curriculum ────────────────────────────────────────────────
    defineField({
      name: 'curriculum',
      title: 'Curriculum (Year by Year)',
      type: 'array',
      description: 'Add one entry per academic year. Each year contains its semesters.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Year',
          fields: [
            defineField({
              name: 'year',
              title: 'Year Label',
              type: 'string',
              description: 'E.g. "Year 1".',
            }),
            defineField({
              name: 'semesters',
              title: 'Semesters',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Semester',
                  fields: [
                    defineField({ name: 'label',    title: 'Semester Label', type: 'string', description: 'E.g. "Semester 1".' }),
                    defineField({ name: 'subjects', title: 'Subjects',       type: 'array', of: [{ type: 'string' }] }),
                  ],
                  preview: { select: { title: 'label' } },
                }),
              ],
            }),
          ],
          preview: { select: { title: 'year' } },
        }),
      ],
    }),

    // ── Media ─────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Shown behind the dark-red gradient in the hero. 1400x900px recommended.',
    }),
  ],

  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
  ],

  preview: {
    select: { title: 'name', subtitle: 'level', media: 'heroImage' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === 'ug' ? 'Undergraduate' : 'Postgraduate',
      media,
    }),
  },
})
