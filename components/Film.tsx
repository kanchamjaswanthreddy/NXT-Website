'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import type { FilmSource } from '@/lib/media'

const TALL = '(max-aspect-ratio: 4/5)'

/**
 * A looping, silent film that fills its parent.
 *
 * The still frame is in the page from the first byte; the film itself is fetched only once the
 * block is near the screen, in the orientation that fits, and pauses when it scrolls away.
 * Nothing plays for visitors who ask for reduced motion or data saving, and there is always a
 * pause control.
 */
export default function Film({ film, priority = false, drift = true, scale }: { film: FilmSource; priority?: boolean; drift?: boolean; /** Scroll-driven zoom of the picture inside its frame. */ scale?: MotionValue<number> }) {
  const video = useRef<HTMLVideoElement>(null)
  const held = useRef(false)
  const [on, setOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) return
    setAllowed(true)
    // Phones only start a film on their own when it is silent, and check the property, not the attribute.
    v.muted = true
    v.defaultMuted = true
    const mq = window.matchMedia(TALL)
    const pick = () => {
      const src = mq.matches ? film.tall : film.wide
      if (v.getAttribute('src') !== src) { v.src = src; v.load() }
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!v.getAttribute('src')) pick()
        if (!held.current) v.play().catch(() => {})
      } else v.pause()
    }, { rootMargin: '300px 0px' })
    io.observe(v)
    const onPlaying = () => { setOn(true); setPlaying(true) }
    const onPause = () => setPlaying(false)
    const onOrient = () => { if (v.getAttribute('src')) { pick(); if (!held.current) v.play().catch(() => {}) } }
    v.addEventListener('playing', onPlaying)
    v.addEventListener('pause', onPause)
    mq.addEventListener('change', onOrient)
    return () => { io.disconnect(); v.removeEventListener('playing', onPlaying); v.removeEventListener('pause', onPause); mq.removeEventListener('change', onOrient) }
  }, [film])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { held.current = false; v.play().catch(() => {}) } else { held.current = true; v.pause() }
  }

  return (
    <>
      <motion.div className="film-inner" style={scale ? { scale } : undefined}>
        <div className={drift ? 'drift' : undefined}>
        {/* The still frame, in the shape that fits the screen. It is the first thing painted. */}
        <picture>
          <source media={TALL} srcSet={film.posterTall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={film.posterWide} alt="" aria-hidden="true" width={1920} height={1080} decoding="async" fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'} />
        </picture>
        <video ref={video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} data-on={on} />
        </div>
      </motion.div>
      {allowed && (
        <button type="button" onClick={toggle} className="film-toggle" aria-label={playing ? 'Pause the film' : 'Play the film'}>
          {playing ? <Pause size={16} fill="currentColor" strokeWidth={0} /> : <Play size={16} fill="currentColor" strokeWidth={0} />}
        </button>
      )}
    </>
  )
}
