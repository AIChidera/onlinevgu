import { defineField, defineType } from 'sanity'

// Singleton (one document total) - just the /programs listing page's hero.
// The grid below it is already fully Sanity-backed via the `program`
// document type, so there's nothing else on this page to make editable.
// Every field is optional - the page renders its current hardcoded copy
// whenever a field is blank.
export default defineType({
  name: 'programsListingPage',
  title: 'Programs Listing Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Background Photo',
      type: 'image',
      options: { hotspot: true },
      description: 'Landscape, 1400px+ wide. Leave empty to keep the current stock photo.',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'UGC-Recognised · 100% Online',
    }),
    defineField({
      name: 'heroHeadingLine1',
      title: 'Headline - line 1',
      type: 'string',
      initialValue: 'Pick the degree that',
    }),
    defineField({
      name: 'heroHeadingLine2Prefix',
      title: 'Headline - line 2, before the highlighted words',
      type: 'string',
      description: 'E.g. "fits" in "fits your life."',
      initialValue: 'fits',
    }),
    defineField({
      name: 'heroHeadingHighlight',
      title: 'Headline - highlighted words',
      type: 'string',
      description: 'E.g. "your life." - shown in gold.',
      initialValue: 'your life.',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Subtext',
      type: 'text',
      rows: 2,
      description: 'Use {count} and {disciplineCount} to auto-insert the live program/discipline counts.',
      initialValue: '{count} online programs across {disciplineCount} disciplines. Learn from wherever you are.',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary Button Label',
      type: 'string',
      initialValue: 'Browse Programs',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary Button Label',
      type: 'string',
      initialValue: 'Download Brochure',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Programs Listing Page Content', subtitle: 'Hero' }),
  },
})
