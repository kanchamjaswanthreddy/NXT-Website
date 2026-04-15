import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const sectionStyle = {
  marginBottom: '40px'
};

const headingStyle = {
  color: 'var(--color-heading)',
  fontSize: '1.6rem',
  marginBottom: '16px',
  fontWeight: 700
};

const paragraphStyle = {
  color: '#425466',
  fontSize: '1.05rem',
  lineHeight: 1.7,
  marginBottom: '16px'
};

const TermsOfService = () => {
  return (
    <PageTransition>
      <main style={{ position: 'relative', overflowX: 'hidden', minHeight: '100vh', paddingBottom: '100px', paddingTop: '140px' }}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              padding: '60px 80px', 
              maxWidth: '1000px', 
              margin: '0 auto', 
              boxShadow: 'var(--glass-shadow)',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              WebkitBackdropFilter: 'var(--glass-blur)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px'
            }}
          >
            <span style={{ display: 'block', color: 'var(--color-primary)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
              LEGAL & COMPLIANCE
            </span>
            <h1 style={{ fontSize: '3rem', lineHeight: 1.2, color: 'var(--color-heading)', marginBottom: '40px', borderBottom: '2px solid rgba(0,0,0,0.05)', paddingBottom: '24px' }}>
              Terms and Conditions
            </h1>

            <div style={sectionStyle}>
              <p style={paragraphStyle}>
                These terms and conditions outline the rules and regulations for the use of the NXT Financial Group Website.
              </p>
              <p style={paragraphStyle}>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use NXT Financial Group if you do not agree to take all of the terms and conditions stated on this page.
              </p>
              <p style={paragraphStyle}>
                The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Cookies</h2>
              <p style={paragraphStyle}>
                We employ the use of cookies. By accessing NXT Financial Group, you agreed to use cookies in agreement with NXT Financial Group’s Privacy Policy. Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>License</h2>
              <p style={paragraphStyle}>
                Unless otherwise stated, NXT Financial Group and/or its licensors own the intellectual property rights for all material on NXT Financial Group. All intellectual property rights are reserved. You may access this from NXT Financial Group for your own personal use subjected to restrictions set in these terms and conditions.
              </p>
              <p style={paragraphStyle}>
                You must not:
                <ul style={{ paddingLeft: '40px', marginTop: '10px' }}>
                  <li>Republish material from NXT Financial Group</li>
                  <li>Sell, rent or sub-license material from NXT Financial Group</li>
                  <li>Reproduce, duplicate or copy material from NXT Financial Group</li>
                  <li>Redistribute content from NXT Financial Group</li>
                </ul>
              </p>
              <p style={paragraphStyle}>
                Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. NXT Financial Group does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of NXT Financial Group, its agents and/or affiliates. To the extent permitted by applicable laws, NXT Financial Group shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Hyperlinking to our Content</h2>
              <p style={paragraphStyle}>
                The following organizations may link to our Website without prior written approval: Government agencies, Search engines, News organizations, and Online directory distributors.
              </p>
              <p style={paragraphStyle}>
                These organizations may link to our home page, to publications or to other Website information so long as the link: (a) is not in any way deceptive; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products and/or services; and (c) fits within the context of the linking party’s site.
              </p>
              <p style={paragraphStyle}>
                No use of NXT Financial Group’s logo or other artwork will be allowed for linking absent a trademark license agreement.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Content Liability</h2>
              <p style={paragraphStyle}>
                We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Reservation of Rights & Removal of links</h2>
              <p style={paragraphStyle}>
                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
              </p>
              <p style={paragraphStyle}>
                We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Disclaimer</h2>
              <p style={paragraphStyle}>
                To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will limit or exclude our or your liability for death or personal injury, or limit or exclude our or your liability for fraud or fraudulent misrepresentation.
              </p>
              <p style={paragraphStyle}>
                As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
              </p>
            </div>

          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default TermsOfService;
