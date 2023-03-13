import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { fetchUserById } from '../../../redux/user/user.api';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import NavLink from '../../common/NavLink/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

export default function Header() {
  const [targetUserData, setTargetUserData] = useState();
  const { setToastState } = useContext(ToastContext);
  const { peers, target } = useSelector(state => state.message);

  useEffect(() => {
    fetchUserById(target)
      .then(result => {
        setTargetUserData(result);
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
  }, [target]);

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
        {peers?.find(peer => peer === target) && (
          <div className={styles.online}>Online</div>
        )}
        <Avatar user={targetUserData} />
      </div>
    </div>
  );
}
