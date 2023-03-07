import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './Message.module.css';

import { bool, func, number } from 'prop-types';
import { messageProp } from '../../../../prop-types/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { byteFormatter } from '../../../../Helpers/formatters';

Message.propTypes = {
  message: messageProp,
  onClick: func,
  isLastMessage: bool,
  isFirstMessage: bool,
};

export default function Message({ message, isLastMessage }) {
  const { user } = useSelector(state => state.user);
  const { text, sender, files } = message;

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
      {files?.length > 0 && (
        <div className={styles.files}>
          <hr />
          {files?.map(file => {
            const { path, mimeType, size, id } = file;

            return (
              <a
                className={styles.fileWrapper}
                key={id}
                href={path}
                target="_blank"
                rel="noreferrer">
                {mimeType === 'application/pdf' && (
                  <FontAwesomeIcon size="10x" color="cadetblue" icon={faFile} />
                )}
                {mimeType.split('/').includes('image') && (
                  <img src={path} alt="" />
                )}
                <div className={styles.size}>{byteFormatter.format(size)}</div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
