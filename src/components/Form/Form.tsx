
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
import FieldGroup from "./FieldGroup";

type FormProps = {
    initialData?: { [key: string]: any };
    clearForm?: () => void;
    fields: InputFieldProps[];
    fieldGroups?: { label: string; fieldNames: string[] }[];
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // ✅ New prop
    onSubmit?: () => void; // ✅ New prop
  };
  
  const Form: React.FC<FormProps> = ({ initialData, clearForm, fields, fieldGroups = [], onChange, onSubmit }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
  
    return (
      <form className="flex flex-col gap-4 w-full" onSubmit={(e) => { e.preventDefault(); setIsSubmitted(true); onSubmit?.(); }} noValidate>
        {/* <h2 className="font-bold">New Form</h2> */}
  
        {fields
          .filter((field) => !fieldGroups.some((group) => group.fieldNames.includes(field.name)))
          .map((field) => (
            <InputField
              key={field.name}
              {...field}
              value={initialData?.[field.name] || ""}
              onChange={onChange}
              errorMessage={errors[field.name]}
              isSubmitted={isSubmitted}
            />
          ))}
  
        {fieldGroups.map(({ label, fieldNames }) => (
          <FieldGroup
            key={label}
            label={label}
            fields={fields.filter((field) => fieldNames.includes(field.name))}
            values={initialData || {}}
            errors={errors}
            onChange={onChange}
            isSubmitted={isSubmitted}
          />
        ))}
  
        <Button type="submit">
          {initialData ? "Update" : "Save"}
        </Button>
      </form>
    );
  };
  
  export default Form;
  