import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './SignUp.module.css';

export default function SignUp() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <form>
      <h2>Get Started</h2>
      <label>
        <TextField
          variant="rounded"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
      </label>
      <label>
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
