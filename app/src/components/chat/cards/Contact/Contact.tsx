import React, { MouseEventHandler } from 'react';
import styles from './Contact.module.css';
import { FaKeyboard } from 'react-icons/fa';
import Avatar from '../../../common/Avatar/Avatar';
import { IUser } from '../../../../types/user';
import { useAppSelector } from '../../../../redux/hooks';

interface IContact {
  user: IUser;
  onClick: MouseEventHandler;
  isTarget: boolean;
  to: string;
  online: boolean;
  snippet: string;
}

export default function Contact({
  isTarget,
  user,
  onClick,
  online,
  snippet,
}: IContact) {
  const { firstName, lastName, id } = user ?? {};
  const { typing } = useAppSelector(state => state.message);

  return (
    <div
      onClick={onClick}
      className={`${isTarget ? styles.isTarget : null} ${styles.container}`}>
      {online && <div className={styles.onlineIndicator}></div>}
      <Avatar className={styles.avatar} user={user} />
      <div className={styles.name}>{`${firstName ? firstName : ''} ${
        lastName ? lastName : ''
      }`}</div>
      {Array.isArray(typing) && typing?.find(_user => _user === id) ? (
        <FaKeyboard />
      ) : (
        <div className={styles.snippet}>{snippet}</div>
      )}
    </div>
  );
}
