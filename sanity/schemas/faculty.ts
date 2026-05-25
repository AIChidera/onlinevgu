export default {
  name: 'faculty',
  title: 'Faculty',
  type: 'document',
  fields: [
    { name: 'name', title: 'Full name', type: 'string', validation: (r: any) => r.required() },
    { name: 'designation', title: 'Designation', type: 'string' },
    { name: 'department', title: 'Department / specialisation', type: 'string' },
    { name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'bio', title: 'Short bio', type: 'text', rows: 3 },
    { name: 'qualifications', title: 'Qualifications', type: 'string' },
    { name: 'experience', title: 'Years of experience', type: 'number' },
    {
      name: 'programs',
      title: 'Teaches in programs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'program' }] }],
    },
    { name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Sort order', type: 'number' },
  ],
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
