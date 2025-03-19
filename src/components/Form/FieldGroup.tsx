import InputField, { InputFieldProps } from "./InputField";

interface FieldGroupProps {
  label?: string;
  fields: InputFieldProps[]; // List of fields to render
  values: { [key: string]: any }; // Current form values
  errors: { [key: string]: string }; // Error messages
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isSubmitted: boolean;
  background?: string;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, fields, values, errors, onChange, isSubmitted, background }) => {
    const wrapperStyle = `flex text-left flex-wrap gap-4 p-2 rounded ${background ? `bg-${background}` : 'bg-accent/10'}`;

  return (
    <div className={wrapperStyle}>
      {label && <label className="w-full font-semibold">{label}</label>}
      <div className="flex w-full gap-4">
        {fields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={values[field.name] || ""}
            onChange={onChange}
            errorMessage={errors[field.name]}
            options={field.options}
            required={field.required}
            isSubmitted={isSubmitted}
          />
        ))}
      </div>
    </div>
  );
};

export default FieldGroup;
