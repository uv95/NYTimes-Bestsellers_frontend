import React from 'react';
import { setCurrentBestseller } from '../../features/bestsellers/bestsellersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import {
  addToBookmarks,
  addToFinished,
} from '../../features/markedBooks/markedBooksSlice';

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
  const { isLoading } = useAppSelector((state) => state.bestsellers);
  const addBookToBookmarks = () => {
    if (bookDetails)
      dispatch(addToBookmarks(bookDetails))
        .unwrap()
        .then()
        .catch((error) => console.log(error));
  };
  const addBookToFinished = () => {
    if (bookDetails)
      dispatch(addToFinished(bookDetails))
        .unwrap()
        .then()
        .catch((error) => console.log(error));
  };

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
          Icon={Bookmark}
          hasOutline={!isLoading}
          isPreloader={isLoading}
          onClick={addBookToBookmarks}
        />
        <Button
          text="I've read it"
          Icon={Checked}
          hasOutline={!isLoading}
          isPreloader={isLoading}
          onClick={addBookToFinished}
        />
      </div>
    </div>
  );
};

export default BookDetails;
