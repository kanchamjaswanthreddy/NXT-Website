import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, Users, TrendingUp, Shield } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Get Started — Join NXT Financial Group',
  description:
    'Join NXT Financial Group as an independent agent. Access 70+ A-rated carriers, competitive commissions, training, and back-office support.',
}

const BENEFITS = [
  { icon: TrendingUp, title: 'Up to 130% contracts', desc: 'Start at 75% and grow — your ceiling is 160% total field compensation.' },
  { icon: Users, title: '70+ carrier appointments', desc: 'Annuities, life, Medicare, disability income from top-rated carriers nationwide.' },
  { icon: BookOpen, title: 'Training & mentorship', desc: 'NXT Academy, licensing support, product training, and a dedicated upline.' },
  { icon: Shield, title: 'You own your book', desc: 'Your clients, your relationships. Immediate release — no lock-in, no non-competes.' },
]

const STEPS = [
  { num: '1', title: 'Create your account', desc: 'Fill in your basic info and set a password.' },
  { num: '2', title: 'Complete onboarding', desc: 'Personal details, employment history, background check, and agreement.' },
  { num: '3', title: 'Get approved', desc: 'Our team reviews your application — most are approved within 24 hours.' },
  { num: '4', title: 'Start selling', desc: 'Access the full NXT back office, carrier appointments, and training.' },
]

const CRM_JOIN_URL = 'https://crm.nxtfinancialgroup.com/join'

export default function GetStartedPage() {
  return (
    <>
      <PageHero
        eyebrow="Become an NXT Agent"
        title="Your financial career starts here"
        intro="Join a growing team of independent financial professionals. No invite needed — create your account and start your onboarding today."
      />

      {/* Benefits */}
      <section className="section">
        <div className="container">
          <Reveal>
            <h2 className="display text-center">Why agents choose NXT</h2>
          </Reveal>
          <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((b) => (
              <Item key={b.title} className="rounded-2xl border border-rule bg-white p-7">
                <b.icon size={28} className="text-sunrise" />
                <h3 className="display-sm mt-4">{b.title}</h3>
                <p className="mt-2 text-[15px] text-ink-soft">{b.desc}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-stone">
        <div className="container max-w-[800px]">
          <Reveal>
            <h2 className="display text-center">How it works</h2>
            <p className="lead mt-5 text-center text-ink-soft">
              Four simple steps from sign-up to your first sale.
            </p>
          </Reveal>
          <Stagger className="mt-14 space-y-6">
            {STEPS.map((step) => (
              <Item key={step.num} className="flex items-start gap-5 rounded-2xl border border-rule bg-white p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-midnight text-sm font-bold text-gold">
                  {step.num}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-midnight">{step.title}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{step.desc}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container max-w-[640px] text-center">
          <Reveal>
            <h2 className="display">Ready to join?</h2>
            <p className="lead mt-5 text-ink-soft">
              Create your free account in under two minutes. No credit card required to get started.
            </p>
            <div className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a href={CRM_JOIN_URL} className="btn btn-primary inline-flex">
                Create account <ArrowRight size={16} />
              </a>
              <Link href="/careers" className="btn btn-ghost inline-flex">
                Learn more about careers
              </Link>
            </div>
            <p className="mt-6 text-sm text-ink-soft">
              Already have an invite link? <a href="https://crm.nxtfinancialgroup.com/auth/login" className="font-medium text-midnight underline">Sign in here</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  )
}
