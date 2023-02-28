import { useCallback, useEffect } from 'react';
import { IBookDetails } from '../utils/types';
import { toast } from 'react-toastify';
import { user, markedBooks } from '../store-mobX';

//MOBX 🔶
export function useGetMarkedBooks() {
  const { user: currUser } = user;
  const { isNewBookMarked } = markedBooks;

  const getMarkedBooks = useCallback(() => {
    if (isNewBookMarked && currUser) {
      markedBooks.getAllMarkedBooks();
    }
  }, [isNewBookMarked, currUser]);

  useEffect(() => {
    getMarkedBooks();
  }, [getMarkedBooks]);

  return {
    finishedBooks: markedBooks.finishedBooks,
    bookmarkedBooks: markedBooks.bookmarkedBooks,
    getMarkedBooks,
  };
}
