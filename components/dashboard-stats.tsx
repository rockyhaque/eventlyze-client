import type React from "react"
import { CalendarDays, Clock, Users, Award } from "lucide-react"

export function DashboardStats({data}:any) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        icon={<CalendarDays className="h-5 w-5 text-primary" />}
        title="Total Events"
        value={data?.totalEvents}
        trend="+12% from last month"
        trendUp={true}
      />
      <StatCard
        icon={<Users className="h-5 w-5 text-primary" />}
        title="Event Attendees"
        value={data?.eventAttendees}
        trend="+18% from last month"
        trendUp={true}
      />
      <StatCard
        icon={<Clock className="h-5 w-5 text-primary" />}
        title="Upcoming Events"
        value={data?.upcomingEvents}
        trend="Next: Tomorrow"
        trendUp={null}
      />
      <StatCard
        icon={<Award className="h-5 w-5 text-primary" />}
        title="Event Rating"
        value={data?.eventRating}
        trend={`Based on ${data?.totalEvents} reviews`}
        trendUp={null}
      />
    </div>
  )
}

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string
  trend: string
  trendUp: boolean | null
}

function StatCard({ icon, title, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <div className="rounded-full bg-primary/10 p-1.5">{icon}</div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold">{value}</p>
        <p
          className={`mt-1 text-xs ${trendUp === true ? "text-green-500" : trendUp === false ? "text-red-500" : "text-muted-foreground"}`}
        >
          {trend}
        </p>
      </div>
    </div>
  )
}
