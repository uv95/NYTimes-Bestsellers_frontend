import {
  addToBookmarks,
  addToFinished,
  updateMarkedBook,
} from '../features/markedBooks/markedBooksSlice';
import { useAppDispatch } from '../hooks';
import { IBookDetails } from '../utils/types';

export function useMarkedBooks() {
  const dispatch = useAppDispatch();

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

  return {
    addBookToBookmarks,
    addBookToFinished,
    removeFromBookmarks,
    removeFromFinished,
  };
}

export default useMarkedBooks;
