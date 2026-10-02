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
  Lock,
  Eye,
  ShieldCheck,
  Star,
  Check,
  ChevronRight,
} from 'lucide-react'
import { Reveal, Stagger, Item, Counter } from '@/components/motion'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Layers,
    color: '#4F46E5',
    bg: '#EEF2FF',
    title: 'AI Spend Tracking',
    desc: 'Auto-categorizes every transaction across all accounts in real time. Zero manual tagging, ever.',
    stat: '$2,962',
    statLabel: 'tracked this month',
  },
  {
    icon: CreditCard,
    color: '#059669',
    bg: '#ECFDF5',
    title: 'Subscription Manager',
    desc: 'Find and cancel wasteful subscriptions in one tap. Average user saves $312/year in week one.',
    stat: '$312',
    statLabel: 'per month recovered',
  },
  {
    icon: DollarSign,
    color: '#D97706',
    bg: '#FFFBEB',
    title: 'Debt Payoff Planner',
    desc: 'Avalanche or snowball — our engine builds the optimal payoff strategy and tracks progress daily.',
    stat: '74%',
    statLabel: 'paid off today',
  },
  {
    icon: TrendingUp,
    color: '#7C3AED',
    bg: '#F5F3FF',
    title: 'Wealth Builder',
    desc: 'Set savings goals, track net worth in real time, and receive personalized investment nudges.',
    stat: '$127K',
    statLabel: 'avg net worth tracked',
  },
  {
    icon: PhoneCall,
    color: '#0284C7',
    bg: '#F0F9FF',
    title: 'Bill Negotiation',
    desc: 'AI agents call providers on your behalf to lower cable, insurance, and utility bills — automatically.',
    stat: '$840',
    statLabel: 'saved per year',
  },
  {
    icon: Shield,
    color: '#0F766E',
    bg: '#F0FDFA',
    title: 'Financial Health Score',
    desc: 'A real-time 0\u2013850 score with actionable steps — like a credit score for your whole financial life.',
    stat: '782',
    statLabel: 'avg user score',
  },
]

const STEPS = [
  { icon: Link2, color: '#4F46E5', title: 'Connect your accounts', desc: 'Securely link bank accounts, cards, loans, and investments via Plaid — 12,000+ institutions, 90-second setup.' },
  { icon: Cpu, color: '#7C3AED', title: 'AI analyzes everything', desc: 'Our models surface hidden money leaks, optimization opportunities, and risks instantly across your full picture.' },
  { icon: Zap, color: '#059669', title: 'Take action, build wealth', desc: 'Follow one-tap personalized recommendations to save more, pay less, and grow your net worth month over month.' },
]

const TESTIMONIALS = [
  { name: 'Sarah Chen', role: 'Marketing Manager, Austin TX', quote: 'FutureFlow found $420 in forgotten subscriptions and saved another $60/month on my internet bill. It paid for itself in the first week.', color: '#4F46E5' },
  { name: 'Marcus Rivera', role: 'Software Engineer, Chicago IL', quote: 'I paid off $28,000 in student loans 14 months ahead of schedule using FutureFlow\u2019s payoff plan. This app genuinely changed my financial life.', color: '#059669' },
  { name: 'Aisha Johnson', role: 'Nurse Practitioner, Atlanta GA', quote: 'Finally a finance app that doesn\u2019t feel like filing taxes. My Health Score went from 620 to 781 in just 8 months.', color: '#D97706' },
  { name: 'David Park', role: 'Small Business Owner, NYC', quote: 'FutureFlow negotiated my cable bill from $220 down to $89 while I was asleep. I honestly don\u2019t know how I managed money before this.', color: '#7C3AED' },
  { name: 'Priya Nair', role: 'Grad Student, Boston MA', quote: 'On a student budget this is a lifesaver. The AI categorizes everything automatically and the budgets actually stick because they\u2019re realistic.', color: '#0284C7' },
]

