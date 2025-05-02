"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { CalendarDays, Clock, MapPin, Users, Plus, ArrowRight, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function EditEventPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id
  const [activeTab, setActiveTab] = useState("details")

  const tabs = ["details", "schedule", "location", "tickets"]

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  // Mock event data - in a real app, you would fetch this based on eventId
  const event = {
    id: eventId,
    title: "Tech Conference 2023",
    category: "technology",
    description: "Join us for the biggest tech conference of the year!",
    date: "2023-12-15",
    startTime: "09:00",
    endTime: "17:00",
    location: "San Francisco Convention Center",
    address: "747 Howard St",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    capacity: 200,
    price: 299,
  }

  return (
    <>
   
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Edit Event</h1>
          <div className="flex gap-2">
            <Button variant="outline">Preview</Button>
            <Button className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Event Details
            </TabsTrigger>
            <TabsTrigger
              value="schedule"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Schedule
            </TabsTrigger>
            <TabsTrigger
              value="location"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Location
            </TabsTrigger>
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Tickets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Update the basic information about your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" defaultValue={event.title} className="rounded-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select defaultValue={event.category}>
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="food">Food & Drink</SelectItem>
                      <SelectItem value="arts">Arts</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" defaultValue={event.description} rows={5} className="rounded-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Event Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">Drag and drop an image, or click to browse</p>
                      <Button variant="outline" size="sm" className="rounded-md">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end pt-4">
                <Button
                  onClick={handleNext}
                  className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Next: Schedule
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>Update the date and time for your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="start-date" type="date" defaultValue={event.date} className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="start-time" type="time" defaultValue={event.startTime} className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="end-date" type="date" defaultValue={event.date} className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="end-time" type="time" defaultValue={event.endTime} className="pl-10 rounded-md" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" className="rounded-md" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Next: Location
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle>Location</CardTitle>
                <CardDescription>Update where your event will take place.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input id="venue" defaultValue={event.location} className="rounded-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" defaultValue={event.address} className="pl-10 rounded-md" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" defaultValue={event.city} className="rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" defaultValue={event.state} className="rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" defaultValue={event.zip} className="rounded-md" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" className="rounded-md" onClick={() => setActiveTab("schedule")}>
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  Next: Tickets
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="tickets">
            <Card className="shadow-md border-border/50">
              <CardHeader>
                <CardTitle>Tickets</CardTitle>
                <CardDescription>Update ticket types and pricing for your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Event Capacity</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="capacity" type="number" defaultValue={event.capacity} className="pl-10 rounded-md" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">General Admission</h3>
                    <Button variant="outline" size="sm" className="rounded-md">
                      Remove
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ticket-price">Price</Label>
                      <Input id="ticket-price" type="number" defaultValue={event.price} className="rounded-md" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ticket-quantity">Quantity</Label>
                      <Input id="ticket-quantity" type="number" defaultValue={event.capacity} className="rounded-md" />
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full rounded-md">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Ticket Type
                </Button>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button variant="outline" className="rounded-md" onClick={() => setActiveTab("location")}>
                  Back
                </Button>
                <Button className="rounded-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
