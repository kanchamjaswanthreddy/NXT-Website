import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Smartphone, Brain, CreditCard, PiggyBank, ShieldCheck, TrendingUp } from 'lucide-react'
import PageHero from '@/components/PageHero'
import SolutionsIndex from '@/components/SolutionsIndex'
import { Reveal, Stagger, Item } from '@/components/motion'

export const metadata: Metadata = {
  title: 'Insurance Solutions — 6 Disciplines + FutureFlow',
  description: 'Annuities, life insurance, care planning, Medicare planning, disability income, home & auto insurance, and FutureFlow — AI-powered personal finance. Six disciplines, 70+ carriers, one IMO.',
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/solutions' },
}

const FUTUREFLOW_FEATURES = [
  { icon: Brain, title: 'AI Spend Tracking', desc: 'Every transaction auto-categorized. Zero manual tagging. See exactly where your money goes.' },
  { icon: CreditCard, title: 'Subscription Manager', desc: 'Finds every recurring charge across your bank and email. Cancel waste in one tap.' },
  { icon: PiggyBank, title: 'Debt Payoff Planner', desc: 'Avalanche or snowball — pick your strategy. AI optimizes the fastest path to zero.' },
  { icon: ShieldCheck, title: 'Free Trial Radar', desc: 'Alerts you before any free trial converts to a paid subscription. Never get surprise-billed.' },
  { icon: TrendingUp, title: 'Cash Flow Forecasting', desc: '30-day AI predictions. Know about cash flow dips before they happen.' },
  { icon: Smartphone, title: 'One-Tap Advisor Access', desc: 'AI handles the day-to-day. A licensed NXT advisor is one tap away when it matters.' },
]

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Six disciplines that protect what matters. One place to plan them all."
        intro="From retirement income to your front door — we cover the decisions that shape your financial life, and we do them for a living."
      />

      <section className="section pt-0">
        <div className="container">
          <Reveal>
            <SolutionsIndex />
          </Reveal>
        </div>
      </section>

      {/* FutureFlow Section */}
      <section className="relative isolate overflow-hidden" style={{ background: 'linear-gradient(145deg, #0c0c0f 0%, #0e1033 40%, #1a1050 65%, #0c0c0f 100%)' }}>
        {/* Ambient glows */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full opacity-15 blur-[100px]" style={{ background: 'radial-gradient(circle, #d5c9f8 0%, transparent 70%)' }} />

        <div className="container relative py-28 md:py-40">
          {/* Header */}
          <Reveal className="mb-6 text-center">
            <Image src="/images/futureflow.png" alt="FutureFlow" width={480} height={320} className="mx-auto -mb-6 h-40 w-auto md:-mb-8 md:h-52" />
            <span className="inline-block rounded-full border border-[#4353ff]/30 bg-[#4353ff]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">
              From the NXT Family
            </span>
          </Reveal>

          <Reveal className="mx-auto mb-20 max-w-3xl text-center">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.1] tracking-tight text-white">
              Your entire financial life. One&nbsp;app.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[#9a9a9a]">
              FutureFlow replaces 4&#8211;6 separate finance apps with one AI-powered platform — tracking spending, crushing debt, managing subscriptions, and connecting you to a licensed NXT advisor when the stakes are high.
            </p>
          </Reveal>

          {/* Feature grid */}
          <Stagger as="div" className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FUTUREFLOW_FEATURES.map(({ icon: Icon, title, desc }) => (
              <Item as="div" key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-[#4353ff]/30 hover:bg-white/[0.06]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#4353ff]/15">
                  <Icon size={20} className="text-[#6b78ff]" />
                </div>
                <h3 className="font-display text-[17px] font-bold text-white">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#9a9a9a]">{desc}</p>
              </Item>
            ))}
          </Stagger>

          {/* Stats + CTA */}
          <Reveal className="mt-20">
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-12 md:grid-cols-4">
              {[
                ['12+', 'Financial tools in one app'],
                ['50', 'States covered'],
                ['24/7', 'AI monitoring'],
                ['1-Tap', 'Licensed advisor access'],
              ].map(([stat, label]) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-black text-[#4353ff] md:text-4xl">{stat}</p>
                  <p className="mt-1 text-sm text-[#9a9a9a]">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-14 text-center">
              <a
                href="https://joinfutureflow.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-sm font-bold text-white transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #4353ff, #6b78ff)' }}
              >
                Explore FutureFlow <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
