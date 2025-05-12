"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Users, DollarSign, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { TEvent } from "@/types/eventTypes";

import RequestDialog from "./RequestDialog";
import { formatDateTime } from "./modules/Shared/DateTimeFormat/formatDateTime";
import { createPayment, joinFreeEvent } from "@/services/Participant";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getCountdownTime } from "./modules/Shared/DateTimeFormat/getCountdownTime";
import { TActiveUser } from "@/types/userTypes";
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate";
import InvitationForm from "./modules/Invaitation/InvitationForm";
import Link from "next/link";

type EventReviewsProps = {
  eventDetails: TEvent;
  activeUser: TActiveUser | null | undefined;
};

export function EventActions({ eventDetails, activeUser }: EventReviewsProps) {
  const participantUser = eventDetails?.participant?.some(
    (p) => p.userId === activeUser?.userId && (p.status === "JOINED" || p.status === "APPROVED")
  );
  const isRequestedToJoin =  eventDetails?.participant?.some(
    (p) => p.userId === activeUser?.userId && p.status === "REQUESTED"
  );
  const [isJoined, setIsJoined] = useState(participantUser || false)
  const [isRequested, setIsRequested] = useState(isRequestedToJoin)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isRunning, setIsRunning] = useState(true);
 const isLoggedIn = activeUser
  const isOwner = eventDetails?.ownerId === activeUser?.userId

  useEffect(() => {
    const interval = setInterval(() => {
      const { days, hours, minutes, seconds, isExpired } = getCountdownTime(
        eventDetails?.registrationEnd
      );

      setTimeLeft({ days, hours, minutes, seconds });
      if (isExpired) {
        setIsRunning(false);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [eventDetails?.registrationStart]);

  const router = useRouter();

  const handleJoinFreeEvent = async (id: string) => {
    const JoinedEventId = {
      eventId: id,
    };

    const res = await joinFreeEvent(JoinedEventId);

    if (res.success) {
      toast.success(res.message);
      setIsJoined(true)
    } else {
      toast.error(res.message);
    }
  };

  const handlePayment = async (id: string) => {
    const JoinedEventId = {
      eventId: id,
    };

    const res = await createPayment(JoinedEventId);

    if (res.success) {
      toast.success(res.message);
      router.push(res?.data?.paymentUrl);
    } else {
      toast.error(res.message);
    }
  };

  const getActionButton = () => {
    if(!isLoggedIn){
      return (
        <Button size="lg" className="w-full">
          <Link href="/signup">Register To Join</Link>
        </Button>
      );
    }

    if (isOwner) {
      return (
        <InvitationForm eventId={eventDetails?.id} />
      );
    }

    if (!isRunning) {
      return (
        <Button size="lg" className="w-full" disabled>
          Event Ended
        </Button>
      );
    }
    if(isRequested){
      return (
        <Button size="lg" className="w-full" disabled>
          Requested
        </Button>
      );
    }

    if (isJoined) {
      return (
        <Button size="lg" className="w-full" disabled>
          Already Joined
        </Button>
      );
    }

    if (eventDetails?.isPaid) {
      return (
        <Button
          onClick={() => handlePayment(eventDetails?.id)}
          size="lg"
          className="w-full"
        >
          Pay & Join
        </Button>
      );
    } else if (!eventDetails?.isPublic) {
      return (
        <Button
        size="lg"
        className="w-full"
        onClick={() => handleJoinFreeEvent(eventDetails?.id)}
      >
        Request for join
      </Button>
      );
    } else {
      return (
        <Button
          size="lg"
          className="w-full"
          onClick={() => handleJoinFreeEvent(eventDetails?.id)}
        >
          Join Event
        </Button>
      );
    }
  };

  const { date, time } = formatDateTime(eventDetails?.registrationStart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="sticky top-20">
        <CardHeader>
          <CardTitle>Registration</CardTitle>
          <CardDescription>Secure your spot at this event</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="font-medium">Price</span>
            </div>
            <span>{eventDetails?.price}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">Date</span>
            </div>
            <span>{date}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Time</span>
            </div>
            <span>{time}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Attendees</span>
            </div>
            <span>
              {eventDetails?.participant?.length} / {eventDetails?.seat}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>
              Registration closes on {formatDate(date)}:{time}
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          {getActionButton()}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By joining this event, you agree to the{" "}
            <a href="/terms-of-service" className="underline underline-offset-2">
              Terms & Conditions
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
