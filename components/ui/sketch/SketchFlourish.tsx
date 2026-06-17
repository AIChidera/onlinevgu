'use client'

/**
 * Large abstract background flourish (Manipal-style). Sits behind a section's
 * content at low opacity. Draws itself in over ~2s on parent hover, erases out
 * on hover leave. The flourish is purely decorative (pointer-events-none).
 *
 * The parent section MUST:
 *   1. Have `relative` positioning (so the absolute flourish is contained).
 *   2. Have the class `sketch-hover-group` so the hover CSS rule activates.
 *   3. Render its real content above the flourish via `z-10` (most sections
 *      already do this).
 *
 * Five abstract shapes, each a single hand-authored path. Mix shapes across
 * sections so adjacent flourishes don't repeat visually.
 */
import { useEffect, useRef, useState } from 'react'

export type FlourishShape = 'swoop' | 'loop' | 'arc' | 'wave' | 'monogram'

interface Props {
  shape?:       FlourishShape
  color?:       'red' | 'yellow' | 'red-dark' | 'white'
  /** 0-1. Default 0.10, keep it whisper-faint per Manipal's reference. */
  opacity?:     number
  strokeWidth?: number
  durationMs?:  number
  /** "hover" (default, matches Manipal) | "in-view" | "mount". */
  trigger?:     'in-view' | 'hover' | 'mount'
  /** Extra classes for positioning offset / scale. */
  className?:   string
}

interface ShapeCfg { d: string; length: number; viewBox: string }

const SHAPES: Record<FlourishShape, ShapeCfg> = {
  // Swooping curve from bottom-left arcing up and over to bottom-right
  swoop: {
    d:       'M -20,460 C 140,180 360,80 580,140 C 760,190 870,330 920,540',
    length:  1180,
    viewBox: '0 0 900 600',
  },
  // Big open loop with a tail (Q-shape, Manipal's signature feel)
  loop: {
    d:       'M 440,80 C 200,80 70,260 140,460 C 220,650 540,640 700,460 C 820,330 770,160 620,110 C 510,80 460,170 440,250',
    length:  1820,
    viewBox: '0 0 900 700',
  },
  // Sweeping arc from one side to the other
  arc: {
    d:       'M 30,360 C 200,40 700,40 870,360',
    length:  960,
    viewBox: '0 0 900 400',
  },
  // S-curve wave spanning the full width
  wave: {
    d:       'M -20,200 C 160,80 290,320 460,200 C 630,80 760,320 920,200',
    length:  1180,
    viewBox: '0 0 900 400',
  },
  // Stylized V (VGU monogram nod)
  monogram: {
    d:       'M 100,80 C 130,140 380,520 450,540 C 520,520 770,140 800,80',
    length:  1180,
    viewBox: '0 0 900 600',
  },
}

export default function SketchFlourish({
  shape       = 'swoop',
  color       = 'red',
  opacity     = 0.08,
  // Bolder default so the line reads even at very low opacity.
  strokeWidth = 4,
  // Linear easing so the 2s draw actually feels like 2s
  // (cubic ease-out front-loaded the animation and felt much faster).
  durationMs  = 2000,
  trigger     = 'hover',
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
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [trigger])

  const cfg = SHAPES[shape]
  const stroke = color === 'red'      ? '#C04036'
              : color === 'yellow'   ? '#FFA412'
              : color === 'red-dark' ? '#821a12'
              :                        '#FFFFFF'

  const isHover = trigger === 'hover'
  const offset  = isHover ? cfg.length : (drawn ? 0 : cfg.length)

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      viewBox={cfg.viewBox}
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ opacity }}
    >
      <path
        d={cfg.d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray:  cfg.length,
          strokeDashoffset: offset,
          transition:       `stroke-dashoffset ${durationMs}ms linear`,
        }}
        className={isHover ? 'sketch-draw' : ''}
      />
    </svg>
  )
}
