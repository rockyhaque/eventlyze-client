"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    content:
      "Eventify has completely transformed how I discover and attend events. The platform is intuitive, and I've connected with amazing people through the events I've attended.",
    author: {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image: "/placeholder.svg?height=100&width=100&text=SJ",
    },
  },
  {
    id: 2,
    content:
      "As an event organizer, Eventify has made it incredibly easy to create, promote, and manage my events. The analytics and attendee management features are top-notch!",
    author: {
      name: "Michael Chen",
      role: "Event Coordinator",
      image: "/placeholder.svg?height=100&width=100&text=MC",
    },
  },
  {
    id: 3,
    content:
      "I've discovered so many unique experiences through Eventify that I would have never found otherwise. The personalized recommendations are spot on!",
    author: {
      name: "Jessica Williams",
      role: "Travel Blogger",
      image: "/placeholder.svg?height=100&width=100&text=JW",
    },
  },
]

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">What Our Users Say</h2>
          <p className="mt-2 text-muted-foreground">Hear from people who love using Eventify</p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute -left-4 -top-4 h-20 w-20 text-primary opacity-20">
            <Quote className="h-full w-full" />
          </div>

          <div className="relative overflow-hidden rounded-xl bg-muted/50 p-8 md:p-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  position: activeIndex === index ? "relative" : "absolute",
                }}
                transition={{ duration: 0.5 }}
                style={{
                  display: activeIndex === index ? "flex" : "none",
                }}
              >
                <p className="mb-6 text-lg md:text-xl">{testimonial.content}</p>
                <div className="mt-4 flex flex-col items-center">
                  <div className="mb-3 h-16 w-16 overflow-hidden rounded-full border-4 border-background">
                    <Image
                      src={testimonial.author.image || "/placeholder.svg"}
                      alt={testimonial.author.name}
                      width={100}
                      height={100}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <div className="font-display font-bold">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.author.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    activeIndex === index ? "w-6 bg-primary" : "bg-muted-foreground/30",
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
