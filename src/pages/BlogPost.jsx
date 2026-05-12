import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { blogPosts, CATEGORY_META } from '../data/blogPosts';

const BodyRenderer = ({ body, accentColor }) => {
  return (
    <div style={{ color: '#3d4f61', fontSize: '1.05rem', lineHeight: 1.8 }}>
      {body.map((block, i) => {
        if (block.type === 'p') {
          return (
            <p key={i} style={{ marginBottom: '1.4em' }}>
              {block.text}
            </p>
          );
        }
        if (block.type === 'h2') {
          return (
            <h2 key={i} style={{
              fontSize: '1.3rem', fontWeight: 700, color: '#0a2540',
              letterSpacing: '-0.02em', marginTop: '2.4em', marginBottom: '0.75em',
              lineHeight: 1.3,
            }}>
              {block.text}
            </h2>
          );
        }
        if (block.type === 'ul') {
          return (
            <ul key={i} style={{ marginBottom: '1.4em', paddingLeft: '0', listStyle: 'none' }}>
              {block.items.map((item, j) => (
                <li key={j} style={{
                  display: 'flex', gap: '12px', alignItems: 'flex-start',
                  marginBottom: '0.65em',
                }}>
                  <span style={{
                    display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%',
                    background: accentColor, flexShrink: 0, marginTop: '10px',
                  }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'callout') {
          return (
            <div key={i} style={{
              borderLeft: `4px solid ${accentColor}`,
              background: accentColor + '10',
              borderRadius: '0 12px 12px 0',
              padding: '18px 24px',
              margin: '2em 0',
              color: '#2d3f51',
              fontSize: '0.98rem',
              lineHeight: 1.7,
              fontStyle: 'italic',
            }}>
              {block.text}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const meta = CATEGORY_META[post.category];
  const related = blogPosts.filter(p => p.slug !== slug).slice(0, 3);

  return (
    <PageTransition>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
      />
      <main style={{ background: 'transparent', paddingBottom: '120px' }}>

        {/* Back nav */}
        <div className="container" style={{ paddingTop: '40px' }}>
          <Link
            to="/blog"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              color: '#5a6a7a', fontSize: '0.9rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#0a2540'}
            onMouseLeave={e => e.currentTarget.style.color = '#5a6a7a'}
          >
            <ArrowLeft size={16} /> Back to Insights
          </Link>
        </div>

        {/* Article header */}
        <section style={{ paddingTop: '36px', paddingBottom: '48px' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ maxWidth: '760px' }}
            >
              <span style={{
                display: 'inline-block', padding: '5px 14px', borderRadius: '20px',
                fontSize: '0.76rem', fontWeight: 700, background: meta.bg, color: meta.color,
                marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {post.category}
              </span>
              <h1 style={{
                fontSize: 'clamp(1.85rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0a2540',
                lineHeight: 1.2, letterSpacing: '-0.03em', marginBottom: '20px',
              }}>
                {post.title}
              </h1>
              <p style={{ fontSize: '1.15rem', color: '#5a6a7a', lineHeight: 1.65, marginBottom: '28px' }}>
                {post.excerpt}
              </p>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap',
                paddingBottom: '28px', borderBottom: '2px solid #e8eef5',
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#5a6a7a', fontSize: '0.9rem' }}>
                  <User size={15} /> {post.author}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#5a6a7a', fontSize: '0.9rem' }}>
                  <Clock size={15} /> {post.readTime} read
                </span>
                <span style={{ color: '#5a6a7a', fontSize: '0.9rem' }}>{post.date}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Article body */}
        <section>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ maxWidth: '720px' }}
            >
              <BodyRenderer body={post.body} accentColor={meta.color} />
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ margin: '64px 0 0' }}>
          <div className="container">
            <div style={{ maxWidth: '720px' }}>
              <div style={{
                background: '#0a2540', borderRadius: '20px', padding: 'clamp(28px, 5vw, 48px)',
                display: 'flex', flexWrap: 'wrap', alignItems: 'center',
                justifyContent: 'space-between', gap: '24px',
              }}>
                <div>
                  <p style={{ color: '#adbdcc', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Ready to review your coverage?
                  </p>
                  <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>
                    Talk to an advisor today — no pressure, just answers.
                  </h3>
                </div>
                <Link to="/contact" className="btn-primary" style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                  Get a Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section style={{ marginTop: '80px' }}>
            <div className="container">
              <h2 style={{
                fontSize: '1.5rem', fontWeight: 700, color: '#0a2540',
                letterSpacing: '-0.02em', marginBottom: '28px',
              }}>
                More Insights
              </h2>
              <div className="blog-cards-grid">
                {related.map((p, i) => {
                  const rm = CATEGORY_META[p.category];
                  return (
                    <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: i * 0.07 }}
                        whileHover={{ y: -3, boxShadow: '0 12px 32px rgba(10,37,64,0.1)' }}
                        style={{
                          background: '#fff', borderRadius: '14px',
                          boxShadow: '0 2px 12px rgba(10,37,64,0.06)',
                          border: '1px solid #e8eef5',
                          borderTop: `4px solid ${rm.color}`,
                          padding: '24px',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <span style={{
                          display: 'inline-block', padding: '3px 10px', borderRadius: '20px',
                          fontSize: '0.72rem', fontWeight: 700, background: rm.bg, color: rm.color,
                          marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.04em',
                        }}>
                          {p.category}
                        </span>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.4, marginBottom: '8px' }}>
                          {p.title}
                        </h3>
                        <div style={{ display: 'flex', gap: '14px', color: '#8896a4', fontSize: '0.8rem', marginTop: '14px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} /> {p.readTime}
                          </span>
                          <span>{p.date}</span>
                        </div>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </main>
    </PageTransition>
  );
};

export default BlogPost;
