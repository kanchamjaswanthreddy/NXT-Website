import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const SITE = 'https://www.nxtfinancialgroup.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: 'NXT Financial Group | Independent Insurance Brokerage', template: '%s | NXT Financial Group' },
  description: 'NXT Financial Group compares 104+ top-rated carriers to place your auto, home, life, health and business insurance across all 50 states.',
  openGraph: { type: 'website', siteName: 'NXT Financial Group', images: ['/logo.png'] },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/favicon.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#080E28" />
      </head>
      <body className="flex min-h-screen flex-col">
        <Nav />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
