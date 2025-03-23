import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.js';
import { Meal } from '../../types/meal.js';

const KcalStatus = () => {
  const tdee = useSelector<RootState, number | null>((state) => state.profile.tdee);
  
  const meals = useSelector<RootState, Meal[] | undefined>((state) => state.meals.mealLogs);
  
  const todaysDate = new Date().toISOString().split('T')[0];

  console.log("TDEE from Redux:", tdee);
  console.log("Meal Logs from Redux:", meals);

  const todaysMeals = meals?.filter((meal) => meal.date === todaysDate) ?? [];
  console.log("Today's Meals:", todaysMeals);

  const consumedCalories = todaysMeals.reduce((total, meal) => {
    console.log(`Meal: ${meal.title}, Calories: ${meal.energy ?? 0}`);
    return total + (meal.energy ?? 0);
  }, 0);

  console.log("Total Consumed Calories Today:", consumedCalories);

  // Remaining kcal, doesn't go below zero
  const remainingKcal = Math.max((tdee ?? 0) - consumedCalories, 0);

  return (
    <section className='card flex flex-col items-center p-4'>
      <p className='font-bold text-primary text-3xl'>{Math.round(remainingKcal)}</p>
      <p className='text-lg'>kcal kvar idag</p>
    </section>
  );
};

export default KcalStatus;

