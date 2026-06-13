'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  color?:       'yellow' | 'red'
  size?:        number     // px
  strokeWidth?: number
  durationMs?:  number
  delayMs?:     number
  rotateDeg?:   number
  trigger?:     'in-view' | 'mount' | 'hover'
  className?:   string
}

const PATH_LENGTH = 100

export default function SketchSparkle({
  color       = 'yellow',
  size        = 22,
  strokeWidth = 2,
  durationMs  = 1100,
  delayMs     = 0,
  rotateDeg   = 0,
  trigger     = 'in-view',
  className   = '',
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [drawn, setDrawn] = useState(trigger === 'mount')

  useEffect(() => {
    if (trigger !== 'in-view' || !svgRef.current) return
    const el = svgRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setDrawn(true)
            observer.disconnect()
            break
          }
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [trigger])

  const stroke  = color === 'yellow' ? '#FFA412' : '#C04036'
  const isHover = trigger === 'hover'
  const offset  = isHover ? PATH_LENGTH : (drawn ? 0 : PATH_LENGTH)

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size, transform: `rotate(${rotateDeg}deg)` }}
    >
      <path
        d="M 12,2 C 12,7 11,11 6,12 C 11,13 12,17 12,22 C 12,17 13,13 18,12 C 13,11 12,7 12,2 Z"
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray:  PATH_LENGTH,
          strokeDashoffset: offset,
          transition:       `stroke-dashoffset ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1) ${delayMs}ms`,
        }}
        className={isHover ? 'sketch-draw' : ''}
      />
    </svg>
  )
}
