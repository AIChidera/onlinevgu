import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

const SINGLETON_TYPES = new Set(['siteSettings'])

export default defineConfig({
  name: 'online-vgu',
  title: 'Online VGU Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',

  plugins: [
    // visionTool() — uncomment if you need to test GROQ queries (requires: npm install styled-components)
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            // ── Singleton: Site Settings ───────────────────────────
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),

            S.divider(),

            // ── Programs ──────────────────────────────────────────
            S.documentTypeListItem('program').title('Programs'),

            S.divider(),

            // ── Students & Testimonials ───────────────────────────
            S.documentTypeListItem('testimonial').title('Testimonials'),

            // ── Faculty ───────────────────────────────────────────
            S.documentTypeListItem('faculty').title('Faculty'),

            S.divider(),

            // ── FAQs ──────────────────────────────────────────────
            S.documentTypeListItem('faq').title('FAQs'),

            // ── Campus Events ────────────────────────────────────
            S.documentTypeListItem('campusEvent').title('Campus Immersion Events'),

            S.divider(),

            // ── About Page ────────────────────────────────────────
            S.documentTypeListItem('milestone').title('Milestones (About Page)'),

            S.divider(),

            // ── Blog ─────────────────────────────────────────────
            S.documentTypeListItem('blogPost').title('Blog Posts'),
          ]),
    }),

  ],

  schema: {
    types: schemaTypes,
    // Prevent siteSettings from appearing in "New document" menu
    templates: templates =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },
})
