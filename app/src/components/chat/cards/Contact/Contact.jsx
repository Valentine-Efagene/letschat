import React from 'react';
import styles from './Contact.module.css';
import { userProp } from '../../../../prop-types/user';
import { bool, func, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Avatar from '../../../common/Avatar/Avatar';

Contact.propTypes = {
  user: userProp,
  onClick: func,
  isTarget: bool,
  to: string,
  online: bool,
  snippet: string,
};

export default function Contact({ isTarget, user, onClick, online, snippet }) {
  const { firstName, lastName, id } = user ?? {};
  const { typing } = useSelector(state => state.message);

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
        <FontAwesomeIcon icon={faKeyboard} />
      ) : (
        <div className={styles.snippet}>{snippet}</div>
      )}
    </div>
  );
}
