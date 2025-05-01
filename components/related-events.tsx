"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { Calendar, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Sample related events data
const relatedEvents = [
  {
    id: 2,
    title: "AI Summit 2023",
    image: "/placeholder.svg?height=200&width=300&text=AI+Summit",
    date: "June 15-16, 2023",
    location: "New York, NY",
    category: "Technology",
  },
  {
    id: 3,
    title: "Blockchain Conference",
    image: "/placeholder.svg?height=200&width=300&text=Blockchain",
    date: "July 8-10, 2023",
    location: "Miami, FL",
    category: "Technology",
  },
  {
    id: 4,
    title: "Web3 Developer Meetup",
    image: "/placeholder.svg?height=200&width=300&text=Web3",
    date: "August 5, 2023",
    location: "Austin, TX",
    category: "Technology",
  },
]

export function RelatedEvents() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref}>
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold">Related Events</h2>
        <Button variant="ghost" size="sm" className="gap-1">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {relatedEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <Link
              href={`/events/${event.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:border-primary hover:shadow-md"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  width={300}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <Badge className="bg-primary/90 hover:bg-primary/80">{event.category}</Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-2 font-display text-lg font-bold leading-tight group-hover:text-primary">
                  {event.title}
                </h3>

                <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
