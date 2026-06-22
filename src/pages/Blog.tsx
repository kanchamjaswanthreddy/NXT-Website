import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock } from 'lucide-react'
import { blogPosts, CATEGORY_META } from '../data/blogPosts'
import SEO from '../components/SEO'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory)

  const [featured, ...rest] = filtered

  return (
    <>
      <SEO
        title="Insurance Blog & Insights"
        description="Expert insurance insights, tips, and industry news from NXT Financial Group. Learn how to protect your family, home, business, and assets."
        canonical="/blog"
      />
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="blog-hero-heading"
        className="flex items-center relative overflow-hidden"
        style={{
          background: '#1c3f39',
          minHeight: '340px',
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
        <div className="container relative z-10 px-6 py-12 md:py-20 md:px-12">
          <h1 id="blog-hero-heading" className="text-hero max-w-[560px] mb-4">
            Insights & Guidance
          </h1>
          <p className="text-body max-w-[480px]" style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', lineHeight: '27px' }}>
            Expert articles on insurance, risk management, and financial protection — written for real people, not actuaries.
          </p>
        </div>
      </section>

      {/* ── CATEGORY FILTER ───────────────────────────────────── */}
      <section style={{ background: '#ffffff', borderBottom: '1px solid #d0d5dd', padding: '16px 0' }}>
        <div className="container">
          <div className="flex flex-wrap gap-2">
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
                className="card grid grid-cols-1 md:grid-cols-2"
                style={{
                  overflow: 'hidden',
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
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-4">
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
                    <span className="text-body-sm flex items-center gap-1" style={{ color: '#888' }}>
                      <Clock size={12} /> {featured.readTime}
                    </span>
                  </div>
                  <h2 className="text-card-heading mb-3" style={{ fontSize: '22px', lineHeight: '30px', color: '#000' }}>
                    {featured.title}
                  </h2>
                  <p className="text-body mb-5" style={{ color: '#555' }}>{featured.excerpt}</p>
                  <span
                    className="inline-flex items-center gap-1.5"
                    style={{
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div
                  className="card flex flex-col h-full overflow-hidden"
                  style={{
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
                  <div className="flex-1 flex flex-col p-6">
                    <div className="flex items-center gap-2.5 mb-3">
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
                      <span className="text-body-sm flex items-center gap-1" style={{ color: '#888' }}>
                        <Clock size={11} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-card-heading mb-2.5" style={{ fontSize: '17px', lineHeight: '24px', color: '#000' }}>
                      {post.title}
                    </h3>
                    <p className="text-body-sm flex-1 mb-4" style={{ color: '#666' }}>{post.excerpt}</p>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
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
