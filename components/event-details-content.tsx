"use client";

import { JSX, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  ChevronDown,
  ChevronUp,
  Globe,
  Utensils,
  Wifi,
  Accessibility,
  Car,
  Tag,
  DollarSign,
  CircleCheck,
  Rows3,
  Users,
  MessageSquare,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TEvent } from "@/types/eventTypes";
import moment from "moment";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

export function EventDetailsContent({
  eventDetails,
}: {
  eventDetails: TEvent;
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription = eventDetails?.description?.slice(0, 300) + "...";

  const isRegistrationOpen = moment().isBetween(
    eventDetails?.registrationStart,
    eventDetails?.registrationEnd
  );
  const daysRemaining = moment(eventDetails?.registrationEnd).diff(
    moment(),
    "days"
  );
  const seatsFilledPercentage = (
    (eventDetails?.participant?.length / eventDetails?.seat) *
    100
  ).toFixed(0);

  return (
    <div className="space-y-8 bg-card rounded-xl border p-6 shadow-sm">
      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="time">Timing</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="font-display text-2xl font-bold">
              About This Event
            </h2>
            <div className="prose max-w-none text-muted-foreground">
              <p className="whitespace-pre-line">
                {showFullDescription
                  ? eventDetails?.description
                  : truncatedDescription}
              </p>
              {eventDetails?.description?.length > 300 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 flex items-center gap-1"
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span>Show Less</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span>Read More</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </motion.div>

          <div className="space-y-2">
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" />
                <span className="font-medium">Category</span>
              </div>
              <span>{eventDetails?.category}</span>
            </div>

            {/* Event Type */}
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">Event Type</span>
              </div>
              <span>{eventDetails?.eventType}</span>
            </div>

            {/* Price */}
            {eventDetails?.isPaid && (
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="font-medium">Price</span>
                </div>
                <span>${eventDetails?.price}</span>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <CircleCheck className="h-5 w-5 text-primary" />
                <span className="font-medium">Status</span>
              </div>
              <span>{eventDetails?.status}</span>
            </div>

            {/* Total Seats */}
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Rows3 className="h-5 w-5 text-primary" />
                <span className="font-medium">Total Seats</span>
              </div>
              <span>{eventDetails?.seat}</span>
            </div>

            {/* Participants */}
            <div className="flex items-center justify-between rounded-lg bg-muted p-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Participants</span>
              </div>
              <span>{eventDetails?.participant?.length}</span>
            </div>
          </div>
        </TabsContent>

        {/* Timing Tab */}
        <TabsContent value="time" className="space-y-6 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardContent className="p-6">
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {/* Date and Time Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-violet-500" />
                    <h3 className="font-semibold text-lg">Event Date & Time</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Start Time */}
                    <div className="flex items-start space-x-3  p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-violet-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Start Time
                        </p>
                        <p className="font-medium">
                          {moment(eventDetails?.eventStartTime).format(
                            "MMMM Do YYYY"
                          )}
                          <span className="block text-violet-600 font-bold mt-1">
                            {moment(eventDetails?.eventStartTime).format(
                              "h:mm A"
                            )}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* End Time */}
                    <div className="flex items-start space-x-3  p-3 rounded-lg">
                      <Clock className="h-5 w-5 text-violet-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          End Time
                        </p>
                        <p className="font-medium">
                          {moment(eventDetails?.eventEndTime).format(
                            "MMMM Do YYYY"
                          )}
                          <span className="block text-violet-600 font-bold mt-1">
                            {moment(eventDetails?.eventEndTime).format("h:mm A")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Registration Period */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-violet-500" />
                      <h3 className="font-semibold text-lg">
                        Registration Period
                      </h3>
                    </div>
                    {isRegistrationOpen ? (
                      <Badge className="bg-green-500 hover:bg-green-600">
                        Registration Open
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-muted-foreground"
                      >
                        Registration Closed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between  p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">
                        {moment(eventDetails?.registrationStart).format(
                          "MMM D, YYYY"
                        )}
                      </p>
                    </div>

                    <ArrowRight className="h-4 w-4 text-muted-foreground mx-2" />

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">To</p>
                      <p className="font-medium">
                        {moment(eventDetails?.registrationEnd).format(
                          "MMM D, YYYY"
                        )}
                      </p>
                    </div>

                    {isRegistrationOpen && (
                      <div className="ml-4 pl-4 border-l">
                        <p className="text-sm text-muted-foreground">
                          Closing in
                        </p>
                        <p className="font-bold text-violet-600">
                          {daysRemaining} days
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Seats Section */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                  }}
                  className="space-y-3"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-violet-500" />
                    <h3 className="font-semibold text-lg">Attendance</h3>
                  </div>

                  <div className=" p-4 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Available Seats
                      </span>
                      <span className="font-bold">{eventDetails?.seat}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Registered</span>
                      <span className="font-bold text-violet-600">
                        {eventDetails?.participant?.length}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <span>Seats filled</span>
                        <span className="font-medium">
                          {seatsFilledPercentage}%
                        </span>
                      </div>
                      <Progress
                        value={Number(seatsFilledPercentage)}
                        className="h-2"
                      />
                    </div>

                    <div className="text-sm text-muted-foreground text-center mt-2">
                      {eventDetails.seat - eventDetails?.participant?.length}{" "}
                      seats remaining
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </CardContent>
          </motion.div>
        </TabsContent>

        {/* Location Tab */}
        <TabsContent value="location" className="pt-6">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-start space-x-3 p-4 rounded-lg">
                <MapPin className="h-5 w-5 text-violet-500 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Event Location
                  </p>
                  <p className="font-medium">
                    {eventDetails.eventType === "ONLINE"
                      ? "Online Event"
                      : eventDetails.location}
                  </p>
                </div>
              </div>

              {eventDetails.eventType === "ONLINE" &&
                eventDetails.meetingLink && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start space-x-3  p-4 rounded-lg">
                      <MapPin className="h-5 w-5 text-violet-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Platform
                        </p>
                        <p className="font-medium">{eventDetails.platform}</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3  p-4 rounded-lg">
                      <MapPin className="h-5 w-5 text-violet-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Meeting Link
                        </p>
                        <a
                          href={eventDetails.meetingLink}
                          className="text-blue-500 underline font-medium"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Here
                        </a>
                      </div>
                    </div>

                    {eventDetails.meetingLinkPassword && (
                      <div className="flex items-start space-x-3  p-4 rounded-lg md:col-span-2">
                        <MapPin className="h-5 w-5 text-violet-500 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Password
                          </p>
                          <p className="font-medium">
                            {eventDetails.meetingLinkPassword}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </motion.div>
          </CardContent>
        </TabsContent>
      </Tabs>
    </div>
  );
}
