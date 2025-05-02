import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentSubscriber() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Subscriber</CardTitle>
        <CardDescription>People who have subscribe to your newsletter</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <div key={invitation.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={invitation.avatar || "/placeholder.svg"} alt={invitation.name} />
                  <AvatarFallback>{invitation.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{invitation.name}</p>
                  <p className="text-sm text-muted-foreground">{invitation.event}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const invitations = [
  {
    id: 1,
    name: "Alex Johnson",
    event: "Tech Conference 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Williams",
    event: "Networking Mixer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Michael Brown",
    event: "Product Launch Party",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Emily Davis",
    event: "Annual Charity Gala",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "David Wilson",
    event: "Workshop: Future of AI",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    name: "Jessica Taylor",
    event: "Summer Music Festival",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
