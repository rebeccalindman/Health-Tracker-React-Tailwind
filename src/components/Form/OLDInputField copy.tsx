

interface InputFieldProps {
  id: string;
  name?: string;
  type?: 'text' | 'textarea' | 'select' | 'number' | 'date' | 'time';
  placeholder?: string;
  value?: string | number;
  title?: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  required?: boolean;
  errorMessage?: string;
  unit?: string;
  options?: { value: string | number; label: string }[];
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name = id,  // Default to id if name is not provided
  type = 'text',
  placeholder,
  value,
  title,
  onChange,
  required,
  errorMessage,
  unit,
  options,
}) => {
  return (
    <div className="input-field" id={id}>
      <div className="input-field-wrapper">
        {title && <label htmlFor={id}>{title}</label>}  {/* Correct htmlFor */}
        {required && <span className="required">*</span>}
      </div>

      {type === 'textarea' ? (
        <textarea
          id={id}
          name={name}  // Use name attribute correctly
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={errorMessage ? 'input-error' : ''}
          aria-invalid={!!errorMessage}
        />
      ) : type === 'select' && options ? (
        <select
          id={id}
          name={name}  // Use name attribute correctly
          value={value}
          onChange={onChange}
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
            name={name}  // Use name attribute correctly
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
            className={errorMessage ? 'input-error' : ''}
            aria-invalid={!!errorMessage}
          />
          <p className="unit">{unit}</p>
        </div>
      ) : (
        <input
          id={id}
          name={name}  // Use name attribute correctly
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={errorMessage ? 'input-error' : ''}
          aria-invalid={!!errorMessage}
        />
      )}

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default InputField;
