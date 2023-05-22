class CustomError extends Error {
    constructor(code, message, additionalData) {
      super(message);
      this.code = code;
      this.additionalData = additionalData;
      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = CustomError;
  