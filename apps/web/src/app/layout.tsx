import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/layout/theme-provider'
import { Toaster } from '@jess-web/ui'
import '@/src/app/globals.css' 

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: 'Jessica Greve | Psychotherapie, Coaching & Beratung',
    template: '%s | Jessica Greve'
  },
  description: 'Professionelles Coaching und Beratung für Erwachsene, Kinder und Jugendliche. Online-Therapie auf Deutsch, Spanisch, Englisch und Niederländisch.',
  generator: 'skinner.app',
  keywords: ['Psychotherapie', 'Coaching', 'Beratung', 'Jessica Greve', 'Online-Therapie', 'Kinderpsychotherapie', 'Jugendlichenpsychotherapie', 'Verhaltenstherapie'],
  authors: [{ name: 'Jessica Greve' }],
  creator: 'Jessica Greve',
  publisher: 'Jessica Greve',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://jessica-greve.de',
    siteName: 'Jessica Greve - Psychotherapie & Coaching',
    title: 'Jessica Greve | Psychotherapie, Coaching & Beratung',
    description: 'Professionelles Coaching und Beratung für Erwachsene, Kinder und Jugendliche. Online-Therapie auf Deutsch, Spanisch, Englisch und Niederländisch.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jessica Greve - Psychotherapie & Coaching',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jessica Greve | Psychotherapie, Coaching & Beratung',
    description: 'Professionelles Coaching und Beratung für Erwachsene, Kinder und Jugendliche.',
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
