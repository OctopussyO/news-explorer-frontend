import { useContext, useRef, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { OPEN_CLOSE_DELAY } from '../../utils/constants';
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
  submitLoadingTitle = '',
  linkBtnTitle = '',
  isSubmitActive,
  onBtnClick,
  serverErrorMessage,
}) => {
  const [currentSubmitTitle, setSubmitTitle] = useState(submitTitle);
  const [isDisabled, setDisabled] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElements = Array.from(formRef.current.elements);
    formElements.forEach((el) => el.disabled = true);
    setSubmitTitle(submitLoadingTitle);
    setDisabled(true);
    onSubmit()
      .finally(() => {
        setDisabled(false);
        formElements.forEach((el) => el.disabled = false);
        setSubmitTitle(submitTitle);
      });;
  };

  const handleBtnClick = async () => {
    onClose();
    await delay(OPEN_CLOSE_DELAY);
    onBtnClick();
  };

  // СТИЛИ
  const { robotoText, interText, appearAnimation } = useContext(CommonPageStylesContext);

  const titleClassName = joinCN({ basic: ['form__title', robotoText] });
  const submitClassName = joinCN({ basic: ['form__submit-button', robotoText] });
  const linkClassName = joinCN({ basic: ['form__link-button', interText] });
  const choiseClassName = joinCN({ basic: ['form__choise', interText] });
  const errorClassName = joinCN({
    basic: ['form__response-error', interText],
    condition: { [appearAnimation]: !!serverErrorMessage },
  });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <h3 className={titleClassName}>
          {formTitle}
        </h3>
        {children}
        <span className={errorClassName}>{serverErrorMessage}</span>
        <Button
          isSubmit={true}
          isActive={isSubmitActive && !isDisabled}
          outerClassName={submitClassName}
        >
          {currentSubmitTitle}
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
