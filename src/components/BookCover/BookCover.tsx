import React from 'react';
import './bookCover.scss';
import { classNames } from '../../utils/classNames';
import Shadow from '../Shadow/Shadow';
import { useAppSelector } from '../../hooks';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../../assets/img/placeholder.jpg';
import { BooleanLiteral } from 'typescript';
import { bestsellers, markedBooks } from '../../store-mobX';

type Props = {
  cover?: string;
  isSmall?: boolean;
  isOnBookPage?: BooleanLiteral;
};

const BookCover = ({ cover, isSmall, isOnBookPage }: Props) => {
  //REDUX 🔵
  // const { isLoading } = useAppSelector((state) => state.bestsellers);

  const addLoadingClass = () =>
    (window.location.pathname === '/' ? bestsellers : markedBooks).state ===
    'pending'
      ? 'loading'
      : '';

  return (
    <div
      className={`bookCover__container ${classNames(
        'bookCover__container',
        isSmall && 'isSmall'
      )}`}
    >
      <Shadow type={isSmall ? 'isSlanting' : 'isBlurred'} />
      <div className="bookCover">
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
      {!isSmall && !isOnBookPage && <Shadow type="isBottom" />}
    </div>
  );
};

export default BookCover;
