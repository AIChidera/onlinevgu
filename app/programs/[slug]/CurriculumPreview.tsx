'use client'

import { useState } from 'react'

export interface CourseItem {
  name:    string
  credits: number
  type:    'Core' | 'Elective'
}

interface SemesterDetail {
  label:        string
  totalCredits: number
  courses:      CourseItem[]
}

export interface CurriculumYear {
  year:      string
  semesters: SemesterDetail[]
}

const SEM_GRADS = [
  'linear-gradient(135deg,#C04036,#821a12)',
  'linear-gradient(135deg,#FFA412,#C04036)',
  'linear-gradient(135deg,#821a12,#3b0d09)',
]

const SEM_COLORS = ['#C04036', '#FFA412', '#821a12']

export default function CurriculumPreview({ curriculum }: { curriculum: CurriculumYear[] }) {
  const [activeYear, setActiveYear] = useState(0)
  const current = curriculum[activeYear]

  let semOffset = 0
  for (let y = 0; y < activeYear; y++) semOffset += curriculum[y].semesters.length

  if (!current) return null

  return (
    <div>
      <style>{`
        @keyframes sem-fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .sem-card { animation: sem-fade-up 280ms cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* Year tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {curriculum.map((cy, i) => (
          <button
            key={cy.year}
            type="button"
            onClick={() => setActiveYear(i)}
            aria-pressed={activeYear === i}
            style={activeYear === i ? { background: 'linear-gradient(135deg,#C04036,#821a12)' } : undefined}
            className={[
              'flex items-center min-h-[44px] rounded-full px-6 py-2.5 text-[14px] font-heading font-semibold transition-all duration-200',
              activeYear === i
                ? 'text-white shadow-[0_4px_16px_rgba(192,64,54,0.35)] scale-[1.05]'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red',
            ].join(' ')}
          >
            {cy.year}
          </button>
        ))}
      </div>

      {/* Semester grid - key re-mounts on year switch, triggering entry animation */}
      <div key={activeYear} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {current.semesters.map((sem, si) => {
          const gi    = (semOffset + si) % SEM_GRADS.length
          const color = SEM_COLORS[gi]
          const coreCount     = sem.courses.filter(c => c.type === 'Core').length
          const electiveCount = sem.courses.filter(c => c.type === 'Elective').length
          return (
            <div
              key={sem.label}
              className="sem-card rounded-2xl overflow-hidden border border-neutral-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
              style={{ animationDelay: `${si * 80}ms` }}
            >
              {/* Coloured header */}
              <div className="relative overflow-hidden px-5 py-4" style={{ background: SEM_GRADS[gi] }}>
                <span
                  aria-hidden="true"
                  className="absolute -right-1 -top-3 font-heading font-black leading-none select-none pointer-events-none text-[80px] text-white"
                  style={{ opacity: 0.10 }}
                >
                  {String(semOffset + si + 1).padStart(2, '0')}
                </span>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-bold text-[15px] text-white tracking-[-0.2px]">{sem.label}</h4>
                  <span className="rounded-full bg-white/20 border border-white/25 px-2.5 py-0.5 text-[11px] font-body font-semibold text-white">
                    {sem.totalCredits} credits
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-body text-white/90">{coreCount} Core</span>
                  {electiveCount > 0 && (
                    <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-body text-white/90">{electiveCount} Elective</span>
                  )}
                </div>
              </div>

              {/* Course list */}
              <div className="bg-white p-5">
                <ul className="flex flex-col gap-2.5">
                  {sem.courses.map((course, ji) => (
                    <li key={`${course.name}-${ji}`} className="flex items-start gap-2.5">
                      <span
                        className={`flex-none w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-heading font-black mt-0.5 ${course.type === 'Elective' ? 'bg-neutral-200 text-neutral-500' : 'text-white'}`}
                        style={course.type === 'Elective' ? undefined : { background: color }}
                      >
                        {String(ji + 1).padStart(2, '0')}
                      </span>
                      <span className={`flex-1 text-[13px] font-body leading-snug ${course.type === 'Elective' ? 'text-neutral-400' : 'text-neutral-700'}`}>
                        {course.name}
                      </span>
                      <span className={`flex-none self-start mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-heading font-bold tabular-nums ${
                        course.type === 'Elective'
                          ? 'bg-vgu-yellow/15 text-vgu-yellow border border-vgu-yellow/30'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {course.credits}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
