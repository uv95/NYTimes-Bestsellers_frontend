import React from 'react';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';

type Props = {
  bookDetails: IBookDetails;
  isDetailsShort?: boolean;
};

const BookDetails = ({ bookDetails, isDetailsShort }: Props) => {
  if (!isDetailsShort)
    return (
      <div className="details">
        <p className="details-title">{bookDetails.title}</p>
        <p className="details-author">By {bookDetails.author}</p>
        <p className="details-genre">{bookDetails.genre}</p>
        <p className="details-description">{bookDetails.description}</p>
      </div>
    );
  return (
    <div className="details__underShelf">
      <p className="details__underShelf-title">{bookDetails.title}</p>
      <p className="details__underShelf-author">{bookDetails.author}</p>
      <Button text="Open" hasOutline onClick={() => {}} />
    </div>
  );
};

export default BookDetails;
