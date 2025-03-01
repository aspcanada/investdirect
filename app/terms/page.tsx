import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Mr ALM',
  description:
    'Terms of Use for Mr ALM - Understanding your rights and obligations when using our platform.',
}

export default function TermsOfUse() {
  const lastUpdated = new Date('2025-03-01').toLocaleDateString('en-CA')
  const contactEmail = 'hi@mr-arm-length-mortgage.com'

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <article className="prose prose-slate max-w-none">
        <h1 className="text-3xl font-bold mb-6">Terms of Use</h1>
        <p className="text-gray-600 mb-8">Last Updated: {lastUpdated}</p>

        <div className="space-y-6">
          <section>
            <p>
              Welcome to Mr ALM. By accessing or using our website and services,
              you agree to be bound by these Terms of Use ("Terms"). Please read
              these Terms carefully before using our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Mr ALM's website and services (the
              "Platform"), you acknowledge that you have read, understood, and
              agree to be bound by these Terms, as well as our Privacy Policy.
              If you do not agree to these Terms, please do not use our
              Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">2. Eligibility</h2>
            <div className="space-y-4">
              <p>To use our Platform, you must:</p>
              <ul className="list-disc ml-6">
                <li>
                  Be of legal age in your province or territory of residence (at
                  least 18 or 19 years old, depending on your jurisdiction)
                </li>
                <li>Be a resident of Canada</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              3. Investment Risks and Disclaimers
            </h2>
            <div className="space-y-4">
              <p>
                All investments carry risk, and past performance is not
                indicative of future results. By using our Platform, you
                acknowledge:
              </p>
              <ul className="list-disc ml-6">
                <li>Investment values can fluctuate substantially</li>
                <li>You may lose some or all of your investment</li>
                <li>Investment decisions are your sole responsibility</li>
                <li>
                  Information provided on our Platform does not constitute
                  financial advice
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              4. Account Registration and Security
            </h2>
            <div className="space-y-4">
              <p>When creating an account, you agree to:</p>
              <ul className="list-disc ml-6">
                <li>Provide accurate and complete information</li>
                <li>
                  Maintain the confidentiality of your account credentials
                </li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>
                  Take responsibility for all activities under your account
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              5. Platform Rules and Conduct
            </h2>
            <div className="space-y-4">
              <p>You agree not to:</p>
              <ul className="list-disc ml-6">
                <li>Violate any applicable laws or regulations</li>
                <li>Impersonate any person or entity</li>
                <li>Interfere with the Platform's operation</li>
                <li>Upload or transmit malicious code</li>
                <li>Engage in fraudulent activities</li>
                <li>Harass, abuse, or harm others</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              6. Intellectual Property
            </h2>
            <p>
              All content on the Platform, including but not limited to text,
              graphics, logos, images, and software, is the property of Mr ALM
              or its licensors and is protected by Canadian and international
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              7. Third-Party Content and Links
            </h2>
            <p>
              Our Platform may contain links to third-party websites or content.
              We are not responsible for any third-party content or websites.
              Your use of third-party services is at your own risk and subject
              to their terms and policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, Mr ALM and its affiliates
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from your use of the
              Platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              9. Regulatory Compliance
            </h2>
            <div className="space-y-4">
              <p>
                Mr ALM operates in compliance with applicable Canadian
                securities laws and regulations, including:
              </p>
              <ul className="list-disc ml-6">
                <li>Provincial Securities Acts</li>
                <li>
                  Investment Industry Regulatory Organization of Canada (IIROC)
                  rules
                </li>
                <li>Anti-Money Laundering (AML) regulations</li>
                <li>Know Your Client (KYC) requirements</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              10. Modifications to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify users of any material changes via email or through the
              Platform. Your continued use of the Platform after such
              modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              11. Termination
            </h2>
            <p>
              We reserve the right to terminate or suspend your account and
              access to the Platform at our sole discretion, without notice, for
              conduct that we believe violates these Terms or is harmful to
              other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              12. Governing Law
            </h2>
            <p>
              These Terms are governed by and construed in accordance with the
              laws of British Columbia, Canada, without regard to its conflict
              of law principles. Any disputes arising under these Terms shall be
              subject to the exclusive jurisdiction of the courts of British
              Columbia.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
              13. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at{' '}
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
