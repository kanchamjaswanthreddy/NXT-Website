import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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

  return (
    <>
      {/* Header */}
      <section className="bg-midnight on-dark">
        <div className="container max-w-[880px] pb-12 pt-32 md:pt-40">
          <Link
            href="/nxt-life"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-silver hover:text-white"
          >
            <ArrowLeft size={16} /> NXT Life
          </Link>
          <p className="mono mb-4 text-sm text-sunrise">
            {article.category} · {article.date} · {article.readTime}
          </p>
          <h1 className="display-xl">{article.title}</h1>
          <p className="lead mt-6 text-platinum">{article.excerpt}</p>
        </div>
        <div className="swoosh-band" />
      </section>

      {/* Body */}
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
