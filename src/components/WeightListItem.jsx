import React, { useState } from 'react'
import {Button, buttonVariants} from './ui/button'
import { Edit, Delete, X, Save } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWeight, editWeight, displayWeight } from '../reducers/profileSlice';

function WeightListItem({weightData}) {
  const dispatch = useDispatch();
  const { weight } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(weightData.weight);
  const [newDate, setNewDate] = useState(weightData.date);

  const handleRemove = () => {
    dispatch(removeWeight({id: weightData.id}))
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(editWeight({id: weightData.id, weight: newWeight, date: newDate}))
    setIsEditing(false);
  };

  return (
    <>
      <div className='border-b-1 p-2 flex gap-6 items-center justify-center'>
        <p className='text-sm text-gray-500'>{weightData.date}</p>
        <p className='text-lg font-bold flex items-center text-blue-800 w-full'>
          {weightData.weight}
          <span className='text-sm font-normal ml-1 text-black'>kg</span>
        </p>
        <Button size={"default"} variant={"default"} aria-label="Edit" onClick={handleEdit}>
          <Edit /> Ändra
        </Button>
        <Button size={"default"} variant={"destructive"} aria-label ="Remove" onClick={handleRemove}> 
          <Delete/> Ta bort
        </Button>
      </div>
      {isEditing &&
        <form className='border-b-1 p-2 flex gap-6 items-center justify-center'>
        <label htmlFor="weight" className="label-custom">
            Vikt (kg):
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={newWeight}
            onChange={(e) => setNewWeight(parseFloat(e.target.value))}
            required
            className={`block w-fit border rounded p-2`}
          />
          <label htmlFor="date" className="label-custom">
            Datum:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
            className={`block w-fit border rounded p-2`}
          />
          <Button size={"default"} variant={"default"} aria-label="Edit" onClick={handleSave}>
            <Save/>Spara
          </Button>
          <Button size={"default"} variant={"secondary"} aria-label ="Remove" onClick={handleCancel}> 
            <X/>Avbryt
          </Button>
        </form>
      }
    </>
  )
}
export default WeightListItem

