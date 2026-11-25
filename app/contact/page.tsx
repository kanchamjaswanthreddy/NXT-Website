import type { Metadata } from 'next'
import { Suspense } from 'react'
import PageHero from '@/components/PageHero'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Free Consultation',
  description: 'Book a free, no-obligation consultation with an NXT Financial Group advisor. Compare quotes from 70+ carriers across annuities, life insurance, Medicare, disability, care planning and home & auto.',
  openGraph: { title: 'Contact NXT Financial Group', description: 'Get a free quote from an independent advisor who shops 70+ carriers for you.' },
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/contact' },
}

const INFO = [
  { label: 'Phone', value: '857-205-3333', href: 'tel:8572053333' },
  { label: 'Email', value: 'info@nxtfinancialgroup.com', href: 'mailto:info@nxtfinancialgroup.com' },
  { label: 'Office', value: '75 Pleasant Street, Unit 207, Malden, MA 02148' },
  { label: 'Hours', value: 'Mon to Fri, 9am to 6pm ET' },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        intro="Tell us what prompted the call. A licensed advisor replies within one business day to schedule."
      />
      <section className="section bg-white">
        <div className="container grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.5fr] lg:items-start lg:gap-20">
          <aside>
            <div className="on-dark rounded-[28px] bg-midnight p-8 md:p-9">
              <p className="label-sm">Your first meeting</p>
              <p className="mt-3 text-[1.625rem] font-semibold leading-[1.12] tracking-[-.035em] !text-white">45 minutes. No products. Just where you stand.</p>
            </div>
            <dl className="mt-10 border-t border-midnight/10">
              {INFO.map((item) => (
                <div key={item.label} className="grid grid-cols-[88px_1fr] gap-4 border-b border-midnight/10 py-4">
                  <dt className="text-[1.0625rem] text-ink-soft">{item.label}</dt>
                  <dd className="font-medium tracking-[-.015em] text-midnight">{item.href ? <a href={item.href} className="hover:underline">{item.value}</a> : item.value}</dd>
                </div>
              ))}
            </dl>
            <div className="tile mt-10 p-7">
              <h2 className="h3 mb-2">Prefer to talk?</h2>
              <p className="mb-5 text-[1.0625rem] text-ink-soft">Call during business hours and an advisor picks up. Medicare questions are often answered on the first call.</p>
              <a href="tel:8572053333" className="btn btn-primary btn-sm">Call now</a>
            </div>
          </aside>
          <Suspense><ContactForm /></Suspense>
        </div>
      </section>
    </>
  )
}
