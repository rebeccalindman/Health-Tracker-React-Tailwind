import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../../redux/slices/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Meal } from "../../types/meal";
import Form from "../../components/Form/Form";
import { InputFieldProps } from "../../components/Form/InputField";

type MealFormProps = {
  initialData?: Meal | null;
  isEditing?: boolean;
};

const mealFields: InputFieldProps[] = [
  { label: "Meal", name: "title", type: "text", required: true, className: "col-span-4 w-full" },
  {
    label: "Category", name: "category", type: "select", required: true, className: "col-span-4 md:col-span-2", options: [
      { value: "Breakfast", label: "Breakfast" },
      { value: "Lunch", label: "Lunch" },
      { value: "Dinner", label: "Dinner" },
      { value: "Snack", label: "Snack" },
    ]
  },
  { label: "Date", name: "date", type: "date", required: true, className: "col-span-4 md:col-span-2" },
  { label: "Energy", name: "energy", type: "number", required: true, className: "col-span-1", unit: "kcal" },
  { label: "Protein", name: "protein", type: "number", unit: "g", required: false, className: "col-span-1" },
  { label: "Carbs", name: "carbohydrate", type: "number", unit: "g", required: false, className: "col-span-1" },
  { label: "Fat", name: "fat", type: "number", unit: "g", required: false, className: "col-span-1" },
];

const mealFieldGroups = [
  {
    label: "Macronutrients",
    fields: mealFields.filter((field) =>
      ["energy", "protein", "carbohydrate", "fat"].includes(field.name)
    ),
    className: "col-span-4"
  },
];

// ✅ Field-level validation rules
const validationRules = {
  energy: (value: number) =>
    value <= 0 ? "Energy must be greater than 0" : null,
  title: (value: string) =>
    value.trim().length < 2 ? "Meal name is too short" : null,
  category: (value: string) =>
    !value ? "Category is required" : null,
  date: (value: string) =>
    !value ? "Date is required" : null,
};

const MealForm: React.FC<MealFormProps> = ({ initialData, isEditing }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<Meal>({
    id: uuidv4(),
    title: "",
    energy: 0,
    date: new Date().toISOString().split("T")[0],
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
      [name]: ["energy", "protein", "carbohydrate", "fat"].includes(name)
        ? parseFloat(value) || 0
        : value || "",
    }));
  };

  const handleSubmit = () => {
    if (isEditing && initialData) {
      dispatch(updateMeal(formData));
      console.log("Updated meal:", formData);
    } else {
      dispatch(addMeal({ ...formData, id: uuidv4() }));
      console.log("Added new meal:", formData);
    }
    clearForm();
  };

  const clearForm = () => {
    setFormData({
      id: "",
      title: "",
      energy: 0,
      date: new Date().toISOString().split("T")[0],
      protein: 0,
      carbohydrate: 0,
      fat: 0,
      category: "",
    });
  };

  return (
    <div className="card">
      <h2>{isEditing ? "Edit" : "Add new"} meal</h2>
      <Form
        fields={mealFields}
        fieldGroups={mealFieldGroups}
        initialData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        validationRules={validationRules}
        isEditing={isEditing}
      />
    </div>
  );
};

export default MealForm;
