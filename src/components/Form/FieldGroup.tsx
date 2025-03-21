import InputField, { InputFieldProps } from "./InputField";

export interface FieldGroupProps {
  label?: string;
  fields: InputFieldProps[]; // List of fields to render
  values: Record<string, string | number | undefined>; // ✅ More precise typing for form values
  errors: Record<string, string | undefined>; // ✅ More precise typing for error messages
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isSubmitted: boolean;
  className?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, fields, values, errors, onChange, isSubmitted, className }) => {

  return (
    <div className={`flex text-left flex-wrap gap-4 p-2 rounded ${className || 'bg-accent/10'}`}>
      {label && <label className="w-full font-semibold">{label}</label>}
      <div className="flex w-full gap-4">
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
      </div>
    </div>
  );
};

export default FieldGroup;

