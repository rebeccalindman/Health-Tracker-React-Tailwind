import { useState } from 'react';
import MealList from '../components/MealList/MealList';
import { useSelector, useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../reducers/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from '../components/ui/button';
import { Meal } from '../types/meal';
import Form from '../components/Form/Form';
import InputField from '../components/Form/InputField';

const MealLog = () => {
  const dispatch = useDispatch();
  const mealLogs = useSelector((state) => state.meals.mealLogs ?? []);

  const [newMeal, setNewMeal] = useState<Meal>({
    id: '',
    title: '',
    energy: 0,
    date: '',
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    category: ''
  });

  const [editing, setEditing] = useState<Meal | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewMeal({
      ...newMeal,
      [name]: (name === 'energy' || name === 'protein' || name === 'carbohydrate' || name === 'fat') ? parseInt(value, 10) : value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newMeal.title || !newMeal.energy || !newMeal.date || !newMeal.protein || !newMeal.carbohydrate || !newMeal.fat || !newMeal.category) {
      setErrorMessage('Alla fält måste fyllas i.');
      return;
    }
    setErrorMessage('');
    if (editing) {
      dispatch(updateMeal(newMeal));
      setEditing(null);
    } else {
      dispatch(addMeal({ ...newMeal, id: uuidv4() }));
    }
    setNewMeal({
      id: '',
      title: '',
      energy: 0,
      date: '',
      protein: 0,
      carbohydrate: 0,
      fat: 0,
      category: ''
    });
  };

  const handleEdit = (meal: Meal) => {
    setNewMeal(meal);
    setEditing(meal);
  };

  return (
    <main className="container mx-auto p-4 flex justify-center flex-row gap-4 items-start flex-wrap max-w-[1000px]">

 {/*      <form onSubmit={handleSubmit} className="bg-white shadow-md card px-8 pt-6 max-w-[500px]">
        {errorMessage && <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>}
        <label htmlFor="title" className="block text-accent text-sm font-bold mb-2 text-left">Måltid:</label>
        <input type="text" id="title" name="title" value={newMeal.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="energy" className="block text-accent text-sm font-bold mb-2 text-left">Energi:</label>
        <input type="number" id="energy" name="energy" value={newMeal.energy} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="date" className="block text-accent text-sm font-bold mb-2 text-left">Datum:</label>
        <input type="text" id="date" name="date" value={newMeal.date} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="protein" className="block text-accent text-sm font-bold mb-2 text-left">Protein:</label>
        <input type="number" id="protein" name="protein" value={newMeal.protein} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="carbohydrate" className="block text-accent text-sm font-bold mb-2 text-left">Kolhydrat:</label>
        <input type="number" id="carbohydrate" name="carbohydrate" value={newMeal.carbohydrate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="fat" className="block text-accent text-sm font-bold mb-2 text-left">Fett:</label>
        <input type="number" id="fat" name="fat" value={newMeal.fat} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-accent leading-tight focus:outline-none focus:shadow-outline" />
        <label htmlFor="category" className="block text-accent text-sm font-bold mb-2 text-left">Kategori:</label>
        <div className="relative w-full">
          <select
            id="category"
            name="category"
            value={newMeal.category}
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
        <Button variant={"default"} size={"md"} type="submit" className="">
          {editing ? 'Uppdatera måltid' : 'Logga måltid'}
        </Button>
      </form> */}
      
      < Form/>
      <MealList meals={mealLogs} onEdit={handleEdit} />
    </main>
  );
};

export default MealLog;

