"use client";

import Image from "next/image";
import { Check, Globe, Heart } from "lucide-react";
import { Button } from "@jess-web/ui";
import Link from "next/link";

const expertise = [
  "Bachelor of Social Work (Arnheim/Nimwegen, NL)",
  "Master of Social Work (Alice Salomon Hochschule Berlin)",
  "Ausbildung zur Kinder- und Jugendlichenpsychotherapeutin (VT) am Institut für Verhaltenstherapie Berlin",
  "Approbation und Fachkundenachweis Verhaltenstherapie (2022)",
  "Mehrjährige Berufserfahrung in Kliniken, Praxen und internationalen Projekten",
];

export function AboutTherapist() {
  return (
    <section id="about" className="bg-navbar-bg py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-24 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1] font-medium text-brand-gray max-w-5xl mx-auto">
            Begleitung für Kinder, Jugendliche und Erwachsene in allen
            Lebensphasen
          </h2>
          <p className="text-xl text-brand-gray/70 max-w-3xl mx-auto leading-relaxed font-light">
            Ich unterstütze Menschen dabei, Klarheit zu gewinnen, innere
            Stabilität aufzubauen und neue Perspektiven zu entwickeln –
            individuell, fundiert und mit einem internationalen Blick auf
            unterschiedliche Lebensrealitäten.
          </p>
        </div>

        <div className="flex flex-col items-center gap-16">
          {/* Image Section */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full max-w-2xl overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/jess2.png"
              alt="Jessica Greve"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Detailed Content Section */}
          <div className="w-full max-w-4xl space-y-12">
            <div className="space-y-6">
              <p className="text-xl text-brand-gray/80 leading-relaxed font-light text-pretty">
                Mein Name ist <span className="font-bold text-brand-gray">Jessica Greve</span>. Ich bin Sozialpädagogin (M.A.) und approbierte Kinder- und
                Jugendlichenpsychotherapeutin mit Schwerpunkt
                Verhaltenstherapie. Seit vielen Jahren begleite ich Kinder,
                Jugendliche und ihre Familien in unterschiedlichen Lebenslagen -{" "}
                <span className="font-bold text-brand-gray">
                  sowohl in Deutschland als auch international, zuletzt in
                  Spanien und bis heute in El Salvador.
                </span>{" "}
                Meine berufliche Laufbahn führte mich von der Arbeit mit
                substituierten jungen Erwachsenen und psychosozialer Betreuung
                über Tätigkeiten in Kliniken und Praxen bis hin zur Leitung von
                Projekten für schuldistanzierten Jugendlichen. Heute baue ich
                meine eigene Online-Praxis für Psychotherapie und Coaching auf,
                die ich in deutscher, spanischer, englischer und
                niederländischer Sprache anbiete. Wichtiger Hinweis: Derzeit
                biete ich noch keine Psychotherapie an. Ich darf als online
                Psychotherapeutin mit einem Wohnort, der ausserhalb Deutschlands
                liegt{" "}
                <span className="font-bold text-brand-gray">
                  KEIN MITGLIED EINER PSYCHOTHERAPEUTENKAMMER
                </span>{" "}
                sein. Ich biete aktuell daher Coaching und Beratung und bin im
                Austausch mit einem Anwalt für Medizinrecht, so dass ich
                langfristig auch wieder Psychotherapie anbieten darf.
              </p>
              <p className="text-xl text-brand-gray/80 leading-relaxed font-light text-pretty"><span className="font-bold text-brand-gray">Nähe & Authentizität:</span> Auch online entsteht echter Kontakt - mit Raum für Sprache, Gestik und Mimik.</p>
              <p className="text-xl text-brand-gray/80 leading-relaxed font-light text-pretty"><span className="font-bold text-brand-gray">Mehrsprachigkeit und Interkultureller Ansatz:</span> Angebote auf Deutsch, Spanisch, Englisch und Niederländisch möglich, damit Familien sich in ihrer vertrautesten Sprache öffnen können. Als Psychotherapeutin habe ich selbst vielseitige Erfahrung sammeln dürfen mit Themen, wie "Migration", "kulturelle Diversität" und wie sich dieses auf die psychische Gesundheit von Kindern, Jugendlichen und Familien auswirkt. Dabei nehme ich diese Erfahrungen der eigenen Lebenswelt mit in die Therapien und Beratungen und gehe einfühlsam mit kultursensiblen Inhalten um. <span>Dieses sowohl in Bezug auf die individuelle psychische Betreuung, als auch mit Hinblick auf deinen familiären Kontext.</span></p>
            </div>

            {/* Languages & Personal Section */}
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray/60 flex items-center gap-2">
                  <Globe className="w-3 h-3 text-[#c4a47c]" /> SPRACHEN
                </h3>
                <p className="text-sm text-brand-gray/70 leading-relaxed font-light">
                  Ich arbeite fließend auf{" "}
                  <span className="font-medium">
                    Deutsch, Spanisch, Englisch und Niederländisch
                  </span>{" "}
                  – und kann dadurch Familien in unterschiedlichen kulturellen
                  Kontexten begleiten.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-gray/60 flex items-center gap-2">
                  <Heart className="w-3 h-3 text-[#c4a47c]" /> PERSÖNLICHES
                </h3>
                <p className="text-sm text-brand-gray/70 leading-relaxed font-light">
                  Neben meiner Arbeit liebe ich es, aktiv zu sein: Wakeboarding,
                  Surfskating und Wellenreiten geben mir Energie. Zudem
                  beschäftige ich mich mit Forschung zu Surftherapie.
                </p>
              </div>
            </div>

            {/* Expertise List */}
            <div className="space-y-8">
              <h3 className="text-[11px] font-bold tracking-[0.35em] uppercase text-brand-gray/60 border-b border-brand-gray/10 pb-4">
                Qualifikationen
              </h3>

              <ul className="space-y-6">
                {expertise.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-brand-gray/40 stroke-[1.5]" />
                    </div>
                    <span className="text-brand-gray/70 text-base leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Button at the bottom */}
            <div className="flex justify-center pt-8">
              <Link href="#services">
                <Button className="bg-[#c4a47c] hover:bg-[#b3936b] text-white rounded-full px-12 py-8 text-sm font-bold tracking-[0.2em] transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                  einen Termin vereinbaren
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
