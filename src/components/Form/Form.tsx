import { Meal } from "../../types/meal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMeal, updateMeal } from "../../redux/slices/mealSlice";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
import FieldGroup from "./FieldGroup";

type FormProps = {
    initialData?: Meal | null;
    clearForm?: () => void;
    fields: InputFieldProps[]; // Customizable fields
    fieldGroups?: { label: string; fieldNames: string[] }[]; // Define grouped fields
};

const Form: React.FC<FormProps> = ({ initialData, clearForm, fields, fieldGroups = [] }) => {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<{ [key: string]: any }>(
        fields.reduce((acc, field) => ({
            ...acc,
            [field.name]: field.name === "date" ? new Date().toISOString().split('T')[0] : "", // ✅ Default date
        }), {})
    );

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["energy", "protein", "carbohydrate", "fat"].includes(name) ? parseFloat(value) || "" : value,
        }));

        setErrors((prev) => {
            const newErrors = { ...prev };
            if (value) delete newErrors[name];
            return newErrors;
        });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitted(true);

        let newErrors: { [key: string]: string } = {};
        fields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = `${field.label} is required.`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (initialData) {
            dispatch(updateMeal(formData));
        } else {
            dispatch(addMeal({ ...formData, id: uuidv4() }));
        }

        setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {}));
        setErrors({});
        setTimeout(() => setIsSubmitted(false), 100);

        if (clearForm) clearForm();
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="bg-white shadow-md card px-8 pt-6 max-w-[500px] text-left">
            <h2 className="font-bold">New Form</h2>

            {/* Render fields that are NOT in any FieldGroup */}
            {fields
                .filter((field) => !fieldGroups.some((group) => group.fieldNames.includes(field.name)))
                .map((field) => (
                    <InputField
                        key={field.name}
                        {...field}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        errorMessage={errors[field.name]}
                        isSubmitted={isSubmitted}
                    />
                ))}

            {/* Render FieldGroups dynamically */}
            {fieldGroups.map(({ label, fieldNames }) => (
                <FieldGroup
                    key={label}
                    label={label}
                    fields={fields.filter((field) => fieldNames.includes(field.name))}
                    values={formData}
                    errors={errors}
                    onChange={handleChange}
                    isSubmitted={isSubmitted}
                />
            ))}

            <Button variant="default" size="md" type="submit">
                {initialData ? "Update" : "Save"}
            </Button>
        </form>
    );
};

export default Form;
