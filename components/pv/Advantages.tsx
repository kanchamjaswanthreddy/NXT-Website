'use client'
import Image from 'next/image'
import { CircleSlash, HandCoins, MapPinned, Scale, UserCheck } from 'lucide-react'
import { SliderHead, useSlider } from './Slider'

export interface Advantage { title: string; text: string }
const ICONS = [Scale, CircleSlash, HandCoins, UserCheck, MapPinned]

/**
 * Why independent: one photograph, and the reasons one at a time beside it. Every reason is in
 * the page from the start (they share one grid cell, so the block never changes height); the
 * slider only decides which one is showing.
 */
export default function Advantages({ items }: { items: Advantage[] }) {
  const s = useSlider(items.length)
  const Icon = ICONS[s.i % ICONS.length]
  return (
    <div ref={s.root} className="pv-adv pv-sl" data-run={s.run || undefined}>
      <div className="pv-adv-fig" data-rv="wipe">
        <figure><Image src="/media/family-advisor.jpg" alt="A family around a table with their advisor" fill sizes="(min-width: 900px) 48vw, 94vw" /></figure>
        <span className="pv-adv-sq" aria-hidden="true"><Icon key={s.i} strokeWidth={1.25} /></span>
      </div>
      <div className="pv-adv-main">
        <SliderHead s={s} count={items.length} what="Reason" />
        <ul className="pv-sl-stack">
          {items.map((it, k) => (
            <li key={it.title} data-on={k === s.i || undefined}>
              <h3 className="pv-h3">{it.title}</h3>
              <p>{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
