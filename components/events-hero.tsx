"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, MapPin, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventsHero() {
  const [searchQuery, setSearchQuery] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState("")

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-16 md:py-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[100px]" />

        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 h-20 w-20 rounded-full border border-primary/20" />
          <div className="absolute top-40 right-40 h-32 w-32 rounded-full border border-secondary/20" />
          <div className="absolute bottom-20 left-1/3 h-16 w-16 rounded-full border border-accent/20" />
        </div>
      </div>

      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover <span className="gradient-text">Extraordinary</span> Events
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find and join events that match your interests, connect with like-minded people, and create unforgettable
            memories
          </motion.p>

          <motion.div
            className="mt-8 rounded-xl bg-card p-4 shadow-lg md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="pl-9">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new-york">New York</SelectItem>
                      <SelectItem value="los-angeles">Los Angeles</SelectItem>
                      <SelectItem value="chicago">Chicago</SelectItem>
                      <SelectItem value="miami">Miami</SelectItem>
                      <SelectItem value="austin">Austin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Select value={date} onValueChange={setDate}>
                    <SelectTrigger className="pl-9">
                      <SelectValue placeholder="Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="tomorrow">Tomorrow</SelectItem>
                      <SelectItem value="this-week">This Week</SelectItem>
                      <SelectItem value="this-weekend">This Weekend</SelectItem>
                      <SelectItem value="this-month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="gap-2 h-full gap-2">
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="">
                Music
              </Button>
              <Button variant="outline" size="sm" className="">
                Technology
              </Button>
              <Button variant="outline" size="sm" className="">
                Food & Drink
              </Button>
              <Button variant="outline" size="sm" className="">
                Arts
              </Button>
              <Button variant="outline" size="sm" className="">
                Business
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <span>Popular searches:</span>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-primary hover:underline">
                Concerts
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary hover:underline">
                Workshops
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary hover:underline">
                Conferences
              </a>
              <span>•</span>
              <a href="#" className="hover:text-primary hover:underline">
                Festivals
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
