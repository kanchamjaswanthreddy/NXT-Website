import Link from 'next/link'
export default function NotFound() {
  return (<section className="section pt-40"><div className="container max-w-[560px] text-center"><p className="mono mb-3 text-sm text-gold">404</p><h1 className="display mb-4">That page isn&rsquo;t here.</h1><p className="mb-8 text-ink-soft">It may have moved. Browse every coverage line we place, or ask an advisor directly.</p><Link href="/insurance" className="btn btn-primary">All solutions</Link></div></section>)
}
