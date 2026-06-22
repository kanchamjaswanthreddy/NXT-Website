import { Link } from 'react-router-dom'
import { Heart, Car, Home as HomeIcon, Stethoscope, Plane, Check, ArrowRight } from 'lucide-react'
import { allCarriers, getLogoPath } from '../data/carriers'
import SEO from '../components/SEO'

const STATS = [
  { value: '50+', label: 'Clients Served' },
  { value: '104+', label: 'Carrier Partners' },
  { value: '4', label: 'Licensed States HQ' },
  { value: '50', label: 'States Served' },
]

const FEATURES = [
  {
    icon: <Car size={28} color="#2c5b54" />,
    heading: 'Auto Insurance',
    body: 'Personal and commercial vehicle coverage including liability, collision, and comprehensive protection from top-rated carriers.',
    href: '/insurance/auto-insurance',
  },
  {
    icon: <HomeIcon size={28} color="#2c5b54" />,
    heading: 'Home Insurance',
    body: 'Homeowners, renters, landlord, and flood insurance — protecting your most valuable asset at the most competitive rate.',
    href: '/insurance/homeowners-renters',
  },
  {
    icon: <Heart size={28} color="#2c5b54" />,
    heading: 'Life Insurance',
    body: 'Term, whole life, universal life, and annuities designed to protect your family\'s future and secure your legacy.',
    href: '/insurance/term-life-insurance',
  },
  {
    icon: <Stethoscope size={28} color="#2c5b54" />,
    heading: 'Illness Insurance',
    body: 'Individual health, Medicare supplements, critical illness, and disability income coverage to protect your health and income.',
    href: '/insurance/individual-family-health',
  },
  {
    icon: <Plane size={28} color="#2c5b54" />,
    heading: 'Travel Insurance',
    body: 'Trip cancellation, medical emergency, and baggage protection so you can travel with complete peace of mind.',
    href: '/insurance/travel-insurance',
  },
]

const STEPS = [
  { num: '01', heading: 'Tell Us Your Needs', body: 'A quick conversation about your situation, assets, and coverage goals.' },
  { num: '02', heading: 'We Shop the Market', body: 'We compare quotes from 104+ carriers to find the best fit for your risk.' },
  { num: '03', heading: 'Review Your Options', body: 'We present clear, plain-language comparisons — no jargon, no pressure.' },
  { num: '04', heading: 'Get Covered Today', body: 'Same-day binding on most personal lines. Ongoing service from your advisor.' },
]

const WHY_ITEMS = [
  'Access to 104+ top-rated national and regional carriers',
  'Licensed and experienced advisors in every coverage line',
  'Ongoing service and annual policy reviews included',
]

// Build marquee carrier list (all 105 logos, doubled for seamless loop)
const marqueeItems = [...allCarriers, ...allCarriers]

