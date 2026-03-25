import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button } from '@jess-web/ui'
import { Brain, Heart, Eye, Users, Zap, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Therapy Services | Anxiety, Depression, Trauma Treatment',
  description: 'Comprehensive mental health services including anxiety therapy, depression treatment, trauma-focused therapy, relationship counseling, and personal growth coaching.',
  keywords: 'therapy services, anxiety treatment, depression therapy, trauma therapy, couples counseling, mental health',
  openGraph: {
    title: 'Mental Health Therapy Services',
    description: 'Professional therapy for anxiety, depression, trauma, and life transitions.',
    url: 'https://therapist-website.com/services',
    type: 'website',
  },
}

const services = [
  {
    icon: Brain,
    title: 'Anxiety & Stress Management',
    description: 'Evidence-based techniques to manage anxiety, panic attacks, and chronic stress through CBT and mindfulness approaches.',
    details: [
      'Generalized Anxiety Disorder (GAD)',
      'Panic Disorder and Panic Attacks',
      'Social Anxiety',
      'Performance Anxiety',
      'Stress Management Techniques',
      'Relaxation Training',
    ],
  },
  {
    icon: Heart,
    title: 'Depression & Mood Disorders',
    description: 'Compassionate support for depression, bipolar disorder, and other mood challenges with personalized treatment plans.',
    details: [
      'Major Depressive Disorder',
      'Persistent Depressive Disorder (Dysthymia)',
      'Bipolar Disorder Support',
      'Mood Stabilization Strategies',
      'Behavioral Activation',
      'Cognitive Restructuring',
    ],
  },
  {
    icon: Eye,
    title: 'Trauma & PTSD',
    description: 'Specialized trauma-focused therapy to process difficult experiences and build resilience and safety.',
    details: [
      'PTSD Treatment (Trauma-Focused CBT)',
      'Complex Trauma (C-PTSD)',
      'Abuse and Assault Recovery',
      'Grief and Loss Processing',
      'Somatic Experiencing',
      'Safety Planning',
    ],
  },
  {
    icon: Users,
    title: 'Relationship Counseling',
    description: 'Improve communication and connection with couples therapy and individual relationship coaching.',
    details: [
      'Couples Therapy',
      'Communication Skills Training',
      'Conflict Resolution',
      'Attachment Styles',
      'Infidelity and Trust Issues',
      'Pre-marital Counseling',
    ],
  },
  {
    icon: Zap,
    title: 'Life Transitions',
    description: 'Navigate major life changes including career shifts, relationship endings, grief, and personal growth.',
    details: [
      'Career Transitions',
      'Relationship Changes and Breakups',
      'Loss and Grief Processing',
      'Identity Exploration',
      'Major Life Changes',
      'Adjustment Challenges',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Personal Growth',
    description: 'Develop self-awareness, build confidence, and create meaningful change through therapeutic exploration.',
    details: [
      'Self-esteem Building',
      'Confidence Development',
      'Assertiveness Training',
      'Life Purpose Exploration',
      'Values Clarification',
      'Habit Change Support',
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Comprehensive Therapy Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized mental health treatment tailored to your unique needs and challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className="bg-background hover:border-primary transition-colors h-full">
                  <CardHeader>
                    <Icon className="w-12 h-12 text-primary mb-4" />
                    <CardTitle className="text-2xl text-foreground">{service.title}</CardTitle>
                    <CardDescription className="text-base mt-2">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="font-semibold text-foreground text-sm">What we address:</p>
                      <ul className="space-y-2">
                        {service.details.map((detail, i) => (
                          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                            <span className="text-primary">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Therapeutic Approaches */}
          <Card className="bg-secondary/50 border-border mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Evidence-Based Treatment Approaches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Cognitive-Behavioral Therapy (CBT)</h4>
                  <p className="text-muted-foreground">
                    Focuses on identifying and changing negative thought patterns and behaviors that contribute to emotional distress.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Trauma-Focused CBT</h4>
                  <p className="text-muted-foreground">
                    Specialized approach for processing trauma and PTSD with proven effectiveness and safety protocols.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Mindfulness-Based Interventions</h4>
                  <p className="text-muted-foreground">
                    Evidence-based practices that reduce anxiety and depression while increasing present-moment awareness.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Acceptance and Commitment Therapy (ACT)</h4>
                  <p className="text-muted-foreground">
                    Helps you accept difficult emotions while committing to meaningful actions aligned with your values.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Format */}
          <Card className="bg-primary/10 border-primary/30 mb-16">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Session Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Session Format</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Individual therapy sessions</li>
                    <li>• 50-minute standard sessions</li>
                    <li>• Virtual sessions via secure video</li>
                    <li>• In-person sessions available</li>
                    <li>• Flexible scheduling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Confidentiality</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• HIPAA compliant</li>
                    <li>• All records secure and encrypted</li>
                    <li>• Professional privilege protected</li>
                    <li>• Privacy is paramount</li>
                    <li>• Limited exceptions to confidentiality*</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center space-y-4">
            <p className="text-xl text-muted-foreground">
              Ready to explore therapy? Schedule a consultation to discuss which service is right for you.
            </p>
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg h-auto"
            >
              <a href="/#booking">Schedule Consultation</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
