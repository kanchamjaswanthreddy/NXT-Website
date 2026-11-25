'use client'
import { useTransform, type MotionValue } from 'framer-motion'

/**
 * A clamped straight-line ramp of a scroll value: `from` at `a`, `to` at `b`, held outside.
 *
 * Use this instead of the array form of useTransform for anything tied to scrolling. With arrays,
 * the animation library hands opacity, clip-path and filter to the browser's own scroll timeline,
 * and the browser then eases back towards the element's resting style after the last stop, so a
 * line faded in at 80% would fade out again by 100%. The function form keeps the value in script,
 * where it stays put.
 */
export function useRamp(value: MotionValue<number>, [a, b]: [number, number], [from, to]: [number, number]): MotionValue<number> {
  return useTransform(value, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)))
    return from + (to - from) * t
  })
}
