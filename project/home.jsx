/* global React, Icon, UG_PROGRAMS, PG_PROGRAMS */
const { useState: useHomeState } = React;

/* ============================================================
   PROGRAM DATA — category-coded colors, no photos (Manipal-style)
   ============================================================ */
const PROGRAMS = {
  ug: [
    { code: 'BBA', name: 'Online BBA', sub: 'Bachelor of Business Administration',
      dur: '3 years', fee: '₹45,000/yr', emi: '₹3,749/mo', popular: true,
      color: 'linear-gradient(135deg, #ea580c 0%, #9a3412 100%)',
      icon: 'trending-up', specs: '6 specialisations', tag: 'UGC-entitled' },
    { code: 'BCA', name: 'Online BCA', sub: 'Bachelor of Computer Applications',
      dur: '3 years', fee: '₹50,000/yr', emi: '₹4,166/mo', popular: true,
      color: 'linear-gradient(135deg, #4338ca 0%, #312e81 100%)',
      icon: 'monitor', specs: 'Data Science track', tag: 'UGC-entitled' },
    { code: 'B.Com', name: 'Online B.Com', sub: 'Bachelor of Commerce',
      dur: '3 years', fee: '₹35,000/yr', emi: '₹2,916/mo',
      color: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
      icon: 'wallet', specs: 'Finance & taxation', tag: 'UGC-entitled' },
    { code: 'B.Sc', name: 'Online B.Sc', sub: 'Bachelor of Science',
      dur: '3 years', fee: '₹40,000/yr', emi: '₹3,333/mo',
      color: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
      icon: 'target', specs: 'Maths / Statistics', tag: 'UGC-entitled' },
    { code: 'B.Lib', name: 'Online B.Lib', sub: 'Bachelor of Library Science',
      dur: '1 year', fee: '₹35,000/yr', emi: '₹2,916/mo',
      color: 'linear-gradient(135deg, #d97706 0%, #78350f 100%)',
      icon: 'book-open', specs: 'Info science', tag: 'UGC-entitled' },
  ],
  pg: [
    { code: 'MBA', name: 'Online MBA', sub: 'Master of Business Administration',
      dur: '2 years', fee: '₹85,000/yr', emi: '₹7,084/mo', popular: true,
      color: 'linear-gradient(135deg, #C04036 0%, #821a12 100%)',
      icon: 'briefcase', specs: 'Dual specialisation', tag: 'AICTE-approved', goPage: 'program' },
    { code: 'MBA-HC', name: 'MBA in Healthcare', sub: 'MBA — Healthcare Management',
      dur: '2 years', fee: '₹90,000/yr', emi: '₹7,500/mo',
      color: 'linear-gradient(135deg, #be185d 0%, #831843 100%)',
      icon: 'shield-check', specs: 'Industry-aligned', tag: 'New for 2025' },
    { code: 'MCA', name: 'Online MCA', sub: 'Master of Computer Applications',
      dur: '2 years', fee: '₹70,000/yr', emi: '₹5,833/mo', popular: true,
      color: 'linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)',
      icon: 'monitor', specs: 'Cloud & AI', tag: 'AICTE-approved' },
    { code: 'M.Com', name: 'Online M.Com', sub: 'Master of Commerce',
      dur: '2 years', fee: '₹50,000/yr', emi: '₹4,166/mo',
      color: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
      icon: 'wallet', specs: 'Accounting & finance', tag: 'UGC-entitled' },
    { code: 'MA', name: 'Online MA', sub: 'Master of Arts',
      dur: '2 years', fee: '₹45,000/yr', emi: '₹3,749/mo',
      color: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)',
      icon: 'book-open', specs: 'English / Psychology', tag: 'UGC-entitled' },
    { code: 'M.Lib', name: 'Online M.Lib', sub: 'Master of Library Science',
      dur: '1 year', fee: '₹40,000/yr', emi: '₹3,333/mo',
      color: 'linear-gradient(135deg, #b45309 0%, #78350f 100%)',
      icon: 'book-open', specs: 'Digital library', tag: 'UGC-entitled' },
  ],
};

window.PROGRAMS = PROGRAMS;

/* ============================================================
   HERO  —  bolder photo + warm background art
   ============================================================ */
