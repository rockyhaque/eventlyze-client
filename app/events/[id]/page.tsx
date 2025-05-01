"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { EventDetailsHero } from "@/components/event-details-hero"
import { EventDetailsContent } from "@/components/event-details-content"
import { EventActions } from "@/components/event-actions"
import { EventReviews } from "@/components/event-reviews"
import { RelatedEvents } from "@/components/related-events"
import { EventCountdown } from "@/components/event-countdown"
import { EventAttendees } from "@/components/event-attendees"
import { ParticleBackground } from "@/components/particle-background"

export default function EventDetailsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50])

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div ref={containerRef} className="relative min-h-screen">
      {/* Particle background for hero section */}
      <div className="absolute inset-0 h-[70vh] overflow-hidden pointer-events-none">
        <ParticleBackground />
      </div>

      {/* Hero section with parallax effect */}
      <motion.div style={{ opacity, scale, y }} className="relative z-10">
        <EventDetailsHero />
      </motion.div>

      {/* Main content */}
      <div className="relative z-20 bg-background">
        <div className="container max-w-7xl py-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <EventCountdown />
            </motion.div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2"
              >
                <EventDetailsContent />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-1"
              >
                <div className="space-y-8">
                  <EventActions />
                  <EventAttendees />
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16"
            >
              <EventReviews />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-16"
            >
              <RelatedEvents />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
