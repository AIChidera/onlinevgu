'use client'

import { useState } from 'react'
import Image from 'next/image'
import SectionWrapper from '@/components/layout/SectionWrapper'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'MBA graduate, 2023',
    company: 'Deloitte India',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&q=80&auto=format&fit=crop',
    quote:
      'I completed my MBA while managing a full-time job and two kids. The flexibility was unreal. My salary jumped 40% within six months of graduating.',
    rating: 5,
    program: 'Online MBA',
  },
  {
    id: 2,
    name: 'Rahul Menon',
    role: 'MCA graduate, 2022',
    company: 'TCS Digital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop',
    quote:
      'The MCA program was intense but worth every rupee. The AWS and AI modules were cutting-edge. Got placed before the final semester even ended.',
    rating: 5,
    program: 'Online MCA',
  },
  {
    id: 3,
    name: 'Ananya Krishnan',
    role: 'BBA graduate, 2023',
    company: 'Zomato',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&q=80&auto=format&fit=crop',
    quote:
      'I was skeptical about online education at first. But the live sessions, the faculty interaction, and the peer community made it as good as any campus.',
    rating: 5,
    program: 'Online BBA',
  },
  {
    id: 4,
    name: 'Mohammed Farhan',
    role: 'MBA Healthcare, 2023',
    company: 'Apollo Hospitals',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=96&q=80&auto=format&fit=crop',
    quote:
      'The healthcare specialisation filled gaps I didn\'t know I had. The hospital case studies were led by actual CMOs. Invaluable for someone in medical administration.',
    rating: 5,
    program: 'MBA Healthcare',
  },
  {
    id: 5,
    name: 'Sneha Patel',
    role: 'M.Com graduate, 2022',
    company: 'KPMG India',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=96&q=80&auto=format&fit=crop',
    quote:
      'The taxation modules were incredibly detailed. My CA firm was impressed with what I knew before even starting articleship. VGU prepared me beyond expectations.',
    rating: 5,
    program: 'Online M.Com',
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = TESTIMONIALS[active]

  return (
    <SectionWrapper id="testimonials" bg="light">
      <div className="text-center mb-12">
        <p className="text-sm font-heading font-semibold uppercase tracking-widest text-vgu-red mb-3">
          Student stories
        </p>
        <h2 className="font-heading text-[40px] font-extrabold leading-tight tracking-tight text-neutral-900 md:text-[32px]">
          Hear from our learners
        </h2>
      </div>

      <div className="max-w-[800px] mx-auto">
        {/* Main testimonial card */}
        <div className="rounded-2xl bg-white border border-neutral-200 p-10 shadow-sm md:p-6 relative overflow-hidden">
          <div className="absolute top-6 right-8 text-[80px] leading-none font-serif text-vgu-red/10 select-none">
            &ldquo;
          </div>

          <div className="flex gap-1 mb-4">
            {Array.from({ length: t.rating }).map((_, i) => (
              <span key={i} className="text-vgu-yellow text-lg">★</span>
            ))}
          </div>

          <blockquote className="font-heading text-[20px] font-semibold leading-relaxed text-neutral-800 md:text-[17px] relative z-10">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="mt-6 flex items-center gap-3">
            <div className="relative h-12 w-12 flex-none overflow-hidden rounded-full">
              <Image
                src={t.avatar}
                alt={t.name}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <div className="font-heading font-bold text-neutral-900">{t.name}</div>
              <div className="text-[13px] text-neutral-500">
                {t.role} · {t.company}
              </div>
            </div>
            <div className="ml-auto rounded-full bg-vgu-beige px-3 py-1 text-[12px] font-heading font-semibold text-vgu-red">
              {t.program}
            </div>
          </div>
        </div>

        {/* Avatars nav */}
        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActive(i)}
              className={[
                'relative h-10 w-10 overflow-hidden rounded-full border-2 transition-all duration-200',
                i === active ? 'border-vgu-red scale-110' : 'border-transparent opacity-60 hover:opacity-100',
              ].join(' ')}
              aria-label={`View ${t.name}'s testimonial`}
            >
              <Image
                src={t.avatar}
                alt={t.name}
                fill
                className="object-cover"
                sizes="40px"
              />
            </button>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={[
                'h-2 rounded-full transition-all duration-200',
                i === active ? 'w-5 bg-vgu-red' : 'w-2 bg-neutral-300',
              ].join(' ')}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
