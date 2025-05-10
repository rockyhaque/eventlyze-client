
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Music,
  Code,
  Utensils,
  Palette,
  Briefcase,
  Trophy,
  Users,
  Ticket,
  Camera,
  Gamepad,
  Plane,
  Book,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { eventCategoryStats } from "@/services/EventServices"

interface Category {
  id: number
  name: string
  image: string
  count: number
  color: string
  icon: React.ComponentType<{ className?: string }>
}

export function capitalizeWords(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const initialCategories: Category[] = [
  {
    id: 1,
    name: "MUSIC",
    image: "/placeholder.svg?height=400&width=600&text=Music",
    count: 0,
    color: "bg-purple-500",
    icon: Music,
  },
  {
    id: 2,
    name: "TECHNOLOGY",
    image: "/placeholder.svg?height=400&width=600&text=Technology",
    count: 0,
    color: "bg-blue-500",
    icon: Code,
  },
  {
    id: 3,
    name: "FOOD & DRINK",
    image: "/placeholder.svg?height=400&width=600&text=Food",
    count: 0,
    color: "bg-orange-500",
    icon: Utensils,
  },
  {
    id: 4,
    name: "ARTS",
    image: "/placeholder.svg?height=400&width=600&text=Arts",
    count: 0,
    color: "bg-rose-500",
    icon: Palette,
  },
  {
    id: 5,
    name: "BUSINESS",
    image: "/placeholder.svg?height=400&width=600&text=Business",
    count: 0,
    color: "bg-emerald-500",
    icon: Briefcase,
  },
  {
    id: 6,
    name: "SPORTS",
    image: "/placeholder.svg?height=400&width=600&text=Sports",
    count: 0,
    color: "bg-sky-500",
    icon: Trophy,
  },
  {
    id: 7,
    name: "NETWORKING",
    image: "/placeholder.svg?height=400&width=600&text=Networking",
    count: 0,
    color: "bg-indigo-500",
    icon: Users,
  },
  {
    id: 8,
    name: "ENTERTAINMENT",
    image: "/placeholder.svg?height=400&width=600&text=Entertainment",
    count: 0,
    color: "bg-pink-500",
    icon: Ticket,
  },
  {
    id: 9,
    name: "PHOTOGRAPHY",
    image: "/placeholder.svg?height=400&width=600&text=Photography",
    count: 0,
    color: "bg-amber-500",
    icon: Camera,
  },
  {
    id: 10,
    name: "GAMING",
    image: "/placeholder.svg?height=400&width=600&text=Gaming",
    count: 0,
    color: "bg-red-500",
    icon: Gamepad,
  },
  {
    id: 11,
    name: "TRAVEL",
    image: "/placeholder.svg?height=400&width=600&text=Travel",
    count: 0,
    color: "bg-cyan-500",
    icon: Plane,
  },
  {
    id: 12,
    name: "EDUCATION",
    image: "/placeholder.svg?height=400&width=600&text=Education",
    count: 0,
    color: "bg-lime-500",
    icon: Book,
  },
]

export function EventCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>(initialCategories)

  // Fetch and merge category counts
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await eventCategoryStats()
        console.log("API Response:", res) // Debug log

        if (res?.success && res?.data) {
          setCategories(prev =>
            prev.map(cat => {
              // Try matching by ID first, then by uppercase name, then by lowercase name
              const count =
                res.data[cat.id] ??
                res.data[cat.name.toUpperCase()] ??
                res.data[cat.name.toLowerCase()] ??
                0

              return {
                ...cat,
                count
              }
            })
          )
        }
      } catch (error) {
        console.error("Failed to fetch category stats:", error)
      }
    }

    fetchCounts()
  }, [])



  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Browse by Category</h2>
          <p className="mt-2 text-muted-foreground">Discover events that match your interests</p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              onHoverStart={() => setHoveredCategory(category.id)}
              onHoverEnd={() => setHoveredCategory(null)}
            >
              <Link
                href={`/events?category=${encodeURIComponent(category.name)}`}
                className="flex flex-col items-center rounded-xl border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
              >
                <div
                  className={cn(
                    "mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white",
                    category.color,
                  )}
                >
                  <category.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-1 font-display font-bold ">{capitalizeWords(category.name)}</h3>
                <p className="text-xs text-muted-foreground">{category.count} events</p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredCategory === category.id ? 1 : 0,
                    scale: hoveredCategory === category.id ? 1 : 0.8,
                  }}
                  className="mt-3"
                >
                  <Button variant="outline" size="sm">
                    View Events
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}