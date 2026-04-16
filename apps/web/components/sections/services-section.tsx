'use client'

import { useRef, useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, cn } from '@jess-web/ui'
import { Lightbulb, Hourglass, ArrowUpRight, Check, Globe, MapPin, CreditCard, CheckCircle, X, Loader2, Calendar } from 'lucide-react'
import { PaypalCheckout, type PaymentResult } from '@/components/features/checkout/paypal-checkout'
import Script from 'next/script'

const API_URL = '/api-proxy'
type CalendlyState = 'hidden' | 'validating' | 'visible' | 'error'

export function ServicesSection() { 
  const [activePaymentId, setActivePaymentId] = useState<string | null>(null)
  const [isExtraPaymentActive, setIsExtraPaymentActive] = useState(false)
  const [completedPayments, setCompletedPayments] = useState<Record<string, boolean>>({})
  const [calendlyState, setCalendlyState] = useState<CalendlyState>('hidden')
  const [showFreeCalendly, setShowFreeCalendly] = useState(false)
  const [bookingUrl, setBookingUrl] = useState<string | null>(null)
  const calendlyRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  // Efecto para inicializar o actualizar el widget de Calendly
  useEffect(() => {
    const initCalendly = () => {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.Calendly && widgetRef.current && (calendlyState === 'visible' || showFreeCalendly)) {
        const url = showFreeCalendly ? "https://calendly.com/juan_skinnersv-proton/psicoterapia" : (bookingUrl ?? "")
        if (url) {
          widgetRef.current.innerHTML = ''
          // @ts-ignore
          window.Calendly.initInlineWidget({
            url: url,
            parentElement: widgetRef.current,
            prefill: {},
            utm: {}
          });
        }
      }
    }

    const timer = setTimeout(initCalendly, 100)
    return () => clearTimeout(timer)
  }, [calendlyState, showFreeCalendly, bookingUrl])

  const services = [
    {
      id: 'impuls-session',
      title: 'Impuls-Session',
      subtitle: 'Starke Klarheit.',
      icon: Lightbulb,
      location: 'ONLINE',
      locationIcon: Globe,
      description: 'Jede Zusammenarbeit beginnt mit einem unverbindlichen und kostenfreien Orientierungsgespräch. Gemeinsam klären wir, wo Sie gerade stehen, welche Ziele Sie verfolgen und welches Angebot zu Ihrer Situation passt.',
      duration: '1 Session',
      features: [
        'Kennenlerngespräch 20min videocall gratis',
        'individuelle Impulse und Übungen zum Mitnehmen',
        'Stornierungsbedingungen: Stornierungen oder Terminänderungen müssen mindestens 24 Stunden im Voraus erfolgen.',
        'Datenschutz und VertraulichkeitAlle Sitzungen sind vertraulich und entsprechen den HIPAA-Vorschriften. Ihre Privatsphäre und Ihre Sicherheit haben für mich oberste Priorität.'
      ],
      price:'FREE',
      displayPrice:'FREE',
      highlight: false,
    },
    {
      id: 'Coaching/Beratung',
      title: 'Coaching/Beratung',
      subtitle: 'Probewoche',
      icon: Hourglass,
      location: 'ONLINE',
      locationIcon: Globe,
      cornerBadge: 'Empfohlen',
      description: 'Individuelle Begleitung. Nachhaltige Veränderung.Für Erwachsene, Jugendliche und Kinder, die ihr emotionales Wohlbefinden und ihre persönliche Entwicklung fördern möchten, indem sie ihr seelisches Gleichgewicht, ihre Beziehungen und ihre Lebensqualität in jeder Lebensphase stärken.',
      duration: '1 Woche messenger support. Digitalbetreuung für einen Monat',
      features: [
        '1 videocall á 50min',
        'Messenger- Support (500 Wörter Textnachricht oder Spracheingabe) wöchentlich plus 2',
        'Zugang zur YourMindz Ressourcenbox (Videos, Audios, worksheets',
        'Priorisierte Terminreservierung in meinem online Kalender Bereitstellung der datensicheren Video-Plattform',
        'Stornierungsbedingungen Stornierungen oder Terminverschiebungen müssen mindestens 24 Stunden im Voraus erfolgen.',
        'Datenschutz und VertraulichkeitAlle Sitzungen sind vertraulich und entsprechen den HIPAA-Vorschriften. Ihre Privatsphäre und Ihre Sicherheit haben für mich oberste Priorität.'
      ],
      price: '79.00',
      displayPrice: 'ab 79 €',
      highlight: true,
    },
    {
      id: 'Leistungen Coaching',
      title: 'Leistungen Coaching',
      subtitle: 'Ein Tag. Ihr Wendepunkt.',
      icon: ArrowUpRight,
      location: 'VOR ORT',
      locationIcon: MapPin,
      description: 'Für alle, die bereit sind, neue Perspektiven zu entwickeln und nachhaltig mehr Balance, Klarheit und Lebensqualität zu gewinnen - in allen Bereichen ihres Lebens.',
      duration: '2x monatliche Videosessions (je 50min) "Resilienz und Wachstum“ sowie Digitalbetreuung für einen Monat',
      features: [
        'Messenger- Support (500 Wörter Textnachricht o Spracheingabe) wöchentlich plus 2 psychotherapeutisch begründete Antworten und Impulse. Begleitung  der in den Sessions behandelten Themen und Unterstützung bei den Umsetzungen.',
        'Zugang zur YourMindz Ressourcenbox (Videos, Audios, worksheets',
        'Priorisierte  Terminreservierung in meinem online Kalender Bereitstellung der datensicheren Video- Plattform',
        'Coaching/Beratung reguläres Monatspaket',
        'Stornierungsbedingungen Stornierungen oder Terminverschiebungen müssen mindestens 24 Stunden im Voraus erfolgen.',
        'Datenschutz und VertraulichkeitAlle Sitzungen sind vertraulich und entsprechen den HIPAA-Vorschriften. Ihre Privatsphäre und Ihre Sicherheit haben für mich oberste Priorität.'
      ],
      price: '299.00',
      displayPrice: '299 €',
      highlight: false,
    }
  ]

  const scrollToCalendly = () => {
    setTimeout(() => {
      calendlyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start'})
    }, 150)
  }

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
    setIsExtraPaymentActive(false)
    setShowFreeCalendly(false)

    if (result.calendlyToken) {
      await validateTokenAndShowCalendly(result.calendlyToken)
    } else {
      setCalendlyState('visible')
      scrollToCalendly()
    }
  }

  const handleFreeConsultation = () => {
    setCalendlyState('hidden')
    setShowFreeCalendly(true)
    scrollToCalendly()
  }

  return (
    <section id="services" className="py-24 px-6 md:px-8 bg-navbar-bg overflow-x-clip">
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="lazyOnload"
      />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-8xl font-serif text-[#4a5568] mb-6 px-4">
            So arbeiten wir zusammen
          </h2>
          <p className="text-lg text-[#4a5568]/70 max-w-3xl mx-auto italic px-4">
            Diskrete, professionelle und flexible Coaching- und Beratungsangebote, 
            die sich nahtlos in dein Leben einfügen- Nicht umgekehrt.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-18 lg:gap-10 items-stretch py-8">
          {services.map((service, index) => {
            const Icon = service.icon
            const LocationIcon = service.locationIcon
            const isPaying = activePaymentId === service.id
            const isPaid = completedPayments[service.id]
            const isFree = service.price === 'FREE'

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
                            {isFree ? '' : <span className="text-sm font-medium text-[#8fbfa8]/60">ab</span>}
                            {service.displayPrice.replace('ab ', '')}
                          </div>
                        </div>

                        {isFree ? (
                          <Button
                            onClick={handleFreeConsultation}
                            className="w-full bg-[#8fbfa8] hover:bg-[#7aa894] text-white rounded-full py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <Calendar className="w-4 h-4" />
                            KOSTENFREI BUCHEN
                          </Button>
                        ) : (
                          <Button
                            onClick={() => setActivePaymentId(service.id)}
                            className="w-full bg-[#8fbfa8] hover:bg-[#7aa894] text-white rounded-full py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                          >
                            <CreditCard className="w-4 h-4" />
                            JETZT BUCHEN
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Sección del botón inferior de 50€ */}
        <div className="text-center mt-20 mb-8 px-4">
          <p className="text-[#6a917e] text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-light">
            <span className="font-bold">Falls ihr zusätzliche videocalls im Monat</span> dazubuchen möchtet, 
              dann bekommt ihr natürlich den Vorzug in meinem Terminkalender.{' '}
            <span className="font-bold">Um die Zusatzkosten gering zu halten für</span>. euch, kostet jedes weitere 
              Videogespräch nur <span className="font-bold">50EUR</span> extra zum Paketpreis{' '}
          </p>
          <div className="mt-10 max-w-md mx-auto">
            {isExtraPaymentActive ? (
              <div className="bg-white p-8 rounded-[2rem] border border-[#8fbfa8]/20 shadow-xl animate-in zoom-in duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-bold text-[#4a5568]">Zusätzliches Video (50 €)</h4>
                  <button onClick={() => setIsExtraPaymentActive(false)} className="text-red-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <PaypalCheckout
                  amount="50.00"
                  description="Zusätzliches Video-Gespräch"
                  sessionType="extra-session"
                  onSuccess={(result) => handlePaymentSuccess('extra-session', result)}
                  onCancel={() => setIsExtraPaymentActive(false)}
                />
              </div>
            ) : (
              <Button
                onClick={() => setIsExtraPaymentActive(true)}
                className="bg-[#6a917e] hover:bg-[#5a8570] text-white rounded-full px-10 py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                50 € zusätzliches Video
              </Button>
            )}
          </div>
        </div>

        {/* Sección de Calendly */}
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
                  Ihr Zahlung wurde erfolgreich verarbeitet. Bitte kontaktieren Sie uns directamente, um Ihren Termin zu vereinbaren.
                </p>
              </div>
            )}

            {(calendlyState === 'visible' || showFreeCalendly) && calendlyState !== 'validating' && calendlyState !== 'error' && (
              <div className="bg-white rounded-[2rem] border border-[#8fbfa8]/20 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
                <div 
                  className="calendly-inline-widget w-full"
                  ref={widgetRef}
                  style={{ minWidth: '100%', height: '700px' }}
                  data-auto-load="false"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
