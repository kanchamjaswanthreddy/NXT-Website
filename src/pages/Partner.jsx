import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import { Network, Handshake, TrendingUp } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

const Partner = () => {
  return (
    <PageTransition>
      <SEO
        title="Partner with NXT Financial Group"
        description="Join NXT Financial's independent agent network. Access top-tier carrier contracts, vested renewals from day one, and complete backend support — no captive constraints."
        canonical="/partner"
        ogImage="https://www.nxtfinancialgroup.com/partner_hero.png"
      />
      <main style={{ position: 'relative', overflowX: 'hidden' }}>
        <div className="bg-slant-light"></div>
        <div className="container pt-nav" style={{ paddingBottom: '100px' }}>
          
          {/* HEADER */}
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="eyebrow" style={{ color: "var(--color-primary)" }}>JOIN OUR NETWORK</span>
            <h1 style={{ maxWidth: '1000px', margin: '0 auto', fontSize: '3.5rem', lineHeight: 1.2 }}>
              Build your legacy with a real partnership.
            </h1>
            <p className="text-large" style={{ maxWidth: '900px', margin: '30px auto', lineHeight: 1.6 }}>
              Are you a driven insurance professional looking to break free from captive carrier constraints? NXT Financial Group provides the technology, market access, and top-tier commission structures you need to scale your own agency without limits.
            </p>
          </motion.div>

          {/* ALIGNED HERO IMAGE AND TEXT */}
          <section className="grid-2 section-mb" style={{ alignItems: "center" }}>
            <div style={{ paddingRight: "20px" }}>
              <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
                <h2 style={{ fontSize: '3rem', marginBottom: '30px', lineHeight: 1.1 }}>
                  True independence empowered by scale.
                </h2>
                <p className="text-large" style={{ lineHeight: 1.6, marginBottom: '24px' }}>
                  Being independent shouldn't mean being alone. As an NXT Partner, you gain immediate access to our extensive network of A-rated carriers for Life, Health, Property, and Casualty lines. 
                </p>
                <p className="text-large" style={{ lineHeight: 1.6, marginBottom: '40px' }}>
                  We handle the overwhelming backend compliance and provide cutting-edge quoting tools, freeing you to do what you do best: advise your clients and close deals.
                </p>
                
                <Link to="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                  Apply to Partner
                </Link>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ position: 'relative' }}
            >
              <img 
                src="/partner_hero.png" 
                alt="Partner with NXT" 
                className="radius-lg"
                style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover', boxShadow: 'var(--shadow-lg)' }}
              />
            </motion.div>
          </section>

          {/* BENEFIT CARDS */}
          <section className="section-mb">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: '60px' }}>
               <h2 style={{ fontSize: "2.5rem" }}>Why partner with NXT?</h2>
            </motion.div>

            <div className="grid-3">
               {[
                 {
                   icon: <TrendingUp size={40} color="var(--color-primary)" />,
                   title: "Top-Tier Commissions",
                   desc: "Because of our aggregate volume, we secure the highest contract levels across dozens of top carriers, passing aggressive commission structures straight to you."
                 },
                 {
                   icon: <Handshake size={40} color="var(--color-primary)" />,
                   title: "Vested Renewals From Day One",
                   desc: "You own your book of business. We believe in transparent contracts where you control your assets and collect 100% of your vested renewals immediately."
                 },
                 {
                   icon: <Network size={40} color="var(--color-primary)" />,
                   title: "Complete Backend Support",
                   desc: "Gain access to our proprietary CRM, instant quoting engines, and dedicated underwriting support teams to accelerate your operational efficiency."
                 }
               ].map((val, idx) => (
                  <motion.div 
                    key={idx}
                    className="coverage-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                  >
                    <div style={{ marginBottom: '20px' }}>{val.icon}</div>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>{val.title}</h3>
                    <p style={{ fontSize: '1.05rem', color: '#425466', lineHeight: 1.6 }}>{val.desc}</p>
                  </motion.div>
               ))}
            </div>
          </section>
          
        </div>
      </main>
    </PageTransition>
  );
};

export default Partner;
