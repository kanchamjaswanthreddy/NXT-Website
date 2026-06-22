import { Link, useParams } from 'react-router-dom'
import { Check, ArrowLeft, Phone } from 'lucide-react'
import { getProductBySlug } from '../data/products'
import SEO from '../components/SEO'

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '80px 48px', textAlign: 'center' }}>
        <h1 className="text-h2-md">Coverage Not Found</h1>
        <p className="text-body" style={{ color: '#555' }}>We couldn't find that insurance product.</p>
        <Link to="/insurances" className="btn btn-teal">View All Coverage</Link>
      </div>
    )
  }

  return (
    <>
      <SEO
        title={product.title}
        description={product.shortDescription}
        canonical={`/insurance/${product.slug}`}
        ogImage={product.heroImage}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.title,
          description: product.shortDescription,
          image: product.heroImage,
          brand: {
            '@type': 'Organization',
            name: 'NXT Financial Group',
          },
        }}
      />
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="product-heading"
        className="flex items-center relative overflow-hidden min-h-[400px] md:min-h-[480px]"
      >
        <img
          src={product.heroImage}
          alt=""
          aria-hidden="true"
          width={1600}
          height={600}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
        <div className="container relative z-10 px-6 py-12 md:py-24 md:px-12">
          <Link
            to="/insurances"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              marginBottom: '20px',
            }}
          >
            <ArrowLeft size={14} /> All Coverage
          </Link>
          <span
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              padding: '4px 12px',
              borderRadius: '32px',
              marginBottom: '12px',
            }}
          >
            {product.category}
          </span>
          <h1 id="product-heading" className="text-hero" style={{ maxWidth: '620px' }}>
            {product.title}
          </h1>
        </div>
      </section>

      {/* ── CONTENT ───────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">
            {/* Main content */}
            <div>
              <h2 className="text-h2-md" style={{ fontSize: '32px', lineHeight: '40px', marginBottom: '20px' }}>
                Overview
              </h2>
              <p className="text-body" style={{ color: '#444', fontSize: '17px', lineHeight: '28px', marginBottom: '40px' }}>
                {product.overview}
              </p>

              <h3 className="text-card-heading" style={{ marginBottom: '20px', color: '#000' }}>
                Key Benefits
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12 m-0 p-0 list-none">
                {product.benefits.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: '22px',
                        height: '22px',
                        background: '#2c5b54',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '1px',
                      }}
                    >
                      <Check size={12} color="#fff" />
                    </span>
                    <span className="text-body" style={{ color: '#444' }}>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="card-beige" style={{ padding: '28px 32px' }}>
                <h4 className="text-card-heading" style={{ fontSize: '20px', marginBottom: '10px', color: '#000' }}>
                  Ready to get a quote?
                </h4>
                <p className="text-body" style={{ color: '#555', marginBottom: '20px' }}>
                  Our advisors will shop {product.title.toLowerCase()} quotes from multiple carriers to find the best value for your specific situation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn btn-teal" style={{ padding: '12px 28px', fontSize: '16px' }}>
                    Get a Quote
                  </Link>
                  <a href="tel:8572053333" className="btn btn-outline-teal" style={{ padding: '12px 28px', fontSize: '16px' }}>
                    <Phone size={15} /> 857-205-3333
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '88px' }}>
              <div className="card" style={{ padding: '32px', marginBottom: '20px' }}>
                <h3 className="text-card-heading" style={{ fontSize: '18px', marginBottom: '20px', color: '#000' }}>
                  Speak with an advisor
                </h3>
                <p className="text-body-sm" style={{ color: '#666', marginBottom: '20px' }}>
                  Get a personalized {product.title.toLowerCase()} quote in minutes. No obligation, no pressure.
                </p>
                <Link to="/contact" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', padding: '14px 20px', marginBottom: '12px' }}>
                  Request a Quote
                </Link>
                <a
                  href="tel:8572053333"
                  className="btn btn-outline-teal"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 20px' }}
                >
                  <Phone size={15} /> 857-205-3333
                </a>
              </div>

              <div className="card-beige" style={{ padding: '28px' }}>
                <h4 className="text-card-heading" style={{ fontSize: '16px', marginBottom: '12px', color: '#000' }}>
                  Why shop with NXT Financial?
                </h4>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    '104+ top-rated carriers',
                    'Zero broker fees',
                    'Same-day coverage available',
                    'Annual policy reviews',
                  ].map((item) => (
                    <li key={item} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                      <Check size={14} color="#2c5b54" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span className="text-body-sm" style={{ color: '#444' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
