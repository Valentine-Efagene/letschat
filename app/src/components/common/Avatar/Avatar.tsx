import React from 'react';
import { IUser } from '../../../types/user';
import { Link } from 'react-router-dom';
import styles from './Avatar.module.css';
import { FaUser } from 'react-icons/fa';

interface IAvatarProps {
  user?: IUser;
  className?: string;
  style?: object;
  to?: string;
}

export default function Avatar({ user, className, style, to }: IAvatarProps) {
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

    return <FaUser />;
  };

  return (
    <Link
      to={to ?? ''}
      style={style}
      className={`${className} ${styles.container}`}>
      {resolveAvatar()}
    </Link>
  );
}
