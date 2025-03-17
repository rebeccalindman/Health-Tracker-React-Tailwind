import React from 'react';
import { useSelector } from 'react-redux';
import MealListItem from '../MealListItem';
import { Button } from '../ui/button';
import { PlusCircle } from 'lucide-react';

const TodaysMeals = ( ) => {
  const meals = useSelector((state) => state.meals.mealLogs || []); // Ensure meals is always an array

  const todaysDate = new Date();
  const formattedDate = todaysDate.toISOString().split('T')[0];

  const todaysMeals = meals.filter((meal) => meal.date === formattedDate);

  return (
    <section className='card'>
      <h3 className='text-lg font-bold'>Dagens måltider </h3>
      <p className='text-sm text-gray-500'>{formattedDate}</p>
      {todaysMeals.length === 0 && <p className='text-sm text-gray-500 card'>Inga måltider registrerade idag.</p>}

      <Button onClick={() => { window.location.href = '/mealLog' }}>
        <PlusCircle className="inline-block" />
        Lägg till måltid
      </Button>
      
      {/* ✅ Corrected: Map over meals and render MealListItem for each */}
      {todaysMeals.length !== 0 && (
        <div className='flex flex-col-reverse gap-2'>
          {todaysMeals.map((meal) => (
            <MealListItem key={meal.id} meal={meal} />
          ))}
        </div>
      )}

    </section>
  );
};

export default TodaysMeals;

