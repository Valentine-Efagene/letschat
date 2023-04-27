import React, { ReactNode, RefObject } from 'react';
import styles from './HorizontalScrollContainer.module.css';
import {
  canScrollLeft,
  canScrollRight,
  scrollLeft,
  scrollRight,
  transformScroll,
} from '../../../helpers/domPhysics';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import useElementOnScreen from '../../../hooks/useElementOnScreen';

interface IHorizontalScrollContainerProps {
  children?: ReactNode;
  className?: string;
  scrollerClassName?: string;
  overflowContainerClassName?: string;
  style?: object;
  shouldTransformScroll?: boolean;
}

export default function HorizontalScrollContainer({
  children,
  className,
  style,
  overflowContainerClassName,
  scrollerClassName,
  shouldTransformScroll = false,
}: IHorizontalScrollContainerProps) {
  const leftButtonRef = useRef<HTMLButtonElement>();
  const rightButtonRef = useRef<HTMLButtonElement>();

  const [canGoLeft, setCanGoLeft] = useState(false);
  const [canGoRight, setCanGoRight] = useState(false);

  const [containerRef, isVisible] = useElementOnScreen({
    threshold: 0.1,
  });

  const checkScroll = (e: Event) => {
    setCanGoLeft(canScrollLeft(e.currentTarget as HTMLDivElement));
    setCanGoRight(canScrollRight(e.currentTarget as HTMLDivElement));
  };

  const checkScrollofElement = (e: HTMLDivElement) => {
    setCanGoLeft(canScrollLeft(e));
    setCanGoRight(canScrollRight(e));
  };

  useEffect(() => {
    containerRef?.current?.addEventListener('scroll', checkScroll);

    if (shouldTransformScroll) {
      // Using the element's onWheel has glitches
      containerRef?.current?.addEventListener('wheel', transformScroll);
    }

    return () => {
      containerRef?.current?.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);

      if (shouldTransformScroll) {
        containerRef?.current?.removeEventListener('wheel', transformScroll);
      }
    };
  }, []);

  useEffect(() => {
    checkScrollofElement(containerRef?.current as HTMLDivElement);
  }, [isVisible]);

  const goLeft = () => {
    if (containerRef == null) return;

    scrollLeft(containerRef?.current as HTMLDivElement);
  };

  const goRight = () => {
    if (containerRef == null) return;

    scrollRight(containerRef?.current as HTMLDivElement);
  };

  return (
    <div style={style} className={`${className} ${styles.container}`}>
      <button
        ref={leftButtonRef as RefObject<HTMLButtonElement>}
        disabled={!canGoLeft}
        className={`${styles.left} ${styles.move}`}
        onClick={goLeft}>
        <FaChevronLeft className={styles.chevron} />
      </button>

      <div
        className={`${scrollerClassName} ${styles.scroller}`}
        ref={containerRef as RefObject<HTMLDivElement>}>
        <div
          className={`${overflowContainerClassName} ${styles.overflowContainer}`}>
          {children}
        </div>
      </div>
      <button
        ref={rightButtonRef as RefObject<HTMLButtonElement>}
        disabled={!canGoRight}
        className={`${styles.right} ${styles.move}`}
        onClick={goRight}>
        <FaChevronRight className={styles.chevron} />
      </button>
    </div>
  );
}
