import React, { useState } from 'react';
import './slider.scss';
import { ReactComponent as LeftArrow } from '../../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right.svg';
import BookCover from '../BookCover/BookCover';
import { IBookDetails } from '../../utils/types';
import BookDetails from '../BookDetails/BookDetails';
import useGetAllBestsellers from '../../hooks/useGetAllBestsellers';

const Slider = () => {
  const { isLoading, currentBestsellersList } = useGetAllBestsellers();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? currentIndex : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === currentBestsellersList.length - 4;
    const newIndex = isLastSlide ? currentIndex : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="slider">
      <div className="slider__container">
        <LeftArrow
          className={`slider__container-leftArrow${
            currentIndex !== 0 ? '' : '--hidden'
          }`}
          onClick={goToPrevious}
        />
        <div className="slider__container-books">
          {currentBestsellersList &&
            currentBestsellersList.map((book: IBookDetails) => (
              <div
                key={book.title}
                className="slider__container-books--item"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <BookCover cover={book.cover} isSmall />
                <BookDetails bookDetails={book} isDetailsShort />
              </div>
            ))}
        </div>
        <RightArrow
          className={`slider__container-rightArrow${
            currentIndex !== currentBestsellersList.length - 4 ? '' : '--hidden'
          }`}
          onClick={goToNext}
        />
      </div>
    </div>
  );
};

export default Slider;
