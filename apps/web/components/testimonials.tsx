import { Card, CardContent } from '@/components/ui/card'
import { Star } from 'lucide-react'

export function Testimonials() {
  const testimonials = [
    {
      name: 'Michael R.',
      title: 'Software Engineer',
      content: 'Dr. Johnson helped me work through severe anxiety that was affecting my career. Her CBT approach was practical and truly effective. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Emma K.',
      title: 'Marketing Manager',
      content: 'After years of struggling with depression, I finally found real support. The therapy sessions have been transformative and I feel like myself again.',
      rating: 5,
    },
    {
      name: 'David M.',
      title: 'Entrepreneur',
      content: 'The trauma-focused therapy was exactly what I needed. Dr. Johnson creates a safe space where you can truly heal. Worth every session.',
      rating: 5,
    },
    {
      name: 'Sarah L.',
      title: 'Teacher',
      content: 'Going through a major life transition was overwhelming until I started therapy. The guidance and support made all the difference in moving forward.',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            What Clients Are Saying
          </h2>
          <p className="text-xl text-muted-foreground">
            Real stories from people who have experienced meaningful change
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background hover:border-primary transition-colors">
              <CardContent className="pt-6 space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground italic text-lg">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Rating Summary */}
        <Card className="mt-12 bg-primary/10 border-primary/30">
          <CardContent className="pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">4.95/5</div>
                <p className="text-muted-foreground text-sm">Average Rating</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">180+</div>
                <p className="text-muted-foreground text-sm">Reviews</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground text-sm">Would Recommend</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <p className="text-muted-foreground text-sm">Clients Helped</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
