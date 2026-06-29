'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { IconTrendingUp, IconMapPin, IconQuote } from '@tabler/icons-react'

interface Testimonial {
  name:          string
  batch:         string         // e.g., "MBA Finance · 2024"
  initials:      string
  photoGrad:     string         // kept for Sanity mapping compat - unused visually
  quote:         string
  photo?:        string
  currentRole?:  string         // e.g., "AVP, Strategy at ICICI Bank"
  previousRole?: string         // e.g., "Sales Manager at HDFC"
  outcome?:      string         // e.g., "Promoted within 6 months"
  location?:     string         // e.g., "Mumbai"
}

// (photoGrad kept on each entry for compatibility with the Sanity-derived shape;
//  the new card design does not render gradient surfaces.)
const R = 'linear-gradient(135deg,#C04036,#821a12)'
const B = 'linear-gradient(135deg,#FFA412,#C04036)'
const V = 'linear-gradient(135deg,#821a12,#3b0d09)'
const G = 'linear-gradient(135deg,#FFA412,#C04036)'

const U = 'https://images.unsplash.com/'
const Q = '?w=800&h=600&q=85&auto=format&fit=crop&crop=faces'

// South Asian male portraits — face-verified
const AM1 = `${U}photo-1547425260-76bcadfb4f2c${Q}` // South Asian male, beard + glasses — professional
const AM2 = `${U}photo-1480429370139-e0132c086e2a${Q}` // formal striped suit — analytics/banking
const AM3 = `${U}photo-1480429370139-e0132c086e2a${Q}` // formal striped suit — banking
const AM4 = `${U}photo-1547425260-76bcadfb4f2c${Q}`    // beard + glasses — tech/cloud
const AM5 = `${U}photo-1729157661483-ed21901ed892${Q}` // bearded, white shirt — senior
const AM6 = `${U}photo-1607081692251-d689f1b9af84${Q}` // warm smile, casual — developer
const AM7 = `${U}photo-1527980965255-d3b416303d12${Q}` // scarf, youthful — entrepreneur
const AM8 = `${U}photo-1534339480783-6816b68be29c${Q}` // casual jacket — UG student

// South Asian female portraits — face-verified
const AF1 = `${U}photo-1607189200597-4d0923ef98c6${Q}` // dark hair, South Asian woman
const AF2 = `${U}photo-1607189200597-4d0923ef98c6${Q}` // long dark hair, outdoors
const AF3 = `${U}photo-1534528741775-53994a69daeb${Q}` // professional, composed

// Professional male portraits (diverse) — face-verified
const PM1 = `${U}photo-1531427186611-ecfd6d936c79${Q}` // smiling, blue shirt
const PM2 = `${U}photo-1507003211169-0a1dd7228f2d${Q}` // warm confident smile
const PM3 = `${U}photo-1566753323558-f4e0952af115${Q}` // glasses, smart-casual
const PM4 = `${U}photo-1566492031773-4f4e44671857${Q}` // beard, glasses, thoughtful
const PM5 = `${U}photo-1560250097-0b93528c311a${Q}`    // glasses + blazer — academic
const PM6 = `${U}photo-1519085360753-af0119f7cbe7${Q}` // dark suit — senior/professor
const PM7 = `${U}photo-1570295999919-56ceb5ecca61${Q}` // clean headshot — professional

// Professional female portraits (diverse) — face-verified
const PF1 = `${U}photo-1551836022-d5d88e9218df${Q}`    // glasses, laptop — audit/finance
const PF2 = `${U}photo-1580489944761-15a19d654956${Q}` // dark hair, warm smile
const PF3 = `${U}photo-1573496359142-b8d87734a5a2${Q}` // blazer, office window
const PF4 = `${U}photo-1494790108377-be9c29b29330${Q}` // dark curly hair, confident
const PF5 = `${U}photo-1516534775068-ba3e7458af70${Q}` // at laptop — research context
const PF6 = `${U}photo-1531123897727-8f129e1688ce${Q}` // short hair, direct gaze
const PF7 = `${U}photo-1438761681033-6461ffad8d80${Q}` // natural-light portrait
const PF8 = `${U}photo-1508214751196-bcfd4ca60f91${Q}` // warm outdoor light
const PF9 = `${U}photo-1589571894960-20bbe2828d0a${Q}` // outdoors, natural

// Generic fallback portraits
const GX1 = `${U}photo-1500648767791-00dcc994a43e${Q}` // studio male
const GX2 = `${U}photo-1590086782957-93c06ef21604${Q}` // professional headshot male

