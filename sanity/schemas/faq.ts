export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string', validation: (r: any) => r.required() },
    { name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (r: any) => r.required() },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Admissions', 'Programs', 'Exams', 'Fees & Scholarships', 'Recognition', 'General'],
      },
    },
    {
      name: 'programs',
      title: 'Relevant programs (leave empty for general)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'program' }] }],
    },
    { name: 'order', title: 'Sort order', type: 'number' },
  ],
  orderings: [
    { title: 'Sort order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
}
