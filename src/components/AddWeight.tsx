import { useState } from "react";
import { useDispatch } from "react-redux";
import { addWeight } from "../redux/slices/weightSlice"; // ✅ Import from weightSlice
import { Button } from "./ui/button";

/**
 * Component for adding a new weight entry.
 * Uses Redux to dispatch weight updates and allows parent components 
 * to handle UI state changes via `onSubmit`.
 */
const AddWeight = ({ onSubmit }: { onSubmit: () => void }) => {
  const dispatch = useDispatch();
  const [newWeight, setNewWeight] = useState<string>("");

  // ✅ Handle input changes efficiently
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(e.target.value);
  };

  // ✅ Handle adding weight with validation
  const handleAddWeight = () => {
    const parsedWeight = parseFloat(newWeight);
    if (!parsedWeight || parsedWeight <= 0) return; // Ensure valid weight input

    const today = new Date().toISOString().split("T")[0]; // Format date to 'YYYY-MM-DD'

    dispatch(
      addWeight({
        id: Date.now(), // Unique ID based on timestamp
        weight: parsedWeight,
        date: today,
      })
    );

    setNewWeight(""); // ✅ Clear input field
    onSubmit(); // ✅ Notify parent to update UI
  };

  return (
    <div className="card">
      <h2>Registrera din nya vikt</h2>

      {/* ✅ Weight Input */}
      <input
        type="number"
        value={newWeight}
        onChange={handleChange}
        placeholder="Ny vikt (kg)"
        className="block w-full border rounded p-2 my-4"
      />

      {/* ✅ Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button onClick={handleAddWeight} className="w-full">
          Registrera vikt
        </Button>
        <Button variant="secondary" onClick={onSubmit} className="w-full">
          Avbryt
        </Button>
      </div>
    </div>
  );
};

export default AddWeight;
