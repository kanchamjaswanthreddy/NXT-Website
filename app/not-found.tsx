import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

/** Not found. */
export default function NotFound() {
  return (
    <section className="page-hero flex min-h-[78svh] items-center">
      <div className="container max-w-[820px] text-center">
        <p className="chip mb-5">Page not found</p>
        <h1 className="display-xl">That page isn&rsquo;t here.</h1>
        <p className="lead mx-auto mt-7 max-w-[480px] text-ink-soft">It may have moved. Browse every coverage line we place, or ask an advisor directly.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <Link href="/solutions" className="btn btn-primary">All solutions</Link>
          <Link href="/contact" className="link">Ask an advisor <ChevronRight size={17} /></Link>
        </div>
      </div>
    </section>
  )
}
