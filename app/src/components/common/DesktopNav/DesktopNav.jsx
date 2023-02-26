import { faCommenting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string } from 'prop-types';
import React, { useContext, useState } from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './DesktopNav.module.css';
import Profile from '../forms/Profile/Profile';
import UserContext from '../../../contexts/userContext';

DesktopNav.propTypes = {
  className: string,
};

export default function DesktopNav({ className }) {
  const [showProfile, setShowProfile] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleShowProfile = () => setShowProfile(prevState => !prevState);

  const logout = () => {
    localStorage.clear();
    setUser(null);
    toggleShowProfile();
  };

  return (
    <nav className={`${className} ${styles.container}`}>
      <FontAwesomeIcon icon={faCommenting} size="3x" className={styles.logo} />
      <div className={styles.navItemsWrapper}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/chat" className={styles.navButton}>
          Chat
        </NavLink>
        <NavLink to="/about" className={styles.navButton}>
          About
        </NavLink>
        <NavLink to="/auth/login" className={styles.navButton}>
          Login
        </NavLink>
        {user && (
          <div className={styles.profile}>
            <button onClick={toggleShowProfile} className={styles.avatar}>
              <img src={user?.avatar} />
            </button>
            {showProfile && (
              <div className={styles.form}>
                <Profile />
                <button className={styles.logout} onClick={logout}>
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
