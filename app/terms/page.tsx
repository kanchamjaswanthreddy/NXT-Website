import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Terms of service', description: 'Terms of service for the NXT Financial Group website.' }

const SECTIONS = [
  { id: 's1', title: '1. Acceptance of Terms', body: 'By accessing or using the NXT Financial Group website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and continued use of our services constitutes acceptance of any changes.' },
  { id: 's2', title: '2. Services Description', body: 'NXT Financial Group is a licensed independent insurance brokerage. We provide insurance placement services, consultation requests, educational content, and related financial guidance. Our services are subject to applicable state and federal laws and regulations. We do not provide legal, tax, or investment advice.' },
  { id: 's3', title: '3. Insurance Quotes and Applications', body: 'Quotes provided through our website or advisors are estimates based on information you provide and are subject to underwriting approval. Final premiums may vary from quoted amounts. Coverage is not bound until you receive written confirmation from the applicable insurance carrier. NXT Financial Group acts as agent on your behalf and does not guarantee placement with any specific carrier.' },
  { id: 's4', title: '4. User Responsibilities', body: 'You agree to provide accurate and complete information when requesting quotes or applying for coverage. Providing false or misleading information may result in policy cancellation, denial of claims, or legal consequences. You are responsible for reviewing your policy documents and ensuring coverage meets your needs.' },
  { id: 's5', title: '5. Intellectual Property', body: 'All content on this website, including text, images, logos, and design elements, is the property of NXT Financial Group or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.' },
  { id: 's6', title: '6. Limitation of Liability', body: 'To the maximum extent permitted by law, NXT Financial Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim arising from these terms or our services shall not exceed the amount you paid us in the twelve months preceding the claim.' },
  { id: 's7', title: '7. Governing Law', body: 'These Terms of Service shall be governed by and construed in accordance with the laws of the Commonwealth of Massachusetts, without regard to conflict of law principles. Any disputes shall be resolved in the courts of Middlesex County, Massachusetts.' },
  { id: 's8', title: '8. Contact', body: 'For questions about these Terms of Service, contact us at: NXT Financial Group, 75 Pleasant Street, Unit 207, Malden, MA 02148. Email: info@nxtfinancialgroup.com. Phone: 857-205-3333.' },
]

export default function TermsPage() {
  return (
    <>
      <section className="bg-stone">
        <div className="container pb-16 pt-32 md:pb-20 md:pt-40">
          <p className="label-sm mb-5">Legal</p>
          <h1 className="display-xl text-navy">Terms of service</h1>
          <p className="mono mt-4 text-sm text-ink-soft">Effective January 1, 2025</p>
        </div>
      </section>
      <section className="section bg-white">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[260px_1fr]">
          <nav aria-label="Sections" className="hidden lg:block">
            <ol className="sticky top-28 space-y-2 border-l border-platinum text-sm">
              {SECTIONS.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-ink-soft hover:border-gold hover:text-navy">{s.title.replace(/^\d+\.\s/, '')}</a></li>
              ))}
            </ol>
          </nav>
          <div className="max-w-[720px]">
            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="mb-10 scroll-mt-32">
                <h2 className="h2 mb-3">{s.title}</h2>
                <p className="leading-7">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
