import React from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';

export default function Header() {
  const { id } = useParams();
  const { user } = useSelector(state => state.user);
  const target = user?.contacts?.find(({ id: userId }) => id === userId);

  return (
    <div className={styles.container}>
      <Avatar user={target} />
    </div>
  );
}
