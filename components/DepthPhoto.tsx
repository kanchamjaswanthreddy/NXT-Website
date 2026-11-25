'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { createDepthRenderer, type DepthRenderer } from '@/lib/depth-gl'

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v))

/**
 * A photograph that fills its parent and has depth: it shifts like a slow camera as the page
 * scrolls past and leans slightly towards the pointer. Without a depth map, without WebGL, or
 * with reduced motion it is simply the photograph.
 */
export default function DepthPhoto({ src, depth, alt, sizes, priority = false, strength = 1 }: { src: string; depth?: string; alt: string; sizes: string; priority?: boolean; strength?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = box.current
    const c = canvas.current
    if (!depth || !el || !c) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let r: DepthRenderer | null = null
    let raf = 0
    let visible = false
    let px = 0, py = 0, tx = 0, ty = 0
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!r || !visible || !r.ready(0)) return
      px += (tx - px) * 0.05
      py += (ty - py) * 0.05
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // -1 when the photograph is just below the screen, 1 when it has just left the top.
      const travel = clamp(((vh - rect.top) / (vh + rect.height)) * 2 - 1, -1, 1)
      r.draw({ a: 0, b: 0, mix: 0, x: px * strength, y: (py * 0.5 + travel * 1.5) * strength, zoom: 1.06 + 0.03 * (travel + 1) })
    }
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !r) {
        r = createDepthRenderer(c, [{ src: el.querySelector('img')?.currentSrc || src, depth }], () => setOn(true))
        r?.resize()
      }
    }, { rootMargin: '300px 0px' })
    io.observe(el)
    const ro = new ResizeObserver(() => r?.resize())
    ro.observe(el)
    const onMove = (e: PointerEvent) => {
      const b = el.getBoundingClientRect()
      tx = clamp(((e.clientX - b.left) / b.width - 0.5) * 2, -1.3, 1.3)
      ty = clamp(((e.clientY - b.top) / b.height - 0.5) * 2, -1.3, 1.3)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); io.disconnect(); ro.disconnect(); window.removeEventListener('pointermove', onMove); r?.dispose(); setOn(false) }
  }, [src, depth, strength])

  return (
    <div ref={box} className="depth-photo">
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {depth && <canvas ref={canvas} aria-hidden="true" data-on={on} />}
    </div>
  )
}
