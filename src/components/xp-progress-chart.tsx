"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface XPProgressChartProps {
    data: { date: string; xp: number }[];
}

export function XPProgressChart({ data }: XPProgressChartProps) {
  const chartConfig = {
    xp: {
      label: "XP",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <div className="w-full h-48">
         <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
            >
                <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <Tooltip
                    content={<ChartTooltipContent 
                        indicator="line"
                        hideLabel
                        formatter={(value, name, props) => (
                            <div className="flex flex-col">
                                <span className="font-bold">{props.payload?.xp} XP</span>
                                <span className="text-xs text-muted-foreground">on {props.payload?.date}</span>
                            </div>
                        )}
                    />}
                    cursor={{
                        stroke: "hsl(var(--primary))",
                        strokeWidth: 2,
                        strokeDasharray: "3 3",
                    }}
                />
                <Line
                    dataKey="xp"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{
                        r: 4,
                        fill: "hsl(var(--primary))",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2,
                    }}
                />
            </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}
