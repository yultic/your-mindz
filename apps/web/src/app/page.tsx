import { Navigation } from '@/components/layout/navigation'
import { HeroSection } from '@/components/sections/hero-section'
import { TherapistProfile } from '@/components/sections/therapist-profile'
import { WhoComesSection } from '@/components/sections/whocomessection'
import { ServicesSection } from '@/components/sections/services-section'
import { BookingSection } from '@/components/sections/booking-section'
import { Testimonials } from '@/components/sections/testimonials'
import { CtaSection } from '@/components/sections/cta-section'
import { Footer } from '@/components/layout/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TherapistProfile />
      <WhoComesSection />
      <ServicesSection />
      <BookingSection />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  )
}
