import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Filter, Grid, List, Plus } from "lucide-react"
import { DashboardEvents } from "@/components/dashboard-events"

export default function EventsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader heading="My Events" subheading="Manage your created events and registrations" />
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Event
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Grid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Calendar view</span>
            </Button>
          </div>
        </div>
        <TabsContent value="upcoming" className="mt-6">
          <DashboardEvents type="upcoming" />
        </TabsContent>
        <TabsContent value="past" className="mt-6">
          <DashboardEvents type="past" />
        </TabsContent>
        <TabsContent value="drafts" className="mt-6">
          <DashboardEvents type="drafts" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
