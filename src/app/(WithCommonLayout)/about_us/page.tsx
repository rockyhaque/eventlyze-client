import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Users, CreditCard, Shield, Award, Heart } from "lucide-react"
import teamwokeimage from "@/assets/TeamWoke.jpg";
import avatar from "@/assets/avatar.png";

export default function AboutUSPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#12081F] text-white py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-700/20 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Eventlyze </h1>
            <p className="text-xl text-purple-200 mb-8">
              We're on a mission to make event planning and participation seamless, secure, and enjoyable for everyone.
            </p>
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/register">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={teamwokeimage.src}
                alt="Our team"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#12081F]">Our Story</h2>
              <p className="text-gray-700">
                Event Planner was born from a simple observation: planning and joining events should be straightforward,
                but rarely is. In 2023, our team of event enthusiasts and tech innovators came together to create a
                platform that solves the common frustrations of event management.
              </p>
              <p className="text-gray-700">
                Whether you're hosting a small workshop or a large conference, our platform provides the tools you need
                to create, manage, and monetize your events. For attendees, we offer a seamless way to discover, join,
                and participate in events that matter to them.
              </p>
              <p className="text-gray-700">
                Today, Event Planner is trusted by thousands of event creators and participants worldwide, making
                meaningful connections happen every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#12081F] mb-4">Our Values</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              These core principles guide everything we do at Event Planner, from product development to customer
              support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#12081F]">Security & Trust</h3>
              <p className="text-gray-600">
                We prioritize the security of your data and financial transactions. Our platform is built with robust
                security measures to protect both event creators and participants.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#12081F]">Quality & Excellence</h3>
              <p className="text-gray-600">
                We're committed to delivering a high-quality platform that exceeds expectations. We continuously improve
                our features based on user feedback and industry best practices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-purple-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#12081F]">Community & Inclusion</h3>
              <p className="text-gray-600">
                We believe in creating a platform where everyone feels welcome. We foster a diverse and inclusive
                community where all types of events and participants can thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

    
    </div>
  )
}
