import React from 'react';
import { userProp, usersProp } from '../../../prop-types/user';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './List.module.css';

List.propTypes = {
  users: usersProp,
  user: userProp,
  handleAddContact: func,
};

export default function List({ user, users, handleAddContact }) {
  return (
    <div className={styles.container}>
      {users?.map(_user => {
        if (_user == null) return;

        const isContact = user?.contacts?.find(
          contactId => _user.id === contactId,
        );

        const { id, firstName, lastName, avatar, email } = _user;

        return (
          <div key={id} className={styles.card}>
            <img className={styles.avatar} src={`${avatar}`} alt="" />
            <div className={styles.nameNEmail}>
              <div className={styles.email}>{email}</div>
              <div className={styles.name}>{`${firstName} ${lastName}`}</div>
            </div>
            {isContact ? (
              <Link to={`/chat/${id}`}>Chat</Link>
            ) : (
              <button
                className={styles.cta}
                onClick={() => handleAddContact(id)}>
                Add to Contacts
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
