import { FaLongArrowAltRight } from 'react-icons/fa';
import React from 'react';
import styles from './Hero.module.css';
import heroImage from '../../../assets/img/hero.jpg';

interface IHeroProps {
  className?: string;
}

/**
 * @example
 * @returns
 */

export default function Hero({ className }: IHeroProps) {
  return (
    <div className={`${className} ${styles.container}`}>
      <div className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.headline}>LetsChat</h2>
          <p className={styles.subHeadline}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo rerum
            qui optio quibusdam debitis animi.
          </p>
          <button className={styles.cta}>
            Explore <FaLongArrowAltRight className={styles.icon} />
          </button>
        </div>
        <div className={styles.right}>
          <img className={styles.img} src={heroImage} alt="" />
        </div>
      </div>
    </div>
  );
}
