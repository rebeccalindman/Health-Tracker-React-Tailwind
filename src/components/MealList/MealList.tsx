import MealListItem from './MealListItem';
import { useDispatch } from 'react-redux';
import { removeMeal } from '../../redux/slices/mealSlice';
import { Meal } from "../../types/meal";

interface MealListProps {
  meals?: Meal[];
  onEdit?: (meal: Meal) => void;
}

const MealList = ({ meals = [], onEdit }: MealListProps) => {
  // Se till att meals är en array
  const sortedMeals = [...(meals || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const dispatch = useDispatch();

  const handleDelete = (mealId: string) => {
    dispatch(removeMeal({ id: mealId }));
};

  return (
    <div className="card w-full text-center md:text-right">
      <h2 className="text-2xl font-bold text-center md:text-left text-primary">Logged Meals</h2>
      {sortedMeals.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center gap-2 w-full text-center md:text-left">
          {sortedMeals.map((meal, index) => (
            <div key={index} className="w-full">
              <MealListItem
                meal={meal}
                /* editButton={1} */
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">No meals registered</p>
      )}
    </div>
  );
};

export default MealList;

