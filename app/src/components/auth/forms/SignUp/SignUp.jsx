import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SUCCEEDED } from '../../../../Helpers/loadingStates';
import { signUpThunk } from '../../../../redux/user/user.slice';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await dispatch(signUpThunk(data));

      if (status === SUCCEEDED) {
        navigate('/chat');
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2>Get Started</h2>
      <label>
        Email
        <TextField
          variant="rounded"
          type="email"
          name="email"
          value={data.email}
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
          value={data.password}
        />
      </label>
      <Button type="submit">SignUp</Button>
      <Link to={'/auth/login'} className={styles.signInLink}>
        Already have an account
      </Link>
    </form>
  );
}
