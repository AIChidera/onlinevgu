/* global React, Icon */
const { useState: usePDState, useMemo: usePDMemo } = React;

/* ============================================================
   PROGRAM DETAIL — Online MBA
   ============================================================ */

const SEMESTERS = [
  {
    n: 1, title: 'Semester 1 — Foundations',
    courses: [
      'Principles of Management',
      'Managerial Economics',
      'Business Statistics & Analytics',
      'Financial Accounting',
      'Organizational Behavior',
      'Business Communication',
    ],
  },
  {
    n: 2, title: 'Semester 2 — Core Functions',
    courses: [
      'Marketing Management',
      'Human Resource Management',
      'Operations & Supply Chain',
      'Corporate Finance',
      'Business Research Methods',
      'IT for Managers',
    ],
  },
  {
    n: 3, title: 'Semester 3 — Specialisation Track A',
    courses: [
      'Strategic Management (core)',
      'Specialisation Elective 1',
      'Specialisation Elective 2',
      'Specialisation Elective 3',
      'Business Ethics & Governance',
      'Live Industry Capstone Project — Phase 1',
    ],
  },
  {
    n: 4, title: 'Semester 4 — Specialisation Track B + Capstone',
    courses: [
      'International Business',
      'Specialisation Elective 4',
      'Specialisation Elective 5',
      'Specialisation Elective 6',
      'Live Industry Capstone Project — Phase 2',
      'Final Dissertation & Viva',
    ],
  },
];

const SPECS = [
  { t: 'Marketing & Brand Management', sub: 'Digital, performance, brand strategy', pop: true },
  { t: 'Finance & Investment Banking', sub: 'Equity, FX, valuation, banking', pop: true },
  { t: 'Human Resource Management', sub: 'L&D, talent strategy, comp & benefits' },
  { t: 'Business Analytics', sub: 'SQL, Python, Tableau, A/B testing', pop: true },
  { t: 'Operations & Supply Chain', sub: 'Lean, logistics, procurement' },
  { t: 'IT & Digital Transformation', sub: 'Cloud, product, agile, no-code' },
  { t: 'Healthcare Management', sub: 'Hospital ops, pharma, public health' },
  { t: 'International Business', sub: 'Cross-border, trade, global markets' },
];

