"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type EventType = "upcoming" | "pending" | "canceled" | "ongoing" | "completed"

interface DashboardEventsProps {
  type: EventType
  data: any
}

export function DashboardEvents({ type, data }: DashboardEventsProps) {
  const allEvents = data

  const events = useMemo(() => ({
    upcoming: allEvents.filter((event: any) => event.status === "UPCOMING"),
    pending: allEvents.filter((event: any) => event.status === "PENDING"),
    canceled: allEvents.filter((event: any) => event.status === "CANCELED"),
    ongoing: allEvents.filter((event: any) => event.status === "ONGOING"),
    completed: allEvents.filter((event: any) => event.status === "COMPLETED"),
  }), [allEvents])

  const [displayEvents, setDisplayEvents] = useState(events[type])

  useEffect(() => {
    setDisplayEvents(events[type])
  }, [type, events])

  const handleDelete = (id: string) => {
    setDisplayEvents((prev:any) => prev.filter((event: any) => event.id !== id))
  }

  if (displayEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">🗓️</div>
        <h3 className="mt-4 text-lg font-medium">No events found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {type === "upcoming" && "You don't have any upcoming events."}
          {type === "pending" && "You don't have any pending events."}
          {type === "canceled" && "You don't have any canceled events."}
          {type === "ongoing" && "You don't have any ongoing events."}
          {type === "completed" && "You don't have any completed events."}
        </p>
        <Button className="mt-4" asChild>
          <Link href="/dashboard/create-event">Create an Event</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayEvents.map((event: any) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={event.eventBanner || "/placeholder.svg"}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <Badge className="mb-2">{event.category}</Badge>
                <h3 className="font-semibold">{event.title}</h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/events/${event.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(event.id)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{event.eventStartTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{event.eventStartTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.seat} attendees
                </span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href={`/events/${event.id}`}>View</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href={`/dashboard/events/edit/${event.id}`}>Manage</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
