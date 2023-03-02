import React from 'react';
import { usersProp } from '../../../prop-types/user';
import styles from './Grid.module.css';
const API_BASE_URL = 'http://localhost:3000';

Grid.propTypes = {
  contacts: usersProp,
};

export default function Grid({ contacts }) {
  return (
    <div className={styles.container}>
      {contacts?.map(contact => {
        if (contact == null) return;

        const { id, avatar, email, firstName, lastName } = contact;

        return (
          <div key={id} className={styles.card}>
            <img
              className={styles.avatar}
              src={`${API_BASE_URL}/upload/${avatar}`}
              alt=""
            />
            <div>{email}</div>
            <div>{`${firstName} ${lastName}`}</div>
            <button className={styles.cta}>Chat</button>
          </div>
        );
      })}
    </div>
  );
}
