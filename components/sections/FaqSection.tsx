'use client'

import { useState } from 'react'
import { IconHeadset, IconPlus } from '@tabler/icons-react'
import SketchFlourish from '@/components/ui/sketch/SketchFlourish'
import type { SanityFaq } from '@/lib/sanity'

const FAQS = [
  {
    q: 'Is an Online VGU degree valid for government jobs, private companies, and higher education?',
    a: "Online VGU offers UGC-entitled online degree programs, making them valid for employment in the private sector, eligible government opportunities (subject to recruitment rules), and higher education in India and abroad. Students can also use these degrees to pursue postgraduate programs, competitive examinations, and professional certifications, provided they meet the respective eligibility criteria.",
  },
  {
    q: 'Why should I choose Online VGU over other online universities in India?',
    a: 'Online VGU combines academic excellence with career-focused learning through industry-oriented curriculum, experienced faculty, AI-powered learning resources, flexible study schedules, career assistance, affordable fees, and a modern Learning Management System (LMS). Students also benefit from recorded lectures, expert mentorship, and an online learning experience designed for working professionals and fresh graduates alike.',
  },
  {
    q: 'Who can apply for Online VGU degree programs?',
    a: "Online VGU welcomes students, working professionals, entrepreneurs, homemakers, and career changers. Eligibility depends on the selected program. Undergraduate programs generally require successful completion of 10+2 from a recognized board, while postgraduate programs require a bachelor's degree from a recognized university. Applicants should always verify the specific eligibility criteria for their chosen course before applying.",
  },
  {
    q: 'Can working professionals study at Online VGU without leaving their jobs?',
    a: 'Absolutely. Online VGU is designed for learners who want to continue their education while managing work or personal commitments. Students can attend live classes, access recorded lectures, complete assignments online, and study from anywhere at their own pace, making it an ideal choice for busy professionals.',
  },
  {
    q: 'How does the Online VGU learning platform work?',
    a: 'After admission is confirmed, students receive login credentials for the Online VGU Learning Management System (LMS). Through the platform, learners can access live and recorded lectures, digital study materials, assignments, quizzes, discussion forums, examinations, and academic support all from a computer, tablet, or smartphone with internet access.',
  },
  {
    q: 'Does Online VGU provide placement and career support?',
    a: "Yes. Online VGU offers career support services that may include career guidance, resume-building assistance, LinkedIn profile optimization, interview preparation, and industry interactions. The university focuses on improving students' employability by combining academic learning with practical and industry-relevant skills.",
  },
  {
    q: 'Are Online VGU examinations conducted online?',
    a: 'Yes. Online VGU provides a flexible examination process, allowing eligible students to appear for assessments through its online examination system as per university guidelines. Students receive detailed instructions, schedules, and technical requirements before examinations to ensure a smooth experience.',
  },
  {
    q: 'Which online courses are available at Online VGU?',
    a: 'Online VGU offers a wide range of undergraduate and postgraduate programs in fields such as Management, Computer Applications, Commerce, Journalism & Mass Communication, Science, Arts, and more. Popular programs include Online MBA, Online MCA, Online BBA, Online BCA, Online M.Com, Online M.A., and Online M.Sc., helping learners build career-ready skills across multiple industries.',
  },
  {
    q: 'How can I apply for admission to Online VGU?',
    a: 'The admission process is completely online. Applicants need to register on the Online VGU admission portal, complete the application form, upload the required documents, pay the registration and academic fees, and submit the application for verification. Once the university verifies the documents, admission is confirmed, and students receive access to the online learning platform.',
  },
  {
    q: 'Is Online VGU among the top online universities in India?',
    a: 'Yes. Online VGU is considered one of the leading online universities in India, offering UGC-entitled online degree programs, flexible learning, experienced faculty, industry-focused curriculum, and career support. With programs like Online MBA, Online BBA, Online BCA, Online MCA, Online M.Com, Online MA, and Online MSc, Online VGU helps students and working professionals earn a recognized degree while learning from anywhere in India.',
  },
]

export default function FaqSection({ faqs: sanityFaqs = [] }: { faqs?: SanityFaq[] }) {
  const activeFaqs = sanityFaqs.length > 0
    ? sanityFaqs.map(f => ({ q: f.question, a: f.answer }))
    : FAQS
  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section
      id="faq"
      className="sketch-hover-group group relative overflow-hidden bg-white py-16 px-5 md:px-8 lg:px-12 lg:py-24"
    >
      <SketchFlourish shape="arc" color="red" opacity={0.04} strokeWidth={20} />
      <div className="relative z-10 mx-auto max-w-[860px]">
        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-10">
          <p className="text-[12px] font-heading font-semibold uppercase tracking-[0.08em] text-vgu-red mb-3">
            Common Questions
          </p>
          <h2 className="font-heading font-bold text-[28px] tracking-[-0.5px] leading-[1.2] text-neutral-900 md:text-[36px] lg:text-[40px]">
            Got questions? Here are the answers.
          </h2>
        </div>

        {/* Accordion */}
        <div data-animate="fade-up" style={{ animationDelay: '150ms' }} className="flex flex-col divide-y divide-neutral-200 rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
          {activeFaqs.map((faq, i) => (
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
                  openIndex === i
                    ? 'bg-vgu-red text-white rotate-45'
                    : 'bg-neutral-100 text-neutral-500',
                ].join(' ')}>
                  <IconPlus size={14} stroke={2.5} />
                </span>
              </button>

              <div
                className={[
                  'overflow-hidden transition-all duration-300 ease-out',
                  openIndex === i ? 'max-h-[500px]' : 'max-h-0',
                ].join(' ')}
              >
                <p className="pl-12 sm:pl-[72px] pr-6 pb-5 text-[16px] font-body leading-[1.75] text-neutral-600">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Below accordion CTA */}
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
