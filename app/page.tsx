export const revalidate = 3600

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
  getSiteSettings,
  getSiteConfig,
} from '@/lib/sanity'

const CourseExperienceSection = dynamic(
  () => import('@/components/sections/CourseExperienceSection'),
  { ssr: false }
)

function buildOrgJsonLd(phoneTel: string, address: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Vivekananda Global University Online',
    alternateName: 'Online VGU',
    url: 'https://onlinevgu.in',
    sameAs: ['https://vgu.ac.in'],
    description: 'NAAC A+ accredited online UG and PG degree programs from Vivekananda Global University. UGC-entitled degrees trusted by 50,000+ learners across India.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.split('\n')[0] || 'VGU Campus, Jagatpura',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      postalCode: '303012',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: phoneTel,
      contactType: 'admissions',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  }
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

// Parse a stat string like "50,000+" → 50000, "4.8/5" → 4.8, "95%" → 95
function parseStat(s: string | undefined | null, fallback: number): number {
  if (!s) return fallback
  const match = s.match(/[\d,]+(\.\d+)?/)
  if (!match) return fallback
  return parseFloat(match[0].replace(/,/g, ''))
}

export default async function HomePage() {
  const [testimonials, faqs, campusEvents, sanityPrograms, siteSettings, config] = await Promise.all([
    getTestimonials(),
    getHomeFaqs(),
    getCampusEvents(),
    getAllPrograms(),
    getSiteSettings(),
    getSiteConfig(),
  ])

  const faqJsonLd = buildFaqJsonLd(faqs)
  const orgJsonLd = buildOrgJsonLd(config.phoneTel, config.address)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Hero nextBatch={config.nextBatch} />
      <TrustBar />
      <ProgramsSection programmes={sanityPrograms.length > 0 ? sanityPrograms : undefined} />
      <ImpactSection
        statLearners={parseStat(siteSettings?.statLearners,    50000)}
        statCountries={parseStat(siteSettings?.statCountries,  40)}
        statPlacement={parseStat(siteSettings?.statPlacement,  95)}
        statRating={parseStat(siteSettings?.statRating,        4.8)}
        statCoursera={parseStat(siteSettings?.statCourseraCount, 7000)}
      />
      <CampusImmersionsSection events={campusEvents} />
      <Testimonials stories={testimonials} />
      <CourseExperienceSection />
      <FeaturesSection />
      <StepsSection nextBatch={config.nextBatch} />
      <FaqSection faqs={faqs} />
    </>
  )
}
