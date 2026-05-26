'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ImpactSection from '@/components/sections/ImpactSection'
import CampusImmersionsSection from '@/components/sections/CampusImmersionsSection'
import Testimonials from '@/components/sections/Testimonials'
import CourseExperienceSection from '@/components/sections/CourseExperienceSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import StepsSection from '@/components/sections/StepsSection'
import FAQ from '@/components/sections/FAQ'
import FooterCTA from '@/components/sections/FooterCTA'
import EnquiryModal from '@/components/forms/EnquiryModal'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Hero onApply={() => setModalOpen(true)} />
      <ProgramsSection />
      <ImpactSection />
      <CampusImmersionsSection />
      <Testimonials />
      <CourseExperienceSection />
      <FeaturesSection />
      <StepsSection />
      {/* S10 FAQ+Counsellor, S11 Accreditation — coming next */}
      <FAQ />
      <FooterCTA onApply={() => setModalOpen(true)} />
      <EnquiryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
