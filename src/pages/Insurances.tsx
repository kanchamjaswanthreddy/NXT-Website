import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { products, categoryNames } from '../data/products'

const CATEGORY_HEROES: Record<number, string> = {
  1: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=70',
  2: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=70',
  3: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=70',
  4: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=70',
}

export default function Insurances() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="ins-hero-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '420px',
          display: 'flex',
          alignItems: 'center',
          background: '#1c3f39',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={600}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.25 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 48px' }}>
          <span
            className="text-body-sm"
            style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
          >
            Coverage Solutions
          </span>
          <h1 id="ins-hero-heading" className="text-hero" style={{ maxWidth: '620px', marginBottom: '20px' }}>
            Comprehensive Coverage Categories
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', fontSize: '18px', lineHeight: '28px' }}>
            Explore all 17 insurance products across 4 coverage categories. Every policy is shopped against our full carrier panel to find the best value.
          </p>
        </div>
      </section>

      {/* ── CATEGORY SECTIONS ─────────────────────────────────── */}
      {[1, 2, 3, 4].map((catIdx) => {
        const catProducts = products.filter((p) => p.categoryIndex === catIdx)
        const isLight = catIdx % 2 === 1
        return (
          <section
            key={catIdx}
            aria-labelledby={`cat-${catIdx}-heading`}
            className="section-pad"
            style={{ background: isLight ? '#ffffff' : '#f7f6f2' }}
          >
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '48px', alignItems: 'start' }}>
                {/* Category info */}
                <div style={{ position: 'sticky', top: '88px' }}>
                  <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', aspectRatio: '4/3' }}>
                    <img
                      src={CATEGORY_HEROES[catIdx]}
                      alt={categoryNames[catIdx]}
                      width={280}
                      height={210}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      background: '#2c5b54',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      padding: '4px 12px',
                      borderRadius: '32px',
                      marginBottom: '10px',
                    }}
                  >
                    Category {catIdx}
                  </span>
                  <h2 id={`cat-${catIdx}-heading`} className="text-h2-md" style={{ fontSize: '28px', lineHeight: '36px' }}>
                    {categoryNames[catIdx]}
                  </h2>
                </div>

                {/* Product grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
                  {catProducts.map(({ slug, title, shortDescription }) => (
                    <Link
                      key={slug}
                      to={`/insurance/${slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="card"
                        style={{
                          padding: '28px 24px',
                          height: '100%',
                          transition: 'border-color 0.2s ease',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      >
                        <h3 className="text-card-heading" style={{ marginBottom: '10px', color: '#000', fontSize: '18px' }}>{title}</h3>
                        <p className="text-body-sm" style={{ color: '#666', marginBottom: '16px' }}>{shortDescription}</p>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            color: '#2c5b54',
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px',
                          }}
                        >
                          Learn more <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#1c3f39' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '46px',
              fontWeight: 500,
              lineHeight: '56px',
              letterSpacing: '-0.92px',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Not sure which coverage you need?
          </h2>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '480px', margin: '0 auto 36px', fontSize: '17px' }}>
            Our advisors will assess your risk profile and recommend the right combination of coverage — at no obligation.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-light">Speak with an Advisor</Link>
            <Link to="/carriers" className="btn btn-outline">Our Carrier Network</Link>
          </div>
        </div>
      </section>
    </>
  )
}
