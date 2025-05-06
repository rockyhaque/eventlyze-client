"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    content:
      "Eventify has completely transformed how I discover and attend events. The platform is intuitive, and I've connected with amazing people through the events I've attended.",
    author: {
      name: "Sarah Johnson",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1599834562135-b6fc90e642ca?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 2,
    content:
      "As an event organizer, Eventify has made it incredibly easy to create, promote, and manage my events. The analytics and attendee management features are top-notch!",
    author: {
      name: "Michael Chen",
      role: "Event Coordinator",
      image:
        "https://images.unsplash.com/photo-1601397217569-d2413068e508?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    id: 3,
    content:
      "I've discovered so many unique experiences through Eventify that I would have never found otherwise. The personalized recommendations are spot on!",
    author: {
      name: "Jessica Williams",
      role: "Travel Blogger",
      image:
        "https://images.unsplash.com/photo-1596177015544-99d1ce149e1d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverDirection, setHoverDirection] = useState<"prev" | "next" | null>(
    null
  );
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Hear from people who love using Eventify
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute z-10 -left-4 -top-4 h-20 w-20 text-primary">
            <Quote className="h-full w-full" />
          </div>

          <div
            className="relative overflow-hidden rounded-xl bg-muted/50 p-8 md:p-12 cursor-none"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              setCursorPos({ x: e.clientX, y: e.clientY });
              setHoverDirection(x < rect.width / 2 ? "prev" : "next");
            }}
            onMouseLeave={() => setHoverDirection(null)}
            onClick={() => {
              if (hoverDirection === "prev") handlePrev();
              else handleNext();
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  y: activeIndex === index ? 0 : -100,
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
                    <div className="font-display font-bold">
                      {testimonial.author.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Floating Cursor Label */}
            <AnimatePresence>
              {hoverDirection && (
                <motion.div
                  key={hoverDirection}
                  className="pointer-events-none fixed z-50 flex h-16 w-16 items-center justify-center rounded-full bg-primary/30 backdrop-blur-xl shadow-sm text-xs font-bold text-white"
                  style={{
                    top: cursorPos.y - 32,
                    left: cursorPos.x - 32,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {hoverDirection.toUpperCase()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Manual Controls (optional, still included) */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-all",
                    activeIndex === index
                      ? "w-6 bg-primary"
                      : "bg-muted-foreground/30"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
