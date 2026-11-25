'use client'
import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

const TALL = '(max-aspect-ratio: 4/5)'
const FILM = { wide: '/videos/montage-wide.mp4', tall: '/videos/montage-tall.mp4', posterWide: '/videos/montage-wide.jpg', posterTall: '/videos/montage-tall.jpg' }

/** The film's five scenes: what each one stands for, and the second at which it takes over. */
const SCENES = [
  { from: 0, label: 'Family, protected' },
  { from: 3.25, label: 'One advisor' },
  { from: 6.25, label: 'Income for life' },
  { from: 9.25, label: 'Care, on your terms' },
  { from: 12.25, label: 'A legacy that lands' },
  { from: 15.85, label: 'Family, protected' },
]

/**
 * The opening film, with a small caption that names the scene on screen. The first frame is in
 * the page from the start; the film is fetched after load, in the shape that fits the screen, and
 * stops when scrolled away. It never starts for visitors who ask for reduced motion or data
 * saving, and can always be paused.
 */
export default function HeroFilm() {
  const video = useRef<HTMLVideoElement>(null)
  const held = useRef(false)
  const [on, setOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [allowed, setAllowed] = useState(false)
  const [scene, setScene] = useState(0)

  useEffect(() => {
    const v = video.current
    if (!v) return
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData) return
    setAllowed(true)
    v.muted = true
    v.defaultMuted = true
    const mq = window.matchMedia(TALL)
    const pick = () => {
      const src = mq.matches ? FILM.tall : FILM.wide
      if (v.getAttribute('src') !== src) { v.src = src; v.load() }
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!v.getAttribute('src')) pick()
        if (!held.current) v.play().catch(() => {})
      } else v.pause()
    }, { rootMargin: '200px 0px' })
    io.observe(v)
    const onPlaying = () => { setOn(true); setPlaying(true) }
    const onPause = () => setPlaying(false)
    const onTime = () => {
      let i = 0
      for (let k = 0; k < SCENES.length; k++) if (v.currentTime >= SCENES[k].from) i = k
      setScene(i % 5)
    }
    const onShape = () => { if (v.getAttribute('src')) { pick(); if (!held.current) v.play().catch(() => {}) } }
    v.addEventListener('playing', onPlaying)
    v.addEventListener('pause', onPause)
    v.addEventListener('timeupdate', onTime)
    mq.addEventListener('change', onShape)
    return () => { io.disconnect(); v.removeEventListener('playing', onPlaying); v.removeEventListener('pause', onPause); v.removeEventListener('timeupdate', onTime); mq.removeEventListener('change', onShape) }
  }, [])

  const toggle = () => {
    const v = video.current
    if (!v) return
    if (v.paused) { held.current = false; v.play().catch(() => {}) } else { held.current = true; v.pause() }
  }

  return (
    <>
      <div className="pv-hero-film">
        <picture>
          <source media={TALL} srcSet={FILM.posterTall} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FILM.posterWide} alt="" width={1920} height={1080} decoding="async" fetchPriority="high" />
        </picture>
        <video ref={video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} data-on={on} />
      </div>
      <div className="pv-scene pv-brk" aria-hidden="true">
        <span className="pv-mono">On screen</span>
        <span className="pv-scene-n">0{scene + 1}<i>/05</i></span>
        <span className="pv-scene-t" key={scene}>{SCENES[scene].label}</span>
      </div>
      {allowed && (
        <button type="button" onClick={toggle} className="pv-film-toggle" aria-label={playing ? 'Pause the film' : 'Play the film'}>
          {playing ? <Pause size={14} fill="currentColor" strokeWidth={0} /> : <Play size={14} fill="currentColor" strokeWidth={0} />}
        </button>
      )}
    </>
  )
}
