'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, MessageCircle, Calendar } from 'lucide-react'

export function BookingSection() {
  return (
    <section id="booking" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Book Your Appointment
          </h2>
          <p className="text-xl text-muted-foreground">
            Multiple ways to schedule therapy that works with your lifestyle
          </p>
        </div>

        {/* Primary Booking Method - Calendly */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-foreground">Online Booking</CardTitle>
                <CardDescription>Instant scheduling with automatic confirmations</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              View my available time slots and book your appointment instantly. You'll receive automatic 
              confirmation via email with all session details.
            </p>
            
            {/* Calendly Embed */}
            <div className="bg-background rounded-lg border border-border p-4">
              <iframe
                src="https://calendly.com/your-username/30min"
                width="100%"
                height="700"
                frameBorder="0"
                title="Calendly Booking Calendar"
                loading="lazy"
              ></iframe>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Select your preferred date and time above. First-time clients will be asked to complete a brief intake form.
            </p>
          </CardContent>
        </Card>

        {/* Alternative Booking Methods */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Option */}
          <Card className="bg-background hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-foreground text-lg">Email</CardTitle>
                  <CardDescription>For scheduling preferences or questions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Prefer email communication? Send me a message with your availability, and I'll respond within 24 hours.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                <a href="mailto:contact@therapypractice.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp Option */}
          <Card className="bg-background hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-primary" />
                <div>
                  <CardTitle className="text-foreground text-lg">WhatsApp</CardTitle>
                  <CardDescription>Quick scheduling & communication</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Message me on WhatsApp for quick scheduling or to ask any preliminary questions.
              </p>
              <Button
                asChild
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
              >
                <a
                  href="https://wa.me/1234567890?text=Hi%20I%20would%20like%20to%20schedule%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Now
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Important Information */}
        <Card className="mt-8 bg-secondary/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Before Your First Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What to Expect</h4>
              <p>
                Your first session is a consultation where we'll discuss your concerns, therapy goals, and my approach. 
                This helps ensure we're a good fit for working together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
              <p>
                Cancellations or rescheduling must be made at least 24 hours in advance to avoid a cancellation fee.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Privacy & Confidentiality</h4>
              <p>
                All sessions are confidential and HIPAA compliant. Your privacy and safety are my top priorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
