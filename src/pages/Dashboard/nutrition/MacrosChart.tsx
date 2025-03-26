import {
    ChartContainer,
    type ChartConfig,
    ChartTooltip,
    ChartLegend,
  } from "@/components/ui/chart"
  import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
  import { useSelector } from "react-redux"
  import { RootState } from "../../../redux/store" // Adjust this path as needed
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

  const MacrosChart = () => {
    const { protein, carbohydrate, fat } = useSelector((state: RootState) => state.macros);

    const mealLogs = useSelector((state: RootState) => state.meals.mealLogs);


    const chartData = useMemo(() => {
      const groupedByDate = mealLogs.reduce((acc, meal) => {
        const date = meal.date; // format: "YYYY-MM-DD"
        if (!acc[date]) {
          acc[date] = { date, protein: 0, carbohydrate: 0, fat: 0 };
        }
    
        acc[date].protein += meal.protein || 0;
        acc[date].carbohydrate += meal.carbohydrate || 0;
        acc[date].fat += meal.fat || 0;
    
        return acc;
      }, {} as Record<string, { date: string; protein: number; carbohydrate: number; fat: number }>);
    
      return Object.values(groupedByDate).map((entry) => ({
        ...entry,
        remainingProtein: Math.max((protein ?? 0) - entry.protein, 0),
        remainingCarbs: Math.max((carbohydrate ?? 0) - entry.carbohydrate, 0),
        remainingFat: Math.max((fat ?? 0) - entry.fat, 0),
      }));
    }, [mealLogs, protein, carbohydrate, fat]);

    

    return (
        <>
            <p>Monthly average weight.</p>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData}>
            <XAxis dataKey="date" />
            <CartesianGrid />

            <ChartTooltip /* actual vs remaining */
              content={({ payload }) => {
                if (!payload?.length) return null;
                const data = payload[0].payload;

                return (
                  <div className="p-2 text-sm rounded border bg-background shadow-sm">
                    <p className="font-semibold mb-1">Date: {data.date}</p>
                    <p>Protein: {data.protein}g / {protein}g</p>
                    <p>Carbs: {data.carbohydrate}g / {carbohydrate}g</p>
                    <p>Fat: {data.fat}g / {fat}g</p>
                  </div>
                );
              }}
            />

            <ChartLegend />
            
            <Bar dataKey="protein" stackId="a" fill="#4ade80" />           {/* eaten */}
            <Bar dataKey="remainingProtein" stackId="a" fill="#facc15" />  {/* left */}

            <Bar dataKey="carbohydrate" stackId="b" fill="#60a5fa" />
            <Bar dataKey="remainingCarbs" stackId="b" fill="#fde68a" />

            <Bar dataKey="fat" stackId="c" fill="#f87171" />
            <Bar dataKey="remainingFat" stackId="c" fill="#fcd34d" />
          </BarChart>

        </ChartContainer>
      </>
    )
  }

  export default MacrosChart;
