import { Button } from '@jess-web/ui'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] py-24 sm:py-32 pt-15 lg:py-48 px-4 sm:px-6 lg:px-8 bg-foreground text-brand-pink overflow-hidden flex items-center justify-center">
      <Image
        src="/brain_22.png"
        alt=""
        width={700}
        height={700}
        priority
        className="absolute left-1/2 top-1/2 lg:top-[55%] -translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none object-contain z-0 w-[85vw] lg:w-[700px] h-auto"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center px-4 pt-20 sm:pt-4">
        <h1 className="text-3xl pt-30 sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-brand-violet break-words hyphens-auto">
          Coaching und Beratung für Erwachsene<br />
          <span className="text-brand-pink"> sowie Kinder und Jugendliche (6- 18 Jahre)</span>
        </h1>

        <p className="text-lg sm:text-xl text-background/90 mb-10 max-w-2xl mx-auto text-balance font-medium">
          Psychotherapie, professionelle Beratung und Coaching für jeden zugänglich machen- ohne 
          zwingend eine Diagnose vorliegen zu haben und ohne Bürokratie. Individuell an deinen Wünschen und Bedürfnissen orientiert.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          <Button
            asChild
            className="bg-brand-pink hover:bg-brand-green text-primary-foreground px-8 py-6 text-lg h-auto"
          >
            <a href="#booking">Termin planen</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="bg-brand-green hover:bg-brand-pink text-primary-foreground px-8 py-6 text-lg h-auto"
          >
            <a href="#about">Mehr Infos</a>
          </Button>
        </div>
      </div>
    </section>
  )
}