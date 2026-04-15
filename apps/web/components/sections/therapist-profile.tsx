import Image from 'next/image'

export function TherapistProfile() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-navbar-bg">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Column: Image that matches text height */}
        <div className="relative w-full h-[520px] mt-6 lg:mt-12 lg:h-auto lg:min-h-[680px] lg:max-h-[900px] mx-auto overflow-hidden rounded-sm shadow-sm">
          <Image
            src="/Jessy.png"
            alt="Jessica Greve - Psychotherapist"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 40vw"
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Right Column: Content matching the screenshot layout */}
        <div className="flex flex-col justify-center space-y-4 text-foreground">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gray/60">
              Meine Mission
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-3xl font-serif leading-tight font-medium text-brand-gray text-center lg:text-left">
              Ich stelle mir eine Welt vor, in der alle Kinder und Jugendlichen unabhängig von Sprache, Herkunft oder Wohnort Zugang zu professioneller psychologischer Unterstützung haben.
              <span className="block mt-2">
                Eine Welt, in der digitale Angebote Brücken bauen zwischen Kulturen, Familien und Generationen – und psychische Gesundheit selbstverständlich, niedrigschwellig und flexibel gefördert wird.
              </span>
            </h2>
          </div>

          <div className="space-y-3 text-lg text-brand-gray/80 leading-relaxed font-light text-pretty text-center lg:text-left">
            <h2 className="text-xl font-serif"><span>Ich stehe für:</span></h2>
            <p><strong>Flexibilität:</strong> Ortsunabhängige Begleitung ohne lange Wartezeiten. Ohne Bürokratie, da es bei Beginn unrelevant ist ob Psychotherapie durchgeführt werden soll oder Beratung/ Coaching.</p>
            <p><strong>Transparenz & Qualität:</strong> Klare Standards, Schweigepflichtseinhaltung durch meine deutsche Approbation als Kinder- und Jugendlichenpsychotherapeutin nach 203 (StGb), sichere Kommunikation, verständliche Berichte und DSGVO-konforme Prozesse. Klare Trennung von Psychotherapie und Coaching und Beratung.</p>
          </div>

          <div className="pt-4">
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-serif italic text-brand-pink tracking-tight">
                Jessica Greve
              </p>
              <p className="text-sm text-brand-gray/70 tracking-wide font-medium">
                Psychotherapie und Coaching
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
