

export interface InputFieldProps {
  id: string;
  name?: string;
  type?: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'time';
  placeholder?: string;
  value?: string | number;
  label?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  errorMessage?: string;
  unit?: string;
  options?: { value: string | number; label: string }[];
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
}) => {
  
  const defaultOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.warn(`No onChange function provided for ${name}.`);
  };

  return (
    <div className="input-field" id={id}>
      <div className="input-field-wrapper">
        {label && <label htmlFor={id}>{label}</label>}  
        {required && <span className="required">*</span>}
      </div>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}  
          placeholder={placeholder}
          value={value}
          onChange={onChange || defaultOnChange} // ✅ Apply default if missing
          className={errorMessage ? 'input-error' : ''}
          aria-invalid={!!errorMessage}
        />
      ) : type === 'select' && options ? (
        <select
          id={id}
          name={name}  
          value={value}
          onChange={onChange || defaultOnChange} // ✅ Apply default if missing
          className={errorMessage ? 'input-error' : ''}
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
        <div className="input-and-unit">
          <input
            id={id}
            name={name}  
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange || defaultOnChange} // ✅ Apply default if missing
            className={errorMessage ? 'input-error' : ''}
            aria-invalid={!!errorMessage}
          />
          <p className="unit">{unit}</p>
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
          className={errorMessage ? 'input-error' : ''}
          aria-invalid={!!errorMessage}
        />
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default InputField;