import React from 'react';
import { setCurrentBestseller } from '../../features/bestsellers/bestsellersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import './bookDetails.scss';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import useMarkedBooks from '../../hooks/useMarkedBooks';

type Props = {
  book?: IBookDetails;
  hasDescription?: boolean;
  index?: number;
  isMarked?: boolean;
};

const BookDetails = ({ book, hasDescription, index, isMarked }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.bestsellers);

  const {
    bookmarkedBooks,
    finishedBooks,
    addBookToBookmarks,
    addBookToFinished,
    removeFromBookmarks,
    removeFromFinished,
    isBookMarked,
    getMarkedBookId,
  } = useMarkedBooks();

  const addPreloaderClass = () => (isLoading ? 'preloader' : '');

  const toggleBookmark = () => {
    if (book) {
      const bookId = getMarkedBookId(book);
      bookId && isBookMarked(bookmarkedBooks, book)
        ? removeFromBookmarks(bookId)
        : addBookToBookmarks(book);
    }
  };
  const toggleFinished = () => {
    if (book) {
      const bookId = getMarkedBookId(book);
      bookId && isBookMarked(finishedBooks, book)
        ? removeFromFinished(bookId)
        : addBookToFinished(book);
    }
  };

  if (!hasDescription)
    return (
      <div className="details-short">
        <div className="details-short__bookInfo">
          <p className={`details-short__bookInfo-title ${addPreloaderClass()}`}>
            {book ? book.title : 'The Judges List'}
          </p>
          <p
            className={`details-short__bookInfo-author ${addPreloaderClass()}`}
          >
            {book ? book.author : 'John Grisham'}
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
        {book ? book.title : 'The Judges List'}
      </p>
      <p className={`details-author ${addPreloaderClass()}`}>
        By {book ? book.author : 'John Grisham'}
      </p>
      <p className={`details-description ${addPreloaderClass()}`}>
        {book
          ? book.description
          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reprehenderit inventore necessitatibus harum perspiciatis maxime itaque iure ipsum tempore facilis repellat.'}
      </p>
      <div className="details__buttons">
        <Button
          text={
            book && isBookMarked(bookmarkedBooks, book)
              ? 'Bookmarked'
              : 'Bookmark'
          }
          Icon={Bookmark}
          hasOutline={
            !isLoading && book && !isBookMarked(bookmarkedBooks, book)
          }
          isColored={book && isBookMarked(bookmarkedBooks, book)}
          isPreloader={isLoading}
          isDisabled={isLoading}
          onClick={toggleBookmark}
          hasMobileVersion
        />
        <Button
          text={
            book && isBookMarked(finishedBooks, book)
              ? 'Finished'
              : 'Not Finished'
          }
          Icon={Checked}
          hasOutline={!isLoading && book && !isBookMarked(finishedBooks, book)}
          isColored={book && isBookMarked(finishedBooks, book)}
          isPreloader={isLoading}
          isDisabled={isLoading}
          onClick={toggleFinished}
          hasMobileVersion
        />
      </div>
    </div>
  );
};

export default BookDetails;
