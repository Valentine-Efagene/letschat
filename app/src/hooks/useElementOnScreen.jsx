import { useState, useEffect, useRef } from 'react';

/**
 *
 * @reference
 * https://dev.to/producthackers/intersection-observer-using-react-49ko
 *
 * @param {object} options
 * @param {func} cleanup
 * @returns
 */
const useElementOnScreen = (options, cleanup) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState();

  const callback = (entries, observer) => {
    const [entry] = entries;
    setIsVisible(prevState =>
      prevState === true ? prevState : entry.isIntersecting,
    );

    if (cleanup && isVisible) {
      observer.disconnect();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;
