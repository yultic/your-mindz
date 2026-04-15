import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@jess-web/ui'
import { faqs } from '@/src/data/faq'

export function FAQSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-navbar-bg overflow-x-clip">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Accordions */}
        <div className="space-y-16">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl md:text-3xl font-serif font-medium text-brand-gray mb-8 border-b border-brand-gray/10 pb-4">
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`${sectionIndex}-${itemIndex}`}
                    className="border-brand-gray/10"
                  >
                    <AccordionTrigger className="text-brand-gray hover:text-brand-green text-left text-lg font-light py-6 transition-all">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-gray/70 leading-relaxed text-base pb-6 font-light">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {/* Contact Message */}
        <div className="mt-24 text-center space-y-8 border-t border-brand-gray/5 pt-20">
          <p className="text-2xl md:text-4xl font-serif text-brand-gray leading-tight max-w-3xl mx-auto">
            Hast du noch andere Fragen? Schreibe mir gerne eine E-Mail. 
            Ich melde mich schnellstmöglich bei dir zurück.
          </p>
          <div className="pt-4">
            <a
              href="mailto:contact@therapypractice.com"
              className="inline-flex items-center justify-center px-12 py-5 rounded-full bg-[#c4a47c] text-white hover:bg-[#b3936b] transition-all font-bold text-sm tracking-[0.2em] uppercase shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              E-Mail schreiben
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
