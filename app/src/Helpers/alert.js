/**
 *
 * Information
 *
 * In this system, when the error callback of the request has data, it signifies validation error
 * However, if the error is from logic, it is usually returned as error_message as a flash
 *
 */

import _ from 'lodash';

const SUCCESS = 'success';
const ERROR = 'error';
const VALIDATION_ERROR = 'Validation Error';
const UNKNOWN_ERROR = 'Something went wrong';

const getTypeFromResult = result => {
  if (result?.errors && !_.isEmpty(result?.errors)) {
    return ERROR;
  }

  if (result?.props?.flash?.success_message) {
    return SUCCESS;
  } else if (result?.props?.flash?.error_message) {
    return ERROR;
  }
  return undefined;
};

const getMessageFromResult = result => {
  if (result?.errors && !_.isEmpty(result?.errors)) {
    return VALIDATION_ERROR;
  }

  return (
    result?.props?.flash?.success_message ?? result?.props?.flash?.error_message
  );
};

export {
  SUCCESS,
  ERROR,
  VALIDATION_ERROR,
  UNKNOWN_ERROR,
  getTypeFromResult,
  getMessageFromResult,
};
