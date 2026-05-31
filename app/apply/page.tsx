import LeadForm from '@/components/forms/LeadForm'
import BrochureForm from '@/components/forms/BrochureForm'
import SectionWrapper from '@/components/layout/SectionWrapper'
import Breadcrumb from '@/components/ui/Breadcrumb'

export const metadata = {
  title: 'Apply Online - VGU',
  description:
    'Apply for an online degree at Vivekananda Global University. No entrance exam. Enrol in under 30 minutes.',
}

export default function ApplyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: 'Apply' }]} />
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white">
        <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-12">
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            Admissions open
          </p>
          <h1 className="font-heading text-[36px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[52px]">
            Apply now
          </h1>
          <p className="mt-3 text-[16px] text-neutral-600 max-w-[480px] leading-relaxed lg:text-[18px]">
            No entrance exam. No campus visit. Enrol 100% online in under 30 minutes.
          </p>
        </div>
      </div>

      <SectionWrapper bg="white">
        <div className="grid grid-cols-2 gap-12 lg:grid-cols-1">
          {/* Enquiry form */}
          <div>
            <h2 className="font-heading text-[26px] font-extrabold text-neutral-900 mb-2">
              Talk to a counsellor
            </h2>
            <p className="text-[15px] text-neutral-600 mb-6">
              Fill in your details and we&apos;ll call you within 2 hours - free, no obligation.
            </p>
            <div className="rounded-2xl border border-neutral-200 p-8 bg-white shadow-sm md:p-5">
              <LeadForm source="apply-page" />
            </div>
          </div>

          {/* Brochure form */}
          <div id="brochure">
            <h2 className="font-heading text-[26px] font-extrabold text-neutral-900 mb-2">
              Download brochure
            </h2>
            <p className="text-[15px] text-neutral-600 mb-6">
              Get the full program guide with fee structure, curriculum, and placement stats.
            </p>
            <div className="rounded-2xl border border-neutral-200 p-8 bg-white shadow-sm md:p-5">
              <BrochureForm />
            </div>

            {/* Steps */}
            <div id="scholarships" className="mt-10">
              <h3 className="font-heading text-[18px] font-bold text-neutral-900 mb-4">Scholarships available</h3>
              <div className="flex flex-col gap-3">
                {[
                  { name: 'Merit scholarship', value: 'Up to 50% fee waiver', criteria: '70%+ in qualifying exam' },
                  { name: 'Working professional', value: '20% fee waiver', criteria: '2+ years work experience' },
                  { name: 'VGU alumni', value: '15% fee waiver', criteria: 'Existing VGU graduates' },
                  { name: 'Defence & govt servants', value: '25% fee waiver', criteria: 'Valid ID required' },
                ].map((s) => (
                  <div key={s.name} className="flex items-start justify-between gap-4 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
                    <div>
                      <div className="font-heading text-[14px] font-bold text-neutral-900">{s.name}</div>
                      <div className="text-[12px] text-neutral-500">{s.criteria}</div>
                    </div>
                    <div className="rounded-full bg-green-100 px-3 py-1 text-[13px] font-heading font-bold text-green-700 whitespace-nowrap">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
