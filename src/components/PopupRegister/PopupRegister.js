import useFormValidation from '../../hooks/useFormWithValidation';
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
    resetForm
  } = useFormValidation(setCustomValidity);

  const handleRegister = () => {
    onRegister();
    resetForm();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      isSubmitActive={isFormValid}
      onSubmit={handleRegister}
      formTitle = "Регистрация"
      submitTitle = "Зарегистрироваться"
      linkBtnTitle = "Войти"
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
      <FormInput
        name="name"
        labelText="Имя"
        placeholder="Введите своё имя"
        value={values.name || ''}
        error={errors.name || ''}
        type="text"
        minLength="2"
        maxLength="30"
        pattern="^[A-Za-zА-Яа-яёЁ\s\-]+$"
        required={true}
        onChange={handleChange}
      />
    </PopupWithForm>
  )
};

export default PopupRegister;
