"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { MapPin, Clock, Tag, ChevronDown, ChevronUp, Globe, Utensils, Wifi, Accessibility, Car } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function EventDetailsContent() {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const scheduleRef = useRef(null)
  const venueRef = useRef(null)
  const isScheduleInView = useInView(scheduleRef, { once: true, amount: 0.3 })
  const isVenueInView = useInView(venueRef, { once: true, amount: 0.3 })

  // Sample event data
  const event = {
    id: 1,
    description: `
      Join us for the biggest tech conference of the year! The Tech Conference 2023: Innovation Summit brings together industry leaders, innovators, and tech enthusiasts for three days of inspiring talks, workshops, and networking opportunities.
      
      This year's theme is "Building the Future" with a focus on artificial intelligence, blockchain technology, and sustainable innovation. Hear from keynote speakers from leading tech companies, participate in hands-on workshops, and connect with like-minded professionals.
      
      The conference will feature:
      
      - Keynote presentations from industry leaders
      - Panel discussions on emerging technologies
      - Hands-on workshops and coding sessions
      - Startup showcase and pitch competition
      - Networking events and after-parties
      - Career fair with top tech companies
      
      Whether you're a developer, entrepreneur, investor, or tech enthusiast, this conference offers valuable insights and connections to help you stay ahead in the rapidly evolving tech landscape.
      
      Early bird tickets are available now. Register today to secure your spot at the most anticipated tech event of the year!
    `,
    tags: ["AI", "Blockchain", "Web3", "Startups", "Innovation"],
    schedule: [
      {
        day: "Day 1 - May 20",
        events: [
          { time: "8:00 AM - 9:00 AM", title: "Registration & Breakfast" },
          { time: "9:00 AM - 10:30 AM", title: "Opening Keynote: The Future of Tech" },
          { time: "11:00 AM - 12:30 PM", title: "Panel: AI Ethics and Governance" },
          { time: "12:30 PM - 2:00 PM", title: "Lunch Break & Networking" },
          { time: "2:00 PM - 3:30 PM", title: "Workshop: Building with Web3" },
          { time: "4:00 PM - 5:30 PM", title: "Fireside Chat: Startup Success Stories" },
          { time: "6:00 PM - 8:00 PM", title: "Welcome Reception" },
        ],
      },
      {
        day: "Day 2 - May 21",
        events: [
          { time: "8:30 AM - 9:30 AM", title: "Breakfast & Networking" },
          { time: "9:30 AM - 11:00 AM", title: "Keynote: The Metaverse Revolution" },
          { time: "11:30 AM - 1:00 PM", title: "Workshop: Advanced Machine Learning" },
          { time: "1:00 PM - 2:30 PM", title: "Lunch Break" },
          { time: "2:30 PM - 4:00 PM", title: "Panel: Sustainable Tech Solutions" },
          { time: "4:30 PM - 6:00 PM", title: "Startup Pitch Competition" },
          { time: "7:00 PM - 10:00 PM", title: "Gala Dinner & Awards" },
        ],
      },
      {
        day: "Day 3 - May 22",
        events: [
          { time: "8:30 AM - 9:30 AM", title: "Breakfast & Networking" },
          { time: "9:30 AM - 11:00 AM", title: "Workshop: Cybersecurity Best Practices" },
          { time: "11:30 AM - 1:00 PM", title: "Panel: The Future of Work" },
          { time: "1:00 PM - 2:30 PM", title: "Lunch Break" },
          { time: "2:30 PM - 4:00 PM", title: "Closing Keynote: Tech Trends 2024" },
          { time: "4:00 PM - 5:00 PM", title: "Closing Remarks & Networking" },
        ],
      },
    ],
    venue: {
      name: "Moscone Center",
      address: "747 Howard St, San Francisco, CA 94103",
      description:
        "The Moscone Center is San Francisco's premier convention and exhibition facility, located in the heart of the city.",
      amenities: ["Wi-Fi", "Accessible", "Food Court", "Parking", "Public Transit"],
      map: "/placeholder.svg?height=300&width=600&text=Venue+Map",
    },
    speakers: [
      {
        name: "Sarah Johnson",
        role: "AI Research Director, TechCorp",
        image: "/placeholder.svg?height=200&width=200&text=SJ",
        bio: "Leading AI researcher with over 15 years of experience in machine learning and neural networks.",
      },
      {
        name: "Michael Chen",
        role: "Founder & CEO, BlockChain Innovations",
        image: "/placeholder.svg?height=200&width=200&text=MC",
        bio: "Serial entrepreneur and blockchain pioneer who has founded three successful tech startups.",
      },
      {
        name: "Jessica Williams",
        role: "CTO, Future Technologies",
        image: "/placeholder.svg?height=200&width=200&text=JW",
        bio: "Technology leader specializing in sustainable tech solutions and ethical AI development.",
      },
    ],
  }

  const truncatedDescription = event.description.slice(0, 300) + "..."

  const amenityIcons = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    Accessible: <Accessibility className="h-4 w-4" />,
    "Food Court": <Utensils className="h-4 w-4" />,
    Parking: <Car className="h-4 w-4" />,
    "Public Transit": <Globe className="h-4 w-4" />,
  }

  return (
    <div className="space-y-8 bg-card rounded-xl border p-6 shadow-sm">
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="venue">Venue</TabsTrigger>
          <TabsTrigger value="speakers">Speakers</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-bold">About This Event</h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="whitespace-pre-line">{showFullDescription ? event.description : truncatedDescription}</p>
              {event.description.length > 300 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 flex items-center gap-1"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span>Read More</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-bold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1 text-sm py-1 px-3">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Event Schedule</h2>
            <div className="space-y-8" ref={scheduleRef}>
              {event.schedule.map((day, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isScheduleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="font-display text-xl font-bold text-primary">{day.day}</h3>
                  <div className="space-y-3">
                    {day.events.map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex flex-col gap-1 rounded-lg border p-4 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <div className="font-medium">{item.title}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary" />
                          {item.time}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="venue" className="space-y-6 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Venue Information</h2>
            <div className="grid gap-6 md:grid-cols-2" ref={venueRef}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isVenueInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-2 font-display text-xl font-medium">{event.venue.name}</h3>
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  {event.venue.address}
                </div>
                <p className="mb-6 text-muted-foreground">{event.venue.description}</p>

                <div className="space-y-4">
                  <h4 className="font-medium">Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.venue.amenities.map((amenity) => (
                      <Badge key={amenity} variant="outline" className="gap-1 py-1 px-3">
                        {amenityIcons[amenity as keyof typeof amenityIcons] || <Globe className="h-4 w-4" />}
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isVenueInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="overflow-hidden rounded-lg border"
                whileHover={{ scale: 1.02 }}
              >
                <Image
                  src={event.venue.map || "/placeholder.svg"}
                  alt="Venue Map"
                  width={600}
                  height={300}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="speakers" className="space-y-6 pt-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Featured Speakers</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {event.speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  className="group flex flex-col items-center rounded-xl border p-6 text-center transition-all hover:border-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-primary/20 transition-all duration-300 group-hover:border-primary">
                    <Image
                      src={speaker.image || "/placeholder.svg"}
                      alt={speaker.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <h3 className="mb-1 font-display text-lg font-bold">{speaker.name}</h3>
                  <p className="mb-3 text-sm text-primary">{speaker.role}</p>
                  <p className="text-sm text-muted-foreground">{speaker.bio}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
