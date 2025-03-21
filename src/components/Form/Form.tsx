
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
import FieldGroup from "./FieldGroup";

type FormProps = {
    initialData?: { [key: string]: any };
    fields: InputFieldProps[];
    fieldGroups?: { label: string; fields: InputFieldProps[], className?: string }[];
    className?: string;
    clearForm?: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // ✅ New prop
    onSubmit?: () => void; // ✅ New prop
  };
  
  const Form: React.FC<FormProps> = ({ initialData, clearForm, fields, fieldGroups = [], onChange, onSubmit }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    return (
      <form 
        className="grid grid-cols-4 gap-4 w-full"
        onSubmit={(e) => { 
          e.preventDefault(); 
          setIsSubmitted(true); 
          onSubmit?.(); 
        }} 
        noValidate
      >
        {/* Individual fields that are not inside a group */}
        {fields
          .filter((field) => !fieldGroups.some((group) => group.fields.some((f) => f.name === field.name)))
          .map((field) => (
            <InputField
              key={field.name}
              {...field}
              className={field.className || "col-span-1"} // ✅ Default to single column
              value={initialData?.[field.name] || ""}
              onChange={onChange}
              errorMessage={errors[field.name]}
              isSubmitted={isSubmitted}
            />
        ))}

         {/* Render field groups */}
        {fieldGroups.map(({ label, fields, className }) => (
          <div 
            key={label} 
            className={`bg-accent/10 p-2 rounded ${className || "col-span-4"}`} // ✅ Full width by default
          >
            {label && <label className="block font-semibold mb-1">{label}</label>}
            <div className="grid grid-cols-4 gap-4"> {/* ✅ Keeps fields inside groups aligned */}
              {fields.map((field) => (
                <InputField
                  key={field.name}
                  {...field}
                  className={field.className || "col-span-1"} // ✅ Default to compact width
                  value={initialData?.[field.name] || ""}
                  onChange={onChange}
                  errorMessage={errors[field.name]}
                  isSubmitted={isSubmitted}
                />
              ))}
            </div>
          </div>
        ))}

        <Button type="submit">
          {initialData ? "Update" : "Save"}
        </Button>
      </form>

    );
  };
  
  export default Form;
  
