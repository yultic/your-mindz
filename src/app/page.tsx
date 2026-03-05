import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { TherapistProfile } from '@/components/therapist-profile'
import { ServicesSection } from '@/components/services-section'
import { BookingSection } from '@/components/booking-section'
import { Testimonials } from '@/components/testimonials'
import { CtaSection } from '@/components/cta-section'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <TherapistProfile />
      <ServicesSection />
      <BookingSection />
      <Testimonials />
      <CtaSection />
      <Footer />
    </main>
  )
}
