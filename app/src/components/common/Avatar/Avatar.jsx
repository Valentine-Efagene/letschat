import React from 'react';
import { userProp } from '../../../prop-types/user';
import { Link } from 'react-router-dom';
import styles from './Avatar.module.css';
import { object, string } from 'prop-types';

Avatar.propTypes = {
  user: userProp,
  className: string,
  style: object,
};

export default function Avatar({ user, className, style }) {
  if (user == null) return null;

  const { avatar, firstName, lastName } = user;

  return (
    <Link style={style} className={`${className} ${styles.container}`}>
      {avatar ? (
        <img src={avatar} alt="" />
      ) : (
        `${firstName?.[0]}${lastName?.[0]}`
      )}
    </Link>
  );
}
