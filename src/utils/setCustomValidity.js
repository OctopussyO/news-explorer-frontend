// Устанавливает кастомные сообщения об ошибках
const setCustomValidity = (target) => {
  target.setCustomValidity('');

  if (!target.validity.valid){
    if (target.validity.valueMissing) {
      target.setCustomValidity('Это поле обязательно');
    } else if (target.name === 'name' & target.validity.patternMismatch) {
      target.setCustomValidity('Имя может содержать только буквы')
    } else if (target.validity.tooShort) {
      target.setCustomValidity(`Должно быть длиннее ${target.minLength} символов`);
    } else if (target.validity.tooLong) {
      target.setCustomValidity(`Должно быть короче ${target.maxLength} символов`)
    } else if (target.name === 'email' & target.validity.patternMismatch) {
      target.setCustomValidity('Неправильный формат email')
    }
  }
};

export default setCustomValidity;
