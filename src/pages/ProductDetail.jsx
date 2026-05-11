import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { ArrowLeft, CheckCircle2, ShieldCheck, Banknote, ShieldAlert } from 'lucide-react';

const productsDatabase = {
  // 1. Life & Retirement Solutions (License 1651)
  "term-life-insurance": {
    title: "Term Life Insurance",
    category: "Life & Retirement Solutions",
    heroImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Affordable protection for a specific period (10, 20, or 30 years) to cover mortgages or education costs, ensuring your family isn't burdened by your debt.",
    keyBenefits: [{ title: "Debt Coverage", desc: "Pays off massive mortgages and loans if you pass unexpectedly." }, { title: "Education Funding", desc: "Secures future college tuition for your children." }]
  },
  "permanent-life-insurance": {
    title: "Permanent Life Insurance",
    category: "Life & Retirement Solutions",
    heroImage: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Whole Life and Universal Life policies that securely build tax-advantaged cash value and provide absolute lifelong protection for your legacy.",
    keyBenefits: [{ title: "Lifelong Growth", desc: "Your cash value grows stably and predictably over your entire life." }, { title: "Tax-Free Borrowing", desc: "Borrow against your policy without triggering massive tax penalties." }]
  },
  "annuities-retirement-income": {
    title: "Annuities & Retirement Income",
    category: "Life & Retirement Solutions",
    heroImage: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Fixed and indexed annuities designed to ensure you absolutely never outlive your savings, providing consistent guaranteed income.",
    keyBenefits: [{ title: "Guaranteed Payouts", desc: "Lock in an unchangeable monthly paycheck for the rest of your life." }, { title: "Market Protection", desc: "Indexed annuities protect you perfectly from catastrophic market crashes." }]
  },
  "final-expense-planning": {
    title: "Final Expense Planning",
    category: "Life & Retirement Solutions",
    heroImage: "https://images.unsplash.com/photo-1522881113560-63ce60f1ad97?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Specialized, easy-to-approve small-benefit policies explicitly designed to cover unexpected funeral and burial costs, instantly lifting the sudden burden from loved ones.",
    keyBenefits: [{ title: "Rapid Approval", desc: "No complex medical exams required to get immediately approved." }, { title: "Burial Costs Covered", desc: "Directly funds all funeral and immediate debt obligations." }]
  },

  // 2. Health & Disability Protection (License 1652)
  "individual-family-health-plans": {
    title: "Individual & Family Health",
    category: "Health & Disability Protection",
    heroImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Expert navigation of major medical plans, including flexible HMOs and broad PPOs to keep your physical well-being fully protected against massive medical bills.",
    keyBenefits: [{ title: "Preventative Care", desc: "Fully covers routine doctor visits and critical early-detection screenings." }, { title: "Emergency Shield", desc: "Prevents a single unexpected hospital visit from causing bankruptcy." }]
  },
  "medicare-supplements": {
    title: "Medicare Supplements",
    category: "Health & Disability Protection",
    heroImage: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Crucial Medigap guidance on plans that actively pay out for heavy medical expenses completely ignored and not covered by original Medicare.",
    keyBenefits: [{ title: "Co-Pay Elimination", desc: "Wipes out high out-of-pocket deductibles and unexpected copay fees." }, { title: "Specialist Access", desc: "Keep seeing your trusted doctors without dealing with restrictive networks." }]
  },
  "disability-income-insurance": {
    title: "Disability Income Insurance",
    category: "Health & Disability Protection",
    heroImage: "https://images.unsplash.com/photo-1584308666744-24d5e4b2569e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Ultimate 'paycheck protection' that dynamically provides a direct monthly income if you become too sick or physically injured to work.",
    keyBenefits: [{ title: "Fixed Monthly Cash", desc: "Replaces 60-70% of your gross salary securely while you strictly focus on healing." }, { title: "Broad Definitions", desc: "Covers a massive range of illnesses and crippling physical injuries." }]
  },
  "long-term-care": {
    title: "Long-Term Care (LTC)",
    category: "Health & Disability Protection",
    heroImage: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Vital, specialized coverage for highly expensive nursing home stays, elite assisted living facilities, or daily in-home professional nursing care.",
    keyBenefits: [{ title: "Asset Protection", desc: "Prevents aggressive medical facilities from seizing your entire life's savings." }, { title: "In-Home Nurses", desc: "Pays for professionals to assist you comfortably in your own private home." }]
  },

  // 3. Property & Asset Protection (License 1653)
  "homeowners-renters-insurance": {
    title: "Homeowners & Renters",
    category: "Property & Asset Protection",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Defending your home and your belongings. Comprehensive coverage against fire, severe theft, and massive natural disasters.",
    keyBenefits: [{ title: "Dwelling Cover", desc: "Rebuilds your entire physical house perfectly if destroyed." }, { title: "Contents Protection", desc: "Quickly replaces all stolen or burned electronics, furniture, and valuables." }]
  },
  "commercial-property-insurance": {
    title: "Commercial Property",
    category: "Property & Asset Protection",
    heroImage: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Protecting your massive commercial business building, expensive operational equipment, vital internal inventory, and high-end office furniture.",
    keyBenefits: [{ title: "Total Facility Output", desc: "Rebuilds warehouses and intricate retail spaces from the ground up." }, { title: "Lost Income Rider", desc: "Pays your business cash securely while the building is actively being fixed." }]
  },
  "landlord-insurance": {
    title: "Landlord Insurance",
    category: "Property & Asset Protection",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Specialized defense for those renting out residential or commercial units, battling property damage and sudden lost rent.",
    keyBenefits: [{ title: "Tenant Destruction", desc: "Repairs units after an angry or completely negligent tenant ruins the interior." }, { title: "Rental Income Replacement", desc: "Pays you back purely missing rent indefinitely while the unit is entirely vacant for massive repairs." }]
  },
  "inland-marine": {
    title: "Inland Marine",
    category: "Property & Asset Protection",
    heroImage: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Aggressive coverage for immensely high-value items 'on the move', such as precious jewelry, massive fine art, or specialized million-dollar business tools safely transported across state lines.",
    keyBenefits: [{ title: "Transit Coverage", desc: "Pays out if your items are utterly destroyed strictly while driving on the highway." }, { title: "Zero Exclusions", desc: "Broadly covers practically every catastrophic scenario, even dropping items accidentally." }]
  },

  // 4. Casualty & Liability Defense (License 1654)
  "auto-insurance": {
    title: "Auto Insurance",
    category: "Casualty & Liability Defense",
    heroImage: "https://images.unsplash.com/photo-1549317661-bd32c8ce0be2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Comprehensive personal and massive commercial vehicle coverage, specifically designed around sky-high bodily injury and extreme property damage liability shields.",
    keyBenefits: [{ title: "Fatality & Injury Payout", desc: "Pays extreme medical and death benefit settlements entirely so you aren't personally sued." }, { title: "Full Vehicle Replacement", desc: "Provides perfectly new cars when yours is crushed securely." }]
  },
  "general-liability": {
    title: "General Liability (GL)",
    category: "Casualty & Liability Defense",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Essential for business owners entirely to protect against third-party claims of extreme physical injury or severe property damage occurring aggressively on your lot.",
    keyBenefits: [{ title: "Slip & Fall Shield", desc: "Provides absolute lawsuit defense if a client violently slips exactly inside your store." }, { title: "Advertising Injury", desc: "Massive defense funds actively ready if you are sued merely for aggressive advertising copyright claims." }]
  },
  "workers-compensation": {
    title: "Workers' Compensation",
    category: "Casualty & Liability Defense",
    heroImage: "https://images.unsplash.com/photo-1504307651254-35680f356f12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Helping businesses strictly meet rigid state requirements to heavily cover massive medical costs and entirely replace lost wages for severely injured frontline employees.",
    keyBenefits: [{ title: "Rehabilitation Coverage", desc: "Pays for intense surgeries and months of physical therapy completely without lawsuit risk." }, { title: "Employer Non-Sue", desc: "Blocks angry employees immediately from suing the business personally after an accident." }]
  },
  "professional-liability": {
    title: "Professional Liability (E&O)",
    category: "Casualty & Liability Defense",
    heroImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "Vital protection for service providers (lawyers, consultants, architects) aggressively against massive claims of total negligence or terrible mistakes fundamentally ruining their client's operations.",
    keyBenefits: [{ title: "Malpractice Protection", desc: "Pays settlements strictly if a doctor or lawyer gives terrible life-ruining legal advice." }, { title: "Endless Defense", desc: "Pays the $500/hr corporate attorneys seamlessly just to defeat completely baseless lawsuits." }]
  },
  "umbrella-insurance": {
    title: "Umbrella Insurance",
    category: "Casualty & Liability Defense",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    overview: "A highly-limit massive liability 'add-on' that kicks in brutally efficiently when your standard policy limits are completely and utterly exhausted in a multi-million-dollar lawsuit.",
    keyBenefits: [{ title: "Drop-Down Protection", desc: "Adds incredibly cheap $5 Million+ extra liability funds strictly sitting atop your Auto or Home policies." }, { title: "Total Estate Shield", desc: "Stops victorious plaintiff lawyers rapidly from physically seizing your entire bank account." }]
  }
};

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = productsDatabase[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>Product not found.</h2>
        <Link to="/insurances" className="btn-primary" style={{ marginTop: '20px' }}>Return to Coverage</Link>
      </main>
    );
  }

  return (
    <PageTransition>
      <SEO
        title={product.title}
        description={`${product.overview} Get a free quote from NXT Financial's independent agents — no brokering fees, A-rated carriers only.`}
        canonical={`/insurance/${slug}`}
        ogImage={product.heroImage}
        ogType="article"
      />
      <main style={{ background: 'transparent', minHeight: '100vh', paddingBottom: '120px' }}>
        
        <div style={{ 
          position: 'relative', width: '100%', height: '50vh', minHeight: '400px',
          backgroundImage: `url(${product.heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
          display: 'flex', alignItems: 'center'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#0a2540', opacity: 0.85 }}></div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <button onClick={() => navigate('/insurances')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, marginBottom: '24px', padding: 0 }}>
              <ArrowLeft size={18} /> Back to All Products
            </button>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              {product.category}
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ color: 'white', fontSize: 'clamp(3rem, 5vw, 4.5rem)', margin: 0, lineHeight: 1.1 }}>
              {product.title}
            </motion.h1>
          </div>
        </div>

        <div className="container" style={{ paddingTop: '80px' }}>
          <div className="grid-2">
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '24px' }}>Overview</h2>
                <p className="text-large" style={{ color: '#425466', lineHeight: 1.8 }}>
                  {product.overview}
                </p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <h2 style={{ fontSize: '2.5rem', color: 'var(--color-heading)', marginBottom: '32px' }}>Key Coverage Benefits</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                  {product.keyBenefits.map((benefit, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                      <div style={{ color: 'var(--color-primary)', flexShrink: 0, marginTop: '4px' }}>
                        <CheckCircle2 size={28} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--color-heading)', marginBottom: '8px' }}>{benefit.title}</h3>
                        <p style={{ color: '#425466', lineHeight: 1.6, fontSize: '1.1rem', margin: 0 }}>{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                style={{ position: 'sticky', top: '120px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', padding: '40px', borderRadius: '16px', border: '1px solid var(--glass-border)', boxShadow: 'var(--glass-shadow)' }}
              >
                <h3 style={{ fontSize: '1.8rem', color: 'var(--color-heading)', marginBottom: '16px' }}>Ready to secure your rate?</h3>
                <p style={{ color: '#425466', marginBottom: '32px', lineHeight: 1.6 }}>
                  Our independent agents negotiate intensely across our top-tier carrier network to find the absolute best rates for your specific needs.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-heading)', fontWeight: 600 }}>
                    <ShieldCheck color="var(--color-primary)" size={20} /> A-Rated Carriers Only
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-heading)', fontWeight: 600 }}>
                    <Banknote color="var(--color-primary)" size={20} /> No Brokering Fees
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-heading)', fontWeight: 600 }}>
                    <ShieldAlert color="var(--color-primary)" size={20} /> Immediate Coverage Available
                  </div>
                </div>

                <Link to="/contact" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}>
                  Start {product.title} Quote
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </main>
    </PageTransition>
  );
};

export default ProductDetail;
