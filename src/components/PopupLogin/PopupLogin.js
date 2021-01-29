import useFormValidation from '../../hooks/useFormWithValidation';
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
    resetForm
  } = useFormValidation(setCustomValidity);

  const handleLogin = () => {
    onLogin();
    resetForm();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isSubmitActive={isFormValid}
      onSubmit={handleLogin}
      formTitle="Вход"
      submitTitle="Войти"
      linkBtnTitle="Зарегистрироваться"
      onBtnClick={onChangePopup}
    >
      <FormInput
        name="email"
        labelText="Email"
        placeholder="Введите почту"
        value={values.email || ''}
        error={errors.email || ''}
        type="email"
        pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"
        required={true}
        onChange={handleChange}
      />
      <FormInput
        name="password"
        labelText="Пароль"
        placeholder="Введите пароль"
        value={values.password || ''}
        error={errors.password || ''}
        type="password"
        minLength="6"
        required={true}
        onChange={handleChange}
      />
    </PopupWithForm>
  )
};

export default PopupLogin;
