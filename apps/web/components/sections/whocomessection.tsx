import React from 'react'
import { ChildIcon, TeenIcon, AdultIcon } from '../icons/icons'

const profiles = [
  {
    label: '6 – 12 años',
    title: 'Niños',
    description:
      'Miedos, dificultades escolares, problemas de conducta y cambios familiares. Un espacio seguro y lúdico donde expresarse y crecer emocionalmente.',
    accentColor: '#F9A8A8',
    Icon: ChildIcon,
  },
  {
    label: '13 – 17 años',
    title: 'Adolescentes',
    description:
      'Identidad, presión social, ansiedad y transiciones vitales. Un espacio sin juicios donde ser escuchado y comprendido de verdad.',
    accentColor: '#86C5A8',
    Icon: TeenIcon,
  },
  {
    label: '18+ años',
    title: 'Adultos',
    description:
      'Estrés, burnout, relaciones y crecimiento personal. Terapia sistémica flexible que se adapta a tu vida sin comprometer tu tiempo.',
    accentColor: '#9B8DC4',
    Icon: AdultIcon,
  },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export function WhoComesSection() {
  return (
    <section className="py-24 px-6 sm:px-6 lg:px-8 bg-muted overflow-x-clip">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20 space-y-3 px-4">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gray/40">
            Para quién es
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-brand-gray leading-tight">
            ¿Quién viene a terapia?
          </h2>
          <p className="text-brand-gray/60 max-w-xl mx-auto text-base leading-relaxed font-light text-pretty">
            Acompañamiento especializado en cada etapa de la vida, con un enfoque
            sistémico adaptado a las necesidades de cada persona.
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-12 sm:gap-8 px-2">
          {profiles.map(({ label, title, description, accentColor, Icon }) => (
            <div
              key={title}
              className="flex flex-col items-center text-center space-y-5 group w-full"
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

              {/* Age label */}
              <span
                className="text-xs font-bold tracking-[0.25em] uppercase mt-4"
                style={{ color: accentColor }}
              >
                {label}
              </span>

              {/* Title */}
              <h3 className="text-2xl font-serif font-medium text-brand-gray">
                {title}
              </h3>

              {/* Description */}
              <p className="text-brand-gray/65 text-base leading-relaxed font-light text-pretty px-2">
                {description}
              </p>

              {/* Accent line */}
              <div
                className="w-8 h-0.5 rounded-full mt-1"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}