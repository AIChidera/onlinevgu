export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Student name', type: 'string', validation: (r: any) => r.required() },
    { name: 'role', title: 'Role / graduation year', type: 'string' },
    { name: 'company', title: 'Current company', type: 'string' },
    { name: 'avatar', title: 'Avatar photo', type: 'image', options: { hotspot: true } },
    { name: 'quote', title: 'Testimonial quote', type: 'text', rows: 4, validation: (r: any) => r.required() },
    { name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r: any) => r.required().min(1).max(5) },
    {
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{ type: 'program' }],
    },
    { name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false },
    { name: 'order', title: 'Sort order', type: 'number' },
  ],
}
