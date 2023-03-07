import { faCommenting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string } from 'prop-types';
import React, { useState } from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './DesktopNav.module.css';
import Profile from '../forms/Profile/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/user/user.slice';
import { useParams } from 'react-router-dom';

DesktopNav.propTypes = {
  className: string,
};

export default function DesktopNav({ className }) {
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.user);
  const [showProfile, setShowProfile] = useState(false);

  const toggleShowProfile = () => setShowProfile(prevState => !prevState);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`${className} ${styles.container}`}>
      <FontAwesomeIcon icon={faCommenting} size="3x" className={styles.logo} />
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
