import React from 'react';
import styles from './QuickProfile.module.css';
import { bool, func, string } from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';
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
          <FaArrowLeft className={styles.icon} />
        </button>
      </div>
      <Profile />
    </div>
  );
}
