import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { fetchUserById } from '../../../redux/user/user.api';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';

export default function Header() {
  const { id } = useParams();
  const [target, setTarget] = useState();
  const { setToastState } = useContext(ToastContext);

  useEffect(() => {
    fetchUserById(id)
      .then(result => {
        setTarget(result);
      })
      .catch(error => {
        setToastState(prevState => {
          return {
            ...prevState,
            show: error != null,
            message: error?.message,
            title: error?.code,
            delay: 3000,
            type: ERROR,
          };
        });
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <Avatar user={target} />
    </div>
  );
}
