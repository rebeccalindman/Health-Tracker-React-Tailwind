import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addWeight } from '../reducers/profileSlice'
import { Button } from './ui/button'

const AddWeight = ({onSubmit}) => {

  const [newWeight, setNewWeight] = useState(''); 
  const dispatch = useDispatch();

  const handleAddWeight = () => {

    if (newWeight) {
      const today = new Date(); // Hämta dagens datum
      const formattedDate = today.toISOString().split('T')[0]; // Formatera datumet till 'YYYY-MM-DD'

      dispatch(addWeight({
        weight: parseFloat(newWeight),
        date: formattedDate, // Lägg till datumet i vikten
      }));
      setNewWeight('');
      onSubmit(); // Notify parent (Dashboard) to switch back to CurrentWeight
    }
  };

  return (
    <div className="max-w-sm bg-white rounded-lg shadow-md p-6 fixed-width">
    <h3 className="text-xl font-bold text-green-600 mb-4">Registrera din nya vikt</h3>
    <label htmlFor="new-weight" className="sr-only">
      Ny vikt (kg)
    </label>
    <input
      type="number"
      id="new-weight"
      value={newWeight}
      onChange={(e) => setNewWeight(e.target.value)}
      placeholder="Ny vikt (kg)"
      className="block w-full border rounded p-2 mb-4"
    />
    <Button onClick={handleAddWeight} className="w-full">Registrera vikt</Button>
    <Button 
      variant="secondary"
      onClick={onSubmit} 
      className="w-full mt-2"
    >
      Avbryt
    </Button>
    </div>
  )
}

export default AddWeight