export default function Home() {
  return (
    <>
      <SEO
        title="Independent Insurance Brokerage"
        description="NXT Financial Group partners with 104+ top-rated carriers to deliver comprehensive auto, home, life, health, and commercial insurance coverage across all 50 states."
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "InsuranceAgency",
          "name": "NXT Financial Group",
          "url": "https://www.nxtfinancialgroup.com",
          "logo": "https://www.nxtfinancialgroup.com/logo.png",
          "description": "Independent insurance brokerage partnering with 104+ carriers to provide comprehensive coverage across all 50 states.",
          "areaServed": "US",
          "serviceType": ["Auto Insurance", "Home Insurance", "Life Insurance", "Health Insurance", "Commercial Insurance"],
          "numberOfEmployees": {"@type": "QuantitativeValue", "value": "10+"},
          "sameAs": []
        }}
      />
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section
        aria-labelledby="hero-heading"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '680px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&fit=crop"
          alt=""
          aria-hidden="true"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.55)',
          }}
        />
        <div className="container px-6 py-16 md:px-12 md:py-24" style={{ position: 'relative', zIndex: 1 }}>
          <span
            className="text-body"
            style={{
              display: 'inline-block',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontSize: '13px',
              marginBottom: '20px',
            }}
          >
            Independent Insurance Brokerage
          </span>
          <h1 id="hero-heading" className="text-hero w-full max-w-[680px]" style={{ marginBottom: '24px' }}>
            Comprehensive insurance coverage for the modern era.
          </h1>
          <p
            className="text-body w-full max-w-[520px]"
            style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '40px', fontSize: '18px', lineHeight: '28px' }}
          >
            NXT Financial partners with the world's leading carriers to protect what matters most — your family, your business, and your future.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-light">Start now</Link>
            <Link to="/contact" className="btn btn-outline">Contact sales</Link>
          </div>
        </div>
      </section>

      {/* ── STAT BAR ───────────────────────────────────────────── */}
      <section aria-label="Key statistics" style={{ background: '#ffffff', borderBottom: '1px solid #d0d5dd' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`border-[#d0d5dd] ${i > 0 ? 'border-l' : ''} ${i === 2 ? 'max-md:border-l-0' : ''}`}
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                }}
              >
                <p className="text-stat">{value}</p>
                <p className="text-body-sm" style={{ color: '#333', marginTop: '4px' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARRIER MARQUEE ────────────────────────────────────── */}
      <section aria-label="Carrier partners" style={{ background: '#f7f6f2', padding: '48px 0', overflow: 'hidden' }}>
        <div className="container" style={{ marginBottom: '28px', textAlign: 'center' }}>
          <span
            className="text-body-sm"
            style={{ color: '#2c5b54', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}
          >
            Partnering with the nation's top carriers
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '32px',
              animation: 'marquee 120s linear infinite',
              willChange: 'transform',
            }}
          >
            {marqueeItems.map((carrier, i) => (
              <div
                key={`${carrier}-${i}`}
                style={{
                  flexShrink: 0,
                  width: '120px',
                  height: '56px',
                  background: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #d0d5dd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px',
                }}
              >
                <img
                  src={getLogoPath(carrier)}
                  alt={carrier.replace(/-/g, ' ')}
                  width={100}
                  height={40}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'grayscale(30%)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────── */}
      <section aria-labelledby="features-heading" className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div className="w-full max-w-[600px]" style={{ marginBottom: '56px' }}>
            <h2 id="features-heading" className="text-h2-lg" style={{ marginBottom: '20px' }}>
              A complete portfolio of robust insurance products.
            </h2>
            <p className="text-body" style={{ color: '#555', fontSize: '18px', lineHeight: '28px' }}>
              From life insurance and health coverage to commercial liability and cyber protection, NXT Financial delivers comprehensive solutions across every category of risk.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map(({ icon, heading, body, href }) => (
              <div
                key={heading}
                className="card"
                style={{ padding: '36px 32px' }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    background: '#f7f6f2',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  {icon}
                </div>
                <h3 className="text-card-heading" style={{ marginBottom: '12px', color: '#000' }}>{heading}</h3>
                <p className="text-body" style={{ color: '#555', marginBottom: '20px' }}>{body}</p>
                <Link
                  to={href}
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
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ──────────────────────────────────────── */}
      <section aria-labelledby="why-heading" className="section-pad" style={{ background: '#f7f6f2' }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-body-sm"
                style={{ color: '#2c5b54', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}
              >
                Why NXT Financial
              </span>
              <h2 id="why-heading" className="text-h2-md" style={{ marginBottom: '20px' }}>
                Your independent advocate in the insurance market.
              </h2>
              <p className="text-body" style={{ color: '#555', marginBottom: '32px', fontSize: '17px', lineHeight: '27px' }}>
                As an independent broker, we work for you — not for any single insurance company. That means unbiased advice, market-wide comparison shopping, and coverage recommendations built around your actual needs.
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {WHY_ITEMS.map((item) => (
                  <li key={item} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <span
                      style={{
                        flexShrink: 0,
                        width: '24px',
                        height: '24px',
                        background: '#2c5b54',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '1px',
                      }}
                    >
                      <Check size={13} color="#fff" />
                    </span>
                    <span className="text-body" style={{ color: '#333' }}>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn btn-teal">Learn About Us</Link>
            </div>
            <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '4/3' }}>
              <img
                src="https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?w=900&q=85&fit=crop"
                alt="NXT Financial team in consultation"
                width={600}
                height={450}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────── */}
      <section aria-labelledby="how-heading" className="section-pad" style={{ background: '#ffffff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 id="how-heading" className="text-h2-lg" style={{ marginBottom: '16px' }}>
              Getting covered is simple.
            </h2>
            <p className="text-body w-full max-w-[500px]" style={{ color: '#555', margin: '0 auto', fontSize: '18px' }}>
              Our streamlined process gets you from first conversation to fully covered in as little as one day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map(({ num, heading, body }) => (
              <div key={num} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    border: '2px solid #2c5b54',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: '18px',
                      fontWeight: 500,
                      color: '#2c5b54',
                    }}
                  >
                    {num}
                  </span>
                </div>
                <h3 className="text-card-heading" style={{ marginBottom: '10px', color: '#000' }}>{heading}</h3>
                <p className="text-body" style={{ color: '#666' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <section aria-labelledby="cta-heading" className="section-pad" style={{ background: '#1c3f39' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2
            id="cta-heading"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '50px',
              fontWeight: 500,
              lineHeight: '60px',
              letterSpacing: '-1px',
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Ready to protect what matters?
          </h2>
          <p
            className="text-body w-full max-w-[480px]"
            style={{ color: 'rgba(255,255,255,0.8)', margin: '0 auto 40px', fontSize: '18px', lineHeight: '28px' }}
          >
            Speak with an NXT Financial advisor today — no obligation, no pressure, just straightforward insurance guidance.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-light">Get a Free Quote</Link>
            <Link to="/carriers" className="btn btn-outline">View Our Carriers</Link>
          </div>
        </div>
      </section>
    </>
  )
}
