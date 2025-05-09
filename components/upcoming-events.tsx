"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Filter,
  ChevronDown,
  Heart,
  CalendarDays,
  LayoutGrid,
  Map,
  X,
  Star,
  Ticket,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

// Custom button styles with reduced radius and modern design
const buttonStyles = `
  .event-btn {
    border-radius: 4px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    border-width: 1px;
  }
  
  .event-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: all 0.4s ease;
  }
  
  .event-btn:hover::before {
    left: 100%;
  }
  
  .event-btn.btn-primary {
    background: linear-gradient(135deg, var(--primary), var(--secondary));
    border: none;
    color: white;
    box-shadow: 0 4px 12px rgba(var(--primary), 0.2);
  }
  
  .event-btn.btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(var(--primary), 0.3);
  }
  
  .event-btn.btn-outline {
    border: 1px solid var(--border);
    background: transparent;
  }
  
  .event-btn.btn-outline:hover {
    background: var(--muted);
    border-color: var(--primary);
  }
`

// Sample event data
const events = [
  {
    id: 1,
    title: "Tech Conference 2023",
    image: "/placeholder.svg?height=400&width=600&text=Tech+Conference",
    date: "2023-05-20",
    endDate: "2023-05-22",
    time: "9:00 AM - 6:00 PM",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    price: "$299",
    category: "Technology",
    attendees: 1200,
    rating: 4.8,
    featured: true,
    tags: ["AI", "Blockchain", "Web3"],
    organizer: "TechEvents Inc.",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    image: "/placeholder.svg?height=400&width=600&text=Music+Festival",
    date: "2023-06-15",
    endDate: "2023-06-18",
    time: "12:00 PM - 11:00 PM",
    location: "Central Park, NY",
    venue: "Great Lawn",
    coordinates: { lat: 40.7812, lng: -73.9665 },
    price: "$149",
    category: "Music",
    attendees: 5000,
    rating: 4.9,
    featured: true,
    tags: ["Live Music", "Outdoor", "Festival"],
    organizer: "Festival Productions",
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    image: "/placeholder.svg?height=400&width=600&text=Food+Expo",
    date: "2023-07-08",
    endDate: "2023-07-10",
    time: "10:00 AM - 8:00 PM",
    location: "Chicago, IL",
    venue: "Navy Pier",
    coordinates: { lat: 41.8919, lng: -87.6089 },
    price: "$79",
    category: "Food & Drink",
    attendees: 3000,
    rating: 4.7,
    featured: false,
    tags: ["Culinary", "Wine Tasting", "Gourmet"],
    organizer: "Taste Ventures",
  },
  {
    id: 4,
    title: "Art Gallery Opening",
    image: "/placeholder.svg?height=400&width=600&text=Art+Gallery",
    date: "2023-08-05",
    endDate: "2023-08-05",
    time: "7:00 PM - 10:00 PM",
    location: "Los Angeles, CA",
    venue: "Modern Art Museum",
    coordinates: { lat: 34.0522, lng: -118.2437 },
    price: "Free",
    category: "Art",
    attendees: 500,
    rating: 4.5,
    featured: false,
    tags: ["Contemporary", "Exhibition", "Opening Night"],
    organizer: "LA Arts Foundation",
  },
  {
    id: 5,
    title: "Startup Pitch Competition",
    image: "/placeholder.svg?height=400&width=600&text=Startup+Pitch",
    date: "2023-09-12",
    endDate: "2023-09-12",
    time: "1:00 PM - 5:00 PM",
    location: "Austin, TX",
    venue: "Capital Factory",
    coordinates: { lat: 30.2672, lng: -97.7431 },
    price: "$49",
    category: "Business",
    attendees: 800,
    rating: 4.6,
    featured: true,
    tags: ["Entrepreneurship", "Venture Capital", "Networking"],
    organizer: "Startup Texas",
  },
  {
    id: 6,
    title: "Yoga & Wellness Retreat",
    image: "/placeholder.svg?height=400&width=600&text=Wellness+Retreat",
    date: "2023-10-01",
    endDate: "2023-10-03",
    time: "All Day",
    location: "Sedona, AZ",
    venue: "Red Rock Resort",
    coordinates: { lat: 34.8697, lng: -111.7607 },
    price: "$399",
    category: "Wellness",
    attendees: 150,
    rating: 4.9,
    featured: false,
    tags: ["Yoga", "Meditation", "Wellness"],
    organizer: "Mindful Journeys",
  },
  {
    id: 7,
    title: "Gaming Convention",
    image: "/placeholder.svg?height=400&width=600&text=Gaming+Convention",
    date: "2023-11-18",
    endDate: "2023-11-20",
    time: "10:00 AM - 8:00 PM",
    location: "Seattle, WA",
    venue: "Washington Convention Center",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    price: "$89",
    category: "Gaming",
    attendees: 2500,
    rating: 4.7,
    featured: true,
    tags: ["Video Games", "Esports", "Tabletop"],
    organizer: "GameCon Northwest",
  },
  {
    id: 8,
    title: "Winter Fashion Show",
    image: "/placeholder.svg?height=400&width=600&text=Fashion+Show",
    date: "2023-12-05",
    endDate: "2023-12-05",
    time: "7:00 PM - 10:00 PM",
    location: "Miami, FL",
    venue: "Design District",
    coordinates: { lat: 25.7617, lng: -80.1918 },
    price: "$129",
    category: "Fashion",
    attendees: 1000,
    rating: 4.8,
    featured: false,
    tags: ["Runway", "Designer", "Winter Collection"],
    organizer: "Style Productions",
  },
  {
    id: 9,
    title: "New Year's Eve Gala",
    image: "/placeholder.svg?height=400&width=600&text=NYE+Gala",
    date: "2023-12-31",
    endDate: "2023-12-31",
    time: "8:00 PM - 2:00 AM",
    location: "Las Vegas, NV",
    venue: "Bellagio Hotel",
    coordinates: { lat: 36.1699, lng: -115.1398 },
    price: "$199",
    category: "Nightlife",
    attendees: 1500,
    rating: 4.9,
    featured: true,
    tags: ["New Year", "Celebration", "Formal"],
    organizer: "Luxury Events",
  },
]

