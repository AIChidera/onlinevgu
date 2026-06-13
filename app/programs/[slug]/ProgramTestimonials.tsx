'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'

interface Testimonial {
  name:      string
  batch:     string
  initials:  string
  photoGrad: string
  quote:     string
  photo?:    string
}

// Brand-only 3-gradient cycle. 5 aliases mapped to red / yellow→red / deep red.
const R = 'linear-gradient(135deg,#C04036,#821a12)'  // red → dark red
const B = 'linear-gradient(135deg,#FFA412,#C04036)'  // yellow → red
const V = 'linear-gradient(135deg,#821a12,#3b0d09)'  // deep red flow
const A = 'linear-gradient(135deg,#C04036,#821a12)'
const G = 'linear-gradient(135deg,#FFA412,#C04036)'

const U = 'https://images.unsplash.com/'
const Q = '?w=200&q=80&auto=format&fit=crop&crop=faces'

const TESTIMONIALS: Record<string, Testimonial[]> = {
  mba: [
    { name: 'Rohan Mehta',   batch: 'MBA · Finance · 2024',    initials: 'RM', photoGrad: R, photo: `${U}photo-1507003211169-0a1dd7228f2d${Q}`, quote: "I was managing a team of 12 while studying. The weekend live sessions never clashed with work. Got promoted to AVP within 6 months of completing the degree." },
    { name: 'Shriya Kapoor', batch: 'MBA · Marketing · 2023',  initials: 'SK', photoGrad: B, photo: `${U}photo-1580489944761-15a19d654956${Q}`, quote: "I compared five online MBAs. The UGC recognition and the Coursera access tipped it for me. The faculty had actually worked at companies, not just published papers." },
    { name: 'Aditya Bose',   batch: 'MBA · Analytics · 2024',  initials: 'AB', photoGrad: V, photo: `${U}photo-1560250097-0b93528c311a${Q}`, quote: "The case studies were from real Indian businesses. My manager noticed the change in how I structured problems - that's what an MBA should do." },
  ],
  'mba-healthcare': [
    { name: 'Dr. Priya Iyer', batch: 'MBA Healthcare · 2024',  initials: 'PI', photoGrad: G, photo: `${U}photo-1438761681033-6461ffad8d80${Q}`, quote: "After 8 years as a physician, I needed the business side. The hospital tie-up case studies were things I was already dealing with - just now I had the framework." },
    { name: 'Sanjiv Pillai',  batch: 'MBA Healthcare · 2023',  initials: 'SP', photoGrad: B, photo: `${U}photo-1519085360753-af0119f7cbe7${Q}`, quote: "Went from pharma sales to product management at a healthcare startup. The operations and health insurance modules were directly applicable from day one." },
    { name: 'Anita Rao',      batch: 'MBA Healthcare · 2024',  initials: 'AR', photoGrad: R, photo: `${U}photo-1494790108377-be9c29b29330${Q}`, quote: "The CMO-led sessions were a highlight. No other online programme gets you direct access to healthcare CXOs for live case discussions." },
  ],
  mca: [
    { name: 'Karan Desai',   batch: 'MCA · Cloud · 2024',      initials: 'KD', photoGrad: R, photo: `${U}photo-1500648767791-00dcc994a43e${Q}`, quote: "Came in with a BCA and left with an AWS certification and a job at an MNC. The cloud track is genuinely industry-level, not just theory slides." },
    { name: 'Pooja Nair',    batch: 'MCA · Data Science · 2023',initials: 'PN', photoGrad: B, photo: `${U}photo-1487412720507-e7ab37603c6f${Q}`, quote: "The hackathons were the best part - competing against students from other states kept me sharp. Got hired at the semester 4 hackathon expo itself." },
    { name: 'Arjun Sharma',  batch: 'MCA · AI/ML · 2024',      initials: 'AS', photoGrad: V, photo: `${U}photo-1506794778202-cad84cf45f1d${Q}`, quote: "The faculty member for AI/ML actually worked at Microsoft before joining VGU. That kind of perspective is hard to find in any classroom, online or off." },
  ],
  bca: [
    { name: 'Neha Verma',    batch: 'BCA · Software Eng · 2024',initials: 'NV', photoGrad: R, photo: `${U}photo-1502685104226-ee32379fefbe${Q}`, quote: "Graduated at 21 with a job at Infosys. The capstone project was the deciding factor in my interview - I had something real to show, not just a transcript." },
    { name: 'Rahul Singh',   batch: 'BCA · Cloud · 2024',      initials: 'RS', photoGrad: B, photo: `${U}photo-1463453091185-61582044d556${Q}`, quote: "I started learning to code with zero experience. By year 2, I was building React apps and contributing to open-source. The pace is fast but supportive." },
    { name: 'Simran Kaur',   batch: 'BCA · Cybersecurity · 2023',initials: 'SK', photoGrad: G, photo: `${U}photo-1534528741775-53994a69daeb${Q}`, quote: "The cybersecurity track is thorough. I passed my CEH exam while still in my final year. Most of my classmates had jobs lined up before graduation." },
  ],
  bba: [
    { name: 'Dev Malhotra',  batch: 'BBA · Marketing · 2024',  initials: 'DM', photoGrad: R, photo: `${U}photo-1472099645785-5658abf4ff4e${Q}`, quote: "The startup simulation in year 2 was the most practical thing I've done in any classroom. I launched a real side business because of what I learned there." },
    { name: 'Kavya Reddy',   batch: 'BBA · Finance · 2024',    initials: 'KR', photoGrad: B, photo: `${U}photo-1529626455594-4ff0802cfb7e${Q}`, quote: "I was 19 and not sure what I wanted. BBA gave me the broad base to figure it out. I'm now in a management trainee programme at a bank." },
    { name: 'Tejas Joshi',   batch: 'BBA · HR · 2023',         initials: 'TJ', photoGrad: A, photo: `${U}photo-1492562080023-ab3db95bfbce${Q}`, quote: "The industry mentors were a genuine differentiator. My mentor had worked at two Fortune 500 companies and shared things that no textbook covers." },
  ],
  bcom: [
    { name: 'Divya Sharma',  batch: 'B.Com · Accounting · 2024',initials: 'DS', photoGrad: R, photo: `${U}photo-1573496359142-b8d87734a5a2${Q}`, quote: "I'm now in my CA articleship. The B.Com at VGU gave me a solid base in IFRS and direct tax that my article supervisor noticed immediately." },
    { name: 'Mohit Kumar',   batch: 'B.Com · Finance · 2023',  initials: 'MK', photoGrad: B, photo: `${U}photo-1506794778202-cad84cf45f1d${Q}`, quote: "The Tally and ERP practical sessions were more rigorous than what most regular colleges offer. I walked into my job knowing the actual software." },
    { name: 'Priya Menon',   batch: 'B.Com · Taxation · 2024', initials: 'PM', photoGrad: V, photo: `${U}photo-1580489944761-15a19d654956${Q}`, quote: "GST was a live topic while we studied it. The faculty updated the modules in real time as regulations changed - that's not something you get from textbooks." },
  ],
  bsc: [
    { name: 'Ananya Gupta',  batch: 'B.Sc · 2024',             initials: 'AG', photoGrad: G, photo: `${U}photo-1438761681033-6461ffad8d80${Q}`, quote: "The science curriculum was updated and practical. I studied while working as a lab assistant - the flexible schedule made it possible." },
    { name: 'Vikram Nair',   batch: 'B.Sc · 2023',             initials: 'VN', photoGrad: B, photo: `${U}photo-1507003211169-0a1dd7228f2d${Q}`, quote: "I completed my B.Sc degree while preparing for competitive exams. The structured curriculum and live sessions kept me on track." },
    { name: 'Ritu Sharma',   batch: 'B.Sc · 2024',             initials: 'RS', photoGrad: R, photo: `${U}photo-1487412720507-e7ab37603c6f${Q}`, quote: "The faculty were available beyond class hours. I'd message at 10pm with a doubt and get a response before midnight. That responsiveness is rare." },
  ],
  ba: [
    { name: 'Farhan Ahmed',  batch: 'BA · English · 2024',     initials: 'FA', photoGrad: V, photo: `${U}photo-1519085360753-af0119f7cbe7${Q}`, quote: "I was preparing for the civil services while doing my BA. The political science and economics specialisations aligned perfectly with the UPSC syllabus." },
    { name: 'Nisha Patel',   batch: 'BA · Sociology · 2023',   initials: 'NP', photoGrad: B, photo: `${U}photo-1502685104226-ee32379fefbe${Q}`, quote: "The research methodology module changed how I approach problems. I got selected for an MPhil programme at a central university based on my dissertation." },
    { name: 'Deepak Yadav',  batch: 'BA · Economics · 2024',   initials: 'DY', photoGrad: A, photo: `${U}photo-1560250097-0b93528c311a${Q}`, quote: "VGU's BA is taken seriously. I cleared the UGC-NET in my first attempt - the exam prep support and guidance from faculty made the difference." },
  ],
  mcom: [
    { name: 'Seema Joshi',   batch: 'M.Com · Finance · 2024',  initials: 'SJ', photoGrad: G, photo: `${U}photo-1534528741775-53994a69daeb${Q}`, quote: "The advanced taxation modules were current and practical. My CA firm noticed the depth of my knowledge in GST and IFRS from day one." },
    { name: 'Amit Soni',     batch: 'M.Com · Accounting · 2023',initials: 'AS', photoGrad: B, photo: `${U}photo-1463453091185-61582044d556${Q}`, quote: "I cleared the CMA Foundation while doing my M.Com. The finance and cost accounting modules covered the syllabus in a way regular coaching doesn't." },
    { name: 'Pooja Bansal',  batch: 'M.Com · 2024',            initials: 'PB', photoGrad: R, photo: `${U}photo-1494790108377-be9c29b29330${Q}`, quote: "The investment analysis module was taught by a SEBI-registered advisor. You get real-world perspectives that textbooks simply don't have." },
  ],
  ma: [
    { name: 'Harshit Tiwari',batch: 'MA · Political Sc. · 2024',initials: 'HT', photoGrad: V, photo: `${U}photo-1500648767791-00dcc994a43e${Q}`, quote: "I work in a state government department. The public policy and governance modules gave me frameworks I apply every single week at work." },
    { name: 'Sunita Rao',    batch: 'MA · English · 2023',     initials: 'SR', photoGrad: B, photo: `${U}photo-1573496359142-b8d87734a5a2${Q}`, quote: "I cleared the UGC-NET in English literature on my first attempt. The dissertation supervision was thorough - my guide had published in indexed journals." },
    { name: 'Rohit Mishra',  batch: 'MA · Economics · 2024',   initials: 'RM', photoGrad: A, photo: `${U}photo-1472099645785-5658abf4ff4e${Q}`, quote: "The quantitative economics and research methods track prepared me better than a full-time programme would have. Got into a policy research role directly." },
  ],
  mlib: [
    { name: 'Vandana Singh', batch: 'M.Lib · 2024',            initials: 'VS', photoGrad: G, photo: `${U}photo-1529626455594-4ff0802cfb7e${Q}`, quote: "I got promoted to Senior Librarian within 4 months of completing M.Lib. The digital archives and information systems modules were exactly what my institution needed." },
    { name: 'Suresh Kumar',  batch: 'M.Lib · 2023',            initials: 'SK', photoGrad: B, photo: `${U}photo-1492562080023-ab3db95bfbce${Q}`, quote: "We went deep into information retrieval and MARC cataloguing. I could apply the learnings from week one at my university library." },
    { name: 'Asha Pillai',   batch: 'M.Lib · 2024',            initials: 'AP', photoGrad: R, photo: `${U}photo-1438761681033-6461ffad8d80${Q}`, quote: "VGU's M.Lib is NAAC-accredited and UGC-recognised. That credential opened doors to central university library positions that weren't accessible before." },
  ],
  blib: [
    { name: 'Raju Verma',    batch: 'B.Lib · 2024',            initials: 'RV', photoGrad: V, photo: `${U}photo-1507003211169-0a1dd7228f2d${Q}`, quote: "The one-year programme was intensive but structured. I got placed as an assistant librarian at a Navodaya Vidyalaya before I even received my degree." },
    { name: 'Kamla Devi',    batch: 'B.Lib · 2023',            initials: 'KD', photoGrad: B, photo: `${U}photo-1580489944761-15a19d654956${Q}`, quote: "I completed B.Lib alongside my regular teaching job. The flexible online format made it possible. The OPAC and digital library modules were directly applicable." },
    { name: 'Manish Sharma', batch: 'B.Lib · 2024',            initials: 'MS', photoGrad: G, photo: `${U}photo-1519085360753-af0119f7cbe7${Q}`, quote: "The faculty explained real-world library management scenarios, not just theory. I passed the State Library Exam on my first attempt after completing B.Lib." },
  ],
}

