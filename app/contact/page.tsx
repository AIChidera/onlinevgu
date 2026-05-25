import SectionWrapper from '@/components/layout/SectionWrapper'

export const metadata = {
  title: 'Contact Us — VGU Online',
  description: 'Get in touch with VGU admissions team. Call, email, or WhatsApp us.',
}

export default function ContactPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#FBF1E6] to-white pt-[72px]">
        <div className="mx-auto max-w-content px-12 py-16 md:px-5 md:py-12">
          <h1 className="font-heading text-[52px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[36px]">
            Contact us
          </h1>
          <p className="mt-3 text-[18px] text-neutral-600 max-w-[480px] leading-relaxed">
            We&apos;re here Mon–Sat, 9am–7pm IST. Talk to a real counsellor — no chatbots.
          </p>
        </div>
      </div>

      <SectionWrapper bg="white">
        <div className="grid grid-cols-3 gap-6 lg:grid-cols-1">
          {[
            {
              icon: '📞',
              title: 'Phone',
              lines: ['1800 123 456', 'Toll-free · Mon–Sat, 9am–7pm IST'],
              href: 'tel:+911800123456',
              cta: 'Call now',
            },
            {
              icon: '💬',
              title: 'WhatsApp',
              lines: ['+91 98765 43210', 'Usually replies within 15 minutes'],
              href: 'https://wa.me/919876543210',
              cta: 'Chat on WhatsApp',
            },
            {
              icon: '✉️',
              title: 'Email',
              lines: ['admissions@onlinevgu.in', 'Replies within 24 hours'],
              href: 'mailto:admissions@onlinevgu.in',
              cta: 'Send email',
            },
          ].map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-center text-center rounded-2xl border border-neutral-200 p-8 gap-3"
            >
              <div className="text-[44px] leading-none mb-1">{c.icon}</div>
              <h2 className="font-heading text-[20px] font-bold text-neutral-900">{c.title}</h2>
              {c.lines.map((l, i) => (
                <p key={i} className={i === 0 ? 'font-heading font-semibold text-neutral-800' : 'text-[14px] text-neutral-500'}>
                  {l}
                </p>
              ))}
              <a
                href={c.href}
                className="mt-2 rounded-lg bg-vgu-red px-5 py-2.5 text-[14px] font-heading font-semibold text-white hover:bg-vgu-red-dark transition-colors"
              >
                {c.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-neutral-50 border border-neutral-200 p-8">
          <h3 className="font-heading text-[20px] font-bold text-neutral-900 mb-4">Address</h3>
          <p className="text-[16px] text-neutral-600 leading-relaxed">
            Vivekananda Global University<br />
            VGU Campus, Jagatpura<br />
            Jaipur, Rajasthan — 303 012<br />
            India
          </p>
        </div>
      </SectionWrapper>
    </>
  )
}
