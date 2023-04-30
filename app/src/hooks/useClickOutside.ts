import React, { useState, useEffect, RefObject } from 'react';

/**
 * Hook that notified of clicks outside of the passed ref
 */
function useClickOutside(ref: RefObject<HTMLElement>) {
  const [clickedOutside, setClickedOutside] = useState(false);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      setClickedOutside(
        ref.current != null &&
          !ref.current.contains(event.target as HTMLElement),
      );
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return clickedOutside;
}

export default useClickOutside;
