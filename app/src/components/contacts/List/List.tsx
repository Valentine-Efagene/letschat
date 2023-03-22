import React from 'react';
import { IUser } from '../../../types/user';
import { Link } from 'react-router-dom';
import styles from './List.module.css';
import { useDispatch } from 'react-redux';
import { setTarget } from '../../../redux/message/message.slice';
import Avatar from '../../common/Avatar/Avatar';

interface IListProps {
  users: IUser[];
  user: IUser | null;
  handleAddContact: (contactId: string) => void;
}

export default function List({ user, users, handleAddContact }: IListProps) {
  return (
    <div className={styles.container}>
      {users?.map(_user => {
        if (_user == null) return;

        const isContact = user?.contacts?.find(
          contactId => _user.id === contactId,
        );

        const dispatch = useDispatch();

        const { id, firstName, lastName, email } = _user;

        return (
          <div key={id} className={styles.card}>
            <Avatar user={_user} />
            <div className={styles.nameNEmail}>
              <div className={styles.email}>{email}</div>
              <div className={styles.name}>{`${firstName ?? ''} ${
                lastName ?? ''
              }`}</div>
            </div>
            {isContact ? (
              <Link
                className={styles.cta}
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
