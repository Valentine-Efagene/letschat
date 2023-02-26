import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//import { postData } from '../../../../Helpers/requests';
import axios from 'axios';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './Login.module.css';

export default function Login() {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setPayload(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const {
        data: { accessToken, refreshToken, id },
      } = await axios.post('http://localhost:3000/auth', payload);

      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('refresh-token', refreshToken);
      localStorage.setItem('user-id', id);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
          value={payload.email}
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
          value={payload.password}
        />
      </label>
      <Button type="submit">
        Login {isLoading && <FontAwesomeIcon icon={faSpinner} />}
      </Button>
      <Link to={'/auth/signup'} className={styles.signInLink}>
        Create an account
      </Link>
    </form>
  );
}
