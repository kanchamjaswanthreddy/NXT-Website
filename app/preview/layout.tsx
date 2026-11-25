import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './preview.css'

// Typefaces for the preview, shipped with the site: Archivo (variable weight and width) for
// everything set in type, IBM Plex Mono for the small labels. Both are under the SIL Open Font
// License (see ./fonts).
const sans = localFont({ src: './fonts/archivo-latin-wdth-normal.woff2', weight: '100 900', style: 'normal', variable: '--pv-sans', display: 'swap', declarations: [{ prop: 'font-stretch', value: '62% 125%' }] })
const mono = localFont({ src: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal', variable: '--pv-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Design preview: home page',
  description: 'A proposed new look for the NXT Financial Group home page.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com' },
}

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <div className={`pv ${sans.variable} ${mono.variable}`}>{children}</div>
}
