"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function EventCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isRunning, setIsRunning] = useState(true)

  // Set event date to 30 days from now for demo purposes
  const eventDate = new Date()
  eventDate.setDate(eventDate.getDate() + 30)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

      if (difference <= 0) {
        setIsRunning(false)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [eventDate, isRunning])

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ]

  return (
    <div className="rounded-xl border bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-6">
      <div className="text-center mb-4">
        <h2 className="font-display text-xl font-bold">Event Starts In</h2>
      </div>

      <div className="grid grid-cols-4 gap-2 md:gap-4">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="relative">
              <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-lg bg-card shadow-md border">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-2xl md:text-3xl font-bold"
                >
                  {unit.value.toString().padStart(2, "0")}
                </motion.span>
              </div>
              <div
                className={cn(
                  "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground",
                  unit.label !== "Seconds" && "hidden",
                )}
              >
                {isRunning ? "!" : "✓"}
              </div>
            </div>
            <span className="mt-2 text-xs md:text-sm text-muted-foreground">{unit.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
