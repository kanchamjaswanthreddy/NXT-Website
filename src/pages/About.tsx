import { Link } from 'react-router-dom'
import { Target, Users, Award, ArrowRight } from 'lucide-react'
import { team } from '../data/team'
import LifeCalculator from '../components/calculators/LifeCalculator'

const PHILOSOPHY = [
  {
    icon: <Target size={24} color="#2c5b54" />,
    heading: 'Client-First Always',
    body: 'We are independent brokers, which means we have no loyalty to any carrier. Our only obligation is to find the right coverage at the right price for you.',
  },
  {
    icon: <Users size={24} color="#2c5b54" />,
    heading: 'Expert Advisors',
    body: 'Every NXT Financial advisor carries multiple lines of authority and undergoes continuous education to stay current with the evolving insurance market.',
  },
  {
    icon: <Award size={24} color="#2c5b54" />,
    heading: 'Proven Results',
    body: 'With over 10,000 clients served and $0 in uncovered losses due to improper placement, our track record speaks for itself.',
  },
]

export default function About() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        aria-labelledby="about-hero-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '560px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '90px 48px' }}>
          <span
            className="text-body-sm"
            style={{ color: 'rgba(255,255,255,0.75)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
          >
            About NXT Financial
          </span>
          <h1 id="about-hero-heading" className="text-hero" style={{ maxWidth: '700px', marginBottom: '24px' }}>
            The insurance agency you can genuinely count on.
          </h1>
          <p
            className="text-body"
            style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '520px', fontSize: '18px', lineHeight: '28px', marginBottom: '40px' }}
          >
            Founded in Everett, MA, NXT Financial Group has grown to serve clients in all 50 states with honest, expert insurance guidance.
          </p>
          <Link to="/contact" className="btn btn-light">Work With Us</Link>
        </div>
      </section>

      {/* ── MISSION ───────────────────────────────────────────── */}
      <section aria-labelledby="mission-heading" className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <span
                className="text-body-sm"
                style={{ color: '#2c5b54', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
              >
                Our Mission
              </span>
              <h2 id="mission-heading" className="text-h2-md" style={{ marginBottom: '20px' }}>
                We exist to make insurance work for people — not against them.
              </h2>
              <p className="text-body" style={{ color: '#555', marginBottom: '28px', fontSize: '17px', lineHeight: '27px' }}>
                Insurance is complicated, opaque, and often adversarial. NXT Financial was founded on a simple belief: that clients deserve a trusted advisor who explains every option clearly, shops the full market on their behalf, and advocates for them when claims arise.
              </p>
              <p className="text-body" style={{ color: '#555', marginBottom: '36px', fontSize: '17px', lineHeight: '27px' }}>
                We are licensed in Massachusetts and operate nationally, serving individuals, families, and businesses with a comprehensive suite of personal lines and commercial insurance products.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'Founded', value: '2018' },
                  { label: 'Headquarters', value: 'Everett, MA' },
                  { label: 'Carriers', value: '104+' },
                  { label: 'States Served', value: 'All 50' },
                ].map(({ label, value }) => (
                  <div key={label} className="card-beige" style={{ padding: '20px 24px' }}>
                    <p className="text-body-sm" style={{ color: '#666', marginBottom: '4px' }}>{label}</p>
                    <p className="text-card-heading" style={{ color: '#2c5b54' }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&fit=crop"
                alt="NXT Financial office consultation"
                width={600}
                height={450}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ────────────────────────────────────────── */}
      <section aria-labelledby="philosophy-heading" className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 id="philosophy-heading" className="text-h2-lg" style={{ marginBottom: '16px' }}>
              What we stand for.
            </h2>
            <p className="text-body" style={{ color: '#555', maxWidth: '500px', margin: '0 auto', fontSize: '17px' }}>
              Three principles guide every client interaction, every policy recommendation, and every claims conversation.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {PHILOSOPHY.map(({ icon, heading, body }) => (
              <div key={heading} className="card-beige" style={{ padding: '36px 32px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: '#ffffff',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {icon}
                </div>
                <h3 className="text-card-heading" style={{ marginBottom: '12px', color: '#000' }}>{heading}</h3>
                <p className="text-body" style={{ color: '#555' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ────────────────────────────────────────── */}
      <section aria-labelledby="calc-heading" className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
            <div>
              <h2 id="calc-heading" className="text-h2-md" style={{ marginBottom: '20px' }}>
                How much life insurance do you need?
              </h2>
              <p className="text-body" style={{ color: '#555', marginBottom: '24px', fontSize: '17px', lineHeight: '27px' }}>
                Use our simple calculator to estimate the right amount of life insurance coverage for your family. The calculation is based on the DIME method — Debt, Income, Mortgage, and Education.
              </p>
              <Link
                to="/insurance/life-insurance"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#2c5b54',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: '15px',
                  textDecoration: 'none',
                }}
              >
                Learn about life insurance <ArrowRight size={16} />
              </Link>
            </div>
            <LifeCalculator />
          </div>
        </div>
      </section>

      {/* ── TEAM ──────────────────────────────────────────────── */}
      <section aria-labelledby="team-heading" className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 id="team-heading" className="text-h2-lg" style={{ marginBottom: '16px' }}>Meet the team.</h2>
            <p className="text-body" style={{ color: '#555', maxWidth: '480px', margin: '0 auto', fontSize: '17px' }}>
              Our advisors bring decades of combined experience across personal lines, commercial, and specialty insurance markets.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {team.map(({ name, role, image }) => (
              <div key={name} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                  <img
                    src={image}
                    alt={name}
                    width={300}
                    height={375}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      objectPosition: image.includes('rigoberto') ? 'center 15%' : 'center top',
                    }}
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 className="text-card-heading" style={{ fontSize: '18px', marginBottom: '4px', color: '#000' }}>{name}</h3>
                  <p className="text-body-sm" style={{ color: '#2c5b54', fontWeight: 500 }}>{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FUTUREFLOW PARTNERSHIP ─────────────────────────────── */}
      <section className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '64px',
              alignItems: 'center',
            }}
          >
            {/* Left — content */}
            <div>
              <p
                className="text-body-sm"
                style={{ color: '#2c5b54', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '16px' }}
              >
                From the NXT Financial Family
              </p>
              <h2 className="text-h2-md" style={{ marginBottom: '20px' }}>
                Introducing FutureFlow — AI Personal Finance
              </h2>
              <p className="text-body" style={{ color: '#555', marginBottom: '20px', fontSize: '17px', lineHeight: '28px' }}>
                NXT Financial is proud to be the insurance partner behind FutureFlow — an AI-powered personal finance app that helps people track spending, manage subscriptions, plan for retirement, and close coverage gaps.
              </p>
              <p className="text-body" style={{ color: '#555', marginBottom: '32px', lineHeight: '26px' }}>
                FutureFlow users get direct access to NXT Financial advisors for insurance reviews, coverage recommendations, and competitive quotes — all within a single, unified platform.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href="https://joinfutureflow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Visit FutureFlow <ArrowRight size={16} />
                </a>
                <Link to="/contact" className="btn btn-outline-teal">
                  Talk to an Advisor
                </Link>
              </div>
            </div>

            {/* Right — FutureFlow branding card */}
            <div>
              <div
                style={{
                  background: 'linear-gradient(135deg, #1c3f39 0%, #2c5b54 60%, #3d7a6e 100%)',
                  borderRadius: '16px',
                  padding: '48px 40px',
                  textAlign: 'center',
                }}
              >
                <img
                  src="/futureflow-logo.png"
                  alt="FutureFlow"
                  style={{ height: '120px', width: 'auto', objectFit: 'contain', marginBottom: '24px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
                />
                <p
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '18px',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: '12px',
                    lineHeight: '28px',
                  }}
                >
                  "Moving Money, Fulfilling Futures"
                </p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: '24px', marginBottom: '32px' }}>
                  The AI personal finance app that unifies your spending, savings, and insurance — powered by NXT Financial advisors.
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '32px',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    { num: '$1,819', label: 'Avg Savings/yr' },
                    { num: '4.8★', label: 'App Rating' },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <p
                        style={{
                          fontFamily: 'Poppins, sans-serif',
                          fontSize: '28px',
                          fontWeight: 500,
                          color: '#ffffff',
                          lineHeight: '1',
                          marginBottom: '4px',
                        }}
                      >
                        {s.num}
                      </p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
