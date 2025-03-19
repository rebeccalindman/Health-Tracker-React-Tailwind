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
}

const InputField: React.FC<InputFieldProps> = ({
  name,
  type = 'text',
  placeholder,
  value,
  label,
  onChange, // ✅ No need to pass explicitly every time
  required,
  errorMessage,
  unit,
  options,
  isSubmitted,
  disabled
}) => {
  
  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.warn(`No onChange function provided for ${name}.`);
  };

  const stylingInput = `border-1 rounded p-1 ${
    isSubmitted && (errorMessage || (required && (value === "" || value === undefined || value === null))) 
      ? 'border-red-500' 
      : 'border-accent'
  } ${type=="date" ? 'w-fit' : 'w-full'}`;

  return (
    <div className="flex items-start flex-col justify-start" id={name}>
      <div className="flex items-start justify-start">
        {label && <label className="text-left py-1" htmlFor={name}>{label}</label>}  
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
      ) : unit ? (
        <div className="">
          <input
            id={name}
            name={name}  
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange} 
            className={stylingInput}
            aria-invalid={!!errorMessage}
            disabled={disabled}
          />
          <p className="text-accent">{unit}</p>
        </div>
      ) : (
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
      )}

      {(isSubmitted && errorMessage) && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
};

export default InputField;

