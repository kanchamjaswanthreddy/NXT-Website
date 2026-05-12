import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { blogPosts, CATEGORY_META } from '../data/blogPosts';

const ALL_CATEGORIES = ['All', ...Object.keys(CATEGORY_META)];

const FeaturedCard = ({ post }) => {
  const meta = CATEGORY_META[post.category];
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '48px' }}>
      <motion.div
        whileHover={{ y: -3, boxShadow: '0 20px 48px rgba(10,37,64,0.12)' }}
        transition={{ duration: 0.2 }}
        className="blog-featured-card"
        style={{
          background: '#fff',
          borderRadius: '20px',
          boxShadow: '0 4px 24px rgba(10,37,64,0.07)',
          border: '1px solid #e8eef5',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: 'clamp(28px, 5vw, 52px)' }}>
          <span style={{
            display: 'inline-block', padding: '4px 12px', borderRadius: '20px',
            fontSize: '0.74rem', fontWeight: 700, background: meta.bg, color: meta.color,
            marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em',
          }}>
            {post.category}
          </span>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#0a2540',
            lineHeight: 1.25, letterSpacing: '-0.03em', marginBottom: '16px',
          }}>
            {post.title}
          </h2>
          <p style={{ color: '#5a6a7a', fontSize: '1.05rem', lineHeight: 1.65, marginBottom: '28px', maxWidth: '520px' }}>
            {post.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8896a4', fontSize: '0.875rem' }}>
              <Clock size={14} /> {post.readTime} read
            </span>
            <span style={{ color: '#8896a4', fontSize: '0.875rem' }}>{post.date}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              color: meta.color, fontSize: '0.9rem', fontWeight: 600, marginLeft: 'auto',
            }}>
              Read article <ArrowRight size={15} />
            </span>
          </div>
        </div>
        <div className="blog-featured-accent" style={{
          background: `linear-gradient(145deg, ${meta.color}18 0%, ${meta.color}38 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px',
          minHeight: '240px',
        }}>
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: meta.color + '20', animation: 'pulse 3s ease-in-out infinite',
            }} />
            <div style={{
              position: 'absolute', inset: '20px', borderRadius: '50%',
              background: meta.color + '35',
            }} />
            <div style={{
              position: 'absolute', inset: '44px', borderRadius: '50%',
              background: meta.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800 }}>
                {post.category.charAt(0)}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const BlogCard = ({ post }) => {
  const meta = CATEGORY_META[post.category];
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <motion.div
        whileHover={{ y: -4, boxShadow: '0 16px 36px rgba(10,37,64,0.11)' }}
        transition={{ duration: 0.2 }}
        style={{
          background: '#fff',
          borderRadius: '16px',
          boxShadow: '0 2px 12px rgba(10,37,64,0.06)',
          border: '1px solid #e8eef5',
          borderTop: `4px solid ${meta.color}`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '24px 24px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{
            display: 'inline-block', padding: '3px 10px', borderRadius: '20px', alignSelf: 'flex-start',
            fontSize: '0.72rem', fontWeight: 700, background: meta.bg, color: meta.color,
            marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em',
          }}>
            {post.category}
          </span>
          <h3 style={{
            fontSize: '1.05rem', fontWeight: 700, color: '#0a2540', lineHeight: 1.4,
            marginBottom: '10px', letterSpacing: '-0.01em', flex: 1,
          }}>
            {post.title}
          </h3>
          <p style={{
            color: '#6b7a8d', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '18px',
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {post.excerpt}
          </p>
        </div>
        <div style={{
          padding: '14px 24px', borderTop: '1px solid #f0f4f8',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          color: '#8896a4', fontSize: '0.82rem',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={12} /> {post.readTime}
          </span>
          <span>{post.date}</span>
        </div>
      </motion.div>
    </Link>
  );
};

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? blogPosts
    : blogPosts.filter(p => p.category === activeCategory);

  const [featured, ...rest] = filtered;

  return (
    <PageTransition>
      <SEO
        title="Insurance Insights & Guides"
        description="Expert guides on life, health, home, auto, and business insurance. Make informed coverage decisions with NXT Financial Group's insurance knowledge center."
        canonical="/blog"
      />
      <main style={{ background: 'transparent', minHeight: '100vh', paddingBottom: '120px' }}>

        {/* Hero */}
        <section className="section-pad" style={{ paddingBottom: '40px' }}>
          <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="eyebrow">Knowledge Center</span>
              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: '#0a2540',
                lineHeight: 1.15, letterSpacing: '-0.03em', maxWidth: '640px', marginBottom: '16px',
              }}>
                Insights &amp; Guides
              </h1>
              <p style={{ fontSize: '1.1rem', color: '#5a6a7a', maxWidth: '540px', lineHeight: 1.65 }}>
                Expert perspectives on insurance, risk, and financial protection — written for people who want clarity, not jargon.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section style={{ paddingBottom: '40px' }}>
          <div className="container">
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {ALL_CATEGORIES.map(cat => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '8px 18px', borderRadius: '9999px',
                      fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                      border: isActive ? 'none' : '1.5px solid #dde4ed',
                      background: isActive ? '#0a2540' : '#fff',
                      color: isActive ? '#fff' : '#5a6a7a',
                      transition: 'all 0.15s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Articles */}
        <section>
          <div className="container">
            {featured && (
              <motion.div
                key={featured.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FeaturedCard post={featured} />
              </motion.div>
            )}

            {rest.length > 0 && (
              <div className="blog-cards-grid">
                {rest.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                  >
                    <BlogCard post={post} />
                  </motion.div>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#8896a4' }}>
                <p style={{ fontSize: '1.1rem' }}>No articles in this category yet.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Blog;
