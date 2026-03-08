import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-background mb-6 leading-tight text-balance">
          Professional Mental Health Support <span className="text-primary">When You Need It</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-background/80 mb-8 max-w-2xl mx-auto text-balance">
          Compassionate, evidence-based therapy for anxiety, depression, trauma, and life transitions. 
          Start your healing journey with a licensed psychotherapist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg h-auto"
          >
            <a href="#booking">Schedule Appointment</a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-primary text-primary hover:bg-primary/10 px-8 py-6 text-lg h-auto"
          >
            <a href="#about">Learn More</a>
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10+</div>
            <p className="text-background/80">Years of Experience</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <p className="text-background/80">Clients Helped</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <p className="text-background/80">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
