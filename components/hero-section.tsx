"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

type Event = {
  image: string;
  title: string;
  category: string;
  eventStartTime: string;
  location: string;
};

interface UserImage {
  id: number;
  src: string;
  alt: string;
}

// Sample user image data
const userImages: UserImage[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "User 1 Avatar",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/flagged/photo-1553642618-de0381320ff3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "User 2 Avatar",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1623880840102-7df0a9f3545b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "User 3 Avatar",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "User 4 Avatar",
  },
];

export function HeroSection({ data }: any) {
  const events = data?.data?.data;
  const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
  useEffect(() => {
    // Select a random event from the events array
    if (events && events.length > 0) {
      const randomIndex: number = Math.floor(Math.random() * events.length);
      setFeaturedEvent(events[randomIndex]);
    }
  }, []);

  return (
    <section className="relative overflow-hidden pt-16 md:pt-24">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/20 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-secondary/20 blur-[100px]" />
      </div>

      <div className="container grid gap-12 md:grid-cols-2 md:items-center pb-20">
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-sm font-medium max-w-fit">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
            <span>Trending Event</span>
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            <span className="gradient-text">Discover</span> and Join <br />
            Amazing Events
          </h1>

          <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
            Find the perfect events to attend, connect with like-minded people,
            and create unforgettable memories.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/create-event">Create Your Event</Link>
            </Button>
          </div>

          <div className="mt-4 flex items-center gap-6">
            <div className="flex -space-x-2">
              {userImages.map((image) => (
                <div
                  key={image.id}
                  className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-background"
                >
                  <Image
                    src={image.src}
                    width={32}
                    height={32}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium">
                +2K
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Join <span className="font-medium text-foreground">2,000+</span>{" "}
              people attending events this month
            </p>
          </div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl">
            {featuredEvent ? (
              <>
                <Image
                  src={
                    featuredEvent.image ||
                    "https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg?t=st=1746527742~exp=1746531342~hmac=bbdd21966166c500675997bdb239d71d43bf1a538c9e582560c96f23bf0ba26d&w=996"
                  }
                  alt={featuredEvent.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-primary/90 px-2.5 py-0.5 text-xs font-medium text-white">
                      Featured
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary/90 px-2.5 py-0.5 text-xs font-medium text-white">
                      {featuredEvent.category}
                    </span>
                  </div>
                  <h2 className="mb-2 font-display text-2xl font-bold text-white">
                    {featuredEvent.title}
                  </h2>
                  <div className="flex flex-wrap gap-4 text-sm text-white/90">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(
                          featuredEvent.eventStartTime
                        ).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{featuredEvent.location}</span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Loading event...</p>
              </div>
            )}
          </div>

          {/* Floating elements */}
          <div className="absolute -right-4 -top-4 animate-float">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div
            className="absolute -bottom-6 -left-6 animate-float"
            style={{ animationDelay: "1s" }}
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
              <div className="text-center">
                <div className="font-display text-xl font-bold text-primary">
                  15
                </div>
                <div className="text-xs font-medium text-primary">June</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="text-background"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,37.3C1200,43,1320,53,1380,58.7L1440,64L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