const Hero = ({ openLeadModal, navigate }) => (
  <section className="hero-section">
    {/* Decorative background art */}
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-blob hero-blob-orange"></div>
      <div className="hero-blob hero-blob-beige"></div>
      <svg className="hero-dots" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid">
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#C04036" opacity="0.5"></circle>
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#dotgrid)"></rect>
      </svg>
      <svg className="hero-curl" viewBox="0 0 240 120" fill="none">
        <path d="M10 80 C 50 20, 110 110, 160 50 S 230 30, 232 12" stroke="#eecf63" strokeWidth="3" strokeLinecap="round" strokeDasharray="0 1"/>
        <path d="M225 16 L 232 12 L 226 22" stroke="#eecf63" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>

    <div className="container">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow-row">
            <span className="tag tag-red">UGC-Entitled</span>
            <span className="tag tag-yellow">NAAC A+</span>
            <span className="tag" style={{background: 'var(--n-100)', color: 'var(--n-600)'}}>AICTE-approved</span>
          </div>
          <h1 className="hero-h1">
            Learn online.<br/>Earn a degree that<br/><em>opens doors.</em>
          </h1>
          <p className="body-l hero-lede">
            Join 50,000+ learners across 40+ countries. World-class faculty, flexible schedules, and UGC-entitled degrees — all 100% online, from Vivekananda Global University.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary btn-lg" onClick={openLeadModal}>
              Apply now <Icon name="arrow-right" size={18} />
            </button>
            <button className="btn btn-secondary btn-lg">
              <Icon name="download" size={18} /> Download brochure
            </button>
          </div>
          <div className="hero-meta">
            <div className="hero-meta-item">
              <Icon name="star" size={16} />
              <span><b>4.8 / 5</b> Student rating</span>
            </div>
            <div className="hero-meta-item">
              <Icon name="users" size={16} />
              <span><b>50,000+</b> learners</span>
            </div>
            <div className="hero-meta-item">
              <Icon name="award" size={16} />
              <span>Est. <b>2012</b> · NAAC A+</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-shape" aria-hidden="true"></div>
          <svg className="hero-ring" aria-hidden="true" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="96" stroke="#eecf63" strokeWidth="2" strokeDasharray="4 8" opacity="0.7"/>
          </svg>

          <div className="hero-frame">
            <div className="hero-frame-clip">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop" alt="Online VGU students" />
              <div className="hero-overlay"></div>
              <div className="hero-badges">
                <img src="assets/badge-ugc.svg" alt="UGC" />
                <img src="assets/badge-naac.svg" alt="NAAC" />
                <img src="assets/badge-aicte.svg" alt="AICTE" />
              </div>
            </div>
            <div className="hero-floater hero-floater-tl">
              <div className="ff-num">50,000+</div>
              <div className="ff-lbl">Learners enrolled</div>
            </div>
            <div className="hero-floater hero-floater-br">
              <div className="ff-stars">
                <Icon name="star" size={14} />
                <Icon name="star" size={14} />
                <Icon name="star" size={14} />
                <Icon name="star" size={14} />
                <Icon name="star" size={14} />
              </div>
              <div className="ff-num" style={{fontSize: 18, marginTop: 4}}>4.8 / 5</div>
              <div className="ff-lbl">12,400+ reviews</div>
            </div>
            <div className="hero-floater hero-floater-bl-pulse">
              <span className="pulse-dot"></span>
              <div>
                <div className="ff-pulse-top">Live now</div>
                <div className="ff-pulse-sub">Counsellor available · WhatsApp</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .hero-section {
        background: linear-gradient(180deg, #FBF1E6 0%, #FFF8F0 60%, var(--white) 100%);
        padding: 72px 0 88px;
        position: relative;
        overflow: hidden;
      }

      /* ============ Background art ============ */
      .hero-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
      .hero-blob {
        position: absolute;
        border-radius: 9999px;
        filter: blur(60px);
        opacity: 0.6;
      }
      .hero-blob-orange {
        right: -8%; top: -20%;
        width: 520px; height: 520px;
        background: radial-gradient(circle, rgba(255,164,18,0.40) 0%, transparent 70%);
      }
      .hero-blob-beige {
        left: -10%; bottom: -30%;
        width: 480px; height: 480px;
        background: radial-gradient(circle, rgba(244,215,193,0.85) 0%, transparent 70%);
      }
      .hero-dots {
        position: absolute;
        left: 4%; top: 24%;
        width: 220px; height: 220px;
        opacity: 0.20;
      }
      .hero-curl {
        position: absolute;
        right: 4%; bottom: 14%;
        width: 200px; height: 110px;
        opacity: 0.85;
      }

      /* ============ Grid ============ */
      .hero-grid {
        display: grid; grid-template-columns: 1.05fr 1fr;
        gap: 56px; align-items: center;
        position: relative; z-index: 1;
      }
      .hero-copy { display: flex; flex-direction: column; }
      .hero-eyebrow-row { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
      .hero-h1 {
        font-family: var(--font-heading);
        font-size: 64px;
        font-weight: 800;
        letter-spacing: -1.5px;
        line-height: 1.04;
        color: var(--n-900);
      }
      .hero-h1 em {
        font-style: normal;
        color: var(--vgu-red);
        background: linear-gradient(120deg, transparent 0%, transparent 6%, rgba(238,207,99,0.55) 6%, rgba(238,207,99,0.55) 94%, transparent 94%);
        padding: 0 8px;
      }
      .hero-lede { margin: 24px 0 32px; max-width: 540px; }
      .hero-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
      .hero-meta {
        display: flex; gap: 24px;
        margin-top: 32px; padding-top: 24px;
        border-top: 1px solid rgba(192,64,54,0.12);
        flex-wrap: wrap;
      }
      .hero-meta-item {
        display: flex; align-items: center; gap: 8px;
        font-size: 14px; color: var(--n-600);
      }
      .hero-meta-item b { color: var(--n-900); font-weight: 700; font-family: var(--font-heading); }
      .hero-meta-item svg { color: var(--vgu-red); }

      /* ============ Visual ============ */
      .hero-visual { position: relative; min-height: 540px; }
      .hero-shape {
        position: absolute;
        top: 12%; left: 8%; right: -4%; bottom: -4%;
        background: linear-gradient(135deg, var(--vgu-red) 0%, var(--vgu-red-dark) 100%);
        border-radius: 56% 44% 60% 40% / 50% 56% 44% 50%;
        opacity: 0.92;
        z-index: 0;
      }
      .hero-ring {
        position: absolute;
        top: -12px; right: -16px;
        width: 220px; height: 220px;
        z-index: 0;
        animation: heroSpin 60s linear infinite;
      }
      @keyframes heroSpin { to { transform: rotate(360deg); } }

      .hero-frame {
        position: relative;
        aspect-ratio: 4 / 5;
        z-index: 1;
        margin-left: 24px;
      }
      .hero-frame-clip {
        position: absolute; inset: 0;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: 0 32px 64px rgba(130,26,18,0.30);
      }
      .hero-frame-clip img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .hero-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(180deg, transparent 50%, rgba(130,26,18,0.30) 100%);
      }

      .hero-floater {
        position: absolute;
        background: var(--white);
        padding: 14px 18px;
        border-radius: 16px;
        box-shadow: 0 16px 32px rgba(17,24,39,0.16);
        animation: floatY 5s var(--ease) infinite;
        z-index: 2;
      }
      @keyframes floatY {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .hero-floater-tl { top: 32px; left: -24px; }
      .hero-floater-br { bottom: 96px; right: -24px; animation-delay: 1.2s; }
      .hero-floater-bl-pulse {
        bottom: 16px; left: -20px;
        display: flex; align-items: center; gap: 10px;
        padding: 10px 14px;
        animation-delay: 0.6s;
      }
      .pulse-dot {
        width: 10px; height: 10px; border-radius: 9999px;
        background: #16A34A; position: relative; flex: none;
      }
      .pulse-dot::after {
        content: ''; position: absolute; inset: -4px;
        border-radius: 9999px; background: #16A34A; opacity: 0.4;
        animation: pulseRing 1.6s var(--ease) infinite;
      }
      @keyframes pulseRing {
        0% { transform: scale(0.6); opacity: 0.6; }
        100% { transform: scale(2); opacity: 0; }
      }
      .ff-pulse-top { font-family: var(--font-heading); font-weight: 700; font-size: 13px; color: var(--n-900); }
      .ff-pulse-sub { font-size: 11px; color: var(--n-600); }

      .ff-num { font-family: var(--font-heading); font-weight: 800; font-size: 22px; color: var(--vgu-red); letter-spacing: -0.5px; line-height: 1; }
      .ff-lbl { font-size: 12px; color: var(--n-600); margin-top: 4px; font-weight: 500; }
      .ff-stars { display: flex; gap: 1px; color: var(--vgu-yellow); }

      .hero-badges {
        position: absolute; bottom: 16px; left: 16px;
        display: flex; gap: 8px;
        background: rgba(255,255,255,0.96); padding: 10px 14px; border-radius: 12px;
        backdrop-filter: blur(8px);
      }
      .hero-badges img { width: 40px; height: 40px; }

      /* ============ Animations ============ */
      @keyframes heroIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: none; }
      }
      .hero-copy > * { animation: heroIn 600ms var(--ease) backwards; }
      .hero-copy > *:nth-child(1) { animation-delay: 60ms; }
      .hero-copy > *:nth-child(2) { animation-delay: 140ms; }
      .hero-copy > *:nth-child(3) { animation-delay: 220ms; }
      .hero-copy > *:nth-child(4) { animation-delay: 300ms; }
      .hero-copy > *:nth-child(5) { animation-delay: 380ms; }
      .hero-visual { animation: heroIn 700ms var(--ease) 240ms backwards; }
      @media (prefers-reduced-motion: reduce) {
        .hero-copy > *, .hero-visual, .hero-ring { animation: none; }
      }

      /* ============ Responsive ============ */
      @media (max-width: 1024px) {
        .hero-grid { grid-template-columns: 1fr; gap: 56px; }
        .hero-h1 { font-size: 56px; }
        .hero-visual { min-height: auto; max-width: 540px; margin: 0 auto; width: 100%; }
        .hero-frame { aspect-ratio: 4 / 4; margin-left: 16px; }
        .hero-floater-tl { left: 12px; }
        .hero-floater-br { right: 12px; }
        .hero-floater-bl-pulse { left: -12px; }
      }
      @media (max-width: 768px) {
        .hero-section { padding: 48px 0 56px; }
        .hero-h1 { font-size: 40px; letter-spacing: -0.5px; line-height: 1.08; }
        .hero-ctas .btn { flex: 1; min-width: 0; }
        .hero-meta { gap: 16px; }
        .hero-floater { padding: 10px 14px; }
        .ff-num { font-size: 18px; }
        .ff-lbl { font-size: 11px; }
        .hero-shape { display: none; }
        .hero-curl { display: none; }
      }
    `}</style>
  </section>
);

window.Hero = Hero;

/* ============================================================
   QUICK-PICK PROGRAM ROW — horizontal chips right under hero
   ============================================================ */
const QuickPickRow = ({ navigate, openLeadModal }) => {
  const picks = [
    { label: 'Online MBA', ic: 'briefcase', page: 'program' },
    { label: 'Online MCA', ic: 'monitor', page: 'home' },
    { label: 'Online BBA', ic: 'trending-up', page: 'home' },
    { label: 'Online BCA', ic: 'zap', page: 'home' },
    { label: 'Online M.Com', ic: 'wallet', page: 'home' },
    { label: 'MBA — Healthcare', ic: 'shield-check', page: 'home' },
  ];
  return (
    <section className="qpr-section">
      <div className="container">
        <div className="qpr-inner">
          <span className="qpr-label">Browse programs</span>
          <div className="qpr-scroll">
            {picks.map((p) => (
              <button key={p.label} className="qpr-pill" onClick={() => navigate(p.page)}>
                <Icon name={p.ic} size={15} />
                {p.label}
                <Icon name="arrow-right" size={13} />
              </button>
            ))}
            <button className="qpr-pill qpr-pill-more" onClick={openLeadModal}>
              All 11 programs <Icon name="arrow-right" size={13} />
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .qpr-section {
          background: var(--white);
          border-bottom: 1px solid var(--n-200);
          padding: 14px 0;
        }
        .qpr-inner {
          display: flex; align-items: center; gap: 20px;
        }
        .qpr-label {
          font-family: var(--font-heading); font-weight: 700; font-size: 12px;
          color: var(--n-400); text-transform: uppercase; letter-spacing: 0.08em;
          white-space: nowrap; flex: none;
        }
        .qpr-scroll {
          display: flex; gap: 8px; overflow-x: auto;
          scrollbar-width: none; padding: 2px 0;
        }
        .qpr-scroll::-webkit-scrollbar { display: none; }
        .qpr-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px;
          background: var(--n-50); border: 1.5px solid var(--n-200);
          border-radius: 9999px; cursor: pointer;
          font-family: var(--font-heading); font-weight: 600; font-size: 13px;
          color: var(--n-700); white-space: nowrap;
          transition: all 150ms var(--ease);
          --n-700: #374151;
        }
        .qpr-pill:hover {
          border-color: var(--vgu-red); color: var(--vgu-red);
          background: rgba(192,64,54,0.04);
          transform: translateY(-1px);
        }
        .qpr-pill svg { color: var(--vgu-red); flex: none; }
        .qpr-pill .icon:last-child { opacity: 0.5; }
        .qpr-pill:hover .icon:last-child { opacity: 1; }
        .qpr-pill-more {
          background: var(--vgu-red); border-color: var(--vgu-red);
          color: var(--white);
        }
        .qpr-pill-more:hover {
          background: var(--vgu-red-dark); border-color: var(--vgu-red-dark);
          color: var(--white);
        }
        .qpr-pill-more svg { color: var(--white); }
        @media (max-width: 768px) {
          .qpr-label { display: none; }
        }
      `}</style>
    </section>
  );
};
window.QuickPickRow = QuickPickRow;

