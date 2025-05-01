"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Sample locations data
const locations = [
  {
    id: 1,
    city: "New York",
    country: "United States",
    eventCount: 245,
    image: "/placeholder.svg?height=200&width=300&text=New+York",
    coordinates: { lat: 40.7128, lng: -74.006 },
    featured: true,
  },
  {
    id: 2,
    city: "London",
    country: "United Kingdom",
    eventCount: 189,
    image: "/placeholder.svg?height=200&width=300&text=London",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    featured: true,
  },
  {
    id: 3,
    city: "Paris",
    country: "France",
    eventCount: 156,
    image: "/placeholder.svg?height=200&width=300&text=Paris",
    coordinates: { lat: 48.8566, lng: 2.3522 },
    featured: true,
  },
  {
    id: 4,
    city: "Tokyo",
    country: "Japan",
    eventCount: 132,
    image: "/placeholder.svg?height=200&width=300&text=Tokyo",
    coordinates: { lat: 35.6762, lng: 139.6503 },
    featured: true,
  },
  {
    id: 5,
    city: "Sydney",
    country: "Australia",
    eventCount: 98,
    image: "/placeholder.svg?height=200&width=300&text=Sydney",
    coordinates: { lat: -33.8688, lng: 151.2093 },
    featured: false,
  },
  {
    id: 6,
    city: "Berlin",
    country: "Germany",
    eventCount: 87,
    image: "/placeholder.svg?height=200&width=300&text=Berlin",
    coordinates: { lat: 52.52, lng: 13.405 },
    featured: false,
  },
  {
    id: 7,
    city: "Barcelona",
    country: "Spain",
    eventCount: 76,
    image: "/placeholder.svg?height=200&width=300&text=Barcelona",
    coordinates: { lat: 41.3851, lng: 2.1734 },
    featured: false,
  },
  {
    id: 8,
    city: "Dubai",
    country: "United Arab Emirates",
    eventCount: 65,
    image: "/placeholder.svg?height=200&width=300&text=Dubai",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    featured: false,
  },
]

export function EventsMap() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null)

  // Filter locations based on search
  const filteredLocations = locations.filter(
    (location) =>
      location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.country.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Events Around the World</h2>
            <p className="mt-2 text-muted-foreground">Discover events in popular locations worldwide</p>
          </div>

          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search locations..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
          {/* Locations list */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold">Popular Locations</h3>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-muted">
              {filteredLocations.map((location) => (
                <motion.div
                  key={location.id}
                  whileHover={{ x: 5 }}
                  className={cn(
                    "cursor-pointer rounded-lg border p-3 transition-all hover:border-primary",
                    selectedLocation === location.id && "border-primary bg-primary/5",
                  )}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 overflow-hidden rounded-md">
                      <Image
                        src={location.image || "/placeholder.svg"}
                        alt={location.city}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{location.city}</h4>
                      <p className="text-xs text-muted-foreground">{location.country}</p>
                    </div>
                    <div className="ml-auto">
                      <Badge variant="outline">{location.eventCount} events</Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map visualization */}
          <div className="relative h-[500px] overflow-hidden rounded-xl border">
            {/* This would be replaced with an actual map component in a real implementation */}
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <div className="text-center max-w-md p-6">
                <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 font-display text-xl font-bold">Interactive World Map</h3>
                <p className="mb-4 text-muted-foreground">
                  This would be an interactive world map showing event locations globally. In a real implementation,
                  this would use a mapping library like Google Maps, Mapbox, or Leaflet.
                </p>

                {selectedLocation && (
                  <div className="mt-6 rounded-lg bg-card p-4 shadow-lg">
                    {locations
                      .filter((location) => location.id === selectedLocation)
                      .map((location) => (
                        <div key={location.id}>
                          <h4 className="font-display text-lg font-bold">
                            {location.city}, {location.country}
                          </h4>
                          <p className="mb-2 text-sm text-muted-foreground">{location.eventCount} upcoming events</p>
                          <Button className="">View Events</Button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Featured locations */}
        <div className="mt-12">
          <h3 className="mb-6 font-display text-xl font-bold">Featured Destinations</h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {locations
              .filter((location) => location.featured)
              .map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
                    <div className="relative aspect-[3/2] w-full overflow-hidden">
                      <Image
                        src={location.image || "/placeholder.svg"}
                        alt={location.city}
                        width={300}
                        height={200}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      <div className="absolute bottom-3 left-3">
                        <Badge className="bg-primary/90 hover:bg-primary/80">{location.eventCount} events</Badge>
                      </div>
                    </div>

                    <div className="p-4">
                      <h4 className="font-display text-lg font-bold">{location.city}</h4>
                      <p className="text-sm text-muted-foreground">{location.country}</p>

                      <Button variant="outline" size="sm" className="mt-3 w-full ">
                        Explore Events
                      </Button>
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
