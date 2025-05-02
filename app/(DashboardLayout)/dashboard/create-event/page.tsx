"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { CalendarDays, Clock, MapPin, Users, Plus, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateEventPage() {
  const [activeTab, setActiveTab] = useState("details")

  const tabs = ["details", "schedule", "location", "tickets"]

  const handleNext = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

  return (
    <>
     
      <div className="flex-1 p-6 md:p-8 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Create Event</h1>
          <Button variant="outline">Save as Draft</Button>
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
                <CardDescription>Provide the basic information about your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" placeholder="Enter event title" className="rounded-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
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
                  <Textarea id="description" placeholder="Describe your event" rows={5} className="rounded-md" />
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
                <CardDescription>Set the date and time for your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="start-date" type="date" className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="start-time">Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="start-time" type="time" className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="end-date" type="date" className="pl-10 rounded-md" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-time">End Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="end-time" type="time" className="pl-10 rounded-md" />
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
                <CardDescription>Specify where your event will take place.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="location-type">Location Type</Label>
                  <Select>
                    <SelectTrigger className="rounded-md">
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="venue">Physical Venue</SelectItem>
                      <SelectItem value="online">Online Event</SelectItem>
                      <SelectItem value="hybrid">Hybrid Event</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Venue Name</Label>
                  <Input id="venue" placeholder="Enter venue name" className="rounded-md" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="address" placeholder="Enter address" className="pl-10 rounded-md" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" className="rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" placeholder="State" className="rounded-md" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="zip">Zip Code</Label>
                    <Input id="zip" placeholder="Zip Code" className="rounded-md" />
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
                <CardDescription>Set up ticket types and pricing for your event.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Event Capacity</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="capacity" type="number" placeholder="Maximum attendees" className="pl-10 rounded-md" />
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
                      <Input id="ticket-price" type="number" placeholder="0.00" className="rounded-md" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ticket-quantity">Quantity</Label>
                      <Input id="ticket-quantity" type="number" placeholder="100" className="rounded-md" />
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
                  Create Event
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
