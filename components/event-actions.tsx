"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TEvent } from "@/types/eventTypes";

import PaymentDialog from "./PaymentDialog";
import RequestDialog from "./RequestDialog";
import { formatDateTime } from "./modules/Shared/DateTimeFormat/formatDateTime";
import { joinFreeEvent } from "@/services/Participant";

export function EventActions({ eventDetails }: { eventDetails: TEvent }) {
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const handleJoinFreeEvent = async (id: string) => {

    console.log({id},"from button")
    const res = await joinFreeEvent(id);

    console.log(res)
  };

  const getActionButton = () => {
    if (eventDetails?.isPaid) {
      return (
        <PaymentDialog
          open={showPaymentDialog}
          onOpenChange={setShowPaymentDialog}
          price={Number(eventDetails?.price)}
        />
      );
    } else if (!eventDetails?.isPublic) {
      return (
        <RequestDialog
          open={showRequestDialog}
          onOpenChange={setShowRequestDialog}
        />
      );
    } else {
      return (
        <Button size="lg" className="w-full" onClick={()=>handleJoinFreeEvent(eventDetails?.id)}>
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
              Registration closes on {date}-{time}
            </span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tickets">Number of Tickets</Label>
            <Select defaultValue="1">
              <SelectTrigger id="tickets">
                <SelectValue placeholder="Select tickets" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((n) => (
                  <SelectItem key={n} value={n.toString()}>
                    {n} Ticket{n > 1 ? "s" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          {getActionButton()}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            By joining this event, you agree to the{" "}
            <a href="#" className="underline underline-offset-2">
              Terms & Conditions
            </a>
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
