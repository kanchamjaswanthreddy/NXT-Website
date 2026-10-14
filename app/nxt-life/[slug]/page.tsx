import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Eye, Cpu, Users, TrendingUp } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { articles } from '@/lib/nxt-life'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  return article
    ? { title: `${article.title} — NXT Life`, description: article.excerpt }
    : {}
}

export default async function NxtLifeArticlePage({ params }: Params) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3)
  const isTeamArticle = article.image.includes('/team/')
  const quotes = article.body.filter((b) => b.type === 'quote')
  const bodyWithoutQuotes = article.body.filter((b) => b.type !== 'quote')

  return (
    <>
      {isTeamArticle ? (
        <>
          {/* Light hero with photo on right */}
          <section className="bg-stone">
            <div className="container pb-12 pt-32 md:pt-40">
              <Link
                href="/nxt-life"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-navy"
              >
                <ArrowLeft size={16} /> NXT Life
              </Link>

              <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-14">
                {/* Left: text */}
                <div className="flex-1 text-center md:text-left">
                  <p className="mono text-[11px] tracking-[0.25em] uppercase text-gold mb-3">Welcome to NXT</p>
                  <h1 className="font-display text-[2.5rem] font-bold leading-[1.05] text-navy md:text-5xl">
                    James R. Vigeant
                  </h1>
                  <p className="mt-1.5 text-lg font-semibold text-gold italic">
                    Chief Strategy &amp; Innovation Officer
                  </p>
                  <div className="mt-5 h-[2px] w-16 rounded bg-gold/30 mx-auto md:mx-0" />
                  <p className="mt-5 max-w-[440px] text-[14px] leading-relaxed text-ink-soft mx-auto md:mx-0">
                    40+ years of experience in science, corporate strategy, technology, small business ownership and community engagement.
                  </p>
                </div>

                {/* Right: round photo */}
                <div className="relative flex-shrink-0">
                  <span
                    aria-hidden="true"
                    className="absolute -right-2 -top-5 z-20 font-display text-2xl italic text-gold/30 select-none md:text-3xl"
                  >
                    Welcome
                  </span>
                  <div className="relative h-[220px] w-[220px] md:h-[280px] md:w-[280px] rounded-full overflow-hidden shadow-xl ring-[4px] ring-gold/20">
                    <Image
                      src={article.image}
                      alt="James R. Vigeant"
                      fill
                      priority
                      sizes="280px"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gold divider */}
          <div className="h-[3px] bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0" />

          {/* Two-column body */}
          <article className="section pt-12">
            <div className="container max-w-[1060px]">
              <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
                {/* Main content */}
                <div className="prose-nxt flex-1 min-w-0">
                  {bodyWithoutQuotes.map((b, i) =>
                    b.type === 'h2' ? (
                      <h2 key={i}>{b.text}</h2>
                    ) : b.type === 'ul' ? (
                      <ul key={i}>
                        {b.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    ) : b.type === 'callout' ? (
                      <p key={i} className="callout">{b.text}</p>
                    ) : (
                      <p key={i}>{b.text}</p>
                    ),
                  )}
                </div>

                {/* Quote sidebar */}
                {quotes.length > 0 && (
                  <aside className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-5 lg:pt-2">
                    {quotes.map((q, i) => (
                      <div
                        key={i}
                        className="rounded-2xl bg-stone p-6 border border-platinum/60"
                      >
                        <div className="font-display text-3xl leading-none text-gold/30 mb-2">&ldquo;</div>
                        <p className="text-[14px] font-medium italic leading-[1.65] text-navy">
                          {q.type === 'quote' && q.text}
                        </p>
                        <div className="mt-4 h-[2px] w-8 rounded bg-gold/25" />
                        <p className="mt-3 text-[13px] font-bold text-navy">
                          {q.type === 'quote' && q.attribution.split(',')[0]}
                        </p>
                        <p className="text-[11px] text-ink-soft leading-snug">
                          {q.type === 'quote' && q.attribution.split(',').slice(1).join(',').trim()}
                        </p>
                      </div>
                    ))}
                  </aside>
                )}
              </div>

              {/* Focus area cards */}
              <Reveal>
                <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {[
                    { icon: Eye, title: 'Strategic Vision', desc: 'Long-term direction and growth strategy' },
                    { icon: Cpu, title: 'Technology & Innovation', desc: 'Platforms and tools that help NXT scale' },
                    { icon: Users, title: 'People & Community', desc: 'Strong teams and authentic social impact' },
                    { icon: TrendingUp, title: 'Sustainable Growth', desc: 'Clear processes for lasting success' },
                  ].map((card) => (
                    <div key={card.title} className="rounded-2xl border border-platinum bg-white p-5 text-center">
                      <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-navy/5">
                        <card.icon size={18} className="text-navy" />
                      </div>
                      <h3 className="text-[13px] font-bold text-navy">{card.title}</h3>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-ink-soft">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal className="mx-auto mt-14 max-w-[720px] rounded-[24px] bg-navy p-8 on-dark md:p-10">
                <h2 className="display-sm mb-2">Ready to take the next step?</h2>
                <p className="mb-6">Connect with an NXT advisor — no cost, no obligation.</p>
                <Link href="/contact" className="btn btn-cta">
                  Book a consultation <ArrowRight size={16} />
                </Link>
              </Reveal>
            </div>
          </article>
        </>
      ) : (
        <>
          {/* Standard article header */}
          <section className="bg-stone">
            <div className="container max-w-[880px] pb-12 pt-32 md:pt-40">
              <Link
                href="/nxt-life"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-navy"
              >
                <ArrowLeft size={16} /> NXT Life
              </Link>
              <p className="mono mb-4 text-sm text-gold">
                {article.category} · {article.date} · {article.readTime}
              </p>
              <h1 className="display-xl text-navy">{article.title}</h1>
              <p className="lead mt-6 text-ink-soft">{article.excerpt}</p>
            </div>
          </section>

          {/* Standard article body */}
          <article className="section pt-12">
            <div className="container max-w-[880px]">
              <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[24px] bg-stone">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  priority
                  sizes="880px"
                  className="object-cover"
                  style={{ filter: 'saturate(0.85)' }}
                />
              </div>

              <div className="prose-nxt mx-auto max-w-[720px]">
                {article.body.map((b, i) =>
                  b.type === 'h2' ? (
                    <h2 key={i}>{b.text}</h2>
                  ) : b.type === 'ul' ? (
                    <ul key={i}>
                      {b.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  ) : b.type === 'callout' ? (
                    <p key={i} className="callout">{b.text}</p>
                  ) : b.type === 'quote' ? (
                    <blockquote key={i} className="quote-block">
                      <p>{b.text}</p>
                      <cite>— {b.attribution}</cite>
                    </blockquote>
                  ) : (
                    <p key={i}>{b.text}</p>
                  ),
                )}
              </div>

              {/* CTA */}
              <Reveal className="mx-auto mt-14 max-w-[720px] rounded-[24px] bg-navy p-8 on-dark md:p-10">
                <h2 className="display-sm mb-2">Ready to take the next step?</h2>
                <p className="mb-6">Connect with an NXT advisor — no cost, no obligation.</p>
                <Link href="/contact" className="btn btn-cta">
                  Book a consultation <ArrowRight size={16} />
                </Link>
              </Reveal>
            </div>
          </article>
        </>
      )}

      {/* Related */}
      <section className="section bg-stone">
        <div className="container">
          <h2 className="display-sm mb-8">More from NXT Life</h2>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <Link href={`/nxt-life/${a.slug}`} className="group block">
                  <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[16px] bg-stone">
                    <Image
                      src={a.image}
                      alt={a.title}
                      fill
                      sizes="(min-width:768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      style={{ filter: 'saturate(0.85)' }}
                    />
                  </div>
                  <p className="mono text-xs text-gold">{a.category}</p>
                  <h3 className="display-sm mt-2 text-[1.2rem] group-hover:text-command">{a.title}</h3>
                  <p className="mt-2 text-[15px] text-ink-soft">{a.excerpt}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Publication footer */}
      <div className="border-t border-platinum bg-white py-8">
        <div className="container text-center">
          <p className="text-xs text-silver">
            &copy; 2026 NXT Financial Group, NXT World Holdings, Inc. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  )
}
