import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const SITE = 'https://www.nxtfinancialgroup.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'NXT Financial Group | IMO — Independent Marketing Organization', template: '%s | NXT Financial Group — IMO' },
  description: 'NXT Financial Group is a leading Independent Marketing Organization (IMO) comparing 70+ top-rated insurance carriers across annuities, life insurance, Medicare, disability, care planning and home & auto — serving families and advisors in all 50 states.',
  keywords: ['IMO', 'Independent Marketing Organization', 'insurance brokerage', 'annuities', 'life insurance', 'Medicare', 'disability income', 'care planning', 'home and auto insurance', 'NXT Financial Group', 'independent insurance agent'],
  openGraph: { type: 'website', siteName: 'NXT Financial Group', locale: 'en_US', images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NXT Financial Group — Independent Marketing Organization (IMO)' }] },
  twitter: { card: 'summary_large_image', title: 'NXT Financial Group | IMO', description: 'Independent Marketing Organization comparing 70+ top-rated carriers across 6 insurance disciplines.' },
  icons: { icon: '/favicon.png' },
  alternates: { canonical: SITE },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NXT Financial Group',
  alternateName: 'NXT Financial',
  url: SITE,
  logo: `${SITE}/logo.png`,
  description: 'NXT Financial Group is an Independent Marketing Organization (IMO) comparing 70+ top-rated insurance carriers across annuities, life insurance, Medicare, disability, care planning and home & auto.',
  foundingDate: '2020',
  areaServed: { '@type': 'Country', name: 'United States' },
  address: { '@type': 'PostalAddress', addressLocality: 'Malden', addressRegion: 'MA', addressCountry: 'US' },
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['English', 'Spanish'] },
  sameAs: [
    'https://www.instagram.com/nxtfinancialgroup',
    'https://www.facebook.com/people/NXT-Financial-Group/61589938040020/',
    'https://www.linkedin.com/company/https-nxtfinancialgroup.com-/',
    'https://www.youtube.com/@NXTFinancialGroup',
  ],
  numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 10, maxValue: 50 },
  knowsAbout: ['Annuities', 'Life Insurance', 'Medicare Planning', 'Disability Income Insurance', 'Long-Term Care Planning', 'Home & Auto Insurance', 'Independent Marketing Organization'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#080E28" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
