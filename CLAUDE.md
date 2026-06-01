# ============================================================
# ONLINE VGU — CURSOR RULES
# Read this entire file before making any suggestion or edit.
# Every decision here was made deliberately. Do not override.
# ============================================================


# ------------------------------------------------------------
# PROJECT IDENTITY
# ------------------------------------------------------------

This is the redesign and rebuild of onlinevgu.com — the online
learning portal of Vivekananda Global University (VGU), a NAAC A+
accredited Indian university based in Jaipur, Rajasthan.

Goal: a conversion-focused, premium website that drives enrollment
for online UG and PG degree programs targeting working professionals
and fresh graduates in India aged 20–40.

Reference competitor: onlinemanipal.com


# ------------------------------------------------------------
# TECH STACK — LOCKED, DO NOT CHANGE OR SUGGEST ALTERNATIVES
# ------------------------------------------------------------

Framework:     Next.js 14+ with App Router (not Pages Router)
Language:      TypeScript throughout — no plain .js files
Styling:       Tailwind CSS only
               NO component libraries (no shadcn, no MUI, no Chakra)
               All components are custom-built
CMS:           Sanity.io with GROQ queries
Database:      Supabase (PostgreSQL)
Email:         Resend
Rate limiting: Upstash Redis
Hosting:       Vercel (auto-deploys on push to main)
Fonts:         Nunito (heading) + Lato (body) via next/font/google
Validation:    Zod + react-hook-form + @hookform/resolvers
Package mgr:   npm (never suggest yarn or pnpm)


# ------------------------------------------------------------
# BRAND COLORS — USE EXACT HEX VALUES, NO EXCEPTIONS
# ------------------------------------------------------------

--vgu-red:       #C04036   Primary red. Buttons, headings, accents.
--vgu-red-dark:  #821a12   Hover states, footer bg, program hero bg.
--vgu-yellow:    #FFA412   Secondary CTA, highlights, popular badges.
--vgu-gold:      #eecf63   Stat numbers, award indicators.
--vgu-beige:     #F4D7C1   Section backgrounds (max 2 sections).
--neutral-900:   #111827   All body text, primary headings.
--neutral-600:   #4B5563   Subtext, captions, secondary labels.
--neutral-200:   #E5E7EB   Borders, dividers, input borders.
--neutral-50:    #F9FAFB   Alternate section backgrounds.
--white:         #FFFFFF   Card surfaces, nav bg, modal bg.
--whatsapp:      #25D366   WhatsApp FAB only.
--coursera:      #0056D2   Coursera branding only.

Tailwind config reference:
  vgu-red / vgu-red-dark / vgu-yellow / vgu-gold / vgu-beige
  Use these Tailwind color names — they are defined in tailwind.config.ts


# ------------------------------------------------------------
# TYPOGRAPHY — EXACT SPECIFICATIONS
# ------------------------------------------------------------

Heading font:  Nunito (web fallback for licensed Proxima Nova)
Body font:     Lato (web fallback for licensed Avenir)

DESKTOP TYPE SCALE:
  H1:      font-heading 56px / 700 / tracking-[-1px] / leading-[1.15]
  H2:      font-heading 40px / 700 / tracking-[-0.5px] / leading-[1.2]
  H3:      font-heading 28px / 600 / leading-[1.3]
  H4:      font-heading 20px / 600 / leading-[1.4]
  Body L:  font-body   18px / 400 / leading-[1.7]
  Body:    font-body   16px / 400 / leading-[1.7]
  Body S:  font-body   14px / 400 / leading-[1.6]
  Eyebrow: font-heading 12px / 600 / uppercase / tracking-[0.08em] / color #C04036
  Button:  font-heading 15px / 600 / tracking-[0.02em]

MOBILE TYPE SCALE (≤768px):
  H1: 36px  H2: 28px  H3: 22px  H4: 18px  Body L: 17px

RULES:
  - Never use body text below 16px on any screen
  - Eyebrow labels are always uppercase, always #C04036
  - Headings always use font-heading (Nunito)
  - Paragraphs always use font-body (Lato)


