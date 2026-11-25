'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

const two = (n: number) => String(n).padStart(2, '0')

/**
 * State for a numbered slider. It moves on by itself while it is on screen: the thin progress
 * line is a CSS animation, and the slide changes when that animation ends. So whatever stops the
 * line stops the slider too: the pointer resting on it, keyboard focus inside it, its pause
 * button, or a visitor who has asked for reduced motion (the line never runs for them).
 */
export function useSlider(count: number) {
  const [i, setI] = useState(0)
  const [seen, setSeen] = useState(false)
  const [held, setHeld] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = root.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const go = (d: number) => setI((v) => (v + d + count) % count)
  return { i, setI, go, held, setHeld, run: seen && !held, root }
}
export type SliderState = ReturnType<typeof useSlider>

/** The slider's head: a large current number, the row of numbers, the controls and the progress line. */
export function SliderHead({ s, count, what }: { s: SliderState; count: number; what: string }) {
  const { i, setI, go, held, setHeld } = s
  const name = what.toLowerCase()
  return (
    <div className="pv-sl-head">
      <p className="pv-sl-num" aria-hidden="true"><span key={i}>{two(i + 1)}</span></p>
      <ol className="pv-sl-tabs">
        {Array.from({ length: count }, (_, k) => (
          <li key={k}><button type="button" className="pv-mono" aria-label={`${what} ${k + 1} of ${count}`} aria-current={k === i || undefined} onClick={() => setI(k)}>{two(k + 1)}</button></li>
        ))}
      </ol>
      <div className="pv-sl-arrows">
        <button type="button" className="pv-sl-hold" aria-label={held ? `Play the ${name}s automatically` : `Stop the ${name}s from moving on`} aria-pressed={held} onClick={() => setHeld(!held)}>
          {held ? <Play size={14} fill="currentColor" strokeWidth={0} /> : <Pause size={14} fill="currentColor" strokeWidth={0} />}
        </button>
        <button type="button" aria-label={`Previous ${name}`} onClick={() => go(-1)}><ArrowLeft size={18} /></button>
        <button type="button" aria-label={`Next ${name}`} onClick={() => go(1)}><ArrowRight size={18} /></button>
      </div>
      <div className="pv-sl-rule" aria-hidden="true"><i key={i} className="pv-sl-fill" onAnimationEnd={() => go(1)} /></div>
    </div>
  )
}
