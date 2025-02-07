"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Task } from "@/types"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

interface TaskGaugeProps {
  tasks: Task[]
}

export function TaskGauge({ tasks }: TaskGaugeProps) {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.status === "done").length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const data = [
    { name: "Completed", value: completionRate },
    { name: "Remaining", value: 100 - completionRate },
  ]

  const COLORS = ["#22c55e", "#ef4444"] // Green for done, Red for remaining

  return (
    <Card className="p-4 bg-none border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">Task Completion</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Percentage and description */}
          <div className="mt-4 text-center">
            <p className="text-2xl font-bold text-primary">{Math.round(completionRate)}%</p>
            <p className="text-sm text-muted-foreground">Completed tasks</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
