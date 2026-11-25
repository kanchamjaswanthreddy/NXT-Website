import Link from 'next/link'
import { solutions } from '@/lib/solutions'

const COMPANY = [['/about', 'About NXT'], ['/carriers', 'Carrier partners'], ['/nxt-life', 'NXT Life'], ['/insights', 'Insights'], ['/careers', 'Careers'], ['/partner', 'For advisors'], ['/referral', 'Refer a friend'], ['/contact', 'Contact']]
const TOOLS = [['/calculators', 'Calculators'], ['/resources', 'Planning tools'], ['/get-started', 'Get started']]
const SOCIAL = [
  ['https://www.linkedin.com/company/https-nxtfinancialgroup.com-/', 'LinkedIn'],
  ['https://www.instagram.com/nxtfinancialgroup', 'Instagram'],
  ['https://www.facebook.com/people/NXT-Financial-Group/61589938040020/', 'Facebook'],
  ['https://www.youtube.com/@NXTFinancialGroup', 'YouTube'],
]

/** The navy-black panel that closes every page inside the frame. */
export default function Footer() {
  return (
    <footer className="footer">
      <p className="mq" aria-hidden="true"><span>{Array.from({ length: 4 }, (_, k) => <span key={k}>Protect what matters<i>.</i> Plan what&rsquo;s next<i>.</i></span>)}</span></p>
      <div className="container">
        <div className="footer-top">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <span className="footer-logo"><img src="/media/logo-trim.png" alt="NXT Financial Group" width={420} height={154} loading="lazy" /></span>
            <p className="footer-h">Talk to us</p>
            <a href="tel:8572053333" className="footer-big">857-205-3333</a>
            <a href="mailto:info@nxtfinancialgroup.com" className="footer-big">info@nxtfinancialgroup.com</a>
            <address className="mt-6 not-italic text-white/70">75 Pleasant Street, Unit 207<br />Malden, MA 02148</address>
          </div>
          <div className="footer-cols">
            <nav aria-label="Solutions">
              <p className="footer-h">Solutions</p>
              <ul>{solutions.map((s) => <li key={s.slug}><Link href={`/solutions/${s.slug}`}>{s.title}</Link></li>)}</ul>
            </nav>
            <nav aria-label="Company">
              <p className="footer-h">Company</p>
              <ul>{COMPANY.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
            </nav>
            <nav aria-label="Tools and social">
              <p className="footer-h">Tools</p>
              <ul>{TOOLS.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
              <p className="footer-h mt-7">Follow</p>
              <ul>{SOCIAL.map(([href, label]) => <li key={label}><a href={href} target="_blank" rel="noopener noreferrer">{label}</a></li>)}</ul>
            </nav>
          </div>
        </div>
        <p className="footer-legal">NXT Financial Group is a licensed independent insurance agency headquartered in Massachusetts. Annuity and insurance guarantees are backed by the claims-paying ability of the issuing carrier. Product availability, features and rates vary by carrier and state. We do not offer every plan available in your area; contact Medicare.gov or 1-800-MEDICARE for all options. Estimates on this site are illustrative and not an offer of coverage.</p>
        <div className="footer-base">
          <p>© {new Date().getFullYear()} NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.</p>
          <p className="flex gap-6"><a href="https://crm.nxtfinancialgroup.com/auth/login" target="_blank" rel="noopener noreferrer">Agent login</a><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></p>
        </div>
      </div>
    </footer>
  )
}
