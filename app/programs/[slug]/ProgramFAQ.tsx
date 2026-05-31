'use client'
import { useState } from 'react'
import { IconChevronDown, IconHeadset } from '@tabler/icons-react'

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
  'mba-healthcare': [
    { q: 'Do I need a medical degree to apply?', a: 'No. Any bachelor\'s degree from a UGC-recognised university qualifies. Students with MBBS, BDS, B.Sc Nursing, or allied health backgrounds are preferred but not required.' },
    { q: 'Is this the same as a general MBA?', a: 'The core management subjects are the same. Healthcare adds hospital administration, health policy, pharma operations, and medical finance - subjects directly relevant to the sector.' },
    { q: 'Will this help me move into hospital management?', a: 'Yes. The programme is specifically designed for that transition. Case studies come from real hospital operations and the faculty includes working healthcare executives.' },
    { q: 'Are there industry partnerships for projects?', a: 'Yes. We have tie-ups with hospitals in major cities for live case study access. Students work on real operational problems, not simulated scenarios.' },
    { q: 'What does the CMO-led session involve?', a: 'Senior healthcare leaders - CMOs, COOs, and CEOs from hospital groups - take a full session each semester. These are live discussions on real cases, not pre-recorded lectures.' },
    { q: 'Is the degree valid for government healthcare roles?', a: 'Yes. The UGC-recognised MBA from VGU qualifies you for management-level healthcare roles in both public and private sectors.' },
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
  bcom: [
    { q: 'Is this degree valid for CA articleship?', a: 'Yes. B.Com from VGU is a UGC-recognised degree and meets the educational qualification for ICAI CA articleship registration.' },
    { q: 'Do I need Commerce at 10+2 level?', a: 'No. Science and Arts streams are also accepted. Minimum 45% marks required. The first year covers accounting fundamentals to bring all students to the same level.' },
    { q: 'Is Tally taught practically or just theoretically?', a: 'Practically. You get access to Tally software and ERP practice environments from Semester 2 onwards. The assessment includes hands-on tasks, not just theory papers.' },
    { q: 'What are my options after B.Com?', a: 'CA/CMA articleship, M.Com, MBA, banking exams, or direct roles in accounting, taxation, and finance. The degree opens all of these paths.' },
    { q: 'Is the GST content up to date?', a: 'Our faculty update modules in real time as regulations change. GST provisions are taught against the current law, not a static textbook version.' },
    { q: 'Can I appear for bank PO exams after B.Com?', a: 'Yes. Bank PO, Clerk, and other IBPS exams are open to any graduate. B.Com gives you a relevant background that helps with the financial awareness paper.' },
  ],
  mcom: [
    { q: 'Is M.Com from VGU recognised for lecturer jobs?', a: 'Yes. VGU is NAAC A+ accredited and the M.Com is UGC-entitled, which satisfies the academic qualification for lecturer positions at the college level (along with UGC-NET).' },
    { q: 'Does this programme help with CA/CMA preparation?', a: 'Yes. The advanced accounting, taxation, and corporate law modules align closely with CA Final and CMA syllabus topics. Faculty also provide guidance on exam strategy.' },
    { q: 'Is there a dissertation requirement?', a: 'Yes. Semester 4 includes a research dissertation. You choose a topic in your specialisation area with faculty supervision throughout.' },
    { q: 'What is the difference between M.Com and MBA?', a: 'M.Com goes deeper into accounting, taxation, and financial research. MBA focuses on management and leadership. M.Com is the better choice if you want a finance/accounting career or academia.' },
    { q: 'Can working professionals manage M.Com alongside a job?', a: 'Yes. Live sessions are on weekends. The workload is structured for people with professional commitments - typically 8-10 hours of study per week.' },
    { q: 'What roles do M.Com graduates move into?', a: 'Senior accountant, tax consultant, financial analyst, audit manager, finance controller, and investment analyst roles are common. Many also pursue teaching or research.' },
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
  bsc: [
    { q: 'Is a Science background required at 10+2?', a: 'Yes. You need 10+2 with Science and Mathematics. Minimum 45% marks required.' },
    { q: 'Is this B.Sc valid for MCA or M.Sc admission?', a: 'Yes. B.Sc from VGU is a UGC-recognised degree and is accepted for MCA and M.Sc admission at any standard university.' },
    { q: 'What kind of data roles can I get after B.Sc?', a: 'Data analyst, research associate, and junior data scientist roles are realistic exits, especially through the Computer Science or Mathematics specialisation. The Python and statistics modules are directly employable.' },
    { q: 'Does the programme include practical lab work?', a: 'Lab sessions are conducted via online simulation tools and datasets. Physical experiments are not possible in the online format, but data and computing work is fully hands-on.' },
    { q: 'Is ISRO or ICAR reachable after this degree?', a: 'Some positions in organisations like ISRO and ICAR require a B.Sc as minimum qualification. This degree meets that requirement. Specific roles may have additional requirements like GATE scores.' },
  ],
  mlib: [
    { q: 'What is the eligibility for M.Lib admission?', a: 'A B.Lib.I.Sc or equivalent from a UGC-recognised university with minimum 50% marks is required. No entrance exam.' },
    { q: 'Does M.Lib qualify me for head librarian positions?', a: 'Yes. M.Lib is the standard academic qualification for senior librarian and library director positions in universities, government institutions, and public libraries.' },
    { q: 'Is this programme valid for government librarian recruitment?', a: 'Yes. M.Lib from a UGC-entitled university is accepted in government recruitment criteria for senior library posts.' },
    { q: 'Is there a dissertation?', a: 'Yes. The second semester includes a research dissertation in an area of library and information science. Faculty guidance is provided throughout.' },
    { q: 'Can I take this alongside B.Lib?', a: 'No. M.Lib requires a completed B.Lib as the entry qualification.' },
  ],
  blib: [
    { q: 'What qualifications do I need for B.Lib?', a: 'Any bachelor\'s degree from a recognised university with minimum 45% marks. The degree can be from any stream.' },
    { q: 'Is B.Lib from VGU valid for school librarian jobs?', a: 'Yes. B.Lib is the standard qualification for school and college librarian positions. Most recruitment boards specify this degree as the minimum requirement.' },
    { q: 'Can I upgrade to M.Lib after this?', a: 'Yes. B.Lib is the required qualification for M.Lib admission. You can continue with VGU or any other recognised university.' },
    { q: 'Is this a 1-year or 2-year programme?', a: 'B.Lib is a 1-year programme (2 semesters). It is a focused professional qualification, not a 3-year general degree.' },
    { q: 'Is the degree recognised for government recruitment?', a: 'Yes. B.Lib from a UGC-entitled university is accepted for government library posts at state and central level.' },
  ],
}

const GENERIC: FAQ[] = [
  { q: 'Is this degree recognised by UGC?', a: 'Yes. VGU is a NAAC A+ accredited, UGC-entitled university. All online degrees carry the same legal status as on-campus degrees from VGU.' },
  { q: 'Can I study while working full-time?', a: 'Yes. The programme is built around working schedules. Live sessions run on weekends and all recordings are available within 48 hours.' },
  { q: 'Is there an entrance exam?', a: 'No entrance exam is required for any programme. Admission is based on qualifying degree marks and document verification.' },
  { q: 'What is the fee payment process?', a: 'You can pay per semester or in full at the time of enrolment. No-cost EMI is available for most programmes through partner banks.' },
  { q: 'What support is available after admission?', a: 'A dedicated student support team handles academic queries, technical issues, and placement preparation throughout the programme.' },
]

function AccordionItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <div className={[
      'rounded-2xl border transition-all duration-200',
      open
        ? 'border-vgu-red/20 bg-vgu-red/[0.015] shadow-[0_2px_16px_rgba(192,64,54,0.06)]'
        : 'border-neutral-200 bg-white hover:border-neutral-300',
    ].join(' ')}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading font-bold text-[16px] text-neutral-900 leading-snug">
          {faq.q}
        </span>
        <IconChevronDown
          size={18}
          className={[
            'flex-none mt-0.5 text-neutral-400 transition-transform duration-200',
            open ? 'rotate-180 text-vgu-red' : '',
          ].join(' ')}
        />
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="text-[14px] font-body leading-[1.75] text-neutral-600">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function ProgramFAQ({ slug }: { slug: string }) {
  const faqs = FAQ_DATA[slug] ?? GENERIC

  return (
    <section className="bg-neutral-50 border-t border-neutral-200 py-16 px-5 md:px-8 lg:px-12">
      <div className="mx-auto max-w-[800px]">

        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-3">FAQ</p>
          <h2 className="font-heading font-bold text-[24px] tracking-[-0.5px] text-neutral-900 lg:text-[32px]">
            Common Questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} faq={faq} index={i} />
          ))}
        </div>

        {/* Talk to Counsellor CTA */}
        <div data-animate="fade-up" style={{ animationDelay: '100ms' }} className="mt-12 rounded-2xl bg-white border border-neutral-200 px-8 py-8 text-center">
          <p className="font-heading font-bold text-[20px] text-neutral-900 mb-2">
            Have a different question?
          </p>
          <p className="text-[14px] font-body text-neutral-500 mb-6">
            Our counsellors are online and happy to help you pick the right programme.
          </p>
          <a
            href="#counsellor"
            className="inline-flex items-center gap-2 bg-vgu-red hover:bg-vgu-red-dark text-white hover:text-white font-heading font-semibold text-[15px] rounded-full px-8 py-3.5 transition-all duration-200 hover:shadow-[0_8px_24px_rgba(192,64,54,0.35)]"
          >
            <IconHeadset size={17} />
            Talk to a Counsellor
          </a>
        </div>

      </div>
    </section>
  )
}
