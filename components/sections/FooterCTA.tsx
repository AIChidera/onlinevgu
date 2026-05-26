import Button from '@/components/ui/Button'

interface FooterCTAProps {
  onApply?: () => void
}

export default function FooterCTA({ onApply }: FooterCTAProps) {
  return (
    <section className="relative overflow-hidden bg-vgu-red-dark py-20 md:py-14">
      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[5%] -top-[30%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,164,18,0.18)_0%,transparent_70%)] blur-[80px]" />
        <div className="absolute -bottom-[20%] -left-[5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(192,64,54,0.35)_0%,transparent_70%)] blur-[80px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[680px] px-12 text-center md:px-5">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-yellow mb-4">
          Applications open
        </p>
        <h2 className="font-heading text-[44px] font-extrabold leading-tight tracking-tight text-white md:text-[32px]">
          Ready to begin<br />your journey?
        </h2>
        <p className="mt-5 text-[18px] text-white/75 leading-relaxed max-w-[460px] mx-auto">
          Join 50,000+ learners who chose flexibility without sacrificing quality. Enrol in under 30 minutes.
        </p>

        <div className="mt-8 flex justify-center gap-3 flex-wrap">
          <Button variant="yellow" size="lg" onClick={onApply}>
            Apply now →
          </Button>
          <Button
            variant="ghost"
            size="lg"
            as="a"
            href="tel:+911800123456"
            className="text-white border-white/30 hover:bg-white/10"
          >
            Call 1800 123 456
          </Button>
        </div>

        <p className="mt-6 text-[13px] text-white/45">
          No entrance exam · Flexible EMIs from ₹2,999/month · Enrol online, 24/7
        </p>
      </div>
    </section>
  )
}
