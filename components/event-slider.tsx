"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEvent } from "@/types/eventTypes";

export function EventSlider({ data }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const events = data?.data?.data?.slice().sort((a: any, b: any) =>
    new Date(b.eventStartTime).getTime() -
    new Date(a.eventStartTime).getTime())
    .slice(0, 5)
    .map((event: TEvent) => ({
      id: event.id,
      title: event.title,
      image: event.eventBanner || "/placeholder.svg",
      date: new Date(event.eventStartTime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      location: event.location,
      price: `$${event.price}`,
      category: event.category.toLowerCase(),
      attendees: event.participant.length || 0,
      featured: event.status === "UPCOMING",
      rating: 0, 
    })) || [];

  // Motion values for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Progress bar animation
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, { damping: 20, stiffness: 100 });

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }

    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Handle mouse move for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (normalized -1 to 1)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      mouseX.set(x * 10); // Adjust multiplier for effect intensity
      mouseY.set(y * 10);
    }
  };

  // Update progress bar
  useEffect(() => {
    progress.set(activeIndex / (events.length - 1));
  }, [activeIndex, progress]);

  // Setup auto play
  useEffect(() => {
    resetAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Pause autoplay when hovering
  useEffect(() => {
    if (isHovering && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    } else if (!isHovering && isAutoPlaying) {
      resetAutoPlay();
    }
  }, [isHovering, isAutoPlaying]);

  // CHANGE: Updated empty state check to handle no events
  if (!events || events.length === 0) {
    return (
      <section className="py-16">
        <div className="container">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Upcoming Events
          </h2>
          <p className="mt-2 text-muted-foreground">
            No events available at the moment.
          </p>
        </div>
      </section>
    );
  }

  // Get visible events (current, previous, next)
  const visibleEvents = [
    events[activeIndex === 0 ? events.length - 1 : activeIndex - 1],
    events[activeIndex],
    events[activeIndex === events.length - 1 ? 0 : activeIndex + 1],
  ];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Upcoming Events
            </h2>
            <p className="mt-2 text-muted-foreground">
              Discover and join amazing events happening around you
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleAutoPlay}
              className="hidden sm:flex"
            >
              {isAutoPlaying ? "Pause" : "Auto Play"}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                aria-label="Previous slide"
                className="rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                aria-label="Next slide"
                className="rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative mb-8 h-1 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="absolute left-0 top-0 h-full bg-primary"
            style={{
              width: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            }}
          />
        </div>

        {/* 3D Carousel */}
        <div
          ref={containerRef}
          className="relative h-[500px] w-full perspective-1000"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background gradient elements */}
          <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />

          <AnimatePresence initial={false} custom={direction}>
            {visibleEvents.map((event, index) => {
              // Position: 0 = previous, 1 = current, 2 = next
              const position = index - 1;

              return (
                <motion.div
                  key={`${event.id}-${index}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    rotateY: position === -1 ? -45 : position === 1 ? 45 : 0,
                    scale: position === 0 ? 1 : 0.8,
                    x: `${position * 100}%`,
                    zIndex: position === 0 ? 10 : 5,
                  }}
                  animate={{
                    opacity: position === 0 ? 1 : 0.7,
                    rotateY: position === -1 ? -45 : position === 1 ? 45 : 0,
                    scale: position === 0 ? 1 : 0.8,
                    x: `${position * 100}%`,
                    zIndex: position === 0 ? 10 : 5,
                  }}
                  exit={{
                    opacity: 0,
                    rotateY: direction === 1 ? -45 : 45,
                    scale: 0.8,
                    zIndex: 0,
                  }}
                  transition={{
                    opacity: { duration: 0.3 },
                    rotateY: { duration: 0.6 },
                    scale: { duration: 0.6 },
                    x: { type: "spring", stiffness: 300, damping: 30 },
                  }}
                  className="absolute left-0 top-0 h-full w-full origin-center preserve-3d"
                  style={{
                    filter:
                      position !== 0 ? "brightness(0.7)" : "brightness(1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <EventCard
                    event={event}
                    isActive={position === 0}
                    mouseX={mouseX}
                    mouseY={mouseY}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

interface EventCardProps {
  // event: (typeof events)[0];
  // change
  event: {
    id: string;
    title: string;
    image: string;
    date: string;
    location: string;
    price: string;
    category: string;
    attendees: number;
    featured: boolean;
    rating: number;
  };
  isActive: boolean;
  mouseX: any;
  mouseY: any;
}

function EventCard({ event, isActive, mouseX, mouseY }: EventCardProps) {
  // Transform values for parallax effect
  const rotateX = useTransform(mouseY, [-10, 10], [2, -2]);
  const rotateY = useTransform(mouseX, [-10, 10], [-2, 2]);

  // Parallax effect for card elements
  const imageY = useTransform(mouseY, [-10, 10], [-5, 5]);
  const imageX = useTransform(mouseX, [-10, 10], [-5, 5]);
  const contentY = useTransform(mouseY, [-10, 10], [3, -3]);
  const contentX = useTransform(mouseX, [-10, 10], [3, -3]);

  return (
    <motion.div
      className={cn(
        "group h-full w-full overflow-hidden rounded-2xl border bg-card shadow-lg transition-shadow",
        isActive && "shadow-xl hover:shadow-2xl"
      )}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="relative flex h-full flex-col">
        {/* Image section with parallax */}
        <div className="relative h-[60%] w-full overflow-hidden">
          <motion.div
            className="absolute inset-0 h-full object-cover overflow-hidden rounded-t-2xl"
            style={{
              y: isActive ? imageY : 0,
              x: isActive ? imageX : 0,
            }}
          >
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-700 rounded-t-2xl"
            />
          </motion.div>

          {/* Floating badges */}
          <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
            <Badge className="bg-primary/90 hover:bg-primary/80">
              {event.category}
            </Badge>
            {event.featured && (
              <Badge variant="secondary" className="gap-1">
                <Star className="h-3 w-3 fill-current" /> Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Content section with parallax */}
        <motion.div
          className="flex flex-1 flex-col p-6"
          style={{
            y: isActive ? contentY : 0,
            x: isActive ? contentX : 0,
          }}
        >
          <h3 className="mb-2 font-display text-xl font-bold leading-tight group-hover:text-primary">
            {event.title}
          </h3>

          <div className="mt-auto flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{event.attendees} attendees</span>
            </div>
          </div>

          <Link href={`/events/${event.id}`} className="mt-4 block">
            <Button className="w-full">View Details</Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