# ------------------------------------------------------------
# SPACING — 8PX BASE GRID
# ------------------------------------------------------------

Every spacing value must be a multiple of 8px.
Allowed values: 4px (micro only), 8, 16, 24, 32, 48, 64, 96, 128px

Section vertical padding:  96px desktop / 64px mobile
Max content width:         1280px centered with auto margins
Side gutters:              48px desktop / 20px mobile
Card padding:              24px desktop / 16px mobile
Grid gap:                  24px desktop / 16px mobile

SectionWrapper component handles max-width + gutters automatically.
Always use SectionWrapper for full-width sections.


# ------------------------------------------------------------
# BORDER RADIUS — USE THESE VALUES ONLY
# ------------------------------------------------------------

4px    Tags, badges, input fields, small labels
8px    Secondary buttons, tooltips
16px   Cards (all cards — program, testimonial, stat, faculty)
24px   Hero media frames, large image containers
9999px Primary CTA buttons (pill shape), avatar circles

RULE: Never mix radius values on the same component level.
RULE: Primary CTA = always pill (9999px). Secondary = always 8px.


# ------------------------------------------------------------
# BUTTONS — EXACT SPECIFICATIONS
# ------------------------------------------------------------

PRIMARY BUTTON:
  bg: #C04036          hover bg: #821a12
  text: white / 15px / 600
  padding: 14px 32px   radius: 9999px (pill)
  transition: all 200ms
  Tailwind: bg-vgu-red hover:bg-vgu-red-dark text-white
            font-heading font-semibold rounded-full
            px-8 py-3.5 transition-all duration-200

SECONDARY BUTTON:
  bg: white            hover bg: rgba(192,64,54,0.06)
  border: 2px solid #C04036
  text: #C04036 / 15px / 600
  padding: 12px 30px   radius: 8px
  transition: all 200ms
  Tailwind: bg-white border-2 border-vgu-red text-vgu-red
            font-heading font-semibold rounded-md
            px-[30px] py-3 hover:bg-vgu-red/5 transition-all duration-200

GHOST BUTTON (on dark/red backgrounds):
  bg: transparent      hover bg: rgba(255,255,255,0.10)
  border: 2px solid white
  text: white / 15px / 600
  padding: 12px 30px   radius: 8px

INVERTED BUTTON (on red section backgrounds):
  bg: white            hover bg: #F4D7C1
  text: #C04036 / 15px / 600
  padding: 14px 32px   radius: 9999px (pill)

Minimum tap target height: 44px on mobile. Always verify this.


# ------------------------------------------------------------
# CARDS — EXACT SPECIFICATIONS
# ------------------------------------------------------------

Standard card:
  bg: white
  border: 1px solid #E5E7EB
  border-radius: 16px
  padding: 24px
  hover: translateY(-4px)
  hover shadow: 0 8px 24px rgba(192,64,54,0.12)
  transition: all 200ms

Program card — additional rules:
  border-top: 4px solid #C04036 (accent bar at top)
  overflow: hidden

Stat card:
  No border. Box shadow: 0 2px 12px rgba(0,0,0,0.06)
  Stat number: 48px / 700 / Nunito / color #eecf63

Testimonial card:
  Large quote mark: 64px / 700 / #C04036 / line-height 0.8
  Quote text: italic


# ------------------------------------------------------------
# SECTION BACKGROUND ALTERNATION PATTERN
# ------------------------------------------------------------

Follow this exact order. Never two non-white sections adjacent.

1. #FFFFFF  (white)
2. #F9FAFB  (light gray)
3. #FFFFFF  (white)
4. #F4D7C1  (VGU beige — max 2 total across whole page)
5. #FFFFFF  (white)

Footer CTA band: always #C04036
Footer: always #821a12


# ------------------------------------------------------------
# NAVBAR
# ------------------------------------------------------------

Height: 72px desktop / 64px mobile
Background: white
Border bottom: 1px solid #E5E7EB
Position: sticky top-0 z-index 100

