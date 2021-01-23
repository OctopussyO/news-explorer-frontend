import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinClassNames from '../../utils/joinClassNames';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import './SearchForm.css';

const SearchForm = ({
  outerClassName,
}) => {
  const { robotoText } = useContext(CommonPageStylesContext);
  const formClassName = joinCN({ basic: ['search-form', outerClassName] });
  const inputClassName = joinClassNames({ basic: ['search-form__input', robotoText] });
  return (
    <form className={formClassName}>
      <input
        className={inputClassName}
        type="text"
        placeholder="Введите тему новости"
        autoComplete="off"
        required
      />
      <Button isSubmit={true} outerClassName="search-form__button">Искать</Button>
    </form>
  );
}

export default SearchForm;
