import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import { Edit, Delete, X, Save } from "lucide-react";
import { editWeight, removeWeight } from "../redux/slices/weightSlice";
import { Weight } from "../types/weight";

type WeightListItemProps = {
  weightData: Weight;
};

const WeightListItem: React.FC<WeightListItemProps> = ({ weightData }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newWeight, setNewWeight] = useState(weightData.weight);
  const [newDate, setNewDate] = useState(weightData.date);

  const handleRemove = () => {
    dispatch(removeWeight({ id: weightData.id }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(editWeight({ id: weightData.id, weight: newWeight, date: newDate }));
    setIsEditing(false);
  };

  return (
    <>
      <div className="border-b-1 p-2 flex gap-6 items-center justify-center">
        <p className="text-md text-gray-500 w-fit text-nowrap">{weightData.date}</p>
        <p className="text-lg font-bold flex items-center text-blue-800 w-full">
          {weightData.weight}
          <span className="text-md font-normal ml-1 text-black">kg</span>
        </p>
        <Button size="default" variant="default" onClick={handleEdit}>
          <Edit /> Edit
        </Button>
        <Button size="default" variant="destructive" onClick={handleRemove}>
          <Delete /> Delete
        </Button>
      </div>
      {isEditing && (
        <form className="border-b-1 p-2 flex flex-col gap-6 items-center justify-center">
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              value={newWeight}
              onChange={(e) => setNewWeight(parseFloat(e.target.value))}
              className="block w-fit max-w-16 border rounded p-2"
            />
          </div>
          <div className="flex flex-row gap-2 items-center">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="block w-fit border rounded p-2"
            />
          </div>
          <div className="flex flex-row gap-2">
            <Button size="default" variant="default" onClick={handleSave}>
              <Save /> Save
            </Button>
            <Button size="default" variant="secondary" onClick={handleCancel}>
              <X /> Cancel
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default WeightListItem;
