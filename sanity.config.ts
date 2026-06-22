import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'online-vgu',
  title: 'Online VGU Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: S =>
        S.list()
          .title('Content')
          .items([
            // ── Site Settings ─────────────────────────────────────
            // Using the same documentTypeListItem pattern as every other
            // type - the S.document().documentId() singleton pattern crashes
            // in Sanity v5 when the document has not been created yet.
            // First-time setup: click "+" to create the one settings document.
            S.documentTypeListItem('siteSettings').title('Site Settings'),

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

            // ── Blog ──────────────────────────────────────────────
            S.documentTypeListItem('blogPost').title('Blog Posts'),

            S.divider(),

            // ── About Page ────────────────────────────────────────
            S.documentTypeListItem('milestone').title('Milestones (About Page)'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
