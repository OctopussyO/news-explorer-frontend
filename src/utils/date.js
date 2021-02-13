import { months } from "../configs/months";

// на вход принимает экземпляр объекта Date, приводит его к виду 'yyyy-mm-dd'
const formatDateToNums = (date) => {
  const formatNum = (num) => `${num < 10 ? '0' : ''}${num}`;
  return `${date.getFullYear()}-${formatNum(date.getMonth() + 1)}-${formatNum(date.getDate())}`;
};

// на вход принимает экземпляр объекта Date, приводит его к виду '00 месяца 0000'
// можно расширить функционал, переписав и указывая язык отображения
const formatDateToStr = (date) => {
  return `${date.getDate()} ${months.ru[date.getMonth()]}, ${date.getFullYear()}`;
};

// на вход принимает экземпляр объекта Date, возвращает экземпляр объекта Date недельной давности
// можно расширить функционал, переписав и передавая количество дней для смещения
const takeWeekAgoDate = (date) => {
  // Клонируем переданную дату
  const newDate = new Date(date);
  newDate.setDate(date.getDate() - 7);
  return newDate;
};

export {
  takeWeekAgoDate,
  formatDateToNums,
  formatDateToStr,
};
