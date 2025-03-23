
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
/* import FieldGroup from "./FieldGroup"; */

type FormProps = {
    initialData?: { [key: string]: any };
    fields: InputFieldProps[];
    fieldGroups?: { label: string; fields: InputFieldProps[], className?: string }[];
    className?: string;
/*     onClear: () => void; */
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // ✅ New prop
    onSubmit: (e: React.FormEvent<HTMLFormElement>
    ) => void | Promise<void>; // ✅ New prop
  };
  
  const Form: React.FC<FormProps> = ({
    initialData,
    fields,
    fieldGroups = [],
    onChange,
    onSubmit,
  }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    const validateFields = () => {
      const newErrors: { [key: string]: string } = {};
  
      fields.forEach((field) => {
        if (field.required && !initialData?.[field.name]) {
          newErrors[field.name] = `${field.label || field.name} is required`;
        }
      });
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const isValid = validateFields();
      setIsSubmitted(true);
  
      if (isValid) {
        onSubmit(e);
        setErrors({}); // ✅ Clear errors after success
        setIsSubmitted(false); // ✅ Reset submission state after successful validation
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
    
      // Clear error when user enters something valid
      if (errors[name] && value.trim() !== "") {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    
      // Still call parent onChange to update formData
      onChange(e);
    };
    

    
  
    return (
      <form
        className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Non-grouped fields */}
        {fields
          .filter((field) => !fieldGroups.some((group) => group.fields.some((f) => f.name === field.name)))
          .map((field) => (
            <InputField
              key={field.name}
              {...field}
              className={field.className || "col-span-full"}
              value={initialData?.[field.name] || ""}
              onChange={handleChange}
              errorMessage={errors[field.name]}
              isSubmitted={isSubmitted}
            />
          ))}
  
        {/* Grouped fields */}
        {fieldGroups.map(({ label, fields, className }) => (
          <div key={label} className={`rounded ${className || "col-span-full"}`}>
            {label && <h3 className="block font-semibold mb-1">{label}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-4 py-2">
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  className={field.className || "col-span-1"}
                  value={initialData?.[field.name] || ""}
                  onChange={handleChange}
                  errorMessage={errors[field.name]}
                  isSubmitted={isSubmitted}
                />
              ))}
            </div>
          </div>
        ))}
  
        <Button className="col-span-4" type="submit" size="lg">
          {initialData ? "Update" : "Save"}
        </Button>
      </form>
    );
  };
  
  export default Form;  