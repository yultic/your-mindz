import Image from 'next/image'

export function TherapistProfile() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Image with specific proportions */}
        <div className="relative aspect-[4/5] lg:aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-sm shadow-sm">
          <Image
            src="/Jessy.png"
            alt="Jessica Greve - Psychotherapist"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Content matching the screenshot layout */}
        <div className="flex flex-col space-y-8 text-foreground">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand-gray/60">
              Mi Misión
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight font-medium text-brand-gray">
              Hacer que la terapia sistémica sea accesible para las personas que hacen mucho – rara vez se dan espacio.
            </h2>
          </div>

          <div className="space-y-6 text-lg text-brand-gray/80 leading-relaxed font-light text-pretty">
            <p>
              Las personas que tienen mucha responsabilidad, están en el ojo público, están muy involucradas en sus carreras, están constantemente disponibles o viajan mucho – todos se benefician de un apoyo psicológico que se adapta a sus vidas. Flexible y discreto. Sin presión de tiempo adicional ni estructuras terapéuticas rígidas.
            </p>
            <p>
              Precisamente por eso fundé la práctica online en 2020: para ofrecer a las personas un marco especialmente confidencial y flexible para sus preocupaciones, en el que sean posibles encuentros interpersonales reales y cambios sostenibles. Porque el acceso a terapia sistémica puede ser fácil – especialmente para quienes portan y realizan mucho.
            </p>
          </div>

          <div className="pt-6">
            <div className="space-y-1">
              <p className="text-4xl lg:text-5xl font-serif italic text-brand-pink tracking-tight">
                Jessica Greve
              </p>
              <p className="text-sm text-brand-gray/70 tracking-wide font-medium">
                Psicólogo estudiado u terapeuta sistémico certificado
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
