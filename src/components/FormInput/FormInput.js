import './FormInput.css';
import '../Typo/Typo.css';

const FormInput = ({
  id,
  name,
  labelText,
  placeholder,
  value,
  error,
  type,
  minLength,
  maxLength,
  pattern,
  required,
  onChange,
}) => {
  return (
    <div className="input-group">
      <label className="input-group__label typo typo_font-family_inter" htmlFor={id ? id : name}>
        {labelText}
      </label>
      <input
        className="input-group__input typo typo_font-family_inter"
        id={id ? id : name}
        name={name}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        aria-required={required}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
      <span className="input-group__error typo typo_font-family_inter">
        {error && error}
      </span>
    </div>
  );
};

export default FormInput;
