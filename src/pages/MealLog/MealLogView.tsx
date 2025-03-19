import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import MealList from "../../components/MealList/MealList";
import MealForm from "./MealForm";
import { Meal } from "../../types/meal";
import { useState } from "react";

const MealLog = () => {
  const mealLogs = useSelector((state: RootState) => state.meals.mealLogs ?? []);
  const [editing, setEditing] = useState<Meal | null>(null);

  return (
    <main className="container mx-auto p-4 flex flex-col items-center gap-4 max-w-[500px]">
      <MealForm initialData={editing} clearForm={() => setEditing(null)} />
      <MealList meals={mealLogs} onEdit={setEditing} />
    </main>
  );
};

export default MealLog;
