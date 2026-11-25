'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const SRC = '/videos/hero-wide.mp4'
const POSTER = '/videos/hero-wide.jpg'

/**
 * The closing wordmark: the opening shoreline again, seen through the letters N X T. The still is
 * in the page from the start; the film is fetched when the footer comes near, stops when it is
 * out of view, never starts for reduced motion or data saving, and can be paused.
 *
 * How the letters are cut: the film sits underneath, and over it a sheet in the footer's own
 * colour carries the letters in white with mix-blend-mode: darken. Darken keeps the darker of the
 * two layers, so the white letters give way to the film and the dark sheet stays as it is.
 */
export default function FootFilm() {
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
    v.muted = true
    v.defaultMuted = true
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!v.getAttribute('src')) { v.src = SRC; v.load() }
        if (!held.current) v.play().catch(() => {})
      } else v.pause()
    }, { rootMargin: '300px 0px' })
    io.observe(v)
    const onPlaying = () => { setOn(true); setPlaying(true) }
    const onPause = () => setPlaying(false)
    v.addEventListener('playing', onPlaying)
    v.addEventListener('pause', onPause)
    return () => { io.disconnect(); v.removeEventListener('playing', onPlaying); v.removeEventListener('pause', onPause) }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { held.current = false; v.play().catch(() => {}) } else { held.current = true; v.pause() }
  }

  return (
    <div className="pv-foot-wm">
      <div className="pv-foot-film" aria-hidden="true">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={POSTER} alt="" width={1920} height={1080} loading="lazy" decoding="async" />
          <video ref={video} muted loop playsInline preload="none" tabIndex={-1} data-on={on} />
        </div>
      </div>
      <p className="pv-foot-wm-t" aria-hidden="true"><span>NXT</span></p>
      {allowed && (
        <button type="button" onClick={toggle} className="pv-film-toggle pv-foot-toggle" aria-label={playing ? 'Pause the film in the footer' : 'Play the film in the footer'}>
          {playing ? <Pause size={14} fill="currentColor" strokeWidth={0} /> : <Play size={14} fill="currentColor" strokeWidth={0} />}
        </button>
      )}
    </div>
  )
}
