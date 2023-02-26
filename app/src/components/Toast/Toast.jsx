import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, number, oneOf, string } from 'prop-types';
import React, { useEffect } from 'react';
import { ERROR, SUCCESS } from '../../contexts/ToastContext';
import styles from './Toast.module.css';

Toast.propTypes = {
  message: string,
  title: string,
  show: bool,
  onClose: func,
  delay: number,
  type: oneOf([SUCCESS, ERROR]),
};

export default function Toast({ message, title, show, onClose, delay, type }) {
  useEffect(() => {
    if (delay == null) {
      return;
    }

    setTimeout(() => {
      onClose();
    }, delay);
  }, [show]);

  const typeMap = {
    [SUCCESS]: styles.success,
    [ERROR]: styles.error,
  };

  return (
    <div
      className={`${typeMap[type]} ${show ? styles.in : styles.out} ${
        styles.container
      }`}>
      <div className={styles.top}>
        <h4 className={styles.title}>{title}</h4>
        <button className={styles.close} onClick={onClose}>
          <FontAwesomeIcon icon={faClose} />
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
}