const FACULTY = [
  { name: 'Dr. Rajesh Verma', role: 'Programme Director · ex-IIM-A faculty', img: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=240&q=80&auto=format&fit=crop', topic: 'Strategy & Marketing' },
  { name: 'Prof. Anita Kapoor', role: 'Finance Lead · ex-CFO Reliance Capital', img: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=240&q=80&auto=format&fit=crop', topic: 'Corporate Finance' },
  { name: 'Dr. Manish Joshi', role: 'Analytics Chair · PhD, ISB Hyderabad', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&q=80&auto=format&fit=crop', topic: 'Business Analytics' },
  { name: 'Prof. Lakshmi Nair', role: 'HR Lead · ex-VP People, Infosys', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=240&q=80&auto=format&fit=crop', topic: 'HR Management' },
];

const FAQS = [
  { q: 'Is the Online MBA from VGU the same degree as the on-campus MBA?',
    a: 'Yes — the degree certificate, transcript, and convocation are identical. The only difference is the mode of delivery. Online VGU is the digital wing of Vivekananda Global University, and the MBA is delivered by the same faculty under the same UGC entitlement.' },
  { q: 'How is the MBA delivered? Do I need to attend any classes in person?',
    a: 'The entire programme is online. Live interactive sessions are held on Saturdays and Sundays (8pm–10pm IST). All lectures are recorded and available on the LMS for replay. Examinations are proctored online — no campus visits required.' },
  { q: 'What are the eligibility requirements?',
    a: "You need a Bachelor's degree (any stream) from a UGC-recognised university with at least 50% aggregate (45% for SC/ST/OBC). No work experience is mandatory, though candidates with 2+ years of professional experience are encouraged." },
  { q: 'What is the total fee and how does the EMI plan work?',
    a: 'Total programme fee is ₹1,70,000 (₹85,000 per year, payable per semester). No-cost EMI is available through Bajaj Finserv, HDFC, and ICICI — starting at ₹7,084 per month for 24 months. A 5% scholarship is available for early applicants and women candidates.' },
  { q: 'Will Online VGU help with placements?',
    a: "Yes. Our Career Cell partners with 500+ recruiters including TCS, Infosys, Wipro, ICICI Bank, HDFC, and Reliance. Services include resume reviews, mock interviews, LinkedIn optimisation, and exclusive job postings. Our 2024 placement rate was 95% within six months of graduation." },
  { q: 'Can I switch specialisations after admission?',
    a: 'Yes. You can finalise your specialisation at the end of Semester 2 (after the core courses). Switching after that is possible with the Programme Director\'s approval, subject to credit alignment.' },
  { q: 'Is the MBA recognised internationally?',
    a: 'The degree is UGC-entitled and AICTE-approved in India. It is also recognised by the Association of Indian Universities (AIU), making it eligible for further study at universities in 40+ countries including the UK, US, Canada, and Australia.' },
];

/* ============================================================
   ProgramDetail page
   ============================================================ */
const ProgramDetail = ({ navigate, openLeadModal }) => {
  const [tab, setTab] = usePDState('overview');
  const [emi, setEmi] = usePDState(24);
  const [openFaq, setOpenFaq] = usePDState(0);
  const [openSem, setOpenSem] = usePDState(0);

  const totalFee = 170000;
  const monthly = usePDMemo(() => Math.round(totalFee / emi), [emi]);

  const tabs = [
    { id: 'overview', l: 'Overview' },
    { id: 'curriculum', l: 'Curriculum' },
    { id: 'specs', l: 'Specialisations' },
    { id: 'fees', l: 'Fees & EMI' },
    { id: 'faculty', l: 'Faculty' },
    { id: 'faqs', l: 'FAQs' },
  ];

  return (
    <main>
      {/* HERO BAND — dark red */}
      <section className="pd-hero">
        <div className="container">
          <div className="pd-bread">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
            <span>/</span>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Postgraduate</a>
            <span>/</span>
            <span className="pd-bread-current">Online MBA</span>
          </div>

          <div className="pd-hero-grid">
            <div>
              <h1 className="pd-h1">Master of Business Administration <span className="pd-h1-abbr">(MBA)</span></h1>
              <div className="pd-pills">
                <span className="pd-pill">2 Years</span>
                <span className="pd-pill">100% Online</span>
                <span className="pd-pill">UGC-entitled · AICTE-approved</span>
                <span className="pd-pill pd-pill-yellow">Most popular</span>
              </div>
              <p className="pd-lede">
                A rigorous, industry-aligned MBA designed for working professionals. Build strategic thinking, leadership skills, and a global business perspective — without leaving your job. Dual specialisation, live faculty, 240+ Coursera courses included.
              </p>
              <div className="pd-ctas">
                <button className="btn pd-btn-light btn-lg" onClick={() => openLeadModal('Online MBA')}>
                  Apply now <Icon name="arrow-right" size={18} />
                </button>
                <button className="btn pd-btn-ghost btn-lg">
                  <Icon name="download" size={18} /> Download brochure
                </button>
              </div>

              <div className="pd-hero-meta">
                {[
                  ['UGC-entitled', 'Same degree as on-campus'],
                  ['Next batch', 'July 2025'],
                  ['EMI from', '₹7,084/mo · 24 months'],
                ].map(([k, v]) => (
                  <div key={k} className="pd-meta-cell">
                    <div className="pd-meta-k">{k}</div>
                    <div className="pd-meta-v">{v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Apply card */}
            <aside className="pd-apply-card">
              <div className="pd-apply-img">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=720&q=80&auto=format&fit=crop" alt="Online MBA cohort" />
                <div className="pd-apply-overlay">
                  <Icon name="play-circle" size={48} />
                  <span>Watch programme video · 2 min</span>
                </div>
              </div>
              <div className="pd-apply-body">
                <div className="pd-price-row">
                  <span className="pd-fee">₹7,084<small>/mo</small></span>
                  <span className="pd-fee-meta">EMI · 24 months</span>
                </div>
                <div className="pd-price-strike">
                  ₹1,70,000 total · <span style={{textDecoration: 'line-through', color: 'var(--n-400)'}}>₹1,90,000</span>
                </div>
                <div className="pd-perks">
                  {[
                    'No-cost EMI · Bajaj, HDFC, ICICI',
                    '5% scholarship for early applicants',
                    '240+ Coursera courses included',
                    'Resume & placement support · 95% rate',
                  ].map((p) => (
                    <div key={p} className="pd-perk">
                      <Icon name="check" size={16} strokeWidth={2.5} /> {p}
                    </div>
                  ))}
                </div>
                <button className="btn btn-primary btn-block btn-lg" onClick={() => openLeadModal('Online MBA')}>
                  Apply now <Icon name="arrow-right" size={18} />
                </button>
                <button className="btn btn-secondary btn-block">
                  <Icon name="download" size={16} /> Download brochure
                </button>
                <div className="pd-apply-foot">
                  <Icon name="clock" size={14} />
                  <span>Admissions close in <b>21 days</b> · Next batch July 2025</span>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <style>{`
          .pd-hero {
            background: var(--vgu-red-dark);
            color: var(--white);
            padding: 56px 0 72px;
            position: relative; overflow: hidden;
          }
          .pd-hero::before {
            content: ''; position: absolute; top: -20%; right: -10%;
            width: 600px; height: 600px; border-radius: 9999px;
            background: radial-gradient(circle, rgba(255,164,18,0.14) 0%, transparent 60%);
            pointer-events: none;
          }
          .pd-hero::after {
            content: ''; position: absolute; bottom: -30%; left: -10%;
            width: 500px; height: 500px; border-radius: 9999px;
            background: radial-gradient(circle, rgba(238,207,99,0.08) 0%, transparent 60%);
            pointer-events: none;
          }
          .pd-bread {
            font-size: 13px;
            color: rgba(255,255,255,0.65);
            margin-bottom: 20px;
            position: relative; z-index: 1;
            display: flex; align-items: center; gap: 8px;
            font-family: var(--font-body);
          }
          .pd-bread a { color: rgba(255,255,255,0.65); }
          .pd-bread a:hover { color: var(--white); text-decoration: underline; }
          .pd-bread-current { color: var(--white); }

          .pd-hero-grid {
            display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: start;
            position: relative; z-index: 1;
          }
          .pd-h1 {
            color: var(--white);
            font-family: var(--font-heading); font-weight: 800;
            font-size: clamp(36px, 4.4vw, 48px);
            letter-spacing: -1px; line-height: 1.1;
            margin: 0 0 20px;
          }
          .pd-h1-abbr { color: rgba(255,255,255,0.7); font-weight: 700; }
          .pd-pills { display: flex; gap: 8px; flex-wrap: wrap; }
          .pd-pill {
            background: rgba(255,255,255,0.96); color: var(--vgu-red-dark);
            font-family: var(--font-heading); font-weight: 700; font-size: 12px;
            padding: 6px 14px; border-radius: 4px;
            letter-spacing: 0.02em;
          }
          .pd-pill-yellow { background: var(--vgu-yellow); color: var(--n-900); }
          .pd-lede {
            color: rgba(255,255,255,0.88);
            font-size: 17px; line-height: 1.7;
            margin: 24px 0 32px; max-width: 560px;
          }
          .pd-ctas { display: flex; gap: 12px; flex-wrap: wrap; }
          .pd-btn-light {
            background: var(--white); color: var(--vgu-red);
            border-radius: 9999px; padding: 16px 36px;
          }
          .pd-btn-light:hover { background: var(--vgu-beige); color: var(--vgu-red-dark); box-shadow: 0 8px 20px rgba(0,0,0,0.25); }
          .pd-btn-ghost {
            background: transparent; color: var(--white);
            border: 2px solid rgba(255,255,255,0.4);
            border-radius: 8px;
          }
          .pd-btn-ghost:hover { background: rgba(255,255,255,0.1); border-color: var(--white); color: var(--white); }

          .pd-hero-meta {
            display: flex; gap: 32px;
            margin-top: 36px; padding-top: 28px;
            border-top: 1px solid rgba(255,255,255,0.18);
            flex-wrap: wrap;
          }
          .pd-meta-cell { display: flex; flex-direction: column; gap: 4px; }
          .pd-meta-k {
            font-family: var(--font-heading); font-weight: 600;
            font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
            color: var(--vgu-yellow);
          }
          .pd-meta-v {
            font-family: var(--font-heading); font-weight: 700;
            font-size: 15px; color: var(--white);
          }

          .pd-apply-card {
            background: var(--white); border-radius: 24px; overflow: hidden;
            box-shadow: 0 24px 48px rgba(0,0,0,0.30);
            position: sticky; top: 88px;
          }
          .pd-apply-img {
            position: relative; aspect-ratio: 16/10; overflow: hidden; cursor: pointer;
          }
          .pd-apply-img img { width: 100%; height: 100%; object-fit: cover; }
          .pd-apply-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(180deg, transparent 30%, rgba(17,24,39,0.5) 100%);
            display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
            color: var(--white); font-family: var(--font-heading); font-weight: 600; font-size: 14px;
            transition: background 200ms var(--ease);
          }
          .pd-apply-overlay:hover { background: linear-gradient(180deg, rgba(192,64,54,0.3) 0%, rgba(130,26,18,0.6) 100%); }
          .pd-apply-body { padding: 24px; }
          .pd-price-row { display: flex; align-items: baseline; gap: 12px; }
          .pd-fee {
            font-family: var(--font-heading); font-weight: 800;
            color: var(--vgu-red); font-size: 36px; letter-spacing: -1px; line-height: 1;
          }
          .pd-fee small { font-size: 16px; font-weight: 600; color: var(--n-600); }
          .pd-fee-meta { font-size: 13px; color: var(--n-600); font-family: var(--font-heading); font-weight: 600; }
          .pd-price-strike { font-size: 14px; color: var(--n-600); margin-top: 4px; }
          .pd-perks {
            display: flex; flex-direction: column; gap: 10px;
            margin: 20px 0;
            padding-top: 16px; border-top: 1px solid var(--n-200);
          }
          .pd-perk { display: flex; align-items: center; gap: 10px; font-size: 14px; color: var(--n-900); }
          .pd-perk svg { color: #16A34A; flex: none; }
          .pd-apply-card .btn { margin-bottom: 10px; }
          .pd-apply-foot {
            display: flex; align-items: center; gap: 8px;
            font-size: 12px; color: var(--n-600);
            padding-top: 12px; border-top: 1px solid var(--n-200); margin-top: 4px;
          }
          .pd-apply-foot svg { color: var(--vgu-red); }
          .pd-apply-foot b { color: var(--vgu-red); font-family: var(--font-heading); }

          @media (max-width: 1024px) {
            .pd-hero-grid { grid-template-columns: 1fr; gap: 40px; }
            .pd-apply-card { position: static; }
          }
          @media (max-width: 480px) {
            .pd-hero { padding: 40px 0 48px; }
            .pd-h1 { font-size: 32px; }
            .pd-hero-meta { gap: 20px; }
          }
        `}</style>
      </section>

      {/* QUICK FACTS BAR */}
      <section className="pd-facts">
        <div className="container">
          <div className="pd-facts-row">
            {[
              { ic: 'clock', k: 'Duration', v: '2 Years · 4 semesters' },
              { ic: 'wallet', k: 'Total fee', v: '₹1,70,000' },
              { ic: 'trending-up', k: 'EMI from', v: '₹7,084/month' },
              { ic: 'calendar', k: 'Next batch', v: 'July 2025' },
            ].map((f) => (
              <div key={f.k} className="pd-fact">
                <div className="pd-fact-ic"><Icon name={f.ic} size={20} /></div>
                <div>
                  <div className="pd-fact-k">{f.k}</div>
                  <div className="pd-fact-v">{f.v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .pd-facts {
            background: var(--white);
            border-bottom: 1px solid var(--n-200);
            padding: 28px 0;
          }
          .pd-facts-row {
            display: flex; align-items: stretch; justify-content: space-between;
            gap: 8px;
          }
          .pd-fact {
            flex: 1;
            display: flex; align-items: center; gap: 14px;
            padding: 0 24px;
            border-left: 1px solid var(--n-200);
          }
          .pd-fact:first-child { border-left: 0; padding-left: 0; }
          .pd-fact-ic {
            width: 40px; height: 40px; border-radius: 9999px;
            background: rgba(192,64,54,0.10); color: var(--vgu-red);
            display: flex; align-items: center; justify-content: center;
            flex: none;
          }
          .pd-fact-k {
            font-family: var(--font-heading); font-weight: 600;
            font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
            color: var(--n-600);
          }
          .pd-fact-v {
            font-family: var(--font-heading); font-weight: 800;
            font-size: 17px; color: var(--n-900); letter-spacing: -0.2px;
            margin-top: 2px;
          }
          @media (max-width: 1024px) {
            .pd-facts-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
            .pd-fact { border-left: 0; padding: 0; }
          }
          @media (max-width: 480px) {
            .pd-facts-row { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* SECTION TABS */}
      <div className="pd-tabs-bar">
        <div className="container">
          <div className="pd-tabs">
            {tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`} className={tab === t.id ? 'on' : ''}
                 onClick={(e) => { e.preventDefault(); setTab(t.id); document.getElementById(t.id)?.scrollIntoView({block: 'start', behavior: 'smooth'}); }}>
                {t.l}
              </a>
            ))}
          </div>
        </div>
        <style>{`
          .pd-tabs-bar {
            position: sticky; top: 72px; z-index: 40;
            background: rgba(255,255,255,0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid var(--n-200);
          }
          .pd-tabs {
            display: flex; gap: 4px; overflow-x: auto;
            scrollbar-width: none;
          }
          .pd-tabs::-webkit-scrollbar { display: none; }
          .pd-tabs a {
            padding: 18px 20px;
            font-family: var(--font-heading); font-weight: 600; font-size: 14px;
            color: var(--n-600); white-space: nowrap;
            border-bottom: 3px solid transparent;
            transition: all 150ms var(--ease);
          }
          .pd-tabs a:hover { color: var(--vgu-red); text-decoration: none; }
          .pd-tabs a.on { color: var(--vgu-red); border-bottom-color: var(--vgu-red); }
          @media (max-width: 1024px) { .pd-tabs-bar { top: 64px; } }
        `}</style>
      </div>

      {/* OVERVIEW */}
      <section id="overview" className="block bg-white">
        <div className="container">
          <div className="pd-section-grid">
            <div>
              <span className="eyebrow">Programme overview</span>
              <h2 className="mt-1" style={{maxWidth: 620, marginTop: 12}}>
                A 2-year MBA that fits your job, your budget, and your timezone.
              </h2>
              <p className="body-l mt-3" style={{maxWidth: 620}}>
                The Online VGU MBA is built for working professionals and ambitious graduates who want a recognised degree without pausing their career. Earn the same UGC-entitled degree as on-campus students — delivered through weekend live sessions, mobile-friendly recorded lectures, and a real industry capstone in your final semester.
              </p>

              <div className="pd-highlights">
                {[
                  { ic: 'graduation-cap', t: 'UGC-entitled · AICTE-approved', s: 'The degree certificate, transcript, and convocation are identical to on-campus students.' },
                  { ic: 'target', t: 'Dual specialisation', s: 'Choose any 2 from 8 industry-aligned tracks — Marketing, Finance, Analytics, HR, Operations, IT, Healthcare, International Business.' },
                  { ic: 'zap', t: '240+ Coursera courses included', s: 'Google, IBM, Meta, Wharton certifications — free access for the full programme duration.' },
                  { ic: 'lightbulb', t: 'Live industry capstone', s: 'Solve a real business problem with one of our 60+ partner companies in your final semester.' },
                ].map((h) => (
                  <div key={h.t} className="pd-hl">
                    <div className="pd-hl-ic"><Icon name={h.ic} size={20} /></div>
                    <div>
                      <h4>{h.t}</h4>
                      <p className="body">{h.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <aside className="pd-side-card">
              <div className="pd-side-head">
                <span className="eyebrow">At a glance</span>
                <h4>Programme essentials</h4>
              </div>
              <dl className="pd-dl">
                {[
                  ['Degree awarded', 'Master of Business Administration'],
                  ['Duration', '2 years · 4 semesters'],
                  ['Mode', '100% online · weekend live'],
                  ['Specialisations', 'Dual · pick 2 from 8'],
                  ['Eligibility', "Bachelor's, 50% aggregate"],
                  ['Total fee', '₹1,70,000'],
                  ['EMI', 'From ₹7,084/mo (24 months)'],
                  ['Next batch', 'July 2025'],
                  ['Approval', 'UGC · AICTE · NAAC A+'],
                ].map(([k, v]) => (
                  <div key={k} className="pd-dl-row">
                    <dt>{k}</dt><dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>

        <style>{`
          .pd-section-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 56px; align-items: start; }
          .pd-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 40px; }
          .pd-hl { display: flex; gap: 14px; padding: 20px; background: var(--n-50); border-radius: 16px; }
          .pd-hl-ic {
            width: 40px; height: 40px; border-radius: 9999px;
            background: var(--white); color: var(--vgu-red);
            display: flex; align-items: center; justify-content: center;
            border: 1px solid var(--n-200);
            flex: none;
          }
          .pd-hl h4 { margin-bottom: 6px; }
          .pd-side-card {
            background: var(--vgu-beige);
            border-radius: 24px; padding: 32px;
          }
          .pd-side-head { margin-bottom: 16px; }
          .pd-side-head .eyebrow { color: var(--vgu-red-dark); }
          .pd-dl { margin: 0; }
          .pd-dl-row {
            display: flex; justify-content: space-between; align-items: center;
            padding: 14px 0; border-top: 1px solid rgba(130, 26, 18, 0.15);
            gap: 16px;
          }
          .pd-dl-row:first-child { border-top: 0; }
          .pd-dl-row dt { color: var(--n-600); font-size: 13px; }
          .pd-dl-row dd {
            margin: 0; text-align: right; font-family: var(--font-heading); font-weight: 700;
            color: var(--n-900); font-size: 14px;
          }
          @media (max-width: 1024px) {
            .pd-section-grid { grid-template-columns: 1fr; gap: 40px; }
            .pd-highlights { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="block bg-light">
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 40}}>
            <div>
              <span className="eyebrow">Curriculum</span>
              <h2 className="mt-1">Four semesters. One real business problem at the end.</h2>
            </div>
            <button className="btn btn-secondary btn-sm">
              <Icon name="download" size={14} /> Download full syllabus
            </button>
          </div>

          <div className="curriculum">
            {SEMESTERS.map((s, i) => (
              <article key={s.n} className={`semester ${openSem === i ? 'open' : ''}`}>
                <header onClick={() => setOpenSem(openSem === i ? -1 : i)}>
                  <div className="sem-n">{s.n}</div>
                  <div className="sem-title">
                    <h4>{s.title}</h4>
                    <span className="sem-meta">{s.courses.length} courses · 6 credits each</span>
                  </div>
                  <Icon name={openSem === i ? 'minus' : 'plus'} size={20} />
                </header>
                {openSem === i && (
                  <div className="sem-body">
                    <ul>
                      {s.courses.map((c) => (
                        <li key={c}>
                          <Icon name="book-open" size={16} />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .curriculum { display: flex; flex-direction: column; gap: 12px; }
          .semester {
            background: var(--white); border: 1px solid var(--n-200);
            border-radius: 16px; overflow: hidden;
            transition: all 200ms var(--ease);
          }
          .semester:hover { border-color: var(--vgu-red); }
          .semester.open { border-color: var(--vgu-red); box-shadow: 0 4px 16px rgba(192,64,54,0.08); }
          .semester header {
            display: flex; align-items: center; gap: 20px;
            padding: 20px 24px; cursor: pointer;
            color: var(--n-600);
          }
          .semester.open header { background: rgba(192,64,54,0.04); }
          .sem-n {
            width: 40px; height: 40px; border-radius: 9999px;
            background: var(--vgu-red); color: var(--white);
            display: flex; align-items: center; justify-content: center;
            font-family: var(--font-heading); font-weight: 800; font-size: 16px;
            flex: none;
          }
          .semester:not(.open) .sem-n { background: var(--n-200); color: var(--n-600); }
          .sem-title { flex: 1; }
          .sem-title h4 { color: var(--n-900); margin: 0; }
          .sem-meta { font-size: 13px; color: var(--n-600); }
          .sem-body { padding: 0 24px 24px 84px; }
          .sem-body ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
          .sem-body li {
            display: flex; align-items: center; gap: 10px;
            padding: 12px 16px; background: var(--n-50); border-radius: 8px;
            font-size: 14px; color: var(--n-900); font-weight: 500;
          }
          .sem-body li svg { color: var(--vgu-red); flex: none; }
          @media (max-width: 768px) {
            .sem-body { padding: 0 16px 16px 16px; }
            .sem-body ul { grid-template-columns: 1fr; }
            .semester header { padding: 16px; gap: 12px; }
          }
        `}</style>
      </section>

      {/* SPECIALISATIONS */}
      <section id="specs" className="block bg-white">
        <div className="container">
          <div className="block-heading" style={{textAlign: 'left', maxWidth: 720, marginBottom: 48}}>
            <span className="eyebrow">Specialisations</span>
            <h2 className="mt-1">Pick any 2 from 8 industry-aligned tracks.</h2>
            <p className="body-l mt-2">
              Your dual specialisation is finalised at the end of Semester 2. Each track is 6 electives, taught by senior industry practitioners.
            </p>
          </div>

          <div className="spec-grid">
            {SPECS.map((s) => (
              <article key={s.t} className="card hoverable spec-card">
                {s.pop && <span className="tag tag-yellow spec-pop">Most popular</span>}
                <div className="spec-ic">
                  <Icon name="sparkles" size={22} />
                </div>
                <h4>{s.t}</h4>
                <p className="body-s mt-1">{s.sub}</p>
                <a href="#" className="spec-link">View electives <Icon name="arrow-right" size={14} /></a>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .spec-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
          .spec-card { position: relative; padding: 24px; display: flex; flex-direction: column; gap: 6px; }
          .spec-pop { position: absolute; top: 12px; right: 12px; font-size: 10px; padding: 3px 8px; }
          .spec-ic {
            width: 44px; height: 44px; border-radius: 9999px;
            background: rgba(192,64,54,0.10); color: var(--vgu-red);
            display: flex; align-items: center; justify-content: center;
            margin-bottom: 12px;
          }
          .spec-link {
            display: inline-flex; align-items: center; gap: 4px;
            font-family: var(--font-heading); font-weight: 700; font-size: 13px;
            color: var(--vgu-red); margin-top: 12px;
          }
          .spec-link:hover { color: var(--vgu-red-dark); text-decoration: none; gap: 8px; }
          @media (max-width: 1024px) { .spec-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .spec-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* FEES & EMI calculator */}
      <section id="fees" className="block" style={{background: 'var(--vgu-beige)'}}>
        <div className="container">
          <div className="fees-grid">
            <div>
              <span className="eyebrow" style={{color: 'var(--vgu-red-dark)'}}>Fees & EMI</span>
              <h2 className="mt-1">Affordable. Transparent. No-cost EMI.</h2>
              <p className="body-l mt-2" style={{maxWidth: 540}}>
                Total programme fee is <b style={{color: 'var(--n-900)'}}>₹1,70,000</b> for the full 2-year MBA. Pay per semester, or convert to no-cost EMI through our finance partners.
              </p>

              <div className="fee-breakdown">
                {[
                  ['Semester 1', '₹45,000'],
                  ['Semester 2', '₹40,000'],
                  ['Semester 3', '₹45,000'],
                  ['Semester 4', '₹40,000'],
                ].map(([k, v]) => (
                  <div key={k} className="fee-row">
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
                <div className="fee-row total">
                  <span>Total</span>
                  <b>₹1,70,000</b>
                </div>
              </div>

              <div className="fee-perks">
                {['5% scholarship for early applicants', 'Additional 5% for women candidates', 'Refund within 14 days · no questions'].map((p) => (
                  <div key={p} className="fee-perk">
                    <Icon name="check" size={16} strokeWidth={2.5} /> {p}
                  </div>
                ))}
              </div>
            </div>

            {/* EMI calculator */}
            <div className="emi-card">
              <span className="eyebrow">EMI calculator</span>
              <h3 className="mt-1" style={{fontSize: 22, marginTop: 8}}>Plan your monthly payment</h3>

              <div style={{marginTop: 24}}>
                <div className="emi-label-row">
                  <label htmlFor="emi-slider">EMI tenure</label>
                  <span className="emi-tenure">{emi} months</span>
                </div>
                <input id="emi-slider" type="range" min="6" max="36" step="6" value={emi}
                  onChange={(e) => setEmi(parseInt(e.target.value))} className="emi-slider" />
                <div className="emi-ticks">
                  {[6, 12, 18, 24, 30, 36].map((n) => <span key={n}>{n}m</span>)}
                </div>
              </div>

              <div className="emi-results">
                <div className="emi-result emi-result-primary">
                  <span className="emi-rlbl">Monthly EMI</span>
                  <span className="emi-rval">₹{monthly.toLocaleString('en-IN')}</span>
                  <span className="emi-rfoot">No-cost · 0% interest</span>
                </div>
                <div className="emi-result">
                  <span className="emi-rlbl">Total payable</span>
                  <span className="emi-rval">₹{totalFee.toLocaleString('en-IN')}</span>
                  <span className="emi-rfoot">Same as upfront</span>
                </div>
              </div>

              <div className="emi-partners">
                <span>EMI partners</span>
                <div className="emi-partners-row">
                  {['Bajaj Finserv', 'HDFC', 'ICICI', 'Axis'].map((p) => (
                    <span key={p} className="emi-partner">{p}</span>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary btn-block btn-lg" onClick={() => openLeadModal('Online MBA')}>
                Check my EMI eligibility <Icon name="arrow-right" size={18} />
              </button>
            </div>
          </div>
        </div>

        <style>{`
          .fees-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }
          .fee-breakdown {
            background: var(--white); border-radius: 16px; padding: 8px 24px;
            margin-top: 32px;
          }
          .fee-row {
            display: flex; justify-content: space-between; align-items: center;
            padding: 14px 0; border-top: 1px solid var(--n-200);
            font-size: 15px;
          }
          .fee-row:first-child { border-top: 0; }
          .fee-row b { font-family: var(--font-heading); color: var(--n-900); font-size: 16px; }
          .fee-row.total {
            margin-top: 4px;
            background: rgba(192,64,54,0.06); margin-left: -24px; margin-right: -24px;
            padding: 16px 24px;
            border-top: 2px solid var(--vgu-red);
          }
          .fee-row.total span { font-family: var(--font-heading); font-weight: 700; color: var(--n-900); }
          .fee-row.total b { color: var(--vgu-red); font-size: 22px; }
          .fee-perks { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; }
          .fee-perk {
            display: flex; align-items: center; gap: 8px;
            font-size: 14px; color: var(--n-900); font-weight: 500;
          }
          .fee-perk svg { color: #16A34A; flex: none; }

          .emi-card {
            background: var(--white); border-radius: 24px; padding: 32px;
            box-shadow: 0 12px 32px rgba(130,26,18,0.10);
          }
          .emi-label-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
          .emi-label-row label { font-family: var(--font-heading); font-weight: 700; font-size: 14px; color: var(--n-900); }
          .emi-tenure {
            font-family: var(--font-heading); font-weight: 800;
            color: var(--vgu-red); font-size: 18px;
          }
          .emi-slider {
            width: 100%; -webkit-appearance: none; appearance: none;
            height: 6px; border-radius: 9999px;
            background: linear-gradient(to right, var(--vgu-red) 0%, var(--vgu-red) calc((var(--v, 24) - 6) / 30 * 100%), var(--n-200) calc((var(--v, 24) - 6) / 30 * 100%));
            outline: none;
          }
          .emi-slider::-webkit-slider-thumb {
            -webkit-appearance: none; appearance: none;
            width: 24px; height: 24px; border-radius: 9999px;
            background: var(--vgu-red); border: 3px solid var(--white);
            box-shadow: 0 2px 8px rgba(192,64,54,0.4);
            cursor: pointer;
          }
          .emi-slider::-moz-range-thumb {
            width: 24px; height: 24px; border-radius: 9999px;
            background: var(--vgu-red); border: 3px solid var(--white);
            box-shadow: 0 2px 8px rgba(192,64,54,0.4);
            cursor: pointer;
          }
          .emi-ticks { display: flex; justify-content: space-between; margin-top: 8px; font-size: 11px; color: var(--n-600); font-family: var(--font-heading); font-weight: 600; }

          .emi-results { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
          .emi-result {
            background: var(--n-50); border-radius: 12px; padding: 18px;
            display: flex; flex-direction: column; gap: 4px;
          }
          .emi-result-primary { background: rgba(192,64,54,0.08); border: 1px solid rgba(192,64,54,0.2); }
          .emi-rlbl { font-size: 11px; font-family: var(--font-heading); font-weight: 700; color: var(--n-600); text-transform: uppercase; letter-spacing: 0.06em; }
          .emi-rval { font-family: var(--font-heading); font-weight: 800; font-size: 26px; color: var(--n-900); letter-spacing: -0.5px; line-height: 1; margin-top: 4px; }
          .emi-result-primary .emi-rval { color: var(--vgu-red); }
          .emi-rfoot { font-size: 11px; color: var(--n-600); margin-top: 2px; }

          .emi-partners { display: flex; flex-direction: column; gap: 8px; margin: 20px 0 24px; }
          .emi-partners > span { font-family: var(--font-heading); font-weight: 700; font-size: 12px; color: var(--n-600); text-transform: uppercase; letter-spacing: 0.06em; }
          .emi-partners-row { display: flex; gap: 6px; flex-wrap: wrap; }
          .emi-partner {
            font-family: var(--font-heading); font-weight: 700; font-size: 12px;
            color: var(--n-600); padding: 6px 12px;
            background: var(--n-50); border-radius: 4px; border: 1px solid var(--n-200);
          }

          @media (max-width: 1024px) {
            .fees-grid { grid-template-columns: 1fr; gap: 40px; }
          }
          @media (max-width: 480px) {
            .emi-results { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* FACULTY */}
      <section id="faculty" className="block bg-white">
        <div className="container">
          <div className="block-heading" style={{textAlign: 'left', maxWidth: 720, marginBottom: 48}}>
            <span className="eyebrow">Faculty</span>
            <h2 className="mt-1">Learn from the practitioners who built it.</h2>
            <p className="body-l mt-2">
              Our MBA faculty blends PhD academics with senior executives from Reliance, Infosys, ICICI, and the IIMs. Every elective is taught by someone who's done the job.
            </p>
          </div>
          <div className="faculty-grid">
            {FACULTY.map((f) => (
              <article key={f.name} className="card hoverable faculty-card">
                <img src={f.img} alt={f.name} className="faculty-img" />
                <h4 className="mt-2">{f.name}</h4>
                <p className="body-s">{f.role}</p>
                <span className="tag tag-beige" style={{marginTop: 12}}>{f.topic}</span>
              </article>
            ))}
          </div>
        </div>

        <style>{`
          .faculty-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
          .faculty-card { padding: 20px; text-align: center; display: flex; flex-direction: column; align-items: center; }
          .faculty-img {
            width: 96px; height: 96px; border-radius: 9999px;
            object-fit: cover; border: 3px solid var(--vgu-beige);
          }
          .faculty-card h4 { margin: 0; }
          .faculty-card p { margin-top: 4px; text-align: center; }
          @media (max-width: 1024px) { .faculty-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .faculty-grid { grid-template-columns: 1fr; } }
        `}</style>
      </section>

      {/* FAQS */}
      <section id="faqs" className="block bg-light">
        <div className="container">
          <div className="faq-grid">
            <div>
              <span className="eyebrow">Frequently asked</span>
              <h2 className="mt-1">Answers to common questions.</h2>
              <p className="body mt-2">Can't find what you need? Talk to an advisor — we'll call within 24 hours.</p>
              <button className="btn btn-primary mt-3" onClick={() => openLeadModal('Online MBA')}>
                <Icon name="phone" size={16} /> Request a callback
              </button>
            </div>

            <div className="faq-list">
              {FAQS.map((f, i) => (
                <article key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="faq-q">
                    <span>{f.q}</span>
                    <Icon name={openFaq === i ? 'minus' : 'plus'} size={20} />
                  </button>
                  {openFaq === i && (
                    <div className="faq-a">
                      <p className="body">{f.a}</p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          .faq-grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 56px; align-items: start; }
          .faq-list { display: flex; flex-direction: column; gap: 12px; }
          .faq-item {
            background: var(--white); border: 1px solid var(--n-200); border-radius: 12px;
            overflow: hidden;
            transition: all 200ms var(--ease);
          }
          .faq-item.open { border-color: var(--vgu-red); }
          .faq-q {
            width: 100%; border: 0; background: transparent;
            padding: 18px 22px; cursor: pointer;
            display: flex; align-items: center; justify-content: space-between; gap: 16px;
            font-family: var(--font-heading); font-weight: 700; font-size: 16px;
            color: var(--n-900); text-align: left;
          }
          .faq-q:hover { color: var(--vgu-red); }
          .faq-item.open .faq-q { background: rgba(192,64,54,0.04); color: var(--vgu-red); }
          .faq-q svg { color: var(--vgu-red); flex: none; }
          .faq-a { padding: 0 22px 22px; }
          @media (max-width: 1024px) { .faq-grid { grid-template-columns: 1fr; gap: 32px; } }
        `}</style>
      </section>

      {/* TAIL CTA */}
      <section style={{background: 'var(--vgu-red-dark)', color: 'var(--white)', padding: '64px 0'}}>
        <div className="container">
          <div className="pd-tail">
            <div>
              <span className="eyebrow" style={{color: 'var(--vgu-yellow)'}}>Ready to apply?</span>
              <h2 style={{color: 'var(--white)', marginTop: 8}}>Your Online MBA starts here.</h2>
              <p className="body-l" style={{color: 'rgba(255,255,255,0.85)', marginTop: 12}}>Free counselling · No obligation · EMI from ₹7,084/mo</p>
            </div>
            <div style={{display: 'flex', gap: 12, flexWrap: 'wrap'}}>
              <button className="btn btn-yellow btn-lg" onClick={() => openLeadModal('Online MBA')}>
                Apply now <Icon name="arrow-right" size={18} />
              </button>
              <button className="btn btn-lg" style={{background: 'transparent', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 8}}>
                <Icon name="download" size={18} /> Download brochure
              </button>
            </div>
          </div>
        </div>
        <style>{`
          .pd-tail { display: flex; align-items: center; justify-content: space-between; gap: 32px; flex-wrap: wrap; }
        `}</style>
      </section>
    </main>
  );
};

window.ProgramDetail = ProgramDetail;
