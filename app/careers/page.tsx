import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join NXT Financial Group. Explore open positions in financial services and build a rewarding career helping clients plan for retirement.',
}

const BENEFITS = [
  [
    'Independent platform',
    'Access to 100+ A-rated carriers, no quotas.',
  ],
  [
    'Training & licensing',
    'Comprehensive onboarding and continuing education.',
  ],
  [
    'Technology',
    'Modern CRM, e-apps, and client management tools.',
  ],
  [
    'Growth path',
    'Clear advancement from Financial Associate to Senior Director.',
  ],
] as const

const POSITIONS = [
  { title: 'Financial Associate', location: 'Malden, MA', type: 'Full-time' },
  {
    title: 'Financial Associate',
    location: 'Remote — All States',
    type: 'Full-time',
  },
  {
    title: 'Senior Financial Associate',
    location: 'Malden, MA',
    type: 'Full-time',
  },
  {
    title: 'Financial Director',
    location: 'Remote — All States',
    type: 'Full-time',
  },
] as const

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career in financial services."
        intro="Join a growing team of independent financial professionals. We provide training, carrier access and back-office support so you can focus on helping clients."
        image="/images/team.png"
      />

      {/* Why NXT */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-12 max-w-[640px]">
            <p className="label-sm mb-5">Why NXT</p>
            <h2 className="display">
              Everything you need to serve clients, nothing that gets in the way.
            </h2>
          </Reveal>

          <Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {BENEFITS.map(([title, description]) => (
              <Item
                as="li"
                key={title}
                className="card rounded-[24px] p-8"
              >
                <h3 className="display-sm">{title}</h3>
                <p className="mt-3 text-[15px] text-ink-soft">{description}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-12 max-w-[640px]">
            <p className="label-sm mb-5">Open positions</p>
            <h2 className="display">Current openings across the team.</h2>
          </Reveal>

          <Stagger as="ul" className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {POSITIONS.map((pos, i) => (
              <Item
                as="li"
                key={`${pos.title}-${pos.location}`}
                className="card flex flex-col justify-between rounded-[24px] p-8"
              >
                <div>
                  <h3 className="display-sm">{pos.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">
                    {pos.location} &middot; {pos.type}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="btn btn-primary mt-6 w-fit"
                >
                  Apply now <ArrowRight size={16} />
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-stone">
        <div className="container max-w-[720px] text-center">
          <Reveal>
            <h2 className="display">Don&rsquo;t see your role?</h2>
            <p className="lead mt-5 text-ink-soft">
              We&rsquo;re always looking for talented people who share our
              commitment to helping clients plan with confidence. Reach out and
              tell us about yourself.
            </p>
            <Link href="/contact" className="btn btn-primary mt-9 inline-flex">
              Get in touch <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
