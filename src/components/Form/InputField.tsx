export interface InputFieldProps {
  id: string;
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
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name = id, 
  type = 'text',
  placeholder,
  value,
  label,
  onChange, // ✅ No need to pass explicitly every time
  required,
  errorMessage,
  unit,
  options,
  isSubmitted
}) => {
  
  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.warn(`No onChange function provided for ${name}.`);
  };

  const stylingInput = `border-1 rounded w-full p-1 ${
    isSubmitted && (errorMessage || (required && (value === "" || value === undefined || value === null))) 
      ? 'border-red-500' 
      : 'border-accent'
  }`;

  return (
    <div className="input-field" id={id}>
      <div className="flex items-start">
        {label && <label className="text-left py-1" htmlFor={id}>{label}</label>}  
        {required && <span className="text-red-500 ml-1">*</span>}
      </div>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}  
          placeholder={placeholder}
          value={value}
          onChange={onChange} 
          className={stylingInput}
          aria-invalid={!!errorMessage}
          required = {required}
        />
      ) : type === 'select' && options ? (
        <select
          id={id}
          name={name}  
          value={value}
          required={required}
          onChange={onChange} 
          className={stylingInput + ' ' + ` py-2`}
          aria-invalid={!!errorMessage}
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
            id={id}
            name={name}  
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange} 
            className={stylingInput}
            aria-invalid={!!errorMessage}
          />
          <p className="text-accent">{unit}</p>
        </div>
      ) : (
        <input
          id={id}
          name={name}  
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange || defaultOnChange} // ✅ Apply default if missing
          className={stylingInput}
          aria-invalid={!!errorMessage}
        />
      )}

      {(isSubmitted && errorMessage) && <p className="text-red-700">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
