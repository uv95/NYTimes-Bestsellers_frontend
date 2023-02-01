import { useEffect } from 'react';
import {
  addToBookmarks,
  addToFinished,
  updateMarkedBook,
  selectBookmarkedBooks,
  selectFinishedBooks,
  getAllMarkedBooks,
} from '../features/markedBooks/markedBooksSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { IBookDetails } from '../utils/types';

export function useMarkedBooks() {
  const dispatch = useAppDispatch();
  const { isLoading, isNewBookMarked, markedBooks } = useAppSelector(
    (state) => state.markedBooks
  );
  const bookmarkedBooks = useAppSelector(selectBookmarkedBooks);
  const finishedBooks = useAppSelector(selectFinishedBooks);

  useEffect(() => {
    if (isNewBookMarked)
      dispatch(getAllMarkedBooks())
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, isNewBookMarked]);

  const addBookToBookmarks = (bookDetails: IBookDetails) => {
    if (bookDetails)
      dispatch(addToBookmarks(bookDetails))
        .unwrap()
        .then()
        .catch((error) => console.log(error));
  };
  const addBookToFinished = (bookDetails: IBookDetails) => {
    if (bookDetails)
      dispatch(addToFinished(bookDetails))
        .unwrap()
        .then()
        .catch((error) => console.log(error));
  };

  const removeFromBookmarks = (
    bookId: string,
    updatedBook: Partial<IBookDetails> = { isBookmarked: false }
  ) => {
    dispatch(updateMarkedBook({ bookId, updatedBook }))
      .unwrap()
      .then()
      .catch((error) => console.log(error));
  };
  const removeFromFinished = (
    bookId: string,
    updatedBook: Partial<IBookDetails> = { isFinished: false }
  ) => {
    dispatch(updateMarkedBook({ bookId, updatedBook }))
      .unwrap()
      .then()
      .catch((error) => console.log(error));
  };

  const isBookMarked = (
    booksList = bookmarkedBooks || finishedBooks,
    book: IBookDetails
  ) =>
    booksList.filter((b) => b.title === book.title && b.author === book.author)
      .length === 1;

  const getMarkedBookId = (book: IBookDetails) =>
    markedBooks.filter(
      (b) => b.title === book.title && b.author === book.author
    )[0]._id;

  return {
    bookmarkedBooks,
    finishedBooks,
    isLoading,
    markedBooks,
    addBookToBookmarks,
    addBookToFinished,
    removeFromBookmarks,
    removeFromFinished,
    isBookMarked,
    getMarkedBookId,
  };
}

export default useMarkedBooks;
