import { useEffect, useState } from 'react';
import useFormValidation from '../../hooks/useFormWithValidation';
import joinCN from '../../utils/joinClassNames';
import setCustomValidity from '../../utils/setCustomValidity';
import Button from '../Button/Button';
import './SearchForm.css';
import '../Typo/Typo.css';

const SearchForm = ({
  outerClassName,
  onSearchClick,
  lastKeyword = '',
}) => {
  const [isDisabled, setDisabled] = useState(false);

  const [isFormFocus, setFormFocus] = useState(false);
  const handleFocus = () => setFormFocus(true);
  const handleBlur = () => setFormFocus(false);
  
  const {
    values,
    errors,
    isFormValid,
    handleChange,
  } = useFormValidation(setCustomValidity);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputElement = Array.from(e.target.childNodes).find((node) => node.nodeName === 'INPUT');
    if (isFormValid) {
      setDisabled(true);
      inputElement.blur();
      await onSearchClick(values.search);
      setDisabled(false);
    } else {
      const event = new Event('change');
      inputElement.dispatchEvent(event);
      handleInputChange(event);
    }
  };

  const [inputLastKeyword, setInputLastKeyword] = useState(lastKeyword);

  const handleInputChange = (e) => {
    setInputLastKeyword('');
    handleChange(e);
  };

  useEffect(() => {
    setInputLastKeyword(lastKeyword);
  }, [lastKeyword]);
  
  // СТИЛИ
  const formClassName = joinCN({
    basic: ['search-form', outerClassName],
    condition: {
      'search-form_unfocused': !isFormFocus,
      'search-form_focused': isFormFocus,
    },
  });
  
  return (
    <form className={formClassName} onSubmit={handleSubmit} noValidate>
      <input
        className="search-form__input typo typo_font-family_roboto"
        type="text"
        name="search"
        placeholder={errors.search || "Введите тему новости"}
        autoComplete="off"
        required
        aria-required="true"
        aria-label="Ключевое слово для поиска"
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
        value={values.search || inputLastKeyword || ""}
        disabled={isDisabled}
      />
      <Button
        isSubmit={true}
        outerClassName="search-form__button typo typo_font-family_roboto"
        isActive={!isDisabled}
      >
        {isDisabled ? "Поиск..." : "Искать"}
      </Button>
    </form>
  );
};

export default SearchForm;
