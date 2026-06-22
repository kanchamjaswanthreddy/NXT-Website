import { useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { stateNames } from '../../data/carriers'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// State FIPS → abbreviation lookup
const FIPS_TO_STATE: Record<string, string> = {
  '01':'AL','02':'AK','04':'AZ','05':'AR','06':'CA','08':'CO','09':'CT','10':'DE',
  '12':'FL','13':'GA','15':'HI','16':'ID','17':'IL','18':'IN','19':'IA','20':'KS',
  '21':'KY','22':'LA','23':'ME','24':'MD','25':'MA','26':'MI','27':'MN','28':'MS',
  '29':'MO','30':'MT','31':'NE','32':'NV','33':'NH','34':'NJ','35':'NM','36':'NY',
  '37':'NC','38':'ND','39':'OH','40':'OK','41':'OR','42':'PA','44':'RI','45':'SC',
  '46':'SD','47':'TN','48':'TX','49':'UT','50':'VT','51':'VA','53':'WA','54':'WV',
  '55':'WI','56':'WY',
}

interface Props {
  selectedState?: string
  onStateSelect?: (abbr: string) => void
}

export default function UsaMap({ selectedState, onStateSelect }: Props) {
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null)

  return (
    <div style={{ position: 'relative', background: '#f7f6f2', borderRadius: '12px', padding: '16px', border: '1px solid #d0d5dd' }}>
      {tooltip && (
        <div
          style={{
            position: 'absolute',
            left: tooltip.x,
            top: tooltip.y,
            background: '#1c3f39',
            color: '#ffffff',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            pointerEvents: 'none',
            zIndex: 10,
            whiteSpace: 'nowrap',
            transform: 'translate(-50%, -110%)',
          }}
        >
          {tooltip.name}
        </div>
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo: any) => {
              const fips = geo.id?.toString().padStart(2, '0') ?? ''
              const abbr = FIPS_TO_STATE[fips] ?? ''
              const isSelected = abbr === selectedState

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => abbr && onStateSelect?.(abbr)}
                  onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                    if (!abbr) return
                    const svgRect = (e.target as SVGElement).closest('div')?.getBoundingClientRect()
                    if (svgRect) {
                      setTooltip({
                        name: stateNames[abbr] ?? abbr,
                        x: e.clientX - svgRect.left,
                        y: e.clientY - svgRect.top,
                      })
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  style={{
                    default: {
                      fill: isSelected ? '#2c5b54' : '#c8ddd9',
                      stroke: '#ffffff',
                      strokeWidth: 0.8,
                      outline: 'none',
                      cursor: abbr ? 'pointer' : 'default',
                      transition: 'fill 0.15s ease',
                    },
                    hover: {
                      fill: isSelected ? '#2c5b54' : '#4a7c6b',
                      stroke: '#ffffff',
                      strokeWidth: 0.8,
                      outline: 'none',
                      cursor: 'pointer',
                    },
                    pressed: {
                      fill: '#1c3f39',
                      outline: 'none',
                    },
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>

      {selectedState && (
        <div style={{ textAlign: 'center', marginTop: '8px' }}>
          <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#2c5b54', fontWeight: 600 }}>
            {stateNames[selectedState]} — All 104+ carriers available
          </span>
        </div>
      )}
    </div>
  )
}
