import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentInvitations } from "@/components/recent-invitations"
import { RecentSubscriber } from "@/components/recent-subscriber"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-8 md:grid-cols-2">
        <RecentInvitations />
        <RecentSubscriber/>
      </div>
    </div>
  )
}
