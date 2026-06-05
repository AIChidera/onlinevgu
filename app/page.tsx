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
import type { SanityFaq } from '@/lib/sanity'
import {
  getTestimonials,
  getHomeFaqs,
  getCampusEvents,
  getAllPrograms,
} from '@/lib/sanity'
import { PROGRAMMES } from './programs/data'

const CourseExperienceSection = dynamic(
  () => import('@/components/sections/CourseExperienceSection'),
  { ssr: false }
)

const ORG_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Vivekananda Global University Online',
  alternateName: 'Online VGU',
  url: 'https://onlinevgu.in',
  sameAs: ['https://vgu.ac.in'],
  description: 'NAAC A+ accredited online UG and PG degree programs from Vivekananda Global University. UGC-entitled degrees trusted by 50,000+ learners across India.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'VGU Campus, Dadupura',
    addressLocality: 'Jaipur',
    addressRegion: 'Rajasthan',
    postalCode: '303012',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-1800-123-456',
    contactType: 'admissions',
    areaServed: 'IN',
    availableLanguage: ['English', 'Hindi'],
  },
}

function buildFaqJsonLd(faqs: SanityFaq[]) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

export default async function HomePage() {
  const [testimonials, faqs, campusEvents, sanityPrograms] = await Promise.all([
    getTestimonials(),
    getHomeFaqs(),
    getCampusEvents(),
    getAllPrograms(),
  ])
  const programCount = sanityPrograms.length > 0 ? sanityPrograms.length : PROGRAMMES.length

  const faqJsonLd = buildFaqJsonLd(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_JSON_LD) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Hero />
      <TrustBar />
      <ProgramsSection />
      <ImpactSection programCount={programCount} />
      <CampusImmersionsSection events={campusEvents} />
      <Testimonials stories={testimonials} />
      <CourseExperienceSection />
      <FeaturesSection />
      <StepsSection />
      <FaqSection faqs={faqs} />
    </>
  )
}
