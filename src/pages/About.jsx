import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import LifeCalculator from '../components/LifeCalculator';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  })
};

const About = () => {
  return (
    <PageTransition>
      <main style={{ position: 'relative', overflowX: 'hidden' }}>
        <div className="bg-slant-light"></div>
        <div className="container pt-nav" style={{ minHeight: '100vh', paddingBottom: '100px' }}>
          
          {/* HEADER */}
          <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
            <span className="eyebrow" style={{ color: "var(--color-primary)" }}>INDEPENDENT & OBJECTIVE</span>
            <h1 style={{ maxWidth: '1000px', margin: '0 auto', fontSize: '3.5rem', lineHeight: 1.2 }}>The information agency you can genuinely count on.</h1>
            <p className="text-large" style={{ maxWidth: '900px', margin: '30px auto', lineHeight: 1.6 }}>
              NXT Financial Group is a fiercely independent advisory brokerage. We strip away the corporate jargon and confusing tiers to provide you with incredibly robust, custom coverage at a price you can finally afford.
            </p>
          </motion.div>

          {/* HERO IMAGE AND STATS (Fixed layout) */}
          <section className="grid-2 section-mb" style={{ alignItems: "center" }}>
            <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp}>
              <h2 style={{ fontSize: '3rem', marginBottom: '30px', lineHeight: 1.2 }}>
                Permanently cross "insurance" off your to-do list.
              </h2>
              <p className="text-large" style={{ lineHeight: 1.6, marginBottom: '24px' }}>
                We fundamentally believe that protecting your family’s legacy and your commercial assets shouldn’t be a bureaucratic nightmare. As an independent agency, our loyalties lie strictly with you—not with monolithic carriers.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px', marginTop: '40px' }}>
                <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--glass-shadow)' }}>
                  <h3 style={{ fontSize: '1.4rem', color: "var(--color-heading)", marginBottom: 8, lineHeight: 1.2 }}>Unbiased & Independent</h3>
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: '#425466' }}>We are free to choose the absolute best products from any carrier. No quotas, no forced products, just raw value.</p>
                </div>
                <div style={{ padding: '24px', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: '8px', borderLeft: '4px solid var(--color-primary)', boxShadow: 'var(--glass-shadow)' }}>
                  <h3 style={{ fontSize: '1.4rem', color: "var(--color-heading)", marginBottom: 8, lineHeight: 1.2 }}>Precision Tailored</h3>
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6, color: '#425466' }}>We ruthlessly calculate and establish the exact coverage limits required by your lifestyle—nothing more, nothing less.</p>
                </div>
              </div>

              <div style={{ marginTop: '40px' }}>
                <Link to="/contact" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>Schedule a Strategic Review</Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ position: 'relative' }}
            >
              <img 
                src="/about_hero_new.png" 
                alt="About NXT" 
                className="radius-lg"
                style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }}
              />
            </motion.div>
          </section>

          {/* CALCULATOR EXPLANATION SECTION */}
          <section className="section-mb">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: '60px' }}>
               <h2 style={{ fontSize: "3.5rem" }}>Coverage you actually need.</h2>
               <p className="text-large" style={{ maxWidth: '900px', margin: '20px auto', lineHeight: 1.6 }}>
                 Never wonder if you are overpaying or underinsured again. Use our strategic calculators to gauge your actual portfolio gap.
               </p>
            </motion.div>
            
            <div className="grid-2" style={{ alignItems: 'flex-start', gap: '60px' }}>
              <div style={{ padding: '20px' }}>
                 <h3 style={{ fontSize: '2.5rem', marginBottom: '20px', lineHeight: 1.2 }}>Data-driven assessment.</h3>
                 <p className="text-large" style={{ color: '#425466', marginBottom: '30px' }}>
                   Insurance planning shouldn't be a guessing game. By inputting your annual income, debt obligations, and future projected expenses (like college tuitions), you can quickly evaluate your target benchmark for Life Insurance.
                 </p>
                 <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }}></div> Reassess annually
                   </li>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }}></div> Cover major life events
                   </li>
                   <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.2rem', fontWeight: 500, color: 'var(--color-heading)' }}>
                     <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-primary)' }}></div> Leave a debt-free legacy
                   </li>
                 </ul>
              </div>
              
              <LifeCalculator />
            </div>
          </section>

          {/* HUMAN TRUST / TEAM */}
          <section className="section-mb">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: '60px' }}>
               <span className="eyebrow" style={{ color: "var(--color-primary)" }}>OUR CORE PHILOSOPHY</span>
               <h2 style={{ fontSize: "3.5rem" }}>Human relationships, powered by modern solutions.</h2>
               <p className="text-large" style={{ maxWidth: '900px', margin: '20px auto 0', lineHeight: 1.6 }}>
                 We utterly refuse to sell you generic, pre-packaged boxes of coverage. We advise, we interact, and we use the latest technology to quickly cross-reference thousands of available policies.
               </p>
            </motion.div>

            <div className="grid-3">
               {[
                 {
                   img: "/philosophy_1.png",
                   title: "Total Affordability Focus",
                   desc: "Why pay thousands in overlapping premiums? We painstakingly review your existing coverage across life, home, and auto. We establish proper coverage amounts and identify unnecessary fat to lower your premium costs."
                 },
                 {
                   img: "/about_hero_new.png",
                   title: "Strategic Future Proofing",
                   desc: "Life insurance isn't just about death benefits; it's a financial tool. We focus heavily on getting you out of debt faster. By setting up ironclad saving plans, we fund your retirement alongside protecting your life."
                 },
                 {
                   img: "/resources_hero.png",
                   title: "Mastering the 'Hard to Insure'",
                   desc: "Has a major carrier recently dropped you? Are coastal, high-value, or unique commercial properties holding your business back? We specialize in navigating niche markets and finding robust solutions."
                 }
               ].map((val, idx) => (
                  <motion.div 
                    key={idx}
                    className="card-solid"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    style={{ padding: 0, overflow: 'hidden' }}
                  >
                    <img src={val.img} alt={val.title} style={{ height: '240px', width: '100%', objectFit: 'cover' }} />
                    <div style={{ padding: "40px 30px" }}>
                      <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{val.title}</h3>
                      <p style={{ fontSize: '1.05rem', color: '#425466', lineHeight: 1.6 }}>{val.desc}</p>
                    </div>
                  </motion.div>
               ))}
            </div>
          </section>

          {/* TEAM SECTION */}
          <section className="section-mb white-bg radius-lg" style={{ padding: '80px 60px', boxShadow: 'var(--shadow-md)' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '60px' }}>
               <h2 style={{ fontSize: "3.5rem" }}>Meet the executive team</h2>
               <p className="text-large" style={{ maxWidth: '800px', margin: '0' }}>
                 We are fiercely protective of our clients. Work directly with industry veterans who understand exactly how to shield your assets.
               </p>
            </motion.div>

            {/* Grid for Team */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '50px 40px' }}>
              {[
                { name: 'SHIV THAKUR', title: 'Senior Executive Partner', img: '/shiv-thakur.jpeg' },
                { name: 'GITA THAKUR', title: 'Senior Executive Partner', img: '/gita-thakur.jpeg' }
              ].map((member, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '24px' }}
                >
                  <img src={member.img} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', boxShadow: 'var(--shadow-sm)' }} />
                  <div>
                    <h4 style={{ fontSize: '1.2rem', marginBottom: '4px', fontWeight: 700, color: '#0a2540' }}>{member.name}</h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: '0.95rem', fontWeight: 500 }}>{member.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </PageTransition>
  );
};

export default About;
