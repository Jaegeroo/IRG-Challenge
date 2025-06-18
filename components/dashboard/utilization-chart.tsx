"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardDataT } from "@/lib/types";
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";

export default function UtilizationChart({ data }: { data: DashboardDataT[] }) {
  const chartData = data.map((item) => ({
    week: item.week,
    util: item.util, // Use utilization percentage instead of cap_hours
    cap_hours: item.cap_hours,
  }));

  // Function to determine bar color based on utilization
  const getBarColor = (util: number) => {
    if (util <= 100) return "hsl(142, 76%, 36%)"; // Green
    if (util <= 120) return "hsl(32, 95%, 44%)"; // Orange
    return "hsl(0, 84%, 60%)"; // Red
  };

  const chartConfig = {
    util: {
      label: "Utilization %",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Utilization %</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2 font-semibold text-primary">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-green-400" /> ≤ 100%
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-orange-400" />
              101-120%
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 bg-red-600" />
              &gt;120%
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `Week ${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => [`${value}%`, "Utilization"]}
                />
              }
            />
            <Bar dataKey="util" radius={8}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.util)} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
