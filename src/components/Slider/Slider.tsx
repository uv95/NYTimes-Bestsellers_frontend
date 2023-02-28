import React, { useEffect, useState } from 'react';
import './slider.scss';
import { ReactComponent as LeftArrow } from '../../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right.svg';
import BookCover from '../BookCover/BookCover';
import { IBookDetails } from '../../utils/types';
import useGetCurrentBestsellers from '../../hooks/useGetCurrentBestsellers';
import useDebounce from '../../hooks/useDebounce';
import { bestsellers } from '../../store-mobX';
import BookInfoShort from '../BookDetails/BookInfoShort';

type SliderProps = { currentBestsellersList: IBookDetails[] };

const Slider = ({ currentBestsellersList }: SliderProps) => {
  //REDUX 🔵
  // const { isLoading, currentBestsellersList } = useGetCurrentBestsellers();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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

  const getScreenWidth = useDebounce(() => {
    setScreenWidth(window.innerWidth);
  }, 1000);

  const getArrayLength = () => {
    if (
      (screenWidth <= 1000 && screenWidth > 700) ||
      (screenWidth <= 600 && screenWidth > 400)
    )
      return 3;
    if (screenWidth <= 400) return 2;
    return 4;
  };

  useEffect(() => {
    window.addEventListener('resize', () => getScreenWidth());
  });

  return (
    <div className="slider">
      <h2>New & Trending</h2>
      <div className="slider__container">
        <LeftArrow
          className={`slider__container-leftArrow${
            currentIndex !== 0 ? '' : '--hidden'
          }`}
          onClick={goToPrevious}
        />
        <div className="slider__container-books">
          {/* {!isLoading */}
          {bestsellers.state !== 'pending'
            ? currentBestsellersList.map((book: IBookDetails, i: number) => (
                <div
                  key={book.title}
                  className="slider__container-books--item"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <BookCover cover={book.cover} isSmall />
                  <BookInfoShort book={book} index={i} />
                </div>
              ))
            : [...Array(getArrayLength())].map((_, i) => (
                <div
                  key={i}
                  className="slider__container-books--item"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  <BookCover isSmall />
                  <BookInfoShort />
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
