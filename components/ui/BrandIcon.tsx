export const BRAND_ICON_NAMES = new Set([
  'Coursera','Google','IBM','Meta','Microsoft','Amazon','AWS','DeepLearning.AI',
  'Accenture','Deloitte','KPMG','EY','PwC','Grant Thornton',
  'TCS','Infosys','Wipro','HCL','HCL Tech','Oracle','Cognizant','Capgemini','Tech Mahindra','LTIMindtree','Mphasis',
  'Razorpay','HDFC Bank','ICICI Bank','SBI','Axis Bank','Kotak Mahindra Bank','Bajaj Finserv','HDFC Life','ICICI Prudential',
  'Flipkart','Swiggy','Zomato','Paytm','PhonePe',
  'Apollo Hospitals','Fortis Healthcare','Max Healthcare',"Dr. Reddy's",'Manipal Hospitals','Cipla','Sun Pharma','Biocon',
  'Tata Group','Reliance Industries','Hindustan Unilever','ITC','Mahindra',
  'QS',
])

export default function BrandIcon({ name, className = 'w-full h-full' }: { name: string; className?: string }) {
  switch (name) {

    /* ── Global tech platforms ───────────────────────────────────── */
    case 'Coursera': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Coursera">
        <rect width="24" height="24" rx="4" fill="#0056D2"/>
        <path d="M17 16.8A7 7 0 1 1 17 7.2" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
      </svg>
    )
    case 'Google': return (
      <svg viewBox="0 0 24 24" className={className} aria-label="Google">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    )
    case 'IBM': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="IBM">
        <rect width="24" height="24" rx="3" fill="white"/>
        {[2,5,8,11,14,17,20].map((y, i) => (
          <rect key={y} x={i % 2 === 0 ? 1 : 3} y={y} width={i % 2 === 0 ? 22 : 18} height="2" rx="0.5" fill="#006699"/>
        ))}
      </svg>
    )
    case 'Meta': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Meta">
        <ellipse cx="7" cy="12" rx="5.5" ry="3.8" stroke="#0082FB" strokeWidth="2.2" fill="none"/>
        <ellipse cx="17" cy="12" rx="5.5" ry="3.8" stroke="#0082FB" strokeWidth="2.2" fill="none"/>
      </svg>
    )
    case 'Microsoft': return (
      <svg viewBox="0 0 24 24" className={className} aria-label="Microsoft">
        <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
        <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
        <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
        <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
      </svg>
    )
    case 'Amazon': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Amazon">
        <rect width="24" height="24" rx="3" fill="#232F3E"/>
        <path d="M5.5 15.5Q12 18.5 18.5 15.5" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
        <path d="M17 14l2.5 1.5-2.5 1.5" stroke="#FF9900" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'AWS': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="AWS">
        <rect width="24" height="24" rx="3" fill="#232F3E"/>
        <path d="M5 14Q8.5 9 12 9Q15.5 9 19 14" stroke="#FF9900" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <path d="M3 17.5Q12 21 21 17.5" stroke="#FF9900" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M19.5 15.8l2 1.7-2 1.5" stroke="#FF9900" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'DeepLearning.AI': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="DeepLearning.AI">
        <rect width="24" height="24" rx="3" fill="#E84393"/>
        <circle cx="5" cy="8" r="1.8" fill="white"/>
        <circle cx="5" cy="16" r="1.8" fill="white"/>
        <circle cx="12.5" cy="12" r="2.2" fill="white"/>
        <circle cx="20" cy="12" r="1.8" fill="white"/>
        <line x1="6.8" y1="8.9" x2="10.3" y2="11.2" stroke="white" strokeWidth="1" opacity="0.8"/>
        <line x1="6.8" y1="15.1" x2="10.3" y2="12.8" stroke="white" strokeWidth="1" opacity="0.8"/>
        <line x1="14.7" y1="12" x2="18.2" y2="12" stroke="white" strokeWidth="1" opacity="0.8"/>
      </svg>
    )

    /* ── Consulting ───────────────────────────────────────────────── */
    case 'Accenture': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Accenture">
        <rect width="24" height="24" rx="3" fill="#A100FF"/>
        <path d="M8 6.5l8 5.5-8 5.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'Deloitte': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Deloitte">
        <rect width="24" height="24" rx="3" fill="#86BC25"/>
        <rect x="4" y="9" width="13" height="2.5" rx="1.25" fill="white"/>
        <rect x="4" y="14" width="16" height="2.5" rx="1.25" fill="white"/>
        <circle cx="20" cy="6.5" r="2.5" fill="white"/>
      </svg>
    )
    case 'KPMG': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="KPMG">
        <rect width="24" height="24" rx="3" fill="#00338D"/>
        <path d="M5 7v10M5 12l7-5M5 12l7 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'EY': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="EY">
        <rect width="24" height="24" rx="3" fill="#FFE600"/>
        <path d="M4 8h8M4 12h6M4 16h8" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round"/>
        <path d="M16 8l4 4-4 4M16 12h5" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'PwC': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="PwC">
        <rect width="24" height="24" rx="3" fill="#E0301E"/>
        <circle cx="10" cy="12" r="5" stroke="white" strokeWidth="2.2" fill="none"/>
        <path d="M17 8v8M20 8v8M17 12h3" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'Grant Thornton': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Grant Thornton">
        <rect width="24" height="24" rx="3" fill="#A72080"/>
        <path d="M4 12Q4 6 12 6Q18 6 18 12Q18 18 20 18" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="20" cy="18" r="2" fill="white"/>
      </svg>
    )

    /* ── Indian IT / tech services ────────────────────────────────── */
    case 'TCS': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="TCS">
        <rect width="24" height="24" rx="4" fill="#00539F"/>
        <path d="M8 8L4 12L8 16M16 8L20 12L16 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 6L11 18" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    )
    case 'Infosys': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Infosys">
        <rect width="24" height="24" rx="3" fill="#007CC3"/>
        <path d="M12 5L7 8v8l5 3 5-3V8z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <line x1="7" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
    case 'Wipro': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Wipro">
        <rect width="24" height="24" rx="3" fill="#344D8B"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#FFD600" opacity="0.95"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#00A651" opacity="0.9" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#EE3423" opacity="0.9" transform="rotate(120 12 12)"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#FFD600" opacity="0.85" transform="rotate(180 12 12)"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#00A651" opacity="0.85" transform="rotate(240 12 12)"/>
        <ellipse cx="12" cy="12" rx="2.5" ry="6" fill="#EE3423" opacity="0.85" transform="rotate(300 12 12)"/>
        <circle cx="12" cy="12" r="3.5" fill="#344D8B"/>
      </svg>
    )
    case 'HCL':
    case 'HCL Tech': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="HCL Technologies">
        <rect width="24" height="24" rx="3" fill="#EF3E23"/>
        <path d="M4 7v10M4 12h5M9 7v10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13 12Q13 7 17.5 7Q22 7 22 12Q22 17 17.5 17" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    )
    case 'Oracle': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Oracle">
        <rect width="24" height="24" rx="3" fill="#C0392B"/>
        <rect x="2" y="9.5" width="20" height="5" rx="2.5" fill="white"/>
      </svg>
    )
    case 'Cognizant': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Cognizant">
        <rect width="24" height="24" rx="3" fill="#1B62B0"/>
        <path d="M19 8A8 8 0 1 0 19 16" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="19" cy="12" r="2.5" fill="white"/>
      </svg>
    )
    case 'Capgemini': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Capgemini">
        <rect width="24" height="24" rx="3" fill="#003057"/>
        <path d="M12 4L4 20L12 16.5L20 20Z" fill="white" fillOpacity="0.92"/>
        <circle cx="12" cy="11" r="2.5" fill="#003057"/>
      </svg>
    )
    case 'Tech Mahindra': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Tech Mahindra">
        <rect width="24" height="24" rx="3" fill="#C4003F"/>
        <path d="M3 7l4.5 10L12 7l4.5 10L21 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case 'LTIMindtree': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="LTIMindtree">
        <rect width="24" height="24" rx="3" fill="#1A5E20"/>
        <path d="M4 17V7l4 7 4-7 4 7" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="4" y1="17" x2="20" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'Mphasis': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Mphasis">
        <rect width="24" height="24" rx="3" fill="#0C2461"/>
        <path d="M4 17V7l4 5 4-5 4 5 4-5v10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )

    /* ── Indian fintech / payments ────────────────────────────────── */
    case 'Razorpay': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Razorpay">
        <rect width="24" height="24" rx="4" fill="#072654"/>
        <path d="M14 4L7 13H12L10 20L17 11H12L14 4Z" fill="#2D80F2"/>
      </svg>
    )
    case 'Paytm': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Paytm">
        <rect width="24" height="24" rx="3" fill="#002970"/>
        <path d="M4 12Q4 5 12 5Q20 5 20 12Q20 19 12 19Q8 19 6 16" stroke="#00B9F1" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="3" fill="#00B9F1"/>
      </svg>
    )
    case 'PhonePe': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="PhonePe">
        <rect width="24" height="24" rx="12" fill="#5F259F"/>
        <path d="M8 4h4Q14 4 14 7Q14 10 11 10H8V4z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <line x1="8" y1="7" x2="8" y2="20" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M8 10h5Q18 10 18 14Q18 18 13 18H8" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      </svg>
    )

    /* ── Indian banking ───────────────────────────────────────────── */
    case 'HDFC Bank': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="HDFC Bank">
        <rect width="24" height="24" rx="4" fill="#004C8F"/>
        <path d="M6 7V17M18 7V17M6 12H18" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    )
    case 'ICICI Bank': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="ICICI Bank">
        <rect width="24" height="24" rx="3" fill="#102C57"/>
        <path d="M4 15Q8 8 12 15Q16 22 20 15" stroke="#F37420" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M4 9Q8 2 12 9Q16 16 20 9" stroke="#F37420" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
      </svg>
    )
    case 'SBI': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="State Bank of India">
        <rect width="24" height="24" rx="3" fill="#1F4E9C"/>
        <path d="M12 4Q18 4 18 10Q18 14 14 15.5L14 20L10 20L10 15.5Q6 14 6 10Q6 4 12 4z" stroke="white" strokeWidth="1.8" fill="none"/>
        <circle cx="12" cy="10" r="2" fill="white"/>
      </svg>
    )
    case 'Axis Bank': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Axis Bank">
        <rect width="24" height="24" rx="3" fill="#800000"/>
        <path d="M12 4L4 20L20 20Z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <line x1="7.5" y1="14.5" x2="16.5" y2="14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'Kotak Mahindra Bank': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Kotak Mahindra Bank">
        <rect width="24" height="24" rx="3" fill="#C40000"/>
        <path d="M5 7v10M5 12l8-5M5 12l8 5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <line x1="16" y1="7" x2="16" y2="17" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      </svg>
    )
    case 'Bajaj Finserv': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Bajaj Finserv">
        <rect width="24" height="24" rx="3" fill="#0066CC"/>
        <path d="M5 7h7Q13 7 13 10Q13 13 10 13H5z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <path d="M5 13h8Q17 13 17 17Q17 17 12 17H5z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
      </svg>
    )
    case 'HDFC Life': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="HDFC Life">
        <rect width="24" height="24" rx="3" fill="#004088"/>
        <path d="M5 7V17M11 7V17M5 12H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <path d="M15 7h6M18 7v10M15 17h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'ICICI Prudential': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="ICICI Prudential">
        <rect width="24" height="24" rx="3" fill="#F37420"/>
        <path d="M12 4v16M6 9h12M6 15h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )

    /* ── E-commerce & consumer tech ──────────────────────────────── */
    case 'Flipkart': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Flipkart">
        <rect width="24" height="24" rx="3" fill="#2874F0"/>
        <path d="M6 4h12L17 8H7z" fill="#FFCD00"/>
        <path d="M7 8h10l-2 12H9z" fill="white"/>
        <path d="M12 11v5M10 13h4" stroke="#2874F0" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    )
    case 'Swiggy': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Swiggy">
        <rect width="24" height="24" rx="12" fill="#FC8019"/>
        <path d="M12 6Q17 6 17 11Q17 14 14.5 15Q17 16 16 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <circle cx="12.5" cy="11" r="2" fill="white"/>
      </svg>
    )
    case 'Zomato': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Zomato">
        <rect width="24" height="24" rx="12" fill="#E23744"/>
        <path d="M7 9h10L9 15h8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )

    /* ── Healthcare ───────────────────────────────────────────────── */
    case 'Apollo Hospitals': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Apollo Hospitals">
        <rect width="24" height="24" rx="3" fill="#003781"/>
        <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="1.5" fill="none" opacity="0.45"/>
      </svg>
    )
    case 'Fortis Healthcare': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Fortis Healthcare">
        <rect width="24" height="24" rx="3" fill="#F77F00"/>
        <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    )
    case 'Max Healthcare': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Max Healthcare">
        <rect width="24" height="24" rx="3" fill="#E31837"/>
        <path d="M4 17V7l4 5 4-5 4 5 4-5v10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
    case "Dr. Reddy's": return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Dr. Reddy's">
        <rect width="24" height="24" rx="3" fill="#1E3A5F"/>
        <path d="M5 7h6Q15 7 15 12Q15 17 11 17H5V7z" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <circle cx="19" cy="12" r="3" fill="white" fillOpacity="0.7"/>
      </svg>
    )
    case 'Manipal Hospitals': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Manipal Hospitals">
        <rect width="24" height="24" rx="3" fill="#1565C0"/>
        <path d="M12 4v16M4 12h16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="7.5" y="7.5" width="9" height="9" stroke="white" strokeWidth="1.5" fill="none" rx="1" opacity="0.5"/>
      </svg>
    )
    case 'Cipla': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Cipla">
        <rect width="24" height="24" rx="3" fill="#005BAC"/>
        <path d="M18 8A7 7 0 1 0 18 16" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    )
    case 'Sun Pharma': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Sun Pharma">
        <rect width="24" height="24" rx="3" fill="#1E3A7B"/>
        <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2 2M16.4 16.4l2 2M5.6 18.4l2-2M16.4 7.6l2-2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    )
    case 'Biocon': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Biocon">
        <rect width="24" height="24" rx="3" fill="#0F4C75"/>
        <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" fill="none"/>
        <path d="M9 12h6M12 9v6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )

    /* ── Conglomerates / FMCG ────────────────────────────────────── */
    case 'Tata Group': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Tata Group">
        <rect width="24" height="24" rx="3" fill="#0C2461"/>
        <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="2" fill="none"/>
        <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="7" y1="9" x2="17" y2="9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'Reliance Industries': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Reliance Industries">
        <rect width="24" height="24" rx="3" fill="#1B3A6B"/>
        <path d="M5 7h7Q14 7 14 10.5Q14 14 11 14H5V7z" stroke="white" strokeWidth="1.8" fill="none" strokeLinejoin="round"/>
        <line x1="5" y1="14" x2="5" y2="19" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M11 14L17 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    )
    case 'Hindustan Unilever': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Hindustan Unilever">
        <rect width="24" height="24" rx="3" fill="#003399"/>
        <path d="M5 7v6Q5 17 12 17Q19 17 19 13V7" stroke="white" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      </svg>
    )
    case 'ITC': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="ITC">
        <rect width="24" height="24" rx="3" fill="#006400"/>
        <line x1="4" y1="4" x2="20" y2="4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="12" y1="4" x2="12" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M4 12Q4 8 7 8Q10 8 10 12Q10 16 7 16" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
      </svg>
    )
    case 'Mahindra': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="Mahindra">
        <rect width="24" height="24" rx="3" fill="#C41E3A"/>
        <path d="M4 17V7l4 5 4-5 4 5 4-5v10" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )

    /* ── Accreditation ───────────────────────────────────────────── */
    case 'QS': return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-label="QS World Rankings">
        <rect width="24" height="24" rx="3" fill="#111827"/>
        <path d="M12 5A7 7 0 1 1 17 17L20 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      </svg>
    )

    default: return null
  }
}
