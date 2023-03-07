import React from 'react';
import styles from './HorizontalScrollContainer.module.css';
import { node, object, string } from 'prop-types';
import {
  canScrollLeft,
  canScrollRight,
  getTopRelativeToDOM,
  overflowingX,
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
  const leftButtonRef = useRef();
  const containerRef = useRef();
  const rightButtonRef = useRef();

  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  const handleScroll = e => {
    setCanGoLeft(canScrollLeft(e.currentTarget));
    setCanGoRight(canScrollRight(e.currentTarget));

    if (rightButtonRef?.current) {
      rightButtonRef.current.style.position = 'sticky';
      leftButtonRef.current.style.position = 'sticky';
    }
  };

  const handleResize = e => {
    handleScroll(containerRef?.current);
    setCanGoRight(overflowingX(containerRef?.current));
  };

  useEffect(() => {
    containerRef?.current?.addEventListener('scroll', handleScroll);
    window?.addEventListener('resize', handleResize);

    if (shouldTransformScroll) {
      // Using the element's onWheel has glitches
      containerRef?.current?.addEventListener('wheel', transformScroll);
    }

    // If we use absolute positioning on the buttons, and no relative on the container

    // const timeout = setTimeout(() => {
    //   if (rightButtonRef?.current != null) {
    //     const top = getTopRelativeToDOM(containerRef.current);
    //     const posY = top + containerRef.current.offsetHeight / 2;
    //     rightButtonRef.current.style.top = posY + 'px';
    //   }

    //   if (leftButtonRef?.current != null) {
    //     const top = getTopRelativeToDOM(containerRef.current);
    //     const posY = top + containerRef.current.offsetHeight / 2;
    //     leftButtonRef.current.style.top = posY + 'px';
    //   }
    // }, 100);

    setCanGoRight(overflowingX(containerRef?.current));

    return () => {
      containerRef?.current?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);

      if (shouldTransformScroll) {
        containerRef?.current?.removeEventListener('wheel', transformScroll);
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
      {canGoLeft && (
        <button
          ref={leftButtonRef}
          disabled={!canGoLeft}
          className={`${styles.left} ${styles.move}`}
          onClick={goLeft}>
          <FontAwesomeIcon icon={faChevronLeft} className={styles.chevron} />
        </button>
      )}
      {children}
      {canGoRight && (
        <button
          ref={rightButtonRef}
          disabled={!canGoRight}
          className={`${styles.right} ${styles.move}`}
          onClick={goRight}>
          <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
        </button>
      )}
    </div>
  );
}
