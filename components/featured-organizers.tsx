"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample organizers data
const organizers = [
  {
    id: 1,
    name: "TechEvents Inc.",
    image: "/placeholder.svg?height=100&width=100&text=TE",
    coverImage: "/placeholder.svg?height=300&width=800&text=TechEvents+Cover",
    description: "Leading technology conference and workshop organizer with a focus on innovation and education.",
    eventCount: 24,
    followerCount: 5600,
    rating: 4.8,
    verified: true,
    categories: ["Technology", "Business", "Education"],
    featuredEvent: {
      id: 101,
      title: "Tech Conference 2023",
      date: "May 20-22, 2023",
      location: "San Francisco, CA",
      image: "/placeholder.svg?height=200&width=300&text=Tech+Conference",
    },
  },
  {
    id: 2,
    name: "Festival Productions",
    image: "/placeholder.svg?height=100&width=100&text=FP",
    coverImage: "/placeholder.svg?height=300&width=800&text=Festival+Productions+Cover",
    description: "Creating unforgettable music and cultural festivals across the country since 2005.",
    eventCount: 18,
    followerCount: 8900,
    rating: 4.9,
    verified: true,
    categories: ["Music", "Arts", "Entertainment"],
    featuredEvent: {
      id: 102,
      title: "Summer Music Festival",
      date: "June 15-18, 2023",
      location: "Central Park, NY",
      image: "/placeholder.svg?height=200&width=300&text=Music+Festival",
    },
  },
  {
    id: 3,
    name: "Taste Ventures",
    image: "/placeholder.svg?height=100&width=100&text=TV",
    coverImage: "/placeholder.svg?height=300&width=800&text=Taste+Ventures+Cover",
    description: "Curating exceptional food and beverage experiences through tastings, expos, and culinary tours.",
    eventCount: 32,
    followerCount: 4200,
    rating: 4.7,
    verified: true,
    categories: ["Food & Drink", "Lifestyle", "Culinary"],
    featuredEvent: {
      id: 103,
      title: "Food & Wine Expo",
      date: "July 8-10, 2023",
      location: "Chicago, IL",
      image: "/placeholder.svg?height=200&width=300&text=Food+Expo",
    },
  },
  {
    id: 4,
    name: "Startup Texas",
    image: "/placeholder.svg?height=100&width=100&text=ST",
    coverImage: "/placeholder.svg?height=300&width=800&text=Startup+Texas+Cover",
    description: "Supporting entrepreneurs through networking events, pitch competitions, and educational workshops.",
    eventCount: 15,
    followerCount: 3800,
    rating: 4.6,
    verified: false,
    categories: ["Business", "Technology", "Entrepreneurship"],
    featuredEvent: {
      id: 104,
      title: "Startup Pitch Competition",
      date: "September 12, 2023",
      location: "Austin, TX",
      image: "/placeholder.svg?height=200&width=300&text=Startup+Pitch",
    },
  },
]

export function FeaturedOrganizers() {
  const [activeOrganizer, setActiveOrganizer] = useState(organizers[0].id)

    return null
    return (
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Top Event Organizers</h2>
            <p className="mt-2 text-muted-foreground">
              Discover events from trusted organizers with proven track records
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            {/* Organizers list */}
            <div className="space-y-4">
              <h3 className="font-display text-xl font-bold">Featured Organizers</h3>

              <div className="space-y-3">
                {organizers.map((organizer) => (
                  <motion.div
                    key={organizer.id}
                    whileHover={{ x: 5 }}
                    className={cn(
                      "cursor-pointer rounded-lg border p-4 transition-all hover:border-primary",
                      activeOrganizer === organizer.id && "border-primary bg-primary/5",
                    )}
                    onClick={() => setActiveOrganizer(organizer.id)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-background">
                        <AvatarImage src={organizer.image || "/placeholder.svg"} alt={organizer.name} />
                        <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">{organizer.name}</h4>
                          {organizer.verified && (
                            <Badge variant="secondary" className="h-5 px-1">
                              <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-[10px]">Verified</span>
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{organizer.eventCount} events</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{organizer.rating}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Organizer details */}
            <div>
              {organizers
                .filter((organizer) => organizer.id === activeOrganizer)
                .map((organizer) => (
                  <motion.div
                    key={organizer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-xl border bg-card"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={organizer.coverImage || "/placeholder.svg"}
                        alt={`${organizer.name} cover`}
                        width={800}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-4 left-4 flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-4 border-background">
                          <AvatarImage src={organizer.image || "/placeholder.svg"} alt={organizer.name} />
                          <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-display text-xl font-bold text-white">{organizer.name}</h3>
                            {organizer.verified && (
                              <Badge variant="secondary" className="h-5 px-1">
                                <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-[10px]">Verified</span>
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-sm text-white/80">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{organizer.eventCount} events</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{organizer.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="mb-4 text-muted-foreground">{organizer.description}</p>

                      <div className="mb-4 flex flex-wrap gap-2">
                        {organizer.categories.map((category) => (
                          <Badge key={category} variant="outline">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <h4 className="mb-4 font-display text-lg font-bold">Featured Event</h4>

                      <div className="flex flex-col sm:flex-row gap-4 rounded-lg border p-4">
                        <div className="relative aspect-[3/2] w-full sm:w-1/3 overflow-hidden rounded-md">
                          <Image
                            src={organizer.featuredEvent.image || "/placeholder.svg"}
                            alt={organizer.featuredEvent.title}
                            width={300}
                            height={200}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h5 className="mb-1 font-display text-lg font-bold">{organizer.featuredEvent.title}</h5>
                          <div className="mb-3 flex flex-col gap-1 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-primary" />
                              <span>{organizer.featuredEvent.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-primary" />
                              <span>{organizer.featuredEvent.location}</span>
                            </div>
                          </div>
                          <Button size="sm" className="">
                            View Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </div>
      </section>
    )
}
