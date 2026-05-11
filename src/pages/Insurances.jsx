import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { ChevronRight, HeartPulse, Shield, Building2, Briefcase } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5 }
  })
};

const ProductCard = ({ icon, title, desc, delay, slug }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-50px" }}
    custom={delay}
    variants={fadeUp}
    style={{ 
      background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)',
      display: 'flex', 
      flexDirection: 'column',
      padding: '28px',
      borderRadius: '20px',
      boxShadow: 'var(--glass-shadow)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-6px)';
      e.currentTarget.style.borderColor = 'var(--color-primary)';
      const arrow = e.currentTarget.querySelector('.card-arrow');
      if(arrow) arrow.style.transform = 'translateX(6px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = 'var(--glass-border)';
      const arrow = e.currentTarget.querySelector('.card-arrow');
      if(arrow) arrow.style.transform = 'translateX(0)';
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
      <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 212, 255, 0.1)' }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--color-heading)', fontWeight: 600, margin: 0 }}>{title}</h3>
    </div>
    
    <p style={{ fontSize: '0.95rem', color: '#526477', lineHeight: 1.6, marginBottom: '20px', flexGrow: 1 }}>{desc}</p>
    
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: '0.9rem' }}>Learn More</span>
      <ChevronRight className="card-arrow" size={16} color="var(--color-primary)" style={{ transition: 'transform 0.3s ease' }} />
    </div>
    
    <Link to={slug ? `/insurance/${slug}` : "/contact"} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} aria-label={`Explore ${title}`} />
  </motion.div>
);

