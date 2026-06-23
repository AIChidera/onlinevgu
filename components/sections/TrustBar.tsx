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

        {/* Logo strip - icons only, grayscale until hover */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-10 md:gap-x-14 lg:gap-x-16">
          {LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              title={logo.name}
              className="group flex h-10 w-10 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-[72px] lg:w-[72px] items-center justify-center flex-none transition-transform duration-300 hover:scale-110"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={80}
                height={80}
                unoptimized
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
