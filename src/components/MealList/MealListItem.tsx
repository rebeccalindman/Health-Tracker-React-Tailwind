import { useState } from 'react';
import { Button } from '../ui/button';
import { Meal } from '../../types/meal';

// Define the props for MealListItem
interface MealListItemProps {
  meal: Meal,
  onEdit?: (meal: MealListItemProps['meal']) => void;
  onDelete?: (mealId: string) => void;
  editButton?: React.ReactNode;
}

// MealListItem component
const MealListItem = ({ meal, onEdit = () => {}, onDelete = () => {}, editButton = null }: MealListItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  // Toggle details visibility
  const toggleDetails = (event: React.MouseEvent<HTMLDetailsElement>) => {
    event.preventDefault();
    setShowDetails(!showDetails);
  };

  return (
    <details 
      className="bg-white shadow-md rounded p-4 border-1 border-accent/30 gap-4" // Container styles
      open={showDetails}
    >
      <summary 
        className="flex justify-between items-center cursor-pointer gap-2" // Summary styles with gap for spacing
        onClick={toggleDetails}
      >
        <div>
          <h3 className="text-xl font-bold text-accent text-left p-2">{meal.title}</h3> {/* Meal title */}
          <p className="text-gray-600 p-2">Energi: <span className="text-primary font-bold">{meal.energy}</span> kcal</p> {/* Meal energy */}
        </div>
        <span className="inline-block transition-transform duration-200" style={{ transform: `rotate(${showDetails ? 180 : 0}deg)` }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /> {/* Arrow icon */}
          </svg>
        </span>
      </summary>
      {showDetails && (
        <div className="flex flex-col items-start text-left gap-2"> {/* Details section with gap */}
          <p className="bg-secondary w-full p-2">Datum: <span className="text-accent font-light">{meal.date}</span></p> {/* Meal date */}
          <p className="text-gray-600 p-2">Protein: <span className="text-primary font-bold">{meal.protein}</span> g</p> {/* Meal protein */}
          <p className="bg-secondary w-full p-2">Kolhydrat: <span className="text-primary font-bold">{meal.carbohydrate}</span> g</p> {/* Meal carbohydrate */}
          <p className="text-gray-600 p-2">Fett: <span className="text-primary font-bold">{meal.fat}</span> g</p> {/* Meal fat */}
          <p className="bg-secondary w-full p-2">Kategori: <span className="text-accent text-light">{meal.category}</span></p> {/* Meal category */}
        </div>
      )}
      <div className="flex gap-2 p-4 justify-center"> {/* Buttons container with gap */}
        {editButton && (
          <Button size="sm" variant="default" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onEdit?.(meal); }}>
            Edit
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={(e: React.MouseEvent) => { e.stopPropagation(); onDelete?.(meal.id); }}>
          Delete
        </Button>
      </div>
    </details>
  );
};

export default MealListItem;

