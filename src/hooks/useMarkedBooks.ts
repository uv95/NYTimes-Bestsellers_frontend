import {
  addToBookmarks,
  addToFinished,
  removeFromBookmarks,
  removeFromFinished,
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

  const removeBookFromBookmarks = (bookId: string) => {
    dispatch(removeFromBookmarks(bookId))
      .unwrap()
      .then()
      .catch((error) => console.log(error));
  };
  const removeBookFromFinished = (bookId: string) => {
    dispatch(removeFromFinished(bookId))
      .unwrap()
      .then()
      .catch((error) => console.log(error));
  };

  return {
    addBookToBookmarks,
    addBookToFinished,
    removeBookFromBookmarks,
    removeBookFromFinished,
  };
}

export default useMarkedBooks;
