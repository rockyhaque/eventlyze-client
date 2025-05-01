"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Users, DollarSign, Clock, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventActions() {
  const [showRequestDialog, setShowRequestDialog] = useState(false)
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)

  // Sample event data
  const event = {
    id: 1,
    title: "Tech Conference 2023",
    date: "May 20-22, 2023",
    time: "9:00 AM - 6:00 PM",
    price: "$299",
    attendees: 1200,
    maxAttendees: 1500,
    type: "public-paid", // public-free, public-paid, private-free, private-paid
    registrationEnds: "May 15, 2023",
  }

  const getActionButton = () => {
    switch (event.type) {
      case "public-free":
        return (
          <Button size="lg" className="w-full">
            Join Event
          </Button>
        )
      case "public-paid":
        return (
          <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full">
                Pay & Join
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Complete Payment</DialogTitle>
                <DialogDescription>Enter your payment details to join this event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Pay {event.price}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      case "private-free":
        return (
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full">
                Request to Join
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request to Join</DialogTitle>
                <DialogDescription>Send a request to the event organizer to join this private event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reason">Why do you want to join?</Label>
                  <Textarea
                    id="reason"
                    placeholder="Tell the organizer why you're interested in this event..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      case "private-paid":
        return (
          <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
            <DialogTrigger asChild>
              <Button size="lg" className="w-full">
                Request to Join
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Request to Join</DialogTitle>
                <DialogDescription>Send a request to the event organizer to join this private event.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="reason">Why do you want to join?</Label>
                  <Textarea
                    id="reason"
                    placeholder="Tell the organizer why you're interested in this event..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">Send Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )
      default:
        return (
          <Button size="lg" className="w-full">
            Join Event
          </Button>
        )
    }
  }

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
            <span>{event.price}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="font-medium">Date</span>
            </div>
            <span>{event.date}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">Time</span>
            </div>
            <span>{event.time}</span>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-muted p-3">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Attendees</span>
            </div>
            <span>
              {event.attendees} / {event.maxAttendees}
            </span>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4" />
            <span>Registration closes on {event.registrationEnds}</span>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tickets">Number of Tickets</Label>
            <Select defaultValue="1">
              <SelectTrigger id="tickets">
                <SelectValue placeholder="Select tickets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Ticket</SelectItem>
                <SelectItem value="2">2 Tickets</SelectItem>
                <SelectItem value="3">3 Tickets</SelectItem>
                <SelectItem value="4">4 Tickets</SelectItem>
                <SelectItem value="5">5 Tickets</SelectItem>
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
  )
}
