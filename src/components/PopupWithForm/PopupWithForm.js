import { useContext, useEffect, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import delay from '../../utils/delay';
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
  onBtnClick,
  serverErrorMessage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleBtnClick = async () => {
    onClose();
    await delay(500);
    onBtnClick();
  };

  // СТИЛИ
  const { robotoText, interText } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['form__title', robotoText] });
  const submitClassName = joinCN({ basic: ['form__submit-button', robotoText] });
  const linkClassName = joinCN({ basic: ['form__link-button', interText] });
  const choiseClassName = joinCN({ basic: ['form__choise', interText] });
  const errorClassname = joinCN({ basic: ['form__response-error', interText] });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit}>
        <h3 className={titleClassName}>
          {formTitle}
        </h3>
        {children}
        <span className={errorClassname}>{serverErrorMessage}</span>
        <Button isSubmit={true} isActive={isSubmitActive} outerClassName={submitClassName}>
          {submitTitle}
        </Button>
        <p className={choiseClassName}>
          <span>или </span>
          <Button outerClassName={linkClassName} onClick={handleBtnClick}>
            {linkBtnTitle}
          </Button>
        </p>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
