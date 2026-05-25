import SectionWrapper from '@/components/layout/SectionWrapper'

const CERTIFICATES = [
  { name: 'Google Data Analytics', provider: 'Google', color: '#4285F4' },
  { name: 'IBM AI Foundations', provider: 'IBM', color: '#0530AD' },
  { name: 'Meta Social Media Marketing', provider: 'Meta', color: '#0866FF' },
  { name: 'AWS Cloud Practitioner Essentials', provider: 'AWS', color: '#FF9900' },
  { name: 'Microsoft Azure Fundamentals', provider: 'Microsoft', color: '#00A4EF' },
  { name: 'Project Management (Google)', provider: 'Google', color: '#34A853' },
]

export default function CourseraSection() {
  return (
    <SectionWrapper bg="beige" id="coursera">
      <div className="grid grid-cols-2 gap-12 items-center lg:grid-cols-1 lg:gap-10">
        <div>
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            Powered by Coursera
          </p>
          <h2 className="font-heading text-[36px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[28px]">
            Earn industry certificates<br />
            alongside your degree
          </h2>
          <p className="mt-4 text-[17px] text-neutral-600 leading-relaxed max-w-[480px]">
            Every VGU online program comes bundled with a Coursera licence. Complete micro-credentials
            from Google, IBM, Meta, and AWS — at no extra cost — and add them to your CV on day one.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-2">
            {CERTIFICATES.map((c) => (
              <div
                key={c.name}
                className="rounded-xl bg-white border border-neutral-200 p-4 flex flex-col gap-2
                           transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div
                  className="h-1.5 w-8 rounded-full"
                  style={{ background: c.color }}
                />
                <div className="text-[11px] font-heading font-bold uppercase tracking-widest text-neutral-400">
                  {c.provider}
                </div>
                <div className="text-[13px] font-medium text-neutral-800 leading-tight">{c.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          <div className="relative w-full max-w-[380px] rounded-2xl bg-white border border-neutral-200 p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-[#0056D2] flex items-center justify-center">
                <span className="font-bold text-white text-sm">C</span>
              </div>
              <div>
                <div className="font-heading font-bold text-neutral-900">Coursera</div>
                <div className="text-xs text-neutral-500">Bundled with your program</div>
              </div>
            </div>

            <div className="space-y-3">
              {['Unlimited course access', 'Verified certificates', 'Graded assignments', 'Shareable on LinkedIn'].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-[14px] text-neutral-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-green-500 flex-none">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg bg-vgu-beige px-4 py-3 text-[13px] text-neutral-700">
              <span className="font-semibold">₹0 extra</span> — included in your program fee
            </div>
          </div>

          <p className="text-[13px] text-neutral-500 text-center max-w-[300px]">
            Available from semester 1. Certificates are co-branded VGU × Coursera.
          </p>
        </div>
      </div>
    </SectionWrapper>
  )
}
