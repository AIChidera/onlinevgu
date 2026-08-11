'use client'
import { useState } from 'react'
import { IconHeadset, IconPlus } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'

interface FAQ { q: string; a: string }

const FAQ_DATA: Record<string, FAQ[]> = {
  mba: [
    { q: 'Is this MBA recognised by UGC?', a: 'Yes. VGU is a UGC-entitled university and this online MBA has the same legal status as an on-campus MBA degree from VGU. The certificate does not indicate the mode of study.' },
    { q: 'Can I study while working full-time?', a: 'The programme is built for working professionals. Live sessions are held on weekends. All recordings are available within 48 hours if you miss a class.' },
    { q: 'What are the EMI options?', a: 'The total fee of ₹1,70,000 can be paid via no-cost EMI from ₹7,084 per month. Plans are available for 12, 18, and 24 months through partner banks.' },
    { q: 'Do I need to visit the campus?', a: 'No campus visit is required. Exams are AI-proctored at home. You can optionally attend the convocation ceremony in person.' },
    { q: 'When do I choose a specialisation?', a: 'Specialisation selection happens at the start of Year 2. You can explore all core subjects in Year 1 before committing.' },
    { q: 'How does placement support work?', a: 'The placement cell is active from the first semester, not just the final one. We run an annual hiring expo where 500+ partner companies interview our students directly.' },
  ],
  mca: [
    { q: 'Is this MCA recognised by UGC?', a: 'Yes. VGU is UGC-entitled and the online MCA degree carries the same recognition as an on-campus MCA. It is valid for government and private sector jobs.' },
    { q: 'Do I need a computer science background?', a: 'A BCA, B.Sc (IT/CS/Mathematics), or any bachelor\'s with Maths at 10+2 level qualifies. Prior coding experience helps but is not mandatory - we start from fundamentals.' },
    { q: 'Is the AWS certification prep included?', a: 'Yes. The cloud track includes guided prep for AWS Certified Solutions Architect. Exam fees are separate, but all study material is provided through the Coursera licence.' },
    { q: 'Are the hackathons mandatory?', a: 'Hackathons happen every semester and are part of your grade. They are also the fastest route to placement - several students get hired directly at the semester 4 expo.' },
    { q: 'Can I switch specialisations after enrolling?', a: 'Specialisation choice is confirmed at the end of Semester 2. Switching before that point is allowed with counsellor approval.' },
    { q: 'What happens if I miss live sessions?', a: 'Every session is recorded. Recordings stay accessible until the end of the programme. There is no penalty for watching asynchronously, though live attendance has a small bonus weighting.' },
  ],
  bca: [
    { q: 'Do I need coding experience to join?', a: 'No prior coding experience is needed. The programme starts with C programming basics and builds up to full-stack development over three years.' },
    { q: 'Is this degree equivalent to an on-campus BCA?', a: 'Yes. VGU is UGC-entitled and the degree has identical legal standing to an on-campus BCA. Employers and higher education institutions treat it the same.' },
    { q: 'What programming languages will I learn?', a: 'C, Python, Java, JavaScript (React, Node.js), SQL, and cloud basics (AWS). The curriculum tracks what Indian tech companies actually hire for.' },
    { q: 'Can I pursue MCA after this?', a: 'Yes. BCA from VGU is a standard qualification for MCA admission at any university, including VGU\'s own MCA programme.' },
    { q: 'What is the capstone project?', a: 'In Year 3, you build a full working application - web, mobile, or cloud-based. This is what you show in interviews. Many students get hired based on their capstone alone.' },
    { q: 'Are there placement guarantees?', a: 'We don\'t promise placement but we actively facilitate it. Our 93% placement rate reflects genuine effort: resume support, mock interviews, and direct introductions to hiring partners.' },
  ],
  bba: [
    { q: 'Which stream do I need for BBA?', a: 'Any stream - Science, Commerce, or Arts - is accepted. A minimum 45% at 10+2 is the only requirement. No entrance exam.' },
    { q: 'Is a BBA from VGU valid for MBA admission?', a: 'Yes. VGU BBA is UGC-recognised and qualifies you for MBA admissions at any Indian university, including CAT/MAT-based programmes.' },
    { q: 'What is the startup simulation in Year 2?', a: 'Teams of 4-5 students run a simulated business for a full semester - from idea to pitch to financials. You get real mentorship from entrepreneurs and investors during the process.' },
    { q: 'Are industry mentors assigned personally?', a: 'You are matched with a mentor in your area of interest at the start of Year 2. Sessions are one-on-one, minimum once a month.' },
    { q: 'Can I do an internship during the programme?', a: 'Yes. The curriculum includes a formal internship track in Year 2. We also support students who find their own internships and credit that experience.' },
    { q: 'How are weekend classes structured?', a: 'Live sessions are held on Saturday and Sunday, typically 2-3 hours per day. Weekday study is self-paced via recorded content and assignments.' },
  ],
  ma: [
    { q: 'Is MA from VGU valid for UGC-NET?', a: 'Yes. You need a postgraduate degree from a UGC-recognised institution to appear for UGC-NET. VGU MA meets this requirement fully.' },
    { q: 'Can I use this for civil services preparation?', a: 'Yes. Many students choose MA precisely for this reason. The Political Science and Economics specialisations are directly relevant to the GS papers. Faculty also provide optional guidance on optional subjects.' },
    { q: 'What is the dissertation process?', a: 'In Semester 4, you work on an independent dissertation under a faculty supervisor. Topic selection, methodology training, and regular reviews are all part of the process.' },
    { q: 'Are the specialisations available across the full 2 years?', a: 'You choose a specialisation at enrolment. Specialisation core subjects run across all four semesters, with electives in Semesters 3 and 4.' },
    { q: 'Is this suitable if I have a B.Sc background?', a: 'Yes. Any graduate from a UGC-recognised university with 50% marks can apply, regardless of the undergraduate stream.' },
  ],
  ba: [
    { q: 'Is any stream eligible for BA admission?', a: 'Yes. All streams are accepted at 10+2 level. Minimum 45% marks required. No entrance exam.' },
    { q: 'Can I use this degree for UPSC preparation?', a: 'Yes. Many students enrol in the BA specifically for this reason. The Political Science and Economics specialisations are well-suited for GS papers. The flexible schedule gives you time to prepare alongside the degree.' },
    { q: 'Is this BA equivalent to an on-campus degree?', a: 'Yes. VGU is UGC-entitled and the degree has the same legal standing as an on-campus BA. It is valid for government exams, teaching positions, and higher education admission.' },
    { q: 'Can I pursue MA or LLB after this?', a: 'Yes. BA from VGU qualifies you for MA admission at any university and LLB admission at any recognised law school.' },
    { q: 'How is the research project in Year 3 structured?', a: 'You work on a guided research project of 8,000-10,000 words in your specialisation area. A faculty supervisor reviews your work across two semesters.' },
  ],
}

