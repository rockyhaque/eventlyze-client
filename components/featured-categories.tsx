"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { Search, ArrowRight, Plus, Music, Code, Utensils, Palette, Briefcase, Trophy } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { eventCategoryStats } from "@/services/EventServices"


const initialCategories = [
  {
    id: 1,
    name: "Music",
    key: "MUSIC",
    image: "/placeholder.svg?height=400&width=600&text=Music",
    count: 0,
    color: "from-purple-500 to-pink-500",
    icon: Music,
    description: "Concerts, festivals, live performances, and musical experiences",
    trending: true,
  },
  {
    id: 2,
    name: "Technology",
    key: "TECHNOLOGY",
    image: "/placeholder.svg?height=400&width=600&text=Technology",
    count: 0,
    color: "from-blue-500 to-cyan-500",
    icon: Code,
    description: "Conferences, workshops, hackathons, and tech meetups",
    trending: true,
  },
  {
    id: 3,
    name: "Food & Drink",
    key: "FOOD_AND_DRINK",
    image: "/placeholder.svg?height=400&width=600&text=Food",
    count: 0,
    color: "from-orange-500 to-amber-500",
    icon: Utensils,
    description: "Tastings, cooking classes, food festivals, and culinary tours",
    trending: false,
  },
  {
    id: 4,
    name: "Arts",
    key: "ARTS",
    image: "/placeholder.svg?height=400&width=600&text=Arts",
    count: 0,
    color: "from-rose-500 to-red-500",
    icon: Palette,
    description: "Exhibitions, gallery openings, art workshops, and creative showcases",
    trending: false,
  },
  {
    id: 5,
    name: "Business",
    key: "BUSINESS",
    image: "/placeholder.svg?height=400&width=600&text=Business",
    count: 0,
    color: "from-emerald-500 to-green-500",
    icon: Briefcase,
    description: "Networking events, conferences, seminars, and professional meetups",
    trending: true,
  },
  {
    id: 6,
    name: "Sports",
    key: "SPORTS",
    image: "/placeholder.svg?height=400&width=600&text=Sports",
    count: 0,
    color: "from-sky-500 to-indigo-500",
    icon: Trophy,
    description: "Games, tournaments, fitness classes, and sporting events",
    trending: false,
  },
];

export function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function FeaturedCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const controls = useAnimation()

  // Filter categories based on search
  const filteredCategories = categories.filter((category) =>
    category.name.toUpperCase().includes(searchQuery.toUpperCase()),
  )

  // Fetch and merge category counts
  useEffect(() => {
    const fetchCounts = async () => {
      const res = await eventCategoryStats();
      if (res?.success && res?.data) {
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            count: res.data[cat.key] ?? 0,
          }))
        );
      }
    };
    fetchCounts();
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])


  return (
    <section ref={containerRef}>
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
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <GridView
            key="grid"
            categories={filteredCategories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            controls={controls}
          />
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
  categories: any
  activeCategory: number | null
  setActiveCategory: (id: number | null) => void
  controls: any
}) {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
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
      exit={{ opacity: 0, y: 5 }}
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-3"
    >
      {categories.map((category: any) => (
        <motion.div
          key={category.id}
          variants={{
            hidden: { opacity: 0, y: 5 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="group relative"

        >
          <Link
            href={`/events?category=${category.key}`}
            className="block h-full overflow-hidden rounded-xl transition-all duration-300"
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top
              setCursorPos({ x: e.clientX, y: e.clientY })
            }}
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
                <h3 className="text-center font-display text-2xl font-bold">{capitalizeWords(category.name)}</h3>
                <p className="mt-2 text-center text-lg">{category.count} events</p>
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
      {/* Floating Cursor Label - only one rendered outside map */}
      <AnimatePresence>
        {activeCategory !== null && (
          <motion.div
            className="pointer-events-none fixed z-50 flex h-16 w-16  items-center justify-center rounded-full bg-white/10 text-center backdrop-blur-xl shadow-sm text-xs font-bold text-white"
            style={{
              top: cursorPos.y - 40,
              left: cursorPos.x - 40,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            View Events
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
