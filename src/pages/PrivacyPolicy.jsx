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

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Authorization of Use</h2>
              <p style={paragraphStyle}>
                NXT Financial Group hereby authorizes any person to access this Website for informational purposes only. NXT Financial Group reserves the right to terminate access to this Website at any time without notice. The data, information and material included in this Website is copyrighted by NXT Financial Group. All rights are reserved under the copyright laws of the United States of America. No part of this Website can be redistributed, copied or reproduced without the prior written consent of NXT Financial Group.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>No Warranties</h2>
              <p style={paragraphStyle}>
                The user of this Website assumes all responsibility and risk for the use of this Website and the Internet generally. NXT Financial Group, and its affiliated companies disclaim all warranties, representations or endorsements, expressed or implied, with regard to the data, information and material included in, or accessible from, this Website or the Internet, including, but not limited to, all implied warranties of merchantability, fitness for a particular purpose or noninfringement.
              </p>
              <p style={paragraphStyle}>
                NXT Financial Group and its affiliated companies have the right to discontinue, change or update any data, information or material included in the Website without prior notice, and they do not assume any legal liability or responsibility for the accuracy, completeness or usefulness of any data, information or material. Several of our pages describe various insurance products. The product descriptions are general in nature and the insurance coverages are subject to the specific terms of the actual policies issued.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Disclaimer of Liability</h2>
              <p style={paragraphStyle}>
                In no event shall NXT Financial Group or its affiliated companies be liable for any compensatory, special, direct, incidental, indirect, or consequential damages, exemplary damages or any damages whatsoever resulting from loss of use, data, information or profits arising out of or in connection with the use or performance of the data, information or material included in this Website or on the Internet generally or on any other basis.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Electronic Communications & Security</h2>
              <p style={paragraphStyle}>
                NXT Financial Group will not be deemed to have accepted any electronic communication unless NXT Financial Group provides the sender of the electronic communication with an acknowledgment verifying receipt of the communication. 
              </p>
              <p style={paragraphStyle}>
                Despite the security measures taken, there is an inherent risk in disclosing personal information over the Internet. Anyone electronically transmitting personal information assumes the risk that such information may be disclosed or intercepted by unintended third parties and NXT Financial Group disclaims all liability resulting from such interception or disclosure.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Privacy Statement & Information Collection</h2>
              <p style={paragraphStyle}>
                NXT Financial Group is committed to protecting your privacy as a visitor to this Website and as our customer. We are the owner of the information, which is collected on this Website. We will not sell, disseminate, disclose, trade, transmit, transfer, share, lease or rent any personally identifiable information to any third party not specifically authorized by you to receive your information except as we have disclosed to you in this Privacy Policy.
              </p>
              <p style={paragraphStyle}>
                We will ask you to provide your personal information to us when you enroll for coverage and when you purchase an insurance policy from us. When you send us e-mail from this Website or complete forms on this Website, you will provide us with certain personally identifiable information including your e-mail address. We may share this information with third parties who provide us services in the normal course of business including, but not limited to, insurance carriers and their affiliates.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Cookies</h2>
              <p style={paragraphStyle}>
                We transmit non-personally identifiable information to third party service providers that collect website statistics. One method of collecting such information is through the use of cookies. A cookie is a piece of data that is stored on a visitor’s hard drive while they are visiting this Website. Use of cookies helps us to improve our Website and to deliver a better and more personalized service.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Accessibility (ADA Compliance)</h2>
              <p style={paragraphStyle}>
                We are committed to making our website accessible to all users, including individuals with disabilities. We continually work to improve the accessibility of our website and review our content to identify and address potential accessibility barriers in accordance with the Americans with Disabilities Act (ADA), where applicable.
              </p>
            </div>

            <div style={sectionStyle}>
              <h2 style={headingStyle}>Changes In Our Privacy Policy</h2>
              <p style={paragraphStyle}>
                We reserve the right to change this Privacy Policy without providing you with advance notice of our intent to make the changes. If you have any questions about our privacy policy, please feel free to contact us at <a href="mailto:info@nxtfinancialgroup.com" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}>info@nxtfinancialgroup.com</a>.
              </p>
            </div>

          </motion.div>
        </div>
      </main>
    </PageTransition>
  );
};

export default PrivacyPolicy;
