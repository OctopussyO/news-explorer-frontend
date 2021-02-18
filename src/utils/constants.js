const SUCCESS_REGISTRATION_MESSAGE = 'Пользователь успешно зарегистрирован!';
const INVALID_DATA_ERROR_MESSAGE = 'Некорректно заполнено одно из полей';
const USER_EXISTS_ERROR_MESSAGE = 'Такой пользователь уже есть';
const INVALID_CREDENTIALS_ERROR_MESSAGE = 'Неверный email или пароль';
const INTERNAL_SERVER_ERROR_MESSAGE = 'Ошибка на сервере, повторите позже';

const DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';
const ALT_DEFAULT_IMAGE_URL = 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80';

const RENDERING_AMOUNT = 3;

// Данные величины устанавливаются исходя из прописанных в стилях значений
const TEXT_LINE_HEIGHT = 22;
const TITLE_LINE_HEIGHT_SM = 24;
const TITLE_LINE_HEIGHT_L = 30;
const MAX_LINES_IN_CARD_S = 6;
const MAX_LINES_IN_CARD_ML = 7;
const WINDOW_MAX_WIDTH_S = 600;
const WINDOW_MAX_WIDTH_M = 1024;

export {
  SUCCESS_REGISTRATION_MESSAGE,
  INVALID_DATA_ERROR_MESSAGE,
  USER_EXISTS_ERROR_MESSAGE,
  INVALID_CREDENTIALS_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_MESSAGE,
  DEFAULT_IMAGE_URL,
  ALT_DEFAULT_IMAGE_URL,
  RENDERING_AMOUNT,
  TEXT_LINE_HEIGHT,
  TITLE_LINE_HEIGHT_SM,
  TITLE_LINE_HEIGHT_L,
  MAX_LINES_IN_CARD_S,
  MAX_LINES_IN_CARD_ML,
  WINDOW_MAX_WIDTH_S,
  WINDOW_MAX_WIDTH_M,
};
