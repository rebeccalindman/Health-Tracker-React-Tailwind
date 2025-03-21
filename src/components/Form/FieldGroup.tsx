import InputField, { InputFieldProps } from "./InputField";

export interface FieldGroupProps {
  fields: InputFieldProps[]; // List of fields to render
  values: Record<string, string | number | undefined>; // ✅ More precise typing for form values
  errors: Record<string, string | undefined>; // ✅ More precise typing for error messages
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isSubmitted: boolean;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ fields, values, errors, onChange, isSubmitted }) => {

  return (
    <>
        {fields.map(({ name, label, type, options, required, disabled, unit, className }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            type={type}
            value={values[name] || ""}
            onChange={onChange}
            errorMessage={errors[name]}
            options={options}
            required={required}
            isSubmitted={isSubmitted}
            disabled={disabled}
            unit={unit}
            className={className}
          />
        ))}

    </>
  );
};

export default FieldGroup;

