import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter } from "lucide-react"
import { InvitationsList } from "@/components/invitations-list"

export default function InvitationsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader heading="Invitations" subheading="Manage event invitations you've received" />

      <Tabs defaultValue="pending" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="accepted">Accepted</TabsTrigger>
            <TabsTrigger value="declined">Declined</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        <TabsContent value="pending" className="mt-6">
          <InvitationsList status="pending" />
        </TabsContent>
        <TabsContent value="accepted" className="mt-6">
          <InvitationsList status="accepted" />
        </TabsContent>
        <TabsContent value="declined" className="mt-6">
          <InvitationsList status="declined" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
