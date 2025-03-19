import { useState } from 'react';
import MealList from '../components/MealList/MealList';
import { useSelector, useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../reducers/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from '../components/ui/button';
import { Meal } from '../types/meal';
import Form from '../components/Form/Form';
import InputField from '../components/Form/InputField';

const MealLog = () => {
  const dispatch = useDispatch();
  const mealLogs = useSelector((state) => state.meals.mealLogs ?? []);

  const [newMeal, setNewMeal] = useState<Meal>({
    id: '',
    title: '',
    energy: 0,
    date: '',
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    category: ''
  });

  const [editing, setEditing] = useState<Meal | null>(null);
/*   const [errorMessage, setErrorMessage] = useState(''); */


  const handleEdit = (editMeal: Meal) => {
    setNewMeal(editMeal);
    setEditing(editMeal);
  };

  return (
    <main className="container mx-auto p-4 flex justify-center flex-row gap-4 items-start flex-wrap max-w-[1000px]">

      < Form />
      <MealList meals={mealLogs} onEdit={handleEdit} />
    </main>
  );
};

export default MealLog;

