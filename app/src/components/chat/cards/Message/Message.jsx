import React, { useContext } from 'react';
import styles from './Message.module.css';

import { func } from 'prop-types';
import { messageProp } from '../../../../prop-types/message';
import UserContext from '../../../../contexts/UserContext';

Message.propTypes = {
  message: messageProp,
  onClick: func,
};

export default function Message({ message }) {
  const { user } = useContext(UserContext);
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
