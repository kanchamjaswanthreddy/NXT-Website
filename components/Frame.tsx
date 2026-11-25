'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

/** Backdrop when a page has no picture of its own to offer: the evening shore. */
const DEFAULT = '/media/scenes/family-blur.jpg'

/** Ask the frame to show a blur of this picture outside itself. Pass nothing to go back to the default. */
export function setBackdrop(src?: string) {
  window.dispatchEvent(new CustomEvent('nxt:mat', { detail: src ?? DEFAULT }))
}

/**
 * The frame the whole site sits in: a white rounded line just inside the screen edge, the logo in
 * a notch at its top, and outside it a soft blur of whatever picture is on show.
 *
 * The page scrolls normally underneath; nothing here takes part in layout. The blur is two layers
 * that take turns: a new picture fades in over the old one, which is then dropped.
 */
export default function Frame() {
  const [state, setState] = useState({ srcs: [DEFAULT, DEFAULT], top: 0 })

  useEffect(() => {
    const on = (e: Event) => {
      const src = (e as CustomEvent<string>).detail || DEFAULT
      setState((s) => {
        if (s.srcs[s.top] === src) return s
        const next = 1 - s.top
        const srcs = [...s.srcs]
        srcs[next] = src
        return { srcs, top: next }
      })
    }
    window.addEventListener('nxt:mat', on)
    return () => window.removeEventListener('nxt:mat', on)
  }, [])

  return (
    <>
      <div className="frame-edge" aria-hidden="true" />
      <div className="frame-mat" aria-hidden="true">
        {state.srcs.map((src, k) => <i key={k} data-on={state.top === k || undefined} style={{ backgroundImage: `url(${src})` }} />)}
      </div>
      <i className="frame-prog" aria-hidden="true" />
      <div className="notch">
        <svg viewBox="0 0 240 58" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0C26 0 22 58 50 58H190C218 58 214 0 240 0Z" /></svg>
        <Link href="/" aria-label="NXT Financial Group home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/logo-trim.png" alt="" width={420} height={154} />
        </Link>
      </div>
    </>
  )
}