/* ============================================================
   PROGRAM GRID — Manipal-style colored card backgrounds
   ============================================================ */
const ProgramGrid = ({ navigate, openLeadModal }) => {
  const [tab, setTab] = useHomeState('pg');
  const items = PROGRAMS[tab];

  return (
    <section className="block bg-light">
      <div className="container">
        <div className="block-heading">
          <span className="eyebrow">Programs</span>
          <h2 className="mt-1">UGC-entitled degrees, built for outcomes</h2>
          <p className="body-l mt-2" style={{maxWidth: 640, margin: '16px auto 0'}}>
            Choose from 11 programs across undergraduate and postgraduate streams. All degrees recognised across India and accepted by employers worldwide.
          </p>
        </div>

        <div className="tabs-wrap">
          <div className="prog-tabs">
            <button className={tab === 'pg' ? 'on' : ''} onClick={() => setTab('pg')}>
              Postgraduate <span className="ct">{PROGRAMS.pg.length}</span>
            </button>
            <button className={tab === 'ug' ? 'on' : ''} onClick={() => setTab('ug')}>
              Undergraduate <span className="ct">{PROGRAMS.ug.length}</span>
            </button>
          </div>
        </div>

        <div className="prog-grid">
          {items.map((p) => (
            <article key={p.code} className="prog-card"
              onClick={() => p.goPage && navigate(p.goPage)}
              style={{cursor: p.goPage ? 'pointer' : 'default'}}>
              {/* Colored header */}
              <div className="prog-head" style={{background: p.color}}>
                <div className="prog-head-tags">
                  <span className="prog-tag-white">{p.tag}</span>
                  {p.popular && <span className="prog-tag-warm">Popular</span>}
                </div>
                <div className="prog-head-icon">
                  <Icon name={p.icon} size={26} />
                </div>
                <div className="prog-code">{p.code}</div>
              </div>
              {/* Card body */}
              <div className="prog-body">
                <h3 className="h4">{p.name}</h3>
                <p className="body-s" style={{marginTop: 4, color: 'var(--n-600)'}}>{p.sub}</p>
                <div className="prog-meta">
                  <span className="pill-meta"><Icon name="clock" size={14} /> {p.dur}</span>
                  <span className="pill-meta"><Icon name="sparkles" size={14} /> {p.specs}</span>
                </div>
                <div className="prog-foot">
                  <div>
                    <div className="prog-emi-label">EMI from</div>
                    <div className="prog-emi">{p.emi}</div>
                  </div>
                  <a href="#" className="prog-link" onClick={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    p.goPage ? navigate(p.goPage) : openLeadModal(p.name);
                  }}>
                    View program <Icon name="arrow-right" size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{textAlign: 'center', marginTop: 48}}>
          <button className="btn btn-secondary" onClick={openLeadModal}>
            Not sure which program? Talk to an advisor <Icon name="arrow-right" size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .block-heading { text-align: center; margin-bottom: 48px; }
        .tabs-wrap { display: flex; justify-content: center; margin-bottom: 40px; }
        .prog-tabs {
          display: inline-flex; padding: 4px; gap: 4px;
          background: var(--n-100); border-radius: 9999px;
          border: 1px solid var(--n-200);
        }
        .prog-tabs button {
          padding: 10px 22px; border: 0; background: transparent;
          font-family: var(--font-heading); font-weight: 600; font-size: 14px;
          color: var(--n-600); cursor: pointer;
          border-radius: 9999px;
          display: inline-flex; align-items: center; gap: 8px;
          transition: all 200ms var(--ease);
        }
        .prog-tabs button:hover { color: var(--n-900); }
        .prog-tabs button.on { background: var(--vgu-red); color: var(--white); box-shadow: 0 2px 8px rgba(192,64,54,0.25); }
        .prog-tabs .ct {
          font-size: 11px; background: rgba(255,255,255,0.18);
          padding: 1px 8px; border-radius: 9999px;
        }
        .prog-tabs button:not(.on) .ct { background: var(--n-200); color: var(--n-600); }

        .prog-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
        }

        /* Card shell */
        .prog-card {
          background: var(--white);
          border: 1px solid var(--n-200);
          border-radius: 16px;
          overflow: hidden;
          display: flex; flex-direction: column;
          transition: transform 220ms var(--ease), box-shadow 220ms var(--ease), border-color 220ms var(--ease);
        }
        .prog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(17,24,39,0.12);
          border-color: transparent;
        }

        /* Colored header */
        .prog-head {
          position: relative;
          height: 140px;
          padding: 16px;
          display: flex; flex-direction: column; justify-content: space-between;
          overflow: hidden;
        }
        /* Subtle dot-grid overlay on colored header */
        .prog-head::after {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.20) 1px, transparent 1.5px);
          background-size: 18px 18px;
          pointer-events: none;
        }
        .prog-head-tags {
          display: flex; gap: 6px; flex-wrap: wrap;
          position: relative; z-index: 1;
        }
        .prog-tag-white {
          background: rgba(255,255,255,0.92); color: var(--n-900);
          font-family: var(--font-heading); font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px;
        }
        .prog-tag-warm {
          background: var(--vgu-yellow); color: var(--n-900);
          font-family: var(--font-heading); font-size: 10px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 4px;
        }
        .prog-head-icon {
          position: absolute; top: 50%; right: 20px;
          transform: translateY(-50%);
          width: 52px; height: 52px; border-radius: 12px;
          background: rgba(255,255,255,0.18);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.95);
          z-index: 1;
          transition: background 200ms var(--ease), transform 200ms var(--ease);
        }
        .prog-card:hover .prog-head-icon {
          background: rgba(255,255,255,0.28);
          transform: translateY(-50%) scale(1.08);
        }
        .prog-code {
          font-family: var(--font-heading); font-weight: 900;
          font-size: 22px; color: rgba(255,255,255,0.95);
          letter-spacing: -0.5px;
          position: relative; z-index: 1;
        }

        /* Card body */
        .prog-body {
          padding: 20px; display: flex; flex-direction: column; gap: 10px; flex: 1;
        }
        .prog-meta { display: flex; gap: 6px; flex-wrap: wrap; }
        .prog-foot {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; margin-top: auto;
          border-top: 1px solid var(--n-200);
        }
        .prog-emi-label {
          font-family: var(--font-heading); font-size: 11px; font-weight: 600;
          color: var(--n-600); letter-spacing: 0.04em; text-transform: uppercase;
        }
        .prog-emi {
          font-family: var(--font-heading); font-weight: 800;
          color: var(--vgu-red); font-size: 18px;
        }
        .prog-link {
          display: inline-flex; align-items: center; gap: 4px;
          color: var(--vgu-red); font-family: var(--font-heading);
          font-weight: 700; font-size: 13px;
          transition: gap 150ms var(--ease), color 150ms var(--ease);
        }
        .prog-link:hover { color: var(--vgu-red-dark); text-decoration: none; gap: 8px; }

        @media (max-width: 1024px) { .prog-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .prog-grid { grid-template-columns: 1fr; gap: 16px; } }
      `}</style>
    </section>
  );
};
window.ProgramGrid = ProgramGrid;
