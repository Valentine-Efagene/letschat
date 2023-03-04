function CustomException(message, code) {
  Error.call(this, message);
  this.message = message;
  this.code = code;
}

Object.setPrototypeOf(CustomException.prototype, Error.prototype);

export { CustomException };
