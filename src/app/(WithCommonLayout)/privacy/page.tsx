import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-[#12081F] hover:text-purple-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mt-4">
              <Shield className="h-8 w-8 text-purple-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-[#12081F]">Privacy Policy</h1>
            </div>
            <p className="text-gray-600 mt-2">Last Updated: April 30, 2025</p>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p>
              At Event Planner, we take your privacy seriously. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you use our website, services, and applications
              (collectively, the "Service"). Please read this Privacy Policy carefully. By using the Service, you
              consent to the data practices described in this policy.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">1. Information We Collect</h2>

            <p>
              <strong>1.1 Personal Information:</strong> We may collect personally identifiable information, such as:
            </p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing information</li>
              <li>Profile information</li>
              <li>Content you post or upload to the Service</li>
            </ul>

            <p>
              <strong>1.2 Non-Personal Information:</strong> We may also collect non-personal information, such as:
            </p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Browser type</li>
              <li>IP address</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Usage data</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">2. How We Use Your Information</h2>

            <p>We may use the information we collect for various purposes, including to:</p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Provide, maintain, and improve our Service</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative information, such as updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Personalize your experience and deliver content relevant to your interests</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our Service</li>
              <li>Detect, prevent, and address technical issues, fraud, and illegal activities</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">3. Sharing Your Information</h2>

            <p>We may share your information in the following situations:</p>

            <p>
              <strong>3.1 With Event Organizers:</strong> If you register for an event, we share your information with
              the event organizer to facilitate your participation.
            </p>

            <p>
              <strong>3.2 With Service Providers:</strong> We may share your information with third-party vendors,
              service providers, and other business partners who perform services on our behalf, such as payment
              processing, data analysis, email delivery, hosting, and customer service.
            </p>

            <p>
              <strong>3.3 For Legal Purposes:</strong> We may disclose your information where required by law or if we
              believe that such action is necessary to comply with legal obligations, protect our rights, or investigate
              potential violations of our Terms of Service.
            </p>

            <p>
              <strong>3.4 Business Transfers:</strong> In the event of a merger, acquisition, or sale of all or a
              portion of our assets, your information may be transferred as part of that transaction.
            </p>

            <p>
              <strong>3.5 With Your Consent:</strong> We may share your information with third parties when you have
              given us your consent to do so.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">4. Data Security</h2>

            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal
              information. However, please be aware that no method of transmission over the Internet or method of
              electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your
              personal information, we cannot guarantee its absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">5. Cookies and Tracking Technologies</h2>

            <p>
              We use cookies and similar tracking technologies to track activity on our Service and hold certain
              information. Cookies are files with a small amount of data that may include an anonymous unique
              identifier.
            </p>

            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However,
              if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">6. Your Data Protection Rights</h2>

            <p>Depending on your location, you may have the following rights regarding your personal information:</p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>The right to access the personal information we have about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent at any time</li>
            </ul>

            <p>
              To exercise these rights, please contact us at{" "}
              <a href="mailto:privacy@eventplanner.com" className="text-purple-700 hover:underline">
                privacy@eventplanner.com
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">7. Children's Privacy</h2>

            <p>
              Our Service is not directed to individuals under the age of 16. We do not knowingly collect personal
              information from children under 16. If you are a parent or guardian and you are aware that your child has
              provided us with personal information, please contact us. If we become aware that we have collected
              personal information from children without verification of parental consent, we take steps to remove that
              information from our servers.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">8. Changes to This Privacy Policy</h2>

            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You
              are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">9. International Transfers</h2>

            <p>
              Your information may be transferred to — and maintained on — computers located outside of your state,
              province, country, or other governmental jurisdiction where the data protection laws may differ from those
              of your jurisdiction. If you are located outside the United States and choose to provide information to
              us, please note that we transfer the data to the United States and process it there.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">10. Contact Us</h2>

            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@eventplanner.com" className="text-purple-700 hover:underline">
                privacy@eventplanner.com
              </a>
              .
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                By using our service, you acknowledge that you have read and understood this Privacy Policy.
              </p>
              <Button asChild className="bg-[#12081F] hover:bg-purple-900">
                <Link href="/register">Return to Register Form</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
