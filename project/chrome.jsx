/* global React, Icon */
const { useState: useStateChrome, useEffect: useEffectChrome } = React;

/* ============================================================
   HEADER  with mega-menu dropdown
   ============================================================ */
const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Programs', page: 'programs', dropdown: true },
  { label: 'About VGU', page: 'about' },
  { label: 'Admissions', page: 'admissions' },
  { label: 'Placements', page: 'placements' },
  { label: 'Blog', page: 'blog' },
];

const UG_PROGRAMS = [
  { name: 'Online BBA', page: 'home' },
  { name: 'Online BCA', page: 'home' },
  { name: 'Online B.Com', page: 'home' },
  { name: 'Online B.Sc', page: 'home' },
  { name: 'Online B.Lib', page: 'home' },
];
const PG_PROGRAMS = [
  { name: 'Online MBA', page: 'program' },
  { name: 'Online MBA in Healthcare', page: 'home' },
  { name: 'Online MCA', page: 'home' },
  { name: 'Online M.Com', page: 'home' },
  { name: 'Online MA', page: 'home' },
  { name: 'Online M.Lib', page: 'home' },
];

window.UG_PROGRAMS = UG_PROGRAMS;
window.PG_PROGRAMS = PG_PROGRAMS;

const Header = ({ currentPage, navigate, openLeadModal }) => {
  const [open, setOpen] = useStateChrome(false);

  useEffectChrome(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (page) => { setOpen(false); navigate(page); };

  return (
    <header className="site-header">
      <div className="container">
        <div className="hdr-inner">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); go('home'); }}>
            <img src="assets/logo.svg" alt="Online VGU" />
          </a>

          <nav className="main-nav">
            {NAV_LINKS.map((l) => l.dropdown ? (
              <div key={l.label} className="has-dd">
                <a href="#" className={currentPage === 'program' ? 'active' : ''}
                   onClick={(e) => { e.preventDefault(); go('home'); }}>
                  {l.label} <Icon name="chevron-down" size={14} className="chev" />
                </a>
                <div className="dd">
                  <div className="dd-grid">
                    <div>
                      <div className="dd-head">Undergraduate</div>
                      {UG_PROGRAMS.map((p) => (
                        <a key={p.name} href="#" onClick={(e) => { e.preventDefault(); go(p.page); }}>{p.name}</a>
                      ))}
                    </div>
                    <div>
                      <div className="dd-head">Postgraduate</div>
                      {PG_PROGRAMS.map((p) => (
                        <a key={p.name} href="#" onClick={(e) => { e.preventDefault(); go(p.page); }}>{p.name}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a key={l.label} href="#"
                 className={currentPage === l.page ? 'active' : ''}
                 onClick={(e) => { e.preventDefault(); go(l.page); }}>
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hdr-actions">
            <a href="tel:+911800123456" className="phone hide-mobile">
              <Icon name="phone" size={16} />
              1800 123 456
            </a>
            <button className="btn btn-primary btn-sm" onClick={openLeadModal}>
              Apply now
            </button>
            <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu">
              <Icon name={open ? 'x' : 'menu'} size={24} />
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="mobile-menu">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href="#" onClick={(e) => { e.preventDefault(); go(l.dropdown ? 'home' : l.page); }}>
              {l.label}
              <Icon name="chevron-right" size={18} />
            </a>
          ))}
          <a href="tel:+911800123456">
            <span>1800 123 456</span>
            <Icon name="phone" size={18} />
          </a>
          <button className="btn btn-primary btn-block" onClick={() => { setOpen(false); openLeadModal(); }}>
            Apply now
            <Icon name="arrow-right" size={16} />
          </button>
        </div>
      )}
    </header>
  );
};

window.Header = Header;

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = ({ navigate }) => (
  <footer className="site-footer">
    <div className="container">
      <div className="grid">
        <div className="brand">
          <img src="assets/logo.svg" alt="Online VGU" />
          <p>India's accredited online university. UGC-entitled degrees, NAAC A+ accredited, recognised by AICTE. Built for working professionals and fresh graduates.</p>
          <div className="socials">
            <a href="#" className="s-facebook"  aria-label="Facebook"><Icon name="facebook" size={18} /></a>
            <a href="#" className="s-linkedin"  aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
            <a href="#" className="s-instagram" aria-label="Instagram"><Icon name="instagram" size={18} /></a>
            <a href="#" className="s-youtube"   aria-label="YouTube"><Icon name="youtube" size={18} /></a>
          </div>
        </div>

        <div>
          <h5>Programs</h5>
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('program'); }}>Online MBA</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Online MCA</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Online M.Com</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Online BBA</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Online BCA</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('home'); }}>All programs →</a></li>
          </ul>
        </div>

        <div>
          <h5>About</h5>
          <ul>
            <li><a href="#">Why VGU</a></li>
            <li><a href="#">Accreditations</a></li>
            <li><a href="#">Faculty</a></li>
            <li><a href="#">Placements</a></li>
            <li><a href="#">Press &amp; Media</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>

        <div>
          <h5>Resources</h5>
          <ul>
            <li><a href="#">Download brochure</a></li>
            <li><a href="#">Fee structure</a></li>
            <li><a href="#">EMI plans</a></li>
            <li><a href="#">Scholarships</a></li>
            <li><a href="#">Sample certificates</a></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <div>
          <h5>Talk to us</h5>
          <div className="contact">
            <div className="contact-row">
              <Icon name="phone" size={18} />
              <div>
                <div style={{fontWeight: 700, fontFamily: 'var(--font-heading)'}}>1800 123 456</div>
                <div style={{color: 'rgba(255,255,255,0.6)', fontSize: 12}}>Mon–Sat, 9am–7pm IST</div>
              </div>
            </div>
            <div className="contact-row">
              <Icon name="mail" size={18} />
              <a href="mailto:admissions@onlinevgu.in" style={{color: 'rgba(255,255,255,0.85)'}}>admissions@onlinevgu.in</a>
            </div>
            <div className="contact-row">
              <Icon name="map-pin" size={18} />
              <span>Vivekananda Global University<br/>Jaipur, Rajasthan 303012</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bottom">
        <span>© 2025 Vivekananda Global University. All rights reserved.</span>
        <div className="bottom-links">
          <a href="#">Privacy policy</a>
          <a href="#">Terms of use</a>
          <a href="#">Refund policy</a>
          <a href="#">Disclaimer</a>
        </div>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;

/* ============================================================
   FLOATING WHATSAPP CHAT BUTTON
   ============================================================ */
const FloatingChat = () => (
  <button className="fab-chat" aria-label="Chat on WhatsApp">
    <span className="pulse" aria-hidden="true"></span>
    <Icon name="whatsapp" size={28} />
    <span className="tooltip">Chat with an advisor</span>
  </button>
);
window.FloatingChat = FloatingChat;

/* ============================================================
   STICKY MOBILE APPLY BAR (program detail context)
   ============================================================ */
const StickyApply = ({ priceTop = 'Online MBA', priceText = 'EMI from ₹7,084/mo', onApply }) => (
  <div className="sticky-apply">
    <div className="row">
      <div className="price-block">
        <div className="top">{priceTop}</div>
        <div className="big">{priceText}</div>
      </div>
      <button className="btn btn-primary" onClick={onApply}>
        Apply now
        <Icon name="arrow-right" size={16} />
      </button>
    </div>
  </div>
);
window.StickyApply = StickyApply;
