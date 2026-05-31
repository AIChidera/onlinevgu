import Image from 'next/image'

const LOGOS = [
  { name: 'NAAC A+',   src: '/assets/trust/naac.svg',     label: 'Accredited'      },
  { name: 'UGC · DEB', src: '/assets/trust/ugc.svg',      label: 'Entitled'        },
  { name: 'AICTE',     src: '/assets/trust/aicte.svg',    label: 'Approved'        },
  { name: 'QS Asia',   src: '/assets/trust/qs.svg',       label: 'Ranked 2024'     },
  { name: 'Coursera',  src: '/assets/trust/coursera.svg', label: 'Official partner'},
]

export default function TrustBar() {
  return (
    <div className="bg-white border-b border-neutral-200">
      <div className="mx-auto max-w-[1280px] px-5 md:px-8 lg:px-12">
        {/* 2-col grid on mobile, horizontal divided row on desktop */}
        <div className="grid grid-cols-2 gap-3 py-4 lg:flex lg:items-center lg:justify-center lg:divide-x lg:divide-neutral-200 lg:py-0 lg:gap-0">
          {LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              className={[
                'group flex items-center gap-3 rounded-xl border border-neutral-100 p-4 transition-colors duration-150 hover:bg-neutral-50',
                'lg:rounded-none lg:border-0 lg:flex-none lg:px-8 lg:py-4',
                i === LOGOS.length - 1 && LOGOS.length % 2 !== 0 ? 'col-span-2 justify-center' : '',
              ].join(' ')}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={36}
                height={36}
                unoptimized
                className="flex-none transition-transform duration-200 group-hover:scale-110 lg:w-10 lg:h-10"
              />
              <div>
                <p className="font-heading font-bold text-[13px] lg:text-[14px] text-neutral-900 leading-tight lg:whitespace-nowrap">
                  {logo.name}
                </p>
                <p className="font-body text-[11px] text-neutral-500 lg:whitespace-nowrap">
                  {logo.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
