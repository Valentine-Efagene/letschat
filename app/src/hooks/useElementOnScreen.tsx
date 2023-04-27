import { useState, useEffect, useRef, MutableRefObject } from "react";

/**
 *
 * @reference
 * https://dev.to/producthackers/intersection-observer-using-react-49ko
 *
 * @param {object} options
 * @param {func} cleanup
 * @returns
 */
const useElementOnScreen = (
  options?: object,
  cleanup?: boolean,
  ref: any = null
) => {
  let containerRef = useRef(ref);

  const [isVisible, setIsVisible] = useState();

  const callback = (entries: any, observer: any) => {
    const [entry] = entries;
    setIsVisible((prevState) =>
      prevState === true ? prevState : entry.isIntersecting
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
