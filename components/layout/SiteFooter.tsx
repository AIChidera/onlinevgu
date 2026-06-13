'use client'

import { usePathname } from 'next/navigation'
import CounsellorModal from '@/components/ui/CounsellorModal'
import ApplyModal from '@/components/ui/ApplyModal'
import BrochureModal from '@/components/ui/BrochureModal'
import WhatsAppButton from '@/components/WhatsAppButton'
import ScrollReveal from '@/components/ScrollReveal'

// children = <FooterCTA /> and <Footer />, rendered as Server Components by
// the layout and passed through here. Importing them directly would pull
// Footer's async/unstable_cache code into the client bundle, which crashes
// hydration and silently kills every client component on the page (modals,
// ScrollReveal, CountUp, all onClick handlers).
interface Props {
  children:       React.ReactNode
  whatsappNumber?: string
}

export default function SiteFooter({ children, whatsappNumber }: Props) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return (
    <>
      {children}
      <CounsellorModal />
      <ApplyModal />
      <BrochureModal />
      <WhatsAppButton phoneNumber={whatsappNumber} />
      <ScrollReveal />
    </>
  )
}
