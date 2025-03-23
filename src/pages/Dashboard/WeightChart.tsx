import { ChartContainer, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { useSelector } from "react-redux"
import { subMonths, startOfMonth, isAfter, isBefore } from "date-fns"




// test chart data
const chartData = [
    { month: "January", date: "2023-01-01", weight: 80 },
    { month: "February", date: "2023-02-01", weight: 200 },
    { month: "March", date: "2023-03-01", weight: 120 },
    { month: "April", date: "2023-04-01", weight: 190 },
    { month: "May", date: "2023-05-01", weight: 130 },
    { month: "June", date: "2023-06-01", weight: 140 },
    { month: "July", date: "2023-07-01", weight: 140 },
    { month: "August", date: "2023-08-01", weight: 140 },
    { month: "September", date: "2023-09-01", weight: 140 },
    { month: "October", date: "2023-10-01", weight: 140 },
    { month: "November", date: "2023-11-01", weight: 140 },
    { month: "December", date: "2023-12-01", weight: 140 },
]

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

    const weightHistory = useSelector((state) => state.weight.weightHistory)

    // todays date
    const now = new Date()

    // Get April 1st of the *previous* year if current month is Jan–Mar
    const startYear = now.getMonth() < 3 ? now.getFullYear() - 1 : now.getFullYear()
    const startDate = new Date(startYear, 3, 1) // April 1st
    const endDate = new Date(startYear + 1, 2, 31) // March 31st next year

    const filteredData = weightHistory.filter((entry) => {
    const entryDate = new Date(entry.date)
    return entryDate >= startDate && entryDate <= endDate
    })
    
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
      <div className="rounded-md border bg-background p-2 text-sm shadow-sm text-left">
        <div className="font-medium text-muted-foreground">Date: {data.date}</div>
        <div className="font-medium text-muted-foreground">Weight: {data.weight} kg</div>
      </div>
    )
  }}
/>
    <ChartLegend content={<ChartLegendContent />} />
        {/* <Bar dataKey="date" fill={chartConfig.date.color} radius={4} /> */}
        <Bar dataKey="weight" fill={chartConfig.weight.color} radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
export default WeightChart

