import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const Contact = () => {
  return (
    <PageTransition>
      <main style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', paddingBottom: '100px' }}>
        <div className="bg-slant-light"></div>
        <div className="container pt-nav">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="white-bg radius-lg contact-card"
            style={{ padding: '80px', maxWidth: '800px', margin: '0 auto', boxShadow: 'var(--shadow-md)' }}
          >
            <span className="eyebrow" style={{ textAlign: "center" }}>GET IN TOUCH</span>
            <h1 style={{ fontSize: '3.5rem', textAlign: 'center', lineHeight: 1.2 }}>Let's talk protection.</h1>
            <p className="text-large" style={{ textAlign: 'center', marginBottom: '50px' }}>
              Book a meeting with our advisors to shape your robust financial strategy.<br/>
              Or contact us directly at <a href="mailto:info@nxtfinancialgroup.com" style={{ color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'underline' }}>info@nxtfinancialgroup.com</a>
            </p>
            
            <form action="https://formsubmit.co/shiv@nxtfinancialgroup.com" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="hidden" name="_subject" value="New submission from NXT Financial Website" />
              <input type="hidden" name="_template" value="table" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontWeight: 500 }}>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Michael Scott" 
                  required
                  style={{
                    padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '1.05rem', outline: 'none', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)'
                  }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontWeight: 500 }}>Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="michael@dundermifflin.com" 
                  required
                  style={{
                    padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '1.05rem', outline: 'none', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)'
                  }} 
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <label style={{ fontWeight: 500 }}>Reason for inquiry</label>
                <textarea 
                  name="message"
                  rows="4" 
                  placeholder="I am looking to renew my corporate liability insurance..." 
                  required
                  style={{
                    padding: '16px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', fontSize: '1.05rem', outline: 'none', background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', resize: 'none'
                  }} 
                />
              </div>

              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Send message
              </button>
            </form>
          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default Contact;
