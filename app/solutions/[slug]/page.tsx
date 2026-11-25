import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ChevronRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { solutions, getSolution } from '@/lib/solutions'
import { carrierGroups } from '@/lib/carriers'
import { CHAPTER_MEDIA, small } from '@/lib/media'

type Params = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return solutions.map((s) => ({ slug: s.slug })) }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { slug } = await params; const s = getSolution(slug); return s ? { title: `${s.title} — Compare Top Carriers`, description: `${s.short} NXT Financial Group compares 70+ carriers to find the right ${s.title.toLowerCase()} coverage for you.`, alternates: { canonical: `https://www.nxtfinancialgroup.com/solutions/${slug}` } } : {} }

const photo = (slug: string, fallback: string) => small(CHAPTER_MEDIA[slug]?.src ?? fallback)

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()
  const group = carrierGroups.find((g) => g.solution === slug)
  const i = solutions.findIndex((x) => x.slug === slug)
  const next = solutions[(i + 1) % solutions.length]
  const media = CHAPTER_MEDIA[slug]
  return (
    <>
      <PageHero eyebrow={s.title} title={s.headline} intro={s.intro} image={media?.src ?? s.image} imageDepth={media?.depth} imageAlt={media?.alt ?? ''}>
        <Link href="/contact" className="btn btn-primary">Talk to an advisor about {s.title.toLowerCase()}</Link>
      </PageHero>

      <section className="section bg-white">
        <div className="container">
          <Reveal className="mb-14 max-w-[760px]"><p className="chip mb-4">What we place</p><h2 className="display">{s.title}, in its forms.</h2></Reveal>
          <Stagger as="ul" className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${s.sub.length === 4 ? 'xl:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {s.sub.map((p) => <Item as="li" key={p.name} className="tile flex flex-col gap-3 p-8 md:p-9"><h3 className="display-sm">{p.name}</h3><p className="text-ink-soft">{p.summary}</p></Item>)}
          </Stagger>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[28px] bg-white p-8 md:p-12">
            <p className="chip mb-4">Is this for you?</p>
            <h2 className="display-sm mb-7">It usually fits when</h2>
            <ul className="border-t border-midnight/10">{s.fit.map((f) => <li key={f} className="flex gap-4 border-b border-midnight/10 py-4 text-midnight"><Check size={18} strokeWidth={2.25} className="mt-1 shrink-0 text-gold" aria-hidden="true" />{f}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.08} className="on-dark rounded-[28px] bg-midnight p-8 md:p-12">
            <p className="label-sm mb-4">How it goes</p>
            <h2 className="display-sm mb-7">Three steps, no pressure</h2>
            <ol className="border-t border-white/10">{s.process.map((p, n) => <li key={p} className="flex gap-5 border-b border-white/10 py-4"><span className="mono w-5 shrink-0 font-semibold text-sunrise">{n + 1}</span><p className="!text-white">{p}</p></li>)}</ol>
          </Reveal>
        </div>
      </section>

      {group && (
        <section className="section bg-white">
          <div className="container">
            <Reveal className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><p className="chip mb-4">Carrier partners</p><h2 className="display">Who we shop for {s.title.toLowerCase()}</h2></div><Link href={`/carriers#${group.key}`} className="link md:pb-2">Full carrier list <ChevronRight size={17} /></Link></Reveal>
            <ul className="flex flex-wrap gap-2.5">{group.carriers.map((c) => <li key={c.slug} className="flex items-center gap-2.5 rounded-full bg-stone px-5 py-2.5"><span className="font-medium tracking-[-.015em] text-midnight">{c.name}</span>{c.rating && <span className="mono text-[.8125rem] text-ink-soft">{c.rating}</span>}</li>)}</ul>
          </div>
        </section>
      )}

      <section className="bg-stone">
        <div className="container py-[clamp(4rem,8vw,7rem)]">
          <Link href={`/solutions/${next.slug}`} className="group grid grid-cols-1 items-center gap-10 md:grid-cols-[1.1fr_.9fr] md:gap-16">
            <div>
              <p className="chip mb-4">Next solution</p>
              <span className="display-xl block text-midnight">{next.title}</span>
              <span className="lead mt-4 block text-ink-soft">{next.short}</span>
              <span className="link mt-6">See {next.title} <ChevronRight size={17} /></span>
            </div>
            <div className="tile aspect-[5/4] w-full"><Image src={photo(next.slug, next.image)} alt="" fill sizes="(min-width: 768px) 42vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" /></div>
          </Link>
        </div>
      </section>
    </>
  )
}
