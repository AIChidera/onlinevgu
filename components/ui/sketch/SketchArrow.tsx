'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  color?:       'yellow' | 'red'
  strokeWidth?: number
  durationMs?:  number
  delayMs?:     number
  rotateDeg?:   number
  trigger?:     'in-view' | 'mount' | 'hover'
  className?:   string
}

const PATH_LENGTH = 200

export default function SketchArrow({
  color       = 'yellow',
  strokeWidth = 2.5,
  durationMs  = 1600,
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
      viewBox="0 0 100 100"
      className={`pointer-events-none absolute overflow-visible ${className}`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <path
        d="M 88,10 C 90,30 78,46 60,58 C 42,70 28,76 18,86 L 10,80 M 18,86 L 26,76"
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
