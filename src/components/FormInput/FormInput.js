import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import './FormInput.css';

const FormInput = ({
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
  const { interText } = useContext(CommonPageStylesContext);
  
  const inputClassName = joinCN({
    basic: ['input-group__input', interText],
    condition: {
      'input-group__input-valid': !error,
      'input-group__input-invalid': error,
    },
  });
  const labelClassName = joinCN({ basic: ['input-group__label', interText] });
  const errorClassName = joinCN({ basic: ['input-group__error', interText] });

  return (
    <div className="input-group">
      <label className={labelClassName} htmlFor={name}>{labelText}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        value={value}
        onChange={onChange}
        className={inputClassName}
      />
      <span className={errorClassName}>{error && error}</span>
    </div>
  )
};

export default FormInput;