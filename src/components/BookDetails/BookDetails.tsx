import React from 'react';
import { setCurrentBestseller } from '../../features/books/booksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';

type Props = {
  bookDetails?: IBookDetails;
  isDetailsShort?: boolean;
  index?: number;
};

const BookDetails = ({ bookDetails, isDetailsShort, index }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.books);

  const addPreloaderClass = () => (isLoading ? 'preloader' : '');

  if (!isDetailsShort)
    return (
      <div className="details">
        <p className={`details-title ${addPreloaderClass()}`}>
          {bookDetails ? bookDetails.title : 'The Judges List'}
        </p>
        <p className={`details-author ${addPreloaderClass()}`}>
          By {bookDetails ? bookDetails.author : 'John Grisham'}
        </p>
        <p className={`details-description ${addPreloaderClass()}`}>
          {bookDetails
            ? bookDetails.description
            : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reprehenderit inventore necessitatibus harum perspiciatis maxime itaque iure ipsum tempore facilis repellat.'}
        </p>
        <div className="details__buttons">
          <Button
            text="Add to bookmarks"
            hasOutline={!isLoading}
            isPreloader={isLoading}
            onClick={() => {
              console.log('add to bookmarks');
            }}
          />
          <Button
            text="I've read it"
            hasOutline={!isLoading}
            isPreloader={isLoading}
            onClick={() => {
              console.log('i read it');
            }}
          />
        </div>
      </div>
    );

  return (
    <div className="details__underShelf">
      <div className="details__underShelf__bookInfo">
        <p
          className={`details__underShelf__bookInfo-title ${addPreloaderClass()}`}
        >
          {bookDetails ? bookDetails.title : 'The Judges List'}
        </p>
        <p
          className={`details__underShelf__bookInfo-author ${addPreloaderClass()}`}
        >
          {bookDetails ? bookDetails.author : 'John Grisham'}
        </p>
      </div>
      <Button
        text="Open"
        hasOutline={!isLoading}
        isPreloader={isLoading}
        onClick={() => {
          console.log(index);
          if (index !== undefined) dispatch(setCurrentBestseller(index));
        }}
      />
    </div>
  );
};

export default BookDetails;
