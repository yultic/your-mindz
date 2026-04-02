import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Card,
  CardContent,
} from '@jess-web/ui'
import { faqs } from '@/src/data/faq'

interface FAQSectionProps {
  showContactCard?: boolean;
}

export function FAQSection({ showContactCard = true }: FAQSectionProps) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted overflow-x-clip">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {faqs.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold text-foreground mb-6 border-b pb-2">
                {section.category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((item, itemIndex) => (
                  <AccordionItem
                    key={itemIndex}
                    value={`${sectionIndex}-${itemIndex}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-foreground hover:text-primary text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {showContactCard && (
          <Card className="mt-16 bg-primary/5 border-primary/20">
            <CardContent className="pt-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Didn't find your answer?
              </h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out with any questions. I'm happy to discuss your concerns 
                and how I can help you on your mental health journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:contact@therapypractice.com"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
                >
                  Send Email
                </a>
                <a
                  href="/#booking"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors font-medium"
                >
                  Schedule Consultation
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
