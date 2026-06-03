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
import {
  getTestimonials,
  getHomeFaqs,
  getCampusEvents,
} from '@/lib/sanity'

const CourseExperienceSection = dynamic(
  () => import('@/components/sections/CourseExperienceSection'),
  { ssr: false }
)

export default async function HomePage() {
  const [testimonials, faqs, campusEvents] = await Promise.all([
    getTestimonials(),
    getHomeFaqs(),
    getCampusEvents(),
  ])

  return (
    <>
      <Hero />
      <TrustBar />
      <ProgramsSection />
      <ImpactSection />
      <CampusImmersionsSection events={campusEvents} />
      <Testimonials stories={testimonials} />
      <CourseExperienceSection />
      <FeaturesSection />
      <StepsSection />
      <FaqSection faqs={faqs} />
    </>
  )
}
