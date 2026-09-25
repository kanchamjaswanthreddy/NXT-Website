import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NXT Financial Group — Independent Marketing Organization (IMO)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #080E28 0%, #0f1940 50%, #1a2660 100%)',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle grid */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(199,167,80,0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            display: 'flex',
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #C7A750, #e0c878, #C7A750)',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-2px',
              display: 'flex',
            }}
          >
            NXT Financial Group
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '2px',
                background: '#C7A750',
                display: 'flex',
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: '#C7A750',
                letterSpacing: '6px',
                textTransform: 'uppercase' as const,
                display: 'flex',
              }}
            >
              Independent Marketing Organization
            </div>
            <div
              style={{
                width: '60px',
                height: '2px',
                background: '#C7A750',
                display: 'flex',
              }}
            />
          </div>

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap: '60px',
              marginTop: '40px',
            }}
          >
            {[
              ['70+', 'Carriers'],
              ['6', 'Disciplines'],
              ['50', 'States'],
            ].map(([num, label]) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: 48, fontWeight: 900, color: '#C7A750', display: 'flex' }}>
                  {num}
                </div>
                <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)', display: 'flex' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '2px',
            display: 'flex',
          }}
        >
          nxtfinancialgroup.com
        </div>
      </div>
    ),
    { ...size }
  )
}
