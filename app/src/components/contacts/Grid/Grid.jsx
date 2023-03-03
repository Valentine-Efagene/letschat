import React from 'react';
import { usersProp } from '../../../prop-types/user';
import { addContactThunk } from '../../../redux/user/user.slice';
import styles from './Grid.module.css';

Grid.propTypes = {
  contacts: usersProp,
};

export default function Grid({ contacts }) {
  const handleChat = async id => {
    await addContactThunk(id);
  };

  return (
    <div className={styles.container}>
      {contacts?.map(contact => {
        if (contact == null) return;

        const { id, avatar, email, firstName, lastName } = contact;

        return (
          <div key={id} className={styles.card}>
            <img className={styles.avatar} src={`${avatar}`} alt="" />
            <div>{email}</div>
            <div>{`${firstName} ${lastName}`}</div>
            <button className={styles.cta} onClick={() => handleChat(id)}>
              Add Contact
            </button>
          </div>
        );
      })}
    </div>
  );
}
