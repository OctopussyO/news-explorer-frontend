import { useRef, useState } from 'react';
import useFormValidation from '../../hooks/useFormWithValidation';
import handleErrorMessage from '../../utils/handleErrorMessage';
import setCustomValidity from '../../utils/setCustomValidity';
import FormInput from '../FormInput/FormInput';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const PopupLogin = ({
  isOpen,
  onClose,
  onLogin,
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
  
  const handleLogin = () => {
    return onLogin(values)
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
      onSubmit={handleLogin}
      formTitle="Вход"
      submitTitle="Войти"
      submitLoadingTitle="Вход..."
      linkBtnTitle="Зарегистрироваться"
      onBtnClick={onChangePopup}
      serverErrorMessage={errorMessage}
    >
      <FormInput
        id="email-login"
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
        id="password-login"
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
    </PopupWithForm>
  );
};

export default PopupLogin;
