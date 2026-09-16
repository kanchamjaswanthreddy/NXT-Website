import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
export const metadata: Metadata = { title: 'Privacy policy', description: "NXT Financial Group's privacy policy." }
const SECTIONS = [
          {
            heading: '1. Information We Collect',
            body: 'NXT Financial Group collects information you provide directly to us, such as when you request a quote, contact us, or use our calculators. This may include your name, email address, phone number, address, and details about your insurance needs. We also collect information automatically when you visit our website, including your IP address, browser type, and pages visited.',
          },
          {
            heading: '2. How We Use Your Information',
            body: 'We use the information we collect to provide, maintain, and improve our services; process consultation requests and applications; communicate with you about your account or transactions; send promotional communications (which you can opt out of at any time); comply with legal obligations; and protect our services and users.',
          },
          {
            heading: '3. Information Sharing',
            body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with insurance carriers and underwriters to process your quote or application; service providers who assist in our operations; legal or regulatory authorities when required by law; and in connection with a business transaction such as a merger or acquisition.',
          },
          {
            heading: '4. Data Security',
            body: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
          },
          {
            heading: '5. Cookies',
            body: 'Our website uses cookies and similar tracking technologies to enhance your experience, analyze usage, and assist in our marketing efforts. You can control cookie settings through your browser preferences. Disabling cookies may affect the functionality of certain features on our website.',
          },
          {
            heading: '6. Your Rights',
            body: 'Depending on your location, you may have the right to access, correct, or delete your personal information; object to or restrict certain processing; request data portability; and withdraw consent where processing is based on consent. To exercise these rights, contact us at info@nxtfinancialgroup.com.',
          },
          {
            heading: '7. Contact Us',
            body: 'If you have questions about this Privacy Policy or our data practices, please contact us at: NXT Financial Group, Everett, MA. Email: info@nxtfinancialgroup.com. Phone: 857-205-3333.',
          },
        ]
export default function PrivacyPolicyPage() { return <LegalPage title="Privacy policy" effective="January 1, 2025" sections={SECTIONS} /> }
