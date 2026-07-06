import Image from 'next/image'
import BrandIcon from '@/components/ui/BrandIcon'

const ITEMS = [
  { logo: '/logos/ugc-entitled.png',      icon: null,       name: 'UGC Entitled',    sub: 'Distance Education Bureau'  },
  { logo: '/logos/naac-grade-a-plus.png', icon: null,       name: 'NAAC A+',         sub: 'Accredited University'      },
  { logo: '/logos/aicte-approved.png',    icon: null,       name: 'AICTE Approved',  sub: 'Technical Programs'         },
  { logo: '/logos/qs-ranking.png',        icon: null,       name: 'QS Asia Ranked',  sub: 'World University Rankings'  },
  { logo: null,                           icon: 'Coursera', name: 'Coursera Partner',sub: '7,000+ courses included'    },
]

export default function AccreditationStrip() {
  return (
    <section
      id="accreditation"
      className="bg-white border-t-[3px] border-t-vgu-gold py-10 px-5 md:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-[1280px]">

        {/* Header */}
        <div data-animate="fade-up" className="text-center mb-8">
          <p className="text-[12px] font-body font-bold uppercase tracking-[0.08em] text-vgu-red mb-2">
            Recognised By
          </p>
          <h2 className="font-heading font-bold text-[22px] md:text-[28px] tracking-[-0.5px] text-neutral-900">
            Every regulator that matters in Indian higher education
          </h2>
        </div>

        {/* Logo grid - 2-col on mobile, horizontal divided row on desktop */}
        <div className="grid grid-cols-2 gap-3 lg:flex lg:items-stretch lg:divide-x lg:divide-neutral-200 lg:gap-0">
          {ITEMS.map((item, i) => (
            <div
              key={item.name}
              data-animate="fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
              className={[
                'group flex items-center gap-3 rounded-xl border border-neutral-100 p-4 transition-colors duration-150 hover:bg-neutral-50',
                'lg:rounded-none lg:border-0 lg:flex-1 lg:min-w-0 lg:gap-3 lg:px-5 lg:py-4',
                i === ITEMS.length - 1 && ITEMS.length % 2 !== 0 ? 'col-span-2 justify-center' : '',
              ].join(' ')}
            >
              {/* Logo container - rectangular 2:1 for real badge PNGs, square for BrandIcon */}
              <div className={[
                'flex-none overflow-hidden rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105',
                item.logo ? 'w-32 h-16' : 'w-16 h-16 rounded-xl',
              ].join(' ')}>
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={128}
                    height={64}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <BrandIcon name={item.icon!} />
                )}
              </div>

              <div className="min-w-0">
                <p className="font-heading font-bold text-[14px] text-neutral-900 truncate">
                  {item.name}
                </p>
                <p className="text-[11px] font-body text-neutral-500 truncate">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
