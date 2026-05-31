import type { Metadata, Viewport } from 'next'
import { Nunito, Lato } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollReveal from '@/components/ScrollReveal'
import CounsellorModal from '@/components/ui/CounsellorModal'
import ApplyModal from '@/components/ui/ApplyModal'
import BrochureModal from '@/components/ui/BrochureModal'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${nunito.variable} ${lato.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CounsellorModal />
        <ApplyModal />
        <BrochureModal />
        <WhatsAppButton />
        <ScrollReveal />
      </body>
    </html>
  )
}
