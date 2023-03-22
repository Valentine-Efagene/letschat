import React from 'react';
import { IUser } from '../../../types/user';
import { Link } from 'react-router-dom';
import styles from './Grid.module.css';
import { func } from 'prop-types';
import { useDispatch } from 'react-redux';
import { setTarget } from '../../../redux/message/message.slice';
import Avatar from '../../common/Avatar/Avatar';

interface IGridProps {
  users: IUser[];
  user: IUser | null;
  handleAddContact: (contactId: string) => void;
}

export default function Grid({ user, users, handleAddContact }: IGridProps) {
  return (
    <div className={styles.container}>
      {users?.map(_user => {
        if (_user == null) return;

        const isContact = user?.contacts?.find(
          contactId => _user.id === contactId,
        );
        const dispatch = useDispatch();

        const { id, email, firstName, lastName } = _user;

        return (
          <div key={id} className={styles.card}>
            <Avatar user={_user} />
            <div className={styles.text}>{email}</div>
            <div className={styles.text}>{`${firstName ?? ''} ${
              lastName ?? ''
            }`}</div>
            {isContact ? (
              <Link
                to="/chat"
                onClick={() => {
                  dispatch(setTarget(id));
                }}>
                Chat
              </Link>
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
