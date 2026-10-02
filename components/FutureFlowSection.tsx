'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  Layers,
  CreditCard,
  DollarSign,
  TrendingUp,
  PhoneCall,
  Shield,
  Link2,
  Cpu,
  Zap,
  Check,
  Star,
  ChevronRight,
} from 'lucide-react'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Layers,
    title: 'AI Spend Tracking',
    desc: 'Every transaction auto-categorized across all accounts in real time. Zero manual tagging.',
    stat: '$2,962',
    statLabel: 'tracked this month',
  },
  {
    icon: CreditCard,
    title: 'Subscription Manager',
    desc: 'Finds and cancels wasteful subscriptions in one tap. Average user recovers $312 in year one.',
    stat: '$312',
    statLabel: 'per month recovered',
  },
  {
    icon: DollarSign,
    title: 'Debt Payoff Planner',
    desc: 'Avalanche or snowball — our engine builds the optimal payoff strategy and tracks progress daily.',
    stat: '2.4 yrs',
    statLabel: 'faster than min payments',
  },
  {
    icon: TrendingUp,
    title: 'Wealth Builder',
    desc: 'Set savings goals, track net worth in real time, and receive personalized investment nudges.',
    stat: '$127K',
    statLabel: 'avg net worth tracked',
  },
  {
    icon: PhoneCall,
    title: 'Bill Negotiation',
    desc: 'AI agents call your providers to lower cable, insurance, and utility bills — automatically.',
    stat: '$840',
    statLabel: 'saved per year',
  },
  {
    icon: Shield,
    title: 'Financial Health Score',
    desc: 'A real-time 0–850 score with actionable steps — like a credit score for your whole financial life.',
    stat: '782',
    statLabel: 'avg user score',
  },
]

