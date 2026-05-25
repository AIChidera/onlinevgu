/* global React, Icon */
const { useState: useH2State } = React;

/* ============================================================
   TRUST BAR — accreditations strip under hero (with logos)
   ============================================================ */
const TrustBar = () => {
  const items = [
  { logo: 'assets/badge-naac.svg', value: 'NAAC A+', label: 'Accredited', alt: 'NAAC' },
  { logo: 'assets/badge-ugc.svg', value: 'UGC · DEB', label: 'Entitled', alt: 'UGC' },
  { logo: 'assets/badge-aicte.svg', value: 'AICTE', label: 'Approved', alt: 'AICTE' },
  { logo: 'assets/badge-qs.svg', value: 'QS Asia', label: 'Ranked 2024', alt: 'QS Asia University Rankings' },
  { logo: 'assets/badge-coursera.svg', value: 'Coursera', label: 'Official partner', alt: 'Coursera', brand: '#0056D2' }];

  return (
    <section className="trust-bar">
      <div className="container">
        <div className="trust-row">
          {items.map((it) =>
          <div key={it.value} className="trust-item">
              <img src={it.logo} alt={it.alt} />
              <div className="t-text">
                <span className="t-value" style={it.brand ? { color: it.brand } : null}>{it.value}</span>
                <span className="t-label">{it.label}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        .trust-bar {
          background: var(--white);
          border-top: 1px solid var(--n-200);
          border-bottom: 1px solid var(--n-200);
          padding: 24px 0;
        }
        .trust-row {
          display: flex; justify-content: space-between; align-items: center;
          gap: 8px;
        }
        .trust-item {
          flex: 1;
          display: flex; align-items: center; gap: 14px;
          padding: 0 16px;
          border-left: 1px solid var(--n-200);
          min-height: 56px;
        }
        .trust-item:first-child { border-left: 0; padding-left: 0; }
        .trust-item img {
          width: 48px; height: 48px; flex: none;
          transition: transform 200ms var(--ease);
        }
        .trust-item:hover img { transform: scale(1.06); }
        .t-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .t-value {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 16px; color: var(--n-900); letter-spacing: -0.2px;
          line-height: 1.1;
        }
        .t-label {
          font-family: var(--font-body);
          font-size: 12px; color: var(--n-600);
        }
        @media (max-width: 900px) {
          .trust-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
          .trust-item { border-left: 0; padding: 0; }
          .trust-item:nth-child(5) { grid-column: 1 / -1; padding-top: 12px; border-top: 1px solid var(--n-200); }
        }
        @media (max-width: 480px) {
          .trust-item img { width: 40px; height: 40px; }
          .t-value { font-size: 14px; }
          .t-label { font-size: 11px; }
        }
      `}</style>
    </section>);

};
window.TrustBar = TrustBar;

/* ============================================================
   IMPACT STATS — gold numbers on cards
   ============================================================ */
const StatStrip = () => {
  const stats = [
  { n: '50,000+', l: 'Learners enrolled', ic: 'users' },
  { n: '40+', l: 'Countries represented', ic: 'globe' },
  { n: '95%', l: 'Placement assistance rate', ic: 'briefcase' },
  { n: '11', l: 'UGC-entitled programs', ic: 'graduation-cap' }];

  return (
    <section className="block bg-light">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Our impact</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Numbers that speak for themselves</h2>
        </div>
        <div className="stat-grid">
          {stats.map((s) =>
          <article key={s.l} className="stat-tile">
              <div className="stat-ic"><Icon name={s.ic} size={20} /></div>
              <div className="stat-num">{s.n}</div>
              <div className="stat-lbl">{s.l}</div>
            </article>
          )}
        </div>
      </div>
      <style>{`
        .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .stat-tile {
          background: var(--white);
          border-radius: 16px;
          padding: 32px 24px;
          text-align: left;
          box-shadow: 0 2px 12px rgba(17,24,39,0.06);
          position: relative;
          transition: all 220ms var(--ease);
        }
        .stat-tile:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(192,64,54,0.12); }
        .stat-ic {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(238,207,99,0.20); color: #B57208;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 16px;
        }
        .stat-num {
          font-family: var(--font-heading); font-weight: 800;
          font-size: 48px; line-height: 1; letter-spacing: -1.5px;
          background: linear-gradient(135deg, #eecf63 0%, #d6ad3b 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .stat-lbl {
          color: var(--n-600);
          font-size: 15px; font-weight: 500; margin-top: 8px;
        }
        @media (max-width: 1024px) { .stat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .stat-num { font-size: 40px; } }
      `}</style>
    </section>);

};
window.StatStrip = StatStrip;

/* ============================================================
   WHY VGU — 6 feature cards
   ============================================================ */
const WhyVGU = () => {
  const reasons = [
  { ic: 'shield-check', t: 'UGC-recognised degrees', s: 'Government-recognised credentials, fully accepted by employers across India and recognised in 40+ countries.' },
  { ic: 'graduation-cap', t: 'Expert faculty', s: 'Learn from PhD academics and senior practitioners at TCS, Infosys, ICICI, Reliance, and the IIMs.' },
  { ic: 'monitor', t: '100% online', s: 'Mobile-friendly LMS, live weekend classes, recorded lectures. No campus visits — ever.' },
  { ic: 'book-open', t: 'Coursera included', s: 'Free access to 7,000+ courses on Coursera as part of your VGU enrolment — Google, IBM, Meta, more.' },
  { ic: 'briefcase', t: 'Placement support', s: 'Dedicated career cell with 500+ hiring partners, resume reviews, and a 95% placement rate.' },
  { ic: 'clock', t: 'Flexible schedule', s: 'Live and recorded sessions. Study at your own pace — no deadline pressure for working professionals.' }];


  return (
    <section className="block bg-white has-ornament" data-ornament="curl-tr" data-stroke>
      {/* Sparkle cluster bottom-left */}
      <svg className="stroke-svg" style={{ bottom: '8%', left: '4%', width: 140, height: 120 }} viewBox="0 0 140 120" fill="none" aria-hidden="true">
        <path className="sp-1" d="M 30 20 V 50 M 15 35 H 45" stroke="#C04036" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
        <path className="sp-2" d="M 80 80 V 110 M 65 95 H 95" stroke="#C04036" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <path className="sp-3" d="M 100 30 V 50 M 90 40 H 110" stroke="#eecf63" strokeWidth="2.2" strokeLinecap="round" opacity="0.85" />
        <circle className="sp-4" cx="60" cy="60" r="14" fill="none" stroke="#eecf63" strokeWidth="2" opacity="0.55" strokeDasharray="3 5" />
      </svg>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
          <span className="eyebrow">WHY STUDENTS CHOOSE US</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Everything you need to succeed online</h2>
          <p className="body-l mt-2" style={{ marginTop: 16 }}>
            Online VGU is the digital wing of Vivekananda Global University, Jaipur — NAAC A+ accredited and recognised by UGC, AICTE, and BCI.
          </p>
        </div>

        <div className="why-grid">
          {reasons.map((r) =>
          <article key={r.t} className="why-card line-art-card">
              <span className="la-corner" aria-hidden="true">
                <svg viewBox="0 0 48 48" fill="none" stroke="#C04036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 32 Q 16 12, 32 16 L 28 8 M 32 16 L 24 22" />
                </svg>
              </span>
              <div className="why-icon">
                <Icon name={r.ic} size={22} />
              </div>
              <h4>{r.t}</h4>
              <p className="body">{r.s}</p>
            </article>
          )}
        </div>
      </div>

      <style>{`
        .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .why-card {
          background: var(--white); border: 1px solid var(--n-200); border-radius: 16px;
          padding: 28px;
          display: flex; flex-direction: column;
          transition: all 200ms var(--ease);
        }
        .why-card:hover {
          border-color: var(--vgu-red);
          box-shadow: 0 8px 24px rgba(192,64,54,0.10);
        }
        .why-icon {
          width: 48px; height: 48px; border-radius: 12px;
          background: rgba(192,64,54,0.10); color: var(--vgu-red);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px;
        }
        .why-card h4 { margin: 0 0 8px; }
        .why-card p { margin: 0; font-size: 15px; line-height: 1.6; }
        @media (max-width: 1024px) { .why-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .why-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>);

};
window.WhyVGU = WhyVGU;

/* ============================================================
   COURSERA BANNER (beige, with stat card)
   ============================================================ */
const CourseraBlock = ({ openLeadModal }) =>
<section className="block has-ornament" data-stroke style={{ background: 'var(--vgu-beige)' }}>
    {/* Stroke-art ornaments — animate in on scroll */}
    <svg className="stroke-svg" style={{ top: '12%', left: '38%', width: 220, height: 90 }} viewBox="0 0 220 90" fill="none" aria-hidden="true">
      <path className="sp-1" d="M 8 60 Q 60 8, 130 38 T 210 24" stroke="#821a12" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
      <path className="sp-2" d="M 202 18 L 210 24 L 198 30" stroke="#821a12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </svg>
    <svg className="stroke-svg" style={{ bottom: '14%', left: '6%', width: 100, height: 100 }} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <path className="sp-3" d="M 50 12 V 88 M 12 50 H 88 M 22 22 L 78 78 M 78 22 L 22 78" stroke="#821a12" strokeWidth="2" strokeLinecap="round" opacity="0.30" />
    </svg>
    <div className="container">
      <div className="cs-grid">
        <div>
          <span className="eyebrow" style={{ color: 'var(--vgu-red-dark)' }}>Exclusive benefit</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Get free access to 7,000+ courses on Coursera</h2>
          <p className="body-l" style={{ marginTop: 20, maxWidth: 540 }}>
            Every Online VGU enrolment includes complimentary access to Coursera's full library — certificates from Google, IBM, Meta, Stanford, and Wharton. At no extra cost, on the same student account.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={openLeadModal}>
              Explore the benefit <Icon name="arrow-right" size={16} />
            </button>
            <button className="btn" style={{ background: 'transparent', color: 'var(--vgu-red-dark)', padding: '12px 8px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14 }}>
              See full course list <Icon name="arrow-up-right" size={14} />
            </button>
          </div>
        </div>

        <div className="cs-card-wrap">
          <div className="cs-card">
            <div className="cs-brand">Coursera</div>
            <div className="cs-big">7,000+</div>
            <div className="cs-sub">courses, guided projects &amp; certifications</div>
            <div className="cs-partners">
              <span className="cs-partner" style={{ background: '#4285F4' }}>G</span>
              <span className="cs-partner" style={{ background: '#054ADA' }}>IBM</span>
              <span className="cs-partner" style={{ background: '#0866FF' }}>M</span>
              <span className="cs-partner" style={{ background: '#8C1515' }}>S</span>
              <span className="cs-partner-text">+12 more</span>
            </div>
            <div className="cs-divider"></div>
            <ul className="cs-includes">
              <li><Icon name="check" size={14} strokeWidth={2.5} />Industry certificates · Google, IBM, Meta</li>
              <li><Icon name="check" size={14} strokeWidth={2.5} />Stackable with your degree credit</li>
              <li><Icon name="check" size={14} strokeWidth={2.5} />₹0 extra cost · included in fees</li>
            </ul>
          </div>
          <div className="cs-tilt"></div>
        </div>
      </div>
    </div>

    <style>{`
      .cs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; }
      .cs-card-wrap { position: relative; }
      .cs-card {
        background: var(--white); border-radius: 24px;
        padding: 32px; position: relative; z-index: 2;
        box-shadow: 0 16px 40px rgba(130,26,18,0.12);
      }
      .cs-tilt {
        position: absolute; inset: 12px -12px -12px 12px;
        background: var(--vgu-red); border-radius: 24px;
        opacity: 0.85; z-index: 1;
        background: linear-gradient(135deg, var(--vgu-red) 0%, var(--vgu-red-dark) 100%);
      }
      .cs-brand {
        font-family: var(--font-heading); font-weight: 900; font-size: 28px;
        color: #0056D2; letter-spacing: -0.5px;
      }
      .cs-big {
        font-family: var(--font-heading); font-weight: 800;
        font-size: 56px; color: var(--n-900); letter-spacing: -2px; line-height: 1;
        margin-top: 12px;
      }
      .cs-sub { color: var(--n-600); font-size: 14px; margin-top: 8px; max-width: 280px; }
      .cs-partners { display: flex; align-items: center; gap: 8px; margin-top: 20px; }
      .cs-partner {
        width: 40px; height: 40px; border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        color: var(--white); font-family: var(--font-heading); font-weight: 800; font-size: 13px;
        letter-spacing: 0.04em;
      }
      .cs-partner-text { color: var(--n-600); font-size: 13px; font-weight: 600; font-family: var(--font-heading); margin-left: 4px; }
      .cs-divider { height: 1px; background: var(--n-200); margin: 24px 0 16px; }
      .cs-includes { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
      .cs-includes li {
        display: flex; align-items: center; gap: 8px;
        font-size: 13px; color: var(--n-900); font-weight: 500;
      }
      .cs-includes svg { color: #16A34A; flex: none; }
      @media (max-width: 1024px) {
        .cs-grid { grid-template-columns: 1fr; gap: 48px; }
        .cs-big { font-size: 44px; }
      }
    `}</style>
  </section>;

window.CourseraBlock = CourseraBlock;

/* ============================================================
   ADMISSION TIMELINE — 4 steps, premium horizontal flow
   ============================================================ */
const AdmissionTimeline = ({ openLeadModal }) => {
  const steps = [
  { n: 1, ic: 'user', t: 'Register online', s: 'Fill the 3-step form in under 5 minutes. Free, no obligation.' },
  { n: 2, ic: 'file-text', t: 'Submit documents', s: 'Upload your marksheets, ID proof, and photo on the secure portal.' },
  { n: 3, ic: 'wallet', t: 'Pay your fees', s: 'Choose no-cost EMI, UPI, net banking, or demand draft.' },
  { n: 4, ic: 'graduation-cap', t: 'Begin learning', s: 'Get LMS access. Join your first live class. Meet your cohort.' }];

  return (
    <section className="block bg-white has-ornament" data-ornament="dots-tl" data-stroke>
      {/* Stroke art — animates between steps */}
      <svg className="stroke-svg" style={{ top: '18%', right: '6%', width: 160, height: 100 }} viewBox="0 0 160 100" fill="none" aria-hidden="true">
        <path className="sp-1" d="M 8 80 Q 40 10, 100 50 T 150 22" stroke="#C04036" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
        <circle className="sp-2" cx="150" cy="22" r="4" fill="none" stroke="#C04036" strokeWidth="2" opacity="0.55" />
      </svg>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 64, maxWidth: 720, margin: '0 auto 64px' }}>
          <span className="eyebrow">How to apply</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Join in 4 simple steps</h2>
          <p className="body-l" style={{ marginTop: 16 }}>From application to first class in under 14 days. Our admissions team supports you at every step.</p>
        </div>

        <div className="timeline">
          <div className="timeline-track" aria-hidden="true"></div>
          {steps.map((s, i) =>
          <article key={s.n} className="t-step" style={{ '--i': i }}>
              <div className="t-circle">
                <Icon name={s.ic} size={22} />
                <span className="t-n">Step {s.n}</span>
              </div>
              <h4 className="mt-2">{s.t}</h4>
              <p className="body-s mt-1">{s.s}</p>
            </article>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <button className="btn btn-primary btn-lg" onClick={openLeadModal}>
            Apply now — it's free <Icon name="arrow-right" size={18} />
          </button>
          <p className="body-s" style={{ marginTop: 12 }}>
            Average time to complete · 4 minutes · No payment at signup
          </p>
        </div>
      </div>

      <style>{`
        .timeline {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 24px; position: relative;
        }
        .timeline-track {
          position: absolute;
          top: 36px; left: 12.5%; right: 12.5%;
          height: 2px;
          background: repeating-linear-gradient(to right, var(--vgu-red) 0 8px, transparent 8px 16px);
          z-index: 0;
        }
        .t-step {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
          padding: 0 16px;
        }
        .t-circle {
          width: 72px; height: 72px; border-radius: 9999px;
          background: var(--white);
          border: 2px solid var(--vgu-red);
          display: flex; align-items: center; justify-content: center; flex-direction: column;
          color: var(--vgu-red);
          position: relative;
          box-shadow: 0 4px 12px rgba(192,64,54,0.18);
          transition: all 220ms var(--ease);
        }
        .t-step:hover .t-circle {
          background: var(--vgu-red); color: var(--white);
          transform: scale(1.06);
        }
        .t-n {
          position: absolute; top: -8px;
          background: var(--vgu-red); color: var(--white);
          font-family: var(--font-heading); font-weight: 800; font-size: 10px;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 3px 8px; border-radius: 9999px;
        }
        .t-step h4 { margin-top: 20px; }
        .t-step p { max-width: 220px; }

        @media (max-width: 768px) {
          .timeline { grid-template-columns: 1fr; gap: 24px; }
          .timeline-track {
            top: 24px; bottom: 24px; left: 36px; right: auto;
            width: 2px; height: auto;
            background: repeating-linear-gradient(to bottom, var(--vgu-red) 0 8px, transparent 8px 16px);
          }
          .t-step { flex-direction: row; gap: 20px; align-items: flex-start; text-align: left; padding: 0; }
          .t-step h4 { margin-top: 0; }
          .t-step p { max-width: 100%; }
          .t-circle { flex: none; width: 56px; height: 56px; }
        }
      `}</style>
    </section>);

};
window.AdmissionTimeline = AdmissionTimeline;

/* ============================================================
   TESTIMONIALS  (refined — kept photos for warmth)
   ============================================================ */
const Testimonials = () => {
  const data = [
  {
    name: 'Priya Rathore', initials: 'PR', role: 'MBA, 2023 Batch',
    now: 'Senior Marketing Manager · HDFC Life · Mumbai',
    photo: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=240&q=80&auto=format&fit=crop',
    quote: "I was skeptical about online degrees but VGU's MBA completely changed my perspective. The faculty were incredibly accessible and the Coursera access helped me earn three additional certifications.",
    tag: 'Promoted within 14 months'
  },
  {
    name: 'Arjun Khanna', initials: 'AK', role: 'BCA, 2022 Batch',
    now: 'Software Developer · Infosys · Bengaluru',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&q=80&auto=format&fit=crop',
    quote: "Being able to study while working full-time was a game changer. I graduated with a BCA and got promoted to a junior developer role within 6 months of finishing.",
    tag: 'Placed at Infosys'
  },
  {
    name: 'Sunita Mehta', initials: 'SM', role: 'M.Com, 2023 Batch',
    now: 'Finance Lead · Big 4 firm · Ahmedabad',
    photo: 'https://images.unsplash.com/photo-1559548331-f9cb98001426?w=240&q=80&auto=format&fit=crop',
    quote: "The placement team at VGU is exceptional. They helped me land a role at a Big 4 accounting firm even though I was a career changer. Worth every rupee.",
    tag: 'Career restart at 38'
  }];


  return (
    <section className="block bg-light has-ornament" data-ornament="ring-br">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 720, margin: '0 auto 56px' }}>
          <span className="eyebrow">Student stories</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Real people. Real outcomes.</h2>
        </div>

        <div className="test-grid">
          {data.map((t) =>
          <article key={t.name} className="test-card">
              <div className="test-mark">"</div>
              <div className="test-tag">
                <Icon name="trending-up" size={14} />
                {t.tag}
              </div>
              <blockquote className="test-quote">{t.quote}</blockquote>
              <div className="test-who">
                <img src={t.photo} alt={t.name} className="test-avatar" onError={(e) => {e.currentTarget.style.display = 'none';}} />
                <div>
                  <div className="test-name">{t.name}</div>
                  <div className="test-role">{t.role}</div>
                  <div className="test-now">{t.now}</div>
                </div>
              </div>
            </article>
          )}
        </div>
      </div>

      <style>{`
        .test-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .test-card {
          position: relative;
          background: var(--white); border: 1px solid var(--n-200); border-radius: 16px;
          padding: 28px;
          display: flex; flex-direction: column; gap: 16px;
          transition: all 200ms var(--ease);
        }
        .test-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(192,64,54,0.12); }
        .test-mark {
          position: absolute; top: 16px; right: 24px;
          font-family: var(--font-heading); font-weight: 900;
          font-size: 96px; line-height: 0.7; color: var(--vgu-beige);
          pointer-events: none;
        }
        .test-tag {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 12px;
          background: rgba(255,164,18,0.15); color: #B57208;
          border-radius: 4px;
          font-family: var(--font-heading); font-weight: 600; font-size: 11px;
          letter-spacing: 0.06em; text-transform: uppercase;
          align-self: flex-start;
          position: relative; z-index: 1;
        }
        .test-quote {
          font-size: 16px; line-height: 1.7;
          color: var(--n-900); margin: 0;
          font-style: italic;
          text-wrap: pretty;
          position: relative; z-index: 1;
        }
        .test-who {
          display: flex; gap: 12px; align-items: center;
          margin-top: auto; padding-top: 16px;
          border-top: 1px solid var(--n-200);
        }
        .test-avatar {
          width: 48px; height: 48px; border-radius: 9999px;
          object-fit: cover; flex: none;
        }
        .test-name { font-family: var(--font-heading); font-weight: 800; font-size: 15px; color: var(--n-900); }
        .test-role { font-size: 13px; color: var(--n-600); margin-top: 2px; }
        .test-now { font-size: 12px; color: var(--vgu-red); font-family: var(--font-heading); font-weight: 600; margin-top: 4px; }

        @media (max-width: 1024px) { .test-grid { grid-template-columns: 1fr; max-width: 600px; margin: 0 auto; } }
      `}</style>
    </section>);

};
window.Testimonials = Testimonials;

/* ============================================================
   HOMEPAGE FAQ
   ============================================================ */
const HomeFAQ = ({ openLeadModal }) => {
  const [open, setOpen] = useH2State(0);
  const faqs = [
  { q: 'Are VGU online degrees valid and recognised?',
    a: 'Yes. All VGU online degrees are UGC-recognised and approved by the Distance Education Bureau (DEB). They are equivalent to regular on-campus degrees for employment and higher education purposes — and recognised by the Association of Indian Universities (AIU) in 40+ countries.' },
  { q: 'What is the fee structure and are there EMI options?',
    a: 'Fees vary by program, ranging from ₹35,000 to ₹90,000 per year. We offer 0% interest EMI options through Bajaj Finserv, HDFC, and ICICI — starting at ₹3,499/month. UPI, net banking, and demand draft are also accepted. No hidden charges.' },
  { q: 'Do I need to visit the campus at any point?',
    a: 'No. The entire program — classes, exams, submissions, and graduation — is conducted online. You never need to travel to Jaipur. Convocation is held both on-campus and virtually; attendance is optional.' },
  { q: 'What is included in the Coursera partnership benefit?',
    a: "All enrolled VGU students get complimentary access to Coursera's full library of 7,000+ courses and guided projects from partners including Google, IBM, Meta, and Stanford University — for the full duration of your degree." },
  { q: 'How are exams conducted?',
    a: 'Exams are conducted online through our AI-proctored assessment platform. You can appear from home using a standard laptop or desktop with a webcam. We support flexible exam slots across Saturdays and Sundays.' },
  { q: 'What placement support does VGU provide?',
    a: 'Our dedicated career cell provides resume reviews, mock interviews, LinkedIn optimisation, and direct referrals to 500+ hiring partners including TCS, Infosys, HDFC, and Reliance. Our placement rate for the 2024 batch was 95%.' }];


  return (
    <section className="block bg-white">
      <div className="container" style={{ maxWidth: 880, padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="eyebrow">Common questions</span>
          <h2 className="mt-1" style={{ marginTop: 8 }}>Everything you need to know</h2>
        </div>

        <div className="hf-list">
          {faqs.map((f, i) =>
          <article key={i} className={`hf-item ${open === i ? 'open' : ''}`}>
              <button className="hf-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{f.q}</span>
                <span className="hf-icon">
                  <Icon name={open === i ? 'minus' : 'plus'} size={18} />
                </span>
              </button>
              <div className="hf-a-wrap" style={{ maxHeight: open === i ? '400px' : '0' }}>
                <div className="hf-a">
                  <p className="body">{f.a}</p>
                </div>
              </div>
            </article>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: 40, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
          <p className="body">Still have questions?</p>
          <button className="btn btn-secondary" onClick={openLeadModal}>
            <Icon name="phone" size={16} /> Talk to a counsellor
          </button>
        </div>
      </div>

      <style>{`
        .hf-list { border-top: 1px solid var(--n-200); }
        .hf-item { border-bottom: 1px solid var(--n-200); transition: background 150ms var(--ease); }
        .hf-item:hover { background: var(--n-50); }
        .hf-item.open { background: var(--n-50); }
        .hf-q {
          width: 100%; border: 0; background: transparent;
          padding: 20px 24px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          font-family: var(--font-heading); font-weight: 700; font-size: 16px;
          color: var(--n-900); text-align: left;
          transition: color 150ms var(--ease);
        }
        .hf-item.open .hf-q { color: var(--vgu-red); }
        .hf-icon {
          width: 32px; height: 32px; border-radius: 9999px;
          background: var(--white); color: var(--vgu-red);
          display: flex; align-items: center; justify-content: center;
          flex: none;
          border: 1px solid var(--n-200);
          transition: all 220ms var(--ease);
        }
        .hf-item.open .hf-icon { background: var(--vgu-red); color: var(--white); border-color: var(--vgu-red); }
        .hf-a-wrap {
          overflow: hidden;
          transition: max-height 300ms var(--ease);
        }
        .hf-a { padding: 0 24px 24px; }
        @media (max-width: 480px) {
          .hf-q { padding: 16px 8px; font-size: 15px; }
          .hf-a { padding: 0 8px 20px; }
        }
      `}</style>
    </section>);

};
window.HomeFAQ = HomeFAQ;

/* ============================================================
   ACCREDITATION (gold strip)
   ============================================================ */
const Accreditation = () =>
<section style={{ background: 'var(--white)', padding: '56px 0', position: 'relative' }}>
    <div style={{ height: 4, background: 'linear-gradient(135deg, #f5e08b 0%, #eecf63 35%, #d6ad3b 70%, #f5e08b 100%)', position: 'absolute', top: 0, left: 0, right: 0 }}></div>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <span className="eyebrow">Recognised by</span>
        <h3 className="mt-1" style={{ maxWidth: 720, margin: '8px auto 0', fontSize: 22 }}>Every regulator that matters in Indian higher education</h3>
      </div>
      <div className="accred-row">
        {[
      { src: 'assets/badge-ugc.svg', name: 'UGC', sub: 'Entitled for online degrees' },
      { src: 'assets/badge-naac.svg', name: 'NAAC', sub: "Grade A+ accredited" },
      { src: 'assets/badge-aicte.svg', name: 'AICTE', sub: 'Approved for MBA & MCA' }].
      map((a) =>
      <div key={a.name} className="accred-item">
            <img src={a.src} alt={a.name} />
            <div>
              <div className="accred-name">{a.name}</div>
              <div className="accred-sub">{a.sub}</div>
            </div>
          </div>
      )}
        <div className="accred-divider"></div>
        <div className="accred-item">
          <div className="accred-coursera">Coursera</div>
          <div>
            <div className="accred-name">Coursera</div>
            <div className="accred-sub">Official content partner</div>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .accred-row { display: flex; align-items: center; justify-content: center; gap: 48px; flex-wrap: wrap; }
      .accred-item { display: flex; align-items: center; gap: 14px; }
      .accred-item img { width: 56px; height: 56px; flex: none; }
      .accred-coursera {
        font-family: var(--font-heading); font-weight: 900; font-size: 20px;
        color: #0056D2; padding: 12px 18px;
        background: rgba(0,86,210,0.08); border-radius: 8px;
        letter-spacing: -0.5px;
      }
      .accred-name { font-family: var(--font-heading); font-weight: 800; color: var(--n-900); font-size: 17px; }
      .accred-sub { font-size: 13px; color: var(--n-600); margin-top: 2px; }
      .accred-divider { width: 1px; height: 56px; background: var(--n-200); }
      @media (max-width: 768px) { .accred-row { gap: 24px; } .accred-divider { display: none; } }
    `}</style>
  </section>;

window.Accreditation = Accreditation;

/* ============================================================
   FINAL CTA (red band with countdown — premium)
   ============================================================ */
const FinalCTA = ({ openLeadModal, openLeadPage }) =>
<section style={{ background: 'var(--vgu-red-dark)', color: 'var(--white)', padding: '80px 0', position: 'relative', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: 9999, background: 'radial-gradient(circle, rgba(255,164,18,0.18) 0%, transparent 60%)', pointerEvents: 'none' }}></div>
    <div style={{ position: 'absolute', bottom: '-40%', left: '-15%', width: 600, height: 600, borderRadius: 9999, background: 'radial-gradient(circle, rgba(238,207,99,0.10) 0%, transparent 60%)', pointerEvents: 'none' }}></div>

    <div className="container" style={{ position: 'relative' }}>
      <div className="cta-grid">
        <div>
          <span className="eyebrow" style={{ color: 'var(--vgu-yellow)' }}>Admissions open</span>
          <h2 style={{ color: 'var(--white)', marginTop: 12, fontSize: 'clamp(32px, 4.5vw, 44px)', letterSpacing: '-0.5px' }}>
            Ready to begin your journey?
          </h2>
          <p className="body-l" style={{ color: 'rgba(255,255,255,0.85)', marginTop: 16, maxWidth: 600 }}>
            Applications are open for the July 2025 batch. Seats are limited. Talk to an admissions advisor today — free, no obligation, callback within 24 hours.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-lg" style={{ background: 'var(--white)', color: 'var(--vgu-red)', borderRadius: 9999, padding: '16px 36px' }} onClick={openLeadModal}>
              Apply now <Icon name="arrow-right" size={18} />
            </button>
            <button className="btn btn-lg" style={{ background: 'transparent', color: 'var(--white)', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 8 }}
          onClick={openLeadPage}>
              <Icon name="download" size={18} /> Download brochure
            </button>
          </div>
          <div style={{ marginTop: 32, display: 'flex', gap: 28, flexWrap: 'wrap' }}>
            {[
          ['1800 123 456', 'Mon–Sat, 9am–7pm IST'],
          ['EMI from ₹3,499/mo', 'Bajaj · HDFC · ICICI'],
          ['Scholarships up to ₹25,000', 'For early applicants']].
          map(([t, s]) =>
          <div key={t} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--white)', fontSize: 15 }}>{t}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>{s}</div>
              </div>
          )}
          </div>
        </div>

        <div className="cta-countdown">
          <div className="cd-label">Next batch starts</div>
          <div className="cd-date">July 2025</div>
          <div className="cd-timer">
            {[
          { v: '21', l: 'Days' },
          { v: '14', l: 'Hours' },
          { v: '32', l: 'Min' },
          { v: '09', l: 'Sec' }].
          map((t) =>
          <div key={t.l} className="cd-cell">
                <div className="cd-num">{t.v}</div>
                <div className="cd-tlbl">{t.l}</div>
              </div>
          )}
          </div>
          <div className="cd-foot">
            <Icon name="gift" size={16} />
            <span>Apply by 30 June for an early-bird scholarship</span>
          </div>
        </div>
      </div>
    </div>

    <style>{`
      .cta-grid { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: center; }
      .cta-countdown {
        background: rgba(255,255,255,0.10);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.20);
        border-radius: 24px;
        padding: 32px;
        text-align: center;
      }
      .cd-label {
        font-family: var(--font-heading); font-size: 12px; font-weight: 600;
        letter-spacing: 0.08em; text-transform: uppercase;
        color: var(--vgu-yellow);
      }
      .cd-date {
        font-family: var(--font-heading); font-weight: 800; font-size: 32px;
        color: var(--white); margin-top: 8px; letter-spacing: -0.5px;
      }
      .cd-timer {
        display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;
        margin: 24px 0;
      }
      .cd-cell { background: rgba(0,0,0,0.25); border-radius: 8px; padding: 16px 8px; }
      .cd-num {
        font-family: var(--font-heading); font-weight: 800;
        font-size: 36px; color: var(--white); letter-spacing: -1px; line-height: 1;
      }
      .cd-tlbl {
        font-size: 11px; color: rgba(255,255,255,0.7);
        margin-top: 6px; text-transform: uppercase; letter-spacing: 0.06em;
        font-family: var(--font-heading); font-weight: 600;
      }
      .cd-foot {
        display: inline-flex; align-items: center; gap: 8px;
        font-size: 13px; color: var(--vgu-yellow);
        padding: 8px 14px; background: rgba(255,164,18,0.10);
        border-radius: 9999px;
      }
      @media (max-width: 1024px) {
        .cta-grid { grid-template-columns: 1fr; gap: 40px; }
      }
      @media (max-width: 480px) {
        .cd-num { font-size: 28px; }
      }
    `}</style>
  </section>;

window.FinalCTA = FinalCTA;

/* ============================================================
   HOMEPAGE — composition
   ============================================================ */
const HomePage = ({ navigate, openLeadModal, openLeadPage }) =>
<main>
    <Hero openLeadModal={openLeadModal} navigate={navigate} />
    <TrustBar />
    <ProgramGrid navigate={navigate} openLeadModal={openLeadModal} />
    <StatStrip />
    <WhyVGU />
    <CourseraBlock openLeadModal={openLeadModal} />
    <AdmissionTimeline openLeadModal={openLeadModal} />
    <Testimonials />
    <HomeFAQ openLeadModal={openLeadModal} />
    <Accreditation />
    <FinalCTA openLeadModal={openLeadModal} openLeadPage={openLeadPage} />
  </main>;

window.HomePage = HomePage;