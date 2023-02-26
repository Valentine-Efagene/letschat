import React from 'react';
import styles from './Contact.module.css';
import { NavLink } from 'react-router-dom';
import { UserProp } from '../../../../propTypes/user';
import { func } from 'prop-types';
import placeholder from '../../../../assets/img/avatar.jpg';

Contact.propTypes = {
  user: UserProp,
  onClick: func,
};

export default function Contact({ user, onClick }) {
  const { avatar, firstName, lastName, snippet } = user ?? {};

  return (
    <div onClick={onClick} className={styles.container}>
      <NavLink className={styles.avatar}>
        <img src={avatar ?? placeholder} alt="" />
      </NavLink>
      <div className={styles.name}>{`${firstName ? firstName : ''} ${
        lastName ? lastName : ''
      }`}</div>
      <div className={styles.snippet}>{snippet}</div>
    </div>
  );
}
