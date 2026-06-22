import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts, CATEGORY_META } from '../data/blogPosts'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="blog-hero-heading"
        style={{
          background: '#1c3f39',
          minHeight: '340px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={500}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '80px 48px' }}>
          <h1 id="blog-hero-heading" className="text-hero" style={{ maxWidth: '560px', marginBottom: '16px' }}>
            Insights & Guidance
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '480px', fontSize: '17px', lineHeight: '27px' }}>
            Expert articles on insurance, risk management, and financial protection — written for real people, not actuaries.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTER ───────────────────────────────────── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #d0d5dd', padding: '16px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '7px 18px',
                  borderRadius: '32px',
                  border: activeCategory === cat ? '1.5px solid #2c5b54' : '1.5px solid #d0d5dd',
                  background: activeCategory === cat ? '#2c5b54' : '#ffffff',
                  color: activeCategory === cat ? '#ffffff' : '#333',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          {/* Featured card */}
          {featured && (
            <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
              <div
                className="card"
                style={{
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
              >
                <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    width={600}
                    height={450}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '3px 12px',
                        borderRadius: '32px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: CATEGORY_META[featured.category]?.bg ?? '#f0f0f0',
                        color: CATEGORY_META[featured.category]?.color ?? '#333',
                      }}
                    >
                      {featured.category}
                    </span>
                    <span className="text-body-sm" style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-card-heading" style={{ fontSize: '22px', lineHeight: '30px', color: '#000', marginBottom: '12px' }}>
                    {featured.title}
                  </h2>
                  <p className="text-body" style={{ color: '#555', marginBottom: '20px' }}>{featured.excerpt}</p>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      color: '#2c5b54',
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 500,
                      fontSize: '15px',
                    }}
                  >
                    Read article <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Article grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {rest.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="card"
                  style={{
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'border-color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                >
                  <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      width={400}
                      height={225}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '2px 10px',
                          borderRadius: '32px',
                          fontSize: '11px',
                          fontWeight: 600,
                          background: CATEGORY_META[post.category]?.bg ?? '#f0f0f0',
                          color: CATEGORY_META[post.category]?.color ?? '#333',
                        }}
                      >
                        {post.category}
                      </span>
                      <span className="text-body-sm" style={{ color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-card-heading" style={{ fontSize: '17px', lineHeight: '24px', color: '#000', marginBottom: '10px' }}>
                      {post.title}
                    </h3>
                    <p className="text-body-sm" style={{ color: '#666', flex: 1, marginBottom: '16px' }}>{post.excerpt}</p>
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
                      Read more <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
