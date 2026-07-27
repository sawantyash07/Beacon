import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { DestinationGallery } from '@/components/landing/DestinationGallery'
import { PopularPackages } from '@/components/landing/PopularPackages'
import { Features } from '@/components/landing/Features'
import { WorldMap } from '@/components/landing/WorldMap'
import { Stats } from '@/components/landing/Stats'
import { Testimonials } from '@/components/landing/Testimonials'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { BlogSection } from '@/components/landing/BlogSection'
import { Partners } from '@/components/landing/Partners'
import { CTASection } from '@/components/landing/CTASection'
import { Footer } from '@/components/landing/Footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <DestinationGallery />
      <PopularPackages />
      <Features />
      <WorldMap />
      <Stats />
      <Testimonials />
      <HowItWorks />
      <BlogSection />
      <Partners />
      <CTASection />
      <Footer />
    </div>
  )
}
