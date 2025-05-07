import { DashboardCategoryChart } from "@/components/dashboard-category-chart"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentSubscriber } from "@/components/recent-subscriber"
import { getActiveUser } from "@/hooks/getActiveUser"
import { getStats } from "@/services/AdminServices"
import { getChartData } from "@/services/DashboardService"

export default async function DashboardPage() {
  const {role} = await getActiveUser()
  const stats = await getStats()
  const chartData = await getChartData()

  return (
    <div className="space-y-4">
      <DashboardHeader/>
      <DashboardStats data={stats.data}/>
      <div className="grid gap-8 md:grid-cols-2">
        <DashboardCategoryChart data={chartData.data.chartData}/>
        <RecentSubscriber subscribers={stats?.data?.recentSubscribers}/>
      </div>
    </div>
  )
}
