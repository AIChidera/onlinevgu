'use client'

import dynamic from 'next/dynamic'
import Hero from '@/components/sections/Hero'
import TrustBar from '@/components/sections/TrustBar'
import ProgramsSection from '@/components/sections/ProgramsSection'
import ImpactSection from '@/components/sections/ImpactSection'
import CampusImmersionsSection from '@/components/sections/CampusImmersionsSection'
import Testimonials from '@/components/sections/Testimonials'
import FeaturesSection from '@/components/sections/FeaturesSection'
import StepsSection from '@/components/sections/StepsSection'
import FaqSection from '@/components/sections/FaqSection'
import AccreditationStrip from '@/components/sections/AccreditationStrip'

const CourseExperienceSection = dynamic(
  () => import('@/components/sections/CourseExperienceSection'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
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
