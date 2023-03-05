import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PENDING, SUCCEEDED } from '../../../../Helpers/loadingStates';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../../../../redux/user/user.slice';
import { ERROR, ToastContext } from '../../../../contexts/ToastContext';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { setToastState } = useContext(ToastContext);
  const { status, error } = useSelector(state => state.user);
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setCredentials(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    try {
      dispatch(signInThunk(credentials)).then(res => {
        setToastState(prevState => {
          return {
            ...prevState,
            show: error != null,
            message: error?.message,
            title: error?.code,
            delay: 3000,
            type: ERROR,
          };
        });

        if (res?.type !== 'user/signIn/rejected') {
          navigate('/chat');
        }
      });
    } catch (error) {
      setToastState(prevState => {
        return {
          ...prevState,
          show: true,
          message: error?.message,
          title: error?.code,
          delay: 3000,
          type: ERROR,
        };
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
      <Button type="submit">
        Login {status === PENDING && <FontAwesomeIcon icon={faSpinner} />}
      </Button>
      <Link to={'/auth/signup'} className={styles.signInLink}>
        Create an account
      </Link>
    </form>
  );
}
