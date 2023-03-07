import { node, string } from 'prop-types';
import React from 'react';
import DesktopNav from '../../common/DesktopNav/DesktopNav';
import Footer from '../../common/Footer/Footer';
import styles from './Layout.module.css';

Layout.propTypes = {
  className: string,
  children: node,
};

export default function Layout({ className, children }) {
  return (
    <div className={`${className} ${styles.container}`}>
      <DesktopNav className={styles.nav} />
      {children}
      <Footer />
    </div>
  );
}
