import React, { useEffect } from 'react';
import './bookCover.scss';
import { classNames } from '../../utils/classNames';
import Shadow from '../Shadow/Shadow';
// import { useAppSelector } from '../../hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../../assets/img/placeholder.jpg';
import { BooleanLiteral } from 'typescript';
import { bestsellers, markedBooks } from '../../store-mobX';
import useScreenWidth from '../../hooks/useScreenWidth';

type Props = {
  cover?: string;
  isSmall?: boolean;
  isOnBookPage?: BooleanLiteral;
  index?: number;
};

const BookCover = ({ cover, isSmall, isOnBookPage, index }: Props) => {
  //REDUX 🔵
  // const { isLoading } = useAppSelector((state) => state.bestsellers);
  const { screenWidth, getScreenWidth } = useScreenWidth();

  const addLoadingClass = () =>
    (window.location.pathname === '/' ? bestsellers : markedBooks).state ===
    'pending'
      ? 'loading'
      : '';

  useEffect(() => {
    window.addEventListener('resize', () => getScreenWidth());
  });

  return (
    <div
      className={`bookCover__container ${classNames(
        'bookCover__container',
        isSmall && 'isSmall'
      )}`}
    >
      <div
        className="bookCover"
        onClick={() =>
          isSmall &&
          screenWidth < 700 &&
          index !== undefined &&
          bestsellers.setCurrentBestseller(index)
        }
      >
        <div className={`bookCover__cover ${addLoadingClass()}`}>
          <div className="bookCover__cover-edge"></div>
          <div className="bookCover__cover-shadows"></div>
          <LazyLoadImage
            src={cover}
            alt="cover"
            height="100%"
            width="100%"
            className="bookCover__cover--img"
            placeholderSrc={placeholder}
          />
        </div>
        <div className="bookCover__pages">
          {[...Array(isSmall ? 4 : 6)].map((_, i) => (
            <div
              key={i}
              className={`page ${classNames('page', isSmall && 'isSmall')} `}
            ></div>
          ))}
        </div>
        <div className={`bookCover__lastPage ${addLoadingClass()}`}></div>
      </div>
      <Shadow type={isSmall ? 'isSlanting' : 'isBlurred'} />
      {!isSmall && !isOnBookPage && <Shadow type="isBottom" />}
    </div>
  );
};

export default BookCover;
