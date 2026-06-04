'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'
import FooterCTA from '@/components/sections/FooterCTA'
import CounsellorModal from '@/components/ui/CounsellorModal'
import ApplyModal from '@/components/ui/ApplyModal'
import BrochureModal from '@/components/ui/BrochureModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollReveal from '@/components/ScrollReveal'

export default function SiteFooter() {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return (
    <>
      <FooterCTA />
      <Footer />
      <CounsellorModal />
      <ApplyModal />
      <BrochureModal />
      <WhatsAppButton />
      <ScrollReveal />
    </>
  )
}
