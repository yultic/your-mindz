'use client'

export function QuoteSection() {
  return (
    <section className="bg-navbar-bg py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
        
        {/* Imagen Izquierda - Portrait */}
        <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm shadow-md order-2 md:order-1">
          <img 
            src="/family1.jpg" // Reemplazar con imagen de familia 1
            alt="Relationships and connection"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
        </div>

        {/* Cita Central */}
        <div className="w-full md:w-2/5 text-center space-y-8 order-1 md:order-2 py-10 md:py-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif leading-tight font-medium text-brand-gray">
            "The quality of your life ultimately depends on the quality of your relationships"
          </h2>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-[1px] bg-[#4a5568]/40"></div>
            <p className="text-xs md:text-sm tracking-[0.4em] text-[#4a5568] uppercase font-medium">
              — Jess Greve
            </p>
          </div>
        </div>

        {/* Imagen Derecha - Portrait */}
        <div className="w-full md:w-1/3 aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-sm shadow-md order-3">
          <img 
            src="/friends1.jpg"
            alt="Family and support"
            className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
          />
        </div>

      </div>
    </section>
  )
}
