import Image from 'next/image'


const LOGOS = [
  { name: 'NAAC A+',          src: '/assets/trust/naac.svg'     },
  { name: 'UGC · DEB',        src: '/assets/trust/ugc.svg'      },
  { name: 'AICTE',            src: '/assets/trust/aicte.svg'    },
  { name: 'QS Asia 2024',     src: '/assets/trust/qs.svg'       },
  { name: 'Coursera Partner', src: '/assets/trust/coursera.svg' },
]

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-6 md:py-8 lg:py-10">

        {/* Eyebrow - Bible §09 Tier-1 framing */}
        <p
          data-animate="fade-up"
          className="text-center text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-4 md:mb-5"
        >
          Accredited · Recognised · Ranked
        </p>

        {/* Logo strip - flex-wrap, single line per item */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:gap-x-7 sm:gap-y-4 md:gap-x-10 md:gap-y-5 lg:gap-x-14">
          {LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              className="flex items-center gap-2 md:gap-3"
            >
              <div className="flex h-9 w-9 md:h-12 md:w-12 lg:h-14 lg:w-14 items-center justify-center flex-none">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={64}
                  height={64}
                  unoptimized
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="font-heading font-bold text-[12px] sm:text-[13px] md:text-[14px] text-neutral-900 whitespace-nowrap leading-tight">
                {logo.name}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
