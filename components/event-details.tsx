"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users, Clock, Share2, Heart, Globe, Tag, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function EventDetails() {
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Sample event data
  const event = {
    id: 1,
    title: "Tech Conference 2023: Innovation Summit",
    image: "/placeholder.svg?height=600&width=1200&text=Tech+Conference+2023",
    date: "May 20-22, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Moscone Center, San Francisco, CA",
    price: "$299",
    category: "Technology",
    tags: ["AI", "Blockchain", "Web3", "Startups", "Innovation"],
    attendees: 1200,
    organizer: {
      name: "TechEvents Inc.",
      image: "/placeholder.svg?height=100&width=100&text=TE",
      events: 24,
      rating: 4.8,
    },
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
  }

  const truncatedDescription = event.description.slice(0, 300) + "..."

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="relative mb-6 overflow-hidden rounded-xl">
          <div className="aspect-[2/1] w-full">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={1200}
              height={600}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-primary/90 hover:bg-primary/80">{event.category}</Badge>
              <Badge variant="outline" className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50">
                {event.price}
              </Badge>
            </div>

            <h1 className="mb-2 font-display text-2xl font-bold text-white sm:text-3xl md:text-4xl">{event.title}</h1>

            <div className="flex flex-wrap gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{event.attendees.toLocaleString()} attendees</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage src={event.organizer.image || "/placeholder.svg"} alt={event.organizer.name} />
              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-medium">{event.organizer.name}</div>
              <div className="text-xs text-muted-foreground">
                {event.organizer.events} events · {event.organizer.rating} ★
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={cn("h-4 w-4", isLiked && "fill-red-500 text-red-500")} />
              <span>Save</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="venue">Venue</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6 pt-4">
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">About This Event</h2>
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
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1">
                  <Tag className="h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6 pt-4">
          <h2 className="font-display text-xl font-bold">Event Schedule</h2>
          <div className="space-y-6">
            {event.schedule.map((day, index) => (
              <div key={index} className="space-y-4">
                <h3 className="font-display text-lg font-bold text-primary">{day.day}</h3>
                <div className="space-y-3">
                  {day.events.map((item, i) => (
                    <div
                      key={i}
                      className="flex flex-col gap-1 rounded-lg border p-3 transition-colors hover:bg-muted sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="venue" className="space-y-6 pt-4">
          <h2 className="font-display text-xl font-bold">Venue Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-display text-lg font-medium">{event.venue.name}</h3>
              <p className="mb-4 text-muted-foreground">{event.venue.address}</p>
              <p className="mb-4 text-muted-foreground">{event.venue.description}</p>

              <div className="space-y-2">
                <h4 className="font-medium">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {event.venue.amenities.map((amenity) => (
                    <Badge key={amenity} variant="outline" className="gap-1">
                      <Globe className="h-3 w-3" />
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <Image
                src={event.venue.map || "/placeholder.svg"}
                alt="Venue Map"
                width={600}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
