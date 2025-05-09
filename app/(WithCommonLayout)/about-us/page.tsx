import { DashboardSidebar } from "@/components/dashboard-sidebar"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, Clock, Globe, Mail, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <>

      <div className="flex-1 p-6 md:p-8 overflow-hidden container">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            About Eventify
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting people through extraordinary events and creating unforgettable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At Eventify, we believe that events have the power to transform lives, build communities, and create
              lasting memories. Our mission is to make event discovery, creation, and management seamless and accessible
              to everyone.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Whether you're looking to attend a local workshop, organize a major conference, or simply connect with
              like-minded individuals, Eventify provides the tools and platform to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                size="lg"
                asChild
                className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
              >
                <Link href="/dashboard/create-event">Create Your Event</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-md">
                <Link href="/events">Explore Events</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
            <Image src="/placeholder.svg" alt="People at an event" fill className="object-cover" />
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Eventify</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-2">
                <Globe className="h-10 w-10 text-primary mb-4 group-hover:animate-float" />
                <CardTitle>Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect with attendees and organizers from around the world. Our platform hosts events from over 50
                  countries.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-2">
                <CheckCircle className="h-10 w-10 text-primary mb-4 group-hover:animate-float" />
                <CardTitle>Easy to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our intuitive interface makes creating, managing, and discovering events simple and straightforward.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-2">
                <Users className="h-10 w-10 text-primary mb-4 group-hover:animate-float" />
                <CardTitle>Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We prioritize building meaningful connections between attendees and organizers to foster vibrant
                  communities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Sarah Johnson", role: "CEO & Founder" },
              { name: "Michael Chen", role: "CTO" },
              { name: "Priya Patel", role: "Head of Design" },
              { name: "David Wilson", role: "Head of Marketing" },
            ].map((member) => (
              <div key={member.name} className="text-center group">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden mb-4 bg-muted border-2 border-primary/20 group-hover:border-primary transition-colors duration-300">
                  <Image src="/placeholder.svg" alt={member.name} width={160} height={160} className="object-cover" />
                </div>
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-xl p-8 md:p-12 shadow-md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <Mail className="h-8 w-8 mx-auto text-primary mb-2 group-hover:animate-float" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  <a href="mailto:contact@eventify.com" className="hover:underline">
                    contact@eventify.com
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <MapPin className="h-8 w-8 mx-auto text-primary mb-2 group-hover:animate-float" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  123 Event Street
                  <br />
                  San Francisco, CA 94103
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-md hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="text-center pb-2">
                <Clock className="h-8 w-8 mx-auto text-primary mb-2 group-hover:animate-float" />
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Monday - Friday
                  <br />
                  9:00 AM - 6:00 PM PST
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
