'use client'
import { useRef, useState, useEffect } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

interface BrandMeta { abbr: string; bg: string; abbrSize: string; label: string }

const BRAND_META: Record<string, BrandMeta> = {
  'Deloitte':             { abbr: 'D.',   bg: 'linear-gradient(135deg,#86BC25,#5a8c1a)', abbrSize: '20px', label: 'Audit & Consulting'    },
  'KPMG':                 { abbr: 'K',    bg: 'linear-gradient(135deg,#00338D,#001f5c)', abbrSize: '22px', label: 'Professional Services'  },
  'EY':                   { abbr: 'EY',   bg: 'linear-gradient(135deg,#ccb800,#998a00)', abbrSize: '17px', label: 'Audit & Advisory'       },
  'PwC':                  { abbr: 'PwC',  bg: 'linear-gradient(135deg,#E0301E,#b02518)', abbrSize: '13px', label: 'Audit & Consulting'     },
  'Grant Thornton':       { abbr: 'GT',   bg: 'linear-gradient(135deg,#A72080,#7a1860)', abbrSize: '16px', label: 'Audit & Advisory'       },
  'TCS':                  { abbr: 'TCS',  bg: 'linear-gradient(135deg,#1565C0,#0d47a1)', abbrSize: '13px', label: 'Technology Services'    },
  'Infosys':              { abbr: 'Inf',  bg: 'linear-gradient(135deg,#007CC3,#005a8f)', abbrSize: '14px', label: 'Technology Services'    },
  'Wipro':                { abbr: 'W',    bg: 'linear-gradient(135deg,#344D8B,#243570)', abbrSize: '22px', label: 'IT Services'            },
  'HCL':                  { abbr: 'HCL',  bg: 'linear-gradient(135deg,#EF3E23,#c42d14)', abbrSize: '13px', label: 'Technology Services'    },
  'IBM':                  { abbr: 'IBM',  bg: 'linear-gradient(135deg,#006699,#004d73)', abbrSize: '13px', label: 'Enterprise Tech'        },
  'Tech Mahindra':        { abbr: 'TM',   bg: 'linear-gradient(135deg,#C4003F,#8f002d)', abbrSize: '16px', label: 'IT & Digital'           },
  'Accenture':            { abbr: 'Ac',   bg: 'linear-gradient(135deg,#A100FF,#6b00a8)', abbrSize: '16px', label: 'Strategy & Consulting'  },
  'Amazon':               { abbr: 'A',    bg: 'linear-gradient(135deg,#FF9900,#cc7a00)', abbrSize: '22px', label: 'E-commerce & Cloud'     },
  'Google':               { abbr: 'G',    bg: 'linear-gradient(135deg,#4285F4,#1a5fcc)', abbrSize: '22px', label: 'Technology'             },
  'Microsoft':            { abbr: 'Ms',   bg: 'linear-gradient(135deg,#00A4EF,#0078d4)', abbrSize: '16px', label: 'Technology'             },
  'Cognizant':            { abbr: 'C',    bg: 'linear-gradient(135deg,#1B62B0,#0f3d6e)', abbrSize: '22px', label: 'IT Services'            },
  'Capgemini':            { abbr: 'Cg',   bg: 'linear-gradient(135deg,#003057,#001933)', abbrSize: '16px', label: 'IT Consulting'          },
  'Flipkart':             { abbr: 'F',    bg: 'linear-gradient(135deg,#F6AC30,#d48a10)', abbrSize: '22px', label: 'E-commerce'             },
  'Swiggy':               { abbr: 'Sw',   bg: 'linear-gradient(135deg,#FC8019,#d96610)', abbrSize: '16px', label: 'Food Tech'              },
  'Zomato':               { abbr: 'Z',    bg: 'linear-gradient(135deg,#E23744,#b41f2b)', abbrSize: '22px', label: 'Food Tech'              },
  'Paytm':                { abbr: 'P',    bg: 'linear-gradient(135deg,#002970,#001540)', abbrSize: '22px', label: 'Fintech'                },
  'PhonePe':              { abbr: 'PP',   bg: 'linear-gradient(135deg,#5F259F,#3d1866)', abbrSize: '16px', label: 'Fintech'                },
  'LTIMindtree':          { abbr: 'LTI',  bg: 'linear-gradient(135deg,#1A5E20,#0f3a14)', abbrSize: '13px', label: 'IT Services'            },
  'Mphasis':              { abbr: 'M',    bg: 'linear-gradient(135deg,#0C2461,#071640)', abbrSize: '22px', label: 'IT Services'            },
  'Persistent Systems':   { abbr: 'Ps',   bg: 'linear-gradient(135deg,#003865,#002244)', abbrSize: '16px', label: 'IT Services'            },
  'Oracle':               { abbr: 'Or',   bg: 'linear-gradient(135deg,#C0392B,#8e1f15)', abbrSize: '16px', label: 'Enterprise Tech'        },
  'HDFC Bank':            { abbr: 'H',    bg: 'linear-gradient(135deg,#004B8F,#003366)', abbrSize: '22px', label: 'Banking & Finance'      },
  'ICICI Bank':           { abbr: 'I.',   bg: 'linear-gradient(135deg,#F37420,#c55c18)', abbrSize: '18px', label: 'Banking & Finance'      },
  'SBI':                  { abbr: 'SBI',  bg: 'linear-gradient(135deg,#1F4E9C,#163a73)', abbrSize: '13px', label: 'Public Sector Bank'     },
  'Axis Bank':            { abbr: 'Ax',   bg: 'linear-gradient(135deg,#991F2B,#6e161f)', abbrSize: '16px', label: 'Banking & Finance'      },
  'Bajaj Finserv':        { abbr: 'BFS',  bg: 'linear-gradient(135deg,#0066CC,#004d99)', abbrSize: '13px', label: 'Financial Services'     },
  'Kotak Mahindra Bank':  { abbr: 'K',    bg: 'linear-gradient(135deg,#C40000,#8c0000)', abbrSize: '22px', label: 'Banking'                },
  'HDFC Life':            { abbr: 'HDI',  bg: 'linear-gradient(135deg,#004088,#002755)', abbrSize: '13px', label: 'Insurance'              },
  'ICICI Prudential':     { abbr: 'IP',   bg: 'linear-gradient(135deg,#F37420,#c55c18)', abbrSize: '16px', label: 'Insurance'              },
  'Hindustan Unilever':   { abbr: 'HUL',  bg: 'linear-gradient(135deg,#003399,#002070)', abbrSize: '13px', label: 'FMCG'                   },
  'ITC':                  { abbr: 'ITC',  bg: 'linear-gradient(135deg,#006400,#003d00)', abbrSize: '13px', label: 'FMCG'                   },
  'Apollo Hospitals':     { abbr: 'Ap',   bg: 'linear-gradient(135deg,#003781,#001f4d)', abbrSize: '16px', label: 'Healthcare Leader'      },
  'Fortis Healthcare':    { abbr: 'F',    bg: 'linear-gradient(135deg,#F77F00,#c46400)', abbrSize: '22px', label: 'Healthcare'             },
  'Max Healthcare':       { abbr: 'Mh',   bg: 'linear-gradient(135deg,#E31837,#b0122b)', abbrSize: '16px', label: 'Healthcare'             },
  "Dr. Reddy's":          { abbr: 'DR',   bg: 'linear-gradient(135deg,#1E3A5F,#0e1d30)', abbrSize: '16px', label: 'Pharmaceutical'         },
  'Manipal Hospitals':    { abbr: 'MH',   bg: 'linear-gradient(135deg,#1565C0,#0d47a1)', abbrSize: '16px', label: 'Healthcare'             },
  'Narayana Health':      { abbr: 'NH',   bg: 'linear-gradient(135deg,#1B6CA8,#104878)', abbrSize: '16px', label: 'Healthcare'             },
  'Medanta':              { abbr: 'Me',   bg: 'linear-gradient(135deg,#003580,#001e47)', abbrSize: '16px', label: 'Healthcare'             },
  'Cipla':                { abbr: 'C',    bg: 'linear-gradient(135deg,#005BAC,#004080)', abbrSize: '22px', label: 'Pharmaceutical'         },
  'Sun Pharma':           { abbr: 'SP',   bg: 'linear-gradient(135deg,#1E3A7B,#14295a)', abbrSize: '16px', label: 'Pharmaceutical'         },
  'Biocon':               { abbr: 'Bi',   bg: 'linear-gradient(135deg,#0F4C75,#092e47)', abbrSize: '16px', label: 'Biotech'                },
  'Reliance Industries':  { abbr: 'RI',   bg: 'linear-gradient(135deg,#1B3A6B,#0f2247)', abbrSize: '16px', label: 'Conglomerate'           },
  'Tata Group':           { abbr: 'T',    bg: 'linear-gradient(135deg,#0C2461,#07183a)', abbrSize: '22px', label: 'Conglomerate'           },
  'Mahindra':             { abbr: 'M&M',  bg: 'linear-gradient(135deg,#C41E3A,#8f1529)', abbrSize: '13px', label: 'Auto & Technology'      },
  "Byju's":               { abbr: 'B',    bg: 'linear-gradient(135deg,#1B4EAB,#123578)', abbrSize: '22px', label: 'EdTech'                 },
  'NDTV':                 { abbr: 'N',    bg: 'linear-gradient(135deg,#CC0000,#990000)', abbrSize: '22px', label: 'News Media'             },
  'The Hindu':            { abbr: 'TH',   bg: 'linear-gradient(135deg,#3C1A1A,#1a0d0d)', abbrSize: '16px', label: 'Print Media'            },
  'Times of India':       { abbr: 'TOI',  bg: 'linear-gradient(135deg,#D40000,#9e0000)', abbrSize: '13px', label: 'News Media'             },
  'HT Media':             { abbr: 'HT',   bg: 'linear-gradient(135deg,#2D2D2D,#1a1a1a)', abbrSize: '16px', label: 'News Media'             },
  'NITI Aayog':           { abbr: 'NA',   bg: 'linear-gradient(135deg,#0066CC,#004d99)', abbrSize: '16px', label: 'Policy Think Tank'      },
  'UPSC':                 { abbr: 'U',    bg: 'linear-gradient(135deg,#1A237E,#11174d)', abbrSize: '22px', label: 'Civil Services'         },
  'State PSCs':           { abbr: 'PSC',  bg: 'linear-gradient(135deg,#37474F,#263238)', abbrSize: '13px', label: 'Civil Services'         },
  'NGOs & Think Tanks':   { abbr: 'NGO',  bg: 'linear-gradient(135deg,#2E7D32,#1b5e20)', abbrSize: '13px', label: 'Social Sector'          },
  'ISRO':                 { abbr: 'IS',   bg: 'linear-gradient(135deg,#E64A19,#b33714)', abbrSize: '18px', label: 'Space Research'         },
  'ICAR':                 { abbr: 'IC',   bg: 'linear-gradient(135deg,#1B5E20,#124016)', abbrSize: '18px', label: 'Agricultural Research'  },
  'INFLIBNET':            { abbr: 'IN',   bg: 'linear-gradient(135deg,#1565C0,#0d47a1)', abbrSize: '16px', label: 'Library Network'        },
  'DELNET':               { abbr: 'DL',   bg: 'linear-gradient(135deg,#0D47A1,#09336e)', abbrSize: '16px', label: 'Library Network'        },
  'Environmental Labs':   { abbr: 'EL',   bg: 'linear-gradient(135deg,#2E7D32,#1b5e20)', abbrSize: '16px', label: 'Environment Sector'     },
  'University Libraries': { abbr: 'UL',   bg: 'linear-gradient(135deg,#4A148C,#310a5c)', abbrSize: '16px', label: 'Academic Library'       },
  'National Library':     { abbr: 'NL',   bg: 'linear-gradient(135deg,#BF360C,#8f2809)', abbrSize: '16px', label: 'National Archive'       },
  'State Archives':       { abbr: 'SA',   bg: 'linear-gradient(135deg,#37474F,#263238)', abbrSize: '16px', label: 'State Archive'          },
  'Government Archives':  { abbr: 'GA',   bg: 'linear-gradient(135deg,#37474F,#263238)', abbrSize: '16px', label: 'Government Archive'     },
  'School Libraries':     { abbr: 'SL',   bg: 'linear-gradient(135deg,#6A1B9A,#4a126b)', abbrSize: '16px', label: 'School Library'         },
  'College Libraries':    { abbr: 'CL',   bg: 'linear-gradient(135deg,#283593,#1a2563)', abbrSize: '16px', label: 'College Library'        },
}

