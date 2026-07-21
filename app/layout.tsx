import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google'
import './globals.css'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Footer from '@/components/layout/Footer'
import FooterCTA from '@/components/sections/FooterCTA'
import Analytics from '@/components/Analytics'
import HashScroller from '@/components/HashScroller'
import CookieConsent from '@/components/CookieConsent'
import ScrollToTop from '@/components/ui/ScrollToTop'
import IntakeCountdown from '@/components/sections/IntakeCountdown'
import { getSiteConfig } from '@/lib/sanity'
import { Analytics as VercelAnalytics } from '@vercel/analytics/next'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light',
}

export const metadata: Metadata = {
  title: {
    default: 'Online VGU | UGC-Recognised Online Degrees',
    template: '%s | Online VGU',
  },
  description:
    'Join 50,000+ learners. NAAC A+ accredited online degrees from Vivekananda Global University. 100% online, UGC recognised.',
  keywords: [
    'online MBA',
    'online MCA',
    'online BBA',
    'online degree India',
    'UGC recognised online university',
    'NAAC A+ accredited',
    'Vivekananda Global University',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://onlinevgu.com',
    siteName: 'Online VGU',
    title: 'Online VGU | UGC-Recognised Online Degrees',
    description:
      'Join 50,000+ learners. NAAC A+ accredited online degrees from Vivekananda Global University.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Online VGU | UGC-Recognised Online Degrees',
    description: 'Join 50,000+ learners. NAAC A+ accredited online degrees, 100% online.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const config = await getSiteConfig()
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakartaSans.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">
        {/* GTM noscript fallback, must be the first element inside body */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Analytics />
        <VercelAnalytics />
        <HashScroller />
        <CookieConsent />
        {/* Skip link - visually hidden until focused by keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:bg-vgu-red focus:px-4 focus:py-2 focus:text-white focus:font-heading focus:font-semibold focus:text-[15px] focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>
        <IntakeCountdown nextBatch={config.nextBatch} />
        <SiteNav />
        <main id="main-content">{children}</main>
        <ScrollToTop />
        <SiteFooter whatsappNumber={config.whatsappNumber} whatsappUrl={config.whatsappUrl} nextBatch={config.nextBatch}>
          <FooterCTA nextBatch={config.nextBatch} />
          <Footer />
        </SiteFooter>
      </body>
    </html>
  )
}
