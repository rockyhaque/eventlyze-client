"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type EventType = "upcoming" | "past" | "drafts"

interface DashboardEventsProps {
  type: EventType
}

export function DashboardEvents({ type }: DashboardEventsProps) {
  // Mock data for different event types
  const events = {
    upcoming: [
      {
        id: "1",
        title: "Tech Conference 2023",
        date: "Oct 15, 2023",
        time: "9:00 AM - 5:00 PM",
        location: "San Francisco Convention Center",
        attendees: 120,
        capacity: 200,
        image: "/placeholder.svg?height=100&width=200&text=Tech+Conf",
        category: "Technology",
      },
      {
        id: "2",
        title: "Product Launch Party",
        date: "Nov 5, 2023",
        time: "7:00 PM - 10:00 PM",
        location: "Downtown Loft Space",
        attendees: 45,
        capacity: 75,
        image: "/placeholder.svg?height=100&width=200&text=Launch",
        category: "Business",
      },
      {
        id: "3",
        title: "Design Workshop",
        date: "Nov 12, 2023",
        time: "10:00 AM - 3:00 PM",
        location: "Creative Studio",
        attendees: 18,
        capacity: 25,
        image: "/placeholder.svg?height=100&width=200&text=Design",
        category: "Education",
      },
    ],
    past: [
      {
        id: "4",
        title: "Annual Team Retreat",
        date: "Sep 10, 2023",
        time: "All day",
        location: "Mountain Resort",
        attendees: 32,
        capacity: 35,
        image: "/placeholder.svg?height=100&width=200&text=Retreat",
        category: "Corporate",
      },
      {
        id: "5",
        title: "Networking Mixer",
        date: "Aug 25, 2023",
        time: "6:00 PM - 9:00 PM",
        location: "Rooftop Bar",
        attendees: 65,
        capacity: 80,
        image: "/placeholder.svg?height=100&width=200&text=Mixer",
        category: "Networking",
      },
    ],
    drafts: [
      {
        id: "6",
        title: "Holiday Party",
        date: "Dec 15, 2023",
        time: "7:00 PM - 11:00 PM",
        location: "Grand Hotel",
        attendees: 0,
        capacity: 150,
        image: "/placeholder.svg?height=100&width=200&text=Holiday",
        category: "Social",
      },
    ],
  }

  const currentEvents = events[type]

  const [displayEvents, setDisplayEvents] = useState(currentEvents)

  const handleDelete = (id: string) => {
    setDisplayEvents(displayEvents.filter((event) => event.id !== id))
  }

  if (displayEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">🗓️</div>
        <h3 className="mt-4 text-lg font-medium">No events found</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {type === "upcoming" && "You don't have any upcoming events."}
          {type === "past" && "You don't have any past events."}
          {type === "drafts" && "You don't have any draft events."}
        </p>
        <Button className="mt-4" asChild>
          <Link href="/create-event">Create an Event</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {displayEvents.map((event) => (
        <Card key={event.id} className="overflow-hidden">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={event.image || "/placeholder.svg"}
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
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>
                  {event.attendees} / {event.capacity} attendees
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
