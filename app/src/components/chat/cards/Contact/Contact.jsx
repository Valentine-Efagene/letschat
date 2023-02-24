import React from 'react';
import styles from './Contact.module.css';
import { NavLink } from 'react-router-dom';
import { UserProp } from '../../../../propTypes/user';

Contact.propTypes = {
  user: UserProp,
};

export default function Contact({ user }) {
  const { avatar, firstName, lastName, snippet } = user;

  return (
    <div className={styles.container}>
      <NavLink className={styles.avatar}>
        <img src={avatar} alt="" />
      </NavLink>
      <div>{`${firstName} ${lastName}`}</div>
      <div>{snippet}</div>
    </div>
  );
}
