"use client";
import Image from "next/image";

export function ApproachSection() {
  return (
    <section className="bg-navbar-bg py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Columna Izquierda: Texto */}
        <div className="space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-none font-medium text-brand-gray whitespace-nowrap">
            Abgrenzung Coaching vs. Therapie
          </h2>

          <div className="space-y-8 text-lg text-brand-gray/80 leading-relaxed font-light text-pretty">
            <p className="text-xl md:text-2xl font-serif text-brand-gray italic border-l-4 border-brand-green/30 pl-6 py-2">
              Coaching darf keine Heilbehandlung darstellen.
            </p>

            <div className="space-y-6">
              <p>
                <span className="bg-brand-green/10 text-brand-gray font-medium px-1 rounded-sm">
                  Eine klare Trennung in den Angeboten und AGB ist notwendig, um
                  rechtliche Risiken zu vermeiden.
                </span>{" "}
                Während die Psychotherapie eine Heilbehandlung darstellt, darf
                Coaching und Beratung auch präventiv sein. Wir sehen die
                Wichtigkeit beider Bereiche an.{" "}
                <span className="bg-brand-pink/10 text-brand-gray font-medium px-1 rounded-sm">
                  Um Erwachsenen, Kindern und Jugendlichen effektiv zu helfen,
                  "muss das Kind nicht schon in den Brunnen gefallen sein“.
                </span>{" "}
                Die Unterscheidung ist trotzdem für euch wichtig zu wissen, da die
                Ansätze sich stark unterscheiden.
              </p>

              <p>
                <span className="font-medium text-brand-gray border-b-2 border-brand-green/20">
                  Psychotherapie ist eine Heilbehandlung, Coaching und Beratung
                  eine Begleitung ohne Krankheitswert der/s Klienten.
                </span>{" "}
                Daher liegen die Unterschiede in der individuellen Zielsetzung sowie in
                Gestaltung und Verlauf der Betreuung. Psychotherapie rechnet nach
                GOP (Gebührenordnung für Psychotherapeuten) ab, Coaching und Beratung nicht.{" "}
                <span className="bg-brand-violet text-brand-gray font-medium px-1 rounded-sm">
                  Gleichzeitig kann Coaching eine Möglichkeit sein, die Wartezeit auf 
                  einen Psychotherapieplatz nicht ungenutzt verstreichen zu lassen.
                </span>{" "}
                Zusammen kann der Weg zur Psychotherapie vorbereitet und Symptome 
                definiert werden. Eine Psychotherapie kann dann direkt dort ansetzen, 
                wo es benötigt wird.
              </p>

              <p>
                In meiner Erfahrung als Sozialarbeiterin und Psychotherapeutin
                habe ich gelernt, dass in einigen Fällen eine psychische
                Erkrankung schon verhindert werden kann.{" "}
                <span className="bg-[#c4a47c]/10 text-brand-gray font-medium px-1 rounded-sm">
                  In anderen Fällen ist die Wichtigkeit einer
                  psychotherapeutischen Behandlung schnell sichtbar geworden, so
                  dass ich die Dringlichkeit an meine KlientInnen weitergeben
                  konnte.
                </span>{" "}
                Jeder Mensch ist individuell und jeder Lebensverlauf ist
                individuell.
              </p>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Imagen / Ilustración */}
        <div className="relative aspect-square md:aspect-video rounded-sm overflow-hidden shadow-xl bg-white/50 flex items-center justify-center">
          {/* Aquí podrás poner tu SVG o imagen final */}
          <Image
            src="/therapy.jpg"
            alt="Therapy Approach Illustration"
            fill
            className="object-cover"
          />

          {/* Overlay sutil opcional para dar estilo */}
          <div className="absolute inset-0 bg-[#2d3748]/5 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
