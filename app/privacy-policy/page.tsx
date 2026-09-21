import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy policy', description: "NXT Financial Group's privacy policy." }

const SECTIONS = [
  { id: 's1', title: '1. Information We Collect', body: 'NXT Financial Group collects information you provide directly to us, such as when you request a quote, contact us, or use our calculators. This may include your name, email address, phone number, address, and details about your insurance needs. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.' },
  { id: 's2', title: '2. How We Use Your Information', body: 'We use the information we collect to provide, maintain, and improve our services; process consultation requests and applications; communicate with you about your account or transactions; send promotional communications (which you can opt out of at any time); comply with legal obligations; and protect our services and users.' },
  { id: 's3', title: '3. Information Sharing', body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with insurance carriers and underwriters to process your quote or application; service providers who assist in our operations; legal or regulatory authorities when required by law; and in connection with a business transaction such as a merger or acquisition.' },
  { id: 's4', title: '4. Data Security', body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.' },
  { id: 's5', title: '5. Cookies', body: 'Our website uses cookies and similar tracking technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain features on our website.' },
  { id: 's6', title: '6. Your Rights', body: 'Depending on your location, you may have the right to access, correct, or delete your personal information; object to or restrict certain processing; request data portability; and withdraw consent where processing is based on consent. To exercise these rights, contact us at info@nxtfinancialgroup.com.' },
  { id: 's7', title: '7. Contact Us', body: 'If you have questions about this Privacy Policy or our data practices, please contact us at: NXT Financial Group, 75 Pleasant Street, Unit 207, Malden, MA 02148. Email: info@nxtfinancialgroup.com. Phone: 857-205-3333.' },
]

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-stone">
        <div className="container pb-16 pt-32 md:pb-20 md:pt-40">
          <p className="label-sm mb-5">Legal</p>
          <h1 className="display-xl text-navy">Privacy policy</h1>
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
