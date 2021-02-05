import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INVALID_CREDENTIALS_ERROR_MESSAGE,
  INVALID_DATA_ERROR_MESSAGE,
  USER_EXISTS_ERROR_MESSAGE
} from "./constants"

const handleErrorMessage = (errorStatusCode, setErrorMessage) => {
  if (errorStatusCode === 400) {
    setErrorMessage(INVALID_DATA_ERROR_MESSAGE);
  } else if (errorStatusCode === 401) {
    setErrorMessage(INVALID_CREDENTIALS_ERROR_MESSAGE);
  } else if (errorStatusCode === 409) {
    setErrorMessage(USER_EXISTS_ERROR_MESSAGE);
  } else {
    setErrorMessage(INTERNAL_SERVER_ERROR_MESSAGE);
  }
};

export default handleErrorMessage;
