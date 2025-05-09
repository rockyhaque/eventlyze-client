import { DashboardCategoryChart } from "@/components/dashboard-category-chart"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentReviewsDashboard } from "@/components/recent-reviews-dashboard"
import { RecentSubscriber } from "@/components/recent-subscriber"
import { getActiveUser } from "@/hooks/getActiveUser"
import { getStats } from "@/services/AdminServices"
import { getChartData } from "@/services/DashboardService"
import { getAllReviews } from "@/services/Reviews"

export default async function DashboardPage() {
  const user = await getActiveUser()
  const role = user?.role || "USER"

  const stats = await getStats()
  const chartData = await getChartData()
  const reviewData = await getAllReviews()
  const reviews = reviewData?.data

  return (
    <div className="space-y-4">
      <DashboardHeader/>
      <DashboardStats data={stats?.data}/>
      <div className="grid gap-8 md:grid-cols-2">
        <DashboardCategoryChart data={chartData?.data?.chartData}/>
        {
          role == "ADMIN" &&  <RecentSubscriber subscribers={stats?.data?.recentSubscribers}/>
        }
        {
          role == "USER" && <RecentReviewsDashboard reviews={reviews}/>
        }
      </div>
    </div>
  )
}
