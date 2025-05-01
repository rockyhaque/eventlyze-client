import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin } from "lucide-react"

type InvitationStatus = "pending" | "accepted" | "declined"

interface InvitationsListProps {
  status: InvitationStatus
}

export function InvitationsList({ status }: InvitationsListProps) {
  // Mock data for different invitation statuses
  const invitations = {
    pending: [
      {
        id: "1",
        eventName: "Tech Conference 2023",
        date: "Oct 15, 2023",
        time: "9:00 AM - 5:00 PM",
        location: "San Francisco Convention Center",
        senderName: "Sarah Johnson",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
        senderInitials: "SJ",
        message: "Would love to have you join us for this amazing tech event!",
        sentAt: "2 days ago",
      },
      {
        id: "2",
        eventName: "Product Launch Party",
        date: "Nov 5, 2023",
        time: "7:00 PM - 10:00 PM",
        location: "Downtown Loft Space",
        senderName: "Michael Brown",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=MB",
        senderInitials: "MB",
        message: "We're launching our new product and would like you to be there!",
        sentAt: "Yesterday",
      },
      {
        id: "3",
        eventName: "Design Workshop",
        date: "Nov 12, 2023",
        time: "10:00 AM - 3:00 PM",
        location: "Creative Studio",
        senderName: "Emma Wilson",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=EW",
        senderInitials: "EW",
        message: "Join us for a hands-on design workshop with industry experts.",
        sentAt: "Just now",
      },
    ],
    accepted: [
      {
        id: "4",
        eventName: "Annual Team Retreat",
        date: "Sep 10, 2023",
        time: "All day",
        location: "Mountain Resort",
        senderName: "David Lee",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=DL",
        senderInitials: "DL",
        message: "Looking forward to seeing you at the retreat!",
        sentAt: "1 week ago",
        acceptedAt: "5 days ago",
      },
    ],
    declined: [
      {
        id: "5",
        eventName: "Networking Mixer",
        date: "Aug 25, 2023",
        time: "6:00 PM - 9:00 PM",
        location: "Rooftop Bar",
        senderName: "Jessica Taylor",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=JT",
        senderInitials: "JT",
        message: "Join us for drinks and networking with local professionals.",
        sentAt: "2 weeks ago",
        declinedAt: "1 week ago",
      },
    ],
  }

  const currentInvitations = invitations[status]

  if (currentInvitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">📩</div>
        <h3 className="mt-4 text-lg font-medium">No invitations</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {status === "pending" && "You don't have any pending invitations."}
          {status === "accepted" && "You haven't accepted any invitations yet."}
          {status === "declined" && "You haven't declined any invitations."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentInvitations.map((invitation) => (
        <Card key={invitation.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={invitation.senderAvatar || "/placeholder.svg"} alt={invitation.senderName} />
                <AvatarFallback>{invitation.senderInitials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{invitation.senderName}</p>
                      <p className="text-sm text-muted-foreground">Invited you to {invitation.eventName}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{invitation.sentAt}</p>
                  </div>

                  {invitation.message && <p className="mt-2 text-sm">{invitation.message}</p>}
                </div>

                <div className="rounded-md bg-muted p-3">
                  <h4 className="font-medium">{invitation.eventName}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.location}</span>
                    </div>
                  </div>
                </div>

                {status === "pending" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Accept
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Decline
                    </Button>
                  </div>
                )}

                {status === "accepted" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Accepted {invitation.acceptedAt}</span>
                  </div>
                )}

                {status === "declined" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    <span>Declined {invitation.declinedAt}</span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
