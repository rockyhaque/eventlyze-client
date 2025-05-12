import { PageHeader } from "@/components/page-header"
export const dynamic = "force-dynamic";
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { DashboardEvents } from "@/components/dashboard-events"
import Link from "next/link"
import { getAllUserEvents } from "@/services/EventServices"
import { getActiveUser } from "@/hooks/getActiveUser"



export default async function EventsPage() {
  const { data } = await getAllUserEvents()
  console.log(" data:", data)

 
  const user = await getActiveUser()
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title={`${user?.role as string == "ADMIN" ? "All Events" : "My Events"}`} description="Manage your created events and registrations" />

        {
          user?.role == "USER" && (<Button size="sm" className="max-w-fit" asChild>
            <Link href="/dashboard/create-event" className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>)
        }


      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

        </div>
        <TabsContent value="upcoming" className="mt-6">
          <DashboardEvents data={data} type="upcoming" />
        </TabsContent>
        <TabsContent value="canceled" className="mt-6">
          <DashboardEvents data={data} type="canceled" />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <DashboardEvents data={data} type="pending" />
        </TabsContent>
        <TabsContent value="ongoing" className="mt-6">
          <DashboardEvents data={data} type="ongoing" />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <DashboardEvents data={data} type="completed" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
