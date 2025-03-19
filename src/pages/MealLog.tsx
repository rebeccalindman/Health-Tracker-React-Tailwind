import { useState } from 'react';
import { RootState } from "../redux/store"; // ✅ Import RootState
import MealList from '../components/MealList/MealList';
import { useSelector } from "react-redux";
import { Meal } from '../types/meal';
import Form from '../components/Form/Form';
import { InputFieldProps } from '../components/Form/InputField';

const MealLog = () => {
/*   const dispatch = useDispatch(); */
  const mealLogs = useSelector((state: RootState) => state.meals.mealLogs ?? []);

  const [newMeal, setNewMeal] = useState<Meal>({
    id: '',
    title: '',
    energy: 0,
    date: new Date().toISOString().split('T')[0], //default to today's date
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    category: ''
  });

  const mealFields: InputFieldProps[] = [
    { label: "Meal", name: "title", type: "text", required: true },
    { label: "Category", name: "category", type: "select", required: true, options: [
        { value: "Breakfast", label: "Breakfast" },
        { value: "Lunch", label: "Lunch" },
        { value: "Dinner", label: "Dinner" },
        { value: "Snack", label: "Snack" },
    ]},
    { label: "Energy", name: "energy", type: "number", required: true },
    { label: "Date", name: "date", type: "date", required: true },
    { label: "Protein", name: "protein", type: "number", unit: "g", required: false },
    { label: "Carbs", name: "carbohydrate", type: "number", unit: "g", required: false },
    { label: "Fat", name: "fat", type: "number", unit: "g", required: false },
];

const mealFieldGroups = [
  {label: "", fieldNames: ["category", "date"]},
  { label: "Macronutrients", fieldNames: ["energy", "protein", "carbohydrate", "fat"] },
];


  const [editing, setEditing] = useState<Meal | null>(null);
/*   const [errorMessage, setErrorMessage] = useState(''); */


  const handleEdit = (editMeal: Meal) => {
    setNewMeal(editMeal);
    setEditing(editMeal);
  };

  return (
    <main className="container mx-auto p-4 flex justify-center flex-row gap-4 items-start flex-wrap max-w-[1000px]">

  <Form 
  fields={mealFields} 
  fieldGroups={mealFieldGroups}
  initialData={editing}
  clearForm={() => setEditing(null)} />
      <MealList meals={mealLogs} onEdit={handleEdit} />
    </main>
  );
};

export default MealLog;

