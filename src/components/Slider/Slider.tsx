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
import { observer } from 'mobx-react-lite';
import useSlider from '../../hooks/useSlider';

const Slider = observer(() => {
  //REDUX 🔵
  // const { isLoading, currentBestsellersList } = useGetCurrentBestsellers();

  const { goToPrevious, goToNext, currentIndex } = useSlider();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
            ? bestsellers.currentBestsellersList.map(
                (book: IBookDetails, i: number) => (
                  <div
                    data-testid="slider-book"
                    key={book.title}
                    className="slider__container-books--item"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <BookCover cover={book.cover} isSmall />
                    <BookInfoShort book={book} index={i} />
                  </div>
                )
              )
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
            currentIndex !== bestsellers.currentBestsellersList.length - 4
              ? ''
              : '--hidden'
          }`}
          onClick={() => goToNext(bestsellers.currentBestsellersList)}
        />
      </div>
    </div>
  );
});

export default Slider;
