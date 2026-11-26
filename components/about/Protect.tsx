'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'

export interface ProtectValue { letter: string; word: string; desc: string }

/**
 * The seven values, spelled P-R-O-T-E-C-T. With motion the section holds still while the page
 * scrolls: each letter lights in turn and its principle is set out beneath it, and any letter can
 * be clicked to jump to it. Without motion (or scripting) it is a plain list of all seven.
 */
export default function Protect({ values }: { values: ProtectValue[] }) {
  const root = useRef<HTMLElement>(null)
  const [live, setLive] = useState(false)
  const [at, setAt] = useState(0)
  const n = values.length

  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 560px)')
    const mode = () => setLive(mq.matches)
    mode(); mq.addEventListener('change', mode)
    return () => mq.removeEventListener('change', mode)
  }, [])

  useEffect(() => {
    if (!live) return
    let raf = 0
    const read = () => {
      raf = 0
      const el = root.current; if (!el) return
      const r = el.getBoundingClientRect()
      const p = Math.min(0.9999, Math.max(0, -r.top / Math.max(1, r.height - innerHeight)))
      setAt(Math.floor(p * (n + 1)))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(read) }
    read(); addEventListener('scroll', on, { passive: true }); addEventListener('resize', on)
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [live, n])

  const go = (k: number) => {
    const el = root.current; if (!el) return
    const top = el.getBoundingClientRect().top + scrollY
    const y = top + ((k + 0.5) / (n + 1)) * (el.offsetHeight - innerHeight)
    const l = (window as unknown as { __lenis?: { scrollTo: (y: number) => void } }).__lenis
    if (l) l.scrollTo(y); else scrollTo({ top: y, behavior: 'smooth' })
  }

  const done = at >= n
  const cur = values[Math.min(at, n - 1)]
  const two = (k: number) => String(k).padStart(2, '0')
  return (
    <section ref={root} className="pt on-dark" data-tone="dark" data-live={live || undefined} data-done={done || undefined} style={{ '--n': n, '--at': at } as CSSProperties} aria-labelledby="pt-h">
      <h2 id="pt-h" className="sr-only">Our values: P.R.O.T.E.C.T</h2>

      <div className="pt-stage">
        <span className="pt-spot" aria-hidden="true" />
        <span className="pt-ghost" aria-hidden="true" key={`g${at}`}>{done ? '' : cur.letter}</span>
        <span className="pt-flash" aria-hidden="true" key={`f${at}`} />
        <p className="pt-num" aria-hidden="true" key={`n${at}`}><b>{two(Math.min(at + 1, n))}</b><span>/ {two(n)}</span></p>
        <div className="pt-head">
          <p className="chip">Our values</p>
          <p className="pt-lead">Seven principles that guide every decision we make — for our advisors and for the families we serve.</p>
        </div>

        <div className="pt-letters" role="tablist" aria-label="P.R.O.T.E.C.T">
          {values.map((v, k) => (
            <button key={k} type="button" role="tab" aria-selected={k === at} aria-controls="pt-panel" aria-label={`${v.letter}: ${v.word}`}
              data-state={done ? 'all' : k < at ? 'past' : k === at ? 'on' : 'next'} style={{ '--k': k } as CSSProperties} onClick={() => go(k)}>
              <span>{v.letter}</span>
              <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
            </button>
          ))}
          <i className="pt-rail" aria-hidden="true"><b /></i>
        </div>

        <div id="pt-panel" role="tabpanel" className="pt-panel" key={at}>
          <div className="pt-ticks" aria-hidden="true">{values.map((_, k) => <i key={k} data-on={k <= at || undefined} data-now={k === at || undefined} />)}</div>
          {done ? (
            <>
              <p>Seven principles that guide every decision we make — for our advisors and for the families we serve.</p>
            </>
          ) : (
            <>
              <h3 aria-label={cur.word}>{cur.word.split('').map((c, k) => <em key={k} aria-hidden="true" style={{ '--c': k } as CSSProperties} className={k === 0 ? 'pt-hot' : undefined}>{c}</em>)}</h3>
              <p>{cur.desc}</p>
            </>
          )}
        </div>
      </div>

      <div className="pt-plain container">
        <p className="chip">Our values</p>
        <p className="pt-word" aria-hidden="true">P.R.O.T.E.C.T</p>
        <p className="pt-lead">Seven principles that guide every decision we make — for our advisors and for the families we serve.</p>
        <ol>
          {values.map((v, k) => (
            <li key={k}><b aria-hidden="true">{v.letter}</b><div><h3>{v.word}</h3><p>{v.desc}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  )
}
