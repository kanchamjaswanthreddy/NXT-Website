'use client'
import { useMemo, useState } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'
import us from 'us-atlas/states-10m.json'
import { stateNames } from '@/lib/carriers'

const FIPS: Record<string, string> = { '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT','10':'DE','12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN','19':'IA','20':'KS','21':'KY','22':'LA','23':'ME','24':'MD','25':'MA','26':'MI','27':'MN','28':'MS','29':'MO','30':'MT','31':'NE','32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY','37':'NC','38':'ND','39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC','46':'SD','47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV','55':'WI','56':'WY' }

export default function UsaMap({ selected, onSelect }: { selected: string; onSelect: (s: string) => void }) {
  const [hover, setHover] = useState('')
  const shapes = useMemo(() => {
    const topo = us as unknown as Topology<{ states: GeometryCollection }>
    const fc = feature(topo, topo.objects.states) as unknown as FeatureCollection<Geometry, { name: string }>
    const path = geoPath(geoAlbersUsa().scale(1150).translate([480, 300]))
    return fc.features.map((f) => ({ abbr: FIPS[String(f.id).padStart(2, '0')], d: path(f) ?? '' })).filter((s) => s.abbr)
  }, [])
  const label = hover || selected
  return (
    <div className="card relative overflow-hidden rounded-[24px] p-4">
      <p className="mono absolute left-5 top-4 text-sm text-navy" aria-live="polite">{label ? stateNames[label] : 'Select a state'}</p>
      <svg viewBox="0 0 960 600" className="h-auto w-full" role="group" aria-label="United States map">
        {shapes.map(({ abbr, d }) => {
          const on = selected === abbr
          return (
            <path key={abbr} d={d} tabIndex={0} role="button" aria-label={stateNames[abbr]} aria-pressed={on}
              onMouseEnter={() => setHover(abbr)} onMouseLeave={() => setHover('')} onFocus={() => setHover(abbr)} onBlur={() => setHover('')}
              onClick={() => onSelect(on ? '' : abbr)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(on ? '' : abbr) } }}
              fill={on ? '#C09010' : hover === abbr ? '#243D8A' : '#1B3272'} stroke="#F5F4F0" strokeWidth={0.8} style={{ cursor: 'pointer', outline: 'none', transition: 'fill .15s ease' }} />
          )
        })}
      </svg>
    </div>
  )
}
