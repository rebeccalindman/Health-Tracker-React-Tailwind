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
    <>
      <MealForm initialData={editing} clearForm={() => setEditing(null)} />
      <MealList meals={mealLogs} onEdit={setEditing} />
    </>
  );
};

export default MealLog;
