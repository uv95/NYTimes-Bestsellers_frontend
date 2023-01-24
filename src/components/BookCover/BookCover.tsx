import React from 'react';
import './bookCover.scss';
import { classNames } from '../../utils/classNames';
import Shadow from '../Shadow/Shadow';
import { useAppSelector } from '../../hooks';

type Props = { cover?: string; isSmall?: boolean; isOnBookPage?: boolean };

const BookCover = ({ cover, isSmall, isOnBookPage }: Props) => {
  const { isLoading } = useAppSelector((state) => state.books);

  const addLoadingClass = () => (isLoading ? 'loading' : '');

  return (
    <div
      className={`bookCover__container ${classNames(
        'bookCover__container',
        isSmall && 'isSmall'
      )}`}
    >
      <Shadow type={isSmall ? 'isSlanting' : 'isBlurred'} />
      <div className="bookCover">
        <div
          style={{
            backgroundImage: `url(${cover})`,
          }}
          className={`bookCover__cover ${addLoadingClass()}`}
        >
          <div className="bookCover__cover-edge"></div>
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
