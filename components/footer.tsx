import Link from 'next/link'
import { Mail, MapPin, Phone, Facebook, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-foreground text-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">J</span>
              </div>
              <span className="font-semibold">Therapy Practice</span>
            </div>
            <p className="text-background/80 text-sm">
              Compassionate, evidence-based therapy for your mental health journey.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="/" className="hover:text-background transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-background transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-background transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-background transition-colors">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-background/80">
              <li className="flex gap-3 items-start">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex gap-3 items-start">
                <Mail className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@therapypractice.com" className="hover:text-background transition-colors">
                  contact@therapypractice.com
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Your City, State</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background/80 hover:text-background transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 text-sm text-background/80">
              <Link href="#" className="hover:text-background transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-background transition-colors">
                Disclaimer
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-sm text-background/80 text-right">
              <p>© {currentYear} Therapy Practice. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Confidentiality Notice */}
        <div className="mt-8 p-4 bg-background/10 rounded-lg text-sm text-background/90">
          <p className="font-semibold mb-2">HIPAA & Confidentiality</p>
          <p>
            All sessions are confidential and comply with HIPAA privacy regulations. 
            Your mental health information is protected and secure.
          </p>
        </div>
      </div>
    </footer>
  )
}
