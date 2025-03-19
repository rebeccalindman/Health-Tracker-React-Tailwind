import MealListItem from './MealListItem';
import { Meal } from '../../types/meal';
interface MealListProps {
  meals?: Array<{ id: string; title: string; energy: number; date: string; protein: number; carbohydrate: number; fat: number; category: string }>;
  onEdit?: (meal: Meal) => void;
}

const MealList = ({ meals = [], onEdit }: MealListProps) => {
  // Se till att meals är en array
  const sortedMeals = [...(meals || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="card w-full">
      <h2 className="text-2xl font-bold mb-4 text-center text-primary">Loggade måltider</h2>
      {sortedMeals.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center -mx-2 gap-2 w-fit">
          {sortedMeals.map((meal, index) => (
            <div key={index} className="w-full px-2 mb-4">
              <MealListItem meal={meal} editButton={1} onEdit={onEdit} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">Inga måltider registrerade.</p>
      )}
    </div>
  );
};

export default MealList;

