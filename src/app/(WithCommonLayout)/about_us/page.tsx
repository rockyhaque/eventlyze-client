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

      
    </div>
  )
}
