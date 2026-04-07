'use client'

import { useRef, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, cn, CardDescription } from '@jess-web/ui'
import { Lightbulb, Sprout, ArrowUpRight, Check, Globe, MapPin, CreditCard, CheckCircle, X, Loader2 } from 'lucide-react'
import { PaypalCheckout, type PaymentResult } from '@/components/features/checkout/paypal-checkout'
import { console } from 'inspector'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
type CalendlyState = 'hidden' | 'validating' | 'visible' | 'error'

export function ServicesSection() { 
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null)
  const [completedPayments, setCompletedPayments] = useState<Record<string, boolean>>({})
  const [calendlyState, setCalendlyState] = useState<CalendlyState>('hidden')
  const [showFreeCalendly, setShowFreeCalendly] = useState(false)
  const calendlyRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      id: 'impuls-session',
      title: 'Impuls-Session',
      subtitle: 'Starke Klarheit.',
      icon: Lightbulb,
      location: 'ONLINE',
      locationIcon: Globe,
      description: 'Für alle, die zwischen Karriere und Privatleben feststecken und sich einen klaren Impuls für konkrete nächste Schritte wünschen.',
      duration: '1 Session à 2 Stunden',
      features: [
        'psychologische Session (online per Video oder Telefon)',
        'individuelle Impulse und Übungen zum Mitnehmen',
        'wahlweise im Einzel- oder Paar-Setting'
      ],
      price: '150.00',
      displayPrice: '150 €',
      priceDetail: 'inkl. MwSt.',
      highlight: false,
    },
    {
      id: 'therapeutische-begleitung',
      title: 'Therapeutische Begleitung',
      subtitle: 'Nachhaltige Veränderung.',
      icon: Sprout,
      location: 'ONLINE',
      locationIcon: Globe,
      cornerBadge: 'häufig gewählt',
      description: 'Maßgeschneiderte Begleitung. Nachhaltige Veränderung. Für alle, die nachhaltig beruflich erfolgreich sein und bleiben möchten, ohne ihre mentale Stabilität und ihr Privatleben zu vernachlässigen.',
      duration: 'Begleitung über mind. 6 Monate (individuell verlängerbar)',
      features: [
        'bis zu 3 psychologischen Gesprächsterminen/Monat (á 60 min, online per Video oder Telefon)',
        'individuelle Impulse und Übungen zum Mitnehmen',
        'kontinuierlicher Support per E-Mail o. Messenger',
        'wahlweise im Einzel- oder Paar-Setting'
      ],
      price: '200.00',
      displayPrice: 'ab 200 €',
      priceDetail: 'inkl. MwSt. (350 € monatlich)',
      highlight: true,
    },
    {
      id: 'intensiv-tag',
      title: 'Therapie-Intensiv-Tag',
      subtitle: 'Ein Tag. Ihr Wendepunkt.',
      icon: ArrowUpRight,
      location: 'VOR ORT',
      locationIcon: MapPin,
      description: 'Für alle, die sich einen kraftvollen Perspektivwechsel wünschen, um sich wieder ausgeglichener, leistungsfähiger und leichter zu fühlen – im Job, Alltag und Privatleben.',
      duration: '1 Therapietag á ca. 5 Stunden',
      features: [
        'intensive psychologische 1:1 Session',
        'angenehmes Setting im Raum Karlsruhe/Heilbronn',
        'individuelle Impulse und Übungen zum Mitnehmen',
        'wahlweise im Einzel- oder Paar-Setting'
      ],
      price: '2300.00',
      displayPrice: '2.300 €',
      priceDetail: 'inkl. MwSt. und Räumlichkeiten',
      highlight: false,
    }
  ]

  const scrollToCalendly = () => {
    setTimeout(() => {
      calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }, 150)
  }

  const [bookingUrl, setBookingUrl] = useState<string | null>(null)

  const validateTokenAndShowCalendly = async (token: string) => {
    setCalendlyState('validating')
    scrollToCalendly()

    try {
      const res = await fetch(`${API_URL}/appointments/validate-token?token=${token}`)
      if (!res.ok) {
        setCalendlyState('error')
        return
      }
      const data = await res.json()
      if (data.bookingUrl) {
        setBookingUrl(data.bookingUrl)
        sessionStorage.setItem('calendly_access', 'granted')
        setCalendlyState('visible')
      } else {
        setCalendlyState('error')
      }
    } catch {
      setCalendlyState('error')
    }
  }


  const handlePaymentSuccess = async (serviceId: string, result: PaymentResult) => {
    setCompletedPayments(prev => ({ ...prev, [serviceId]: true }))
    setActivePaymentId(null)

    if (result.calendlyToken) {
      await validateTokenAndShowCalendly(result.calendlyToken)
    } else {
      // Fallback: si no hay token por algún error de DB, mostramos igual
      // El webhook reconciliará el pago
      setCalendlyState('visible')
      scrollToCalendly()
    }
  }

  const handleFreeConsultation = () => {
    setShowFreeCalendly(true)
    scrollToCalendly()
  }

  return (
    <section id="services" className="py-24 px-6 md:px-8 bg-navbar-bg overflow-x-clip">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a5568] mb-6 px-4">
            So arbeiten wir zusammen
          </h2>
          <p className="text-lg text-[#4a5568]/70 max-w-3xl mx-auto italic px-4">
            Diskrete, professionelle und flexible therapeutische Angebote, die sich nahtlos in Ihr
            Leben einfügen – nicht umgekehrt.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-18 lg:gap-10 items-stretch py-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const LocationIcon = service.locationIcon
            const isPaying = activePaymentId === service.id
            const isPaid = completedPayments[service.id]

            return (
              <Card
                key={index}
                className={cn(
                  'relative flex flex-col h-full border-none shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] rounded-[2.5rem] overflow-visible transition-all duration-500 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.25)] max-w-[20rem] md:max-w-[30rem] mx-auto',
                  service.highlight
                    ? 'bg-[#dcede5] md:scale-105 z-10 border-t-4 border-[#8fbfa8]/30'
                    : 'bg-[#f4f5f4] border-t border-gray-200'
                )}
              >
                {service.cornerBadge && (
                  <div className="absolute -top-4 -right-2 md:-top-5 md:-right-5 w-20 h-20 md:w-24 md:h-24 bg-[#8fbfa8] rounded-full flex items-center justify-center text-white text-[9px] md:text-[10px] uppercase tracking-widest font-bold rotate-12 shadow-lg z-20 text-center leading-tight p-2 italic">
                    {service.cornerBadge}
                  </div>
                )}

                <CardHeader className="pt-16 pb-8 text-center space-y-4 px-6 md:px-10">
                  <div className="mx-auto flex items-center justify-center">
                    <div className="p-5 rounded-[2rem] bg-transparent border-[1.5px] border-[#8fbfa8]/30 text-[#8fbfa8]">
                      <Icon className="w-12 h-12 md:w-14 md:h-14 stroke-[1]" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-2xl md:text-3xl font-serif text-[#4a5568]">
                      {service.title}
                    </CardTitle>
                    <p className="text-lg md:text-xl font-serif text-[#4a5568]/60 italic">
                      {service.subtitle}
                    </p>
                  </div>

                  <div className="flex justify-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        'px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 border-none',
                        service.location === 'ONLINE'
                          ? 'bg-[#8fbfa8]/20 text-[#6a917e]'
                          : 'bg-gray-100 text-gray-500'
                      )}
                    >
                      <LocationIcon className="w-3 h-3" />
                      {service.location}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow px-6 md:px-10 pb-12 flex flex-col">
                  {isPaying ? (
                    <div className="flex-grow flex flex-col justify-center space-y-6 animate-in fade-in zoom-in duration-300">
                      <div className="flex items-center justify-between border-b border-[#8fbfa8]/20 pb-4">
                        <h4 className="font-bold text-[#4a5568]">Sichere Zahlung</h4>
                        <button
                          onClick={() => setActivePaymentId(null)}
                          className="text-[#4a5568]/40 hover:text-red-400"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <PaypalCheckout
                        amount={service.price}
                        description={`${service.title} - ${service.duration}`}
                        sessionType={service.id}
                        onSuccess={(result) => handlePaymentSuccess(service.id, result)}
                        onCancel={() => setActivePaymentId(null)}
                      />
                    </div>
                  ) : isPaid ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4 animate-in bounce-in duration-500">
                      <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                      </div>
                      <h4 className="text-xl font-bold text-green-800">Zahlung erfolgreich!</h4>
                      <p className="text-sm text-green-700">
                        Bitte wählen Sie unten Ihren Wunschtermin.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-[#4a5568]/70 text-sm mb-10 leading-relaxed text-center font-light">
                        {service.description}
                      </p>

                      <div className="mb-10 space-y-6">
                        <h4 className="font-bold text-[#4a5568] text-[13px] tracking-tight border-b border-[#8fbfa8]/10 pb-2">
                          {service.duration}
                        </h4>
                        <ul className="space-y-4">
                          {service.features.map((feature, fIndex) => (
                            <li
                              key={fIndex}
                              className="flex items-start gap-3 text-sm text-[#4a5568]/80 leading-snug"
                            >
                              <div className="mt-1 bg-[#8fbfa8] rounded-full p-0.5 shrink-0">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                              <span className="font-light">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-10 text-center">
                        <div className="bg-background/50 rounded-3xl py-8 px-4 mb-8 border border-[#8fbfa8]/5 shadow-inner">
                          <div className="text-[#4a5568]/60 text-xs font-medium mb-2 tracking-wide uppercase">
                            Invest:
                          </div>
                          <div className="text-2xl md:text-3xl font-bold text-[#4a5568] flex items-baseline justify-center gap-1">
                            <span className="text-sm font-medium text-[#8fbfa8]/60">ab</span>
                            {service.displayPrice.replace('ab ', '')}
                          </div>
                          <div className="text-[10px] text-[#4a5568]/50 mt-2 font-medium">
                            {service.priceDetail}
                          </div>
                        </div>

                        <Button
                          onClick={() => setActivePaymentId(service.id)}
                          className="w-full bg-[#8fbfa8] hover:bg-[#7aa894] text-white rounded-full py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          JETZT BUCHEN
                        </Button>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Texto + botón de Orientierungsgespräch */}
        <div className="text-center mt-20 mb-8 px-4">
          <p className="text-[#6a917e] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light">
            <span className="font-bold">Jede Zusammenarbeit</span> beginnt mit einem
            unverbindlichen und kostenfreien{' '}
            <span className="font-bold">Orientierungsgespräch</span>. Gemeinsam klären wir, wo Sie
            gerade stehen, welche <span className="font-bold">Ziele</span> Sie verfolgen und welches{' '}
            <span className="font-bold">Angebot</span> zu Ihrer Situation passt.
          </p>
          <div className="mt-10">
            <Button
              onClick={handleFreeConsultation}
              className="bg-[#6a917e] hover:bg-[#5a8570] text-white rounded-full px-10 py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Orientierungsgespräch vereinbaren
            </Button>
          </div>
        </div>

        {/* Sección de Calendly — aparece tras pago o al presionar el botón free */}
        {(calendlyState !== 'hidden' || showFreeCalendly) && (
          <div
            ref={calendlyRef}
            className="mt-16 scroll-mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-serif text-[#4a5568] mb-2">
                Wählen Sie Ihren Wunschtermin
              </h3>
              <p className="text-[#4a5568]/60 text-sm">
                {showFreeCalendly && calendlyState === 'hidden'
                  ? 'Kostenfreies Orientierungsgespräch'
                  : 'Ihr Zahlungslink ist aktiv — bitte wählen Sie jetzt Ihren Termin'}
              </p>
            </div>

            {calendlyState === 'validating' && (
              <div className="flex items-center justify-center py-12 gap-3 text-[#6a917e]">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="text-sm">Zugang wird bestätigt...</span>
              </div>
            )}

            {calendlyState === 'error' && (
              <div className="text-center py-8 px-4 bg-red-50 border border-red-200 rounded-2xl max-w-md mx-auto">
                <p className="text-red-700 font-medium mb-2">Zugang konnte nicht bestätigt werden</p>
                <p className="text-red-600 text-sm">
                  Ihr Zahlung wurde erfolgreich verarbeitet. Bitte kontaktieren Sie uns direkt, um Ihren Termin zu vereinbaren.
                </p>
              </div>
            )}

            {(calendlyState === 'visible' || showFreeCalendly) && calendlyState !== 'validating' && calendlyState !== 'error' && (
              <div className="bg-white rounded-[2rem] border border-[#8fbfa8]/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
                <iframe
                  src={showFreeCalendly ? "https://calendly.com/juan_skinnersv-proton" : (bookingUrl ?? "")}
                  width="100%"
                  height="700"
                  frameBorder="0"
                  title="Terminbuchung"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}