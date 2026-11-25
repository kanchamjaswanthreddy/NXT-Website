'use client'
import { useEffect, useState } from 'react'

/**
 * The same conditions the stylesheet uses to turn on scroll-driven layouts (pinned sections,
 * the shrinking and growing film frames). Keep these two strings in step with globals.css.
 */
export const SCROLL_FX = '(scripting: enabled) and (prefers-reduced-motion: no-preference)'
export const PIN_WIDE = '(scripting: enabled) and (min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)'
export const PIN_TALL = '(scripting: enabled) and (min-height: 560px) and (prefers-reduced-motion: no-preference)'

/** True once mounted and while the query matches. False on the server and on first paint. */
export function useMedia(query: string): boolean {
  const [on, setOn] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const apply = () => setOn(mq.matches)
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [query])
  return on
}
