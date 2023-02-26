import React from 'react';
import styles from './QuickProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { bool, func, string } from 'prop-types';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Profile from '../../common/forms/Profile';

QuickProfile.propTypes = {
  className: string,
  hide: func,
  show: bool,
};

export default function QuickProfile({ className, hide, show }) {
  return (
    <div
      className={`${show ? styles.in : styles.out} ${className} ${
        styles.container
      }`}>
      <div className={styles.top}>
        <button onClick={hide} className={styles.back}>
          <FontAwesomeIcon className={styles.icon} icon={faArrowLeftLong} />
        </button>
      </div>
      <Profile />
    </div>
  );
}
