import React from 'react'
import { ChildIcon, TeenIcon, AdultIcon } from '../icons/icons'
import { Check } from 'lucide-react'

const profiles = [
  {
    label: 'Ab 18 Jahren',
    title: 'Erwachsene',
    items: [
      'Beruf, Karriere & Führungskompetenz',
      'Persönlichkeitsentwicklung & Mindset',
      'Lebensmanagement, Stress & Resilienz',
      'Zwischenmenschliches & Beziehungen'
    ],
    accentColor: '#9B8DC4',
    Icon: AdultIcon,
  },
  {
    label: '6–12 Jahre',
    title: 'Kinder',
    items: [
      'Schulstress, Leistungsdruck & Mobbing',
      'Soziale Kompetenzen & Selbstbild',
      'Lösen von Ängsten & Blockaden',
      'Familiäres Miteinander & Erziehung'
    ],
    accentColor: '#F9A8A8',
    Icon: ChildIcon,
  },
  {
    label: '13–18 Jahre',
    title: 'Teenager',
    items: [
      'Identität, Selbstfindung & Körperbild',
      'Beruflicher Zugang & Stressmanagement',
      'Soziale Beziehungen & Liebeskummer',
      'Emotionale Stabilität',
      'Themen für Eltern: Loslassen & Kommunikation'
    ],
    accentColor: '#86C5A8',
    Icon: TeenIcon,
  }
]

export function WhoComesSection() {
  return (
    <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted overflow-x-clip">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20 space-y-4 px-4">
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-gray leading-tight">
            Wer kommt zum Coaching?
          </h2>
          <p className="text-brand-gray/60 max-w-xl mx-auto text-base leading-relaxed font-light text-pretty">
            Fachkundige Begleitung in jeder Lebensphase mit einem systemischen Ansatz, 
            der auf die individuellen Bedürfnisse jedes Einzelnen zugeschnitten ist.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-12 lg:gap-16 px-2">
          {profiles.map(({ label, title, items, accentColor, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center space-y-6 group w-full"
            >
              {/* Icon ring */}
              <div
                className="flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105"
                style={{
                  boxShadow: `0 0 0 8px ${accentColor}18, 0 0 0 16px ${accentColor}08`,
                }}
              >
                <Icon className="w-24 h-24 sm:w-28 sm:h-28" />
              </div>

              <div className="flex flex-col items-center space-y-2">
                {/* Age label */}
                <span
                  className="text-[10px] font-bold tracking-[0.3em] uppercase"
                  style={{ color: accentColor }}
                >
                  {label}
                </span>

                {/* Title */}
                <h3 className="text-2xl font-serif font-medium text-brand-gray">
                  {title}
                </h3>
              </div>

              {/* Items List with Checks */}
              <ul className="space-y-4 text-left">
                {items.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-brand-gray/75 text-sm leading-snug font-light max-w-[260px]"
                  >
                    <Check 
                      className="w-4 h-4 mt-0.5 flex-shrink-0" 
                      style={{ color: accentColor }} 
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Accent line */}
              <div
                className="w-12 h-0.5 rounded-full mt-2 opacity-30"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
