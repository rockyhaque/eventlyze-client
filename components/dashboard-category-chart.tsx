"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { PageHeader } from "./page-header"
import { Card } from "./ui/card"

const chartConfig = {
  event: {
    label: "Events Created",
    color: "#7b3aed",
  },
} satisfies ChartConfig

export function DashboardCategoryChart({ data }: any) {
  return (
    <Card className="p-5">
      <PageHeader title="Yearly Events" description="Number of events created over the year." />
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={data}>
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
    </Card>
  )
}
