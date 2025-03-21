
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
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>; // ✅ New prop
  };
  
  const Form: React.FC<FormProps> = ({ initialData, clearForm, fields, fieldGroups = [], onChange, onSubmit }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    return (
      <form 
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full" // ✅ Ensures 1 column on mobile, 4 on larger screens
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
              className={field.className || "col-span-full"} // ✅ Default to single column
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
            className={`rounded ${className || "col-span-full"}`} // ✅ Full width by default
          >
            {label && <h3 className="block font-semibold mb-1">{label}</h3>}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-4 py-2"> {/* ✅ Keeps fields inside groups aligned */}
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

        <Button className="col-span-4" type="submit" size="lg">
          {initialData ? "Update" : "Save"}
        </Button>
      </form>

    );
  };
  
  export default Form;
  
