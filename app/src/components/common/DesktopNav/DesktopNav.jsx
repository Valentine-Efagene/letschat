import { faCommenting } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { string } from 'prop-types';
import React from 'react';
import NavLink from '../NavLink/NavLink';
import styles from './DesktopNav.module.css';

DesktopNav.propTypes = {
  className: string,
};

export default function DesktopNav({ className }) {
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
        <NavLink to="/auth" className={styles.navButton}>
          Login
        </NavLink>
      </div>
    </nav>
  );
}
