import { useState } from "react";
import { Button } from "../ui/button";
import { Meal } from "../../types/meal";
import { Edit, Trash, ChevronDown } from "lucide-react";

interface MealListItemProps {
  meal: Meal;
  onEdit?: (meal: Meal) => void;
  onDelete?: (mealId: string) => void;
}

const MealListItem = ({ meal, onEdit, onDelete }: MealListItemProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (e: React.MouseEvent<HTMLMapElement>) => {
    e.preventDefault();
    setShowDetails((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete?.(meal.id);
  };

  const renderDetail = (label: string, value: string | number, isHighlighted = false) => (
    <p className={`${isHighlighted ? "bg-secondary p-2 rounded" : "p-2"}`}>
      {label}: <span className={`font-bold text-primary ${isHighlighted ? "text-accent" : ""}`}>{value}</span>
    </p>
  );

  return (
    <details className="relative bg-white p-4 border-b-1 border-secondary" open={showDetails}>
      <summary
        onClick={toggleDetails}
        className="cursor-pointer flex flex-col gap-2 relative"
      >
        <div className="w-full">
          <h3 className="text-xl font-bold text-accent">{meal.title}</h3>
          {renderDetail("Energy", `${meal.energy} kcal`)}
        </div>

        <ChevronDown
          className={`absolute top-2 right-2 h-5 w-5 transform transition-transform duration-200 ${showDetails ? "rotate-180" : ""}`}
        />
      </summary>

      <div>
        {renderDetail("Date", meal.date, true)}
        {renderDetail("Protein", `${meal.protein} g`)}
        {renderDetail("Carbs", `${meal.carbohydrate} g`, true)}
        {renderDetail("Fat", `${meal.fat} g`)}
        {renderDetail("Category", meal.category, true)}
      </div>

      <div className="flex gap-4 mt-4 justify-center">
        {onEdit && (
          <Button size="sm" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { e.stopPropagation(); onEdit(meal); }}>
            <Edit className="h-4 w-4" /> Edit
          </Button>
        )}
        {onDelete && (
          <Button size="sm" variant="destructive" onClick={handleDelete}>
            <Trash className="h-4 w-4" /> Delete
          </Button>
        )}
      </div>
    </details>
  );
};

export default MealListItem;

