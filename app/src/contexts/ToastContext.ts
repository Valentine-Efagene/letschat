import { createContext, Dispatch, SetStateAction, useState } from 'react';

//https://itnext.io/react-context-and-hooks-pass-data-and-update-it-easily-d2f659cceab
/**
 * @param {{show: boolean, message: string, type: string}} alertState
 * @param {(alertState)=>void} setAlertState
 */

const SUCCESS = 'success';
const ERROR = 'error';

interface IToastState {
  show: boolean;
  title: string | null;
  message: string | null;
  type: string;
  delay: number;
}

// const [toastState, setToastState] = useState<IToastState>({
//   show: false,
//   title: null,
//   message: null,
//   type: SUCCESS,
//   delay: 3000,
// });

const ToastContext = createContext<{ toastState: IToastState | undefined, setToastState: Dispatch<SetStateAction<IToastState>> | undefined }>({
  toastState: undefined,
  setToastState: undefined,
});

export type { IToastState }
export { ToastContext, SUCCESS, ERROR };
