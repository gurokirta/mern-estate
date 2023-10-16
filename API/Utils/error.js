export const errorHandler = (statusCode, message) => {
  //! ვქმნით ერორს
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;

  return error;
};
