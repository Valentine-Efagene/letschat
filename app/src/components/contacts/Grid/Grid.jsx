import React, { useContext } from 'react';
import { usersProp } from '../../../prop-types/user';
import { addContactThunk } from '../../../redux/user/user.slice';
import { Link } from 'react-router-dom';
import styles from './Grid.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { ToastContext, ERROR } from '../../../contexts/ToastContext';

Grid.propTypes = {
  users: usersProp,
};

export default function Grid({ users }) {
  const dispatch = useDispatch();
  const { setToastState } = useContext(ToastContext);
  const { user, error } = useSelector(state => state.user);

  const handleAddContact = async id => {
    await dispatch(addContactThunk(id));

    setToastState(prevState => {
      return {
        ...prevState,
        show: error != null,
        message: error?.message,
        title: error?.code,
        delay: 3000,
        type: ERROR,
      };
    });
  };

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
