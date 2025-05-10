
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TEvent, TEventResponse } from "@/types/eventTypes";
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate";

export function EventsGrid({ eventsData }: { eventsData: TEventResponse }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<TEvent[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 8;

  // Initialize with first page of events
  useEffect(() => {
    if (eventsData?.data) {
      setDisplayedEvents(eventsData.data.slice(0, eventsPerPage));
    }
  }, [eventsData]);

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

  const loadMoreEvents = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0; // Always start from beginning for simplicity
    const endIndex = nextPage * eventsPerPage;

    setDisplayedEvents(eventsData.data.slice(0, endIndex));
    setCurrentPage(nextPage);
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
      {!eventsData?.data ? (
        "Not Found"
      ) : (
        <>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {displayedEvents.map((event: TEvent) => (
              <motion.div key={event?.id} variants={item}>
                <Link
                  href={`/events/${event.id}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* ... rest of your event card code remains the same ... */}
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
                        <span>{formatDate(event?.registrationStart)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event?.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>
                          {event?.participant?.length?.toLocaleString()} attendees
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {eventsData.data.length > displayedEvents.length && (
            <div className="mt-12 flex justify-center">
              <Button size="lg" onClick={loadMoreEvents}>
                Load More Events
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}