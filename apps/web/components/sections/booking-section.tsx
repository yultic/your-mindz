'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from '@jess-web/ui'
import { Mail, MessageCircle, Calendar, CreditCard, CheckCircle } from 'lucide-react'
import { PaypalCheckout, type PaymentResult } from '@/components/features/checkout/paypal-checkout'


const SESSION_OPTIONS = [
  {
    id: 'initial',
    label: 'Initial Consultation',
    duration: '30 min',
    price: '0.00',
    displayPrice: 'Free',
    description: 'Meet & assess therapeutic fit',
  },
  {
    id: 'individual',
    label: 'Individual Session',
    duration: '50 min',
    price: '75.00',
    displayPrice: '$75',
    description: 'Standard therapy session',
  },
  {
    id: 'couples',
    label: 'Couples Session',
    duration: '60 min',
    price: '100.00',
    displayPrice: '$100',
    description: 'Relationship & couples therapy',
  },
] as const

type SessionId = typeof SESSION_OPTIONS[number]['id']
// funcipn que hace que cuando el usuario eliga que booking usar, si no hay nada seleccionado es null.
export function BookingSection() {
  const [selectedSession, setSelectedSession] = useState<SessionId | null>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [paymentDone, setPaymentDone] = useState(false)
  const [paidResult, setPaidResult] = useState<PaymentResult | null>(null)

  const activeSession = SESSION_OPTIONS.find((s) => s.id === selectedSession)

  const handleSessionSelect = (id: SessionId) => {
    setSelectedSession(id)
    setShowPayment(false)
    setPaymentDone(false)
  }

  const handleProceedToPayment = () => {
    if (!selectedSession || selectedSession === 'initial') return
    setShowPayment(true)
  }

  const handlePaymentSuccess = (result: PaymentResult) => {
    setPaymentDone(true)
    setPaidResult(result)
    setShowPayment(false)
  }

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

        {/* ── Step 1: Session type selector ───────────────────────────── */}
        <Card className="mb-8 border-primary/30 bg-primary/5">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-primary" />
              <div>
                <CardTitle className="text-foreground">Online Booking</CardTitle>
                <CardDescription>
                  Select session type, choose your slot, and pay securely
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Session type cards */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">
                1. Choose session type:
              </p>
              <div className="grid sm:grid-cols-3 gap-3">
                {SESSION_OPTIONS.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => handleSessionSelect(session.id)}
                    className={`
                      text-left p-4 rounded-lg border-2 transition-all
                      ${selectedSession === session.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-background hover:border-primary/50'
                      }
                    `}
                  >
                    <div className="font-semibold text-foreground text-sm">
                      {session.label}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {session.duration}
                    </div>
                    <div className={`text-lg font-bold mt-2 ${
                      session.id === 'initial' ? 'text-green-600' : 'text-primary'
                    }`}>
                      {session.displayPrice}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Payment (only for paid sessions and if not yet paid) */}
            {selectedSession && selectedSession !== 'initial' && !paymentDone && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-sm font-medium text-foreground mb-3">
                  2. Complete payment:
                </p>
                {!showPayment ? (
                  <Button
                    onClick={handleProceedToPayment}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                  >
                    <CreditCard className="w-4 h-4" />
                    Pay {activeSession?.displayPrice} with PayPal
                  </Button>
                ) : (
                  <Card className="bg-background border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base text-foreground">
                          Secure Payment
                        </CardTitle>
                        <button
                          onClick={() => setShowPayment(false)}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                      <CardDescription>
                        {activeSession?.label} — {activeSession?.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4 p-3 bg-secondary/50 rounded-md">
                        <span className="text-sm text-muted-foreground">Session fee</span>
                        <span className="font-bold text-foreground text-lg">
                          {activeSession?.displayPrice}
                        </span>
                      </div>
                      <PaypalCheckout
                          amount={activeSession?.price ?? '0.00'}
                          description={`${activeSession?.label} - ${activeSession?.duration}`}
                          sessionType={activeSession?.id}
                          onSuccess={handlePaymentSuccess}
                          onCancel={() => setShowPayment(false)}
                          onError={(err) => console.error('Payment error:', err)}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 2 or 3: Calendly embed (only after payment or if free) */}
            {(selectedSession === 'initial' || (selectedSession && paymentDone)) && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <p className="text-sm font-medium text-foreground mb-3">
                  {selectedSession === 'initial' ? '2. Select your time slot:' : '3. Now, select your time slot:'}
                </p>
                <div className="bg-background rounded-lg border border-primary/20 p-4 shadow-sm ring-1 ring-primary/5">
                  <iframe
                    src="https://calendly.com/juan_skinnersv-proton"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    title="Calendly Booking Calendar"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {/* Free consultation flow indicator */}
            {selectedSession === 'initial' && !paymentDone && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Initial consultations are free — choose your preferred time slot above.
                </p>
              </div>
            )}

            {/* Payment success confirmation header */}
            {paymentDone && paidResult && (
              <div className="p-5 bg-green-50 border border-green-200 rounded-lg space-y-2 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-green-800">Payment confirmed!</p>
                </div>
                <p className="text-sm text-green-700">
                  Thank you{paidResult.payerName ? `, ${paidResult.payerName}` : ''}. Your session credit is active. Please use the calendar below to finalize your booking.
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              First-time clients will be asked to complete a brief intake form after booking.
            </p>
          </CardContent>
        </Card>

        {/* ── Alternative contact methods ──────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-6">
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
                Prefer email communication? Send a message with your availability and I'll
                respond within 24 hours.
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
                Message on WhatsApp for quick scheduling or preliminary questions.
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

        {/* ── Before first session ─────────────────────────────────────── */}
        <Card className="mt-8 bg-secondary/50 border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-lg">Before Your First Session</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What to Expect</h4>
              <p>
                Your first session is a consultation where we'll discuss your concerns, therapy
                goals, and my approach. This helps ensure we're a good fit for working together.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
              <p>
                Cancellations or rescheduling must be made at least 24 hours in advance to avoid
                a cancellation fee.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Privacy & Confidentiality</h4>
              <p>
                All sessions are confidential and HIPAA compliant. Your privacy and safety are
                my top priorities.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}