'use client'
import Image from 'next/image'
import type { Testimonial } from '@/lib/testimonials'
import { SliderHead, useSlider } from './Slider'

/**
 * Testimonials one at a time: who is speaking on the left, their words on a pale card. All of
 * them are in the page (stacked in one grid cell), so the card keeps one height and a screen
 * reader can read them straight through.
 */
export default function Voices({ items }: { items: Testimonial[] }) {
  const s = useSlider(items.length)
  return (
    <div ref={s.root} className="pv-voices pv-sl" data-run={s.run || undefined}>
      <div className="pv-voices-side">
        <SliderHead s={s} count={items.length} what="Testimonial" />
        <ul className="pv-sl-stack pv-voices-who" aria-hidden="true">
          {items.map((t, k) => (
            <li key={t.name} data-on={k === s.i || undefined}>
              {t.image
                ? <span className="pv-voices-face"><Image src={t.image} alt="" fill sizes="64px" /></span>
                : <span className="pv-voices-face" data-initials>{t.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}</span>}
              <p><span className="pv-voices-name">{t.name}</span><span className="pv-mono">{t.role}</span></p>
            </li>
          ))}
        </ul>
      </div>
      <div className="pv-voices-card">
        <svg viewBox="0 0 48 36" aria-hidden="true"><path d="M0 36V21.6C0 9.4 6.6 1.9 19.2 0l1.9 5.3C14.3 7 11 11 10.6 16.4h9.6V36H0zm26.9 0V21.6C26.9 9.4 33.5 1.9 46.1 0L48 5.3C41.2 7 37.9 11 37.5 16.4h9.6V36H26.9z" /></svg>
        <ul className="pv-sl-stack">
          {items.map((t, k) => (
            <li key={t.name} data-on={k === s.i || undefined}>
              <figure>
                <blockquote><p>{t.quote}</p></blockquote>
                <figcaption className="pv-sr">{t.name}, {t.role}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
