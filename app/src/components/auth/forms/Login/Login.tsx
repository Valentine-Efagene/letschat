import React, {
  ChangeEventHandler,
  FormEventHandler,
  useContext,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PENDING } from '../../../../helpers/loadingStates';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './Login.module.css';
import { signInThunk } from '../../../../redux/user/user.slice';
import {
  ERROR,
  IToastState,
  ToastContext,
} from '../../../../contexts/ToastContext';
import { FaSpinner } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const { toastState, setToastState } = useContext(ToastContext);
  const { status, error } = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler = event => {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setCredentials(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit: FormEventHandler = e => {
    e.preventDefault();
    try {
      dispatch(signInThunk(credentials)).then(res => {
        setToastState!(prevState => {
          return {
            ...prevState,
            show: error != null,
            message: error?.message,
            title: error?.code,
            delay: 3600,
            type: ERROR,
          };
        });

        if (res?.type !== 'user/signIn/rejected') {
          navigate('/chat');
        }
      });
    } catch (err) {
      const error = err as { message: string; code: string };

      setToastState!(prevState => {
        return {
          ...prevState,
          show: true,
          message: error?.message,
          title: error?.code,
          delay: 3600,
          type: ERROR,
        } as IToastState;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Welcome Back</h2>
      <label>
        Email
        <TextField
          variant="rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <TextField
          onChange={handleChange}
          variant="rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
        />
      </label>
      <Button type="submit">Login {status === PENDING && <FaSpinner />}</Button>
      <Link to={'/auth/signup'} className={styles.signInLink}>
        Create an account
      </Link>
    </form>
  );
}
