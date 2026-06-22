import SEO from '../components/SEO'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description="Terms and conditions for using NXT Financial Group's website and insurance services. Read our service agreement and usage policies."
        canonical="/terms"
      />
      <section style={{ background: '#ffffff' }}>
      {/* Header */}
      <div className="bg-[#1c3f39] py-16 md:py-24">
        <div className="container">
          <span className="text-body-sm text-white/70 tracking-[1.5px] uppercase block mb-3">Legal</span>
          <h1 className="text-hero max-w-[560px]">Terms of Service</h1>
          <p className="text-body text-white/75 mt-3">Effective Date: January 1, 2025</p>
        </div>
      </div>

      <div className="container section-pad" style={{ maxWidth: '800px' }}>
        {[
          {
            heading: '1. Acceptance of Terms',
            body: 'By accessing or using the NXT Financial Group website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and continued use of our services constitutes acceptance of any changes.',
          },
          {
            heading: '2. Services Description',
            body: 'NXT Financial Group is a licensed independent insurance brokerage. We provide insurance placement services, insurance quotes, educational content, and related financial guidance. Our services are subject to applicable state and federal laws and regulations. We do not provide legal, tax, or investment advice.',
          },
          {
            heading: '3. Insurance Quotes and Applications',
            body: 'Quotes provided through our website or advisors are estimates based on information you provide and are subject to underwriting approval. Final premiums may vary from quoted amounts. Coverage is not bound until you receive written confirmation from the applicable insurance carrier. NXT Financial Group acts as agent on your behalf and does not guarantee placement with any specific carrier.',
          },
          {
            heading: '4. User Responsibilities',
            body: 'You agree to provide accurate and complete information when requesting quotes or applying for coverage. Providing false or misleading information may result in policy cancellation, denial of claims, or legal consequences. You are responsible for reviewing your policy documents and ensuring coverage meets your needs.',
          },
          {
            heading: '5. Intellectual Property',
            body: 'All content on this website, including text, images, logos, and design elements, is the property of NXT Financial Group or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.',
          },
          {
            heading: '6. Limitation of Liability',
            body: 'To the maximum extent permitted by law, NXT Financial Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim arising from these terms or our services shall not exceed the amount you paid us in the twelve months preceding the claim.',
          },
          {
            heading: '7. Governing Law',
            body: 'These Terms of Service shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Middlesex County, Massachusetts.',
          },
          {
            heading: '8. Contact',
            body: 'For questions about these Terms of Service, contact us at: NXT Financial Group, Everett, MA. Email: info@nxtfinancialgroup.com. Phone: 857-205-3333.',
          },
        ].map(({ heading, body }) => (
          <div key={heading} style={{ marginBottom: '36px' }}>
            <h2 style={{ fontFamily: 'Poppins, sans-serif', fontSize: '20px', fontWeight: 500, color: '#000', marginBottom: '10px' }}>{heading}</h2>
            <p className="text-body" style={{ color: '#444', lineHeight: '28px' }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
    </>
  )
}
