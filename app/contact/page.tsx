import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Book a free consultation with an NXT Financial Group advisor.',
}

const INFO = [
  { icon: Phone, label: 'Phone', value: '857-205-3333', href: 'tel:8572053333' },
  { icon: Mail, label: 'Email', value: 'info@nxtfinancialgroup.com', href: 'mailto:info@nxtfinancialgroup.com' },
  { icon: MapPin, label: 'Office', value: '75 Pleasant Street, Unit 207, Malden, MA 02148' },
  { icon: Clock, label: 'Hours', value: 'Mon to Fri, 9am to 6pm ET' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        intro="Tell us what prompted the call. A licensed advisor replies within one business day to schedule."
      />
      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.5fr] lg:items-start">
          <aside className="space-y-8">
            <ul className="space-y-5">
              {INFO.map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-navy ring-1 ring-platinum">
                    <item.icon size={20} />
                  </span>
                  <div>
                    <p className="text-sm text-ink-soft">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="font-semibold text-navy hover:text-command">{item.value}</a>
                    ) : (
                      <p className="font-semibold">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <div className="card rounded-[20px] border-l-[3px] border-l-gold p-6">
              <h2 className="h3 mb-2">Prefer to talk?</h2>
              <p className="mb-4 text-[15px] text-ink-soft">Call during business hours and an advisor picks up. Medicare questions are often answered on the first call.</p>
              <a href="tel:8572053333" className="btn btn-primary btn-sm">Call now</a>
            </div>
          </aside>
          <Suspense><ContactForm /></Suspense>
        </div>
      </section>
    </>
  )
}
