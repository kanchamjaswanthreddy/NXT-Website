import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Stagger, Item, Reveal } from '@/components/motion'
import { articles, CATEGORIES } from '@/lib/nxt-life'
import NxtLifeFilter from '@/components/NxtLifeFilter'
import { Newspaper, TrendingUp, Users, Lightbulb } from 'lucide-react'

export const metadata: Metadata = {
  title: 'NXT Life — Corporate Editorial Publication',
  description: 'The official editorial and lifestyle publication of NXT Financial Group. Company announcements, industry trends, leadership insights, and the stories behind the people who protect families.',
  alternates: { canonical: 'https://www.nxtfinancialgroup.com/nxt-life' },
}

export default function NxtLifePage() {
  const featured = articles.find((a) => a.featured)!
  const rest = articles.filter((a) => a.slug !== featured.slug)

  return (
    <>
      {/* Masthead */}
      <section className="relative isolate overflow-hidden bg-stone">
        <div aria-hidden="true" className="glow -right-32 -top-32 h-[480px] w-[480px] bg-sunrise/20" />

        <div className="container pb-16 pt-32 md:pt-40 lg:pb-24">
          <Reveal>
            <p className="label-sm mb-8">Editorial</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="display-xl max-w-[900px] text-navy">
              NXT <span className="italic text-gold">Life</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mt-6 max-w-[640px] text-ink-soft">
              The official corporate editorial publication of NXT Financial Group — featuring
              company announcements, industry trends, and the stories behind the people who
              protect families every day.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6 max-w-[760px]">
              {[
                { icon: Newspaper, label: 'Company News', count: articles.filter((a) => a.category === 'Company News').length },
                { icon: TrendingUp, label: 'Industry Trends', count: articles.filter((a) => a.category === 'Industry Trends').length },
                { icon: Users, label: 'Culture & People', count: articles.filter((a) => a.category === 'Culture' || a.category === 'Leadership').length },
                { icon: Lightbulb, label: 'Innovation', count: articles.filter((a) => a.category === 'Innovation').length },
              ].map((stat) => (
                <div key={stat.label} className="card rounded-2xl px-5 py-6 text-center">
                  <stat.icon size={28} className="mx-auto mb-3 text-gold" />
                  <p className="text-4xl font-display font-bold text-navy">{stat.count}</p>
                  <p className="mt-2 text-sm font-medium text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured story */}
      <section className="section pb-0">
        <div className="container">
          <Reveal>
            <p className="kicker mb-6 text-sm tracking-wide uppercase">Featured Story</p>
          </Reveal>
          <Reveal delay={0.08}>
            <Link
              href={`/nxt-life/${featured.slug}`}
              className="card card-hover group grid grid-cols-1 overflow-hidden rounded-[24px] md:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-stone">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(min-width:768px) 55vw, 100vw"
                  className={`object-cover transition-transform duration-700 group-hover:scale-[1.03] ${featured.image.includes('/team/') ? 'object-top' : ''}`}
                  style={featured.image.includes('/team/') ? undefined : { filter: 'saturate(0.85)' }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="mono text-xs text-gold">
                  {featured.category} · {featured.date} · {featured.readTime}
                </p>
                <h2 className="display mt-4 group-hover:text-command">{featured.title}</h2>
                <p className="lead mt-5 text-ink-soft">{featured.excerpt}</p>
                <span className="link mt-6 text-sm">
                  Read full story
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Category filter + article grid */}
      <NxtLifeFilter articles={rest} />

      {/* Quote / brand strip */}
      <section className="bg-stone">
        <div className="container py-20 md:py-28 text-center">
          <Reveal>
            <blockquote className="mx-auto max-w-[720px]">
              <div className="gold-rule mx-auto mb-8" />
              <p className="display-sm italic text-navy leading-snug">
                &ldquo;We do not just sell policies. We build a culture of protection,
                education, and service that outlasts any single transaction.&rdquo;
              </p>
              <footer className="mt-8 text-sm text-ink-soft">
                — NXT Financial Group Leadership
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="section bg-stone">
        <div className="container text-center">
          <Reveal>
            <p className="label-sm mb-5 justify-center">Stay Informed</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="display mx-auto max-w-[600px]">
              Get NXT Life delivered to your inbox
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="lead mx-auto mt-4 max-w-[520px] text-ink-soft">
              Company updates, industry insights, and stories from the field — once a month,
              no spam.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <form className="mx-auto mt-8 flex max-w-[480px] flex-col gap-3 sm:flex-row" onSubmit={undefined}>
              <input
                type="email"
                placeholder="you@company.com"
                className="field flex-1"
                required
              />
              <button type="submit" className="btn btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Footer legal */}
      <div className="border-t border-platinum bg-white py-8">
        <div className="container text-center">
          <p className="text-xs text-silver">
            &copy; 2026 NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.
          </p>
          <p className="mt-2 text-xs text-silver/70">
            NXT Life is the official editorial and lifestyle publication of NXT Financial Group.
          </p>
        </div>
      </div>
    </>
  )
}
