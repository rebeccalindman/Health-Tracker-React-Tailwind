import { useState } from "react";
import { Button } from "../ui/button";
import InputField from "./InputField";
import { InputFieldProps } from "./InputField";
import FieldGroup from "./FieldGroup";
import { SaveIcon, X } from "lucide-react";

// Props for the reusable Form component
export type FormProps = {
  initialData?: { [key: string]: any };
  fields: InputFieldProps[];
  fieldGroups?: {
    label?: string;
    fields: InputFieldProps[];
    className?: string;
    footer?: React.ReactNode;
  }[];
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  isEditing?: boolean;
  validationRules?: {
    [key: string]: (value: any) => string | null;
  };
};

const Form: React.FC<FormProps> = ({
  initialData,
  fields,
  isEditing,
  fieldGroups = [],
  onChange,
  onSubmit,
  validationRules,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    fields.forEach((field) => {
      const value = initialData?.[field.name];

      const isEmpty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        value === "" ||
        (typeof value === "number" && isNaN(value));

      if (field.required && isEmpty) {
        newErrors[field.name] = `${field.label || field.name} is required`;
      }

      if (validationRules && validationRules[field.name]) {
        const customError = validationRules[field.name](value);
        if (customError) {
          newErrors[field.name] = customError;
        }
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
      const result = onSubmit(e); // in case it's async
      if (result instanceof Promise) {
        result.then(() => {
          setSuccessMessage("Saved successfully ✅");
        });
      } else {
        setSuccessMessage("Saved successfully ✅");
      }
    
      setErrors({});
      setIsSubmitted(false);
    
      // Clear message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (errors[name] && value.trim() !== "") {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    onChange(e);
  };

  const isFormValid = fields.every((field) => {
    const value = initialData?.[field.name];
    const isEmpty =
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "number" && isNaN(value));
    return !field.required || !isEmpty;
  });

  return (
    <form
      className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full"
      onSubmit={handleSubmit}
      noValidate
    >
      {/* Non-grouped fields */}
      {fields
        .filter(
          (field) => !fieldGroups.some((group) => group.fields.some((f) => f.name === field.name))
        )
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
      {fieldGroups.map((group) => {
        const { label, fields, className, footer } = group;

        return (
          <div
            key={label || fields.map((f) => f.name).join("_")}
            className={`rounded ${className || "col-span-full"}`}
          >
            {label && <h3 className="block font-semibold mb-1">{label}</h3>}

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-4 py-2">
              <FieldGroup
                fields={fields}
                values={initialData || {}}
                errors={errors}
                onChange={handleChange}
                isSubmitted={isSubmitted}
              />
              {footer && <div className="col-span-full flex justify-center md:justify-start">{footer}</div>}
            </div>
          </div>
        );
      })}

      {/* Submit Button */}
      <Button className="col-span-4 w-fit justify-self-center" type="submit" size="lg" disabled={!isFormValid}>
        <SaveIcon/>
        {isEditing ? "Update" : "Save"}
      </Button>
     {/* Success Message */}
      {successMessage && (
        <div className="col-span-4 justify-self-center text-sm text-green-600 mt-2 text-center">
          {successMessage}
        </div>
      )}

      {/* Submit Error Message */}
      {isSubmitted && Object.keys(errors).length > 0 && (
        <div className="col-span-4 justify-self-center text-sm text-red-600 mt-2 text-center flex items-center">
          <X className="h-5 w-5 mr-2" />
          Some fields are missing or contain errors. Please check and try again.
        </div>
      )}
    </form>
  );
};

export default Form;
