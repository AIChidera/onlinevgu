import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name:  'blogPost',
  title: 'Blog Post',
  type:  'document',
  fields: [

    // ── Core metadata ────────────────────────────────────────────
    defineField({
      name:  'title',
      title: 'Title',
      type:  'string',
      validation: R => R.required().min(10).max(120),
    }),
    defineField({
      name:    'slug',
      title:   'Slug (URL)',
      type:    'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'Auto-generated from the title. Click "Generate" or edit manually.',
      validation: R => R.required(),
    }),
    defineField({
      name:        'excerpt',
      title:       'Excerpt',
      type:        'text',
      rows:        3,
      description: 'Shown on listing cards, SEO meta description, and as the lede above the article body. Keep it between 80–220 characters.',
      validation:  R => R.required().min(40).max(220),
    }),
    defineField({
      name:    'coverImage',
      title:   'Cover image',
      type:    'image',
      options: { hotspot: true },
      description: 'Used as the hero image on the article page. Recommended: 1440 × 810 px (16:9).',
    }),

    // ── Classification ───────────────────────────────────────────
    defineField({
      name:    'category',
      title:   'Category',
      type:    'string',
      options: {
        list: [
          { title: 'Career',    value: 'Career'    },
          { title: 'Education', value: 'Education' },
          { title: 'Programs',  value: 'Programs'  },
          { title: 'Industry',  value: 'Industry'  },
          { title: 'Campus',    value: 'Campus'    },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: R => R.required(),
    }),

    // ── Scheduling ───────────────────────────────────────────────
    defineField({
      name:         'publishedAt',
      title:        'Published date',
      type:         'datetime',
      initialValue: () => new Date().toISOString(),
      description:  'Posts dated in the future are hidden on the site until that date arrives.',
      validation:   R => R.required(),
    }),
    defineField({
      name:        'readTime',
      title:       'Read time',
      type:        'string',
      description: 'Shown in the post meta strip.',
      options: {
        list: [
          { title: '2 min read',  value: '2 min read'  },
          { title: '3 min read',  value: '3 min read'  },
          { title: '4 min read',  value: '4 min read'  },
          { title: '5 min read',  value: '5 min read'  },
          { title: '6 min read',  value: '6 min read'  },
          { title: '7 min read',  value: '7 min read'  },
          { title: '8 min read',  value: '8 min read'  },
          { title: '10 min read', value: '10 min read' },
          { title: '12 min read', value: '12 min read' },
          { title: '15 min read', value: '15 min read' },
          { title: '20 min read', value: '20 min read' },
        ],
      },
    }),

    // ── Author ───────────────────────────────────────────────────
    defineField({
      name:   'author',
      title:  'Author',
      type:   'object',
      fields: [
        defineField({
          name:  'name',
          title: 'Author',
          type:  'string',
          options: {
            list: [
              { title: 'Office of the CEO',       value: 'Office of the CEO'       },
              { title: 'Office of the Registrar', value: 'Office of the Registrar' },
              { title: 'VGU Placement Cell',      value: 'VGU Placement Cell'      },
              { title: 'VGU Faculty',             value: 'VGU Faculty'             },
              { title: 'VGU Admissions Team',     value: 'VGU Admissions Team'     },
              { title: 'Custom name...',          value: '_custom'                 },
            ],
          },
          validation: R => R.required(),
        }),
        defineField({
          name:        'customName',
          title:       'Custom author name',
          type:        'string',
          description: 'Type the author\'s full name when "Custom name" is selected above.',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          hidden: ({ parent }: any) => parent?.name !== '_custom',
        }),
        defineField({
          name:        'title',
          title:       'Author title / role',
          type:        'string',
          description: 'E.g. "Director, Placement Cell" or "Assistant Professor, MBA". Shown below the name.',
        }),
        defineField({
          name:        'avatar',
          title:       'Author photo',
          type:        'image',
          options:     { hotspot: true },
          description: 'Square crop recommended. Shown as a circular avatar.',
        }),
      ],
    }),

    // ── Body ─────────────────────────────────────────────────────
    defineField({
      name:  'body',
      title: 'Article body',
      type:  'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal',    value: 'normal'     },
            { title: 'Heading 2', value: 'h2'         },
            { title: 'Heading 3', value: 'h3'         },
            { title: 'Heading 4', value: 'h4'         },
            { title: 'Quote',     value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold',        value: 'strong' },
              { title: 'Italic',      value: 'em'     },
              { title: 'Inline code', value: 'code'   },
            ],
            annotations: [
              defineArrayMember({
                name:  'link',
                type:  'object',
                title: 'Link',
                fields: [
                  defineField({
                    name:  'href',
                    title: 'URL',
                    type:  'url',
                    validation: rule => rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  }),
                  defineField({
                    name:         'blank',
                    title:        'Open in new tab',
                    type:         'boolean',
                    initialValue: true,
                  }),
                ],
              }),
            ],
          },
        }),
        {
          type:    'image',
          options: { hotspot: true },
          fields: [
            {
              name:        'caption',
              title:       'Caption',
              type:        'string',
              description: 'Shown below the image in italic.',
            },
            {
              name:        'alt',
              title:       'Alt text',
              type:        'string',
              description: 'Required for accessibility. Falls back to caption if blank.',
            },
          ],
        },
      ],
    }),

    // ── Relations & settings ─────────────────────────────────────
    defineField({
      name:        'relatedPrograms',
      title:       'Related programs',
      type:        'array',
      of:          [{ type: 'reference', to: [{ type: 'program' }] }],
      description: 'Programs shown in a card grid at the bottom of the article.',
    }),
    defineField({
      name:         'featured',
      title:        'Feature this post',
      type:         'boolean',
      description:  'When on, this post is highlighted in the hero carousel on /blog. Only the most recent featured post is shown.',
      initialValue: false,
    }),

  ],

  orderings: [
    { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
    { title: 'Oldest first', name: 'publishedAtAsc',  by: [{ field: 'publishedAt', direction: 'asc'  }] },
  ],

  preview: {
    select: {
      title:      'title',
      category:   'category',
      authorName: 'author.name',
      customName: 'author.customName',
      media:      'coverImage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, category, authorName, customName, media }: any) {
      const resolvedAuthor = authorName === '_custom' ? customName : authorName
      return {
        title,
        subtitle: [category, resolvedAuthor].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
