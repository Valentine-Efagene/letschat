import { createContext } from 'react';

//https://itnext.io/react-context-and-hooks-pass-data-and-update-it-easily-d2f659cceab
/**
 * @param {{show: boolean, message: string, type: string}} alertState
 * @param {(alertState)=>void} setAlertState
 */

const SUCCESS = 'success';
const ERROR = 'error';

const ToastContext = createContext({
  toastState: {},
  setToastState: () => {},
});

export { ToastContext, SUCCESS, ERROR };
