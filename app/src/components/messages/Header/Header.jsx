import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { fetchUserById } from '../../../redux/user/user.api';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import NavLink from '../../common/NavLink/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function Header() {
  const { id } = useParams();
  const [target, setTarget] = useState();
  const { setToastState } = useContext(ToastContext);
  const { peers } = useSelector(state => state.message);

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
            delay: 3600,
            type: ERROR,
          };
        });
      });
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLink className={styles.navLink} to="/">
          <FontAwesomeIcon className={styles.icon} icon={faHome} />
        </NavLink>
        <NavLink className={styles.navLink} to="/users">
          <FontAwesomeIcon icon={faAddressBook} className={styles.icon} />
        </NavLink>
      </div>
      <div className={styles.user}>
        {peers?.find(peer => peer === id) && (
          <div className={styles.online}>Online</div>
        )}
        <Avatar user={target} />
      </div>
    </div>
  );
}
