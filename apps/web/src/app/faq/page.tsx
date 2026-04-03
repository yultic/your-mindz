import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { FAQSection } from '@/components/sections/faq-section'

export const metadata: Metadata = {
  title: 'FAQ | Therapy Questions Answered',
  description: 'Frequently asked questions about therapy, confidentiality, scheduling, costs, and what to expect in your first session.',
  keywords: 'therapy FAQ, counseling questions, therapy confidentiality, HIPAA, mental health help',
  openGraph: {
    title: 'Frequently Asked Questions About Therapy',
    description: 'Get answers to common questions about therapy, scheduling, and mental health treatment.',
    url: 'https://therapist-website.com/faq',
    type: 'website',
  },
}

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground">
            Common questions about therapy, confidentiality, and getting started
          </p>
        </div>

        <FAQSection />
      </div>

      <Footer />
    </main>
  )
}
