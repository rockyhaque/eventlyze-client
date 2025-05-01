"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, Plus, Music, Code, Utensils, Palette, Briefcase, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Sample categories data with enhanced metadata
const categories = [
  {
    id: 1,
    name: "Music",
    image: "/placeholder.svg?height=400&width=600&text=Music",
    count: 120,
    color: "from-purple-500 to-pink-500",
    icon: Music,
    description: "Concerts, festivals, live performances, and musical experiences",
    trending: true,
  },
  {
    id: 2,
    name: "Technology",
    image: "/placeholder.svg?height=400&width=600&text=Technology",
    count: 85,
    color: "from-blue-500 to-cyan-500",
    icon: Code,
    description: "Conferences, workshops, hackathons, and tech meetups",
    trending: true,
  },
  {
    id: 3,
    name: "Food & Drink",
    image: "/placeholder.svg?height=400&width=600&text=Food",
    count: 64,
    color: "from-orange-500 to-amber-500",
    icon: Utensils,
    description: "Tastings, cooking classes, food festivals, and culinary tours",
    trending: false,
  },
  {
    id: 4,
    name: "Arts",
    image: "/placeholder.svg?height=400&width=600&text=Arts",
    count: 42,
    color: "from-rose-500 to-red-500",
    icon: Palette,
    description: "Exhibitions, gallery openings, art workshops, and creative showcases",
    trending: false,
  },
  {
    id: 5,
    name: "Business",
    image: "/placeholder.svg?height=400&width=600&text=Business",
    count: 56,
    color: "from-emerald-500 to-green-500",
    icon: Briefcase,
    description: "Networking events, conferences, seminars, and professional meetups",
    trending: true,
  },
  {
    id: 6,
    name: "Sports",
    image: "/placeholder.svg?height=400&width=600&text=Sports",
    count: 38,
    color: "from-sky-500 to-indigo-500",
    icon: Trophy,
    description: "Games, tournaments, fitness classes, and sporting events",
    trending: false,
  },
]

