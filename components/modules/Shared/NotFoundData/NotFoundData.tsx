"use client";

import { motion } from "framer-motion";
import { Calendar, SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function NotFoundData() {
  return (
   <div >
     <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex  flex-col items-center justify-center rounded-xl border border-dashed border-muted-foreground/20 bg-card/50 p-10 text-center"
    >
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-10 w-10 text-muted-foreground" />
      </div>

      <h3 className="mb-2 font-display text-2xl font-bold">No Events Found</h3>
      <p className="mb-6 max-w-md text-muted-foreground">
        We couldn't find any events matching your criteria. Try adjusting your
        filters or check back later.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="outline" size="sm">
          <Link href="/events">
            <Calendar className="mr-2 h-4 w-4" />
            Browse All Events
          </Link>
        </Button>
        {/* <Button size="sm">Create Event</Button> */}
      </div>
    </motion.div>
   </div>
  );
}
