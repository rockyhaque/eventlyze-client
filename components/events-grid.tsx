"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEvent, TEventResponse } from "@/types/eventTypes";

// Sample event data
const events = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title: [
    "Tech Conference 2023",
    "Summer Music Festival",
    "Food & Wine Expo",
    "Art Gallery Opening",
    "Startup Pitch Competition",
    "Yoga & Wellness Retreat",
    "Gaming Convention",
    "Winter Fashion Show",
    "New Year's Eve Gala",
    "Photography Workshop",
    "Comedy Night",
    "Book Launch Party",
  ][i],
  image: `/placeholder.svg?height=400&width=600&text=Event+${i + 1}`,
  date: [
    "May 20-22, 2023",
    "June 15-18, 2023",
    "July 8-10, 2023",
    "August 5, 2023",
    "September 12, 2023",
    "October 1-3, 2023",
    "November 18-20, 2023",
    "December 5, 2023",
    "December 31, 2023",
    "January 15, 2024",
    "February 10, 2024",
    "March 3, 2024",
  ][i],
  location: [
    "San Francisco, CA",
    "Central Park, NY",
    "Chicago, IL",
    "Los Angeles, CA",
    "Austin, TX",
    "Sedona, AZ",
    "Seattle, WA",
    "Miami, FL",
    "Las Vegas, NV",
    "Portland, OR",
    "Denver, CO",
    "Boston, MA",
  ][i],
  price: [
    "$299",
    "$149",
    "$79",
    "Free",
    "$49",
    "$399",
    "$89",
    "$129",
    "$199",
    "$59",
    "$25",
    "Free",
  ][i],
  category: [
    "Technology",
    "Music",
    "Food & Drink",
    "Art",
    "Business",
    "Wellness",
    "Gaming",
    "Fashion",
    "Nightlife",
    "Education",
    "Entertainment",
    "Literature",
  ][i],
  attendees: [1200, 5000, 3000, 500, 800, 150, 2500, 1000, 1500, 300, 450, 200][
    i
  ],
  type: [
    "public-paid",
    "public-paid",
    "public-paid",
    "public-free",
    "public-paid",
    "private-paid",
    "public-paid",
    "public-paid",
    "public-paid",
    "public-paid",
    "public-paid",
    "public-free",
  ][i],
}));

export function EventsGrid({ eventsData }: { eventsData: TEventResponse }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const stringId = id.toString();

    setFavorites((prev) =>
      prev.includes(stringId)
        ? prev.filter((fav) => fav !== stringId)
        : [...prev, stringId]
    );
  };


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div>
      <motion.div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {eventsData?.data?.map((event: TEvent) => (
          <motion.div key={event?.id} variants={item}>
            <Link
              href={`/events/${event.id}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={event?.eventBanner || "/placeholder.svg"}
                  alt={event?.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <button
                  onClick={(e) => toggleFavorite(event?.id, e)}
                  className={cn(
                    "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50",
                    favorites.includes(event?.id) && "text-red-500"
                  )}
                  aria-label={
                    favorites?.includes(event.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      favorites?.includes(event?.id) && "fill-current"
                    )}
                  />
                </button>

                <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                  <Badge className="bg-primary/90 hover:bg-primary/80">
                    {event?.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-black/30 text-white backdrop-blur-sm hover:bg-black/50"
                  >
                    {!event?.isPaid || event?.price === 0
                      ? "Free"
                      : `৳${event?.price}`}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="mb-2 font-display text-xl font-bold leading-tight group-hover:text-primary">
                  {event?.title}
                </h3>

                <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event?.registrationStart}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{event?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event?.participant?.length?.toLocaleString()} attendees</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 flex justify-center">
        <Button size="lg">Load More Events</Button>
      </div>
    </div>
  );
}
