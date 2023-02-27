import React from 'react';
import MessageForm from '../forms/Message';
import Messages from '../lists/Messages/Messages';
import styles from './Detail.module.css';

export default function Detail() {
  return (
    <div className={styles.container}>
      <Messages />
      <MessageForm />
    </div>
  );
}
