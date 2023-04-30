import React, { RefObject, useEffect, useRef, useState } from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './DesktopNav.module.css';
import Profile from '../forms/Profile/Profile';
import { useAppSelector } from '../../../redux/hooks';
import { FaComment } from 'react-icons/fa';
import { persistor } from '../../../redux/store';
import useClickOutside from '../../../hooks/useClickOutside';

interface IDesktopNavProps {
  className?: string;
}

export default function DesktopNav({ className }: IDesktopNavProps) {
  const { user } = useAppSelector(state => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const toggleShowProfile = () =>
    setShowProfile(prevState => (hideProfile ? prevState : !prevState));

  const handleLogout = () => {
    persistor.purge();
  };

  const profileRef = useRef<HTMLDivElement>();
  const hideProfile = useClickOutside(profileRef as RefObject<HTMLDivElement>);

  useEffect(() => {
    setShowProfile(prevState => (hideProfile == true ? false : prevState));
  }, [hideProfile, setShowProfile]);

  return (
    <nav className={`${className} ${styles.container}`}>
      {showProfile ? 'True' : 'False'}
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
              <div
                ref={profileRef as RefObject<HTMLDivElement>}
                className={styles.form}>
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
