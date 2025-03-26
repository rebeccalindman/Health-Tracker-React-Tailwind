import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  type ChartConfig,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useMemo, useState } from "react"
import { addDays, format, isSameDay, subDays } from "date-fns"
import { ChevronLeft, ChevronRight } from "lucide-react"

const chartConfig = {
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-1))",
  },
  remainingProtein: {
    label: "Protein left",
    color: "hsl(var(--chart-2))",
  },
  carbohydrate: {
    label: "Carbs",
    color: "hsl(var(--chart-3))",
  },
  remainingCarbs: {
    label: "Carbs left",
    color: "hsl(var(--chart-4))",
  },
  fat: {
    label: "Fat",
    color: "hsl(var(--chart-5))",
  },
  remainingFat: {
    label: "Fat left",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

const MacrosChart = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const formattedDate = format(selectedDate, "yyyy-MM-dd")

  const mealLogs = useSelector((state: RootState) => state.meals.mealLogs)
  const { protein, carbohydrate, fat } = useSelector((state: RootState) => state.macros)

  const chartData = useMemo(() => {
    const mealsForDate = mealLogs.filter((meal) =>
      isSameDay(new Date(meal.date), selectedDate)
    )

    const totalProtein = mealsForDate.reduce((sum, m) => sum + (m.protein ?? 0), 0)
    const totalCarbs = mealsForDate.reduce((sum, m) => sum + (m.carbohydrate ?? 0), 0)
    const totalFat = mealsForDate.reduce((sum, m) => sum + (m.fat ?? 0), 0)

    return mealsForDate.length > 0
      ? [
          {
            date: formattedDate,
            protein: totalProtein,
            remainingProtein: Math.max((protein ?? 0) - totalProtein, 0),
            carbohydrate: totalCarbs,
            remainingCarbs: Math.max((carbohydrate ?? 0) - totalCarbs, 0),
            fat: totalFat,
            remainingFat: Math.max((fat ?? 0) - totalFat, 0),
          },
        ]
      : []
  }, [mealLogs, selectedDate, protein, carbohydrate, fat])

  const legendLabels: Record<string, string> = {
    protein: "Protein",
    remainingProtein: "Remaining Protein",
    carbohydrate: "Carbs",
    remainingCarbs: "Remaining Carbs",
    fat: "Fat",
    remainingFat: "Remaining Fat",
  }

  return (
    <div className="w-full">
      {/* Navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setSelectedDate((prev) => subDays(prev, 1))}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <p className="text-sm font-semibold">{formattedDate}</p>
        <button
          onClick={() => setSelectedDate((prev) => addDays(prev, 1))}
          disabled={isSameDay(selectedDate, new Date())}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 disabled:opacity-40"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Chart or Fallback */}
      {chartData.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No meals logged for {formattedDate}.
        </p>
      ) : (
        <ChartContainer config={chartConfig} className="min-h-[240px] w-full">
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={false} />
            <ChartTooltip
              content={({ payload }) => {
                if (!payload?.length) return null
                const data = payload[0].payload
                return (
                  <div className="rounded-md border bg-background p-2 text-sm text-left shadow-sm">
                    <p className="font-semibold mb-1">Date: {data.date}</p>
                    <p>Protein: {data.protein}g / {protein}g</p>
                    <p>Carbs: {data.carbohydrate}g / {carbohydrate}g</p>
                    <p>Fat: {data.fat}g / {fat}g</p>
                  </div>
                )
              }}
            />
            <ChartLegend
              content={({ payload }) => {
                return (
                  <div className="flex flex-wrap gap-4 px-2 pt-2">
                    {payload?.map((entry: any) => (
                      <div key={entry.dataKey} className="flex items-center gap-2 text-sm">
                        <div
                          className="h-3 w-3 rounded-sm"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span>{legendLabels[entry.dataKey] || entry.dataKey}</span>
                      </div>
                    ))}
                  </div>
                )
              }}
            />
            <Bar dataKey="protein" stackId="a" fill={chartConfig.protein.color} />
            <Bar dataKey="remainingProtein" stackId="a" fill={chartConfig.remainingProtein.color} />

            <Bar dataKey="carbohydrate" stackId="b" fill={chartConfig.carbohydrate.color} />
            <Bar dataKey="remainingCarbs" stackId="b" fill={chartConfig.remainingCarbs.color} />

            <Bar dataKey="fat" stackId="c" fill={chartConfig.fat.color} />
            <Bar dataKey="remainingFat" stackId="c" fill={chartConfig.remainingFat.color} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}

export default MacrosChart
