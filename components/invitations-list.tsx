"use client"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin } from "lucide-react"
import { formatDate } from "./modules/Shared/DateTimeFormat/formatDate"
import { formatTime } from "./modules/Shared/DateTimeFormat/formatDateTime"
import { updatePerticipentsStatus } from "@/services/Invitation"

type InvitationStatus = "pending" | "accepted" | "rejected"

interface InvitationsListProps {
  status: InvitationStatus
  data: any
}

export function InvitationsList({ status, data }: InvitationsListProps) {
  const [localData, setLocalData] = useState(data)

  const invitations = useMemo(() => ({
    accepted: localData.filter((invitation: any) => invitation.status.toLowerCase() === "accepted"),
    pending: localData.filter((invitation: any) => invitation.status.toLowerCase() === "pending"),
    rejected: localData.filter((invitation: any) => invitation.status.toLowerCase() === "rejected"),
  }), [localData])

  const currentInvitations = invitations[status]

  const handleStatusChange = async (id: string, newStatus: InvitationStatus) => {
    const payload = {
      invitationId: id,
      status: newStatus.toUpperCase(),
    }

    try {
      const response = await updatePerticipentsStatus(payload)

      console.log("update response client", response)
      setLocalData((prev: any[]) =>
        prev.map(inv =>
          inv.id === id ? { ...inv, status: newStatus } : inv
        )
      )
    } catch (error) {
      console.error("Failed to update status:", error)
    }
  }

  if (currentInvitations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <div className="text-4xl">📩</div>
        <h3 className="mt-4 text-lg font-medium">No invitations</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {status === "pending" && "You don't have any pending invitations."}
          {status === "accepted" && "You haven't accepted any invitations yet."}
          {status === "rejected" && "You haven't rejected any invitations."}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {currentInvitations.map((invitation: any) => (
        <Card key={invitation.id}>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarFallback>{invitation.senderInitials || "AA"}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{invitation.senderName || "Sender Name"}</p>
                      <p className="text-sm text-muted-foreground">Invited you to {invitation.event.title}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{invitation.sentAt}</p>
                  </div>
                  {invitation.message && <p className="mt-2 text-sm">{invitation.message}</p>}
                </div>

                <div className="rounded-md bg-muted p-3">
                  <h4 className="font-medium">{invitation.event.title}</h4>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(invitation.event.eventStartTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(invitation.event.eventStartTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{invitation.event.location}</span>
                    </div>
                  </div>
                </div>

                {status === "pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => handleStatusChange(invitation.id, "accepted")}
                    >
                      Accept
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleStatusChange(invitation.id, "rejected")}
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {status === "accepted" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-green-500" />
                    <span>Accepted</span>
                  </div>
                )}

                {status === "rejected" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
                    <span>Rejected</span>
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
