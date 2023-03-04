import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Message.module.css';

import { bool, func } from 'prop-types';
import { messageProp } from '../../../../prop-types/message';

Message.propTypes = {
  message: messageProp,
  onClick: func,
  isLastMessage: bool,
};

export default function Message({ message, isLastMessage }) {
  const { user } = useSelector(state => state.user);
  const { text, sender, receiver, photos } = message;

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLastMessage) {
        // 👇️ scroll to bottom every time messages change
        ref.current
          .scrollIntoView
          //{ behavior: 'smooth' }
          ();
      }

      return clearTimeout(timeout);
    }, 100);
  });

  const ref = useRef();

  return (
    <div
      ref={ref}
      className={`${user?.id === sender ? styles.sender : styles.receiver} ${
        styles.container
      }`}>
      <p>{text}</p>
    </div>
  );
}
