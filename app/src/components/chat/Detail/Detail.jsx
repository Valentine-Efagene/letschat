import React from 'react';
import Header from '../../messages/Header/Header';
import MessageForm from '../forms/Message';
import Messages from '../lists/Messages/Messages';
import styles from './Detail.module.css';

export default function Detail() {
  return (
    <div className={styles.container}>
      <Header />
      <Messages />
      <MessageForm />
    </div>
  );
}
