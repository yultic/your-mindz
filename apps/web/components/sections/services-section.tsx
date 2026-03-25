import { Card, CardContent, CardHeader, CardTitle, Badge, Button, cn } from '@jess-web/ui'
import { Lightbulb, Sprout, ArrowUpRight, Check, Globe, MapPin } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
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
      price: '600 €',
      priceDetail: 'inkl. MwSt.',
      highlight: false,
    },
    {
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
        'kontinuierlicher Support per E-Mail oder Messenger',
        'wahlweise im Einzel- oder Paar-Setting'
      ],
      price: 'ab 4.500 €',
      priceDetail: 'inkl. MwSt. (750 € monatlich)',
      highlight: true,
    },
    {
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
      price: '2.300 €',
      priceDetail: 'inkl. MwSt. und Räumlichkeiten',
      highlight: false,
    }
  ]

  return (
    <section id="services" className="py-24 px-4 bg-[#fdfdfc]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif text-[#4a5568] mb-6">
            So arbeiten wir zusammen
          </h2>
          <p className="text-lg text-[#4a5568]/70 max-w-3xl mx-auto italic">
            Diskrete, professionelle und flexible therapeutische Angebote, die sich nahtlos in Ihr Leben einfügen – nicht umgekehrt.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {services.map((service, index) => {
            const Icon = service.icon
            const LocationIcon = service.locationIcon
            
            return (
              <Card 
                key={index} 
                className={cn(
                  "relative flex flex-col h-full border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-visible transition-all duration-300",
                  service.highlight 
                    ? "bg-[#e8f3ee] md:scale-105 z-10 border-t-4 border-[#8fbfa8]/20" 
                    : "bg-white border-t border-gray-100"
                )}
              >
                {service.cornerBadge && (
                  <div className="absolute -top-5 -right-5 w-24 h-24 bg-[#8fbfa8] rounded-full flex items-center justify-center text-white text-[10px] uppercase tracking-widest font-bold rotate-12 shadow-lg z-20 text-center leading-tight p-2 italic">
                    {service.cornerBadge}
                  </div>
                )}
                
                <CardHeader className="pt-16 pb-8 text-center space-y-4">
                  <div className="mx-auto flex items-center justify-center">
                    <div className="p-5 rounded-[2rem] bg-transparent border-[1.5px] border-[#8fbfa8]/30 text-[#8fbfa8]">
                      <Icon className="w-14 h-14 stroke-[1]" />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-serif text-[#4a5568]">
                      {service.title}
                    </CardTitle>
                    <p className="text-xl font-serif text-[#4a5568]/60 italic">{service.subtitle}</p>
                  </div>

                  <div className="flex justify-center">
                    <Badge 
                      variant="outline"
                      className={cn(
                        "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] flex items-center gap-2 border-none",
                        service.location === 'ONLINE' 
                          ? "bg-[#8fbfa8]/20 text-[#6a917e]" 
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      <LocationIcon className="w-3 h-3" />
                      {service.location}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="flex-grow px-10 pb-12 flex flex-col">
                  <p className="text-[#4a5568]/70 text-sm mb-10 leading-relaxed text-center font-light">
                    {service.description}
                  </p>
                  
                  <div className="mb-10 space-y-6">
                    <h4 className="font-bold text-[#4a5568] text-[13px] tracking-tight border-b border-[#8fbfa8]/10 pb-2">
                      {service.duration}
                    </h4>
                    <ul className="space-y-4">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-3 text-sm text-[#4a5568]/80 leading-snug">
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
                      <div className="text-3xl font-bold text-[#4a5568] flex items-baseline justify-center gap-1">
                        <span className="text-sm font-medium text-[#8fbfa8]/60">ab</span>
                        {service.price.replace('ab ', '')}
                      </div>
                      <div className="text-[10px] text-[#4a5568]/50 mt-2 font-medium">
                        {service.priceDetail}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#8fbfa8] hover:bg-[#7aa894] text-white rounded-full py-7 text-sm font-bold tracking-widest transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                    >
                      JETZT ANFRAGEN
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
