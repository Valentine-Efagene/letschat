import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Message.module.css';

import { bool, func, number } from 'prop-types';
import { messageProp } from '../../../../prop-types/message';

Message.propTypes = {
  message: messageProp,
  onClick: func,
  isLastMessage: bool,
  isFirstMessage: bool,
};

export default function Message({ message, isLastMessage }) {
  const { user } = useSelector(state => state.user);
  const { text, sender, images } = message;

  useEffect;

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
  }, []);

  const ref = useRef();

  return (
    <div
      ref={ref}
      className={`${user?.id === sender ? styles.sender : styles.receiver} ${
        styles.container
      }`}>
      <p>{text ?? ''}</p>
      {images?.length > 0 && (
        <div className={styles.images}>
          <hr />
          {images?.map(img => (
            <a
              className={styles.imageWrapper}
              key={img}
              href={img}
              target="_blank"
              rel="noreferrer">
              <img src={img} alt="" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
