'use client'

import Hero from '@/components/sections/Hero'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ImpactSection from '@/components/sections/ImpactSection'
import CampusImmersionsSection from '@/components/sections/CampusImmersionsSection'
import Testimonials from '@/components/sections/Testimonials'
import CourseExperienceSection from '@/components/sections/CourseExperienceSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import StepsSection from '@/components/sections/StepsSection'
import FaqSection from '@/components/sections/FaqSection'
import AccreditationStrip from '@/components/sections/AccreditationStrip'

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProgramsSection />
      <ImpactSection />
      <CampusImmersionsSection />
      <Testimonials />
      <CourseExperienceSection />
      <FeaturesSection />
      <StepsSection />
      <FaqSection />
      <AccreditationStrip />
    </>
  )
}
