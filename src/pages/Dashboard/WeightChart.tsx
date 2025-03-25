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
          const dateObj = new Date(entry.date)
          const month = dateObj.toLocaleString("default", { month: "long" })
          const year = dateObj.getFullYear()
          const monthIndex = dateObj.getMonth() // 0 = Jan, 11 = Dec
          const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}` // e.g., 2025-03
      
          const existing = acc.find((item) => item.key === key)

          const weight = Number(entry.weight) 
          if (isNaN(weight)) return acc // skip invalid weight entries

      
          if (existing) {
            existing.weights.push(Number(entry.weight))
          } else {
            acc.push({
              key,
              month,
              year,
              weights: [weight],
              monthIndex,
            })
          }
      
          return acc
        }, [] as { key: string; month: string; year: number; weights: number[]; monthIndex: number }[])
      
        return grouped
          .map((item) => ({
            month: `${item.month} ${item.year}`, // e.g., "March 2025"
            weight:
                item.weights.length > 0
                    ? item.weights.reduce((sum, w) => sum + w, 0) / item.weights.length
                    : 0,
            sortValue: item.year * 12 + item.monthIndex,
          }))
          .sort((a, b) => a.sortValue - b.sortValue)
      }, [weightHistory])
      

    return (
        <>
            <p>Monthly average weight.</p>
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
                    <div className="rounded-md border bg-background p-2 text-sm text-left shadow-sm">
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
      </>
    )
  }

  export default WeightChart
