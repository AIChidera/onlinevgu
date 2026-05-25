/* global React, Icon */
const { useState: useLFState, useEffect: useLFEffect, useRef: useLFRef } = React;

/* ============================================================
   LEAD FORM — shared multi-step logic
   ============================================================ */

const PROGRAM_OPTIONS = [
  '— Select a program —',
  'Online MBA',
  'Online MBA in Healthcare Management',
  'Online MCA',
  'Online M.Com',
  'Online MA',
  'Online M.Lib',
  'Online BBA',
  'Online BCA',
  'Online B.Com',
  'Online B.Sc',
  'Online B.Lib',
  "Not sure yet",
];

const STATE_OPTIONS = [
  '— Select state —', 'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Gujarat', 'Haryana',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Punjab',
  'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal', 'Other',
];

const validateStep1 = (data) => {
  const errs = {};
  if (!data.name || data.name.trim().length < 2) errs.name = 'Please enter your full name';
  if (!/^[+]?[\d\s-]{10,15}$/.test((data.phone || '').trim())) errs.phone = 'Enter a valid 10-digit mobile number';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) errs.email = 'Enter a valid email address';
  return errs;
};
const validateStep2 = (data) => {
  const errs = {};
  if (!data.program || data.program.startsWith('—')) errs.program = 'Please choose a program';
  if (!data.qualification) errs.qualification = 'Please pick your highest qualification';
  return errs;
};
const validateStep3 = (data) => {
  const errs = {};
  if (!data.state || data.state.startsWith('—')) errs.state = 'Please choose your state';
  if (!data.consent) errs.consent = 'Please agree to be contacted';
  return errs;
};

/* ============================================================
   MODAL VERSION — compact single-step
   ============================================================ */
const LeadModal = ({ open, onClose, defaultProgram, openLeadPage }) => {
  const [data, setData] = useLFState({
    name: '', phone: '', email: '',
    program: defaultProgram || '— Select a program —',
    consent: true,
  });
  const [errors, setErrors] = useLFState({});
  const [state, setState] = useLFState('idle'); // idle | submitting | success

  useLFEffect(() => {
    if (open) {
      setData((d) => ({ ...d, program: defaultProgram || d.program }));
      setErrors({});
      setState('idle');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open, defaultProgram]);

  useLFEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const update = (k, v) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = { ...validateStep1(data) };
    if (!data.program || data.program.startsWith('—')) errs.program = 'Please choose a program';
    if (!data.consent) errs.consent = 'Please agree to be contacted';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('submitting');
    setTimeout(() => setState('success'), 900);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {state === 'success' ? (
          <div className="success">
            <div className="check"><Icon name="check" size={28} strokeWidth={2.5} /></div>
            <h3>Thank you, {data.name.split(' ')[0]}!</h3>
            <p className="body-s">An admissions advisor will call you on <b>{data.phone}</b> within 24 hours. We've also sent a brochure to <b>{data.email}</b>.</p>
            <div className="row">
              <button className="btn btn-secondary" onClick={onClose}>Close</button>
              <button className="btn btn-primary" onClick={onClose}>
                <Icon name="download" size={16} /> Brochure
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="head">
              <button className="close" onClick={onClose} aria-label="Close">
                <Icon name="x" size={18} />
              </button>
              <span className="eyebrow">Free • No obligation</span>
              <h3>Talk to an admissions advisor</h3>
              <p>We'll call you within 24 hours. Get your fee structure, EMI plan, and a free brochure on email.</p>
            </div>
            <form className="body" onSubmit={submit} noValidate>
              <div className="field">
                <label htmlFor="m-name">Full name</label>
                <input id="m-name" type="text" placeholder="e.g. Priya Sharma"
                  value={data.name} onChange={(e) => update('name', e.target.value)}
                  className={errors.name ? 'invalid' : ''} />
                {errors.name && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.name}</span>}
              </div>
              <div className="row-2">
                <div className="field">
                  <label htmlFor="m-phone">Mobile</label>
                  <input id="m-phone" type="tel" placeholder="+91 98765 43210"
                    value={data.phone} onChange={(e) => update('phone', e.target.value)}
                    className={errors.phone ? 'invalid' : ''} />
                  {errors.phone && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.phone}</span>}
                </div>
                <div className="field">
                  <label htmlFor="m-email">Email</label>
                  <input id="m-email" type="email" placeholder="you@example.com"
                    value={data.email} onChange={(e) => update('email', e.target.value)}
                    className={errors.email ? 'invalid' : ''} />
                  {errors.email && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.email}</span>}
                </div>
              </div>
              <div className="field">
                <label htmlFor="m-program">Program of interest</label>
                <select id="m-program" value={data.program} onChange={(e) => update('program', e.target.value)}
                  className={errors.program ? 'invalid' : ''}>
                  {PROGRAM_OPTIONS.map((p) => <option key={p} value={p} disabled={p.startsWith('—')}>{p}</option>)}
                </select>
                {errors.program && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.program}</span>}
              </div>
              <label className="consent">
                <input type="checkbox" checked={data.consent} onChange={(e) => update('consent', e.target.checked)} />
                <span>I agree to receive calls, SMS and emails from Online VGU about admissions. We never share your number.</span>
              </label>
              {errors.consent && <span className="error-msg" style={{marginTop: -8}}><Icon name="alert-circle" size={12} /> {errors.consent}</span>}
              <button className="btn btn-primary btn-block" type="submit" disabled={state === 'submitting'}>
                {state === 'submitting' ? 'Sending…' : <>Request a callback <Icon name="arrow-right" size={16} /></>}
              </button>
              <div style={{textAlign: 'center', fontSize: 13, color: 'var(--n-600)'}}>
                Prefer a longer form? <a href="#" onClick={(e) => { e.preventDefault(); onClose(); openLeadPage(); }}>Open full application →</a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

