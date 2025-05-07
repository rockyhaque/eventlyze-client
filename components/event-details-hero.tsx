"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Calendar, MapPin, Clock, Users, Share2, Heart, ArrowLeft, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { TEvent } from "@/types/eventTypes"

export function EventDetailsHero({eventDetails}:{eventDetails:TEvent}) {
  const [isLiked, setIsLiked] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect for background image
  const y = useTransform(scrollY, [0, 500], [0, 150])

  return (
    <div className="relative overflow-hidden">
      {/* Floating back button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute left-4 top-4 z-20 md:left-8 md:top-8"
      >
        <Link href="/events">
          <Button variant="secondary" size="sm" className="rounded-full shadow-lg backdrop-blur-md">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </Link>
      </motion.div>

      {/* Floating action buttons */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute right-4 top-4 z-20 flex gap-2 md:right-8 md:top-8"
      >
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-lg backdrop-blur-md"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart className={cn("h-5 w-5 transition-colors", isLiked && "fill-red-500 text-red-500")} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isLiked ? "Remove from favorites" : "Add to favorites"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full shadow-lg backdrop-blur-md">
                <Share2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share this event</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>

      {/* Background image with parallax */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 h-[120%] w-full">
          <Image
            src={eventDetails?.eventBanner || "/placeholder.svg"}
            alt={eventDetails?.title}
            width={1200}
            height={600}
            className="h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background"></div>
        </motion.div>

        {/* eventDetails? details overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 flex flex-wrap gap-2"
            >
              <Badge className="bg-primary/90 hover:bg-primary/80 text-lg px-3 py-1">{eventDetails?.category}</Badge>
              <Badge
                variant="outline"
                className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 text-lg px-3 py-1"
              >
                {eventDetails?.price}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {eventDetails?.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-6 text-white/90"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-lg">{eventDetails?.registrationStart}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-lg">{eventDetails?.registrationEnd}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="text-lg">{eventDetails?.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-lg">{eventDetails?.participant?.length?.toLocaleString()} attendees</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex items-center gap-4"
            >
              {/* <Avatar className="h-12 w-12 border-2 border-white">
                <AvatarImage src={eventDetails?.organizer.image || "/placeholder.svg"} alt={eventDetails?.organizer.name} />
                <AvatarFallback>{eventDetails?.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar> */}
              <div>
                <div className="text-sm text-white/70">Organized by</div>
                <div className="text-lg font-medium text-white">{eventDetails?.ownerId}</div>
              </div>
              <div className="ml-auto">
                <Button size="lg" className="gap-2 text-lg">
                  <Ticket className="h-5 w-5" />
                  Get Tickets
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sticky header that appears on scroll */}
      <div
        className={cn(
          "fixed left-0 right-0 top-0 z-50 transform bg-background/80 backdrop-blur-lg border-b transition-all duration-300",
          isScrolled ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/events">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="font-display text-lg font-bold truncate max-w-[200px] sm:max-w-md">{eventDetails?.title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setIsLiked(!isLiked)}>
              <Heart className={cn("h-5 w-5", isLiked && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Share2 className="h-5 w-5" />
            </Button>
            <Button size="sm" className="gap-2">
              <Ticket className="h-4 w-4" />
              Get Tickets
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
