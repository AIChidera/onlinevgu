import type { StructureBuilder } from 'sanity/structure'

// Studio sidebar organized by PAGE, not by content type - each top-level
// entry is one page on the live site, containing that page's own editable
// content plus nested links into any shared collections it actually uses.
// Shared collections aren't duplicated: the same document type can be
// listed under more than one page (it's just navigation, the data lives
// once) and every type also has one authoritative, unfiltered home under
// "Site-Wide" at the bottom for full management.
//
// Singletons (…PageContent docs) use S.documentTypeListItem(), not
// S.document().documentId() - the latter crashes in Sanity v5 when the
// document hasn't been created yet. First-time setup: open the item and
// click "+" to create it.
export function structure(S: StructureBuilder) {
  return S.list()
    .title('Content')
    .items([
      // ── Home ────────────────────────────────────────────────────
      S.listItem()
        .title('Home')
        .child(
          S.list()
            .title('Home')
            .items([
              S.documentTypeListItem('homePage').title('Home Page Content'),
              S.divider(),
              S.listItem()
                .title('Programs shown on Home')
                .child(S.documentTypeList('program').title('Programs')),
              S.listItem()
                .title('Testimonials shown on Home')
                .child(
                  S.documentList()
                    .title('Testimonials shown on Home')
                    .filter('_type == "testimonial" && showOnHomePage == true')
                ),
              S.listItem()
                .title('Campus Immersion Events')
                .child(S.documentTypeList('campusEvent').title('Campus Immersion Events')),
            ])
        ),

      // ── About ───────────────────────────────────────────────────
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About')
            .items([
              S.listItem()
                .title('Milestones (History Timeline)')
                .child(S.documentTypeList('milestone').title('Milestones')),
            ])
        ),

      // ── Programs ────────────────────────────────────────────────
      S.listItem()
        .title('Programs')
        .child(
          S.list()
            .title('Programs')
            .items([
              S.documentTypeListItem('program').title('All Programs'),
            ])
        ),

      // ── Blog ────────────────────────────────────────────────────
      S.listItem()
        .title('Blog')
        .child(S.documentTypeList('blogPost').title('Blog Posts')),

      // ── Updates ─────────────────────────────────────────────────
      S.listItem()
        .title('Updates')
        .child(S.documentTypeList('notice').title('Notices')),

      S.divider(),

      // ── Site-Wide ───────────────────────────────────────────────
      // Unfiltered, authoritative home for every shared content type -
      // use this when a change needs to apply everywhere it's used, or to
      // manage items not currently shown on any page (e.g. showOnHomePage
      // is false for all three).
      S.listItem()
        .title('Site-Wide')
        .child(
          S.list()
            .title('Site-Wide')
            .items([
              S.documentTypeListItem('siteSettings').title('Site Settings'),
              S.divider(),
              S.documentTypeListItem('testimonial').title('Testimonials (all)'),
              S.documentTypeListItem('faq').title('FAQs (all)'),
              S.documentTypeListItem('faculty').title('Faculty'),
            ])
        ),
    ])
}
