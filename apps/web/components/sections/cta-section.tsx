import { Button, Card, CardContent } from '@jess-web/ui'
import { CheckCircle } from 'lucide-react'

export function CtaSection() {
  const benefits = [
    'Safe, confidential therapeutic space',
    'Evidence-based treatment approaches',
    'Flexible scheduling (in-person & virtual)',
    'Transparent pricing and policies',
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/80 text-primary-foreground">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Healing Journey?
          </h2>
          <p className="text-xl opacity-90 mb-8">
            Take the first step toward positive change. Schedule your appointment today.
          </p>
        </div>

        {/* Benefits Grid */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20 mb-12">
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg h-auto"
          >
            <a href="#booking">Schedule Now</a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg h-auto"
          >
            <a href="mailto:contact@therapypractice.com">Get in Touch</a>
          </Button>
        </div>

        {/* Support Text */}
        <p className="text-center mt-12 text-primary-foreground/80 text-sm">
          If you're in crisis, please contact a crisis helpline or emergency services immediately.
        </p>
      </div>
    </section>
  )
}