// Sort events by date
const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

// Group events by month
const eventsByMonth = sortedEvents.reduce(
  (acc, event) => {
    const date = new Date(event.date)
    const monthYear = date.toLocaleString("default", { month: "long", year: "numeric" })

    if (!acc[monthYear]) {
      acc[monthYear] = []
    }

    acc[monthYear].push(event)
    return acc
  },
  {} as Record<string, typeof events>,
)

// Get unique categories
const categories = Array.from(new Set(events.map((event) => event.category)))

export function UpcomingEvents() {
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline")
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 500])
  const [favorites, setFavorites] = useState<number[]>([])
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })

  // Transform scroll progress for parallax effect
  const timelineParallax = useTransform(scrollYProgress, [0, 1], [0, -100])

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const clearFilters = () => {
    setActiveFilters([])
    setPriceRange([0, 500])
    setShowFeaturedOnly(false)
  }

  // Filter events based on active filters
  const filteredEvents = sortedEvents.filter((event) => {
    const matchesCategory = activeFilters.length === 0 || activeFilters.includes(event.category)
    const matchesPrice =
      event.price === "Free" ||
      (Number.parseInt(event.price.replace(/[^0-9]/g, "")) >= priceRange[0] &&
        Number.parseInt(event.price.replace(/[^0-9]/g, "")) <= priceRange[1])
    const matchesFeatured = showFeaturedOnly ? event.featured : true

    return matchesCategory && matchesPrice && matchesFeatured
  })

  // Filter events by month based on active filters
  const filteredEventsByMonth = Object.entries(eventsByMonth).reduce(
    (acc, [month, monthEvents]) => {
      const filtered = monthEvents.filter((event) => {
        const matchesCategory = activeFilters.length === 0 || activeFilters.includes(event.category)
        const matchesPrice =
          event.price === "Free" ||
          (Number.parseInt(event.price.replace(/[^0-9]/g, "")) >= priceRange[0] &&
            Number.parseInt(event.price.replace(/[^0-9]/g, "")) <= priceRange[1])
        const matchesFeatured = showFeaturedOnly ? event.featured : true

        return matchesCategory && matchesPrice && matchesFeatured
      })

      if (filtered.length > 0) {
        acc[month] = filtered
      }

      return acc
    },
    {} as Record<string, typeof events>,
  )

  return (
    <section className="py-16 overflow-hidden">
      <style jsx global>
        {buttonStyles}
      </style>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Upcoming Events</h2>
            <p className="mt-2 text-muted-foreground">Discover and join amazing events happening around you</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Tabs
              defaultValue="timeline"
              value={viewMode}
              onValueChange={(value) => setViewMode(value as "timeline" | "grid")}
              className="w-full sm:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="timeline" className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span className="hidden sm:inline">Timeline</span>
                </TabsTrigger>
                <TabsTrigger value="grid" className="flex items-center gap-1">
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Grid</span>
                </TabsTrigger>
                
              </TabsList>
            </Tabs>

            {/* <Button variant="outline" className="gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className={cn("h-4 w-4", showFilters && "text-primary")} />
              Filters
              {activeFilters.length > 0 && (
                <Badge variant="secondary" className="ml-1 rounded-full px-1.5">
                  {activeFilters.length}
                </Badge>
              )}
            </Button> */}
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="my-8 overflow-hidden"
            >
              <div className="rounded-xl border bg-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-lg font-bold">Filter Events</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 gap-1 ">
                    <X className="h-4 w-4" />
                    Clear All
                  </Button>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-4">
                    <h4 className="font-medium">Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category}
                          variant={activeFilters.includes(category) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleFilter(category)}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Price Range</h4>
                    <Slider
                      defaultValue={[0, 500]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="py-4"
                    />
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Additional Filters</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="featured-only">Featured Events Only</Label>
                        <Switch id="featured-only" checked={showFeaturedOnly} onCheckedChange={setShowFeaturedOnly} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeFilters.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="gap-1">
                {filter}
                <button
                  onClick={() => toggleFilter(filter)}
                  className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {filter} filter</span>
                </button>
              </Badge>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {viewMode === "timeline" && (
            <TimelineView
              key="timeline"
              eventsByMonth={filteredEventsByMonth}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              containerRef={containerRef}
              timelineParallax={timelineParallax}
            />
          )}

          {viewMode === "grid" && (
            <GridView key="grid" events={filteredEvents} favorites={favorites} toggleFavorite={toggleFavorite} />
          )}

        </AnimatePresence>
      </div>
    </section>
  )
}

