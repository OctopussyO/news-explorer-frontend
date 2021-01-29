import { useContext } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import './PopupWithForm.css';

const PopupWithForm = ({
  children,
  isOpen,
  onClose,
  onSubmit,
  formTitle = '',
  submitTitle = '',
  linkBtnTitle = '',
  isSubmitActive,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  }

  // СТИЛИ
  const { robotoText, interText } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['form__title', robotoText] });
  const submitClassName = joinCN({ basic: ['form__submit-button', robotoText] });
  const linkClassName = joinCN({ basic: ['form__link-button', interText] });
  const choiseClassName = joinCN({ basic: ['form__choise', interText] });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <h3 className={titleClassName}>
          {formTitle}
        </h3>
        {children}
        <Button isSubmit={true} isActive={isSubmitActive} outerClassName={submitClassName}>
          {submitTitle}
        </Button>
        <p className={choiseClassName}>
          <span>или </span>
          <Button outerClassName={linkClassName}>
            {linkBtnTitle}
          </Button>
        </p>
      </form>
    </Popup>
  )
};

export default PopupWithForm;
