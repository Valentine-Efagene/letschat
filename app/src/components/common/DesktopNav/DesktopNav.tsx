import React, { useState } from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './DesktopNav.module.css';
import Profile from '../forms/Profile/Profile';
import { logout } from '../../../redux/user/user.slice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { FaComment } from 'react-icons/fa';

interface IDesktopNavProps {
  className?: string;
}

export default function DesktopNav({ className }: IDesktopNavProps) {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const toggleShowProfile = () => setShowProfile(prevState => !prevState);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`${className} ${styles.container}`}>
      <FaComment className={styles.logo} />
      <div className={styles.navItemsWrapper}>
        <NavLink to="/">Home</NavLink>
        {user != null && (
          <>
            <NavLink to="/chat" className={styles.navButton}>
              Chat
            </NavLink>
            <NavLink to="/users" className={styles.navButton}>
              Contacts
            </NavLink>
            <NavLink to="/profile" className={styles.navButton}>
              Profile
            </NavLink>
          </>
        )}
        <NavLink to="/about" className={styles.navButton}>
          About
        </NavLink>
        {user == null && (
          <NavLink to="/auth/login" className={styles.navButton}>
            Login
          </NavLink>
        )}
        {user && (
          <div className={styles.profile}>
            <button onClick={toggleShowProfile} className={styles.avatar}>
              <img src={user?.avatar} />
            </button>
            {showProfile && (
              <div className={styles.form}>
                <Profile />
                <button className={styles.logout} onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
