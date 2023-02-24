import React, { useState } from 'react';
import DesktopNav from '../../../common/DesktopNav/DesktopNav';
import Button from '../../../inputs/Button/Button';
import TextField from '../../../inputs/TextField/TextField';
import styles from './Login.module.css';

export default function Login() {
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
    <>
      <DesktopNav className={styles.nav} />
      <form className={styles.container}>
        <label>
          <TextField type="email" name="email" value={data.email} />
        </label>
        <label>
          <TextField type="password" name="password" value={data.password} />
        </label>
        <Button>Login</Button>
      </form>
    </>
  );
}
