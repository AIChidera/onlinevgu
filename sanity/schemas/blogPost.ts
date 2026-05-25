export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (r: any) => r.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r: any) => r.required() },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 2, validation: (r: any) => r.required() },
    { name: 'coverImage', title: 'Cover image', type: 'image', options: { hotspot: true } },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: { list: ['Career', 'Education', 'Programs', 'Industry', 'Campus'] },
    },
    { name: 'publishedAt', title: 'Published date', type: 'datetime' },
    { name: 'readTime', title: 'Read time (e.g. "5 min read")', type: 'string' },
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'avatar', title: 'Avatar', type: 'image' },
      ],
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
        },
      ],
    },
    {
      name: 'relatedPrograms',
      title: 'Related programs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'program' }] }],
    },
    { name: 'featured', title: 'Featured on homepage', type: 'boolean', initialValue: false },
  ],
  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
}
