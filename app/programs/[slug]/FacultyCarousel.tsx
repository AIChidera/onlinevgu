'use client'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

export interface FacultyMember {
  initials:   string
  photoGrad:  string
  name:       string
  title:      string
  credential: string
  slug:       string
  photo?:     string
}

export default function FacultyCarousel({ faculty }: { faculty: FacultyMember[] }) {
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
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -580 : 580, behavior: 'smooth' })
  }

  return (
    <div className="relative">

      {/* Left button */}
      {canLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll faculty left"
          className="absolute left-3 top-[90px] z-10 w-10 h-10 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-150 shadow-[0_2px_16px_rgba(0,0,0,0.35)]"
        >
          <IconChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable track - swipe-enabled, no scrollbar */}
      <div
        ref={scrollRef}
        className="overflow-x-auto scrollbar-none pl-12 lg:pl-8 md:pl-5"
        style={{ WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        <div className="flex gap-5 pr-12 lg:pr-8 md:pr-5 snap-x snap-mandatory" style={{ width: 'max-content' }}>
          {faculty.map((f) => (
            <div
              key={f.name}
              className="snap-start w-[260px] flex-none rounded-2xl overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Photo area */}
              <div
                className="relative h-[200px] overflow-hidden"
                style={{ background: f.photoGrad }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                {f.photo ? (
                  <>
                    <Image src={f.photo} alt={f.name} fill className="object-cover object-top" sizes="260px" />
                    <div className="absolute inset-x-0 bottom-0 h-12" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 100%)' }} />
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
                      <span className="font-heading font-black text-[26px] text-white">
                        {f.initials.slice(0, 2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-heading font-bold text-[16px] text-white leading-snug">{f.name}</h3>
                <p className="text-[12px] font-body text-white/50 mt-0.5 mb-3 leading-snug">{f.title}</p>
                <span className="inline-flex rounded-full bg-vgu-yellow/15 border border-vgu-yellow/25 px-3 py-1 text-[11px] font-body font-semibold text-vgu-yellow leading-snug">
                  {f.credential}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right button */}
      {canRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll faculty right"
          className="absolute right-3 top-[90px] z-10 w-10 h-10 rounded-full bg-white/15 border border-white/25 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-neutral-900 transition-all duration-150 shadow-[0_2px_16px_rgba(0,0,0,0.35)]"
        >
          <IconChevronRight size={18} />
        </button>
      )}

    </div>
  )
}
