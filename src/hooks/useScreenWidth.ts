import { useState } from 'react';
import useDebounce from './useDebounce';

export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const getScreenWidth = useDebounce(() => {
    setScreenWidth(window.innerWidth);
  }, 1000);

  return { getScreenWidth, screenWidth };
}

export default useScreenWidth;
