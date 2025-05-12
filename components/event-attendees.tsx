"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TEvent } from "@/types/eventTypes";

type EventDetailsProps = {
  eventDetails: TEvent;
};

export function EventAttendees({ eventDetails }: EventDetailsProps) {
  const joinedParticipant = eventDetails?.participant?.filter(
    (p) => p.status === "JOINED" || "APPROVED"
  );

  return (
    <motion.div
      className="rounded-xl border bg-card p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-bold">Attendees</h2>
          <Badge variant="outline" className="ml-2">
            {eventDetails?.participant?.length}
          </Badge>
        </div>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {joinedParticipant?.length > 0 ? (
            joinedParticipant?.map((attendee, index) => (
              <motion.div
                key={attendee.id}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={attendee?.user?.photo || ""}
                      alt={attendee?.user?.name}
                    />
                    <AvatarFallback>
                      {attendee?.user?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{attendee?.user?.name}</div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="flex h-[200px] items-center justify-center text-center text-muted-foreground">
              <div>
                <p>No attendees found</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
}
