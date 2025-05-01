import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { UpcomingEvents } from "@/components/upcoming-events"
import { RecentInvitations } from "@/components/recent-invitations"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-8 md:grid-cols-2">
        <UpcomingEvents />
        <RecentInvitations />
      </div>
    </div>
  )
}
