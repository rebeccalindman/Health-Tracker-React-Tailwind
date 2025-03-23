import {
    ChartContainer,
    type ChartConfig,
    ChartTooltip,
    ChartLegend,
  } from "@/components/ui/chart"
  import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
  import { useSelector } from "react-redux"
  import { RootState } from "../../redux/store" // Adjust this path as needed
  import { useMemo } from "react"

  const chartConfig = {
    date: {
      label: "Date",
      color: "hsl(var(--chart-1))",
    },
    weight: {
      label: "Weight",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const WeightChart = () => {
    const weightHistory = useSelector((state: RootState) => state.weight.weightHistory)

    const chartData = useMemo(() => {
      const grouped = weightHistory.reduce((acc, entry) => {
        const month = new Date(entry.date).toLocaleString("default", { month: "long" })
        const existing = acc.find((item) => item.month === month)
        if (existing) {
          existing.weights.push(entry.weight)
        } else {
          acc.push({
            month,
            weights: [entry.weight],
          })
        }
        return acc
      }, [] as { month: string; weights: number[] }[])

      return grouped.map((item) => ({
        month: item.month,
        weight: item.weights.reduce((sum, weight) => sum + weight, 0) / item.weights.length,
      }))
    }, [weightHistory])

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
          <ChartTooltip
            content={({ payload }) => {
              if (!payload?.length) return null
              const data = payload[0].payload
              return (
                <div className="rounded-md border bg-background p-2 text-sm shadow-sm">
                  <div className="font-medium text-muted-foreground">Date: {data.month}</div>
                  <div className="font-medium text-muted-foreground">Weight: {data.weight.toFixed(2)} kg</div>
                </div>
              )
            }}
          />
          <ChartLegend />
          <Bar dataKey="weight" fill={chartConfig.weight.color} radius={4} />
        </BarChart>
      </ChartContainer>
    )
  }

  export default WeightChart
