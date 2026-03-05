import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Award, BookOpen, Heart } from 'lucide-react'

export function TherapistProfile() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            About Your Therapist
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bringing expertise, compassion, and evidence-based practice to your therapy journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Therapist Image */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm relative">
              <Image
                src="/therapist-photo.jpg"
                alt="Dr. Sarah Johnson, LCSW - Licensed Clinical Social Worker"
                width={400}
                height={500}
                className="rounded-lg shadow-lg object-cover w-full"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-foreground mb-2">Dr. Sarah Johnson, LCSW</h3>
              <p className="text-primary font-semibold">Licensed Clinical Social Worker</p>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 10 years of clinical experience, I'm dedicated to creating a safe, non-judgmental space 
              where you can explore your thoughts, feelings, and experiences. I believe healing is possible, and 
              I'm here to support you every step of the way.
            </p>

            {/* Qualifications */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Award className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Licensed Credentials</h4>
                  <p className="text-muted-foreground">LCSW (Licensed Clinical Social Worker), MA in Clinical Social Work</p>
                </div>
              </div>

              <div className="flex gap-4">
                <BookOpen className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Specializations</h4>
                  <p className="text-muted-foreground">Anxiety disorders, depression, trauma, life transitions, relationship issues</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground">Therapeutic Approach</h4>
                  <p className="text-muted-foreground">Cognitive-Behavioral Therapy (CBT), Trauma-Focused CBT, Mindfulness-Based interventions</p>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <Card className="bg-secondary/50 border-border">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Continuing Education:</span> Regularly attends conferences 
                  and training to stay current with evidence-based practices and therapeutic innovations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
