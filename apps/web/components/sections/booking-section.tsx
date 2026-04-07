'use client'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@jess-web/ui'

export function BookingSection() {
  return (
    <section id="info" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-secondary/50 border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-2xl font-serif">
              Before Your First Session
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 text-muted-foreground">
            <div>
              <h4 className="font-bold text-[#4a5568] mb-3 text-lg">What to Expect</h4>
              <p className="leading-relaxed">
                Your first session is a consultation where we'll discuss your concerns, therapy
                goals, and my approach. This is a safe space for you to share and for us to see how we can best work together.
              </p>
            </div>
            
            <div className="border-t border-border/50 pt-8">
              <h4 className="font-bold text-[#4a5568] mb-3 text-lg">Cancellation Policy</h4>
              <p className="leading-relaxed">
                Consistency is key in therapy. Cancellations or rescheduling must be made at least 24 hours in advance to avoid a cancellation fee. This allows others to use the time slot.
              </p>
            </div>
            
            <div className="border-t border-border/50 pt-8">
              <h4 className="font-bold text-[#4a5568] mb-3 text-lg">Privacy & Confidentiality</h4>
              <p className="leading-relaxed">
                All sessions are strictly confidential. Your privacy and safety are my top priorities, and I adhere to the highest professional standards to protect your personal information.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
