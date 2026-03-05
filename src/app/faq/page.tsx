import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'FAQ | Therapy Questions Answered',
  description: 'Frequently asked questions about therapy, confidentiality, scheduling, costs, and what to expect in your first session.',
  keywords: 'therapy FAQ, counseling questions, therapy confidentiality, HIPAA, mental health help',
  openGraph: {
    title: 'Frequently Asked Questions About Therapy',
    description: 'Get answers to common questions about therapy, scheduling, and mental health treatment.',
    url: 'https://therapist-website.com/faq',
    type: 'website',
  },
}

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        q: 'How do I schedule my first appointment?',
        a: 'You can book an appointment directly through our online calendar, email us at contact@therapypractice.com, or reach out via WhatsApp. The online calendar is the fastest option and shows real-time availability.',
      },
      {
        q: 'What should I expect in my first session?',
        a: 'Your first session is a consultation where we\'ll discuss your concerns, therapy goals, and my approach. I\'ll gather background information to understand your situation better. This helps us determine if we\'re a good fit and allows me to tailor treatment to your needs.',
      },
      {
        q: 'How long is a therapy session?',
        a: 'Standard therapy sessions are 50 minutes. This allows time for meaningful work while leaving time for documentation and to prepare for the next client.',
      },
      {
        q: 'What is your cancellation policy?',
        a: 'Cancellations or rescheduling must be made at least 24 hours in advance to avoid a cancellation fee. Life happens, and I understand emergencies occur. Clear communication is appreciated.',
      },
    ],
  },
  {
    category: 'Confidentiality & Privacy',
    questions: [
      {
        q: 'Is everything I say confidential?',
        a: 'Yes, everything you share in therapy is confidential and protected by therapist-patient privilege. This is a legal protection that applies to our relationship.',
      },
      {
        q: 'When can you break confidentiality?',
        a: 'There are limited exceptions to confidentiality: if you\'re an immediate danger to yourself or others, if there\'s abuse of a child or vulnerable adult, or if a court orders disclosure. I would discuss these situations with you.',
      },
      {
        q: 'Is my therapy information HIPAA protected?',
        a: 'Yes. I comply with HIPAA regulations. Your medical records are secure, encrypted, and stored confidentially. They will not be shared without your written consent.',
      },
      {
        q: 'What happens if I need to be contacted by someone else?',
        a: 'I will never share information with family, friends, or employers without your explicit written consent. You control who has access to your therapy information.',
      },
    ],
  },
  {
    category: 'Therapy & Treatment',
    questions: [
      {
        q: 'How does therapy actually help?',
        a: 'Therapy works by helping you understand your thoughts, feelings, and behaviors in new ways. Through evidence-based techniques, you\'ll develop coping skills, process difficult experiences, and create meaningful change in your life.',
      },
      {
        q: 'How long will I need therapy?',
        a: 'The duration varies based on your goals and needs. Some people benefit from short-term therapy (8-12 sessions), while others prefer longer-term support. We\'ll discuss this together and adjust as needed.',
      },
      {
        q: 'Do you prescribe medication?',
        a: 'I don\'t prescribe medication as I\'m not a psychiatrist. However, I can work with your prescribing doctor and refer you to a psychiatrist if medication might be helpful for your situation.',
      },
      {
        q: 'What approaches do you use?',
        a: 'I primarily use Cognitive-Behavioral Therapy (CBT), Trauma-Focused CBT, and mindfulness-based approaches. I tailor treatment to what works best for each individual.',
      },
    ],
  },
  {
    category: 'Scheduling & Sessions',
    questions: [
      {
        q: 'Do you offer virtual sessions?',
        a: 'Yes! I offer both in-person and virtual sessions via secure video conference. Virtual sessions provide flexibility and are equally effective for many types of therapy.',
      },
      {
        q: 'What if I need to cancel a session?',
        a: 'I understand life happens. Please provide at least 24 hours notice if you need to cancel or reschedule. Last-minute cancellations may result in a cancellation fee.',
      },
      {
        q: 'What is your availability?',
        a: 'I offer appointments Monday through Friday, 9am-6pm, with some evening availability. I also have limited Saturday morning slots. Check the online calendar for current availability.',
      },
      {
        q: 'Can I text you between sessions?',
        a: 'I don\'t provide crisis support via text. However, you\'re welcome to send brief messages, and I\'ll respond during business hours. For emergencies, please call 911 or go to the nearest emergency room.',
      },
    ],
  },
  {
    category: 'Costs & Insurance',
    questions: [
      {
        q: 'What is your fee?',
        a: 'My standard fee for a 50-minute session is $150. I offer sliding scale fees for those with financial hardship. Ask about payment plan options.',
      },
      {
        q: 'Do you accept insurance?',
        a: 'I am currently out-of-network with most insurance plans. You can submit claims for reimbursement, and I\'ll provide necessary documentation (superbills) for your insurance.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'I accept credit cards, debit cards, and ACH transfers. Payment is due at the end of each session unless other arrangements have been made.',
      },
      {
        q: 'Do you offer sliding scale fees?',
        a: 'Yes, I believe everyone deserves access to quality mental health care. Sliding scale fees are available based on income and circumstances. Please discuss this with me.',
      },
    ],
  },
  {
    category: 'Crisis & Emergency',
    questions: [
      {
        q: 'What if I\'m in crisis?',
        a: 'If you\'re in immediate danger, please call 911 or go to your nearest emergency room. You can also contact the National Suicide Prevention Lifeline at 988 (available 24/7).',
      },
      {
        q: 'Can you see me in an emergency?',
        a: 'While I aim to be responsive, I may not always be available for emergency sessions. For urgent mental health crises, please contact emergency services, a crisis hotline, or go to an ER.',
      },
      {
        q: 'What support resources are available?',
        a: 'National Suicide Prevention Lifeline: 988 | Crisis Text Line: Text HOME to 741741 | National Alliance on Mental Illness: 1-800-950-NAMI (6264)',
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Common questions about therapy, confidentiality, and getting started
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.questions.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`${sectionIndex}-${itemIndex}`}
                      className="border-border"
                    >
                      <AccordionTrigger className="text-foreground hover:text-primary">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Additional Help */}
          <Card className="mt-16 bg-primary/10 border-primary/30">
            <CardContent className="pt-8">
              <h3 className="text-xl font-bold text-foreground mb-4">
                Didn't find your answer?
              </h3>
              <p className="text-muted-foreground mb-6">
                Feel free to reach out with any questions. I\'m happy to discuss your concerns 
                and how I can help you on your mental health journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:contact@therapypractice.com"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Send Email
                </a>
                <a
                  href="/#booking"
                  className="inline-flex items-center justify-center px-6 py-2 rounded-md border border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  Schedule Consultation
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
