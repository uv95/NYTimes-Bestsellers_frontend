import React from 'react';
import { setCurrentBestseller } from '../../features/books/booksSlice';
import { useAppDispatch } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';

type Props = {
  bookDetails: IBookDetails;
  isDetailsShort?: boolean;
  index?: number;
};

const BookDetails = ({ bookDetails, isDetailsShort, index }: Props) => {
  const dispatch = useAppDispatch();

  if (!isDetailsShort)
    return (
      <div className="details">
        <p className="details-title">{bookDetails.title}</p>
        <p className="details-author">By {bookDetails.author}</p>
        <p className="details-genre">{bookDetails.genre}</p>
        <p className="details-description">{bookDetails.description}</p>
        <div className="details__buttons">
          <Button
            text="Add to bookmarks"
            hasOutline
            onClick={() => {
              console.log('add to bookmarks');
            }}
          />
          <Button
            text="I've read it"
            hasOutline
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
        <p className="details__underShelf__bookInfo-title">
          {bookDetails.title}
        </p>
        <p className="details__underShelf__bookInfo-author">
          {bookDetails.author}
        </p>
      </div>
      <Button
        text="Open"
        hasOutline
        onClick={() => {
          console.log(index);
          if (index !== undefined) dispatch(setCurrentBestseller(index));
        }}
      />
    </div>
  );
};

export default BookDetails;
