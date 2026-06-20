import type {
  PortableTextBlock,
  SanityBlogPost,
  SanityBlogPostSummary,
} from './sanity'

// Minimal PortableText block factory used to build placeholder bodies until
// posts are authored in Sanity Studio. Keys are deterministic so SSR/CSR match.
let counter = 0
function block(text: string, style: 'normal' | 'h2' | 'h3' = 'normal'): PortableTextBlock {
  const k = `b${++counter}`
  return {
    _type:    'block',
    _key:     k,
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: `${k}s`, text, marks: [] }],
  }
}

// Image URLs reuse covers already hosted on blog.vgu.ac.in (VGU's own assets).
const COVER = {
  googleAI:    'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781464446_Untitled%20design%20%281%29.webp',
  dasca:       'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781355776_DASCA%20Achievment%20blog.webp',
  psychology:  'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781355118_ba%20student%20blog.webp',
  bcomAcca:    'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781354530_b.com%20student%20blog.webp',
  bba:         'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781258076_bba%20nep%20blog.webp',
  designCode:  'https://blog.vgu.ac.in/blog-dashboard/uploads/blogs/1781257272_turpan%20blog.webp',
}

// ──────────────────────────────────────────────────────────────
// Posts
// ──────────────────────────────────────────────────────────────

export const FALLBACK_POSTS: SanityBlogPost[] = [
  {
    _id:         'fallback-google-ai',
    slug:        'rajasthan-first-google-agentic-ai-university',
    title:       "VGU Jaipur: Rajasthan's First Google Agentic AI University",
    excerpt:     'Google has recognised VGU as the first university in Rajasthan to receive its Agentic AI designation. Here is what that actually changes for the way we teach, build, and place.',
    category:    'Industry',
    publishedAt: '2026-06-19T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    COVER.googleAI,
    featured:    true,
    author: {
      name:      'Office of the CEO',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block('Agentic AI is the next layer above the chatbots most students already use. Instead of one prompt and one answer, an agent plans, picks tools, runs code, checks its own work, and keeps going until a goal is met. Google\'s recognition puts VGU among the small set of institutions in India that get early access to the curriculum, lab credits, and certification track that comes with it.', 'normal'),
      block('What this changes inside the classroom', 'h2'),
      block('From the next academic session, every Online VGU learner in our computing and AI tracks gets Google Cloud credits for hands-on agent work, structured lab sheets, and a project-based assessment that goes on the transcript. The faculty has been retrained over the past two terms, and three of our research staff now sit on Google\'s India faculty council.', 'normal'),
      block('The intent is simple: build agents that ship, not slides that explain agents. Every module ends with a working artefact, reviewed by an industry mentor.', 'normal'),
      block('Who benefits most', 'h2'),
      block('Students on MCA, BCA, B.Tech CSE-AI, and the MBA Business Analytics tracks see the most direct curriculum impact. Design students at VGU CODE get a parallel module on building AI-native product flows. Even non-technical programs get a short literacy unit so every graduate can speak the language recruiters now expect.', 'normal'),
      block('A note on placements', 'h2'),
      block('The placement cell has already signed two recruiters who hire specifically for agentic-AI roles in India. We expect that pipeline to widen across the coming year, and we will keep this blog updated as new hiring partners come on board.', 'normal'),
      block('If you want to know which programs include the Google curriculum from day one, talk to a counsellor or browse the Programs page.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-dasca',
    slug:        'vgu-dasca-accreditation-rajasthan-first',
    title:       "VGU Makes History as Rajasthan's First DASCA-Accredited University",
    excerpt:     'Our data programs are now accredited by the Data Science Council of America. The short version: the degree you earn here is now portable, internationally benchmarked, and recognised by global employers who hire data talent.',
    category:    'Education',
    publishedAt: '2026-06-18T09:00:00.000Z',
    readTime:    '4 min read',
    coverUrl:    COVER.dasca,
    featured:    false,
    author: {
      name:      'Office of the Registrar',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block('DASCA is the global standard-setter for the data-science profession. Its accreditation means an external body has audited our curriculum, faculty, lab infrastructure, and assessment methods against benchmarks used by employers in 180 countries. Passing that audit is not a stamp on a pamphlet. It is a working credential.', 'normal'),
      block('What the accreditation covers', 'h2'),
      block('Three programs sit inside the accreditation envelope: MSc Data Science, the MBA Business Analytics track, and the BCA Data Science specialisation. Each one is now mapped to DASCA\'s Senior Data Scientist body of knowledge, which means students sit examinations aligned with international hiring criteria, not a syllabus written in isolation.', 'normal'),
      block('What this means for you', 'h2'),
      block('Three concrete things. One, your degree is portable. Recruiters in the US, UK, Singapore, and the Gulf recognise DASCA in their HR screens. Two, you can sit for DASCA professional certifications at a fee subsidised through your VGU enrolment. Three, the curriculum updates every eighteen months in lockstep with what employers actually ask for, not what was current when you applied.', 'normal'),
      block('How we got here', 'h2'),
      block('The audit took fourteen months. The hardest part was not the syllabus rewrite, it was rebuilding the project-based assessment so that every student finishes with a portfolio of real work. We think that is the part future employers care about most, and we expect to push the same standard into our other technical programs over the next two academic cycles.', 'normal'),
      block('If a data-science career is on your mind, the program pages have the full curriculum and entry routes.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-psychology',
    slug:        'ba-psychology-journey-at-vgu',
    title:       'I Studied Humanity and Found My Future: My BA (Hons.) Psychology Journey',
    excerpt:     'Everyone told me to pick engineering. I picked psychology instead, and three years later I have a research role lined up that I would never have found in a coaching brochure.',
    category:    'Career',
    publishedAt: '2026-06-17T09:00:00.000Z',
    readTime:    '6 min read',
    coverUrl:    COVER.psychology,
    featured:    false,
    author: {
      name:      'Anushka Kapoor',
      title:     'BA (Hons.) Psychology, 3rd Year',
      avatarUrl: null,
    },
    body: [
      block('My twelfth-standard year was a long argument with the people around me. Engineering was the default. Commerce was the backup. Psychology was, in their words, a hobby. I am writing this six weeks before my final exams, with a research-assistant offer at a clinical practice in Bangalore and a postgraduate seat held for me at TISS. So the hobby worked out.', 'normal'),
      block('Why I picked psychology', 'h2'),
      block('I was not chasing a job. I wanted to understand how people make decisions, why families fall apart and put themselves back together, and what good therapy actually looks like. VGU\'s BA Hons. program had a syllabus that took the research side seriously, and a faculty list with people who had actually run trials, not just read about them.', 'normal'),
      block('What three years actually taught me', 'h2'),
      block('First: how to read a paper without believing it. Second: how to run a small study from start to finish, ethics approval and all. Third: how to listen to someone in the room without performing my listening at them. The third one is harder than it sounds, and only practice teaches it.', 'normal'),
      block('The internship that changed things', 'h2'),
      block('In my second year I interned at a community-mental-health initiative in Jaipur. Six weeks of intake interviews, supervised by a clinical psychologist who did not let any of us cut corners. By the end of it I knew I wanted to keep going into a master\'s, and I knew which kind of practice I wanted to build toward.', 'normal'),
      block('What I would tell my eighteen-year-old self', 'h2'),
      block('Pick the subject you can spend ten years inside without resenting. Pick the campus where someone will tell you when your study design is wrong. Everything else, including the salary, sorts itself out once those two things are right.', 'normal'),
      block('If anyone reading this is in the same fight I was three years ago, write to the counsellor team. They will not push you toward a course. They will help you pick.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-bcom-acca',
    slug:        'bcom-acca-journey-gcec-vgu',
    title:       'My BCom + ACCA Journey at GCEC, VGU Jaipur',
    excerpt:     'I came to VGU for the BCom and left with a parallel ACCA pipeline that put me in front of Big Four recruiters at the end of year two. The combined program is more work than the brochure suggests, and worth every hour.',
    category:    'Programs',
    publishedAt: '2026-06-16T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    COVER.bcomAcca,
    featured:    false,
    author: {
      name:      'Karan Mehta',
      title:     'B.Com (Hons.) + ACCA, GCEC',
      avatarUrl: null,
    },
    body: [
      block('I picked the BCom + ACCA combination because I wanted both an Indian degree and a globally portable accounting credential. The Global Career Education Centre at VGU runs them as a single integrated track, which sounds neat on paper. The first semester taught me how much work that actually is.', 'normal'),
      block('What the combined program actually looks like', 'h2'),
      block('You sit through the standard BCom curriculum, with the same affiliations and accreditations any BCom-Hons. carries. In parallel, your second and third semesters layer ACCA papers that line up with the BCom subjects, so the workload is dense but not duplicative. By final year, most of us had cleared seven of the ACCA papers, with the rest scheduled in the gap after graduation.', 'normal'),
      block('The internships that opened doors', 'h2'),
      block('I had two internships through GCEC, both arranged through the placement cell. The first was at a mid-tier consulting firm doing transfer-pricing documentation. The second was at a fintech preparing a financial statement audit. Neither would have been visible to me from a regular BCom track. The ACCA papers were a filter that put me in those rooms.', 'normal'),
      block('What I learnt about myself', 'h2'),
      block('Audit work is not glamorous, and I love it. There is something steadying about a column that has to add up, and a reconciliation that has to close. If you are the kind of student who finds that satisfying, this program will be a sane choice. If you do not, you will hate it by the third paper.', 'normal'),
      block('A practical note on cost and time', 'h2'),
      block('The ACCA exam fees stack up. VGU subsidises some of them, but you should budget realistically before you start. Time-wise, plan for a slightly heavier course load than a standalone BCom, especially in semesters four and five.', 'normal'),
      block('If you want to know which Big Four firms recruit from the program, the placement page has the full list of recurring recruiters.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-bba',
    slug:        'bba-skills-internships-success',
    title:       'My BBA Journey at VGU Jaipur: Skills, Internships, and Real Outcomes',
    excerpt:     'A BBA is one of the most copied degree templates in India. What made mine different was the internship pipeline and the fact that nobody let me coast.',
    category:    'Career',
    publishedAt: '2026-06-15T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    COVER.bba,
    featured:    false,
    author: {
      name:      'Rhea Sharma',
      title:     'BBA, 4th Year',
      avatarUrl: null,
    },
    body: [
      block('The reason most BBA graduates end up disappointed is that the degree is built to be generic. You leave knowing a little of everything and not enough of anything. The VGU program is structured around the opposite assumption: you pick a track in semester three, and the rest of the degree is built around three real internships, not classroom case studies.', 'normal'),
      block('The track that shaped my final year', 'h2'),
      block('I picked marketing analytics, which sounds narrower than it is. The track included real digital-marketing labs, an applied statistics block, and a final capstone that took six months to run. By the end of it I had built and shipped a dashboard that the partner company is still using, which means the work outlives the grade.', 'normal'),
      block('The internships that actually counted', 'h2'),
      block('Three internships over three years. The first was at a D2C brand, where I learnt how a shopify storefront actually breaks. The second was at a consulting firm, where I learnt how slides get made under time pressure. The third was at an early-stage startup, where I learnt that nobody is going to tell you the answer and you have to figure it out alone.', 'normal'),
      block('What the placement cell did differently', 'h2'),
      block('Unlimited mock interviews. Not three, not five. Unlimited. I sat through nine before my real interview cycle, and the last four were noticeably harder than anything that came up in the actual recruitment rounds. By the time I walked into the offer round, the pressure felt familiar.', 'normal'),
      block('Where the BBA is taking me next', 'h2'),
      block('I have a campus offer from a consumer-tech firm in Bengaluru and a deferred admit for an MBA in case I want to keep studying. Either way, the degree did its job, and it did it because I picked a program that took practical work as seriously as the lectures.', 'normal'),
      block('If you are sitting on a BBA offer letter and wondering whether to take it, the Programs page has the full curriculum and a counsellor who will answer questions honestly.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-vgu-code',
    slug:        'design-education-vgu-code-2026',
    title:       'What Design Education Looks Like at VGU CODE in 2026',
    excerpt:     'Studios over lecture halls, briefs from working studios, and a quiet rewrite of every assignment so that AI tools sit inside the workflow instead of next to it. Here is how the program is taught this year.',
    category:    'Programs',
    publishedAt: '2026-06-14T09:00:00.000Z',
    readTime:    '6 min read',
    coverUrl:    COVER.designCode,
    featured:    false,
    author: {
      name:      'Faculty Team',
      title:     'VGU CODE, School of Design',
      avatarUrl: null,
    },
    body: [
      block('Design schools in India are still mostly lecture-and-portfolio places. We rebuilt the VGU CODE curriculum on a different assumption: that design is a practice, not a body of theory, and that the only way to learn a practice is to do it in front of someone who can tell you when it is not working.', 'normal'),
      block('Studio first, lectures second', 'h2'),
      block('Every semester is structured around two long studio briefs, each lasting six to eight weeks. The briefs come from working studios, founders, and our own faculty, and they end with a real review by an external critic. Lectures still happen, but they are scheduled around the studio, not the other way around.', 'normal'),
      block('The toolchain we use this year', 'h2'),
      block('Figma is the daily driver for screen work. Blender and Cinema 4D for 3D. ProtoPie for motion prototyping. Procreate and the Adobe suite for everything illustration-adjacent. Screen-printing presses and a small risograph in the print studio. The expectation is that you become fluent across two or three of these by the end of year two.', 'normal'),
      block('Where AI sits in the workflow', 'h2'),
      block('We do not pretend AI did not happen. It is in the brief, in the critique, and in the toolchain. Students use generative models for moodboards, copy drafts, and rapid prototype variants. The grading rubric rewards intentional use, not volume of output. A student who can explain why they overrode a model gets the same credit as one who built without it.', 'normal'),
      block('What graduates are doing now', 'h2'),
      block('The 2024 and 2025 batches are spread across product design at growth-stage startups, brand identity at independent studios, UX research at consumer-tech firms, and a smaller cohort working in editorial and motion design. The work that placed best was, almost without exception, the work that took the most time to think through. We tell every incoming cohort the same thing.', 'normal'),
      block('Applications for the 2026 intake are open. The portfolio review is the part we take most seriously, so spend time on it before you submit.', 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-mba-worth-it',
    slug:        'is-online-mba-from-vgu-worth-it',
    title:       "Is an Online MBA From VGU Worth It? An HR Manager's Perspective",
    excerpt:     "We asked a senior HR manager who has hired VGU MBA graduates across three placement cycles. Here is what she said - and what she didn't.",
    category:    'Industry',
    publishedAt: '2026-06-13T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Office of the Placement Cell',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block("Shweta runs talent acquisition at a consulting firm in Pune. Over three hiring cycles she has taken five MBA graduates from VGU Online. She told us she didn't know they came from an online program until after the offers went out. That is probably the most useful data point in this piece.", 'normal'),
      block('What HR actually screens for', 'h2'),
      block("Degree verification happens first. UGC-entitled degrees from NAAC A+ universities clear the credential filter in about sixty seconds. After that, the screening is entirely about the work the candidate can show: projects, case analyses, internship outputs. The delivery format of the degree doesn't appear in the scoring rubric.", 'normal'),
      block('What the VGU MBA includes', 'h2'),
      block("Two years, nine specialisation tracks, and an industry-project format that replaces most exam-based assessment with working outputs. The Coursera bundle gives every learner access to professional certification tracks on top of the core curriculum. The placement cell starts working with you in semester three, not after graduation.", 'normal'),
      block('Who this program is a good fit for', 'h2'),
      block("Working professionals who cannot leave their jobs but want a credential that opens the next salary band. People who want to pivot into management without a full-time residential commitment. The online format works best for people who already have the discipline. If you need a classroom structure to do the reading, that is worth knowing before you start.", 'normal'),
      block('The honest bottom line', 'h2'),
      block("An online MBA from a UGC-entitled, NAAC A+ university will not open every door that a residential MBA from the IIMs opens. It will open most of the doors that working professionals in their mid-twenties actually need open. If that is the question you came here with, the answer is yes.", 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-mca-vs-btech',
    slug:        'mca-vs-btech-what-recruiters-look-for-2026',
    title:       'MCA vs B.Tech: What Recruiters Actually Ask For in 2026',
    excerpt:     "The question comes up in every counselling call. The honest answer is more nuanced than either camp will admit - and the hiring data tells a different story than the online debate.",
    category:    'Career',
    publishedAt: '2026-06-12T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Office of the Placement Cell',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block("The framing of this debate usually goes: B.Tech is the real engineering degree, MCA is the shortcut. That framing is wrong in 2026, and the hiring data makes it clear.", 'normal'),
      block('Where the two credentials sit in the market', 'h2'),
      block("For product companies in consumer tech, B.Tech from a recognised institution still dominates the SDE entry filter. For IT services, banking tech, and enterprise software, MCA is an accepted and often preferred credential - particularly when the candidate has a strong project portfolio. The gap has narrowed significantly since 2022.", 'normal'),
      block('What the VGU MCA covers now', 'h2'),
      block("The curriculum was updated in 2024 to include the Google Agentic AI lab track, DASCA-mapped data science modules, and a capstone project assessed by an industry reviewer. Every enrolled student has free access to 7,000+ Coursera courses from day one. The placement cell starts technical interview preparation in semester three.", 'normal'),
      block('The honest comparison', 'h2'),
      block("A B.Tech from a tier-one institution is a stronger credential for entry into top-tier product companies. An MCA from a UGC-entitled NAAC A+ university is a fully valid credential for a wide range of technical roles, and the two-year duration means you are in the job market sooner. If you already have a BCA or B.Sc in Computer Science, the MCA is the direct continuation most IT employers expect.", 'normal'),
      block('Where VGU MCA graduates have placed', 'h2'),
      block("Across the 2023 and 2024 batches, VGU MCA graduates placed at TCS, Infosys, Cognizant, HCL, and a number of mid-market firms. Roles were predominantly software development, cloud engineering, and systems analysis. Average time from graduation to first offer was under four months.", 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-study-without-burnout',
    slug:        'how-to-finish-online-degree-without-burning-out',
    title:       'How to Finish an Online Degree Without Burning Out',
    excerpt:     "I work a 9-to-6 and study full-time online. The first semester was brutal. The second was manageable. Here is exactly what changed between the two.",
    category:    'Education',
    publishedAt: '2026-06-11T09:00:00.000Z',
    readTime:    '6 min read',
    coverUrl:    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Divya Menon',
      title:     'MCA 2nd Year, Online VGU',
      avatarUrl: null,
    },
    body: [
      block("The first week of my MCA I studied the way I imagined a full-time student would study. Evenings from seven to eleven, weekends from nine to six. By week three I had a backlog, a cold, and a genuine question about whether I had made a mistake. Here is what worked after I stopped trying to do it the hard way.", 'normal'),
      block('The schedule that actually stuck', 'h2'),
      block("Forty-five minutes every morning before work, five days a week. One three-hour session on Saturday. Nothing on Sunday unless an assignment was due. That is roughly five hours a week of active study, which sounds less than it is once you treat it seriously. The morning slot is non-negotiable. The Saturday session can move. Sunday is protected.", 'normal'),
      block('What to do about your employer', 'h2'),
      block("I told my manager at about week six. Not in a formal meeting - I mentioned it when it came up naturally. She has been flexible about leaving on time since then. The alternative is hiding it, which adds its own kind of pressure. Most employers take it well. Some will even support you.", 'normal'),
      block('Where the VGU structure helped', 'h2'),
      block("Recorded sessions are available on demand, so the lecture schedule does not conflict with work hours. The live sessions run on weekends. The placement cell check-ins are voluntary, but attending them keeps the end goal visible on weeks that feel like just survival.", 'normal'),
      block('When to slow down', 'h2'),
      block("In semester two I deferred one elective to the next cycle. A project deadline at work made the load genuinely too high that term. The process was straightforward and nobody treated it as a failure. The option exists because the program is designed for people with real commitments outside of studying. Use it before you are failing, not after.", 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-placement-six-months',
    slug:        'six-months-before-placements-checklist',
    title:       'Six Months Before Placements: What the Cell Wants You Doing Now',
    excerpt:     "Most students start preparing three weeks before company visits. The ones who placed fastest started six months out. Here is what those six months actually look like.",
    category:    'Career',
    publishedAt: '2026-06-10T09:00:00.000Z',
    readTime:    '5 min read',
    coverUrl:    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Office of the Placement Cell',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block("Every placement season, some students place in the first month and others are still searching four months later. The difference is almost never the degree or the GPA. It is almost always preparation lead time - and the quality of the resume and interview practice they walked in with.", 'normal'),
      block('Months six and five: the profile work', 'h2'),
      block("Start with the resume. One page, achievement-focused, no objective statement. LinkedIn next, with the same content but extended project descriptions. Skills section mapped to the roles you want, not the roles you have held. This takes longer than you think. Do it before the portal opens.", 'normal'),
      block('Months four and three: mock interviews', 'h2'),
      block("The AI portal matches you with roles. Before you apply to any of them, sit through at least six mock interviews with the placement cell. Not three. Six. The first two are calibration. The third is where real feedback starts. By six, your answers are tighter and you have stopped using filler language under pressure.", 'normal'),
      block('Months two and one: applications', 'h2'),
      block("Apply to the top quarter of your portal matches, not every listing. A focused shortlist with a well-crafted message to the recruiter outperforms a spray approach with a generic resume. The placement cell will review your application for any specific company before you submit - use that.", 'normal'),
      block('What the cell watches for', 'h2'),
      block("Students who engage early, attend industry sessions without being pushed, and treat mock interviews seriously. Those students get the warm introductions when recruiter conversations happen. None of that is favouritism. Preparation is visible, and preparation is what employers say they are hiring for.", 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-coursera-bundle',
    slug:        'how-to-use-vgu-coursera-bundle-strategically',
    title:       '7,000+ Free Courses: How to Actually Use the Coursera Bundle',
    excerpt:     "Every enrolled VGU learner gets institutional access to 7,000+ Coursera courses. Very few use it strategically. Here is the difference between collecting certificates and building a portfolio that recruiters notice.",
    category:    'Education',
    publishedAt: '2026-06-09T09:00:00.000Z',
    readTime:    '4 min read',
    coverUrl:    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Faculty Team',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block("Every enrolled VGU learner gets institutional access to the full Coursera catalogue from the first day of semester one. The challenge is not getting in. The challenge is not drowning in choices.", 'normal'),
      block('What the catalogue includes', 'h2'),
      block("Standalone courses, guided projects (one to three hours each), Specialisations, and Professional Certificates. The Professional Certificates are the high-value tier. Google, IBM, Meta, and Salesforce all offer them. These are what HR actually recognises when reviewing a LinkedIn certifications section.", 'normal'),
      block('What to take by program', 'h2'),
      block("MBA and B.Com learners: Google Digital Marketing and E-commerce, Financial Markets by Yale, Salesforce Sales Operations. MCA and BCA: IBM Data Science, Google IT Support, Meta Front-End Developer. BA and MA: Psychology First Aid by Johns Hopkins, Introduction to Research Methods. These are not requirements - they are the ones that have come up most in placement conversations.", 'normal'),
      block('One cert per semester', 'h2'),
      block("The common mistake is signing up for eight courses in week one and finishing none. A more useful approach is one Professional Certificate per semester, chosen because it complements the modules you are already studying. A second-semester MCA student doing a Data Structures module will get more from the IBM Data Science Certificate in parallel than from a general management course in the same term.", 'normal'),
      block('What to skip', 'h2'),
      block("Anything that duplicates your core curriculum. Anything taken purely for the badge with no plan to use the content. Hiring managers can tell when a certifications list is padding. Pick the ones that extend your core skills and that you can answer real questions about in an interview.", 'normal'),
    ],
    relatedPrograms: [],
  },

  {
    _id:         'fallback-ugc-deb-explained',
    slug:        'what-ugc-distance-education-bureau-entitlement-means',
    title:       'UGC Distance Education Bureau: What the Entitlement Actually Means for Your Degree',
    excerpt:     "The phrase 'UGC-entitled' appears on every page of this site. Here is what it means in concrete terms, what it protects, and where it does not apply.",
    category:    'Education',
    publishedAt: '2026-06-08T09:00:00.000Z',
    readTime:    '4 min read',
    coverUrl:    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80&auto=format&fit=crop',
    featured:    false,
    author: {
      name:      'Office of the Registrar',
      title:     'Vivekananda Global University',
      avatarUrl: null,
    },
    body: [
      block("UGC stands for University Grants Commission, the central body that regulates higher education in India. The Distance Education Bureau is its division that oversees online and distance programs. When a program carries DEB entitlement, it has been reviewed and approved under the same regulatory framework that governs all recognised degrees in India.", 'normal'),
      block("What 'entitled' means legally", 'h2'),
      block("An online degree from a UGC-DEB entitled university carries the same legal standing as a degree from that university's on-campus program. The certificate does not say 'distance education' or 'online' on it. It is the same document, with the same legal recognition. This matters for government recruitment, PSU applications, and any employer that runs a degree check through the National Academic Depository.", 'normal'),
      block('How employers verify it', 'h2'),
      block("Two routes. VGU is listed on the UGC website under recognised universities with DEB entitlement. Separately, the National Academic Depository holds digitally signed degree records that any employer can verify without contacting the university. Most mid-size and large companies run automated checks through the NAD. A VGU online degree clears those checks the same way an on-campus degree does.", 'normal'),
      block('What it does not cover', 'h2'),
      block("Private certification courses from ed-tech platforms are not covered by UGC-DEB. Professional certificates from Coursera, LinkedIn Learning, or similar platforms are supplementary - they signal skills, not degree-level qualifications. The VGU degree is the regulated credential. Everything else you earn alongside it is valuable but not equivalent to it.", 'normal'),
      block('Government jobs and PSU eligibility', 'h2'),
      block("UGC-DEB entitled degrees are eligible for central and state government recruitment under UPSC, SSC, and equivalent bodies, provided the program meets the qualification criteria for the specific post. VGU programs meet those criteria. If you are preparing for a government-sector role, confirm the specific eligibility requirements for that post against the program details. The admissions team can verify this before you enrol.", 'normal'),
    ],
    relatedPrograms: [],
  },
]

// Listing-summary shape derived from the full fallback posts.
export const FALLBACK_POST_SUMMARIES: SanityBlogPostSummary[] = FALLBACK_POSTS.map(p => ({
  _id:         p._id,
  slug:        p.slug,
  title:       p.title,
  excerpt:     p.excerpt,
  category:    p.category,
  publishedAt: p.publishedAt,
  readTime:    p.readTime,
  coverUrl:    p.coverUrl,
  featured:    p.featured,
  author:      p.author,
}))

export function findFallbackPostBySlug(slug: string): SanityBlogPost | null {
  return FALLBACK_POSTS.find(p => p.slug === slug) ?? null
}

export function fallbackRelatedPosts(slug: string, category: string | null): SanityBlogPostSummary[] {
  const others = FALLBACK_POST_SUMMARIES.filter(p => p.slug !== slug)
  const sameCat = category ? others.filter(p => p.category === category) : []
  const filler = others.filter(p => !sameCat.includes(p))
  return [...sameCat, ...filler].slice(0, 3)
}
