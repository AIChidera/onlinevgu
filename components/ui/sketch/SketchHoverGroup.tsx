/**
 * Parent that triggers hover-only animated SVG annotations beneath it.
 *
 * Each child Sketch* component starts with stroke-dashoffset = full path length
 * (invisible). When THIS group is hovered, the `.sketch-hover-group:hover
 * .sketch-draw` rule in globals.css overrides dashoffset to 0, and the inline
 * `transition` on each child animates the draw-in. On hover-out, dashoffset
 * returns to full length, transition reverses, line erases. Pure CSS, no JS.
 *
 * Usage:
 *   <SketchHoverGroup>
 *     <h1>Your Next <span className="relative inline-block">
 *       Promotion
 *       <SketchCircle />
 *     </span> Starts Here.</h1>
 *   </SketchHoverGroup>
 */
export default function SketchHoverGroup({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`sketch-hover-group ${className}`}>{children}</div>
}
