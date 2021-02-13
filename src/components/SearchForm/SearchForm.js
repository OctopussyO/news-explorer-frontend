import { useContext, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import useFormValidation from '../../hooks/useFormWithValidation';
import joinCN from '../../utils/joinClassNames';
import setCustomValidity from '../../utils/setCustomValidity';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({
  outerClassName,
  onSearchClick,
}) => {
  const [isFormFocus, setFormFocus] = useState(false);
  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);
  
  const {
    values,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = useFormValidation(setCustomValidity);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      onSearchClick(values.search);
      resetForm();
    } else {
      const event = {
        target: Array.from(e.target.childNodes).find((node) => node.nodeName === 'INPUT'),
      };
      handleChange(event);
    }
  };
  
  // СТИЛИ
  const { robotoText } = useContext(CommonPageStylesContext);
  const formClassName = joinCN({
    basic: ['search-form', outerClassName],
    condition: {
      'search-form_unfocused': !isFormFocus,
      'search-form_focused': isFormFocus,
    },
  });
  const inputClassName = joinCN({ basic: ['search-form__input', robotoText] });
  const buttonClassName = joinCN({ basic: ['search-form__button', robotoText] });
  
  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <input
        className={inputClassName}
        type="text"
        name="search"
        placeholder={errors.search || "Введите тему новости"}
        autoComplete="off"
        required
        aria-required="true"
        aria-label="Ключевое слово для поиска"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.search || ""}
      />
      <Button isSubmit={true} outerClassName={buttonClassName}>
        Искать
      </Button>
    </form>
  );
};

export default SearchForm;
