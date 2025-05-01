"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ProfileEvents() {
  // Mock data for events
  const events = [
    {
      id: "1",
      title: "Tech Conference 2023",
      date: "Oct 15, 2023",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco Convention Center",
      attendees: 120,
      category: "Technology",
    },
    {
      id: "2",
      title: "Product Launch Party",
      date: "Nov 5, 2023",
      time: "7:00 PM - 10:00 PM",
      location: "Downtown Loft Space",
      attendees: 45,
      category: "Business",
    },
    {
      id: "3",
      title: "Design Workshop",
      date: "Nov 12, 2023",
      time: "10:00 AM - 3:00 PM",
      location: "Creative Studio",
      attendees: 18,
      category: "Education",
    },
  ]

  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No events found.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
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
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
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
                <span>{event.attendees} attendees</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
