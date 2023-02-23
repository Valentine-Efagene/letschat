import { string } from 'prop-types';
import React from 'react';
import HorizontalScrollContainer from '../../common/HorizontalScrollContainer/HorizontalScrollContainer';
import styles from './Features.module.css';

Features.propTypes = {
  className: string,
};

export default function Features({ className }) {
  return (
    <HorizontalScrollContainer
      shouldTransformScroll={false}
      className={`${className} ${styles.features}`}>
      <div className={styles.card}>
        <h2>Library</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button>Get started</button>
      </div>
      <div className={styles.card}>
        <h2>Saved Posts</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button>Get started</button>
      </div>
      <div className={styles.card}>
        <h2>Saved Posts</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button>Get started</button>
      </div>
      <div className={styles.card}>
        <h2>Saved Posts</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        <button>Get started</button>
      </div>
    </HorizontalScrollContainer>
  );
}
