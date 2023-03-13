import React from 'react';
import styles from './Contact.module.css';
import { Link } from 'react-router-dom';
import { userProp } from '../../../../prop-types/user';
import { bool, func, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

Contact.propTypes = {
  user: userProp,
  onClick: func,
  isTarget: bool,
  to: string,
  online: bool,
};

export default function Contact({ isTarget, to, user, onClick, online }) {
  const { avatar, firstName, lastName, snippet, id } = user ?? {};
  const { typing } = useSelector(state => state.message);

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${isTarget ? styles.isTarget : null} ${styles.container}`}>
      <div className={styles.avatar}>
        {online && (
          <div
            className={styles.onlineIndicator}
            style={isTarget ? { backgroundColor: '#ffffff' } : {}}></div>
        )}
        {avatar ? (
          <img src={avatar} alt="" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className={styles.name}>{`${firstName ? firstName : ''} ${
        lastName ? lastName : ''
      }`}</div>
      {/* <div className={styles.snippet}>{snippet}</div> */}
      {Array.isArray(typing) && typing?.find(_user => _user === id) ? (
        <FontAwesomeIcon icon={faKeyboard} />
      ) : null}
    </Link>
  );
}