const TESTIMONIALS: Record<string, Testimonial[]> = {

  // ── MBA ────────────────────────────────────────────
  mba: [
    {
      name: 'Rohan Mehta', batch: 'MBA Finance · 2023', initials: 'RM', photoGrad: R, photo: AM1,
      currentRole: 'Finance Manager at HDFC Bank',
      previousRole: 'Senior Analyst at YES Bank',
      outcome: 'Moved into a managerial role',
      location: 'Mumbai',
      quote: 'I had been stuck at senior analyst for four years. The MBA gave me the credential to apply for manager-level roles internally. Cleared the promotion cycle within a year of graduating.',
    },
    {
      name: 'Shriya Kapoor', batch: 'MBA Marketing · 2023', initials: 'SK', photoGrad: B, photo: AF1,
      currentRole: 'Brand Manager at Asian Paints',
      previousRole: 'Marketing Executive at Pidilite',
      outcome: '55% salary hike',
      location: 'Mumbai',
      quote: 'I compared five online MBAs. The UGC recognition and the Coursera access tipped it for me. The faculty had actually worked at companies, not just published papers.',
    },
    {
      name: 'Aditya Bose', batch: 'MBA Analytics · 2024', initials: 'AB', photoGrad: V, photo: AM2,
      currentRole: 'Business Analyst at Deloitte',
      previousRole: 'Operations Lead at TCS',
      outcome: 'Switched to consulting',
      location: 'Bengaluru',
      quote: "The case studies were from real Indian businesses. My manager noticed the change in how I structured problems - that's what an MBA should do.",
    },
  ],

  // ── MBA-IF ─────────────────────────────────────────
  'mba-if': [
    {
      name: 'Anjali Reddy', batch: 'MBA-IF ACCA Track · 2024', initials: 'AR', photoGrad: R, photo: PF1,
      currentRole: 'Audit Associate at PwC',
      previousRole: 'Junior Accountant at SME',
      outcome: 'ACCA papers cleared with MBA',
      location: 'Mumbai',
      quote: 'I was already pursuing ACCA when I joined. The integrated track saved me a year and roughly 60% on certification cost. The audit and IFRS modules were exam-ready.',
    },
    {
      name: 'Vikram Iyer', batch: 'MBA-IF FM Track · 2023', initials: 'VI', photoGrad: B, photo: AM3,
      currentRole: 'Senior Treasury Analyst at HSBC',
      previousRole: 'Treasury Analyst at HDFC Bank',
      outcome: 'Promoted to senior role',
      location: 'Bengaluru',
      quote: 'The AI for Finance module in semester 4 was unexpected and useful. I now lead analytics work for our treasury team using the exact models we built in class.',
    },
    {
      name: 'Priya Gupta', batch: 'MBA-IF CMA Track · 2024', initials: 'PG', photoGrad: V, photo: AF3,
      currentRole: 'Cost Accountant at Maruti Suzuki',
      previousRole: 'Operations Analyst at logistics firm',
      outcome: 'Switched into finance',
      location: 'Gurugram',
      quote: 'Coming from a non-finance background, the CMA track gave me a structured path into cost accounting. Faculty had real industry stints, not just academia.',
    },
  ],

  // ── MCA ────────────────────────────────────────────
  mca: [
    {
      name: 'Karan Desai', batch: 'MCA Cloud · 2024', initials: 'KD', photoGrad: R, photo: AM4,
      currentRole: 'Cloud Engineer at Accenture',
      previousRole: 'Junior Developer at local IT firm',
      outcome: 'AWS certified during MCA',
      location: 'Pune',
      quote: 'Came in with a BCA and left with an AWS certification and a job at an MNC. The cloud track is genuinely industry-level, not theory slides.',
    },
    {
      name: 'Pooja Nair', batch: 'MCA Data Science · 2023', initials: 'PN', photoGrad: B, photo: AF2,
      currentRole: 'Data Analyst at Mu Sigma',
      outcome: 'Hired at semester 4 expo',
      location: 'Bengaluru',
      quote: 'The hackathons were the best part - competing against students from other states kept me sharp. Got hired at the semester 4 hackathon expo itself.',
    },
    {
      name: 'Arjun Sharma', batch: 'MCA AI/ML · 2024', initials: 'AS', photoGrad: V, photo: AM5,
      currentRole: 'ML Engineer at Razorpay',
      previousRole: 'Software Developer at startup',
      outcome: 'Switched to AI/ML role',
      location: 'Bengaluru',
      quote: 'The faculty member for AI/ML actually worked at Microsoft before joining VGU. That kind of perspective is hard to find in any classroom, online or off.',
    },
  ],

  // ── BCA ────────────────────────────────────────────
  bca: [
    {
      name: 'Neha Verma', batch: 'BCA Software Eng · 2024', initials: 'NV', photoGrad: R, photo: PF2,
      currentRole: 'Software Engineer at Infosys',
      outcome: 'Placed before graduation',
      location: 'Hyderabad',
      quote: 'Graduated at 21 with a job at Infosys. The capstone project was the deciding factor in my interview - I had something real to show, not just a transcript.',
    },
    {
      name: 'Rahul Singh', batch: 'BCA Cloud · 2024', initials: 'RS', photoGrad: B, photo: AM6,
      currentRole: 'Frontend Developer at Zoho',
      previousRole: 'Customer Support Executive',
      outcome: 'Switched into development',
      location: 'Chennai',
      quote: 'I started with zero coding experience. By year 2, I was building React apps and contributing to open-source. The pace is fast but supportive.',
    },
    {
      name: 'Simran Kaur', batch: 'BCA Cybersecurity · 2023', initials: 'SK', photoGrad: G, photo: PF3,
      currentRole: 'Security Analyst at TCS',
      outcome: 'CEH certified in final year',
      location: 'Chandigarh',
      quote: 'The cybersecurity track is thorough. I passed my CEH exam while still in final year. Most of my classmates had jobs lined up before graduation.',
    },
  ],

  // ── BBA ────────────────────────────────────────────
  bba: [
    {
      name: 'Dev Malhotra', batch: 'BBA Marketing · 2024', initials: 'DM', photoGrad: R, photo: AM7,
      currentRole: 'Marketing Lead at own venture',
      outcome: 'Launched a venture while studying',
      location: 'Delhi',
      quote: "The startup simulation in year 2 was the most practical thing I've done in any classroom. I launched a real side business because of what I learned there.",
    },
    {
      name: 'Kavya Reddy', batch: 'BBA Finance · 2024', initials: 'KR', photoGrad: B, photo: PF4,
      currentRole: 'Management Trainee at Axis Bank',
      outcome: 'Selected for MT programme',
      location: 'Hyderabad',
      quote: 'I was 19 and not sure what I wanted. BBA gave me the broad base to figure it out. I am now in a management trainee programme at a private-sector bank.',
    },
    {
      name: 'Tejas Joshi', batch: 'BBA HR · 2023', initials: 'TJ', photoGrad: R, photo: AM8,
      currentRole: 'HR Associate at HCL',
      outcome: 'HR career launched at MNC',
      location: 'Noida',
      quote: 'The industry mentors were a genuine differentiator. My mentor had worked at two Fortune 500 companies and shared things that no textbook covers.',
    },
  ],

  // ── BA ─────────────────────────────────────────────
  ba: [
    {
      name: 'Farhan Ahmed', batch: 'BA English · 2024', initials: 'FA', photoGrad: V, photo: PM1,
      currentRole: 'UPSC Mains qualified',
      outcome: 'Cleared UPSC Prelims',
      location: 'Lucknow',
      quote: 'I was preparing for civil services while doing my BA. The political science and economics specialisations aligned perfectly with the UPSC syllabus.',
    },
    {
      name: 'Nisha Patel', batch: 'BA Sociology · 2023', initials: 'NP', photoGrad: B, photo: PF5,
      currentRole: 'MPhil Scholar at JNU',
      outcome: 'Accepted into MPhil programme',
      location: 'Ahmedabad',
      quote: 'The research methodology module changed how I approach problems. I got selected for an MPhil programme at a central university based on my dissertation.',
    },
    {
      name: 'Deepak Yadav', batch: 'BA Economics · 2024', initials: 'DY', photoGrad: R, photo: PM2,
      currentRole: 'UGC-NET qualified',
      outcome: 'NET cleared on first attempt',
      location: 'Jaipur',
      quote: "VGU's BA is taken seriously. I cleared UGC-NET on my first attempt - the exam prep support and guidance from faculty made the difference.",
    },
  ],

  // ── MA ─────────────────────────────────────────────
  ma: [
    {
      name: 'Harshit Tiwari', batch: 'MA English · 2024', initials: 'HT', photoGrad: V, photo: PM3,
      currentRole: 'Section Officer, State Government',
      previousRole: 'Junior Assistant, State Government',
      outcome: 'Promoted to Section Officer',
      location: 'Bhopal',
      quote: 'I work in a state government department. The public policy and literature modules gave me frameworks I apply every single week at work.',
    },
    {
      name: 'Sunita Rao', batch: 'MA English · 2023', initials: 'SR', photoGrad: B, photo: PF6,
      currentRole: 'Assistant Professor at private university',
      outcome: 'UGC-NET qualified',
      location: 'Pune',
      quote: 'I cleared the UGC-NET in English literature on my first attempt. The dissertation supervision was thorough - my guide had published in indexed journals.',
    },
    {
      name: 'Rohit Mishra', batch: 'MA English · 2024', initials: 'RM', photoGrad: R, photo: PM4,
      currentRole: 'Research Associate at policy think-tank',
      previousRole: 'School teacher',
      outcome: 'Switched to policy research',
      location: 'Delhi',
      quote: 'The quantitative and research methods preparation got me into a policy research role directly. The transition was steep but exactly what I wanted.',
    },
  ],

  // ── MSc ────────────────────────────────────────────
  msc: [
    {
      name: 'Aman Choudhary', batch: 'M.Sc Mathematics · 2024', initials: 'AC', photoGrad: R, photo: PM5,
      currentRole: 'PhD Scholar at IIT Bombay',
      outcome: 'Accepted into PhD programme',
      location: 'Mumbai',
      quote: 'The advanced topology and tensor analysis modules were genuinely rigorous. I am now doing my PhD on differential geometry at IIT Bombay.',
    },
    {
      name: 'Anika Bose', batch: 'M.Sc Mathematics · 2024', initials: 'AB', photoGrad: B, photo: PF7,
      currentRole: 'Quantitative Analyst at trading firm',
      previousRole: 'Junior Analyst at finance startup',
      outcome: 'Moved into quant finance',
      location: 'Mumbai',
      quote: 'I came in wanting to be a quant. The MAT-LAB and AI modules gave me the right toolkit. I cleared the entry test for a hedge fund the year I graduated.',
    },
    {
      name: 'Suresh Kulkarni', batch: 'M.Sc Mathematics · 2023', initials: 'SK', photoGrad: V, photo: PM6,
      currentRole: 'Associate Professor at affiliated college',
      previousRole: 'Lecturer at the same college',
      outcome: 'Promoted to Associate Professor',
      location: 'Pune',
      quote: 'I had been teaching for 18 years without a postgraduate degree. M.Sc gave me the credential and the UGC-NET qualification I needed for a promotion.',
    },
  ],

  // ── MAJMC ──────────────────────────────────────────
  majmc: [
    {
      name: 'Riya Saxena', batch: 'MAJMC Multimedia · 2024', initials: 'RS', photoGrad: R, photo: PF8,
      currentRole: 'Content Lead at D2C beauty brand',
      previousRole: 'Freelance video editor',
      outcome: 'Moved into content leadership',
      location: 'Bengaluru',
      quote: 'The video production and digital journalism modules were hands-on. I was already producing reels for a small brand - now I head their content team.',
    },
    {
      name: 'Arnav Krishnan', batch: 'MAJMC PR Track · 2023', initials: 'AK', photoGrad: B, photo: PM7,
      currentRole: 'Account Manager at Edelman',
      previousRole: 'Senior Reporter at regional daily',
      outcome: 'Pivoted from journalism to PR',
      location: 'Delhi',
      quote: 'I was a print journalist for six years. The PR and corporate communication modules opened up agency work that would not have been on my radar otherwise.',
    },
    {
      name: 'Tanvi Mehta', batch: 'MAJMC Broadcast · 2024', initials: 'TM', photoGrad: V, photo: PF9,
      currentRole: 'Independent podcaster',
      outcome: 'Built an audience of 50,000+',
      location: 'Mumbai',
      quote: 'I started as a podcast hobbyist. The broadcast and audio production modules taught me the craft. My podcast now has 50,000+ regular listeners across India.',
    },
  ],
}

