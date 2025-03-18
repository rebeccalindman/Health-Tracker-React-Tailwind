import { Meal } from "../../types/meal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../../reducers/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";

type FormProps = {
    initialData?: Meal | null;
    clearForm?: () => void;
};



const formFields: InputFieldProps[] = [
    { label: "Måltid", id: "title", name: "title", type: "text", required: true },
    { label: "Energi", id: "energy", name: "energy", type: "number", required: true },
    { label: "Datum", id: "date", name: "date", type: "text", required: true },
    { label: "Protein", id: "protein", name: "protein", type: "number", required: false },
    { label: "Kolhydrat", id: "carbohydrate", name: "carbohydrate", type: "number", required: false },
    { label: "Fett", id: "fat", name: "fat", type: "number", required: false }
];

const Form: React.FC<FormProps> = ({ initialData, clearForm }) => {
    const dispatch = useDispatch();

    const [newMeal, setNewMeal] = useState<Meal>({
        id: "",
        title: "",
        energy: 0,
        date: "",
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        category: ""
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let newErrors: { [key: string]: string } = {};
        formFields.forEach((field) => {
            if (field.required && !newMeal[field.name as keyof Meal]) {
                newErrors[field.name] = `${field.label} är obligatoriskt.`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (initialData) {
            dispatch(updateMeal(newMeal));
        } else {
            dispatch(addMeal({ ...newMeal, id: uuidv4() }));
        }

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

        if (clearForm) clearForm();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white shadow-md card px-8 pt-6 max-w-[500px]">
            {formFields.map((field) => (
                <InputField
                    key={field.id}
                    label={field.label}
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    value={newMeal[field.name as keyof Meal] || ""}
                    onChange={handleChange}
                    errorMessage={errors[field.name]}
                />
            ))}

            <label htmlFor="category" className="block text-accent text-sm font-bold mb-2 text-left">Kategori:</label>
            <select id="category" name="category" value={newMeal.category} onChange={handleChange} className="block w-full px-4 py-2 pr-10 text-accent bg-white border border-gray-300 rounded shadow focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none">
                <option value="">Välj kategori</option>
                <option value="Frukost">Frukost</option>
                <option value="Lunch">Lunch</option>
                <option value="Middag">Middag</option>
                <option value="Mellanmål">Mellanmål</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs italic mt-1">{errors.category}</p>}

            <Button variant="default" size="md" type="submit">
                {initialData ? "Uppdatera måltid" : "Logga måltid"}
            </Button>
        </form>
    );
};

export default Form;