// Timeline View Component
function TimelineView({
  eventsByMonth,
  favorites,
  toggleFavorite,
  containerRef,
  timelineParallax,
}: {
  eventsByMonth: Record<string, typeof events>
  favorites: number[]
  toggleFavorite: (id: number, e: React.MouseEvent) => void
  containerRef: React.RefObject<HTMLDivElement>
  timelineParallax: any
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Timeline track */}
      <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-muted md:left-1/2" />

      {/* Timeline content */}
      <div
        ref={containerRef}
        className="relative max-h-[600px] overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-muted mt-10"
      >
        <motion.div >
          {Object.entries(eventsByMonth).length > 0 ? (
            Object.entries(eventsByMonth).map(([month, monthEvents]) => (
              <div key={month} className="relative">
                {/* Month marker */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="sticky top-2 z-10 mb-6 flex items-center justify-center"
                >
                  <div className="flex h-10 items-center justify-center rounded-full bg-primary px-4 text-primary-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="font-display font-bold">{month}</span>
                  </div>
                </motion.div>

                {/* Month events */}
                {monthEvents.map((event, eventIndex) => {
                  const isEven = eventIndex % 2 === 0
                  const date = new Date(event.date)
                  const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
                  const isLast = eventIndex === monthEvents.length - 1

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "relative flex mb-8 pb-10",
                        isEven ? "md:flex-row" : "flex-row-reverse md:flex-row-reverse",
                        isLast && "mb-0 pb-8"
                      )}
                    >
                

                      {/* Event card */}
                      <div
                        className={cn(
                          "relative w-full rounded-xl border bg-card shadow-sm transition-all hover:shadow-md",
                          isEven ? "md:mr-auto" : "md:ml-auto",
                        )}
                      >
                        <Link href={`/events/${event.id}`} className="block">
                          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-xl max-h-[300px]">
                            <Image
                              src={event.image || "/placeholder.svg"}
                              alt={event.title}
                              width={600}
                              height={400}
                              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            <button
                              onClick={(e) => toggleFavorite(event.id, e)}
                              className={cn(
                                "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50",
                                favorites.includes(event.id) && "text-red-500",
                              )}
                              aria-label={favorites.includes(event.id) ? "Remove from favorites" : "Add to favorites"}
                            >
                              <Heart className={cn("h-4 w-4", favorites.includes(event.id) && "fill-current")} />
                            </button>

                            <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                              <Badge className="bg-primary/90 hover:bg-primary/80">{event.category}</Badge>
                              <Badge
                                variant="outline"
                                className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
                              >
                                {event.price}
                              </Badge>
                            </div>
                          </div>

                          <div className="p-4">
                            <h3 className="mb-2 font-display text-lg font-bold leading-tight hover:text-primary">
                              {event.title}
                            </h3>

                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{event.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                <span>{event.attendees.toLocaleString()} attendees</span>
                              </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-medium">{event.rating}</span>
                              </div>
                              <Button size="sm" variant="outline" className="gap-1 ">
                                <Ticket className="h-3 w-3" />
                                <span>Details</span>
                              </Button>
                            </div>
                          </div>
                        </Link>
                      </div>

                      {/* Date label for mobile */}
                      <div className="absolute left-0 top-0 flex h-8 w-8 flex-col items-center text-[10px] font-medium text-muted-foreground md:hidden">
                        <span className="mt-10">{dayName}</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            ))
          ) : (
            <div className="flex h-60 items-center justify-center rounded-xl border bg-muted/30 p-8 text-center">
              <div>
                <h3 className="mb-2 font-display text-xl font-bold">No events match your filters</h3>
                <p className="text-muted-foreground">Try adjusting your filter criteria to find events</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Grid View Component
function GridView({
  events,
  favorites,
  toggleFavorite,
}: {
  events: typeof sortedEvents
  favorites: number[]
  toggleFavorite: (id: number, e: React.MouseEvent) => void
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {events.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                href={`/events/${event.id}`}
                className="block h-full overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <button
                    onClick={(e) => toggleFavorite(event.id, e)}
                    className={cn(
                      "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50",
                      favorites.includes(event.id) && "text-red-500",
                    )}
                    aria-label={favorites.includes(event.id) ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={cn("h-4 w-4", favorites.includes(event.id) && "fill-current")} />
                  </button>

                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    <Badge className="bg-primary/90 hover:bg-primary/80">{event.category}</Badge>
                    <Badge variant="outline" className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50">
                      {event.price}
                    </Badge>
                  </div>

                  {/* Date badge */}
                  <div className="absolute right-3 bottom-3 flex flex-col items-center rounded-lg bg-white/90 p-2 text-center backdrop-blur-sm">
                    <span className="text-xs font-medium text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold leading-none">{new Date(event.date).getDate()}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-2 font-display text-lg font-bold leading-tight group-hover:text-primary">
                    {event.title}
                  </h3>

                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{event.attendees.toLocaleString()} attendees</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{event.rating}</span>
                    </div>
                    <Button size="sm" variant="outline" className="gap-1 ">
                      <Ticket className="h-3 w-3" />
                      <span>Details</span>
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex h-60 items-center justify-center rounded-xl border bg-muted/30 p-8 text-center">
          <div>
            <h3 className="mb-2 font-display text-xl font-bold">No events match your filters</h3>
            <p className="text-muted-foreground">Try adjusting your filter criteria to find events</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
