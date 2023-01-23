import React from 'react';
import { setCurrentBestseller } from '../../features/books/booksSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';

type Props = {
  bookDetails?: IBookDetails;
  hasDescription?: boolean;
  index?: number;
  isMarked?: boolean;
};

const BookDetails = ({
  bookDetails,
  hasDescription,
  index,
  isMarked,
}: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.books);

  const addPreloaderClass = () => (isLoading ? 'preloader' : '');

  if (!hasDescription)
    return (
      <div className="details-short">
        <div className="details-short__bookInfo">
          <p className={`details-short__bookInfo-title ${addPreloaderClass()}`}>
            {bookDetails ? bookDetails.title : 'The Judges List'}
          </p>
          <p
            className={`details-short__bookInfo-author ${addPreloaderClass()}`}
          >
            {bookDetails ? bookDetails.author : 'John Grisham'}
          </p>
        </div>
        {!isMarked && (
          <Button
            text="Open"
            hasOutline={!isLoading}
            isPreloader={isLoading}
            onClick={() => {
              console.log(index);
              if (index !== undefined) dispatch(setCurrentBestseller(index));
            }}
          />
        )}
      </div>
    );

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
};

export default BookDetails;
