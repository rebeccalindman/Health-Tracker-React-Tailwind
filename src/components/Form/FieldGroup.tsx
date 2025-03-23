import InputField, { InputFieldProps } from "./InputField";

export interface FieldGroupProps {
  label?: string;
  fields: InputFieldProps[];
  values: Record<string, string | number | undefined>;
  errors: Record<string, string | undefined>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  isSubmitted: boolean;
  className?: string;
  inputRefs?: Record<string, HTMLInputElement | HTMLSelectElement | null>;
}

const FieldGroup: React.FC<FieldGroupProps> = ({
  label,
  fields,
  values,
  errors,
  onChange,
  isSubmitted,
  className,
  inputRefs = {},
}) => {
  return (
    <div className={`rounded ${className || "col-span-full"}`}>
      {label && <h3 className="block font-semibold mb-1">{label}</h3>}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-8 md:px-4 py-2">
        {fields.map((field) => (
          <InputField
            key={field.name}
            {...field}
            className={field.className || "col-span-1"}
            value={values[field.name] || ""}
            onChange={onChange}
            errorMessage={errors[field.name]}
            isSubmitted={isSubmitted}
            inputRef={(el) => {
              if (inputRefs && field.name) {
                inputRefs[field.name] = el;
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default FieldGroup;