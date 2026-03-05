import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Heart, Zap, Users, TrendingUp, Eye } from 'lucide-react'

export function ServicesSection() {
  const services = [
    {
      icon: Brain,
      title: 'Anxiety & Stress Management',
      description: 'Evidence-based techniques to manage anxiety, panic attacks, and chronic stress through CBT and mindfulness approaches.',
    },
    {
      icon: Heart,
      title: 'Depression & Mood Disorders',
      description: 'Compassionate support for depression, bipolar disorder, and other mood challenges with personalized treatment plans.',
    },
    {
      icon: Eye,
      title: 'Trauma & PTSD',
      description: 'Specialized trauma-focused therapy to process difficult experiences and build resilience and safety.',
    },
    {
      icon: Users,
      title: 'Relationship Counseling',
      description: 'Improve communication and connection with couples therapy and individual relationship coaching.',
    },
    {
      icon: Zap,
      title: 'Life Transitions',
      description: 'Navigate major life changes including career shifts, relationship endings, grief, and personal growth.',
    },
    {
      icon: TrendingUp,
      title: 'Personal Growth',
      description: 'Develop self-awareness, build confidence, and create meaningful change through therapeutic exploration.',
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-background mb-4">
            Services I Offer
          </h2>
          <p className="text-xl text-background/80 max-w-2xl mx-auto">
            Comprehensive mental health services tailored to your unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card key={index} className="bg-background/50 hover:border-primary transition-colors h-full">
                <CardHeader>
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <CardTitle className="text-background">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-background/80">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Session Information */}
        <Card className="mt-16 bg-background/50 border-primary/30">
          <CardContent className="pt-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50 min</div>
                <p className="text-background/80">Standard Session</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Flexible</div>
                <p className="text-background/80">In-person & Virtual</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">Confidential</div>
                <p className="text-background/80">HIPAA Compliant</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
