import Image from 'next/image'


const LOGOS = [
  { name: 'NAAC A+',          src: '/logos/naac-grade-a-plus.png', scale: 1.25  },
  { name: 'UGC · DEB',        src: '/logos/ugc-entitled.png',      scale: 1.25  },
  { name: 'AICTE',            src: '/logos/aicte-approved.png',    scale: 1     },
  { name: 'QS Asia 2024',     src: '/logos/qs-ranking.png',        scale: 2.2   },
  { name: 'Coursera Partner', src: '/assets/trust/coursera.svg',   scale: 0.72  },
]

export default function TrustBar() {
  return (
    <div className="bg-neutral-50 border-b border-neutral-200">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12 py-10 md:py-12 lg:py-16">

        {/* Eyebrow */}
        <p
          data-animate="fade-up"
          className="text-center text-[11px] md:text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-6 md:mb-8"
        >
          Accredited · Recognised · Ranked
        </p>

        {/* Fixed-size cards - uniform regardless of PNG vs SVG aspect ratio */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 lg:gap-6">
          {LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              title={logo.name}
              className="group flex-none flex items-center justify-center w-36 h-24 sm:w-40 sm:h-[104px] lg:w-48 lg:h-[120px] rounded-2xl border border-neutral-200 bg-white p-3 lg:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.13)] overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={160}
                height={80}
                unoptimized
                style={{ transform: `scale(${logo.scale})` }}
                className="w-full h-full object-contain saturate-[1.15] contrast-[1.05] transition-transform duration-300"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
