import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { fetchUserById } from '../../../redux/user/user.api';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import NavLink from '../../common/NavLink/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faHome } from '@fortawesome/free-solid-svg-icons';

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
      <div className={styles.links}>
        <NavLink className={styles.navLink} to="/">
          <FontAwesomeIcon className={styles.icon} icon={faHome} />
        </NavLink>
        <NavLink className={styles.navLink} to="/contacts">
          <FontAwesomeIcon icon={faAddressBook} className={styles.icon} />
        </NavLink>
      </div>
      <Avatar user={target} />
    </div>
  );
}
