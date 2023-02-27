import React from 'react';
import styles from './Contact.module.css';
import { NavLink } from 'react-router-dom';
import { userProp } from '../../../../prop-types/user';
import { func } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

Contact.propTypes = {
  user: userProp,
  onClick: func,
};

export default function Contact({ user, onClick }) {
  const { avatar, firstName, lastName, snippet } = user ?? {};

  return (
    <div onClick={onClick} className={styles.container}>
      <NavLink className={styles.avatar}>
        {avatar ? (
          <img src={avatar} alt="" />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </NavLink>
      <div className={styles.name}>{`${firstName ? firstName : ''} ${
        lastName ? lastName : ''
      }`}</div>
      <div className={styles.snippet}>{snippet}</div>
    </div>
  );
}
