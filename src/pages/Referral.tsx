import { useState } from 'react'
import { Gift, Users, DollarSign, Check } from 'lucide-react'
import SEO from '../components/SEO'

const HOW_IT_WORKS = [
  { icon: <Users size={22} color="#2c5b54" />, step: '1', heading: 'Refer a Friend or Client', body: 'Send us a referral with their name, contact info, and what coverage they need.' },
  { icon: <Gift size={22} color="#2c5b54" />, step: '2', heading: 'We Handle Everything', body: 'Our advisors reach out, shop the market, and get them covered.' },
  { icon: <DollarSign size={22} color="#2c5b54" />, step: '3', heading: 'You Earn a Reward', body: 'When your referral gets a policy, you receive a referral reward as our thank-you.' },
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

export default function Referral() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    yourName: '', yourEmail: '', refName: '', refEmail: '', refPhone: '', coverage: '', notes: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <SEO
        title="Referral Program"
        description="Earn rewards by referring friends and family to NXT Financial Group. Our referral program makes it easy to help your network get better insurance coverage."
        canonical="/referral"
      />
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="referral-heading"
        style={{ background: '#1c3f39', minHeight: '360px', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 70% 40%, rgba(44,91,84,0.5) 0%, transparent 65%)' }} />
        <div className="container relative z-10 px-6 py-16 md:px-12 md:py-24">
          <h1 id="referral-heading" className="text-hero" style={{ maxWidth: '560px', marginBottom: '20px' }}>
            Refer a friend. Earn a reward.
          </h1>
          <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '460px', fontSize: '18px', lineHeight: '28px' }}>
            Know someone who needs better insurance coverage? Send them our way — and we'll take care of the rest, plus send you a thank-you.
          </p>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <h2 className="text-h2-lg" style={{ textAlign: 'center', marginBottom: '48px' }}>How referrals work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {HOW_IT_WORKS.map(({ icon, step, heading, body }) => (
              <div key={step} className="card-beige" style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ width: '52px', height: '52px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  {icon}
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 600, color: '#2c5b54', letterSpacing: '1px', display: 'block', marginBottom: '8px' }}>STEP {step}</span>
                <h3 className="text-card-heading" style={{ fontSize: '18px', marginBottom: '10px', color: '#000' }}>{heading}</h3>
                <p className="text-body" style={{ color: '#555' }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Referral form */}
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            {submitted ? (
              <div className="card" style={{ padding: '56px', textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', background: '#2c5b54', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <Check size={24} color="#fff" />
                </div>
                <h2 className="text-card-heading" style={{ marginBottom: '12px', color: '#000' }}>Referral Submitted!</h2>
                <p className="text-body" style={{ color: '#555', marginBottom: '24px' }}>We'll reach out to your referral within one business day.</p>
                <button type="button" onClick={() => setSubmitted(false)} className="btn btn-outline-teal" style={{ padding: '12px 24px', fontSize: '15px' }}>
                  Submit Another Referral
                </button>
              </div>
            ) : (
              <div className="card" style={{ padding: '40px' }}>
                <h2 className="text-card-heading" style={{ fontSize: '22px', marginBottom: '8px', color: '#000' }}>Submit a Referral</h2>
                <p className="text-body" style={{ color: '#666', marginBottom: '24px' }}>Fill in your info and your referral's details below.</p>
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="yourName" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Your Name *</label>
                      <input id="yourName" name="yourName" type="text" required value={form.yourName} onChange={handleChange} placeholder="Your Name" style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                    </div>
                    <div>
                      <label htmlFor="yourEmail" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Your Email *</label>
                      <input id="yourEmail" name="yourEmail" type="email" required value={form.yourEmail} onChange={handleChange} placeholder="you@example.com" style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                    </div>
                  </div>
                  <p className="text-body-sm" style={{ color: '#2c5b54', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Referral's Information</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="refName" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Their Name *</label>
                      <input id="refName" name="refName" type="text" required value={form.refName} onChange={handleChange} placeholder="Referral's Name" style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                    </div>
                    <div>
                      <label htmlFor="refEmail" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Their Email</label>
                      <input id="refEmail" name="refEmail" type="email" value={form.refEmail} onChange={handleChange} placeholder="referral@example.com" style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="refPhone" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Their Phone</label>
                      <input id="refPhone" name="refPhone" type="tel" value={form.refPhone} onChange={handleChange} placeholder="(555) 000-0000" style={inputStyle} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                    </div>
                    <div>
                      <label htmlFor="coverage" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Coverage Needed</label>
                      <select id="coverage" name="coverage" value={form.coverage} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')}>
                        <option value="">Not sure / Other</option>
                        <option>Life Insurance</option>
                        <option>Health Insurance</option>
                        <option>Homeowners Insurance</option>
                        <option>Auto Insurance</option>
                        <option>Commercial Insurance</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label htmlFor="notes" className="text-body-sm" style={{ display: 'block', marginBottom: '6px', fontWeight: 500 }}>Notes</label>
                    <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} placeholder="Any additional context..." style={{ ...inputStyle, resize: 'vertical' }} onFocus={(e) => (e.currentTarget.style.borderColor = '#2c5b54')} onBlur={(e) => (e.currentTarget.style.borderColor = '#d0d5dd')} />
                  </div>
                  <button type="submit" className="btn btn-teal" style={{ width: '100%', justifyContent: 'center' }}>
                    Submit Referral
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