export function FeaturedCategories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "orbit" | "showcase">("showcase")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Toggle between view modes
  const cycleViewMode = () => {
    if (viewMode === "grid") setViewMode("orbit")
    else if (viewMode === "orbit") setViewMode("showcase")
    else setViewMode("grid")
  }

  return (
    <section className="py-16 overflow-hidden" ref={containerRef}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Browse by Category</h2>
            <p className="mt-2 text-muted-foreground">Discover events by your interests</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search categories..."
                className="pl-9 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={cycleViewMode} className="whitespace-nowrap">
              Change View
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {viewMode === "grid" && (
            <GridView
              key="grid"
              categories={filteredCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              controls={controls}
            />
          )}

          {viewMode === "orbit" && (
            <OrbitView
              key="orbit"
              categories={filteredCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              controls={controls}
            />
          )}

          {viewMode === "showcase" && (
            <ShowcaseView
              key="showcase"
              categories={filteredCategories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              controls={controls}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// Grid View Component
function GridView({
  categories,
  activeCategory,
  setActiveCategory,
  controls,
}: {
  categories: typeof categories
  activeCategory: number | null
  setActiveCategory: (id: number | null) => void
  controls: any
}) {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      exit={{ opacity: 0, y: 20 }}
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="group relative"
        >
          <Link
            href={`/events?category=${category.name}`}
            className="block h-full overflow-hidden rounded-xl border transition-all duration-300 hover:border-primary hover:shadow-lg"
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                width={600}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={cn("absolute inset-0 bg-gradient-to-b opacity-80", category.color)} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <category.icon className="mb-3 h-10 w-10" />
                <h3 className="text-center font-display text-2xl font-bold">{category.name}</h3>
                <p className="mt-2 text-center text-sm">{category.count} events</p>

                <div
                  className={cn(
                    "mt-4 flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm transition-opacity",
                    activeCategory === category.id ? "opacity-100" : "opacity-0",
                  )}
                >
                  <span>View Events</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>

              {category.trending && (
                <div className="absolute left-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  Trending
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

// Orbit View Component
function OrbitView({
  categories,
  activeCategory,
  setActiveCategory,
  controls,
}: {
  categories: typeof categories
  activeCategory: number | null
  setActiveCategory: (id: number | null) => void
  controls: any
}) {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      exit={{ opacity: 0 }}
      className="relative h-[500px] flex items-center justify-center"
    >
      {/* Center circle */}
      <motion.div
        className="absolute z-10 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10 text-center text-primary shadow-lg backdrop-blur-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div>
          <p className="font-display text-lg font-bold">Categories</p>
          <p className="text-xs">{categories.length} options</p>
        </div>
      </motion.div>

      {/* Orbiting categories */}
      {categories.map((category, index) => {
        const angle = (index * (2 * Math.PI)) / categories.length
        const radius = 200 // Orbit radius
        const x = radius * Math.cos(angle)
        const y = radius * Math.sin(angle)

        return (
          <motion.div
            key={category.id}
            className={cn(
              "absolute flex h-24 w-24 cursor-pointer items-center justify-center rounded-full text-center text-white transition-shadow",
              activeCategory === category.id ? "shadow-xl ring-4 ring-white/20" : "shadow-md",
            )}
            style={{
              background: `linear-gradient(135deg, var(--${category.color.split("-")[1]}), var(--${
                category.color.split("-")[3]
              }))`,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x, y, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: index * 0.1,
            }}
            whileHover={{ scale: 1.1 }}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <Link
              href={`/events?category=${category.name}`}
              className="flex h-full w-full flex-col items-center justify-center p-2"
            >
              <category.icon className="mb-1 h-6 w-6" />
              <p className="text-xs font-bold">{category.name}</p>
              <p className="text-[10px]">{category.count}</p>
            </Link>
          </motion.div>
        )
      })}

      {/* Category details popup */}
      <AnimatePresence>
        {activeCategory !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-10 left-1/2 w-[300px] -translate-x-1/2 rounded-xl bg-card p-4 shadow-lg"
          >
            {categories
              .filter((c) => c.id === activeCategory)
              .map((category) => (
                <div key={category.id} className="text-center">
                  <h3 className="font-display text-lg font-bold">{category.name}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{category.description}</p>
                  <Button asChild size="sm">
                    <Link href={`/events?category=${category.name}`}>
                      Browse {category.count} Events
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Showcase View Component
function ShowcaseView({
  categories,
  activeCategory,
  setActiveCategory,
  controls,
}: {
  categories: typeof categories
  activeCategory: number | null
  setActiveCategory: (id: number | null) => void
  controls: any
}) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])

  // Update selected category when active category changes
  useEffect(() => {
    if (activeCategory !== null) {
      const category = categories.find((c) => c.id === activeCategory)
      if (category) setSelectedCategory(category)
    }
  }, [activeCategory, categories])

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        {/* Category selector */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-2"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className={cn(
                "group flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all",
                selectedCategory.id === category.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "hover:border-primary/50 hover:bg-muted",
              )}
              onClick={() => {
                setSelectedCategory(category)
                setActiveCategory(category.id)
              }}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  selectedCategory.id === category.id ? "bg-primary text-white" : "bg-muted text-muted-foreground",
                )}
              >
                <category.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} events</p>
              </div>
              {category.trending && (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">Trending</span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Category showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-xl border"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <Image
                src={selectedCategory.image || "/placeholder.svg"}
                alt={selectedCategory.name}
                width={800}
                height={450}
                className="h-full w-full object-cover"
              />
              <div className={cn("absolute inset-0 bg-gradient-to-t opacity-90", selectedCategory.color)} />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                >
                  <selectedCategory.icon className="h-10 w-10" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-2 text-center font-display text-3xl font-bold md:text-4xl"
                >
                  {selectedCategory.name}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6 max-w-md text-center text-lg"
                >
                  {selectedCategory.description}
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Button size="lg" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30" asChild>
                    <Link href={`/events?category=${selectedCategory.name}`}>
                      Explore {selectedCategory.count} Events
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="flex items-center justify-between bg-card p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 p-2">
                  <Plus className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{Math.floor(Math.random() * 10) + 1} new events this week</span>
              </div>

              <Button variant="ghost" size="sm" asChild>
                <Link href={`/events?category=${selectedCategory.name}`}>View All</Link>
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
