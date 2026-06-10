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
  'linear-gradient(135deg,#2563eb,#1d4ed8)',
  'linear-gradient(135deg,#7c3aed,#4c1d95)',
  'linear-gradient(135deg,#d97706,#92400e)',
  'linear-gradient(135deg,#059669,#065f46)',
  'linear-gradient(135deg,#475569,#1e293b)',
]

const SEM_COLORS = ['#C04036', '#2563eb', '#7c3aed', '#d97706', '#059669', '#475569']

export default function CurriculumPreview({ curriculum }: { curriculum: CurriculumYear[] }) {
  const [activeYear, setActiveYear] = useState(0)
  const current = curriculum[activeYear]

  let semOffset = 0
  for (let y = 0; y < activeYear; y++) semOffset += curriculum[y].semesters.length

  if (!current) return null

  return (
    <div>
      {/* Year tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {curriculum.map((cy, i) => (
          <button
            key={cy.year}
            type="button"
            onClick={() => setActiveYear(i)}
            aria-pressed={activeYear === i}
            className={[
              'rounded-full px-6 py-2.5 text-[14px] font-heading font-semibold transition-all duration-200',
              activeYear === i
                ? 'bg-vgu-red text-white shadow-md scale-[1.03]'
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-vgu-red hover:text-vgu-red',
            ].join(' ')}
          >
            {cy.year}
          </button>
        ))}
      </div>

      {/* Semester grid — plain render, no key-based remount or fill-mode animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {current.semesters.map((sem, si) => {
          const gi = (semOffset + si) % SEM_GRADS.length
          const color = SEM_COLORS[gi]
          const coreCount     = sem.courses.filter(c => c.type === 'Core').length
          const electiveCount = sem.courses.filter(c => c.type === 'Elective').length
          return (
            <div
              key={sem.label}
              className="rounded-2xl overflow-hidden border border-neutral-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              {/* Coloured header */}
              <div className="px-5 py-4" style={{ background: SEM_GRADS[gi] }}>
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
                        className="flex-none w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-heading font-black text-white mt-0.5"
                        style={{ background: course.type === 'Elective' ? 'rgba(0,0,0,0.22)' : color }}
                      >
                        {String(ji + 1).padStart(2, '0')}
                      </span>
                      <span className={`flex-1 text-[13px] font-body leading-snug ${course.type === 'Elective' ? 'text-neutral-400 italic' : 'text-neutral-700'}`}>
                        {course.name}
                      </span>
                      <span className={`flex-none self-start mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-heading font-bold tabular-nums ${
                        course.type === 'Elective'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
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
