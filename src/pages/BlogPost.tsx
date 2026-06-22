import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { blogPosts, CATEGORY_META } from '../data/blogPosts'
import SEO from '../components/SEO'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)
  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  if (!post) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '80px 48px', textAlign: 'center' }}>
        <h1 className="text-h2-md">Article Not Found</h1>
        <Link to="/blog" className="btn btn-teal">Back to Blog</Link>
      </div>
    )
  }

  const catMeta = CATEGORY_META[post.category] ?? { color: '#333', bg: '#f0f0f0' }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        ogImage={post.heroImage}
        ogType="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          image: post.heroImage,
          datePublished: post.date,
          author: {
            '@type': 'Organization',
            name: 'NXT Financial Group',
          },
          publisher: {
            '@type': 'Organization',
            name: 'NXT Financial Group',
            logo: {
              '@type': 'ImageObject',
              url: 'https://www.nxtfinancialgroup.com/logo.png',
            },
          },
        }}
      />
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="post-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '460px',
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <img
          src={post.heroImage}
          alt=""
          aria-hidden="true"
          width={1600}
          height={600}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '48px 48px 60px' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'rgba(255,255,255,0.8)',
              textDecoration: 'none',
              fontSize: '14px',
              marginBottom: '16px',
            }}
          >
            <ArrowLeft size={14} /> Blog
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '3px 12px',
                borderRadius: '32px',
                fontSize: '12px',
                fontWeight: 600,
                background: catMeta.bg,
                color: catMeta.color,
              }}
            >
              {post.category}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
              <Clock size={12} /> {post.readTime}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
              <Calendar size={12} /> {post.date}
            </span>
          </div>
          <h1 id="post-heading" className="text-hero" style={{ maxWidth: '720px', fontSize: '46px', lineHeight: '56px' }}>
            {post.title}
          </h1>
        </div>
      </section>

      {/* ── ARTICLE BODY ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '64px', alignItems: 'start' }}>
            {/* Article content */}
            <article>
              <p className="text-body" style={{ color: '#444', fontSize: '18px', lineHeight: '30px', marginBottom: '32px', fontStyle: 'italic', borderLeft: '3px solid #2c5b54', paddingLeft: '20px' }}>
                {post.excerpt}
              </p>

              {post.body.map((block, i) => {
                if (block.type === 'p') {
                  return (
                    <p key={i} className="text-body" style={{ color: '#333', fontSize: '17px', lineHeight: '28px', marginBottom: '24px' }}>
                      {block.text}
                    </p>
                  )
                }
                if (block.type === 'h2') {
                  return (
                    <h2 key={i} style={{ fontFamily: 'Poppins, sans-serif', fontSize: '26px', fontWeight: 500, color: '#000', marginBottom: '16px', marginTop: '40px' }}>
                      {block.text}
                    </h2>
                  )
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} style={{ margin: '0 0 24px', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {block.items.map((item, j) => (
                        <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <span
                            style={{
                              flexShrink: 0,
                              width: '8px',
                              height: '8px',
                              borderRadius: '50%',
                              background: '#2c5b54',
                              marginTop: '8px',
                            }}
                          />
                          <span className="text-body" style={{ color: '#444', fontSize: '17px', lineHeight: '26px' }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }
                if (block.type === 'callout') {
                  return (
                    <div
                      key={i}
                      style={{
                        background: '#f7f6f2',
                        borderLeft: '4px solid #2c5b54',
                        padding: '20px 24px',
                        borderRadius: '0 8px 8px 0',
                        margin: '32px 0',
                      }}
                    >
                      <p className="text-body" style={{ color: '#333', fontSize: '17px', lineHeight: '27px', fontStyle: 'italic', margin: 0 }}>
                        {block.text}
                      </p>
                    </div>
                  )
                }
                return null
              })}

              <div style={{ marginTop: '48px', paddingTop: '32px', borderTop: '1px solid #d0d5dd' }}>
                <h3 className="text-card-heading" style={{ fontSize: '18px', marginBottom: '12px', color: '#000' }}>
                  Ready to review your coverage?
                </h3>
                <p className="text-body" style={{ color: '#555', marginBottom: '20px' }}>
                  Speak with an NXT Financial advisor today — no obligation, no pressure.
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Link to="/contact" className="btn btn-teal" style={{ padding: '12px 28px', fontSize: '16px' }}>
                    Get a Free Quote
                  </Link>
                  <Link to="/insurances" className="btn btn-outline-teal" style={{ padding: '12px 28px', fontSize: '16px' }}>
                    Explore Coverage
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '88px' }}>
              <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
                <h3 className="text-card-heading" style={{ fontSize: '16px', marginBottom: '16px', color: '#000' }}>
                  Get covered today
                </h3>
                <p className="text-body-sm" style={{ color: '#666', marginBottom: '16px' }}>
                  Our advisors shop 104+ carriers to find the best rate for your needs.
                </p>
                <Link to="/contact" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: '15px' }}>
                  Request a Quote
                </Link>
              </div>

              <div>
                <h3 className="text-card-heading" style={{ fontSize: '16px', marginBottom: '16px', color: '#000' }}>
                  Related articles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {related.map((rp) => (
                    <Link key={rp.slug} to={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <div
                        className="card"
                        style={{
                          padding: '16px',
                          transition: 'border-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      >
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '2px 8px',
                            borderRadius: '32px',
                            fontSize: '10px',
                            fontWeight: 600,
                            background: CATEGORY_META[rp.category]?.bg ?? '#f0f0f0',
                            color: CATEGORY_META[rp.category]?.color ?? '#333',
                            marginBottom: '8px',
                          }}
                        >
                          {rp.category}
                        </span>
                        <p className="text-body-sm" style={{ color: '#333', fontWeight: 500, lineHeight: '20px' }}>
                          {rp.title}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
