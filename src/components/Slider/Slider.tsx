import React, { useEffect } from 'react';
import './slider.scss';
import BookCover from '../BookCover/BookCover';
import { IBookDetails } from '../../utils/types';
// import useGetCurrentBestsellers from '../../hooks/useGetCurrentBestsellers';
import { bestsellers } from '../../store-mobX';
import BookInfoShort from '../BookDetails/BookInfoShort';
import { observer } from 'mobx-react-lite';
import useSlider from '../../hooks/useSlider';
import Arrow from '../UI/Arrow/Arrow';
import useScreenWidth from '../../hooks/useScreenWidth';

const Slider = observer(() => {
  //REDUX 🔵
  // const { isLoading, currentBestsellersList } = useGetCurrentBestsellers();

  const { goToPrevious, goToNext, currentIndex } = useSlider();
  const { screenWidth, getScreenWidth } = useScreenWidth();

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
        <Arrow
          arrow="left"
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          currentIndex={currentIndex}
        />
        <div className="slider__container-books">
          {/* {!isLoading */}
          {/* {bestsellers.state !== 'pending' */}
          {bestsellers.currentBestsellersList.length
            ? bestsellers.currentBestsellersList.map(
                (book: IBookDetails, i: number) => (
                  <div
                    data-testid="slider-book"
                    key={book.title}
                    className="slider__container-books--item"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                      zIndex: bestsellers.currentBestsellersList.length - i,
                    }}
                  >
                    <BookCover cover={book.cover} isSmall index={i} />
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
        <Arrow
          arrow="right"
          goToPrevious={goToPrevious}
          goToNext={goToNext}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
});

export default Slider;
