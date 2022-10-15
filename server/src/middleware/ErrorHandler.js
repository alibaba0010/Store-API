class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const createCustomError = (message, statusCode) => {
  return new ErrorHandler(message, statusCode);
};

export { ErrorHandler as default };
