import React, { useContext, useEffect, useState } from 'react';
import Avatar from '../../common/Avatar/Avatar';
import styles from './Header.module.css';
import { fetchUserById } from '../../../redux/user/user.api';
import { ERROR, ToastContext } from '../../../contexts/ToastContext';
import NavLink from '../../common/NavLink/NavLink';
import { FaAddressBook, FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { fetchByIdThunk } from '../../../redux/user/user.slice';
import { useAppDispatch } from '../../../redux/hooks';

export default function Header() {
  const dispatch = useAppDispatch();
  const [targetUserData, setTargetUserData] = useState();
  const { setToastState } = useContext(ToastContext);
  const { peers, target } = useSelector(state => state.message);

  useEffect(() => {
    const getTarget = async () => {
      try {
        const targetUser = await dispatch(fetchByIdThunk(target)).unwrap();
        setTargetUserData(targetUser);
      } catch (error) {
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
      }
    };

    getTarget();
  }, [target]);

  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <NavLink className={styles.navLink} to="/">
          <FaHome className={styles.icon} />
        </NavLink>
        <NavLink className={styles.navLink} to="/users">
          <FaAddressBook className={styles.icon} />
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
