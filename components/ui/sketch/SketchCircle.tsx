'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Hand-drawn animated SVG circle. Default trigger is "in-view": draws in once
 * when the parent enters the viewport (40% visible) and stays drawn.
 *
 * For Manipal-style annotations triggered on scroll. Use trigger="hover" for
 * cursor-driven reveal (parent must be wrapped in SketchHoverGroup).
 *
 * Position absolutely over a relative parent. The path is an open ellipse with
 * a small trailing tail, hand-authored to feel loose (Manipal "Ambition" style).
 */
interface Props {
  /** "yellow" maps to vgu-yellow (#FFA412); "red" maps to vgu-red (#C04036). */
  color?:       'yellow' | 'red'
  strokeWidth?: number
  /** Draw-in duration in ms. Default 1800. */
  durationMs?:  number
  /** Delay before draw starts, in ms. Default 0. */
  delayMs?:     number
  /** Optional rotation in degrees. Default a slight -3°. */
  rotateDeg?:   number
  /** "in-view" (default) | "mount" | "hover" */
  trigger?:     'in-view' | 'mount' | 'hover'
  /** Extra Tailwind classes for positioning the SVG over its target. */
  className?:   string
}

// Length of the path. Measured offline so we avoid runtime measurement.
const PATH_LENGTH = 320

export default function SketchCircle({
  color       = 'yellow',
  strokeWidth = 2.5,
  durationMs  = 1800,
  delayMs     = 0,
  rotateDeg   = -3,
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

  const stroke = color === 'yellow' ? '#FFA412' : '#C04036'
  // Hover trigger uses the CSS class; everything else uses inline state.
  const isHover = trigger === 'hover'
  const offset  = isHover ? PATH_LENGTH : (drawn ? 0 : PATH_LENGTH)

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 200 70"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+32px)] overflow-visible ${className}`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <path
        d="M 185,32 C 185,15 145,8 100,9 C 48,10 12,20 12,38 C 12,55 50,64 105,62 C 152,61 184,52 186,38 L 178,44"
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
