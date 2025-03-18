import React, { useState } from 'react';
import { Button } from './ui/button';

const MealListItem = ({ meal, onEdit = () => {}, editButton = null }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (event) => {
    event.preventDefault(); // Prevent native <details> behavior
    setShowDetails(!showDetails);
  };

  return (
    <details 
      className="bg-white shadow-md rounded p-4 border-1 border-accent/30"
      open={showDetails} // React controls the open state
    >
      <summary 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleDetails}
      >
        <div>
          <h3 className="text-xl font-bold text-accent text-left p-2">{meal.title}</h3>
          <p className="text-gray-600 p-2">Energi: <span className="text-primary font-bold">{meal.energy}</span> kcal</p>
        </div>
        {/* ✅ Arrow starts down and rotates up */}
        <span className="inline-block transition-transform duration-200" style={{ transform: `rotate(${showDetails ? 180 : 0}deg)` }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      {showDetails && (
        <div className="flex flex-col items-start text-left">
          <p className="bg-secondary w-full p-2">Datum: <span className="text-accent font-light">{meal.date}</span></p>
          <p className="text-gray-600 p-2">Protein: <span className="text-primary font-bold">{meal.protein}</span> g</p>
          <p className="bg-secondary w-full p-2">Kolhydrat: <span className="text-primary font-bold">{meal.carbohydrate}</span> g</p>
          <p className="text-gray-600 p-2">Fett: <span className="text-primary font-bold">{meal.fat}</span> g</p>
          <p className="bg-secondary w-full p-2">Kategori: <span className="text-accent text-light">{meal.category}</span></p>
        </div>
      )}
      {editButton && (
        <Button onClick={(e) => { e.stopPropagation(); onEdit(meal); }}>
          Edit
        </Button>
      )}
    </details>
  );
};

export default MealListItem;
