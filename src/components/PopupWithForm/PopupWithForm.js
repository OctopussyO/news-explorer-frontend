import { useContext, useRef, useState } from 'react';
import { CommonPageStylesContext } from '../../contexts/CommonPageStylesContext';
import { OPEN_CLOSE_DELAY } from '../../utils/constants';
import delay from '../../utils/delay';
import joinCN from '../../utils/joinClassNames';
import Button from '../Button/Button';
import Popup from '../Popup/Popup';
import './PopupWithForm.css';
import '../Typo/Typo.css';

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
  const { appearAnimation } = useContext(CommonPageStylesContext);

  const errorClassName = joinCN({
    basic: ['form__response-error', 'typo', 'typo_font-family_inter'],
    condition: { [appearAnimation]: !!serverErrorMessage },
  });

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <form className="form" onSubmit={handleSubmit} ref={formRef}>
        <h3 className="form__title typo typo_font-family_roboto">
          {formTitle}
        </h3>
        {children}
        <span className={errorClassName}>{serverErrorMessage}</span>
        <Button
          isSubmit={true}
          isActive={isSubmitActive && !isDisabled}
          outerClassName="form__submit-button typo typo_font-family_roboto"
        >
          {currentSubmitTitle}
        </Button>
        <p className="form__choise typo typo_font-family_inter">
          <span>или </span>
          <Button
            outerClassName="form__link-button typo typo_font-family_inter"
            onClick={handleBtnClick}
          >
            {linkBtnTitle}
          </Button>
        </p>
      </form>
    </Popup>
  );
};

export default PopupWithForm;
