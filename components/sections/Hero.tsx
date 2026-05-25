'use client'

import Image from 'next/image'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

interface HeroProps {
  onApply?: () => void
}

export default function Hero({ onApply }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF1E6] via-[#FFF8F0] to-white pt-[72px]">
      {/* Background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[8%] -top-[20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,164,18,0.4)_0%,transparent_70%)] blur-[60px] opacity-60" />
        <div className="absolute -bottom-[30%] -left-[10%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(244,215,193,0.85)_0%,transparent_70%)] blur-[60px] opacity-60" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-content grid-cols-2 gap-14 px-12 py-[72px] pb-[88px] items-center lg:grid-cols-1 md:px-5 md:py-12">
        {/* Copy */}
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="red">UGC-Entitled</Badge>
            <Badge variant="yellow">NAAC A+</Badge>
            <Badge variant="neutral">AICTE-approved</Badge>
          </div>

          <h1 className="font-heading text-[64px] font-extrabold leading-[1.04] tracking-[-1.5px] text-neutral-900 lg:text-[56px] md:text-[40px] md:tracking-[-0.5px]">
            Learn online.<br />
            Earn a degree that<br />
            <em className="not-italic text-vgu-red [background:linear-gradient(120deg,transparent_6%,rgba(238,207,99,0.55)_6%,rgba(238,207,99,0.55)_94%,transparent_94%)] px-2">
              opens doors.
            </em>
          </h1>

          <p className="body-l mt-6 mb-8 max-w-[540px] text-[18px] leading-[1.7] text-neutral-600">
            Join 50,000+ learners across 40+ countries. World-class faculty, flexible schedules,
            and UGC-entitled degrees — all 100% online, from Vivekananda Global University.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" onClick={onApply}>
              Apply now →
            </Button>
            <Button variant="secondary" size="lg">
              Download brochure
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 border-t border-vgu-red/12 pt-6">
            {[
              { icon: '⭐', text: '<b>4.8 / 5</b> Student rating' },
              { icon: '👥', text: '<b>50,000+</b> learners' },
              { icon: '🏅', text: 'Est. <b>1998</b> · NAAC A+' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-neutral-600">
                <span>{icon}</span>
                <span dangerouslySetInnerHTML={{ __html: text }} />
              </div>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className="relative min-h-[540px] lg:max-w-[540px] lg:mx-auto lg:w-full">
          {/* Organic red shape behind photo */}
          <div
            aria-hidden="true"
            className="absolute top-[12%] left-[8%] right-[-4%] bottom-[-4%] z-0 opacity-92"
            style={{
              background: 'linear-gradient(135deg,#C04036 0%,#821a12 100%)',
              borderRadius: '56% 44% 60% 40% / 50% 56% 44% 50%',
            }}
          />

          <div className="relative z-10 ml-6 aspect-[4/5]">
            <div className="absolute inset-0 overflow-hidden rounded-xl shadow-[0_32px_64px_rgba(130,26,18,0.30)]">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop"
                alt="Online VGU students"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(130,26,18,0.30)]" />
            </div>

            {/* Floaters */}
            <div className="absolute -left-6 top-8 z-20 animate-float-y rounded-2xl bg-white px-4 py-3.5 shadow-[0_16px_32px_rgba(17,24,39,0.16)]">
              <div className="font-heading text-[22px] font-black leading-none text-vgu-red">50,000+</div>
              <div className="mt-1 text-xs font-medium text-neutral-600">Learners enrolled</div>
            </div>

            <div className="absolute -right-6 bottom-24 z-20 animate-float-y [animation-delay:1.2s] rounded-2xl bg-white px-4 py-3.5 shadow-[0_16px_32px_rgba(17,24,39,0.16)]">
              <div className="flex gap-0.5 text-vgu-yellow">{'★★★★★'}</div>
              <div className="mt-1 font-heading text-[18px] font-black leading-none text-vgu-red">4.8 / 5</div>
              <div className="mt-1 text-[11px] text-neutral-600">12,400+ reviews</div>
            </div>

            <div className="absolute -left-5 bottom-4 z-20 flex animate-float-y [animation-delay:0.6s] items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_16px_32px_rgba(17,24,39,0.16)]">
              <span className="relative flex h-2.5 w-2.5 flex-none">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              <div>
                <div className="font-heading text-[13px] font-bold text-neutral-900">Live now</div>
                <div className="text-[11px] text-neutral-600">Counsellor available · WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
