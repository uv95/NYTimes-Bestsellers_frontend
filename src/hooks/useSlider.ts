import { useState } from 'react';
import { IBookDetails } from '../utils/types';

export function useSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = (list: IBookDetails[]) => {
    const isLastSlide = currentIndex === list.length - 4;
    const newIndex = isLastSlide ? currentIndex : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return { goToPrevious, goToNext, currentIndex };
}

export default useSlider;
