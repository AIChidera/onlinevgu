'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionWrapper from '@/components/layout/SectionWrapper'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'MBA graduate · Deloitte India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80&auto=format&fit=crop',
    quote: 'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal. My salary jumped 40% within six months of graduating.',
    rating: 5,
    program: 'Online MBA',
  },
  {
    id: 2,
    name: 'Rahul Menon',
    role: 'MCA graduate · TCS Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop',
    quote: 'The MCA program was intense but worth every rupee. The AWS and AI modules were cutting-edge. Got placed before the final semester even ended.',
    rating: 5,
    program: 'Online MCA',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    role: 'BBA graduate · Zomato',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&q=80&auto=format&fit=crop',
    quote: 'I was skeptical about online education at first. But the live sessions and the peer community made it as good as any campus experience.',
    rating: 5,
    program: 'Online BBA',
  },
  {
    id: 4,
    name: 'Mohammed Farhan',
    role: 'MBA Healthcare · Apollo Hospitals',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&q=80&auto=format&fit=crop',
    quote: 'The healthcare specialisation filled gaps I didn\'t know I had. Hospital case studies led by actual CMOs. Invaluable for medical administration.',
    rating: 5,
    program: 'MBA Healthcare',
  },
  {
    id: 5,
    name: 'Sneha Patel',
    role: 'M.Com graduate · KPMG India',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=96&q=80&auto=format&fit=crop',
    quote: 'The taxation modules were incredibly detailed. My CA firm was impressed with what I knew before even starting articleship. VGU exceeded my expectations.',
    rating: 5,
    program: 'Online M.Com',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)

  return (
    <SectionWrapper id="testimonials" bg="light">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          Student stories
        </p>
        <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
          Real people. Real outcomes.
        </h2>
      </div>

      {/* Cards row — shows 3 at a time, active is center */}
      <div className="grid grid-cols-3 gap-5 lg:grid-cols-1">
        {TESTIMONIALS.slice(active, active + 3).map((t, i) => (
          <div
            key={t.id}
            className={[
              'flex flex-col rounded-2xl bg-white border p-6 transition-all duration-300',
              i === 1
                ? 'border-vgu-red/30 shadow-lg scale-[1.02]'
                : 'border-neutral-200 shadow-sm',
            ].join(' ')}
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <span key={j} className="text-vgu-yellow">★</span>
              ))}
            </div>
            <p className="text-[15px] text-neutral-700 leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="relative h-10 w-10 flex-none overflow-hidden rounded-full">
                <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
              </div>
              <div>
                <div className="font-heading text-[14px] font-bold text-neutral-900">{t.name}</div>
                <div className="text-[12px] text-neutral-500">{t.role}</div>
              </div>
              <div className="ml-auto rounded-full bg-vgu-beige px-2.5 py-0.5 text-[11px] font-heading font-semibold text-vgu-red whitespace-nowrap">
                {t.program}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: TESTIMONIALS.length - 2 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={[
              'h-2 rounded-full transition-all duration-200',
              i === active ? 'w-6 bg-vgu-red' : 'w-2 bg-neutral-300 hover:bg-neutral-400',
            ].join(' ')}
            aria-label={`Go to testimonials ${i + 1}`}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}
