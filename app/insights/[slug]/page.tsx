import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/motion'
import { posts } from '@/lib/insights'
type Params = { params: Promise<{ slug: string }> }
export function generateStaticParams() { return posts.map((p) => ({ slug: p.slug })) }
export async function generateMetadata({ params }: Params): Promise<Metadata> { const { slug } = await params; const p = posts.find((x) => x.slug === slug); return p ? { title: p.title, description: p.excerpt } : {} }
export default async function PostPage({ params }: Params) {
  const { slug } = await params; const post = posts.find((x) => x.slug === slug); if (!post) notFound()
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3)
  return (<>
    <section className="bg-stone"><div className="container max-w-[880px] pb-12 pt-32 md:pt-40"><Link href="/insights" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-navy"><ArrowLeft size={16} /> Insights</Link><p className="mono mb-4 text-sm text-gold">{post.category} · {post.date} · {post.readTime}</p><h1 className="display-xl text-navy">{post.title}</h1><p className="lead mt-6 text-ink-soft">{post.excerpt}</p></div></section>
    <article className="section pt-12"><div className="container max-w-[880px]"><div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-[24px] bg-stone"><Image src={post.image} alt="" fill priority sizes="880px" className="object-cover" style={{ filter: 'saturate(0.85)' }} /></div>
      <div className="prose-nxt mx-auto max-w-[720px]">{post.body.map((b, i) => b.type === 'h2' ? <h2 key={i}>{b.text}</h2> : b.type === 'ul' ? <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul> : b.type === 'callout' ? <p key={i} className="callout">{b.text}</p> : <p key={i}>{b.text}</p>)}</div>
      <Reveal className="mx-auto mt-14 max-w-[720px] rounded-[24px] bg-navy p-8 on-dark md:p-10"><h2 className="display-sm mb-2">Want this applied to your situation?</h2><p className="mb-6">Forty-five minutes with an advisor, no cost, no obligation.</p><Link href="/contact" className="btn btn-cta">Book a consultation <ArrowRight size={16} /></Link></Reveal></div></article>
    <section className="section bg-stone"><div className="container"><h2 className="display-sm mb-8">More insights</h2><ul className="grid grid-cols-1 gap-8 md:grid-cols-3">{related.map((p) => <li key={p.slug}><Link href={`/insights/${p.slug}`} className="group block"><p className="mono text-xs text-gold">{p.category}</p><h3 className="display-sm mt-2 text-[1.35rem] group-hover:text-command">{p.title}</h3><p className="mt-2 text-[15px] text-ink-soft">{p.excerpt}</p></Link></li>)}</ul></div></section>
  </>)
}
