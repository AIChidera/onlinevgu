'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ImpactSection from '@/components/sections/ImpactSection'
import WhyVGU from '@/components/sections/WhyVGU'
import CourseraSection from '@/components/sections/CourseraSection'
import AdmissionTimeline from '@/components/sections/AdmissionTimeline'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import IntakeCountdown from '@/components/sections/IntakeCountdown'
import FooterCTA from '@/components/sections/FooterCTA'
import EnquiryModal from '@/components/forms/EnquiryModal'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Hero onApply={() => setModalOpen(true)} />
      <TrustBar />
      <ProgramsSection />
      <ImpactSection />
      <WhyVGU />
      <CourseraSection />
      <AdmissionTimeline />
      <Testimonials />
      <FAQ />
      <IntakeCountdown />
      <FooterCTA onApply={() => setModalOpen(true)} />
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
