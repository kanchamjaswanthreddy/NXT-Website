import { useState } from 'react'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import SEO from '../components/SEO'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  coverageType: string
  message: string
}

const COVERAGE_OPTIONS = [
  'Life Insurance',
  'Health Insurance',
  'Homeowners Insurance',
  'Auto Insurance',
  'Commercial Insurance',
  'Workers Compensation',
  'Professional Liability',
  'Cyber Liability',
  'Flood Insurance',
  'Other / Not Sure',
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
  transition: 'border-color 0.2s ease',
}

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverageType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get a free insurance quote from NXT Financial Group. Reach our licensed advisors by phone, email, or contact form for personalized coverage recommendations."
        canonical="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact NXT Financial Group",
          "url": "https://www.nxtfinancialgroup.com/contact",
          "mainEntity": {
            "@type": "InsuranceAgency",
            "name": "NXT Financial Group",
            "url": "https://www.nxtfinancialgroup.com"
          }
        }}
      />
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="contact-hero-heading"
        className="flex items-center relative overflow-hidden min-h-[340px]"
        style={{
          background: '#1c3f39',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(44,91,84,0.5) 0%, transparent 65%)',
          }}
        />
        <div className="container relative z-10 px-6 py-16 md:px-12 md:py-24">
          <h1 id="contact-hero-heading" className="text-hero" style={{ maxWidth: '560px', marginBottom: '20px' }}>
            Let's talk protection.
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '480px', fontSize: '18px', lineHeight: '28px' }}>
            Whether you need a quick quote or a comprehensive insurance review, our advisors are ready to help. No obligation, no pressure — just expert guidance.
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 lg:gap-16 items-start">
            {/* Contact info */}
            <div>
              <h2 className="text-h2-md" style={{ fontSize: '28px', lineHeight: '36px', marginBottom: '24px' }}>
                Contact Information
              </h2>

              <div className="flex flex-col gap-4 mb-9">
                {[
                  { icon: <Phone size={18} color="#2c5b54" />, label: 'Phone', value: '857-205-3333', href: 'tel:8572053333' },
                  { icon: <Mail size={18} color="#2c5b54" />, label: 'Email', value: 'info@nxtfinancialgroup.com', href: 'mailto:info@nxtfinancialgroup.com' },
                  { icon: <MapPin size={18} color="#2c5b54" />, label: 'Location', value: 'Everett, Massachusetts', href: undefined },
                  { icon: <Clock size={18} color="#2c5b54" />, label: 'Hours', value: 'Mon–Fri 9am–6pm ET', href: undefined },
                ].map(({ icon, label, value, href }) => (
                  <div key={label} className="card flex items-start gap-4 p-5 md:p-6">
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        background: '#f7f6f2',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="text-body-sm" style={{ color: '#888', marginBottom: '2px' }}>{label}</p>
                      {href ? (
                        <a href={href} className="text-body" style={{ color: '#2c5b54', fontWeight: 500, textDecoration: 'none' }}>
                          {value}
                        </a>
                      ) : (
                        <p className="text-body" style={{ color: '#333', fontWeight: 500, margin: 0 }}>{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card-beige" style={{ padding: '24px' }}>
                <h3 className="text-card-heading" style={{ fontSize: '16px', marginBottom: '10px', color: '#000' }}>
                  Prefer to call?
                </h3>
                <p className="text-body-sm" style={{ color: '#555', marginBottom: '16px' }}>
                  Speak directly with a licensed advisor. Most clients get a quote in under 10 minutes.
                </p>
                <a href="tel:8572053333" className="btn btn-teal" style={{ padding: '12px 24px', fontSize: '16px' }}>
                  <Phone size={15} /> 857-205-3333
                </a>
              </div>
            </div>

            {/* Form */}
            <div>
              {submitted ? (
                <div className="card text-center px-6 py-12 md:px-10 md:py-16">
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      background: '#2c5b54',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h2 className="text-card-heading" style={{ marginBottom: '12px', color: '#000', fontSize: '22px' }}>
                    Message Received!
                  </h2>
                  <p className="text-body" style={{ color: '#555', maxWidth: '380px', margin: '0 auto 24px' }}>
                    Thank you for reaching out. An NXT Financial advisor will contact you within one business day.
                  </p>
                  <button type="button" onClick={() => setSubmitted(false)} className="btn btn-outline-teal" style={{ padding: '12px 28px', fontSize: '15px' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="card p-6 md:p-10">
                  <h2 className="text-card-heading" style={{ fontSize: '22px', marginBottom: '8px', color: '#000' }}>
                    Request a Free Quote
                  </h2>
                  <p className="text-body" style={{ color: '#666', marginBottom: '28px' }}>
                    Fill out the form and an advisor will reach out within one business day.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="firstName" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                          First Name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={form.firstName}
                          onChange={handleChange}
                          placeholder="Jane"
                          style={inputStyle}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                          Last Name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          value={form.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          style={inputStyle}
                          onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                          onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                        />
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label htmlFor="email" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label htmlFor="phone" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="(555) 000-0000"
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      />
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <label htmlFor="coverageType" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                        Coverage Type
                      </label>
                      <select
                        id="coverageType"
                        name="coverageType"
                        value={form.coverageType}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      >
                        <option value="">Select coverage type...</option>
                        {COVERAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <label htmlFor="message" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your insurance needs..."
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}
                      />
                    </div>

                    <button type="submit" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }}>
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