window.LeadModal = LeadModal;

/* ============================================================
   DEDICATED MULTI-STEP PAGE
   ============================================================ */
const LeadPage = ({ navigate }) => {
  const [step, setStep] = useLFState(1);
  const [data, setData] = useLFState({
    name: '', phone: '', email: '',
    program: '— Select a program —',
    qualification: '',
    workExp: 'fresher',
    state: '— Select state —',
    timeline: 'immediately',
    consent: true,
    notes: '',
  });
  const [errors, setErrors] = useLFState({});
  const [submitting, setSubmitting] = useLFState(false);
  const [done, setDone] = useLFState(false);

  const update = (k, v) => {
    setData((d) => ({ ...d, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    const validator = step === 1 ? validateStep1 : validateStep2;
    const errs = validator(data);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = () => {
    const errs = validateStep3(data);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }, 1200);
  };

  if (done) {
    return (
      <section className="block" style={{paddingTop: 80, paddingBottom: 80, background: 'var(--n-50)'}}>
        <div className="container" style={{maxWidth: 640}}>
          <div className="card" style={{padding: 48, textAlign: 'center', background: 'var(--white)', border: '1px solid var(--n-200)'}}>
            <div style={{width: 80, height: 80, borderRadius: 9999, background: 'rgba(22,163,74,0.12)', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px'}}>
              <Icon name="check" size={40} strokeWidth={2.5} />
            </div>
            <span className="eyebrow">Application received</span>
            <h2 style={{marginTop: 12, marginBottom: 16}}>You're all set, {data.name.split(' ')[0]}.</h2>
            <p className="body-l" style={{maxWidth: 480, margin: '0 auto 28px'}}>
              An admissions advisor will call you on <b style={{color: 'var(--n-900)'}}>{data.phone}</b> within 24 hours.
              We've also sent your <b style={{color: 'var(--n-900)'}}>{data.program}</b> brochure and fee structure to <b style={{color: 'var(--n-900)'}}>{data.email}</b>.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 28, textAlign: 'left'}}>
              {[
                { ico: 'phone', t: 'Within 24h', s: 'Counsellor call' },
                { ico: 'file-text', t: 'Step 2', s: 'Document upload' },
                { ico: 'graduation-cap', t: 'July 2025', s: 'Begin classes' },
              ].map((n, i) => (
                <div key={i} className="card" style={{padding: 16, display: 'flex', flexDirection: 'column', gap: 6, background: 'var(--n-50)'}}>
                  <div style={{width: 36, height: 36, borderRadius: 9999, background: 'rgba(192,64,54,0.10)', color: 'var(--vgu-red)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Icon name={n.ico} size={18} />
                  </div>
                  <div style={{fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 14}}>{n.t}</div>
                  <div style={{fontSize: 13, color: 'var(--n-600)'}}>{n.s}</div>
                </div>
              ))}
            </div>

            <div style={{display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap'}}>
              <button className="btn btn-secondary" onClick={() => navigate('home')}>Back to homepage</button>
              <button className="btn btn-primary"><Icon name="download" size={16} /> Download brochure</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const stepLabels = ['Your details', 'Programme fit', 'Almost there'];

  return (
    <section className="block" style={{paddingTop: 64, paddingBottom: 96, background: 'var(--n-50)'}}>
      <div className="container" style={{maxWidth: 1100}}>
        <div style={{color: 'var(--n-600)', fontSize: 13, marginBottom: 16}}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }} style={{color: 'var(--n-600)'}}>Home</a>
          {' / '}<span style={{color: 'var(--n-900)'}}>Application form</span>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48, alignItems: 'start'}} className="lead-page-grid">
          {/* LEFT — Form */}
          <div className="card" style={{padding: 40}}>
            <span className="eyebrow">Application — Step {step} of 3</span>
            <h2 style={{marginTop: 8, marginBottom: 8}}>{stepLabels[step - 1]}</h2>
            <p className="body" style={{marginBottom: 24}}>
              {step === 1 && "Tell us how to reach you. We'll call within 24 hours."}
              {step === 2 && "Help us point you to the right counsellor and the right cohort."}
              {step === 3 && "Last bit — where you are, when you'd like to start."}
            </p>

            <div className="stepper">
              <div className={`step ${step >= 1 ? 'done' : ''}`}></div>
              <div className={`step ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}></div>
              <div className={`step ${step === 3 ? 'active' : ''}`}></div>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24}}>
              {step === 1 && (
                <>
                  <div className="field">
                    <label>Full name</label>
                    <input type="text" placeholder="e.g. Priya Sharma"
                      value={data.name} onChange={(e) => update('name', e.target.value)}
                      className={errors.name ? 'invalid' : ''} />
                    {errors.name && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.name}</span>}
                  </div>
                  <div className="row-2">
                    <div className="field">
                      <label>Mobile number</label>
                      <input type="tel" placeholder="+91 98765 43210"
                        value={data.phone} onChange={(e) => update('phone', e.target.value)}
                        className={errors.phone ? 'invalid' : ''} />
                      {errors.phone && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.phone}</span>}
                    </div>
                    <div className="field">
                      <label>Email address</label>
                      <input type="email" placeholder="you@example.com"
                        value={data.email} onChange={(e) => update('email', e.target.value)}
                        className={errors.email ? 'invalid' : ''} />
                      {errors.email && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.email}</span>}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="field">
                    <label>Program of interest</label>
                    <select value={data.program} onChange={(e) => update('program', e.target.value)}
                      className={errors.program ? 'invalid' : ''}>
                      {PROGRAM_OPTIONS.map((p) => <option key={p} value={p} disabled={p.startsWith('—')}>{p}</option>)}
                    </select>
                    {errors.program && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.program}</span>}
                  </div>
                  <div className="field">
                    <label>Highest qualification</label>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10}}>
                      {[
                        { v: '12th', l: 'Class 12 / Intermediate' },
                        { v: 'diploma', l: 'Diploma' },
                        { v: 'ug', l: "Bachelor's degree" },
                        { v: 'pg', l: "Master's degree" },
                      ].map((q) => (
                        <label key={q.v} className={`radio-tile ${data.qualification === q.v ? 'on' : ''}`}>
                          <input type="radio" name="q" value={q.v}
                            checked={data.qualification === q.v}
                            onChange={() => update('qualification', q.v)} />
                          <span>{q.l}</span>
                        </label>
                      ))}
                    </div>
                    {errors.qualification && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.qualification}</span>}
                  </div>
                  <div className="field">
                    <label>Work experience</label>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10}} className="exp-grid">
                      {[
                        { v: 'fresher', l: 'Fresher' },
                        { v: '0-2', l: '0–2 yrs' },
                        { v: '3-5', l: '3–5 yrs' },
                        { v: '6+', l: '6+ yrs' },
                      ].map((q) => (
                        <label key={q.v} className={`radio-tile ${data.workExp === q.v ? 'on' : ''}`}>
                          <input type="radio" name="e" value={q.v}
                            checked={data.workExp === q.v}
                            onChange={() => update('workExp', q.v)} />
                          <span>{q.l}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="row-2">
                    <div className="field">
                      <label>Your state</label>
                      <select value={data.state} onChange={(e) => update('state', e.target.value)}
                        className={errors.state ? 'invalid' : ''}>
                        {STATE_OPTIONS.map((s) => <option key={s} value={s} disabled={s.startsWith('—')}>{s}</option>)}
                      </select>
                      {errors.state && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.state}</span>}
                    </div>
                    <div className="field">
                      <label>When do you want to start?</label>
                      <select value={data.timeline} onChange={(e) => update('timeline', e.target.value)}>
                        <option value="immediately">July 2025 — Next batch</option>
                        <option value="3months">Within 3 months</option>
                        <option value="6months">Within 6 months</option>
                        <option value="exploring">Just exploring</option>
                      </select>
                    </div>
                  </div>
                  <div className="field">
                    <label>Anything we should know? (optional)</label>
                    <textarea placeholder="Specific questions about fees, EMI, eligibility…"
                      value={data.notes} onChange={(e) => update('notes', e.target.value)} />
                  </div>
                  <label className="consent">
                    <input type="checkbox" checked={data.consent} onChange={(e) => update('consent', e.target.checked)} />
                    <span>I agree to receive calls, SMS and emails from Online VGU. I have read and accept the privacy policy.</span>
                  </label>
                  {errors.consent && <span className="error-msg"><Icon name="alert-circle" size={12} /> {errors.consent}</span>}
                </>
              )}

              <div style={{display: 'flex', gap: 12, marginTop: 12, justifyContent: 'space-between'}}>
                <button className="btn btn-ghost" disabled={step === 1} onClick={back}
                  style={{visibility: step === 1 ? 'hidden' : 'visible'}}>
                  <Icon name="chevron-left" size={16} /> Back
                </button>
                {step < 3 ? (
                  <button className="btn btn-primary" onClick={next}>
                    Continue <Icon name="arrow-right" size={16} />
                  </button>
                ) : (
                  <button className="btn btn-primary" onClick={submit} disabled={submitting}>
                    {submitting ? 'Submitting…' : <>Submit application <Icon name="arrow-right" size={16} /></>}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT — Reassurance panel */}
          <aside style={{display: 'flex', flexDirection: 'column', gap: 16}}>
            <div className="card" style={{background: 'var(--vgu-beige)', border: 0}}>
              <span className="eyebrow" style={{color: 'var(--vgu-red-dark)'}}>What happens next</span>
              <ul style={{listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 14}}>
                {[
                  ['Counsellor calls you', 'Within 24 hours, free & no obligation'],
                  ['Receive your brochure', 'Full curriculum, fees & EMI plans by email'],
                  ['Apply online', 'Upload documents, pay registration ₹1,000'],
                  ['Confirm seat', 'Begin classes from July 2025'],
                ].map(([t, s], i) => (
                  <li key={i} style={{display: 'flex', gap: 12, alignItems: 'flex-start'}}>
                    <span style={{width: 28, height: 28, borderRadius: 9999, background: 'var(--vgu-red)', color: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13, flex: 'none'}}>{i + 1}</span>
                    <div>
                      <div style={{fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--n-900)', fontSize: 15}}>{t}</div>
                      <div style={{fontSize: 13, color: 'var(--n-600)'}}>{s}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h4 style={{marginBottom: 12}}>You're applying to a recognised institution</h4>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16}}>
                {[
                  { t: 'UGC', s: 'Entitled' },
                  { t: 'NAAC', s: 'A+' },
                  { t: 'AICTE', s: 'Approved' },
                ].map((a) => (
                  <div key={a.t} style={{textAlign: 'center', padding: '12px 8px', background: 'var(--n-50)', borderRadius: 8}}>
                    <div style={{fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--vgu-red)', fontSize: 16}}>{a.t}</div>
                    <div style={{fontSize: 12, color: 'var(--n-600)', marginTop: 2}}>{a.s}</div>
                  </div>
                ))}
              </div>
              <div style={{borderTop: '1px solid var(--n-200)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8}}>
                {[
                  ['50,000+', 'learners'],
                  ['95%', 'placement rate'],
                  ['40+', 'countries'],
                ].map(([n, l]) => (
                  <div key={l} style={{display: 'flex', justifyContent: 'space-between', fontSize: 14}}>
                    <span style={{color: 'var(--n-600)'}}>{l}</span>
                    <b style={{fontFamily: 'var(--font-heading)', color: 'var(--vgu-red)'}}>{n}</b>
                  </div>
                ))}
              </div>
            </div>

            <div style={{display: 'flex', gap: 12, alignItems: 'center', padding: 16, background: 'var(--white)', borderRadius: 16, border: '1px solid var(--n-200)'}}>
              <div style={{width: 44, height: 44, borderRadius: 9999, background: 'rgba(192,64,54,0.10)', color: 'var(--vgu-red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none'}}>
                <Icon name="phone" size={20} />
              </div>
              <div>
                <div style={{fontSize: 12, color: 'var(--n-600)', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'var(--font-heading)', fontWeight: 600}}>Prefer to talk?</div>
                <a href="tel:+911800123456" style={{fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: 'var(--n-900)'}}>1800 123 456</a>
                <div style={{fontSize: 12, color: 'var(--n-600)'}}>Mon–Sat 9am–7pm IST</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .radio-tile {
          display: flex; align-items: center; gap: 10px;
          padding: 14px; border: 1.5px solid var(--n-200); border-radius: 8px;
          cursor: pointer; font-size: 14px; font-family: var(--font-heading); font-weight: 600;
          color: var(--n-900); background: var(--white);
          transition: all 150ms var(--ease);
        }
        .radio-tile:hover { border-color: var(--vgu-red); background: rgba(192,64,54,0.04); }
        .radio-tile input { display: none; }
        .radio-tile.on { border-color: var(--vgu-red); background: rgba(192,64,54,0.06); color: var(--vgu-red-dark); }
        @media (max-width: 880px) {
          .lead-page-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .exp-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
};

window.LeadPage = LeadPage;