function getFallback(name: string): BrandMeta {
  return { abbr: name.slice(0, 2).toUpperCase(), bg: 'linear-gradient(135deg,#374151,#1f2937)', abbrSize: '14px', label: 'Top recruiter' }
}

export default function HirerStrip({ hirers }: { hirers: string[] }) {
  const safe = Array.isArray(hirers) ? hirers : []
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canLeft, setCanLeft]   = useState(false)
  const [canRight, setCanRight] = useState(true)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const check = () => {
      setCanLeft(el.scrollLeft > 4)
      setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
    }
    check()
    el.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => { el.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -744 : 744, behavior: 'smooth' })
  }

  if (!safe.length) return null

  const rows    = safe.length <= 3 ? 1 : safe.length <= 6 ? 2 : 3
  const cols    = Math.ceil(safe.length / rows)
  const spacers = cols * rows - safe.length

  return (
    <div data-animate="fade-up" className="relative rounded-2xl border border-neutral-200 shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden">

      {/* 2-row scrollable grid */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-none w-full"
        style={{ scrollbarWidth: 'none' } as React.CSSProperties}
      >
        <div
          className="grid gap-px bg-neutral-200 w-full"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(186px, 1fr))`,
            gridTemplateRows: `repeat(${rows}, auto)`,
          }}
        >
        {safe.map((h) => {
          const meta = BRAND_META[h] ?? getFallback(h)
          return (
            <div
              key={h}
              className="group bg-white hover:bg-vgu-red/[0.03] transition-colors duration-150 px-5 py-4 flex items-center gap-3 cursor-default"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-none shadow-sm transition-transform duration-200 group-hover:scale-110"
                style={{ background: meta.bg }}
              >
                <span
                  className="font-heading font-black leading-none text-white text-center"
                  style={{ fontSize: meta.abbrSize }}
                >
                  {meta.abbr}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-heading font-bold text-[13px] text-neutral-900 leading-tight truncate">{h}</p>
                <p className="text-[11px] font-body text-neutral-500 mt-0.5 truncate">{meta.label}</p>
              </div>
            </div>
          )
        })}
        {Array.from({ length: spacers }).map((_, i) => (
          <div key={`spacer-${i}`} className="bg-white" />
        ))}
        </div>
      </div>

      {/* Left fade + button */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 pointer-events-none transition-opacity duration-200"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.95) 0%, transparent 100%)', opacity: canLeft ? 1 : 0 }}
        aria-hidden="true"
      />
      {canLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(17,24,39,0.14)] border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-vgu-red hover:border-vgu-red/30 transition-all duration-150"
        >
          <IconChevronLeft size={16} />
        </button>
      )}

      {/* Right fade + button */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 pointer-events-none transition-opacity duration-200"
        style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95) 0%, transparent 100%)', opacity: canRight ? 1 : 0 }}
        aria-hidden="true"
      />
      {canRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white shadow-[0_2px_12px_rgba(17,24,39,0.14)] border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-vgu-red hover:border-vgu-red/30 transition-all duration-150"
        >
          <IconChevronRight size={16} />
        </button>
      )}

    </div>
  )
}
