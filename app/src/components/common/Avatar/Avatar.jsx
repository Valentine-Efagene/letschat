import React from 'react';
import { userProp } from '../../../prop-types/user';
import { Link } from 'react-router-dom';
import styles from './Avatar.module.css';
import { object, string } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

Avatar.propTypes = {
  user: userProp,
  className: string,
  style: object,
  to: string,
};

export default function Avatar({ user, className, style, to }) {
  if (user == null) return null;

  const { avatar, firstName, lastName } = user;

  const resolveAvatar = () => {
    if (avatar) {
      return <img src={avatar} alt="" />;
    }

    if (firstName && lastName) {
      return (
        <div className={styles.initials}>{`${firstName?.[0] ?? ''}${
          lastName?.[0] ?? ''
        }`}</div>
      );
    }

    return <FontAwesomeIcon icon={faUser} />;
  };

  return (
    <Link to={to} style={style} className={`${className} ${styles.container}`}>
      {resolveAvatar()}
    </Link>
  );
}
