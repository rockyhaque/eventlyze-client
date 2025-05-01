import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] xl:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <main className="flex w-full flex-col overflow-hidden py-8">{children}</main>
    </div>
  )
}
