export interface InputFieldProps {
  name: string;
  type:
    | "text"
    | "email"
    | "password"
    | "tel"
    | "url"
    | "textarea"
    | "select"
    | "number"
    | "date"
    | "time"
    | "datetime-local"
    | "week"
    | "month";
  placeholder?: string;
  value?: string | number;
  label?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  errorMessage?: string;
  unit?: string;
  options?: { value: string | number; label: string }[];
  isSubmitted?: boolean;
  disabled?: boolean;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = "text",
  value = "",
  label,
  placeholder,
  onChange,
  required,
  errorMessage,
  unit,
  options,
  isSubmitted,
  disabled,
  className = "",
}) => {
  // Default onChange if none provided
  const handleChange =
    onChange ||
    ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      console.warn(`No onChange function provided for ${name}.`));

  // Base input styling
  const inputBaseClasses = `border rounded p-2 transition-all duration-200 w-full`;
  const validationClasses =
    isSubmitted && (errorMessage || (required && !value)) ? "border-red-500" : "border-accent";
  const disabledClasses = disabled ? "bg-gray-200 text-gray-500 cursor-not-allowed opacity-60" : "";
  const inputClasses = `${inputBaseClasses} ${validationClasses} ${disabledClasses} ${unit ? "pr-8" : ""}`;

  return (
    <div className={`flex flex-col justify-self-center w-full ${className || "col-span-1"}`}>
      {/* Label */}
      {label && (
        <div className="flex items-center">
          <label htmlFor={name} className="text-left py-1 font-bold text-lg md:text-md">
            {label}
          </label>
          {required && <span className="text-red-500 ml-1">*</span>}
        </div>
      )}

      {/* Input Field Types */}
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={inputClasses}
          aria-invalid={!!errorMessage}
          required={required}
          disabled={disabled}
        />
      ) : type === "select" && options ? (
        <select
          id={name}
          name={name}
          value={value}
          required={required}
          onChange={handleChange}
          className={`${inputClasses} py-2`}
          aria-invalid={!!errorMessage}
          disabled={disabled}
        >
          <option value="">Select an option</option>
          {options.map(({ value, label }, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative w-full">
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={handleChange}
            className={inputClasses}
            aria-invalid={!!errorMessage}
            disabled={disabled}
          />
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
              {unit}
            </span>
          )}
        </div>
      )}

      {/* Error Message */}
      {isSubmitted && errorMessage && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
