import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Message.module.css';

import { func } from 'prop-types';
import { messageProp } from '../../../../prop-types/message';

Message.propTypes = {
  message: messageProp,
  onClick: func,
};

export default function Message({ message }) {
  const { user } = useSelector(state => state.user);
  const { text, sender, receiver, photos } = message;

  return (
    <div
      className={`${user?.id === sender ? styles.sender : styles.receiver} ${
        styles.container
      }`}>
      <p>{text}</p>
    </div>
  );
}
