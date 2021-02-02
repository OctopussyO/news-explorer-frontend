import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({
  outerClassName,
}) => {
  const { robotoText } = useContext(CommonPageStylesContext);
  const formClassName = joinCN({ basic: ['search-form', outerClassName] });
  const inputClassName = joinCN({ basic: ['search-form__input', robotoText] });
  const buttonClassName = joinCN({ basic: ['search-form__button', robotoText] });
  
  return (
    <form className={formClassName}>
      <input
        className={inputClassName}
        type="text"
        placeholder="Введите тему новости"
        autoComplete="off"
        required
        aria-required="true"
        aria-label="Ключевое слово для поиска"
      />
      <Button isSubmit={true} outerClassName={buttonClassName}>Искать</Button>
    </form>
  );
}

export default SearchForm;
