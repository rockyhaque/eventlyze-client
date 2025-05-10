"use client"
import { PageHeader } from "@/components/page-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvitationsList } from "@/components/invitations-list"
import { useState } from "react"

const InvitationWrapper = ({data}:any) => {
      const [localData, setLocalData] = useState(data)
  return (<>
    <InvitationWrapper/>
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
        <InvitationsList data={localData} setLocalData={setLocalData} status="pending" />
      </TabsContent>
      <TabsContent value="accepted" className="mt-6">
        <InvitationsList data={localData} setLocalData={setLocalData} status="accepted" />
      </TabsContent>
      <TabsContent value="rejected" className="mt-6">
        <InvitationsList data={localData} setLocalData={setLocalData} status="rejected" />
      </TabsContent>
    </Tabs>
    </>
  )
}

export default InvitationWrapper