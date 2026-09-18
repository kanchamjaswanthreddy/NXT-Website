import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import { Stagger, Item } from '@/components/motion'
import { posts } from '@/lib/insights'
export const metadata: Metadata = { title: 'Insights', description: 'Plain-language guidance on annuities, life insurance, care planning, Medicare and disability income.' }
export default function InsightsPage() {
  const [first, ...rest] = posts
  return (<><PageHero eyebrow="Insights" title="Retirement, explained plainly." intro="Notes from our advisors on what each product actually does, what it costs and when it is worth it." />
    <section className="section pt-0"><div className="container">
      <Link href={`/insights/${first.slug}`} className="group mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center"><div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-stone"><Image src={first.image} alt="" fill sizes="50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ filter: 'saturate(0.85)' }} /></div><div><p className="mono text-xs text-gold">{first.category} · {first.date} · {first.readTime}</p><h2 className="display mt-3 group-hover:text-command">{first.title}</h2><p className="lead mt-4 text-ink-soft">{first.excerpt}</p></div></Link>
      <Stagger as="ul" className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">{rest.map((p) => <Item as="li" key={p.slug}><Link href={`/insights/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden rounded-[24px] sm:flex-row"><div className="relative aspect-[4/3] shrink-0 sm:aspect-auto sm:w-[240px] sm:min-h-[200px] bg-stone"><Image src={p.image} alt="" fill sizes="(min-width:640px) 240px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" style={{ filter: 'saturate(0.85)' }} /></div><div className="flex flex-1 flex-col p-6"><p className="mono text-xs text-gold">{p.category} · {p.date} · {p.readTime}</p><h3 className="display-sm mt-2 text-[1.2rem] group-hover:text-command">{p.title}</h3><p className="mt-2 flex-1 text-[14px] text-ink-soft">{p.excerpt}</p></div></Link></Item>)}</Stagger>
    </div></section></>)
}