const GENERIC: FAQ[] = [
  { q: 'Is this degree recognised by UGC?', a: 'Yes. VGU is a NAAC A+ accredited, UGC-entitled university. All online degrees carry the same legal status as on-campus degrees from VGU.' },
  { q: 'Can I study while working full-time?', a: 'Yes. The programme is built around working schedules. Live sessions run on weekends and all recordings are available within 48 hours.' },
  { q: 'Is there an entrance exam?', a: 'No entrance exam is required for any programme. Admission is based on qualifying degree marks and document verification.' },
  { q: 'What is the fee payment process?', a: 'You can pay per semester or in full at the time of enrolment. No-cost EMI is available for most programmes through partner banks.' },
  { q: 'What support is available after admission?', a: 'A dedicated student support team handles academic queries, technical issues, and placement preparation throughout the programme.' },
]

export default function ProgramFAQ({ slug, faqs: propFaqs }: { slug: string; faqs?: { q: string; a: string }[] }) {
  const faqs = (propFaqs && propFaqs.length > 0) ? propFaqs : (FAQ_DATA[slug] ?? GENERIC)
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24">
      <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />
      <div className="relative z-10 mx-auto max-w-[860px]">

        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Common Questions
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            Got questions? Here are the answers.
          </h2>
        </div>

        <div
          data-animate="fade-up"
          style={{ animationDelay: '150ms' }}
          className="flex flex-col divide-y divide-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]"
        >
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={[
                'border-l-4 transition-colors duration-200',
                openIndex === i ? 'border-vgu-red bg-vgu-red/[0.02]' : 'border-transparent',
              ].join(' ')}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
                className="flex w-full items-center gap-4 px-6 py-5 text-left hover:bg-neutral-100 transition-colors duration-150"
              >
                <span className={[
                  'flex-none w-8 font-heading font-bold text-[12px] tabular-nums text-right transition-colors duration-150',
                  openIndex === i ? 'text-vgu-red' : 'text-neutral-400',
                ].join(' ')}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={[
                  'flex-1 font-heading font-semibold text-[16px] leading-snug transition-colors duration-150',
                  openIndex === i ? 'text-vgu-red' : 'text-neutral-900',
                ].join(' ')}>
                  {faq.q}
                </span>
                <span className={[
                  'flex-none w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200',
                  openIndex === i ? 'bg-vgu-red text-white rotate-45' : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}>
                  <IconPlus size={14} stroke={2.5} />
                </span>
              </button>
              <div className={[
                'overflow-hidden transition-all duration-300 ease-out',
                openIndex === i ? 'max-h-[500px]' : 'max-h-0',
              ].join(' ')}>
                <p className="pl-12 sm:pl-[72px] pr-6 pb-5 text-[16px] font-body leading-[1.75] text-neutral-600">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-[16px] font-body text-neutral-500 mb-4">Still have questions?</p>
          <a
            href="#counsellor"
            className="inline-flex items-center gap-2 bg-white border-2 border-vgu-red text-vgu-red hover:bg-vgu-red/5 rounded-md px-8 py-3 text-[15px] font-heading font-semibold transition-colors duration-150"
          >
            <IconHeadset size={18} />
            Talk to a Counsellor
          </a>
        </div>

      </div>
    </section>
  )
}
