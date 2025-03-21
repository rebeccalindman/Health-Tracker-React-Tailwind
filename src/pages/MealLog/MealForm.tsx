import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../../redux/slices/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "../../types/meal";
import Form from "../../components/Form/Form"; // ✅ Use the generic Form component
import { InputFieldProps } from "../../components/Form/InputField";

type MealFormProps = {
  initialData?: Meal | null;
  clearForm?: () => void;
};

const mealFields: InputFieldProps[] = [
  { label: "Meal", name: "title", type: "text", required: true, className: "col-span-4 w-full" }, // ✅ Full width
  { label: "Category", name: "category", type: "select", required: true, className: "col-span-4 md:col-span-2", options: [
      { value: "Breakfast", label: "Breakfast" },
      { value: "Lunch", label: "Lunch" },
      { value: "Dinner", label: "Dinner" },
      { value: "Snack", label: "Snack" },
  ]},
  { label: "Date", name: "date", type: "date", required: true, className: "col-span-4 md:col-span-2" },
  { label: "Energy", name: "energy", type: "number", required: true, className: "col-span-1", unit: "kcal" },
  { label: "Protein", name: "protein", type: "number", unit: "g", required: false, className: "col-span-1" },
  { label: "Carbs", name: "carbohydrate", type: "number", unit: "g", required: false, className: "col-span-1" },
  { label: "Fat", name: "fat", type: "number", unit: "g", required: false, className: "col-span-1" },
];

const mealFieldGroups = [
  /* { 
    label: "Meal Info", 
    fields: mealFields.filter((field) => ["category", "date"].includes(field.name)),
    className: "col-span-4" // ✅ Half-width
  }, */
  { 
    label: "Macronutrients", 
    fields: mealFields.filter((field) => ["energy", "protein", "carbohydrate", "fat"].includes(field.name)),
    className: "col-span-4" // ✅ Full-width to fit 4 inputs in 1 row
  },
];

const MealForm: React.FC<MealFormProps> = ({ initialData, clearForm }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<Meal>({
    id: "",
    title: "",
    energy: 0,
    date: new Date().toISOString().split("T")[0], // ✅ Default to today's date
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    category: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["energy", "protein", "carbohydrate", "fat"].includes(name) ? parseFloat(value) || 0 : value || "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.title && formData.energy && formData.date && formData.category) {
      if (initialData) {
        dispatch(updateMeal(formData));
      } else {
        dispatch(addMeal({ ...formData, id: uuidv4() }));
      }
      if (clearForm) clearForm();
    }
  };

  return (
    <div className="card">
      <Form
        fields={mealFields}
        fieldGroups={mealFieldGroups}
        initialData={formData}
        onChange={handleChange} // ✅ MealForm handles state updates
        onSubmit={handleSubmit} // ✅ MealForm handles submission
      />
    </div>
  );
};

export default MealForm;

