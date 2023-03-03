import React from 'react';
import styles from './Contact.module.css';
import { Link, NavLink } from 'react-router-dom';
import { userProp } from '../../../../prop-types/user';
import { bool, func, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

Contact.propTypes = {
  user: userProp,
  onClick: func,
  isTarget: bool,
  to: string,
};

export default function Contact({ isTarget, to, user, onClick }) {
  const { avatar, firstName, lastName, snippet } = user ?? {};

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${isTarget ? styles.isTarget : null} ${styles.container}`}>
      <div className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt="" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </div>
      <div className={styles.name}>{`${firstName ? firstName : ''} ${
        lastName ? lastName : ''
      }`}</div>
      <div className={styles.snippet}>{snippet}</div>
    </Link>
  );
}
