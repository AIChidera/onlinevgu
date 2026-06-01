import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'vgu-red':      '#C04036',
        'vgu-dark':     '#821a12',
        'vgu-red-dark': '#821a12',
        'vgu-yellow':   '#FFA412',
        'vgu-gold':     '#eecf63',
        'vgu-beige':    '#F4D7C1',
        neutral: {
          900: '#111827',
          600: '#4B5563',
          200: '#E5E7EB',
          50:  '#F9FAFB',
        },
      },
      fontFamily: {
        heading: ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        body:    ['var(--font-lato)',   'Lato',   'sans-serif'],
      },
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
        '34': '136px',
      },
      boxShadow: {
        sm:  '0 1px 2px rgba(17,24,39,0.05)',
        md:  '0 4px 12px rgba(130,26,18,0.08), 0 1px 3px rgba(17,24,39,0.05)',
        lg:  '0 12px 28px rgba(130,26,18,0.10), 0 4px 8px rgba(17,24,39,0.04)',
        cta: '0 8px 20px rgba(192,64,54,0.28)',
      },
      transitionTimingFunction: {
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        content: '1280px',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        riseIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'none' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
        pulseRing: {
          '0%':   { transform: 'scale(0.6)', opacity: '0.6' },
          '100%': { transform: 'scale(2)',   opacity: '0' },
        },
        heroSpin: {
          to: { transform: 'rotate(360deg)' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-10px)' },
        },
        floatUpSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-14px)' },
        },
        tickerScroll: {
          '0%':   { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-50%, 0, 0)' },
        },
        // ── Entrance animations (triggered by IntersectionObserver) ──
        'enter-up': {
          '0%':   { opacity: '0', transform: 'translateY(48px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'enter-materialize': {
          '0%':   { opacity: '0', transform: 'scale(0.88)' },
          '100%': { opacity: '1', transform: 'scale(1)'    },
        },
        'enter-left': {
          '0%':   { opacity: '0', transform: 'translateX(-64px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'enter-right': {
          '0%':   { opacity: '0', transform: 'translateX(64px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in':       'fadeIn 360ms cubic-bezier(0.22, 1, 0.36, 1)',
        'rise-in':       'riseIn 360ms cubic-bezier(0.22, 1, 0.36, 1)',
        'float-y':       'floatY 5s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'float-up':      'floatUp 4s ease-in-out infinite',
        'float-up-slow': 'floatUpSlow 5.5s ease-in-out infinite',
        'pulse-ring':    'pulseRing 1.6s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'hero-spin':     'heroSpin 60s linear infinite',
        'ticker-scroll': 'tickerScroll 38s linear infinite',
        // Entrance animations
        'enter-up':          'enter-up 650ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'enter-materialize': 'enter-materialize 700ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'enter-left':        'enter-left 650ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'enter-right':       'enter-right 650ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
