export default {
  name: 'program',
  title: 'Program',
  type: 'document',
  fields: [
    { name: 'name', title: 'Program name', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r: any) => r.required() },
    { name: 'level', title: 'Level', type: 'string', options: { list: ['ug', 'pg'] }, validation: (r: any) => r.required() },
    { name: 'duration', title: 'Duration', type: 'string' },
    { name: 'fee', title: 'Total fee', type: 'string' },
    { name: 'icon', title: 'Icon (emoji)', type: 'string' },
    { name: 'gradient', title: 'CSS gradient', type: 'string' },
    { name: 'badge', title: 'Badge text (optional)', type: 'string' },
    { name: 'description', title: 'Short description', type: 'text', rows: 3 },
    { name: 'eligibility', title: 'Eligibility criteria', type: 'text', rows: 2 },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'specialisations',
      title: 'Specialisations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'curriculum',
      title: 'Curriculum (semesters)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'semester', title: 'Semester', type: 'number' },
            {
              name: 'subjects',
              title: 'Subjects',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
        },
      ],
    },
    { name: 'order', title: 'Sort order', type: 'number' },
  ],
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
