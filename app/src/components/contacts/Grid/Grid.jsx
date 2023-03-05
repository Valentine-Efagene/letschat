import React from 'react';
import { userProp, usersProp } from '../../../prop-types/user';
import { Link } from 'react-router-dom';
import styles from './Grid.module.css';
import { func } from 'prop-types';

Grid.propTypes = {
  users: usersProp,
  user: userProp,
  handleAddContact: func,
};

export default function Grid({ user, users, handleAddContact }) {
  return (
    <div className={styles.container}>
      {users?.map(_user => {
        if (_user == null) return;

        const isContact = user?.contacts?.find(
          contactId => _user.id === contactId,
        );

        const { id, avatar, email, firstName, lastName } = _user;

        return (
          <div key={id} className={styles.card}>
            <img className={styles.avatar} src={`${avatar}`} alt="" />
            <div>{email}</div>
            <div>{`${firstName} ${lastName}`}</div>
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
