import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Check } from 'lucide-react'
import PageHero from '@/components/PageHero'
import { Reveal, Stagger, Item } from '@/components/motion'
import { solutions, getSolution } from '@/lib/solutions'
import { carrierGroups } from '@/lib/carriers'

type Params = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return solutions.map((s) => ({ slug: s.slug })) }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { slug } = await params; const s = getSolution(slug); return s ? { title: s.title, description: s.short } : {} }

export default async function SolutionPage({ params }: Params) {
  const { slug } = await params
  const s = getSolution(slug)
  if (!s) notFound()
  const group = carrierGroups.find((g) => g.solution === slug)
  const i = solutions.findIndex((x) => x.slug === slug)
  const next = solutions[(i + 1) % solutions.length]
  return (
    <>
      <PageHero eyebrow={s.title} title={s.headline} intro={s.intro} image={s.image}>
        <Link href="/contact" className="btn btn-primary">Talk to an advisor about {s.title.toLowerCase()} <ArrowRight size={16} /></Link>
      </PageHero>

      <section className="section">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[300px_1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-32 lg:self-start"><p className="label-sm mb-5">What we place</p><h2 className="display-sm">{s.title}, in its forms.</h2></Reveal>
          <Stagger as="ul" className="hairline">
            {s.sub.map((p) => <Item as="li" key={p.name} className="grid grid-cols-1 gap-2 border-b border-platinum py-7 md:grid-cols-[280px_1fr] md:gap-8"><h3 className="display-sm text-[1.5rem]">{p.name}</h3><p className="text-[16px] text-ink-soft">{p.summary}</p></Item>)}
          </Stagger>
        </div>
      </section>

      <section className="section bg-stone">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal><p className="label-sm mb-5">Is this for you?</p><h2 className="display-sm mb-6">It usually fits when</h2><ul className="space-y-4">{s.fit.map((f) => <li key={f} className="flex gap-3 text-[16px]"><span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-midnight"><Check size={11} strokeWidth={3} /></span>{f}</li>)}</ul></Reveal>
          <Reveal delay={0.1}><p className="label-sm mb-5">How it goes</p><h2 className="display-sm mb-6">Three steps, no pressure</h2><ol className="space-y-5">{s.process.map((p, n) => <li key={p} className="flex gap-4"><span className="numeral text-2xl">0{n + 1}</span><p className="pt-1 text-[16px]">{p}</p></li>)}</ol></Reveal>
        </div>
      </section>

      {group && (
        <section className="section">
          <div className="container">
            <Reveal className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><p className="label-sm mb-5">Carrier partners</p><h2 className="display-sm">Who we shop for {s.title.toLowerCase()}</h2></div><Link href={`/carriers#${group.key}`} className="link">Full carrier list <ArrowRight size={16} /></Link></Reveal>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-platinum pt-8 sm:grid-cols-3 lg:grid-cols-4">{group.carriers.map((c) => <li key={c.slug} className="flex items-baseline justify-between gap-3 border-b border-platinum pb-4"><span className="wordmark">{c.name}</span>{c.rating && <span className="mono text-xs text-ink-soft">{c.rating}</span>}</li>)}</ul>
          </div>
        </section>
      )}

      <section className="bg-stone">
        <div className="container grid grid-cols-1 gap-8 py-20 md:grid-cols-2 md:items-center">
          <Reveal><p className="label-sm mb-4">Next solution</p><Link href={`/solutions/${next.slug}`} className="group inline-block"><span className="display block group-hover:text-command">{next.title}</span><span className="mt-2 block text-ink-soft">{next.short}</span></Link></Reveal>
          <Reveal delay={0.1} className="relative aspect-[16/10] overflow-hidden rounded-[24px]"><Image src={next.image} alt="" fill sizes="50vw" className="object-cover" style={{ filter: 'saturate(0.85)' }} /></Reveal>
        </div>
      </section>
    </>
  )
}
