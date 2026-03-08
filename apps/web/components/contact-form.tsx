'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MessageCircle } from 'lucide-react'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a production app, you would send this to your backend API
      // For now, we'll create a mailto link that opens the user's email client
      const mailtoLink = `mailto:contact@therapypractice.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
      )}`

      window.location.href = mailtoLink
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })

      // Reset submission state after 3 seconds
      setTimeout(() => setSubmitted(false), 3000)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWhatsAppSubmit = () => {
    const message = `Hi, my name is ${formData.name}. ${formData.message}`
    const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappLink, '_blank')
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-xl text-muted-foreground">
            Have questions? Reach out and I'll respond within 24 hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Email Form */}
          <Card className="bg-background">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                <CardTitle>Email</CardTitle>
              </div>
              <CardDescription>Send a message directly</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="Appointment Inquiry">Appointment Inquiry</option>
                    <option value="Questions about Therapy">Questions about Therapy</option>
                    <option value="Insurance Question">Insurance Question</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                    Phone (optional)
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="(555) 000-0000"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
                    Thank you! Your email client is opening. Please send the email to complete your message.
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* WhatsApp & Direct */}
          <Card className="bg-background">
            <CardHeader>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <CardTitle>Quick Contact</CardTitle>
              </div>
              <CardDescription>Alternative contact methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* WhatsApp Quick Message */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Send a quick message via WhatsApp for fastest response.
                </p>
                {formData.name && formData.message ? (
                  <Button
                    onClick={handleWhatsAppSubmit}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Send via WhatsApp
                  </Button>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Fill in the form to send via WhatsApp
                  </p>
                )}
              </div>

              <div className="border-t border-border pt-4">
                <h4 className="font-semibold text-foreground mb-2">Direct Contact</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Phone</p>
                    <a href="tel:+15551234567" className="text-primary hover:underline">
                      (555) 123-4567
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Email</p>
                    <a
                      href="mailto:contact@therapypractice.com"
                      className="text-primary hover:underline break-all"
                    >
                      contact@therapypractice.com
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Office Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: 9:00 AM - 6:00 PM<br />
                      Sat: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  For urgent matters or crises, please call 911 or contact the National Suicide Prevention 
                  Lifeline at <strong>988</strong>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
