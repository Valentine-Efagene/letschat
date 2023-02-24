import React from 'react';
import LoginForm from '../../components/auth/forms/Login';
import styles from './Auth.module.css';

export default function Auth() {
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
}
