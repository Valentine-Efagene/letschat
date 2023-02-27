import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PENDING, SUCCEEDED } from '../../../../Helpers/loadingStates';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './Login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { signInThunk } from '../../../../redux/auth/auth.slice';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { status } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setCredentials(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(signInThunk(credentials));

      if (status === SUCCEEDED) {
        navigate('/chat');
      }
    } catch (error) {}
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
