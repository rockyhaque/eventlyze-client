"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", event: 186 },
  { month: "February", event: 305},
  { month: "March", event: 237},
  { month: "April", event: 73},
  { month: "May", event: 209},
  { month: "June", event: 214},
]

const chartConfig = {
  event: {
    label: "Events Created",
    color: "#2563eb",
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
        <ChartTooltip content={<ChartTooltipContent className="w-[200px]" />} />
        <Bar dataKey="event" fill="var(--color-event)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
