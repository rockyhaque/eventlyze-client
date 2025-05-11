"use client"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvitationsList } from "@/components/invitations-list"
import { useState, useMemo, useCallback } from "react"

const InvitationWrapper = ({ data }: any) => {
  const [localData, setLocalData] = useState(data)

  const categorizedInvitations = useMemo(() => {
    return localData.reduce((acc: Record<string, any[]>, invitation: any) => {
      const status = invitation.status
      if (acc[status]) {
        acc[status].push(invitation)
      }
      return acc
    }, { accepted: [], pending: [], rejected: [] })
  }, [localData])

  const handleUpdate = useCallback((id: string, newStatus: string) => {
    setLocalData((prev:any) =>
      prev.map((inv: any) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    )
  }, [])

  return (
    <>
      <PageHeader title="Invitations" description="Manage event invitations you've received" />
      <Tabs defaultValue="pending" className="w-full">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <InvitationsList
            data={categorizedInvitations.pending}
            onStatusChange={handleUpdate}
            status="pending"
          />
        </TabsContent>

        <TabsContent value="accepted">
          <InvitationsList
            data={categorizedInvitations.accepted}
            onStatusChange={handleUpdate}
            status="accepted"
          />
        </TabsContent>

        <TabsContent value="rejected">
          <InvitationsList
            data={categorizedInvitations.rejected}
            onStatusChange={handleUpdate}
            status="rejected"
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default InvitationWrapper
