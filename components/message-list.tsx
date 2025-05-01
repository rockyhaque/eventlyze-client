import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Archive, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type MessageFolder = "inbox" | "sent" | "archived"

interface MessageListProps {
  folder: MessageFolder
}

export function MessageList({ folder }: MessageListProps) {
  // Mock data for different message folders
  const messages = {
    inbox: [
      {
        id: "1",
        sender: "Sarah Johnson",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=SJ",
        senderInitials: "SJ",
        subject: "Question about Tech Conference",
        preview: "Hi there, I was wondering if there are still tickets available for the tech conference next month...",
        time: "10:23 AM",
        date: "Today",
        unread: true,
        eventRelated: true,
        eventName: "Tech Conference 2023",
      },
      {
        id: "2",
        sender: "Michael Brown",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=MB",
        senderInitials: "MB",
        subject: "Product Launch Details",
        preview:
          "Here are the final details for the product launch event. Please review and let me know if you have any questions...",
        time: "Yesterday",
        date: "Oct 10",
        unread: false,
        eventRelated: true,
        eventName: "Product Launch Party",
      },
      {
        id: "3",
        sender: "Emma Wilson",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=EW",
        senderInitials: "EW",
        subject: "Workshop Materials",
        preview:
          "I've attached the materials for the upcoming design workshop. Please distribute these to all attendees...",
        time: "Oct 8",
        date: "Oct 8",
        unread: false,
        eventRelated: true,
        eventName: "Design Workshop",
      },
    ],
    sent: [
      {
        id: "4",
        recipient: "David Lee",
        recipientAvatar: "/placeholder.svg?height=40&width=40&text=DL",
        recipientInitials: "DL",
        subject: "Re: Annual Team Retreat",
        preview:
          "Thanks for the information. I'll make sure to bring the requested items for the team building activities...",
        time: "Oct 7",
        date: "Oct 7",
        eventRelated: true,
        eventName: "Annual Team Retreat",
      },
      {
        id: "5",
        recipient: "Jessica Taylor",
        recipientAvatar: "/placeholder.svg?height=40&width=40&text=JT",
        recipientInitials: "JT",
        subject: "Unable to Attend",
        preview:
          "I regret to inform you that I won't be able to attend the networking mixer due to a scheduling conflict...",
        time: "Oct 5",
        date: "Oct 5",
        eventRelated: true,
        eventName: "Networking Mixer",
      },
    ],
    archived: [
      {
        id: "6",
        sender: "Robert Chen",
        senderAvatar: "/placeholder.svg?height=40&width=40&text=RC",
        senderInitials: "RC",
        subject: "Past Event Feedback",
        preview:
          "Thank you for attending our event last month. We would appreciate your feedback on your experience...",
        time: "Sep 15",
        date: "Sep 15",
        unread: false,
        eventRelated: true,
        eventName: "Summer Gala",
      },
    ],
  }

  const currentMessages = messages[folder]

  if (currentMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">📭</div>
        <h3 className="mt-4 text-lg font-medium">No messages</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {folder === "inbox" && "Your inbox is empty."}
          {folder === "sent" && "You haven't sent any messages."}
          {folder === "archived" && "You don't have any archived messages."}
        </p>
        {folder === "inbox" && <Button className="mt-4">Compose Message</Button>}
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {currentMessages.map((message) => (
        <Card key={message.id} className={message.unread ? "border-primary/20 bg-primary/5" : ""}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={folder === "sent" ? message.recipientAvatar : message.senderAvatar}
                  alt={folder === "sent" ? message.recipient : message.sender}
                />
                <AvatarFallback>
                  {folder === "sent" ? message.recipientInitials : message.senderInitials}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium">
                      {folder === "sent" ? message.recipient : message.sender}
                      {message.unread && <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-primary"></span>}
                    </p>
                    <p className="font-medium">{message.subject}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground whitespace-nowrap">{message.time}</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">More options</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="mr-2 h-4 w-4" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>

                {message.eventRelated && (
                  <div className="pt-1">
                    <Badge variant="outline" className="text-xs">
                      {message.eventName}
                    </Badge>
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
