export interface InputFieldProps {
  name: string;
  type:
    | 'text'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'textarea'
    | 'select'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'week'
    | 'month';
  placeholder?: string;
  value?: string | number;
  label?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  errorMessage?: string;
  unit?: string;
  options?: { value: string | number; label: string }[];
  isSubmitted?: boolean
  disabled?: boolean
  className?: string
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = 'text',
  value,
  label,
  placeholder = label,
  onChange, // ✅ No need to pass explicitly every time
  required,
  errorMessage,
  unit,
  options,
  isSubmitted,
  disabled,
  className = "", // ✅ Default to full width if not specified
}) => {
  
  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.warn(`No onChange function provided for ${name}.`);
  };

  // ✅ Ensure Tailwind classes change dynamically when disabled
  const stylingInput = `border-1 rounded p-1 transition-all duration-200
    ${isSubmitted && (errorMessage || (required && (value === "" || value === undefined || value === null))) 
      ? 'border-red-500' 
      : 'border-accent'}
    ${className} 
    ${disabled ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-60' : ''}`; // ✅ Apply styles correctly
  

  return (
    <div className="flex items-start flex-col w-fit" id={name}>
      <div className="flex items-start w-fit">
        {label && <label className="text-left py-1 w-fit" htmlFor={name}>{label}</label>}  
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>

      {type === 'textarea' ? (
        <textarea
          id={name}
          name={name}  
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
          className={stylingInput}
          aria-invalid={!!errorMessage}
          required = {required}
          disabled={disabled}
        />
      ) : type === 'select' && options ? (
        <select
          id={name}
          name={name}  
          value={value}
          required={required}
          onChange={onChange} 
          className={stylingInput + ' ' + ` py-2`}
          aria-invalid={!!errorMessage}
          disabled={disabled}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <div className="flex items-center">
          <input
            id={name}
            name={name}  
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange || defaultOnChange} // ✅ Apply default if missing
            className={stylingInput}
            aria-invalid={!!errorMessage}
            disabled={disabled}
          />
          {unit && <p className="text-accent inline-block ml-1 w-fit">{unit}</p>}
        </div>
      )}

      {(isSubmitted && errorMessage) && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
};

export default InputField;

