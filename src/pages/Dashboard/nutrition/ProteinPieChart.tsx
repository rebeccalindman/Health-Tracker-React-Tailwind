
import { PieChart, Pie, Cell } from "recharts"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useMemo } from "react"
import { isSameDay } from "date-fns"

const ProteinPieChart = () => {
  const mealLogs = useSelector((state: RootState) => state.meals.mealLogs)
  const proteinGoal = useSelector((state: RootState) => state.macros.protein) ?? 0

  const today = new Date()
  const proteinEaten = useMemo(() => {
    return mealLogs
      .filter((meal) => isSameDay(new Date(meal.date), today))
      .reduce((sum, meal) => sum + (meal.protein ?? 0), 0)
  }, [mealLogs])

  const proteinRemaining = Math.max(proteinGoal - proteinEaten, 0)
  const percentage = Math.min((proteinEaten / proteinGoal) * 100, 100)

  const chartData = [
    { name: "Eaten", value: proteinEaten },
    { name: "Remaining", value: proteinRemaining },
  ]

  const COLORS = ["#22c55e", "#e5e7eb"] // green, gray-light

  return (
    <>
    <h2>Daily protein progress</h2>
      <div className="relative flex flex-col items-center w-full max-w-xs mx-auto">
        {/* Central text overlay */}
        <div className="absolute inset-0 flex items-center justify-center flex-col z-10 pointer-events-none">
          <p className="text-3xl font-bold text-foreground">
            {Math.round(proteinEaten)}/{proteinGoal}g
          </p>
          <p className="text-sm text-muted-foreground">Protein</p>
        </div>

        {/* Donut chart */}
        <PieChart width={200} height={200}>
          <Pie
            data={chartData}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </>
  )
}

export default ProteinPieChart
