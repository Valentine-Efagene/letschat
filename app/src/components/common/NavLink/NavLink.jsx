import React from 'react';
import styles from './NavLink.module.css';
import { NavLink as Link } from 'react-router-dom';
import { bool, node, oneOfType, string } from 'prop-types';

NavLink.propTypes = {
  className: string,
  isActive: bool,
  children: oneOfType([node, string]),
  to: string,
};

export default function NavLink({ to, className, isActive, children }) {
  return (
    <Link
      to={to}
      className={`${isActive ? styles.active : null} ${className} ${
        styles.container
      }`}>
      {children}
      <hr />
    </Link>
  );
}
