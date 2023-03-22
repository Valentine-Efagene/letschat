import React from 'react';
import styles from './Footer.module.css';
import { FaReact } from 'react-icons/fa';

Footer.propTypes = {};

export default function Footer({}) {
  return (
    <div className={styles.container}>
      <div className={styles.socials}>
        <FaReact />
      </div>
    </div>
  );
}
