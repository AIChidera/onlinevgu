import SectionWrapper from '@/components/layout/SectionWrapper'
import Button from '@/components/ui/Button'
import BrandIcon from '@/components/ui/BrandIcon'

const PROVIDERS = ['Google', 'IBM', 'Meta', 'AWS', 'Microsoft', 'DeepLearning.AI']

export default function CourseraSection() {
  return (
    <SectionWrapper bg="beige" id="coursera">
      <div className="grid grid-cols-2 gap-16 items-center lg:grid-cols-1 lg:gap-10">
        {/* Left copy */}
        <div>
          <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
            Powered by Coursera
          </p>
          <h2 className="font-heading text-[28px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[38px]">
            Get free access to 7,000+<br />
            courses on Coursera
          </h2>
          <p className="mt-4 text-[15px] text-neutral-600 leading-relaxed max-w-[460px] lg:text-[17px]">
            Every VGU online program comes bundled with a Coursera licence. Access thousands of
            courses from the world&apos;s top companies and universities - at no extra cost.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {PROVIDERS.map((name) => (
              <div
                key={name}
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5"
              >
                <div className="w-5 h-5 rounded flex-none overflow-hidden">
                  <BrandIcon name={name} />
                </div>
                <span className="text-[13px] font-heading font-semibold text-neutral-700">{name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Button as="a" href="/apply" size="lg">
              Explore programs →
            </Button>
          </div>
        </div>

        {/* Right card */}
        <div className="flex justify-center lg:justify-start">
          <div className="relative w-full max-w-[400px] rounded-2xl bg-white border border-neutral-200 p-8 shadow-xl">
            {/* Coursera logo area */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 rounded-xl overflow-hidden flex-none">
                <BrandIcon name="Coursera" />
              </div>
              <div>
                <div className="font-heading text-[18px] font-bold text-neutral-900">Coursera</div>
                <div className="text-[13px] text-neutral-500">Included with your program</div>
              </div>
            </div>

            {/* Big number */}
            <div className="mb-6 rounded-xl bg-neutral-50 p-5 text-center">
              <div className="font-heading text-[56px] font-black leading-none text-neutral-900">
                7,000+
              </div>
              <div className="mt-1 text-[14px] text-neutral-500">courses available</div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              {[
                'Unlimited access for your program duration',
                'Certificates from Google, IBM, Meta & more',
                'Graded projects & peer reviews',
                'Shareable on LinkedIn profile',
              ].map((f) => (
                <div key={f} className="flex items-start gap-2.5 text-[14px] text-neutral-700">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-green-500 flex-none mt-0.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15"/>
                    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-vgu-beige border border-vgu-red/10 px-4 py-3 text-[13px] text-neutral-700 text-center">
              <span className="font-heading font-bold text-vgu-red">₹0 extra</span> - bundled in your program fee
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
