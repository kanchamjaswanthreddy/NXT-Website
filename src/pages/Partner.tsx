import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Check } from 'lucide-react'

const BENEFITS = [
  'Access to our full carrier panel of 104+ carriers',
  'Dedicated partner support and co-branding options',
  'Competitive commission structures',
  'Training and licensing support',
  'Technology platform access',
  'Joint marketing and referral programs',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '8px',
  border: '1px solid #d0d5dd',
  fontFamily: 'Inter, sans-serif',
  fontSize: '16px',
  background: '#ffffff',
  color: '#333',
  outline: 'none',
}

export default function Partner() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', type: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="partner-hero-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '440px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={700}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 48px' }}>
          <span
            className="text-body-sm"
            style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
          >
            Partner Program
          </span>
          <h1 id="partner-hero-heading" className="text-hero" style={{ maxWidth: '640px', marginBottom: '20px' }}>
            Grow your business with NXT Financial.
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '500px', fontSize: '18px', lineHeight: '28px' }}>
            Whether you're an independent agent, financial advisor, or real estate professional, our partnership programs are designed to expand your reach and revenue.
          </p>
        </div>
      </section>

      {/* ── BENEFITS + FORM ───────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            {/* Benefits */}
            <div>
              <h2 className="text-h2-md" style={{ marginBottom: '20px', fontSize: '32px', lineHeight: '40px' }}>
                Why partner with us?
              </h2>
              <p className="text-body" style={{ color: '#555', marginBottom: '32px', fontSize: '17px', lineHeight: '27px' }}>
                NXT Financial's partner program gives independent agents, financial advisors, and other professionals access to our full suite of carrier relationships, technology, and support infrastructure.
              </p>
              <ul style={{ listStyle: 'none', margin: '0 0 36px', padding: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {BENEFITS.map((b) => (
                  <li key={b} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
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
                        marginTop: '2px',
                      }}
                    >
                      <Check size={12} color="#fff" />
                    </span>
                    <span className="text-body" style={{ color: '#444' }}>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="card-beige" style={{ padding: '24px' }}>
                <p className="text-body-sm" style={{ color: '#555', marginBottom: '12px' }}>
                  Have questions about the partner program?
                </p>
                <a href="tel:8572053333" className="btn btn-teal" style={{ padding: '12px 24px', fontSize: '15px' }}>
                  Call 857-205-3333
                </a>
              </div>
            </div>

            {/* Form */}
            {submitted ? (
              <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: '#2c5b54', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={24} color="#fff" />
                </div>
                <h2 className="text-card-heading" style={{ marginBottom: '12px', color: '#000' }}>Application Submitted</h2>
                <p className="text-body" style={{ color: '#555' }}>A partnership specialist will reach out within 2 business days.</p>
              </div>
            ) : (
              <div className="card" style={{ padding: '36px' }}>
                <h2 className="text-card-heading" style={{ fontSize: '22px', marginBottom: '8px', color: '#000' }}>Partner Application</h2>
                <p className="text-body" style={{ color: '#666', marginBottom: '24px' }}>Tell us about yourself and we'll be in touch.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  {[
                    { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your Name', required: true },
                    { name: 'company', label: 'Company / Agency', type: 'text', placeholder: 'Company Name', required: false },
                    { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'you@example.com', required: true },
                    { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(555) 000-0000', required: false },
                  ].map(({ name, label, type, placeholder, required }) => (
                    <div key={name} style={{ marginBottom: '14px' }}>
                      <label htmlFor={`partner-${name}`} className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>{label}</label>
                      <input
                        id={`partner-${name}`}
                        name={name}
                        type={type}
                        required={required}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      />
                    </div>
                  ))}
                  <div style={{ marginBottom: '14px' }}>
                    <label htmlFor="partner-type" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Partnership Type</label>
                    <select
                      id="partner-type"
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                    >
                      <option value="">Select type...</option>
                      <option>Independent Insurance Agent</option>
                      <option>Financial Advisor / Planner</option>
                      <option>Real Estate Professional</option>
                      <option>Mortgage Broker</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="partner-message" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Message</label>
                    <textarea
                      id="partner-message"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your business..."
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                      onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                    />
                  </div>
                  <button type="submit" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }}>
                    Submit Application
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#1c3f39', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '46px', fontWeight: 500, lineHeight: '56px', letterSpacing: '-0.92px', color: '#ffffff', marginBottom: '16px' }}>
            Questions about partnering?
          </h2>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '440px', margin: '0 auto 32px', fontSize: '17px' }}>
            Call us directly to speak with our partner development team.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:8572053333" className="btn btn-light">Call 857-205-3333</a>
            <Link to="/contact" className="btn btn-outline">Send a Message</Link>
          </div>
        </div>
      </section>
    </>
  )
}
