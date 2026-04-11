'use client'

export function ApproachSection() {
  return (
    <section className="bg-navbar-bg py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Columna Izquierda: Texto */}
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight font-medium text-brand-gray">
            We Know How To Help -
          </h2>
          
          <div className="space-y-6 text-lg text-brand-gray/80 leading-relaxed font-light text-pretty">
            <p>
              Empower Family Therapy is a private practice specializing in <span className="font-bold text-[#2d3748]">nurturing and enhancing relationships within the family unit</span>. Our dedicated therapists are experienced in working with individuals, couples, and entire families, always prioritizing a deep understanding of our clients within the context of their relationships and the broader systems that shape their lives.
            </p>
            
            <p>
              At Empower Family Therapy, we employ <span className="font-bold text-[#2d3748]">effective relationally-based interventions to facilitate long-lasting positive changes</span>. Our tailored approach ensures that we address the unique challenges faced by each individual, couple, or family. <span className="font-bold text-[#2d3748]">We empower clients with the tools they need to make long lasting, positive change.</span>
            </p>
          </div>
        </div>

        {/* Columna Derecha: Imagen / Ilustración */}
        <div className="relative aspect-square md:aspect-video rounded-sm overflow-hidden shadow-xl bg-white/50 flex items-center justify-center">
          {/* Aquí podrás poner tu SVG o imagen final */}
          <img 
            src="/therapy.jpg" 
            alt="Therapy Approach Illustration"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay sutil opcional para dar estilo */}
          <div className="absolute inset-0 bg-[#2d3748]/5 pointer-events-none"></div>
        </div>

      </div>
    </section>
  )
}