const STEPS = [
  { icon: Link2, title: 'Connect your accounts', desc: 'Securely link bank accounts, cards, loans, and investments via Plaid — 12,000+ institutions, 90-second setup.' },
  { icon: Cpu, title: 'AI analyzes everything', desc: 'Our models surface hidden money leaks, optimization opportunities, and risks across your full picture.' },
  { icon: Zap, title: 'Take action, build wealth', desc: 'Follow one-tap personalized recommendations to save more, pay less, and grow net worth every month.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Marketing Manager, Austin TX', quote: 'FutureFlow found $420 in forgotten subscriptions and saved another $60/month on my internet bill. It paid for itself in the first week.' },
  { name: 'Marcus Rivera', role: 'Software Engineer, Chicago IL', quote: 'I paid off $28,000 in student loans 14 months ahead of schedule using FutureFlow\u2019s payoff plan. This app genuinely changed my financial life.' },
  { name: 'Aisha Johnson', role: 'Nurse Practitioner, Atlanta GA', quote: 'Finally a finance app that doesn\u2019t feel like filing taxes. My Health Score went from 620 to 781 in just 8 months.' },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Essential tools to get started.',
    cta: 'Get Started Free',
    features: ['Spending analytics', 'Auto categorization', 'Up to 2 connected accounts', 'Monthly budget overview', 'Basic savings goals'],
  },
  {
    name: 'Pro',
    price: '$14.99',
    desc: 'The complete FutureFlow experience.',
    cta: 'Start Free Trial',
    popular: true,
    features: ['Everything in Free', 'Unlimited accounts', 'AI subscription manager', 'Debt payoff planner', 'Cash flow forecasting', 'Credit score monitor', 'Net worth tracker', 'Autonomous tax engine', 'Bill negotiation AI'],
  },
  {
    name: 'Household',
    price: '$19.99',
    desc: 'Same as Pro — built for two.',
    cta: 'Start Free Trial',
    features: ['Everything in Pro', '2-user family access', 'Shared goals & budgets', 'Combined net worth view', 'Family spending insights'],
  },
]

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function FutureFlowSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <section className="section relative isolate overflow-hidden bg-navy on-dark">
        {/* Ambient texture */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[140px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />

        <div className="container relative text-center">
          <Reveal>
            <Image src="/images/futureflow.png" alt="FutureFlow" width={480} height={320} className="mx-auto -mb-4 h-32 w-auto md:-mb-6 md:h-44" priority />
          </Reveal>
          <Reveal>
            <p className="label-sm mb-8">From the NXT Family</p>
            <h2 className="display-xl mx-auto max-w-4xl">
              Your entire financial life.{' '}
              <span className="text-sunrise">One intelligent app.</span>
            </h2>
            <p className="lead mx-auto mt-6 max-w-2xl text-platinum">
              FutureFlow replaces 4–6 separate finance apps with one AI-powered platform — tracking spending, crushing debt, managing subscriptions, and connecting you to a licensed NXT advisor when the stakes are high.
            </p>
          </Reveal>

          {/* Stats */}
          <Stagger as="ul" className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-10 md:grid-cols-4">
            {([
              [500, 'K+', 'Active users'],
              [18, 'M+', 'Saved for users'],
              [12, 'K+', 'Institutions'],
            ] as const).map(([v, suf, label]) => (
              <Item as="li" key={label} className="text-center">
                <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                  <Counter value={v} /><span className="text-gold">{suf}</span>
                </p>
                <p className="mt-1 text-sm text-platinum">{label}</p>
              </Item>
            ))}
            <Item as="li" className="text-center">
              <p className="font-display text-4xl font-semibold text-white md:text-5xl">
                4.8<span className="text-gold">{'\u2605'}</span>
              </p>
              <p className="mt-1 text-sm text-platinum">App Store</p>
            </Item>
          </Stagger>
        </div>
      </section>

      {/* ── 2. Dashboard Preview ──────────────────────────────── */}
      <section className="section relative overflow-hidden bg-midnight on-dark">
        <div className="container">
          <Reveal className="mb-14 max-w-[600px]">
            <p className="kicker mb-4">Live Dashboard</p>
            <h3 className="display">Everything at a glance. Nothing&nbsp;hidden.</h3>
          </Reveal>

          <Reveal>
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[20px] border border-white/10 shadow-lift">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 bg-white/[0.06] px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex-1 rounded-lg bg-white/[0.06] px-4 py-1.5 text-xs text-platinum">app.futureflow.io/dashboard</div>
              </div>

              {/* Dashboard body */}
              <div className="bg-midnight p-5 md:p-8">
                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                  {[
                    { label: 'Net Worth', value: '$127,430', badge: '+$3,200', color: 'text-[#4353ff]' },
                    { label: 'Monthly Spend', value: '$3,842', badge: '$310 saved', color: 'text-success' },
                    { label: 'Savings Goal', value: '68%', badge: 'Emergency fund', color: 'text-sunrise' },
                    { label: 'Health Score', value: '782', badge: '+12 pts', color: 'text-[#7C3AED]' },
                  ].map((c) => (
                    <div key={c.label} className="glass rounded-xl p-4">
                      <p className="text-[11px] font-medium text-silver">{c.label}</p>
                      <p className="mt-1 font-display text-xl font-semibold text-white md:text-2xl">{c.value}</p>
                      <p className={`mt-1 text-[11px] font-semibold ${c.color}`}>{'\u2191'} {c.badge}</p>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="glass mt-4 rounded-xl p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Spending Overview</p>
                    <div className="flex gap-1.5">
                      {['Overview', 'Spending', 'Debts'].map((tab, i) => (
                        <span key={tab} className={`rounded-full px-3 py-1 text-[11px] font-medium ${i === 0 ? 'bg-command text-white' : 'text-silver'}`}>{tab}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-end gap-2 md:gap-3" style={{ height: 110 }}>
                    {[
                      { m: 'Nov', h: 52 }, { m: 'Dec', h: 68 }, { m: 'Jan', h: 42 },
                      { m: 'Feb', h: 85 }, { m: 'Mar', h: 60 }, { m: 'Apr', h: 95, active: true },
                    ].map((bar) => (
                      <div key={bar.m} className="flex flex-1 flex-col items-center gap-2">
                        <div className="w-full rounded-md transition-all" style={{ height: `${bar.h}%`, background: bar.active ? '#4353ff' : 'rgba(67,83,255,0.15)' }} />
                        <span className={`text-[10px] ${bar.active ? 'font-bold text-[#4353ff]' : 'text-silver'}`}>{bar.m}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transactions */}
                <div className="glass mt-4 rounded-xl p-5">
                  <p className="mb-3 text-sm font-semibold text-white">Recent Transactions</p>
                  {[
                    { name: 'Netflix', amount: '-$22.99', cls: 'text-alert' },
                    { name: 'Salary Deposit', amount: '+$5,200', cls: 'text-success' },
                    { name: 'Whole Foods', amount: '-$84.32', cls: 'text-sunrise' },
                    { name: 'Bill Savings', amount: '+$63.00', cls: 'text-[#4353ff]' },
                  ].map((tx) => (
                    <div key={tx.name} className="flex items-center justify-between py-2">
                      <span className="text-sm text-platinum">{tx.name}</span>
                      <span className={`text-sm font-semibold ${tx.cls}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. Six Tools — Editorial List ─────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-14 max-w-[640px]">
            <p className="label-sm mb-5">Six powerful tools</p>
            <h3 className="display">Everything you need. Nothing&nbsp;you&nbsp;don&rsquo;t.</h3>
            <p className="lead mt-5 text-ink-soft">Tap any tool to see it in action.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
            {/* Left — List */}
            <ol className="hairline divide-y divide-platinum">
              {FEATURES.map((f, i) => {
                const Icon = f.icon
                const isActive = activeFeature === i
                return (
                  <li key={f.title}>
                    <button
                      onClick={() => setActiveFeature(i)}
                      className="group flex w-full items-start gap-5 py-7 text-left md:py-9"
                    >
                      <span className={`mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${isActive ? 'bg-navy text-white' : 'bg-stone text-navy'}`}>
                        <Icon size={20} />
                      </span>
                      <span className="flex-1">
                        <span className={`display-sm block transition-colors ${isActive ? 'text-navy' : 'text-ink'}`}>{f.title}</span>
                        <span className="mt-1 block text-[15px] leading-relaxed text-ink-soft">{f.desc}</span>
                      </span>
                      <span className={`mt-2 hidden shrink-0 rounded-full border px-3 py-0.5 text-xs font-semibold transition-all md:inline-block ${isActive ? 'border-navy bg-navy text-white' : 'border-platinum text-ink-soft'}`}>
                        {f.stat}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            {/* Right — Detail card (sticky) */}
            <div className="relative hidden lg:block lg:sticky lg:top-32 lg:self-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                  className="overflow-hidden rounded-[20px] border border-platinum bg-stone p-8"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
                    {(() => { const Icon = FEATURES[activeFeature].icon; return <Icon size={26} /> })()}
                  </div>
                  <h4 className="mt-6 font-display text-2xl font-semibold text-navy">{FEATURES[activeFeature].title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{FEATURES[activeFeature].desc}</p>
                  <div className="mt-8 rounded-2xl bg-white p-6 shadow-soft">
                    <p className="font-display text-4xl font-semibold text-navy">{FEATURES[activeFeature].stat}</p>
                    <p className="mt-1 text-sm text-ink-soft">{FEATURES[activeFeature].statLabel}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. How It Works ───────────────────────────────────── */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-14 text-center">
            <p className="label-sm mb-5">How it works</p>
            <h3 className="display mx-auto max-w-2xl">Up and running in under five&nbsp;minutes.</h3>
          </Reveal>

          <Stagger as="ol" className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Item as="li" key={step.title} className="relative text-center">
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div className="absolute right-0 top-10 hidden h-px w-8 translate-x-full bg-gold/30 md:block" />
                  )}
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-soft">
                    <Icon size={28} className="text-navy" />
                  </div>
                  <span className="numeral text-xl">{['I', 'II', 'III'][i]}</span>
                  <h4 className="mt-2 font-display text-xl font-semibold text-navy">{step.title}</h4>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{step.desc}</p>
                </Item>
              )
            })}
          </Stagger>
        </div>
      </section>

      {/* ── 5. Subscription Spotlight ─────────────────────────── */}
      <section className="section relative overflow-hidden">
        <div aria-hidden="true" className="glow -right-32 top-20 h-[400px] w-[400px] bg-sunrise/10" />
        <div className="container relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal>
            <p className="kicker mb-4">Subscription Radar</p>
            <h3 className="display">
              We found <span className="text-gold">$312/mo</span> you forgot you were&nbsp;paying.
            </h3>
            <p className="lead mt-5 text-ink-soft">
              FutureFlow is the only app that scans both your bank transactions AND your email inbox to surface every single recurring charge — including the ones that stopped showing up in your bank&nbsp;feed.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Scans bank transactions + email receipts simultaneously',
                'One-tap cancellation for any subscription, any provider',
                'Free trial alerts before they charge your card',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card rounded-[20px] p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-navy">Subscription Radar</p>
                <span className="rounded-full bg-stone px-3 py-1 text-[11px] font-semibold text-ink-soft">847 txns + 2,340 emails scanned</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Netflix', price: '$17.99', action: 'Cancel', bad: true },
                  { name: 'Adobe CC', price: '$59.99', action: 'Cancel', bad: true },
                  { name: 'Spotify', price: '$9.99', action: 'Keep', bad: false },
                  { name: 'Peloton', price: '$44.00', action: 'Cancel', bad: true },
                  { name: 'Hulu', price: '$7.99', action: 'Keep', bad: false },
                  { name: 'LinkedIn Premium', price: '$39.99', action: 'Cancel', bad: true },
                  { name: 'Duolingo', price: '$6.99', action: 'Keep', bad: false },
                ].map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between rounded-xl bg-stone px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${sub.bad ? 'bg-alert' : 'bg-success'}`} />
                      <span className="text-sm font-medium text-ink">{sub.name}</span>
                      <span className="text-sm text-ink-soft">{sub.price}</span>
                    </div>
                    <span className={`rounded-full px-3 py-0.5 text-[11px] font-bold ${sub.bad ? 'bg-alert/10 text-alert' : 'bg-success/10 text-success'}`}>
                      {sub.action}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between rounded-xl bg-navy px-5 py-4">
                <span className="text-sm font-semibold text-platinum">Potential monthly savings</span>
                <span className="font-display text-2xl font-semibold text-sunrise">$121.98</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. Tax Engine Spotlight ────────────────────────────── */}
      <section className="section bg-navy on-dark">
        <div className="container grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal>
            <div className="glass rounded-[20px] p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <p className="font-display text-lg font-semibold text-white">Tax Deductions Found</p>
                <span className="rounded-full bg-sunrise/15 px-3 py-1 text-[11px] font-bold text-sunrise">USA &amp; Canada</span>
              </div>
              <div className="space-y-5">
                {[
                  { name: 'Home Office', amount: '$3,240', pct: 78 },
                  { name: 'Business Travel', amount: '$1,870', pct: 62 },
                  { name: 'Professional Dev', amount: '$840', pct: 44 },
                  { name: 'Software & Tools', amount: '$420', pct: 28 },
                  { name: 'Mileage', amount: '$780', pct: 48 },
                ].map((ded) => (
                  <div key={ded.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm text-platinum">{ded.name}</span>
                      <span className="text-sm font-semibold text-white">{ded.amount}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-sunrise to-gold" style={{ width: `${ded.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl bg-white/[0.08] px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-platinum">Estimated tax savings</span>
                  <span className="font-display text-2xl font-semibold text-sunrise">$1,593</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="kicker mb-4">Autonomous Tax Engine</p>
            <h3 className="display">Tax season ends before it&nbsp;begins.</h3>
            <p className="lead mt-5 text-platinum">
              Our Autonomous Tax Engine silently tracks every deductible expense year-round across the USA &amp; Canada. When April arrives, your return is practically already filed.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Auto-detects deductible expenses from every transaction',
                'Tax guidance for USA & Canada',
                'Year-round tracking means no scramble at tax time',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-platinum">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Testimonials ───────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="mb-14 max-w-[600px]">
            <p className="label-sm mb-5">Testimonials</p>
            <h3 className="display">500,000 people can&rsquo;t be wrong.</h3>
          </Reveal>

          <Stagger as="div" className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Item as="div" key={t.name}>
                <div className="card card-hover h-full rounded-[20px] p-7">
                  <div className="mb-5 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="font-display text-lg font-semibold leading-[1.4] text-navy">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-6 flex items-center gap-3 border-t border-platinum pt-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-display text-sm font-semibold text-white">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">{t.name}</p>
                      <p className="text-xs text-ink-soft">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── 8. Pricing ────────────────────────────────────────── */}
      <section className="section bg-stone">
        <div className="container">
          <Reveal className="mb-14 text-center">
            <p className="label-sm mb-5">Pricing</p>
            <h3 className="display mx-auto max-w-2xl">Plans that pay for&nbsp;themselves.</h3>
            <p className="lead mx-auto mt-5 max-w-xl text-ink-soft">
              Average Pro user saves over $1,200/year. At $14.99/month, the math writes&nbsp;itself.
            </p>
          </Reveal>

          <Stagger as="div" className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Item as="div" key={plan.name}>
                <div className={`relative h-full rounded-[20px] p-7 ${plan.popular ? 'bg-navy text-white shadow-lift on-dark' : 'card'}`}>
                  {plan.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-[11px] font-bold text-midnight">
                      Most Popular
                    </span>
                  )}
                  <h4 className="font-display text-2xl font-semibold">{plan.name}</h4>
                  <div className="mt-3">
                    <span className="font-display text-4xl font-semibold">{plan.price}</span>
                    <span className={`text-sm ${plan.popular ? 'text-platinum' : 'text-ink-soft'}`}>/month</span>
                  </div>
                  <p className={`mt-2 text-sm ${plan.popular ? 'text-platinum' : 'text-ink-soft'}`}>{plan.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className={`flex items-start gap-2.5 text-[14px] ${plan.popular ? 'text-platinum' : 'text-ink-soft'}`}>
                        <Check size={15} className={`mt-0.5 shrink-0 ${plan.popular ? 'text-gold' : 'text-navy'}`} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://apps.apple.com/us/app/futureflow-personal-finance/id6777159204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all ${plan.popular ? 'bg-gold text-midnight hover:bg-sunrise' : 'border border-platinum text-navy hover:border-navy'}`}
                  >
                    {plan.cta} <ChevronRight size={14} />
                  </a>
                </div>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-10 text-center">
            <p className="text-sm text-ink-soft">
              Save 10% with annual billing — Pro for just $13.49/month. All plans include a 30-day free trial. Cancel&nbsp;anytime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 9. Final CTA ──────────────────────────────────────── */}
      <section className="section relative isolate overflow-hidden bg-navy on-dark">
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />

        <div className="container relative text-center">
          <Reveal>
            <Image src="/images/futureflow.png" alt="FutureFlow" width={360} height={240} className="mx-auto -mb-2 h-24 w-auto md:-mb-4 md:h-32" />
            <h3 className="display mx-auto max-w-3xl">Stop juggling apps. Start building&nbsp;wealth.</h3>
            <p className="lead mx-auto mt-5 max-w-xl text-platinum">
              Download FutureFlow free on the App Store. Connect your accounts in 90 seconds. Let AI handle the&nbsp;rest.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <a href="https://apps.apple.com/us/app/futureflow-personal-finance/id6777159204" target="_blank" rel="noopener noreferrer">
                <Image src="/images/app-store-badge.png" alt="Download on the App Store" width={180} height={60} className="h-14 w-auto" />
              </a>
              <a href="https://joinfutureflow.com" target="_blank" rel="noopener noreferrer" className="btn btn-cta">
                Explore FutureFlow <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
