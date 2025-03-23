import { useSelector } from 'react-redux';
import MealListItem from '../../components/MealList/MealListItem.js';
import { Button } from '../../components/ui/button';
import { PlusCircle } from 'lucide-react';
import { RootState } from '../../redux/store.js';
import { Meal } from '../../types/meal.js'; // ✅ Import the correct type

const TodaysMeals = () => {
  const meals = useSelector((state: RootState) => state.meals.mealLogs ?? []) as Meal[]; // ✅ Explicit type

  const todaysDate = new Date().toISOString().split('T')[0];

  // ✅ Ensure todaysMeals is correctly typed
  const todaysMeals: Meal[] = meals.filter((meal) => meal.date === todaysDate);

  return (
    <section className='card'>
      <h2 className='text-center'>Today's Meals</h2>
      <p className='text-sm text-gray-500'>{todaysDate}</p>
      {todaysMeals.length === 0 && <p className='text-sm text-gray-500 card'>Inga måltider registrerade idag.</p>}

      <Button onClick={() => { window.location.href = '/mealLog' }}>
        <PlusCircle className="inline-block" />
        Add a meal
      </Button>

      {/* ✅ Corrected: Map over meals and render MealListItem for each */}
      {todaysMeals.length > 0 && (
        <div className='flex flex-col-reverse gap-2 text-left'>
          {todaysMeals.map((meal) => (
            <MealListItem key={meal.id} meal={meal} /> // ✅ Now TypeScript knows meal has an `id`
          ))}
        </div>
      )}
    </section>
  );
};

export default TodaysMeals;
