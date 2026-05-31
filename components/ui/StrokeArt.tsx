interface StrokeArtProps {
  variant?: 'light' | 'dark'
}

export default function StrokeArt({ variant = 'light' }: StrokeArtProps) {
  const isLight = variant === 'light'
  const p = isLight ? 'rgba(192,64,54,' : 'rgba(255,255,255,'
  const a = isLight ? 'rgba(255,164,18,' : 'rgba(255,164,18,'
  const g = isLight ? 'rgba(238,207,99,' : 'rgba(238,207,99,'
  const c = (base: string, op: number) => `${base}${op})`

  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1280 700"
    >
      <defs>
        <style>{`
          @keyframes saSpin     { to   { transform: rotate(360deg); } }
          @keyframes saSpinRev  { to   { transform: rotate(-360deg); } }
          @keyframes saDrawIn   { from { stroke-dashoffset: 1400; } to { stroke-dashoffset: 0; } }
          @keyframes saMarchFwd { to   { stroke-dashoffset: -48; } }
          @keyframes saMarchBwd { to   { stroke-dashoffset:  48; } }
          @keyframes saFloat    { 0%,100% { transform: translateY(0); }    50% { transform: translateY(-10px); } }
          @keyframes saFloatB   { 0%,100% { transform: translateY(0); }    50% { transform: translateY(8px); } }
          @keyframes saBobble   { 0%,100% { transform: scale(1); }         50% { transform: scale(1.18); } }
          @keyframes saPulse    { 0%,100% { opacity: 0.5; }                50% { opacity: 1; } }
          @keyframes saBreath   { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.06); opacity: 1; } }

          .sa-spin-xs   { animation: saSpin    28s linear infinite; }
          .sa-spin-sm   { animation: saSpinRev 18s linear infinite; }
          .sa-spin-md   { animation: saSpin    11s linear infinite; }
          .sa-spin-fast { animation: saSpinRev  6s linear infinite; }
          .sa-draw      { animation: saDrawIn  1.8s cubic-bezier(0.22,1,0.36,1) forwards; stroke-dasharray: 1400; stroke-dashoffset: 1400; }
          .sa-march-f   { animation: saMarchFwd 1.6s linear infinite; }
          .sa-march-b   { animation: saMarchBwd 2s linear infinite; }
          .sa-float-a   { animation: saFloat  4.5s ease-in-out infinite; }
          .sa-float-b   { animation: saFloatB 6.5s ease-in-out infinite 1s; }
          .sa-float-c   { animation: saFloat  5.8s ease-in-out infinite 2.2s; }
          .sa-bobble    { animation: saBobble 3.5s ease-in-out infinite; }
          .sa-bobble-2  { animation: saBobble 4.8s ease-in-out infinite 1.4s; }
          .sa-pulse     { animation: saPulse  2.8s ease-in-out infinite; }
          .sa-breath    { animation: saBreath 5s   ease-in-out infinite; }
        `}</style>
      </defs>

      {/* ═══════════════════════════════════════════════
          LAYER 1 - FULL-WIDTH FLOWING CURVES (prominent)
      ═══════════════════════════════════════════════ */}
      <path className="sa-draw"
        d="M -80,180 C 160,60 380,320 640,260 S 960,380 1380,160"
        fill="none" stroke={c(p,0.16)} strokeWidth="2"
        style={{animationDelay:'0.2s'}} />
      <path className="sa-draw"
        d="M -80,230 C 200,120 460,360 700,300 S 1020,420 1380,220"
        fill="none" stroke={c(p,0.10)} strokeWidth="1.5"
        style={{animationDelay:'0.45s'}} />
      <path className="sa-draw"
        d="M 1380,120 C 1060,220 760,60 440,170 S 120,320 -80,210"
        fill="none" stroke={c(a,0.14)} strokeWidth="1.5"
        style={{animationDelay:'0.7s'}} />
      <path className="sa-draw"
        d="M -60,580 C 240,510 520,640 760,570 S 1080,640 1380,540"
        fill="none" stroke={c(p,0.12)} strokeWidth="1.5"
        style={{animationDelay:'0.55s'}} />
      <path className="sa-draw"
        d="M 200,350 C 400,280 580,430 780,370 S 1020,480 1200,380"
        fill="none" stroke={c(a,0.10)} strokeWidth="1.5"
        style={{animationDelay:'0.9s'}} />

      {/* ═══════════════════════════════════════════════
          LAYER 2 - MARCHING DASHES (punchy)
      ═══════════════════════════════════════════════ */}
      <path className="sa-march-f"
        d="M 0,70 C 280,30 580,110 880,65 S 1180,145 1280,90"
        fill="none" stroke={c(p,0.20)} strokeWidth="2"
        strokeDasharray="10 20" />
      <path className="sa-march-b"
        d="M 0,630 C 260,590 540,660 820,610 S 1100,680 1280,630"
        fill="none" stroke={c(a,0.18)} strokeWidth="2"
        strokeDasharray="7 18" />
      <path className="sa-march-f"
        d="M 320,0 C 400,160 480,380 560,700"
        fill="none" stroke={c(p,0.12)} strokeWidth="1.5"
        strokeDasharray="6 16" />
      <path className="sa-march-b"
        d="M 920,0 C 990,170 1030,390 1070,700"
        fill="none" stroke={c(a,0.10)} strokeWidth="1.5"
        strokeDasharray="5 15" />

      {/* ═══════════════════════════════════════════════
          LAYER 3 - SCATTERED BUBBLE CIRCLES (the new "alive" layer)
      ═══════════════════════════════════════════════ */}
      {/* Large bubble rings drifting across the section */}
      <g className="sa-breath" style={{transformOrigin:'200px 180px'}}>
        <circle cx="200" cy="180" r="52" fill="none" stroke={c(p,0.14)} strokeWidth="2" />
        <circle cx="200" cy="180" r="36" fill={c(p,0.04)} stroke="none" />
      </g>
      <g className="sa-breath" style={{transformOrigin:'1080px 500px', animationDelay:'1.8s'}}>
        <circle cx="1080" cy="500" r="65" fill="none" stroke={c(a,0.16)} strokeWidth="2" />
        <circle cx="1080" cy="500" r="45" fill={c(a,0.04)} stroke="none" />
      </g>
      <g className="sa-bobble" style={{transformOrigin:'640px 120px'}}>
        <circle cx="640" cy="120" r="38" fill="none" stroke={c(p,0.12)} strokeWidth="1.8" strokeDasharray="8 8"/>
      </g>
      <g className="sa-bobble-2" style={{transformOrigin:'900px 580px'}}>
        <circle cx="900" cy="580" r="44" fill="none" stroke={c(a,0.14)} strokeWidth="1.8" strokeDasharray="10 8"/>
      </g>
      <g className="sa-float-a" style={{transformOrigin:'420px 550px'}}>
        <circle cx="420" cy="550" r="28" fill="none" stroke={c(p,0.16)} strokeWidth="2" />
        <circle cx="420" cy="550" r="16" fill={c(p,0.06)} stroke="none" />
      </g>
      <g className="sa-float-b" style={{transformOrigin:'1160px 200px'}}>
        <circle cx="1160" cy="200" r="34" fill="none" stroke={c(a,0.15)} strokeWidth="2" />
      </g>
      <g className="sa-float-c" style={{transformOrigin:'100px 460px'}}>
        <circle cx="100" cy="460" r="22" fill="none" stroke={c(g,0.22)} strokeWidth="2" />
        <circle cx="100" cy="460" r="10" fill={c(g,0.10)} stroke="none" />
      </g>
      <g className="sa-bobble" style={{transformOrigin:'760px 350px', animationDelay:'0.8s'}}>
        <circle cx="760" cy="350" r="18" fill="none" stroke={c(p,0.15)} strokeWidth="1.8" />
        <circle cx="760" cy="350" r="8"  fill={c(p,0.08)} stroke="none" />
      </g>

      {/* Small bubble clusters */}
      {([
        [340,200,10],[350,215,6],[330,218,4],
        [980,140,12],[994,152,7],[972,158,5],
        [580,620,9],[592,633,5],[570,630,4],
        [1220,420,11],[1232,410,6],[1212,430,5],
      ] as [number,number,number][]).map(([cx,cy,r],i) => (
        <circle key={`b-${i}`} cx={cx} cy={cy} r={r}
          fill="none" stroke={c(i%3===0 ? a : p, 0.16)}
          strokeWidth={i%3===0 ? 2 : 1.5} />
      ))}

      {/* ═══════════════════════════════════════════════
          LAYER 4 - TOP-LEFT CORNER
      ═══════════════════════════════════════════════ */}
      <g transform="translate(-30,-30)">
        <g className="sa-spin-xs"  style={{transformOrigin:'130px 130px'}}>
          <circle cx="130" cy="130" r="115" fill="none" stroke={c(p,0.12)} strokeWidth="1.5" strokeDasharray="4 12"/>
        </g>
        <g className="sa-spin-sm"  style={{transformOrigin:'130px 130px'}}>
          <circle cx="130" cy="130" r="82"  fill="none" stroke={c(a,0.22)} strokeWidth="2"   strokeDasharray="9 11"/>
        </g>
        <g className="sa-spin-md"  style={{transformOrigin:'130px 130px'}}>
          <circle cx="130" cy="130" r="52"  fill="none" stroke={c(p,0.18)} strokeWidth="1.5" strokeDasharray="5 9"/>
        </g>
        <g className="sa-spin-fast" style={{transformOrigin:'130px 130px'}}>
          <circle cx="130" cy="130" r="28"  fill="none" stroke={c(p,0.14)} strokeWidth="1.5" strokeDasharray="2 6"/>
        </g>
        {([
          [20,20,210,110],[20,20,110,220],[70,10,250,80],
          [10,90,180,200],[10,160,160,260],[130,10,240,180],
        ] as number[][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} className="sa-draw" x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c(p, i<3 ? 0.20 : 0.14)} strokeWidth="1.5"
            style={{animationDelay:`${0.1+i*0.1}s`}} />
        ))}
        {([
          [35,35,3],[90,60,2.5],[60,120,3.5],[140,90,2.5],[185,50,3],
          [100,175,2.5],[50,150,2],[175,140,2],[220,100,2.5],
        ] as number[][]).map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={c(i%3===0 ? a : p, i%2===0 ? 0.30 : 0.18)} />
        ))}
        <line x1="35"  y1="35"  x2="90"  y2="60"  stroke={c(p,0.16)} strokeWidth="1.5"/>
        <line x1="90"  y1="60"  x2="140" y2="90"  stroke={c(p,0.16)} strokeWidth="1.5"/>
        <line x1="60"  y1="120" x2="100" y2="175" stroke={c(p,0.12)} strokeWidth="1.5"/>
        <line x1="140" y1="90"  x2="185" y2="50"  stroke={c(p,0.14)} strokeWidth="1.5"/>
        <g className="sa-float-a" style={{transformOrigin:'200px 45px'}}>
          <rect x="192" y="37" width="16" height="16" transform="rotate(45 200 45)"
            fill="none" stroke={c(a,0.50)} strokeWidth="2"/>
        </g>
        <g className="sa-float-b" style={{transformOrigin:'55px 175px'}}>
          <rect x="48" y="168" width="14" height="14"
            fill="none" stroke={c(g,0.40)} strokeWidth="2"/>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 5 - TOP-RIGHT CORNER
      ═══════════════════════════════════════════════ */}
      <g transform="translate(1310,-30)">
        <g className="sa-spin-sm"   style={{transformOrigin:'-130px 130px'}}>
          <circle cx="-130" cy="130" r="105" fill="none" stroke={c(p,0.14)} strokeWidth="1.5" strokeDasharray="4 13"/>
        </g>
        <g className="sa-spin-xs"   style={{transformOrigin:'-130px 130px'}}>
          <circle cx="-130" cy="130" r="74"  fill="none" stroke={c(a,0.24)} strokeWidth="2"   strokeDasharray="10 10"/>
        </g>
        <g className="sa-spin-fast" style={{transformOrigin:'-130px 130px'}}>
          <circle cx="-130" cy="130" r="46"  fill="none" stroke={c(p,0.16)} strokeWidth="1.5" strokeDasharray="4 8"/>
        </g>
        <g className="sa-spin-md"   style={{transformOrigin:'-130px 130px'}}>
          <circle cx="-130" cy="130" r="24"  fill="none" stroke={c(p,0.12)} strokeWidth="1.5" strokeDasharray="2 5"/>
        </g>
        {([
          [-20,20,-210,110],[-20,20,-110,230],[-70,10,-250,90],
          [-10,100,-200,210],[-10,170,-170,270],[-130,10,-240,190],
        ] as number[][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} className="sa-draw" x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c(p, i<3 ? 0.20 : 0.14)} strokeWidth="1.5"
            style={{animationDelay:`${0.15+i*0.1}s`}} />
        ))}
        <path className="sa-draw" d="M -20,90 Q -100,10 -210,80"
          fill="none" stroke={c(p,0.22)} strokeWidth="2"
          style={{animationDelay:'0.4s'}} />
        {([
          [-40,35,3],[-105,60,2.5],[-75,120,3.5],[-155,82,2.5],[-190,48,3],
          [-105,180,2.5],[-55,155,2],[-180,150,2],[-225,108,2.5],
        ] as number[][]).map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={c(i%3===0 ? a : p, i%2===0 ? 0.30 : 0.18)} />
        ))}
        <g className="sa-float-c" style={{transformOrigin:'-200px 45px'}}>
          <rect x="-208" y="37" width="16" height="16" transform="rotate(45 -200 45)"
            fill="none" stroke={c(a,0.50)} strokeWidth="2"/>
        </g>
        <g className="sa-float-a" style={{transformOrigin:'-55px 165px'}}>
          <polygon points="-55,156 -44,175 -66,175"
            fill="none" stroke={c(g,0.40)} strokeWidth="2"/>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 6 - BOTTOM-RIGHT CORNER
      ═══════════════════════════════════════════════ */}
      <g transform="translate(1310,730)">
        <g className="sa-spin-xs"  style={{transformOrigin:'-120px -120px'}}>
          <circle cx="-120" cy="-120" r="108" fill="none" stroke={c(a,0.18)} strokeWidth="2.5" strokeDasharray="14 16"/>
        </g>
        <g className="sa-spin-md"  style={{transformOrigin:'-120px -120px'}}>
          <circle cx="-120" cy="-120" r="75"  fill="none" stroke={c(p,0.20)} strokeWidth="2"   strokeDasharray="7 10"/>
        </g>
        <g className="sa-spin-sm"  style={{transformOrigin:'-120px -120px'}}>
          <circle cx="-120" cy="-120" r="45"  fill="none" stroke={c(p,0.16)} strokeWidth="1.5" strokeDasharray="3 7"/>
        </g>
        <g className="sa-spin-fast" style={{transformOrigin:'-120px -120px'}}>
          <circle cx="-120" cy="-120" r="22"  fill="none" stroke={c(a,0.14)} strokeWidth="1.5" strokeDasharray="2 5"/>
        </g>
        {([
          [-20,-20,-210,-95],[-20,-20,-95,-220],[-70,-10,-240,-80],[-10,-100,-210,-220],
        ] as number[][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} className="sa-draw" x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c(p,0.18)} strokeWidth="1.5"
            style={{animationDelay:`${0.2+i*0.1}s`}} />
        ))}
        <polygon className="sa-draw" points="-45,-55 -145,-100 -90,-190"
          fill="none" stroke={c(p,0.18)} strokeWidth="1.5"
          style={{animationDelay:'0.4s'}} />
        {([
          [-168,-65,3],[-135,-158,2.5],[-65,-140,3.5],[-195,-170,2.5],[-55,-75,2.5],[-200,-100,2],[-90,-195,2.5],
        ] as number[][]).map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={c(i%3===0 ? a : p, i%2===0 ? 0.30 : 0.18)} />
        ))}
        <g className="sa-float-b" style={{transformOrigin:'-55px -75px'}}>
          <rect x="-63" y="-83" width="16" height="16" transform="rotate(45 -55 -75)"
            fill="none" stroke={c(g,0.45)} strokeWidth="2"/>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 7 - BOTTOM-LEFT CORNER
      ═══════════════════════════════════════════════ */}
      <g transform="translate(-30,730)">
        <g className="sa-spin-md"  style={{transformOrigin:'120px -120px'}}>
          <circle cx="120" cy="-120" r="98"  fill="none" stroke={c(p,0.16)} strokeWidth="1.5" strokeDasharray="10 14"/>
        </g>
        <g className="sa-spin-xs"  style={{transformOrigin:'120px -120px'}}>
          <circle cx="120" cy="-120" r="66"  fill="none" stroke={c(a,0.22)} strokeWidth="2"   strokeDasharray="8 10"/>
        </g>
        <g className="sa-spin-sm"  style={{transformOrigin:'120px -120px'}}>
          <circle cx="120" cy="-120" r="40"  fill="none" stroke={c(p,0.14)} strokeWidth="1.5" strokeDasharray="3 6"/>
        </g>
        {([
          [20,-20,220,-75],[20,-20,95,-230],[70,-10,250,-85],[10,-110,230,-230],
        ] as number[][]).map(([x1,y1,x2,y2],i) => (
          <line key={i} className="sa-draw" x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c(p,0.18)} strokeWidth="1.5"
            style={{animationDelay:`${0.1+i*0.1}s`}} />
        ))}
        <polygon className="sa-draw" points="35,-48 135,-92 80,-182"
          fill="none" stroke={c(p,0.20)} strokeWidth="1.5"
          style={{animationDelay:'0.3s'}} />
        {([
          [32,-42,3],[75,-65,2.5],[50,-108,3.5],[130,-86,2.5],[160,-54,3],[90,-168,2.5],[115,-190,2],
        ] as number[][]).map(([cx,cy,r],i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill={c(i%3===0 ? a : p, i%2===0 ? 0.30 : 0.18)} />
        ))}
        <line x1="32"  y1="-42" x2="75"  y2="-65"  stroke={c(p,0.18)} strokeWidth="1.5"/>
        <line x1="75"  y1="-65" x2="130" y2="-86"  stroke={c(p,0.18)} strokeWidth="1.5"/>
        <line x1="50"  y1="-108" x2="90" y2="-168" stroke={c(p,0.14)} strokeWidth="1.5"/>
        <g className="sa-float-c" style={{transformOrigin:'178px -55px'}}>
          <rect x="170" y="-63" width="16" height="16" transform="rotate(45 178 -55)"
            fill="none" stroke={c(g,0.45)} strokeWidth="2"/>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 8 - MID-SECTION ORBIT
      ═══════════════════════════════════════════════ */}
      <g transform="translate(920,350)">
        <g className="sa-spin-md" style={{transformOrigin:'0 0'}}>
          <circle cx="0" cy="0" r="48" fill="none" stroke={c(p,0.16)} strokeWidth="1.5" strokeDasharray="6 10"/>
        </g>
        <g className="sa-spin-sm" style={{transformOrigin:'0 0'}}>
          <circle cx="0" cy="0" r="28" fill="none" stroke={c(a,0.20)} strokeWidth="1.5" strokeDasharray="4 7"/>
        </g>
        <circle cx="0" cy="0" r="6" fill={c(p,0.25)}/>
        <line x1="-70" y1="0"  x2="70"  y2="0"   stroke={c(p,0.14)} strokeWidth="1.5"/>
        <line x1="0"  y1="-70" x2="0"   y2="70"  stroke={c(p,0.14)} strokeWidth="1.5"/>
        <line x1="-50" y1="-50" x2="50" y2="50"  stroke={c(p,0.10)} strokeWidth="1"/>
        <line x1="50"  y1="-50" x2="-50" y2="50" stroke={c(p,0.10)} strokeWidth="1"/>
      </g>

      {/* ═══════════════════════════════════════════════
          LAYER 9 - SCATTERED MICRO-DOTS + FLOATING DIAMONDS
      ═══════════════════════════════════════════════ */}
      {([
        [220,170,2.5],[370,75,2],[510,195,3],[680,105,2.5],[840,195,2.5],
        [990,75,2],[1095,195,2.5],[160,490,3],[310,545,2.5],[460,470,2.5],
        [750,515,2.5],[945,595,3],[1090,490,2.5],[560,420,2],[730,450,2.5],
        [420,300,2],[620,310,2.5],[1010,330,2],
      ] as number[][]).map(([cx,cy,r],i) => (
        <circle key={`md-${i}`} cx={cx} cy={cy} r={r}
          fill={c(i%5===0 ? a : i%4===0 ? g : p, i%3===0 ? 0.24 : 0.14)} />
      ))}

      {([
        [280,130],[760,80],[1040,250],[180,580],[680,610],[1140,430],[460,40],[820,660],
      ] as number[][]).map(([cx,cy],i) => (
        <g key={`fd-${i}`}
          className={i%3===0 ? 'sa-float-a' : i%3===1 ? 'sa-float-b' : 'sa-float-c'}
          style={{transformOrigin:`${cx}px ${cy}px`}}>
          <rect x={cx-6} y={cy-6} width="12" height="12"
            transform={`rotate(45 ${cx} ${cy})`}
            fill="none"
            stroke={c(i%3===0 ? a : i%3===1 ? g : p, 0.32)}
            strokeWidth="1.8" />
        </g>
      ))}
    </svg>
  )
}
