import type { Metadata, Viewport } from 'next'
import { Nunito, Lato } from 'next/font/google'
import './globals.css'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import Footer from '@/components/layout/Footer'
import FooterCTA from '@/components/sections/FooterCTA'
import Analytics from '@/components/Analytics'
import ScrollToTop from '@/components/ui/ScrollToTop'
import { getSiteSettings } from '@/lib/sanity'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
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
    url: 'https://onlinevgu.in',
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
  const settings = await getSiteSettings()
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${lato.variable}`}>
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
        <SiteNav />
        <main>{children}</main>
        <ScrollToTop />
        <SiteFooter whatsappNumber={settings?.whatsappNumber}>
          <FooterCTA />
          <Footer />
        </SiteFooter>
      </body>
    </html>
  )
}