const PLANS = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Essential tools to get started.',
    cta: 'Get Started Free',
    accent: '#6b78ff',
    features: ['Spending analytics', 'Auto categorization', 'Up to 2 connected accounts', 'Monthly budget overview', 'Basic savings goals'],
  },
  {
    name: 'Pro',
    price: '$14.99',
    desc: 'The complete FutureFlow experience.',
    cta: 'Start 30-Day Free Trial',
    accent: '#4353ff',
    popular: true,
    features: ['Everything in Free', 'Unlimited accounts', 'AI subscription manager', 'Debt payoff planner', 'Cash flow forecasting', 'Credit score monitor', 'Net worth tracker', 'Autonomous tax engine', 'Bill negotiation AI', 'Priority support'],
  },
  {
    name: 'Household',
    price: '$19.99',
    desc: 'Built for two. Share as a family.',
    cta: 'Start 30-Day Free Trial',
    accent: '#10b981',
    features: ['Everything in Pro', '2-user family access', 'Shared goals & budgets', 'Combined net worth view', 'Family spending insights'],
  },
]

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function DashboardMockup() {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Browser chrome */}
      <div className="rounded-t-2xl border border-white/10 bg-[#141418] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <div className="ml-4 flex-1 rounded-lg bg-white/5 px-4 py-1.5 text-xs text-[#9a9a9a]">app.futureflow.io/dashboard</div>
        </div>
      </div>

      {/* Dashboard body */}
      <div className="rounded-b-2xl border border-t-0 border-white/10 bg-[#0c0c0f] p-5 md:p-8">
        {/* Top stat cards */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {[
            { label: 'Net Worth', value: '$127,430', change: '+$3,200', up: true, color: '#4353ff' },
            { label: 'Monthly Spend', value: '$3,842', change: '$310 saved', up: true, color: '#10b981' },
            { label: 'Savings Goal', value: '68%', change: 'Emergency fund', up: true, color: '#f69c20' },
            { label: 'Health Score', value: '782', change: '+12 pts', up: true, color: '#7C3AED' },
          ].map((card) => (
            <div key={card.label} className="rounded-xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-[11px] font-medium text-[#9a9a9a]">{card.label}</p>
              <p className="mt-1 text-xl font-extrabold text-white md:text-2xl">{card.value}</p>
              <p className="mt-1 text-[11px] font-semibold" style={{ color: card.color }}>{card.up ? '\u2191 ' : ''}{card.change}</p>
            </div>
          ))}
        </div>

        {/* Chart area */}
        <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-white">Spending Overview</p>
            <div className="flex gap-1.5">
              {['Overview', 'Spending', 'Debts'].map((tab, i) => (
                <span key={tab} className={`rounded-full px-3 py-1 text-[11px] font-medium ${i === 0 ? 'bg-[#4353ff] text-white' : 'text-[#9a9a9a]'}`}>{tab}</span>
              ))}
            </div>
          </div>
          <div className="flex items-end gap-2 md:gap-3" style={{ height: 120 }}>
            {[
              { month: 'Nov', h: 52 },
              { month: 'Dec', h: 68 },
              { month: 'Jan', h: 42 },
              { month: 'Feb', h: 85 },
              { month: 'Mar', h: 60 },
              { month: 'Apr', h: 95, active: true },
            ].map((bar) => (
              <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-lg transition-all" style={{ height: `${bar.h}%`, background: bar.active ? '#4353ff' : 'rgba(67,83,255,0.15)' }} />
                <span className={`text-[10px] ${bar.active ? 'font-bold text-[#4353ff]' : 'text-[#9a9a9a]'}`}>{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.03] p-5">
          <p className="mb-3 text-sm font-semibold text-white">Recent Transactions</p>
          <div className="space-y-3">
            {[
              { name: 'Netflix', amount: '-$22.99', color: '#fb7185' },
              { name: 'Salary Deposit', amount: '+$5,200', color: '#10b981' },
              { name: 'Whole Foods', amount: '-$84.32', color: '#f69c20' },
              { name: 'Bill Savings', amount: '+$63.00', color: '#4353ff' },
            ].map((tx) => (
              <div key={tx.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full" style={{ background: tx.color }} />
                  <span className="text-sm text-[#e0e0e0]">{tx.name}</span>
                </div>
                <span className="text-sm font-semibold" style={{ color: tx.color }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ feature, isActive, onClick }: { feature: typeof FEATURES[0]; isActive: boolean; onClick: () => void }) {
  const Icon = feature.icon
  return (
    <motion.button
      onClick={onClick}
      className={`group w-full rounded-2xl border p-6 text-left transition-all ${isActive ? 'border-[#4353ff]/40 bg-white/[0.06]' : 'border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: `${feature.color}20` }}>
          <Icon size={22} style={{ color: feature.color }} />
        </div>
        {isActive && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full bg-[#4353ff]/15 px-3 py-1 text-[11px] font-bold text-[#6b78ff]">
            Active
          </motion.div>
        )}
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-white">{feature.title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-[#9a9a9a]">{feature.desc}</p>
      {isActive && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 border-t border-white/8 pt-4">
          <p className="text-2xl font-extrabold text-white">{feature.stat}</p>
          <p className="text-xs text-[#9a9a9a]">{feature.statLabel}</p>
        </motion.div>
      )}
    </motion.button>
  )
}

/* ------------------------------------------------------------------ */
/*  Main section                                                       */
/* ------------------------------------------------------------------ */

export default function FutureFlowSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <>
      {/* ── Intro ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden" style={{ background: 'linear-gradient(160deg, #0c0c0f 0%, #0e1033 35%, #1a1050 60%, #0c0c0f 100%)' }}>
        <div className="pointer-events-none absolute left-1/2 top-0 h-[700px] w-[1000px] -translate-x-1/2 rounded-full opacity-25 blur-[140px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[700px] rounded-full opacity-15 blur-[120px]" style={{ background: 'radial-gradient(circle, #d5c9f8 0%, transparent 70%)' }} />
        <div className="pointer-events-none absolute left-0 top-1/2 h-[400px] w-[400px] rounded-full opacity-10 blur-[100px]" style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }} />

        <div className="container relative py-28 md:py-36">
          {/* Logo + Badge */}
          <Reveal className="text-center">
            <Image src="/images/futureflow.png" alt="FutureFlow" width={480} height={320} className="mx-auto -mb-4 h-36 w-auto md:-mb-6 md:h-48" />
            <span className="inline-block rounded-full border border-[#4353ff]/30 bg-[#4353ff]/10 px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">
              From the NXT Family
            </span>
          </Reveal>

          {/* Headline */}
          <Reveal className="mx-auto mt-10 max-w-4xl text-center">
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.08] tracking-tight text-white">
              Your entire financial life.<br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#6b78ff] to-[#d5c9f8] bg-clip-text text-transparent">One intelligent app.</span>
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-[#9a9a9a]">
              FutureFlow replaces 4&ndash;6 separate finance apps with one AI-powered platform &mdash; tracking spending, crushing debt, managing subscriptions, filing taxes, and connecting you to a licensed NXT advisor when the stakes are high.
            </p>
          </Reveal>

          {/* Trust bar */}
          <Reveal className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-[13px] text-[#9a9a9a]">
            <span className="flex items-center gap-1.5"><Lock size={13} className="text-[#10b981]" /> 256-bit encrypted</span>
            <span className="flex items-center gap-1.5"><Eye size={13} className="text-[#10b981]" /> Read-only access</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-[#10b981]" /> SOC 2 compliant</span>
          </Reveal>

          {/* Stat counters */}
          <Reveal className="mx-auto mt-16 max-w-3xl">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { value: 500, suffix: 'K+', label: 'Active users' },
                { value: 18, suffix: 'M+', label: 'Saved for users' },
                { value: 12, suffix: 'K+', label: 'Institutions' },
                { value: 4.8, suffix: '\u2605', label: 'App Store' },
              ].map(({ value, suffix, label }) => (
                <div key={label} className="text-center">
                  <p className="font-display text-3xl font-black text-white md:text-4xl">
                    {suffix === '\u2605' ? (
                      <>{value}<span className="text-[#f69c20]">{suffix}</span></>
                    ) : (
                      <><Counter value={value} className="font-display" /><span className="text-[#6b78ff]">{suffix}</span></>
                    )}
                  </p>
                  <p className="mt-1 text-sm text-[#9a9a9a]">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Dashboard Preview ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0c0c0f] pb-28 md:pb-36">
        <div className="container">
          <Reveal className="mb-14 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">Live Dashboard</p>
            <h3 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              Everything at a glance. Nothing hidden.
            </h3>
          </Reveal>
          <Reveal>
            <DashboardMockup />
          </Reveal>
        </div>
      </section>

      {/* ── Features Deep Dive ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08080c] py-28 md:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full opacity-10 blur-[120px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />

        <div className="container relative">
          <Reveal className="mb-16 max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">6 Powerful Tools</p>
            <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              Everything you need. Nothing&nbsp;you&nbsp;don&rsquo;t.
            </h3>
            <p className="mt-5 text-lg text-[#9a9a9a]">Click any card to see it in detail.</p>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} isActive={activeFeature === i} onClick={() => setActiveFeature(i)} />
            ))}
          </div>

          {/* Expanded detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
              className="mx-auto mt-10 max-w-3xl rounded-2xl border border-[#4353ff]/20 bg-gradient-to-br from-[#4353ff]/8 to-transparent p-8 md:p-10"
            >
              <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl" style={{ background: `${FEATURES[activeFeature].color}20` }}>
                  {(() => { const Icon = FEATURES[activeFeature].icon; return <Icon size={36} style={{ color: FEATURES[activeFeature].color }} /> })()}
                </div>
                <div>
                  <h4 className="font-display text-2xl font-bold text-white">{FEATURES[activeFeature].title}</h4>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#9a9a9a]">{FEATURES[activeFeature].desc}</p>
                  <div className="mt-4 inline-flex items-center gap-3 rounded-xl bg-white/5 px-5 py-3">
                    <span className="text-2xl font-extrabold text-white">{FEATURES[activeFeature].stat}</span>
                    <span className="text-sm text-[#9a9a9a]">{FEATURES[activeFeature].statLabel}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0c0c0f] py-28 md:py-36">
        <div className="container">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">How It Works</p>
            <h3 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              Up and running in under 5&nbsp;minutes.
            </h3>
          </Reveal>

          <Stagger as="div" className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <Item as="div" key={step.title}>
                  <div className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 text-center">
                    {/* Step number */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full border-4 border-[#0c0c0f] bg-[#4353ff] px-3.5 py-1 font-display text-sm font-black text-white">
                      {i + 1}
                    </div>
                    <div className="mx-auto mt-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: `${step.color}15` }}>
                      <Icon size={28} style={{ color: step.color }} />
                    </div>
                    <h4 className="mt-5 font-display text-lg font-bold text-white">{step.title}</h4>
                    <p className="mt-3 text-[14px] leading-relaxed text-[#9a9a9a]">{step.desc}</p>
                  </div>
                </Item>
              )
            })}
          </Stagger>

          {/* Connector line (desktop) */}
          <div className="mx-auto mt-0 hidden max-w-4xl md:block">
            <div className="relative h-0.5 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#059669] opacity-30" style={{ top: '-50%' }} />
          </div>
        </div>
      </section>

      {/* ── Subscription Spotlight ─────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08080c] py-28 md:py-36">
        <div className="pointer-events-none absolute left-0 bottom-0 h-[400px] w-[600px] rounded-full opacity-12 blur-[120px]" style={{ background: 'radial-gradient(circle, #fb7185 0%, transparent 70%)' }} />

        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <span className="mb-4 inline-block rounded-full bg-[#fb7185]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#fb7185]">
                Exclusive Feature
              </span>
              <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
                We found <span className="text-[#fb7185]">$312/mo</span> you forgot you&nbsp;were&nbsp;paying.
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-[#9a9a9a]">
                FutureFlow is the only app that scans both your bank transactions AND your email inbox to surface every single recurring charge &mdash; including the ones that stopped showing up in your bank feed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Scans bank transactions + email receipts simultaneously',
                  'One-tap cancellation for any subscription, any provider',
                  'Free trial alerts before they charge your card',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-[#e0e0e0]">
                    <Check size={18} className="mt-0.5 shrink-0 text-[#10b981]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Subscription Radar</p>
                  <span className="rounded-full bg-[#10b981]/15 px-3 py-1 text-[11px] font-bold text-[#10b981]">Scanned 847 txns + 2,340 emails</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Netflix', price: '$17.99', action: 'Cancel', color: '#fb7185' },
                    { name: 'Adobe CC', price: '$59.99', action: 'Cancel', color: '#fb7185' },
                    { name: 'Spotify', price: '$9.99', action: 'Keep', color: '#10b981' },
                    { name: 'Peloton', price: '$44.00', action: 'Cancel', color: '#fb7185' },
                    { name: 'Hulu', price: '$7.99', action: 'Keep', color: '#10b981' },
                    { name: 'Notion', price: '$16.00', action: 'Cancel', color: '#fb7185' },
                    { name: 'LinkedIn Premium', price: '$39.99', action: 'Cancel', color: '#fb7185' },
                    { name: 'Duolingo', price: '$6.99', action: 'Keep', color: '#10b981' },
                  ].map((sub) => (
                    <div key={sub.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-4 py-3">
                      <div>
                        <span className="text-sm font-medium text-white">{sub.name}</span>
                        <span className="ml-2 text-sm text-[#9a9a9a]">{sub.price}</span>
                      </div>
                      <span className="rounded-full px-3 py-0.5 text-[11px] font-bold" style={{ background: `${sub.color}15`, color: sub.color }}>
                        {sub.action}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#fb7185]/10 px-4 py-3">
                  <span className="text-sm font-medium text-[#fb7185]">Potential monthly savings</span>
                  <span className="text-lg font-extrabold text-white">$121.98</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Tax Engine Spotlight ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0c0c0f] py-28 md:py-36">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[600px] rounded-full opacity-12 blur-[120px]" style={{ background: 'radial-gradient(circle, #f69c20 0%, transparent 70%)' }} />

        <div className="container relative">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal delay={0.15} className="order-2 lg:order-1">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">Tax Deductions Found</p>
                  <span className="rounded-full bg-[#f69c20]/15 px-3 py-1 text-[11px] font-bold text-[#f69c20]">USA &amp; Canada</span>
                </div>
                <div className="space-y-4">
                  {[
                    { name: 'Home Office', amount: '$3,240', pct: 78 },
                    { name: 'Business Travel', amount: '$1,870', pct: 62 },
                    { name: 'Professional Dev', amount: '$840', pct: 44 },
                    { name: 'Software & Tools', amount: '$420', pct: 28 },
                    { name: 'Phone (business %)', amount: '$360', pct: 22 },
                    { name: 'Mileage', amount: '$780', pct: 48 },
                  ].map((ded) => (
                    <div key={ded.name}>
                      <div className="mb-1.5 flex items-center justify-between">
                        <span className="text-sm text-[#e0e0e0]">{ded.name}</span>
                        <span className="text-sm font-bold text-white">{ded.amount}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#f69c20] to-[#f69c20]/60" style={{ width: `${ded.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between rounded-xl bg-[#10b981]/10 px-4 py-3">
                  <span className="text-sm font-medium text-[#10b981]">Estimated tax savings</span>
                  <span className="text-lg font-extrabold text-white">$1,593</span>
                </div>
              </div>
            </Reveal>

            <Reveal className="order-1 lg:order-2">
              <span className="mb-4 inline-block rounded-full bg-[#f69c20]/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#f69c20]">
                Exclusive Feature
              </span>
              <h3 className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
                Tax season ends before it&nbsp;begins.
              </h3>
              <p className="mt-5 text-lg leading-relaxed text-[#9a9a9a]">
                Our Autonomous Tax Engine silently tracks every deductible expense year-round across the USA &amp; Canada. When April arrives, your return is practically already filed.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Auto-detects deductible expenses from every transaction',
                  'Tax guidance for USA & Canada',
                  'Year-round tracking means no scramble at tax time',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] text-[#e0e0e0]">
                    <Check size={18} className="mt-0.5 shrink-0 text-[#10b981]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#08080c] py-28 md:py-36">
        <div className="container">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">Testimonials</p>
            <h3 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              500,000 people can&rsquo;t be wrong.
            </h3>
          </Reveal>

          <Stagger as="div" className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <Item as="div" key={t.name}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#f69c20] text-[#f69c20]" />
                    ))}
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#e0e0e0]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white" style={{ background: t.color }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#9a9a9a]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>

          {/* Second row — 2 cards centered */}
          <Stagger as="div" className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-5 md:grid-cols-2">
            {TESTIMONIALS.slice(3).map((t) => (
              <Item as="div" key={t.name}>
                <div className="h-full rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <div className="mb-4 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#f69c20] text-[#f69c20]" />
                    ))}
                  </div>
                  <p className="text-[15px] leading-relaxed text-[#e0e0e0]">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white" style={{ background: t.color }}>
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-[#9a9a9a]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0c0c0f] py-28 md:py-36">
        <div className="container">
          <Reveal className="mb-16 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#6b78ff]">Pricing</p>
            <h3 className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.1] text-white">
              Plans that pay for themselves.
            </h3>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#9a9a9a]">
              Average Pro user saves over $1,200/year. At $14.99/month, the math writes itself.
            </p>
          </Reveal>

          <Stagger as="div" className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => (
              <Item as="div" key={plan.name}>
                <div className={`relative h-full rounded-2xl border p-7 ${plan.popular ? 'border-[#4353ff]/40 bg-gradient-to-b from-[#4353ff]/8 to-transparent' : 'border-white/8 bg-white/[0.03]'}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4353ff] px-4 py-1 text-[11px] font-bold text-white">
                      Most Popular
                    </div>
                  )}
                  <h4 className="font-display text-xl font-bold text-white">{plan.name}</h4>
                  <div className="mt-3">
                    <span className="font-display text-4xl font-black text-white">{plan.price}</span>
                    <span className="text-sm text-[#9a9a9a]">/month</span>
                  </div>
                  <p className="mt-2 text-sm text-[#9a9a9a]">{plan.desc}</p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-[14px] text-[#e0e0e0]">
                        <Check size={15} className="mt-0.5 shrink-0" style={{ color: plan.accent }} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://apps.apple.com/us/app/futureflow-personal-finance/id6777159204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all hover:scale-[1.02] ${plan.popular ? 'text-white' : 'border border-white/15 text-white hover:bg-white/5'}`}
                    style={plan.popular ? { background: `linear-gradient(135deg, ${plan.accent}, #6b78ff)` } : undefined}
                  >
                    {plan.cta} <ChevronRight size={14} />
                  </a>
                </div>
              </Item>
            ))}
          </Stagger>

          <Reveal className="mt-8 text-center">
            <p className="text-sm text-[#9a9a9a]">
              Save 10% with annual billing &mdash; Pro for just $13.49/month. All plans include a 30-day free trial. Cancel anytime.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden py-28 md:py-36" style={{ background: 'linear-gradient(160deg, #0e1033 0%, #1a1050 50%, #0c0c0f 100%)' }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[140px]" style={{ background: 'radial-gradient(circle, #4353ff 0%, transparent 70%)' }} />

        <div className="container relative text-center">
          <Reveal>
            <Image src="/images/futureflow.png" alt="FutureFlow" width={360} height={240} className="mx-auto -mb-2 h-28 w-auto md:-mb-4 md:h-36" />
            <h3 className="mx-auto max-w-3xl font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-[1.1] text-white">
              Stop juggling apps.<br />Start building wealth.
            </h3>
            <p className="mx-auto mt-5 max-w-xl text-lg text-[#9a9a9a]">
              Download FutureFlow free on the App Store. Connect your accounts in 90 seconds. Let AI handle the rest.
            </p>
            <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row sm:justify-center">
              <a href="https://apps.apple.com/us/app/futureflow-personal-finance/id6777159204" target="_blank" rel="noopener noreferrer">
                <Image src="/images/app-store-badge.png" alt="Download on the App Store" width={180} height={60} className="h-14 w-auto" />
              </a>
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
