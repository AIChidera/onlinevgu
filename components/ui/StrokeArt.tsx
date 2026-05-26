/**
 * Hover-triggered decorative SVG overlay — appears on every section.
 * Parent section must have className="group".
 * variant="light" → red strokes on white/grey sections
 * variant="dark"  → white strokes + gold rings on dark red sections
 */

interface StrokeArtProps {
  variant?: 'light' | 'dark'
}

export default function StrokeArt({ variant = 'light' }: StrokeArtProps) {
  const stroke    = variant === 'dark' ? 'rgba(255,255,255,0.06)'  : 'rgba(192,64,54,0.07)'
  const goldRing  = variant === 'dark' ? 'rgba(255,164,18,0.10)'   : 'rgba(192,64,54,0.07)'
  const ringStroke = variant === 'dark' ? 'rgba(255,164,18,0.10)'  : 'rgba(192,64,54,0.06)'

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1280 700"
    >
      <defs>
        <style>{`
          @keyframes saSpin {
            to { transform: rotate(360deg); }
          }
          @keyframes saDrawIn {
            from { stroke-dashoffset: 400; }
            to   { stroke-dashoffset: 0; }
          }
          .sa-spin-slow { transform-origin: center; animation: saSpin 18s linear infinite; }
          .sa-spin-med  { transform-origin: center; animation: saSpin 10s linear infinite reverse; }
          .sa-draw      { animation: saDrawIn 1.4s ease-out forwards; stroke-dasharray: 400; stroke-dashoffset: 400; }
        `}</style>
      </defs>

      {/* ── TOP-LEFT cluster ─────────────────────────────── */}
      <g transform="translate(-40, -40)">
        {/* Draw-in lines */}
        <line className="sa-draw" x1="20" y1="20" x2="160" y2="90"  stroke={stroke} strokeWidth="1" style={{animationDelay:'0.1s'}}/>
        <line className="sa-draw" x1="20" y1="20" x2="80"  y2="180" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.2s'}}/>
        <line className="sa-draw" x1="60" y1="10" x2="200" y2="60"  stroke={stroke} strokeWidth="1" style={{animationDelay:'0.3s'}}/>
        {/* Dot constellation */}
        {[[30,30],[80,50],[50,110],[120,80],[160,40]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={stroke}/>
        ))}
        {/* Spinning ring */}
        <g className="sa-spin-slow" style={{transformOrigin:'100px 100px'}}>
          <circle cx="100" cy="100" r="55" fill="none" stroke={ringStroke} strokeWidth="1" strokeDasharray="8 10"/>
        </g>
      </g>

      {/* ── TOP-RIGHT arc burst ──────────────────────────── */}
      <g transform="translate(1280, 0)">
        <line className="sa-draw" x1="-20"  y1="20"  x2="-140" y2="100" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.15s'}}/>
        <line className="sa-draw" x1="-20"  y1="20"  x2="-90"  y2="160" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.25s'}}/>
        <line className="sa-draw" x1="-60"  y1="10"  x2="-200" y2="70"  stroke={stroke} strokeWidth="1" style={{animationDelay:'0.35s'}}/>
        <line className="sa-draw" x1="-30"  y1="60"  x2="-160" y2="130" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.2s'}}/>
        {/* Arc */}
        <path className="sa-draw" d="M -20,80 Q -80,20 -160,60" fill="none" stroke={stroke} strokeWidth="1.5" style={{animationDelay:'0.3s'}}/>
        {/* Spinning arc ring */}
        <g className="sa-spin-med" style={{transformOrigin:'-100px 80px'}}>
          <circle cx="-100" cy="80" r="65" fill="none" stroke={goldRing} strokeWidth="1.5" strokeDasharray="12 14"/>
        </g>
        {/* Dots */}
        {[[-40,30],[-100,50],[-70,110],[-140,70],[-170,120]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2.5" fill={stroke}/>
        ))}
      </g>

      {/* ── BOTTOM-RIGHT rings ───────────────────────────── */}
      <g transform="translate(1280, 700)">
        <g className="sa-spin-slow" style={{transformOrigin:'-90px -90px'}}>
          <circle cx="-90" cy="-90" r="80" fill="none" stroke={goldRing}   strokeWidth="2"   strokeDasharray="14 16"/>
        </g>
        <g className="sa-spin-med" style={{transformOrigin:'-90px -90px'}}>
          <circle cx="-90" cy="-90" r="55" fill="none" stroke={ringStroke} strokeWidth="1.2" strokeDasharray="6 10"/>
        </g>
        <circle cx="-90" cy="-90" r="30" fill="none" stroke={stroke} strokeWidth="1"/>
        {/* Dot grid */}
        {[[-140,-50],[-120,-130],[-50,-120],[-160,-140],[-40,-60]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={stroke}/>
        ))}
      </g>

      {/* ── BOTTOM-LEFT dots + geometry ─────────────────── */}
      <g transform="translate(0, 700)">
        {/* Triangle */}
        <polygon className="sa-draw" points="30,-40 100,-80 60,-140" fill="none" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.2s'}}/>
        {/* Lines */}
        <line className="sa-draw" x1="20" y1="-20" x2="150" y2="-60"  stroke={stroke} strokeWidth="1" style={{animationDelay:'0.1s'}}/>
        <line className="sa-draw" x1="20" y1="-20" x2="80"  y2="-150" stroke={stroke} strokeWidth="1" style={{animationDelay:'0.3s'}}/>
        {/* Dot constellation */}
        {[[25,-35],[60,-55],[40,-95],[100,-75],[130,-45]].map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="2" fill={stroke}/>
        ))}
        <g className="sa-spin-slow" style={{transformOrigin:'90px -90px'}}>
          <circle cx="90" cy="-90" r="50" fill="none" stroke={ringStroke} strokeWidth="1" strokeDasharray="6 8"/>
        </g>
      </g>
    </svg>
  )
}
