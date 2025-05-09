import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter } from "lucide-react"
import { InvitationsList } from "@/components/invitations-list"
import { getAllInvitesForPerticipents } from "@/services/Invitation"

export default async function InvitationsPage() {
  const invitationsDataRaw = await getAllInvitesForPerticipents()

  return (
    <div>
      <PageHeader title="Invitations" description="Manage event invitations you've received" />

      <Tabs defaultValue="pending" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

        </div>
        <TabsContent value="pending"  className="mt-6">
          <InvitationsList data={invitationsDataRaw.data} status="pending" />
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          <InvitationsList data={invitationsDataRaw.data} status="accepted" />
        </TabsContent>
        <TabsContent value="rejected" className="mt-6">
          <InvitationsList data={invitationsDataRaw.data} status="rejected" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
