import React from 'react';
import './underShelf.scss';
import { ReactComponent as LeftArrow } from '../../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right.svg';
import BookCover from '../BookCover/BookCover';
import { IBookDetails } from '../../utils/types';
import BookDetails from '../BookDetails/BookDetails';
import useGetAllBestsellers from '../../hooks/useGetAllBestsellers';

const UnderShelf = () => {
  const { isLoading, currentBestsellersList } = useGetAllBestsellers();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="underShelf">
      <div className="underShelf__left">Recent Bestsellers</div>
      <div className="underShelf__right">
        <div className="underShelf__right-leftArrow">
          <LeftArrow />
        </div>
        <div className="underShelf__right-books">
          {currentBestsellersList &&
            currentBestsellersList.slice(1, 5).map((book: IBookDetails) => (
              <div key={book.title} className="underShelf__right-books--item">
                <BookCover cover={book.cover} isSmall />
                <BookDetails bookDetails={book} isDetailsShort />
              </div>
            ))}
        </div>
        <div className="underShelf__right-rightArrow">
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

export default UnderShelf;
