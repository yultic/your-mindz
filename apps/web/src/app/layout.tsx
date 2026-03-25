import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { StructuredData } from '@/components/layout/structured-data'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Professional Therapy & Counseling Services | Licensed Therapist',
  description: 'Compassionate, evidence-based therapy for anxiety, depression, trauma, and more. Book your appointment online with a licensed psychotherapist. Confidential, professional mental health support.',
  generator: 'skinner.app',
  keywords: 'therapist, psychotherapist, counseling, therapy, mental health, licensed therapist, anxiety treatment, depression help, trauma therapy',
  authors: [{ name: 'Therapist Name' }],
  creator: 'Therapist Name',
  publisher: 'Therapy Practice',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://therapist-website.com',
    siteName: 'Professional Therapy Services',
    title: 'Professional Therapy & Counseling Services | Licensed Therapist',
    description: 'Compassionate, evidence-based therapy for anxiety, depression, trauma, and more. Book your appointment online.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Professional Therapy Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Therapy & Counseling Services',
    description: 'Compassionate therapy for anxiety, depression, trauma, and more.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAF5F0' },
    { media: '(prefers-color-scheme: dark)', color: '#2D1F1A' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
