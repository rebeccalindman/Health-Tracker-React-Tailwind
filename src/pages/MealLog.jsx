import React, { useState } from 'react';
import MealList from '../components/MealList';
import { useSelector, useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../reducers/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from '@/components/ui/button';

const MealLog = () => {

  const dispatch = useDispatch();
  const mealLogs = useSelector((state) => state.meals?.mealLogs ?? []);

  const [meal, setMeal] = useState({
    title: '',
    energy: '',
    date: '',
    protein: '',
    carbohydrate: '',
    fat: '',
    category: ''
  });

  const [editingMeal, setEditingMeal] = useState(null);
  const [error, setError] = useState('');
  // const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({
      ...meal,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meal.title || !meal.energy || !meal.date || !meal.protein || !meal.carbohydrate || !meal.fat || !meal.category) {
      setError('Alla fält måste fyllas i.');
      return;
    }
    setError('');
    if (editingMeal) {
      dispatch(updateMeal(meal));
      setEditingMeal(null);
    } else {
      dispatch(addMeal({ ...meal, id: uuidv4() }));
    }
    setMeal({
      title: '',
      energy: '',
      date: '',
      protein: '',
      carbohydrate: '',
      fat: '',
      category: ''
    });
    // setShowForm(false);
  };

  const handleEdit = (meal) => {
    setMeal(meal);
    setEditingMeal(meal);
    // setShowForm(true);
  };

  return (
    <main className="container mx-auto p-4 flex justify-center flex-row gap-4 items-start flex-wrap max-w-[1000px]">
      <form onSubmit={handleSubmit} className="bg-white shadow-md card px-8 pt-6 max-w-[500px]">
        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="mb-4">
          <label htmlFor="title" className="block text-accent text-sm font-bold mb-2 text-left">Måltid:</label>
          <input type="text" id="title" name="title" value={meal.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="energy" className="block text-accent text-sm font-bold mb-2 text-left">Energi:</label>
          <input type="text" id="energy" name="energy" value={Number(meal.energy)} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-accent text-sm font-bold mb-2 text-left">Datum:</label>
          <input type="text" id="date" name="date" value={meal.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="protein" className="block text-accent text-sm font-bold mb-2 text-left">Protein:</label>
          <input type="text" id="protein" name="protein" value={meal.protein} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="carbohydrate" className="block text-accent text-sm font-bold mb-2 text-left">Kolhydrat:</label>
          <input type="text" id="carbohydrate" name="carbohydrate" value={meal.carbohydrate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4">
          <label htmlFor="fat" className="block text-accent text-sm font-bold mb-2 text-left">Fett:</label>
          <input type="text" id="fat" name="fat" value={meal.fat} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="w-full">
          <label htmlFor="category" className="block text-accent text-sm font-bold mb-2 text-left">Kategori:</label>
          <div className="relative w-full">
            <select
              id="category"
              name="category"
              value={meal.category}
              onChange={handleChange}
              className="block w-full px-4 py-2 pr-10 text-accent bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none"
            >
              <option value="">Välj kategori</option>
              <option value="Frukost">Frukost</option>
              <option value="Lunch">Lunch</option>
              <option value="Middag">Middag</option>
              <option value="Mellanmål">Mellanmål</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            </div>
          </div>
        </div>

        <Button type="submit" className="">
          {editingMeal ? 'Uppdatera måltid' : 'Logga måltid'}
        </Button>
      </form>
      <MealList meals={mealLogs} onEdit={handleEdit} />
    </main>
  );
};

export default MealLog;

