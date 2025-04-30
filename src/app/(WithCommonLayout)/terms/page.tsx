import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mt-4 text-[#12081F]">Terms of Service</h1>
            <p className="text-gray-600 mt-2">Last Updated: April 30, 2025</p>
          </div>

          <div className="prose max-w-none text-gray-700">
            <p>
             {
                ` Welcome to Event Planner. These Terms of Service ("Terms") govern your access to and use of the Event
              Planner website, services, and applications (collectively, the "Service"). Please read these Terms
              carefully before using our Service.`
             }
            </p>

            <p>
              By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of
              the Terms, you may not access the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">1. Accounts</h2>

            <p>
              When you create an account with us, you must provide accurate, complete, and current information. Failure
              to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>

            <p>
              You are responsible for safeguarding the password used to access the Service and for any activities or
              actions under your password. You agree not to disclose your password to any third party. You must notify
              us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">2. Event Creation and Participation</h2>

            <p>
              <strong>2.1 Event Creation:</strong> As a registered user, you may create events on our platform. You are
              solely responsible for the content, accuracy, and legality of your events. Events must comply with all
              applicable laws and regulations.
            </p>

            <p>
              <strong>2.2 Event Types:</strong> You may create Public or Private events, with or without registration
              fees. You are responsible for accurately describing your event, including any fees, restrictions, or
              requirements for participation.
            </p>

            <p>
              <strong>2.3 Participation:</strong> {
                `Users may join or request to join events based on the event's
              settings. Event creators have the right to approve or reject participation requests and to remove
              participants from their events.`
              }
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">3. Payments and Fees</h2>

            <p>
              <strong>3.1 Registration Fees:</strong> Event creators may charge registration fees for their events. All
              fees must be paid through our platform using our designated payment processors.
            </p>

            <p>
              <strong>3.2 Platform Fees:</strong> We may charge a service fee for using our platform. These fees will be
              clearly disclosed before any transaction is completed.
            </p>

            <p>
              <strong>3.3 Refunds:</strong> Refund policies for event registration fees are set by event creators. We
              are not responsible for processing refunds for event registration fees, except as required by law.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">4. Content Guidelines</h2>

            <p>You agree not to use the Service to post, upload, or share content that:</p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Is illegal, harmful, threatening, abusive, harassing, defamatory, or invasive of privacy</li>
              <li>Infringes on intellectual property rights of others</li>
              <li>
                Contains software viruses or any other code designed to interrupt, destroy, or limit functionality
              </li>
              <li>Is false, inaccurate, or misleading</li>
              <li>Promotes discrimination, bigotry, racism, hatred, or harm against any individual or group</li>
              <li>Is violent or threatening or promotes violence or actions that threaten any person or entity</li>
            </ul>

            <p>
              We reserve the right to remove any content that violates these guidelines and to terminate accounts of
              users who repeatedly violate them.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">5. Intellectual Property</h2>

            <p>
              The Service and its original content, features, and functionality are and will remain the exclusive
              property of Event Planner and its licensors. The Service is protected by copyright, trademark, and other
              laws of both the United States and foreign countries.
            </p>

            <p>
              By posting content on our Service, you grant us a non-exclusive, worldwide, royalty-free license to use,
              reproduce, modify, adapt, publish, translate, and distribute it in any media format for the purpose of
              providing and promoting the Service.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">6. Limitation of Liability</h2>

            <p>
              In no event shall Event Planner, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>

            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Your access to or use of or inability to access or use the Service</li>
              <li>Any conduct or content of any third party on the Service</li>
              <li>Any content obtained from the Service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">7. Termination</h2>

            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason,
              including without limitation if you breach the Terms. Upon termination, your right to use the Service will
              immediately cease.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">8. Changes to Terms</h2>

            <p>
              {`We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try
              to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material
              change will be determined at our sole discretion.`}
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">9. Governing Law</h2>

            <p>
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without
              regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-[#12081F]">10. Contact Us</h2>

            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:support@eventplanner.com" className="text-purple-700 hover:underline">
                support@eventplanner.com
              </a>
              .
            </p>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-600 text-sm">
                By using our service, you acknowledge that you have read and understood these Terms of Service.
              </p>
              <Button asChild className=" hover:bg-purple-900">
                <Link href="/register">Return to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
