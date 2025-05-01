"use client"

import { useState } from "react"
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

// Sample categories data
const categories = [
  {
    id: 1,
    name: "Music",
    image: "/placeholder.svg?height=400&width=600&text=Music",
    count: 120,
    color: "bg-purple-500",
    icon: Music,
  },
  {
    id: 2,
    name: "Technology",
    image: "/placeholder.svg?height=400&width=600&text=Technology",
    count: 85,
    color: "bg-blue-500",
    icon: Code,
  },
  {
    id: 3,
    name: "Food & Drink",
    image: "/placeholder.svg?height=400&width=600&text=Food",
    count: 64,
    color: "bg-orange-500",
    icon: Utensils,
  },
  {
    id: 4,
    name: "Arts",
    image: "/placeholder.svg?height=400&width=600&text=Arts",
    count: 42,
    color: "bg-rose-500",
    icon: Palette,
  },
  {
    id: 5,
    name: "Business",
    image: "/placeholder.svg?height=400&width=600&text=Business",
    count: 56,
    color: "bg-emerald-500",
    icon: Briefcase,
  },
  {
    id: 6,
    name: "Sports",
    image: "/placeholder.svg?height=400&width=600&text=Sports",
    count: 38,
    color: "bg-sky-500",
    icon: Trophy,
  },
  {
    id: 7,
    name: "Networking",
    image: "/placeholder.svg?height=400&width=600&text=Networking",
    count: 45,
    color: "bg-indigo-500",
    icon: Users,
  },
  {
    id: 8,
    name: "Entertainment",
    image: "/placeholder.svg?height=400&width=600&text=Entertainment",
    count: 72,
    color: "bg-pink-500",
    icon: Ticket,
  },
  {
    id: 9,
    name: "Photography",
    image: "/placeholder.svg?height=400&width=600&text=Photography",
    count: 29,
    color: "bg-amber-500",
    icon: Camera,
  },
  {
    id: 10,
    name: "Gaming",
    image: "/placeholder.svg?height=400&width=600&text=Gaming",
    count: 51,
    color: "bg-red-500",
    icon: Gamepad,
  },
  {
    id: 11,
    name: "Travel",
    image: "/placeholder.svg?height=400&width=600&text=Travel",
    count: 33,
    color: "bg-cyan-500",
    icon: Plane,
  },
  {
    id: 12,
    name: "Education",
    image: "/placeholder.svg?height=400&width=600&text=Education",
    count: 47,
    color: "bg-lime-500",
    icon: Book,
  },
]

export function EventCategories() {
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)

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
                href={`/events?category=${category.name}`}
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
                <h3 className="mb-1 font-display font-bold">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} events</p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredCategory === category.id ? 1 : 0,
                    scale: hoveredCategory === category.id ? 1 : 0.8,
                  }}
                  className="mt-3"
                >
                  <Button variant="outline" size="sm" className="">
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
