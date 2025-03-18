import React from 'react';
import { useSelector } from 'react-redux';
import { selectTDEE } from '@/reducers/profileSlice';

const KcalStatus = () => {
  const tdee = useSelector(selectTDEE);
  const meals = useSelector((state) => state.meals.mealLogs || []);

  const todaysDate = new Date().toISOString().split('T')[0];

  console.log("TDEE from Redux:", tdee);
  console.log("Meal Logs from Redux:", meals);

  // Filter meals for today
  const todaysMeals = meals.filter((meal) => meal.date === todaysDate);
  console.log("Today's Meals:", todaysMeals);

  // Calculate total consumed calories for today
  const consumedCalories = todaysMeals.reduce((total, meal) => {
    console.log(`Meal: ${meal.name}, Calories: ${meal.energy}`);
    console.log("total:", total)
    return Number(total) + Number((meal.energy || 0));
  }, 0);

  console.log("Total Consumed Calories Today:", consumedCalories);

  const remainingKcal = tdee - consumedCalories; // Calculate remaining kcal

  return (
    <section className='card flex items-center'>
      <p className='font-bold text-primary text-2xl'>{Math.round(remainingKcal)}</p>
      <p>kcal kvar idag</p>
    </section>
  );
};

export default KcalStatus;
