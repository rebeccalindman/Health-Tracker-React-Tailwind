import { Meal } from "../../types/meal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../../reducers/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
import FieldGroup from "./FieldGroup";

type FormProps = {
    initialData?: Meal | null;
    clearForm?: () => void;
};



const formFields: InputFieldProps[] = [
    {
        label: "Meal",
        id: "title",
        name: "title",
        type: "text",
        required: true,
    },
    {
        label: "Category",
        type: "select",
        id: "category",
        name: "category",
        required: true,
        options: [
            { value: "Breakfast", label: "Breakfast" },
            { value: "Lunch", label: "Lunch" },
            { value: "Dinner", label: "Dinner" },
            { value: "Snack", label: "Snack" },
        ],
    },
    {
        label: "Energy",
        id: "energy",
        name: "energy",
        type: "number",
        required: true,
    },
    {
        label: "Date",
        id: "date",
        name: "date",
        type: "date",
        required: true,
    },
    {
        label: "Protein",
        id: "protein",
        name: "protein",
        type: "number",
        unit: "g",
        required: false,
    },
    {
        label: "Carbs",
        id: "carbohydrate",
        name: "carbohydrate",
        type: "number",
        unit: "g",
        required: false,
    },
    {
        label: "Fett",
        id: "fat",
        name: "fat",
        type: "number",
        unit: "g",
        required: false,
    },
    
];

const Form: React.FC<FormProps> = ({ initialData, clearForm }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [newMeal, setNewMeal] = useState<Meal>({
        id: "",
        title: "",
        energy: null,
        date: "",
        protein: null,
        carbohydrate: null,
        fat: null,
        category: ""
    });

    

    useEffect(() => {
        if (initialData) {
            setNewMeal(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setNewMeal((prevMeal) => ({
            ...prevMeal,
            [name]: ["energy", "protein", "carbohydrate", "fat"].includes(name)
                ? value === "" ? "" : parseFloat(value)
                : value
        }));
    
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (value !== "" && value !== undefined && value !== null) {
                delete newErrors[name]; // ✅ Clear the error when user enters valid data
            }
            return newErrors;
        });
    };
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true); // ✅ Mark form as submitted
    
        let newErrors: { [key: string]: string } = {};
        formFields.forEach((field) => {
            const fieldValue = newMeal[field.name as keyof Meal];
    
            if (field.required && (fieldValue === "" || fieldValue === undefined || fieldValue === null)) {
                newErrors[field.name] = `${field.label} is required.`; // ✅ Set error message
            }
        });
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); // ✅ This updates error messages
            return;
        }
    
        // Proceed with form submission if valid
        if (initialData) {
            dispatch(updateMeal(newMeal));
        } else {
            dispatch(addMeal({ ...newMeal, id: uuidv4() }));
        }
    
        // ✅ Reset state only after full submission
        setNewMeal({
            id: "",
            title: "",
            energy: 0,
            date: "",
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            category: ""
        });
    
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 100); // ✅ Delay resetting `isSubmitted`
    
        if (clearForm) clearForm();
    };
    


return (
  <form onSubmit={handleSubmit} noValidate className="bg-white shadow-md card px-8 pt-6 max-w-[500px]">
    
    {/* Meal, Date (Full Width Fields) */}
    {formFields
      .filter((field) => field.name === "title" || field.name === "date" || field.name ==="category")
      .map((field) => (
        <InputField
          key={field.id}
          label={field.label}
          id={field.id}
          name={field.name}
          type={field.type}
          value={newMeal[field.name as keyof Meal] || ""}
          onChange={handleChange}
          errorMessage={errors[field.name]}
          options={field.options} 
          required={field.required}
          isSubmitted={isSubmitted}
        />
      ))}

    {/* Grouped Fields: Energy, Protein, Carbs, Fat */}
    <FieldGroup label="Macronutrients">
      {formFields
        .filter((field) => ["energy", "protein", "carbohydrate", "fat"].includes(field.name))
        .map((field) => (
          <InputField
            key={field.id}
            label={field.label}
            id={field.id}
            name={field.name}
            type={field.type}
            value={newMeal[field.name as keyof Meal] || ""}
            onChange={handleChange}
            errorMessage={errors[field.name]}
            options={field.options} 
            required={field.required}
            isSubmitted={isSubmitted}
          />
        ))}
    </FieldGroup>

    <Button variant="default" size="md" type="submit">
      {initialData ? "Update meal" : "Save meal"}
    </Button>
  </form>
);

};

export default Form;
