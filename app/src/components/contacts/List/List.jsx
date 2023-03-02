import React from 'react';
import { usersProp } from '../../../prop-types/user';
import styles from './List.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = 'http://localhost:3000';

List.propTypes = {
  contacts: usersProp,
};

export default function List({ contacts }) {
  return (
    <div className={styles.container}>
      {contacts?.map(contact => {
        if (contact == null) return;

        const { id, firstName, lastName, avatar, email } = contact;

        return (
          <div key={id} className={styles.card}>
            <img
              className={styles.avatar}
              src={`${API_BASE_URL}/upload/${avatar}`}
              alt=""
            />
            <div className={styles.nameNEmail}>
              <div className={styles.email}>{email}</div>
              <div className={styles.name}>{`${firstName} ${lastName}`}</div>
            </div>
            <button className={styles.cta}>
              Chat{' '}
              <FontAwesomeIcon
                className={styles.icon}
                icon={faArrowRightLong}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
