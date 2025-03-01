import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | InvestDirect',
  description:
    'Privacy Policy for InvestDirect - Learn how we collect, use, and protect your information.',
}

export default function PrivacyPolicy() {
  const lastUpdated = new Date('2025-03-01').toLocaleDateString('en-CA')
  const contactEmail = 'hello@investdirect.community'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last Updated: {lastUpdated}</p>

        <div className="space-y-6">
          <p>
            InvestDirect ("we," "our," or "us") values your privacy. This
            Privacy Policy outlines how we collect, use, and protect your
            information when you visit our website (the "Site"). This Site is
            intended for use by individuals who are above the age of majority in
            their respective Canadian province or territory.
          </p>

          <p>
            We are committed to complying with the British Columbia Personal
            Information Protection Act (PIPA) and the Personal Information
            Protection and Electronic Documents Act (PIPEDA), as well as any
            applicable provincial and federal privacy regulations.
          </p>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. Information We Collect
            </h2>
            <div className="ml-4">
              <p>
                <strong>Personal Information:</strong> When you register on our
                Site, we may collect personal details such as your name, email
                address, phone number, and financial information.
              </p>
              <p>
                <strong>Non-Personal Information:</strong> We may collect
                non-identifiable information, including IP addresses, browser
                type, operating system, and site usage data.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information collected to:</p>
            <ul className="list-disc ml-6">
              <li>Provide and improve our services.</li>
              <li>
                Facilitate connections between real estate investors and
                lenders.
              </li>
              <li>
                Communicate with you about updates, promotions, and services.
              </li>
              <li>
                Ensure compliance with PIPA, PIPEDA, and applicable Canadian
                legal and regulatory requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. Legal Basis for Processing Personal Information
            </h2>
            <p>We collect and process your personal information based on:</p>
            <ul className="list-disc ml-6">
              <li>Your consent, which you may withdraw at any time.</li>
              <li>
                Legitimate business interests, including fraud prevention and
                service improvement.
              </li>
              <li>
                Legal obligations, such as compliance with BCSC regulations and
                other applicable laws.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell or rent your personal information. However, we may
              share your data with:
            </p>
            <ul className="list-disc ml-6">
              <li>
                Service providers who assist in website operation and service
                delivery.
              </li>
              <li>
                Canadian regulatory authorities, such as the British Columbia
                Securities Commission (BCSC), if required by law.
              </li>
              <li>
                Business partners when necessary to facilitate investment
                opportunities, with your consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Data Retention and Security
            </h2>
            <p>
              We retain personal information only for as long as necessary to
              fulfill the purposes outlined in this policy or as required by
              law.
            </p>
            <p>
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, disclosure, or
              destruction. However, no online platform can guarantee complete
              security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Cookies and Tracking Technologies
            </h2>
            <p>
              Our Site may use cookies to improve user experience and analyze
              site traffic. You can adjust your browser settings to refuse
              cookies, but this may affect website functionality.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              7. Third-Party Links
            </h2>
            <p>
              Our Site may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              8. Your Rights and Choices
            </h2>
            <p>As a Canadian user, you have the right to:</p>
            <ul className="list-disc ml-6">
              <li>Access, correct, or delete your personal information.</li>
              <li>
                Withdraw consent for data processing at any time, subject to
                legal or contractual obligations.
              </li>
              <li>
                File a complaint with the Office of the Privacy Commissioner of
                Canada or the Office of the Information and Privacy Commissioner
                for British Columbia if you believe your privacy rights have
                been violated.
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, contact us at {contactEmail}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              9. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this policy from time to time to reflect changes in
              legal or regulatory requirements. Any changes will be posted on
              this page with the updated date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
            <p>
              For any questions about this Privacy Policy, please contact us at{' '}
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-600 hover:text-blue-800"
              >
                {contactEmail}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  )
}
