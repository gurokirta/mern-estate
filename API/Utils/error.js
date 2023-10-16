export const errorHandler = (statusCode, message) => {
  //! ვქმნით ერორს
  const error = new Error();
  //! თუ error-ში გვაქვს statusCode მას მნიშნველობას ვუცვლით არგუმენტიდან მიღებული statusCode-ით
  error.statusCode = statusCode;
  //! თუ error-ში გვაქვს message მას მნიშნველობას ვუცვლით არგუმენტიდან მიღებული message-ით
  error.message = message;

  return error;
};
