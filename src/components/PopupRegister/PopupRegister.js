import { useRef, useState } from 'react';
import useFormValidation from '../../hooks/useFormWithValidation';
import delay from '../../utils/delay';
import handleErrorMessage from '../../utils/handleErrorMessage';
import setCustomValidity from '../../utils/setCustomValidity';
import FormInput from '../FormInput/FormInput';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const PopupRegister = ({
  isOpen,
  onClose,
  onRegister,
  onChangePopup,
}) => {
  const {
    values,
    errors,
    isFormValid,
    handleChange,
    resetForm,
  } = useFormValidation(setCustomValidity);

  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    return onRegister(values)
      .then(() => {
        resetForm();
        setErrorMessage('');
      })
      .catch((err) => {
        handleErrorMessage(err.status, setErrorMessage);
      });
  };

  const handleClose = () => {
    onClose();
    resetForm();
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    handleChange(e);
    setErrorMessage('');
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={handleClose}
      isSubmitActive={isFormValid}
      onSubmit={handleRegister}
      formTitle="Регистрация"
      submitTitle="Зарегистрироваться"
      submitLoadingTitle="Регистрация..."
      linkBtnTitle="Войти"
      onBtnClick={onChangePopup}
      serverErrorMessage={errorMessage}
    >
      <FormInput
        id="email-register"
        name="email"
        labelText="Email"
        placeholder="Введите почту"
        value={values.email || ""}
        error={errors.email || ""}
        type="email"
        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
        required={true}
        onChange={handleInputChange}
      />
      <FormInput
        id="password-register"
        name="password"
        labelText="Пароль"
        placeholder="Введите пароль"
        value={values.password || ""}
        error={errors.password || ""}
        type="password"
        minLength="6"
        required={true}
        onChange={handleInputChange}
      />
      <FormInput
        name="name"
        labelText="Имя"
        placeholder="Введите своё имя"
        value={values.name || ""}
        error={errors.name || ""}
        type="text"
        minLength="2"
        maxLength="30"
        pattern="^[A-Za-zА-Яа-яёЁ\s\-]+$"
        required={true}
        onChange={handleInputChange}
      />
    </PopupWithForm>
  );
};

export default PopupRegister;