Desktop layout:
  Left: Logo "Online VGU" — Nunito 22px/700 #C04036
  Center: Nav links — Programs, About, Admissions, Blog
          15px/500 #111827, hover #C04036, transition 150ms
  Right: "Apply Now" primary pill button

Mobile layout:
  Left: Logo
  Right: Hamburger (3 lines, #111827)
  Drawer: slides from right, full-width, nav links stacked
          + Apply Now button at bottom


# ------------------------------------------------------------
# HOME PAGE SECTION ORDER — DO NOT REORDER
# ------------------------------------------------------------

Navbar, Footer, FooterCTA, and WhatsApp FAB live in app/layout.tsx
and are not listed in page.tsx. The sections below are the body.

1.  Hero               (two-col 55/45, full-bleed background image + dark overlay)
2.  TrustBar           (NAAC, UGC, AICTE, QS, Coursera logo strip)
3.  ProgramsSection    (tabbed UG/PG, 3-col card grid)
4.  ImpactSection      (stats/impact — 50,000+, 95%, etc.)
5.  CampusImmersionsSection  (campus life / immersion experience)
6.  Testimonials       (3-col cards, #F9FAFB bg)
7.  CourseExperienceSection  (Coursera integration, 7,000+ courses)
8.  FeaturesSection    (Why VGU — 6-item icon grid, #F9FAFB bg)
9.  StepsSection       (Admission timeline — 4 steps, vertical on mobile)
10. FaqSection         (accordion, max-width 800px)
11. AccreditationStrip (accreditation logos, bottom of page)


# ------------------------------------------------------------
# PAGE ROUTES
# ------------------------------------------------------------

/                        Home page
/programs                Programs listing with UG/PG filter
/programs/[slug]         Individual program page (dynamic)
/about                   University overview
/contact                 Contact form + map
/apply                   Application flow
/blog                    Blog listing
/blog/[slug]             Blog post (dynamic)
/api/leads               POST — lead capture
/api/brochure            POST — brochure request


# ------------------------------------------------------------
# COMPONENT ARCHITECTURE
# ------------------------------------------------------------

components/
  ui/           Atoms and modals:
                  Button, Input, Badge, Card, Breadcrumb, StrokeArt
                  ApplyModal, CounsellorModal, BrochureModal
  layout/       Navbar, Footer, SectionWrapper
  sections/     Full-width home page sections (one file per section):
                  Hero, TrustBar, ProgramsSection, ImpactSection,
                  CampusImmersionsSection, Testimonials,
                  CourseExperienceSection, FeaturesSection,
                  StepsSection, FaqSection, AccreditationStrip,
                  FooterCTA, StatsStrip, CourseraSection,
                  WhyVGU, AdmissionTimeline
  forms/        LeadForm, BrochureForm, ContactForm, EnquiryModal
  ScrollReveal.tsx   Intersection-observer scroll animation wrapper
  WhatsAppButton.tsx WhatsApp FAB

app/programs/
  data.ts           Shared program list (used by listing page)
  ProgramsGrid.tsx  Filterable UG/PG grid
  [slug]/           Per-program co-located components (all 'use client'):
    ActivityTicker.tsx        Scrolling social-proof ticker strip
    AdmissionSteps.tsx        4-step admission flow
    CareerOutcomes.tsx        Career roles grid
    CertificatePreview.tsx    Sample certificate visual
    CurriculumPreview.tsx     Year/semester tab switcher
    FacultyCarousel.tsx       Faculty card carousel
    FacultySection.tsx        Full faculty section
    HirerStrip.tsx            Top hirers logo/name strip
    PlacementStatsStrip.tsx   Placement stat chips
    ProgramFAQ.tsx            Program-specific FAQ accordion
    ProgramHighlights.tsx     Highlight cards with hover animation
    ProgramTestimonials.tsx   Program-specific testimonials
    RelatedPrograms.tsx       3-card related programs grid
    ScrollToTop.tsx           Floating scroll-to-top button
    SpecialisationCards.tsx   Specialisation option cards

RULES:
  - Server Components by default (no 'use client' unless required)
  - Add 'use client' only for: forms, modals, accordions, tabs,
    intersection observers, anything with useState/useEffect
  - Never put 'use client' on a layout or page wrapper
  - All data fetching happens in Server Components or API routes
  - No hardcoded colors — always use Tailwind brand tokens
  - Inline styles are permitted only for two cases:
      1. CSS gradients that use brand hex values (Tailwind cannot
         express arbitrary multi-stop gradients with custom colors)
      2. Truly dynamic values computed from data at runtime
         (e.g., style={{ width: `${pct}%` }}, animationDelay)
    All other styling must use Tailwind classes.


# ------------------------------------------------------------
# MODAL SYSTEM
# ------------------------------------------------------------

Four modals cover all lead capture and user actions. They are
mounted in app/layout.tsx and listen for triggers via document-
level event delegation — no prop threading to individual sections.

ApplyModal      (components/ui/ApplyModal.tsx)
  Trigger: any element with [data-apply-trigger], or
           <a href="#counsellor" data-apply-trigger>
  Multi-step: level (UG/PG) → programme → personal details → intake

CounsellorModal (components/ui/CounsellorModal.tsx)
  Trigger: <a href="#counsellor"> OR [data-counsellor-trigger]
           Elements with BOTH attributes route to ApplyModal instead
  Single-step form: name, mobile, email, programme

BrochureModal   (components/ui/BrochureModal.tsx)
  Trigger: any element with [data-brochure-trigger]
  Accepts data-program="MBA" on the trigger to pre-fill programme

EnquiryModal    (components/forms/EnquiryModal.tsx)
  Controlled component: receives isOpen + onClose props from parent
  Wraps LeadForm

SCROLL LOCK PATTERN — identical across all four modals:
  Open:
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
  Close (cleanup):
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.documentElement.scrollTop = scrollY
    // NEVER use window.scrollTo(0, scrollY) — it is async under
    // scroll-behavior: smooth and breaks in React Strict Mode

MODAL LAYOUT RULES:
  Outer wrapper:  items-end sm:items-center sm:justify-center p-0 sm:p-6
  Card:           h-[90vh] sm:h-auto sm:max-h-[90vh]
                  rounded-t-2xl sm:rounded-2xl (bottom-sheet on mobile)
  Scrollable body: style={{ WebkitOverflowScrolling: 'touch',
                             touchAction: 'pan-y',
                             overscrollBehaviorY: 'contain' }}
  Close button:   z-[30] — must exceed any content wrapper z-index
  ESC key:        always closes the modal


# ------------------------------------------------------------
# HERO FLOATING BADGES
# ------------------------------------------------------------

All three hero sections (Home, /programs, /programs/[slug]) use
an identical floating badge pattern in the right column.

Structure:
  <div className="hidden xl:flex items-center justify-center">
    <div className="relative w-full py-8">
      <div className="relative w-full aspect-[4/3]">
        {/* 4 badge divs — no placeholder image or box inside */}
      </div>
    </div>
  </div>

Badge positions (relative to the aspect-ratio container):
  Top-left:     absolute -top-5 left-5 z-10
  Top-right:    absolute -top-3 right-5 z-10
  Bottom-left:  absolute -bottom-5 left-5 z-10
  Bottom-right: absolute -bottom-3 right-5 z-10

Badge base style:
  animate-float-up rounded-2xl bg-white px-4 py-3
  shadow-[0_8px_28px_rgba(17,24,39,0.13)] border border-neutral-200

Animation delays (in DOM order): 0s, 2s, 0.7s, 1.3s

The container has no background of its own. Badges float directly
over the section's full-bleed background image. Never reintroduce
a placeholder box or image inside the aspect-ratio container.


# ------------------------------------------------------------
# BACKEND SERVICES
# ------------------------------------------------------------

SUPABASE (lib/supabase.ts):
  Tables: leads, brochure_requests
  RLS: INSERT public / SELECT authenticated only
  Env vars: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY,
            SUPABASE_SERVICE_ROLE_KEY (server-side only)

SANITY (lib/sanity.ts):
  Schemas: program, testimonial, faq, blogPost, faculty
  Use GROQ for all queries
  ISR revalidation: 60 seconds for program pages
  Env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
            SANITY_API_TOKEN

RESEND (lib/resend.ts):
  Triggers: lead confirmation to user + counsellor notification
  Brochure: additional email with PDF attachment
  Env var: RESEND_API_KEY

UPSTASH (rate limiting):
  Limit: 5 requests per IP per 10 minutes on all API routes
  Env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN


# ------------------------------------------------------------
# API ROUTES
# ------------------------------------------------------------

POST /api/leads:
  1. Validate with Zod LeadSchema
  2. Extract UTM params from request body
  3. Insert to Supabase leads table
  4. Send Resend confirmation email to user
  5. Send Resend notification to admissions@onlinevgu.com
  6. Apply Upstash rate limiting
  Returns: 200 / 400 (validation) / 429 (rate limit) / 500 (server)

POST /api/brochure:
  Same as leads + brochure delivery email + brochure_requests table


# ------------------------------------------------------------
# REAL CONTENT — NEVER INVENT STATISTICS
# ------------------------------------------------------------

Key stats (use only these):
  50,000+   Learners enrolled
  40+       Countries represented
  95%       Placement rate (2023 batch)
  30+       Programs offered
  4.8/5     Student rating
  2012      Year established
  500+      Hiring partners
  7,000+    Coursera courses available

UG Programs:
  B.Com    · 3 Years · ₹45,000/year
  BBA      · 3 Years · ₹55,000/year
  BCA      · 3 Years · ₹60,000/year
  BA       · 3 Years · ₹40,000/year
  B.Sc     · 3 Years · ₹50,000/year
  B.Lib    · 1 Year  · ₹35,000/year

PG Programs:
  MBA      · 2 Years · ₹85,000/year  [MOST POPULAR]
  MCA      · 2 Years · ₹75,000/year
  M.Com    · 2 Years · ₹55,000/year
  MA       · 2 Years · ₹50,000/year
  M.Lib    · 1 Year  · ₹40,000/year
  MBA-HC   · 2 Years · ₹90,000/year  (Healthcare Management)

MBA quick facts:
  Total fee: ₹1,70,000   EMI: ₹7,084/month   Next batch: July 2026


# ------------------------------------------------------------
# RESPONSIVENESS RULES
# ------------------------------------------------------------

Always build mobile-first. Test at these breakpoints:
  390px   Mobile (primary mobile target)
  768px   Tablet (breakpoint where mobile styles end)
  1280px  Desktop (max content width)
  1440px  Large desktop (design reference width)

Mobile-specific requirements:
  - Sticky bottom CTA bar on program pages (64px, white, 1px top border)
  - WhatsApp FAB always visible (bottom-right, fixed)
  - All tap targets minimum 44px height
  - No horizontal scroll at any viewport width
  - Use dvh instead of vh for full-height elements (iOS Safari fix)
  - Cards stack to 1 column
  - Stats become 2×2 grid
  - Admission timeline becomes vertical


# ------------------------------------------------------------
# SEO
# ------------------------------------------------------------

Every page needs generateMetadata() with:
  title, description, canonical, og:title, og:description, og:image

Program pages need JSON-LD Course schema:
  name, description, provider, url, educationalCredentialAwarded, offers

Home page needs JSON-LD Organization schema
Blog posts need JSON-LD Article schema
sitemap.xml via next-sitemap
robots.txt configured and tested


# ------------------------------------------------------------
# PERFORMANCE RULES
# ------------------------------------------------------------

Images:
  Always use next/image — never <img>
  Always set width, height, and alt
  Hero image: priority={true}
  All others: lazy loaded by default
  Allowed domains: images.unsplash.com, cdn.sanity.io

Fonts:
  Load via next/font/google with display: 'swap'
  Subset to latin only

Third-party:
  YouTube embeds: use facade pattern (click to load)
  No blocking scripts in <head>

Targets:
  LCP < 2.5s
  CLS < 0.1
  FID < 100ms
  Lighthouse score ≥ 90 on home and program pages


# ------------------------------------------------------------
# ACCESSIBILITY
# ------------------------------------------------------------

WCAG 2.1 AA minimum:
  All images have descriptive alt text
  All form inputs have associated labels
  Color contrast: 4.5:1 body text, 3:1 UI elements
  Keyboard navigation works throughout
  Focus rings visible (never outline: none without replacement)
  Hamburger menu has ARIA labels
  Accordion items use proper ARIA expanded states
  Modals trap focus and close on ESC


# ------------------------------------------------------------
# GIT WORKFLOW
# ------------------------------------------------------------

Main branch: main (auto-deploys to Vercel production)
Feature branches: feature/section-name or fix/issue-name

Workflow:
  1. git pull before starting any edit session
  2. Make changes locally, verify at localhost:3000
  3. git add . → git commit -m "descriptive message" → git push
  4. Vercel auto-deploys in ~60 seconds
  5. Check Vercel preview URL before considering done

Never push directly to main without testing on localhost first.


# ------------------------------------------------------------
# ENVIRONMENT VARIABLES
# ------------------------------------------------------------

Local: .env.local (never committed to git)
Live: Vercel → Settings → Environment Variables

Required keys:
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
  NEXT_PUBLIC_SANITY_PROJECT_ID
  NEXT_PUBLIC_SANITY_DATASET
  SANITY_API_TOKEN
  RESEND_API_KEY
  UPSTASH_REDIS_REST_URL
  UPSTASH_REDIS_REST_TOKEN

NEXT_PUBLIC_ prefix = safe to expose to browser
All others = server-side only, never import in client components


# ------------------------------------------------------------
# THINGS TO NEVER DO
# ------------------------------------------------------------

NEVER:
  - Use a component library (shadcn, MUI, Chakra, Ant Design)
  - Use inline styles for colors or spacing — Tailwind brand tokens only.
    Exception: CSS gradients with brand hex values, and truly dynamic
    runtime values (computed widths, animation delays). See COMPONENT
    ARCHITECTURE for the full rule.
  - Use hardcoded color values — always use Tailwind brand tokens
  - Use <img> — always next/image
  - Use vh for full-height elements — use dvh (iOS Safari fix)
  - Add 'use client' to page.tsx or layout.tsx wrappers
  - Invent statistics — use only the real numbers in this file
  - Change the section order on the home page
  - Use border-radius values not specified in this file
  - Use font colors not in the brand color system
  - Push to main without testing on localhost first
  - Remove legacy-peer-deps=true from .npmrc
  - Suggest switching to yarn or pnpm
  - Use em-dashes (—) anywhere in content, UI text, or copy.
    Use a regular hyphen (-) or rewrite the sentence instead.
  - Use AI-tell phrases in any user-visible text:
    delve, furthermore, seamlessly, robust, leverage, comprehensive,
    it is worth noting, in conclusion, navigate, unlock, embark,
    cutting-edge, synergy, game-changer, groundbreaking, streamline.
    Write plain, direct English instead.


# ------------------------------------------------------------
# WHATSAPP FAB — REQUIRED ON EVERY PAGE
# ------------------------------------------------------------

Position: fixed, bottom-right, 24px from bottom, 24px from right
Size: 56px × 56px circle
Background: #25D366
Icon: WhatsApp SVG or unicode W in white 22px/700
Hover: scale(1.08), transition 200ms
Z-index: 50
Links to: https://wa.me/91XXXXXXXXXX?text=Hi%2C%20I%20want%20to%20know%20more%20about%20VGU%20online%20programs


# ============================================================
# END OF CURSOR RULES
# Read the entire file every time. No exceptions.
# ============================================================
