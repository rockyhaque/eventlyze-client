import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentInvitations } from "@/components/recent-invitations"
import { RecentSubscriber } from "@/components/recent-subscriber"
import { getActiveUser } from "@/hooks/getActiveUser"
import { getStats } from "@/services/AdminServices"

export default async function DashboardPage() {
  const {role} = await getActiveUser()
  const stats = await getStats()

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
