import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react'
import { solutions } from '@/lib/solutions'

const COMPANY = [['/about', 'About NXT'], ['/carriers', 'Carrier partners'], ['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/referral', 'Refer a friend'], ['/contact', 'Contact']]

export default function Footer() {
  return (
    <footer className="bg-midnight on-dark">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">
          <div>
            <Link href="/" aria-label="NXT Financial Group" className="inline-block rounded-xl bg-white px-5 py-3"><Image src="/logo.png" alt="NXT Financial Group" width={240} height={106} className="h-16 w-auto" /></Link>
            <p className="mt-6 max-w-[360px] text-[15px] leading-relaxed">Independent retirement and protection planning. Annuities, life insurance, care planning, Medicare and disability income from A-rated carriers, in all 50 states.</p>
            <ul className="mt-7 space-y-3 text-[15px]">
              <li><a href="tel:8572053333" className="flex items-center gap-3 text-platinum hover:text-white"><Phone size={16} className="text-sunrise" />857-205-3333</a></li>
              <li><a href="mailto:info@nxtfinancialgroup.com" className="flex items-center gap-3 text-platinum hover:text-white"><Mail size={16} className="text-sunrise" />info@nxtfinancialgroup.com</a></li>
              <li className="flex items-center gap-3 text-platinum"><MapPin size={16} className="text-sunrise" />75 Pleasant Street, Unit 207, Malden, MA 02148</li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="https://www.instagram.com/nxtfinancialgroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-platinum transition-colors hover:bg-gold hover:text-navy"><Instagram size={18} /></a>
              <a href="https://www.facebook.com/people/NXT-Financial-Group/61589938040020/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-platinum transition-colors hover:bg-gold hover:text-navy"><Facebook size={18} /></a>
              <a href="https://www.linkedin.com/company/https-nxtfinancialgroup.com-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-platinum transition-colors hover:bg-gold hover:text-navy"><Linkedin size={18} /></a>
              <a href="https://www.youtube.com/@NXTFinancialGroup" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-platinum transition-colors hover:bg-gold hover:text-navy"><Youtube size={18} /></a>
            </div>
          </div>
          <nav aria-label="Solutions"><h3 className="mb-5 text-sm font-semibold text-sunrise">Solutions</h3><ul className="space-y-3 text-[15px]">{solutions.map((s) => <li key={s.slug}><Link href={`/solutions/${s.slug}`} className="text-platinum hover:text-white">{s.title}</Link></li>)}</ul></nav>
          <nav aria-label="Company"><h3 className="mb-5 text-sm font-semibold text-sunrise">Company</h3><ul className="space-y-3 text-[15px]">{COMPANY.map(([h, l]) => <li key={h}><Link href={h} className="text-platinum hover:text-white">{l}</Link></li>)}</ul></nav>
        </div>
        <div className="mt-14 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-silver">© {new Date().getFullYear()} NXT Financial Group. All rights reserved.</p>
            <ul className="flex gap-6 text-sm"><li><Link href="/privacy-policy" className="text-silver hover:text-white">Privacy</Link></li><li><Link href="/terms" className="text-silver hover:text-white">Terms</Link></li></ul>
          </div>
          <p className="mono mt-4 max-w-[900px] text-xs leading-relaxed text-silver">NXT Financial Group is a licensed independent insurance agency headquartered in Massachusetts. Annuity and insurance guarantees are backed by the claims-paying ability of the issuing carrier. Product availability, features and rates vary by carrier and state. We do not offer every plan available in your area; contact Medicare.gov or 1-800-MEDICARE for all options. Estimates on this site are illustrative and not an offer of coverage.</p>
        </div>
      </div>
    </footer>
  )
}
