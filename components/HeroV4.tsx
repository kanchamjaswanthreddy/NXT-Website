'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, MapPin, BadgeCheck } from 'lucide-react'
import { useRef } from 'react'

const ease = [0.22, 0.61, 0.36, 1] as const
const up = (d: number) => ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease } })

export default function HeroV4() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 90])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-stone">
      <div aria-hidden="true" className="glow -right-32 -top-32 h-[520px] w-[520px] bg-sunrise/25" />
      <div aria-hidden="true" className="glow -left-40 bottom-0 h-[420px] w-[420px] bg-navy/10" />
      <div className="container grid grid-cols-1 items-center gap-14 pb-20 pt-32 md:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28">
        <div>
          <motion.p {...up(0)} className="label-sm mb-6">NXT Financial Group | Retirement &amp; protection planning</motion.p>
          <motion.h1 {...up(0.08)} className="display-xl text-navy">Income you can&rsquo;t <span className="text-gold">outlive</span>. Care you can <span className="text-gold">choose</span>. A legacy that <span className="text-gold">lands</span>.</motion.h1>
          <motion.p {...up(0.16)} className="lead mt-8 max-w-[560px] text-ink-soft">An independent agency for the five decisions that shape retirement: annuities, life insurance, care planning, Medicare and disability income. We compare A-rated carriers and explain every term before you sign one.</motion.p>
          <motion.div {...up(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="btn btn-primary">Book a free consultation <ArrowRight size={16} /></Link>
            <Link href="/solutions" className="btn btn-outline">Explore solutions</Link>
          </motion.div>
          <motion.ul {...up(0.34)} className="mt-10 flex flex-wrap gap-3">
            <li className="pill"><ShieldCheck size={16} className="text-gold" /> A-rated carriers only</li>
            <li className="pill"><MapPin size={16} className="text-gold" /> Licensed in 50 states</li>
            <li className="pill"><BadgeCheck size={16} className="text-gold" /> No cost to you</li>
          </motion.ul>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease }} style={{ y }} className="arch frame-gold relative aspect-[4/5]">
            <div className="photo"><Image src="/images/family-advisor.png" alt="A family meeting with their NXT advisor" fill priority sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" style={{ filter: 'saturate(0.9)' }} /></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} style={{ y: y2 }} className="card absolute -left-6 top-[18%] w-[220px] rounded-2xl p-4 shadow-lift md:-left-14">
            <p className="label-sm">Guaranteed income</p><p className="font-display text-3xl font-semibold text-navy">$4,850<span className="text-base text-ink-soft">/mo</span></p><p className="mt-1 text-xs text-ink-soft">Illustrative lifetime payout</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.75, ease }} style={{ y: y2 }} className="card absolute -right-4 bottom-[12%] w-[240px] rounded-2xl p-4 shadow-lift md:-right-10">
            <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-midnight"><ShieldCheck size={20} /></span><div><p className="text-sm font-semibold text-navy">Care plan funded</p><p className="text-xs text-ink-soft">Hybrid LTC · $300k benefit</p></div></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