const Insurances = () => {
  return (
    <PageTransition>
      <SEO
        title="Insurance Products | Life, Health, Property & Casualty"
        description="Explore NXT Financial's full range of insurance products: life & retirement, health & disability, property & asset protection, and casualty & liability defense across all 4 primary license domains."
        canonical="/insurances"
      />
      <main style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '0' }}>
        
        {/* HEADER */}
        <div className="insurances-hero" style={{ backgroundColor: '#0a2540', color: 'white', paddingTop: '140px', paddingBottom: '100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 150%, rgba(142,0,56,0.3) 0%, transparent 70%)', zIndex: 0 }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} style={{ color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.9rem', marginBottom: '16px', display: 'block' }}>
              Explore All Products
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginBottom: '24px', color: 'white', lineHeight: 1.1 }}
            >
              Comprehensive Coverage Categories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: '1.25rem', color: '#adbdcc', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}
            >
              NXT Financial strictly handles all vital protections securely across four heavily regulated primary licensing domains. From Life & Health to Casualty & Property defense.
            </motion.p>
          </div>
        </div>

        {/* 1. Life & Retirement Solutions */}
        <section className="section-pad">
          <div className="container">
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '16px' }}>1. Life & Retirement Solutions</h2>
              <p style={{ fontSize: '1.1rem', color: '#425466', maxWidth: '700px', margin: '0 auto' }}>
                Protecting your family’s future and securing your legacy.
              </p>
            </div>
            <div className="grid-4" style={{ rowGap: '40px' }}>
              <ProductCard delay={1} slug="term-life-insurance" icon={<HeartPulse color="var(--color-primary)" size={24} />} 
                title="Term Life Insurance" desc="Affordable protection for a specific period (10, 20, or 30 years) to cover mortgages or education costs." />
              <ProductCard delay={2} slug="permanent-life-insurance" icon={<HeartPulse color="var(--color-primary)" size={24} />} 
                title="Permanent Life Insurance" desc="Whole Life and Universal Life policies that build cash value and provide lifelong protection." />
              <ProductCard delay={3} slug="annuities-retirement-income" icon={<HeartPulse color="var(--color-primary)" size={24} />} 
                title="Annuities & Retirement" desc="Fixed and indexed annuities to ensure you never outlive your savings." />
              <ProductCard delay={4} slug="final-expense-planning" icon={<HeartPulse color="var(--color-primary)" size={24} />} 
                title="Final Expense Planning" desc="Specialized small-benefit policies to cover funeral and burial costs, lifting the burden from loved ones." />
            </div>
          </div>
        </section>

        {/* 2. Health & Disability Protection */}
        <section className="section-pad" style={{ background: 'transparent' }}>
          <div className="container">
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '16px' }}>2. Health & Disability Protection</h2>
              <p style={{ fontSize: '1.1rem', color: '#425466', maxWidth: '700px', margin: '0 auto' }}>
                Protecting your physical well-being and your ability to earn an income.
              </p>
            </div>
            <div className="grid-4" style={{ rowGap: '40px' }}>
              <ProductCard delay={1} slug="individual-family-health-plans" icon={<Shield color="var(--color-primary)" size={24} />} 
                title="Individual & Family Health" desc="Navigation of major medical plans, including flexible HMOs and PPOs." />
              <ProductCard delay={2} slug="medicare-supplements" icon={<Shield color="var(--color-primary)" size={24} />} 
                title="Medicare Supplements" desc="Guidance on plans that pay for expenses not covered by original Medicare (Medigap)." />
              <ProductCard delay={3} slug="disability-income-insurance" icon={<Shield color="var(--color-primary)" size={24} />} 
                title="Disability Income" desc="Paycheck protection that provides a monthly income if you become too sick or injured to work." />
              <ProductCard delay={4} slug="long-term-care" icon={<Shield color="var(--color-primary)" size={24} />} 
                title="Long-Term Care (LTC)" desc="Coverage for nursing home stays, assisted living, or in-home professional care." />
            </div>
          </div>
        </section>

        {/* 3. Property & Asset Protection */}
        <section className="section-pad">
          <div className="container">
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '16px' }}>3. Property & Asset Protection</h2>
              <p style={{ fontSize: '1.1rem', color: '#425466', maxWidth: '700px', margin: '0 auto' }}>
                Defending your home, your belongings, and your business location.
              </p>
            </div>
            <div className="grid-4" style={{ rowGap: '40px' }}>
              <ProductCard delay={1} slug="homeowners-renters-insurance" icon={<Building2 color="var(--color-primary)" size={24} />} 
                title="Homeowners & Renters" desc="Coverage for your dwelling and personal belongings against fire, theft, and natural disasters." />
              <ProductCard delay={2} slug="commercial-property-insurance" icon={<Building2 color="var(--color-primary)" size={24} />} 
                title="Commercial Property" desc="Protecting your business building, equipment, internal inventory, and furniture." />
              <ProductCard delay={3} slug="landlord-insurance" icon={<Building2 color="var(--color-primary)" size={24} />} 
                title="Landlord Insurance" desc="Specialized protection for those renting out residential or commercial units to tenants." />
              <ProductCard delay={4} slug="inland-marine" icon={<Building2 color="var(--color-primary)" size={24} />} 
                title="Inland Marine" desc="Coverage for high-value items 'on the move', such as jewelry, fine art, or specialized business tools." />
            </div>
          </div>
        </section>

        {/* 4. Casualty & Liability Defense */}
        <section className="section-pad" style={{ background: 'transparent' }}>
          <div className="container">
            <div style={{ marginBottom: '60px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '16px' }}>4. Casualty & Liability Defense</h2>
              <p style={{ fontSize: '1.1rem', color: '#425466', maxWidth: '700px', margin: '0 auto' }}>
                Safeguarding you and your business from lawsuits and legal claims.
              </p>
            </div>
            <div className="grid-4" style={{ rowGap: '40px' }}>
              <ProductCard delay={1} slug="auto-insurance" icon={<Briefcase color="var(--color-primary)" size={24} />} 
                title="Auto Insurance" desc="Comprehensive personal and commercial vehicle coverage, including bodily injury and property damage liability." />
              <ProductCard delay={2} slug="general-liability" icon={<Briefcase color="var(--color-primary)" size={24} />} 
                title="General Liability (GL)" desc="Essential for business owners to protect against third-party claims of injury or property damage." />
              <ProductCard delay={3} slug="workers-compensation" icon={<Briefcase color="var(--color-primary)" size={24} />} 
                title="Workers’ Compensation" desc="Helping businesses meet state requirements to cover medical costs and lost wages for injured employees." />
              <ProductCard delay={4} slug="professional-liability" icon={<Briefcase color="var(--color-primary)" size={24} />} 
                title="Professional Liability" desc="Protection for service providers against claims of negligence or mistakes in their work (E&O)." />
              <ProductCard delay={5} slug="umbrella-insurance" icon={<Briefcase color="var(--color-primary)" size={24} />} 
                title="Umbrella Insurance" desc="High-limit liability 'add-on' that kicks in when your standard policy limits are reached." />
            </div>
            
            {/* CTA BREAK */}
            <div className="dark-cta-block" style={{ marginTop: '100px', background: '#0a2540', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', color: 'white' }}>
              <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', color: 'white' }}>Ready to secure your protections?</h3>
              <p style={{ fontSize: '1.2rem', marginBottom: '32px', color: '#adbdcc', maxWidth: '600px', margin: '0 auto 32px' }}>
                We hold all 4 primary licenses and negotiate intensely across dozens of carriers to assemble your perfect safety net.
              </p>
              <Link to="/contact" className="btn-primary" style={{ background: 'var(--color-primary)', color: '#0a2540', padding: '16px 36px', fontSize: '1.1rem' }}>
                Book a Discovery Call
              </Link>
            </div>
          </div>
        </section>

      </main>
    </PageTransition>
  );
};

export default Insurances;
