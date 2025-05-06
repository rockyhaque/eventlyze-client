"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", paid: 186, free: 80 },
  { month: "February", paid: 305, free: 200 },
  { month: "March", paid: 237, free: 120 },
  { month: "April", paid: 73, free: 190 },
  { month: "May", paid: 209, free: 130 },
  { month: "June", paid: 214, free: 140 },
]

const chartConfig = {
  paid: {
    label: "Paid Event",
    color: "#2563eb",
  },
  free: {
    label: "Free Event",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function DashboardCategoryChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="paid" fill="var(--color-paid)" radius={4} />
        <Bar dataKey="free" fill="var(--color-free)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
