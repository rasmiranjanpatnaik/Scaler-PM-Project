import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'AI Career Copilot - Personalized Career Growth Analysis & Job Recommendations',
    template: '%s | AI Career Copilot'
  },
  description: 'Get your personalized AI-powered career growth report in 60 seconds. Discover your job readiness score, skill gaps, salary potential, and get matched with top job opportunities from LinkedIn and Naukri.',
  keywords: [
    'career analysis',
    'job readiness',
    'career growth',
    'resume analysis',
    'job recommendations',
    'career advisor',
    'skill gap analysis',
    'salary potential',
    'career roadmap',
    'job matching',
    'LinkedIn jobs',
    'Naukri jobs',
    'career development',
    'professional growth'
  ],
  authors: [{ name: 'AI Career Copilot' }],
  creator: 'AI Career Copilot',
  publisher: 'AI Career Copilot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-career-copilot.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AI Career Copilot - Personalized Career Growth Analysis',
    description: 'Get your personalized AI-powered career growth report in 60 seconds. Discover job readiness, skill gaps, and salary potential.',
    siteName: 'AI Career Copilot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Career Copilot - Career Growth Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Career Copilot - Personalized Career Growth Analysis',
    description: 'Get your personalized AI-powered career growth report in 60 seconds.',
    images: ['/og-image.png'],
    creator: '@aicareercopilot',
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
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'AI Career Copilot',
              description: 'Personalized AI-powered career growth analysis and job recommendations',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ai-career-copilot.vercel.app',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                ratingCount: '127',
              },
            }),
          }}
        />
      </head>
      <body className="dark">{children}</body>
    </html>
  )
}

