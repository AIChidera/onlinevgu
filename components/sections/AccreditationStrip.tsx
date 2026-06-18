import BrandIcon from '@/components/ui/BrandIcon'

const ITEMS = [
  { icon: null,       abbr: 'UGC',   abbrSize: '18px', name: 'UGC Entitled',    sub: 'Distance Education Bureau',  bg: 'linear-gradient(135deg,#C04036,#821a12)' },
  { icon: null,       abbr: 'A+',    abbrSize: '20px', name: 'NAAC A+',         sub: 'Accredited University',       bg: 'linear-gradient(135deg,#FFA412,#e08800)' },
  { icon: null,       abbr: 'AICTE', abbrSize: '12px', name: 'AICTE Approved',  sub: 'Technical Programs',          bg: 'linear-gradient(135deg,#1e3a5f,#0f1e33)' },
  { icon: 'QS',       abbr: 'QS',    abbrSize: '18px', name: 'QS Asia Ranked',  sub: 'World University Rankings',   bg: 'linear-gradient(135deg,#111827,#374151)' },
  { icon: 'Coursera', abbr: 'C',     abbrSize: '22px', name: 'Coursera Partner',sub: '7,000+ courses included',     bg: 'linear-gradient(135deg,#0056D2,#003a8c)' },
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
              <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl flex-none overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-110">
                {item.icon ? (
                  <BrandIcon name={item.icon} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center" style={{ background: item.bg }}>
                    <span className="font-heading font-black text-white leading-none text-center" style={{ fontSize: item.abbrSize }}>
                      {item.abbr}
                    </span>
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-[14px] lg:text-[14px] text-neutral-900 truncate">
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
