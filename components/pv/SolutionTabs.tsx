'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { ArrowRight } from 'lucide-react'

export interface Tab { href: string; title: string; text: string; image: string; alt: string }

/**
 * The solutions as a numbered list beside one large photograph. Pointing at, focusing or pressing
 * a name brings up its photograph and a line about it, with a link through to the full page.
 */
export default function SolutionTabs({ items }: { items: Tab[] }) {
  const [a, setA] = useState(0)
  const key = (e: KeyboardEvent<HTMLButtonElement>, k: number) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const next = (k + d + items.length) % items.length
    setA(next)
    document.getElementById(`pv-tab-${next}`)?.focus()
  }
  return (
    <div className="pv-tabs">
      <ol className="pv-tabs-list" role="tablist" aria-label="Solutions" aria-orientation="vertical" data-rv="stagger">
        {items.map((s, k) => (
          <li key={s.href} role="presentation" style={{ '--i': k } as CSSProperties}>
            <button type="button" role="tab" id={`pv-tab-${k}`} aria-selected={a === k} aria-controls="pv-tabpanel" tabIndex={a === k ? 0 : -1}
              onClick={() => setA(k)} onPointerEnter={(e) => { if (e.pointerType === 'mouse') setA(k) }} onFocus={() => setA(k)} onKeyDown={(e) => key(e, k)}>
              <span className="pv-mono">0{k + 1}</span>
              <span className="pv-tabs-t">{s.title}</span>
              <ArrowRight className="pv-tabs-a" size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>
      <div className="pv-tabs-view" role="tabpanel" id="pv-tabpanel" aria-labelledby={`pv-tab-${a}`} data-rv="wipe">
        <div className="pv-tabs-pics">
          {items.map((s, k) => <Image key={s.href} src={s.image} alt={a === k ? s.alt : ''} fill sizes="(min-width: 900px) 56vw, 94vw" data-on={a === k || undefined} />)}
        </div>
        <ul className="pv-tabs-cap">
          {items.map((s, k) => (
            <li key={s.href} data-on={a === k || undefined} inert={a !== k}>
              <p>{s.text}</p>
              <Link href={s.href} className="pv-link">Explore {s.title}<i><ArrowRight size={14} /></i></Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
