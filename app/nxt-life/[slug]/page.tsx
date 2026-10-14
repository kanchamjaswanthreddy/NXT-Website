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
          {/* Navy hero for team announcements */}
          <section className="relative overflow-hidden bg-navy">
            {/* Gold arc decoration */}
            <div
              aria-hidden="true"
              className="absolute right-[-10%] top-[-20%] h-[140%] w-[55%] rounded-full border-[3px] border-gold/15"
            />
            <div
              aria-hidden="true"
              className="absolute right-[-5%] top-[-10%] h-[120%] w-[45%] rounded-full border-[2px] border-gold/8"
            />

            <div className="container relative z-10 pb-16 pt-32 md:pt-40 lg:pb-20">
              <Link
                href="/nxt-life"
                className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-platinum/60 hover:text-white"
              >
                <ArrowLeft size={16} /> NXT Life
              </Link>

              <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16 lg:gap-20">
                {/* Left: text */}
                <div className="flex-1 text-center md:text-left">
                  <p className="mono mb-4 text-xs tracking-[0.2em] uppercase text-gold">
                    Welcome to NXT
                  </p>
                  <h1 className="font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl lg:text-[3.5rem]">
                    James R. Vigeant
                  </h1>
                  <p className="mt-2 text-xl font-medium text-gold md:text-2xl">
                    Chief Strategy &amp; Innovation Officer
                  </p>
                  <div className="mt-6 h-[2px] w-20 rounded bg-gold/30 mx-auto md:mx-0" />
                  <p className="mt-6 max-w-[480px] text-[15px] leading-relaxed text-platinum/70 mx-auto md:mx-0">
                    40+ years of experience in science, corporate strategy, technology, small business ownership and community engagement.
                  </p>
                </div>

                {/* Right: photo */}
                <div className="relative flex-shrink-0">
                  {/* "Welcome" script */}
                  <span
                    className="absolute -right-4 -top-6 z-20 font-display text-3xl italic text-gold/50 select-none md:text-4xl"
                    aria-hidden="true"
                  >
                    Welcome
                  </span>
                  <div className="relative h-[260px] w-[260px] md:h-[320px] md:w-[320px]">
                    {/* Gold ring */}
                    <div className="absolute inset-0 rounded-full ring-[5px] ring-gold/25 ring-offset-4 ring-offset-navy" />
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                      <Image
                        src={article.image}
                        alt="James R. Vigeant"
                        fill
                        priority
                        sizes="320px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom gold line */}
            <div className="h-[3px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
          </section>

          {/* Two-column body: content + quote sidebar */}
          <article className="section pt-12">
            <div className="container max-w-[1100px]">
              <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
                {/* Main content */}
                <div className="prose-nxt flex-1 min-w-0">
                  <h2 className="!mt-0">NXT Financial Group is proud to announce</h2>
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
                      <p key={i} className="callout">
                        {b.text}
                      </p>
                    ) : (
                      <p key={i}>{b.text}</p>
                    ),
                  )}
                </div>

                {/* Quote sidebar */}
                {quotes.length > 0 && (
                  <aside className="w-full lg:w-[340px] flex-shrink-0 flex flex-col gap-6">
                    {quotes.map((q, i) => (
                      <div
                        key={i}
                        className="rounded-[20px] border border-platinum bg-gradient-to-br from-stone to-white p-7"
                      >
                        <div className="mb-4 font-display text-4xl leading-none text-gold/40">&ldquo;</div>
                        <p className="text-[15px] font-medium italic leading-relaxed text-navy">
                          {q.type === 'quote' && q.text}
                        </p>
                        <div className="mt-5 h-[2px] w-10 rounded bg-gold/30" />
                        <p className="mt-3 text-sm font-semibold text-navy">
                          {q.type === 'quote' && q.attribution.split(',')[0]}
                        </p>
                        <p className="text-xs text-ink-soft">
                          {q.type === 'quote' && q.attribution.split(',').slice(1).join(',').trim()}
                        </p>
                      </div>
                    ))}
                  </aside>
                )}
              </div>

              {/* Focus area cards */}
              <Reveal>
                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { icon: Eye, title: 'Strategic Vision', desc: 'Shaping NXT\'s long-term direction and growth strategy' },
                    { icon: Cpu, title: 'Technology & Innovation', desc: 'Guiding platforms, systems and tools that help NXT scale' },
                    { icon: Users, title: 'People & Community', desc: 'Building strong teams and authentic social impact' },
                    { icon: TrendingUp, title: 'Sustainable Growth', desc: 'Clear processes and protocols for lasting success' },
                  ].map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[16px] border border-platinum bg-white p-6 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-navy/5">
                        <card.icon size={22} className="text-navy" />
                      </div>
                      <h3 className="text-sm font-bold text-navy">{card.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-ink-soft">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* CTA */}
              <Reveal className="mx-auto mt-14 max-w-[720px] rounded-[24px] bg-navy p-8 on-dark md:p-10">
                <h2 className="display-sm mb-2">Ready to take the next step?</h2>
                <p className="mb-6">
                  Connect with an NXT advisor — no cost, no obligation.
                </p>
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
                    <p key={i} className="callout">
                      {b.text}
                    </p>
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
                <p className="mb-6">
                  Connect with an NXT advisor — no cost, no obligation.
                </p>
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
                  <h3 className="display-sm mt-2 text-[1.2rem] group-hover:text-command">
                    {a.title}
                  </h3>
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