const GENERIC: Testimonial[] = [
  { name: 'Siddharth Roy',  batch: 'Batch of 2024', initials: 'SR', photoGrad: R, photo: `${U}photo-1560250097-0b93528c311a${Q}`, quote: "The faculty were accessible, the content was current, and I could study around my full-time job. The degree got me where I needed to go." },
  { name: 'Meenakshi Das',  batch: 'Batch of 2023', initials: 'MD', photoGrad: B, photo: `${U}photo-1494790108377-be9c29b29330${Q}`, quote: "I had doubts about an online degree being taken seriously by employers. Those doubts were gone by the time I walked into my first job interview with VGU on my resume." },
  { name: 'Akash Tiwari',   batch: 'Batch of 2024', initials: 'AT', photoGrad: G, photo: `${U}photo-1506794778202-cad84cf45f1d${Q}`, quote: "The quality of instruction is on par with any campus programme I've seen. If you're disciplined, this works." },
]

function CompactCard({ t, index, visible }: { t: Testimonial; index: number; visible: boolean }) {
  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.45s ease ${index * 100}ms, transform 0.45s ease ${index * 100}ms`,
        height: '100%',
      }}
    >
      <div className="group/card flex flex-col rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-transparent hover:shadow-[0_0_0_2px_#FFA412,0_14px_44px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 h-full">

        {/* Avatar strip */}
        <div
          className="relative h-[80px] overflow-hidden flex-none flex items-center px-5 gap-4"
          style={{ background: t.photoGrad }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '18px 18px',
            }}
          />
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/35 flex-none transition-transform duration-300 group-hover/card:scale-110">
            {t.photo ? (
              <Image src={t.photo} alt={t.name} fill className="object-cover object-top" sizes="48px" />
            ) : (
              <div className="w-full h-full bg-white/20 flex items-center justify-center">
                <span className="font-heading font-black text-[16px] text-white">{t.initials}</span>
              </div>
            )}
          </div>
          <div className="relative">
            <p className="font-heading font-bold text-[14px] text-white leading-tight">{t.name}</p>
            <p className="text-[11px] font-body text-white/65 mt-0.5">{t.batch}</p>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-2 -right-1 font-heading font-black text-white/10 leading-none select-none"
            style={{ fontSize: '72px' }}
          >
            &ldquo;
          </div>
        </div>

        {/* Quote body */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex gap-0.5 mb-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="text-vgu-yellow text-[13px] leading-none">★</span>
            ))}
          </div>
          <p className="text-[13px] font-body leading-[1.8] text-neutral-600 flex-1 italic">
            &ldquo;{t.quote}&rdquo;
          </p>
        </div>

      </div>
    </div>
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
    <section className="bg-white border-t border-neutral-200 py-16 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[1280px]">

        <div className="text-center mb-12">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">Student Stories</p>
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 lg:text-[32px]">
            Heard from the batch
          </h2>
        </div>

        <div ref={ref}>
          {/* Mobile: horizontal snap scroll */}
          <div
            className="flex sm:hidden gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 pb-3"
            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {items.map((t, i) => (
              <div key={t.name} className="flex-none w-[280px] snap-start">
                <CompactCard t={t} index={i} visible={visible} />
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6">
            {items.map((t, i) => (
              <CompactCard key={t.name} t={t} index={i} visible={visible} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
