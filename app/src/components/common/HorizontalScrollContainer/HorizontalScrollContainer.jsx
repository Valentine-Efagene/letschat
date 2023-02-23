import React from 'react';
import styles from './HorizontalScrollContainer.module.css';
import { node, object, string } from 'prop-types';
import {
  canScrollLeft,
  canScrollRight,
  scrollPickerLeft,
  scrollPickerRight,
  transformScroll,
} from '../../../Helpers/domPhysics';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

HorizontalScrollContainer.propTypes = {
  children: node,
  className: string,
  listClassName: string,
  style: object,
  shouldTransformScroll: false,
};

export default function HorizontalScrollContainer({
  children,
  className,
  style,
  shouldTransformScroll = false,
}) {
  const containerRef = useRef();
  const leftButtonRef = useRef();
  const rightButtonRef = useRef();

  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  const handleScroll = e => {
    setCanGoLeft(canScrollLeft(e.currentTarget));
    setCanGoRight(canScrollRight(e.currentTarget));
  };

  useEffect(() => {
    if (shouldTransformScroll) {
      // Using the element's onWheel has glitches
      containerRef?.current?.addEventListener('wheel', transformScroll);
      containerRef?.current?.addEventListener('scroll', handleScroll);
    }

    // Set up scroll buttons
    setCanGoLeft(canScrollLeft(containerRef?.current));
    setCanGoRight(canScrollRight(containerRef?.current));

    // If we use absolute positioning on the buttons, and no relative on the container
    // if (leftButtonRef != null && rightButtonRef != null) {
    //   const top = getTopRelativeToDOM(containerRef.current);
    //   const posY = top + containerRef.current.offsetHeight / 2;
    //   leftButtonRef.current.style.top = posY + 'px';
    //   rightButtonRef.current.style.top = posY + 'px';
    // }

    return () => {
      if (shouldTransformScroll) {
        containerRef?.current?.removeEventListener('wheel', transformScroll);
        containerRef?.current?.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const goLeft = () => {
    if (containerRef == null) return;

    scrollPickerLeft(containerRef?.current);
  };

  const goRight = () => {
    if (containerRef == null) return;

    scrollPickerRight(containerRef?.current);
  };

  return (
    <div
      style={style}
      ref={containerRef}
      className={`${className} ${styles.container}`}>
      <button
        ref={leftButtonRef}
        disabled={!canGoLeft}
        className={`${styles.left} ${styles.move}`}
        onClick={goLeft}>
        <FontAwesomeIcon icon={faChevronLeft} className={styles.chevron} />
      </button>
      {children}
      <button
        ref={rightButtonRef}
        disabled={!canGoRight}
        className={`${styles.right} ${styles.move}`}
        onClick={goRight}>
        <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
      </button>
    </div>
  );
}