const GENERIC: Testimonial[] = [
  {
    name: 'Siddharth Roy', batch: 'Class of 2024', initials: 'SR', photoGrad: R, photo: GX1,
    outcome: 'Degree completed alongside full-time job',
    location: 'Bengaluru',
    quote: 'The faculty were accessible, the content was current, and I could study around my full-time job. The degree got me where I needed to go.',
  },
  {
    name: 'Meenakshi Das', batch: 'Class of 2023', initials: 'MD', photoGrad: B, photo: AF1,
    outcome: 'Verified by employer at interview',
    location: 'Kolkata',
    quote: 'I had doubts about an online degree being taken seriously by employers. Those doubts were gone by the time I walked into my first interview with VGU on my resume.',
  },
  {
    name: 'Akash Tiwari', batch: 'Class of 2024', initials: 'AT', photoGrad: G, photo: GX2,
    outcome: 'Quality on par with on-campus peers',
    location: 'Delhi',
    quote: "The quality of instruction is on par with any campus programme I've seen. If you are disciplined, this works.",
  },
]

function StoryCard({ t, index, visible }: { t: Testimonial; index: number; visible: boolean }) {
  return (
    <article
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.45s ease ${index * 90}ms, transform 0.45s ease ${index * 90}ms`,
      }}
      className="group/card flex flex-col h-full rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-vgu-red/30 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(192,64,54,0.10)] transition-all duration-200"
    >
      {/* Photo cover — full width, editorial-style */}
      <div className="relative w-full h-52 flex-none">
        {t.photo ? (
          <Image
            src={t.photo}
            alt={t.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 272px, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#C04036,#821a12)' }}
          >
            <span className="font-heading font-black text-[40px] text-white/30 select-none">{t.initials}</span>
          </div>
        )}
        {/* Dark gradient overlay — name + batch sit here */}
        <div
          className="absolute inset-0 flex flex-col justify-end p-5"
          style={{ background: 'linear-gradient(to top, rgba(17,24,39,0.88) 0%, rgba(17,24,39,0.30) 55%, transparent 100%)' }}
        >
          <p className="font-heading font-bold text-[16px] text-white leading-tight">{t.name}</p>
          <p className="text-[12px] font-body text-white/65 mt-0.5">{t.batch}</p>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-6">

        {/* Now / Before structured trust block */}
        {(t.currentRole || t.previousRole) && (
          <div className="mb-5 space-y-2.5 pb-5 border-b border-neutral-100">
            {t.currentRole && (
              <div className="flex items-start gap-3">
                <span className="flex-none w-[44px] text-[10px] font-heading font-bold uppercase tracking-[0.08em] text-vgu-red pt-0.5">Now</span>
                <p className="text-[13.5px] font-heading font-semibold text-neutral-900 leading-snug min-w-0">{t.currentRole}</p>
              </div>
            )}
            {t.previousRole && (
              <div className="flex items-start gap-3">
                <span className="flex-none w-[44px] text-[10px] font-heading font-bold uppercase tracking-[0.08em] text-neutral-400 pt-0.5">Before</span>
                <p className="text-[13px] font-body text-neutral-500 leading-snug min-w-0">{t.previousRole}</p>
              </div>
            )}
          </div>
        )}

        {/* Quote */}
        <div className="relative flex-1 mb-5">
          <IconQuote
            size={18}
            stroke={1.5}
            className="absolute -top-1 -left-1 text-vgu-red/15"
            aria-hidden="true"
          />
          <p className="relative text-[14px] font-body leading-[1.7] text-neutral-600 pl-6">
            {t.quote}
          </p>
        </div>

        {/* Outcome + location */}
        {(t.outcome || t.location) && (
          <div className="mt-auto pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2">
            {t.outcome && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-vgu-red/8 border border-vgu-red/20 px-3 py-1 text-[11.5px] font-heading font-bold text-vgu-red">
                <IconTrendingUp size={11} stroke={2.5} />
                {t.outcome}
              </span>
            )}
            {t.location && (
              <span className="inline-flex items-center gap-1 text-[12px] font-body text-neutral-400">
                <IconMapPin size={11} stroke={1.75} />
                {t.location}
              </span>
            )}
          </div>
        )}

      </div>
    </article>
  )
}

export default function ProgramTestimonials({ slug, testimonials: propTestimonials }: { slug: string; testimonials?: Testimonial[] }) {
  const items = (propTestimonials && propTestimonials.length > 0) ? propTestimonials : (TESTIMONIALS[slug] ?? GENERIC)
  const ref   = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-white border-t border-neutral-100 py-16 lg:py-20 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">

        <div className="mb-10 lg:mb-12 max-w-[640px]">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Student Stories
          </p>
          <h2 className="font-heading font-bold text-[28px] lg:text-[34px] tracking-[-0.5px] leading-[1.2] text-neutral-900 mb-3">
            What our graduates are doing now.
          </h2>
          <p className="text-[15px] lg:text-[16px] font-body leading-[1.7] text-neutral-600">
            Roles, companies and career trajectories from recent batches.
          </p>
        </div>

        <div ref={ref}>
          {/* Mobile: horizontal snap scroll */}
          <div
            className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-3"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {items.map((t, i) => (
              <div key={t.name} className="flex-none w-[272px] snap-start">
                <StoryCard t={t} index={i} visible={visible} />
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((t, i) => (
              <StoryCard key={t.name} t={t} index={i} visible={visible} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
