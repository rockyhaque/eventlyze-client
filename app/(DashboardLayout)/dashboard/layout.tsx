import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-row">
      <div className="sidebar w-full border max-w-[300px]">
        <DashboardSidebar />
      </div>
      <main className="flex w-full flex-col overflow-hidden p-6">{children}</main>
    </div>
  )
}
