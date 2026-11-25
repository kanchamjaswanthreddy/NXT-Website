import { allCarriers } from '@/lib/carriers'

/**
 * One dot per carrier in the site's own list (lib/carriers.ts).
 * `one` lights a single dot, a captive agent's shelf; `all` lights every dot in a slow wave.
 */
export default function CarrierDots({ mode }: { mode: 'one' | 'all' }) {
  return (
    <div>
      <ul className={`dot-grid ${mode === 'all' ? 'dot-grid-all' : 'dot-grid-one'}`} aria-hidden="true">
        {allCarriers.map((c, i) => (
          <li key={c.slug} className={mode === 'all' || i === 0 ? 'is-lit' : ''} style={mode === 'all' ? { animationDelay: `${(i % 23) * 90 + Math.floor(i / 23) * 220}ms` } : undefined} />
        ))}
      </ul>
      <p className="dot-cap">{mode === 'all' ? 'Every dot is a carrier on our list.' : 'One carrier.'}</p>
    </div>
  )
}
