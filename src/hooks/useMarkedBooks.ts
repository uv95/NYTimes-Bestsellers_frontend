import { useCallback, useEffect } from 'react';
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
import { toast } from 'react-toastify';
import { user, markedBooks } from '../store-mobX';
import { useGetMarkedBooks } from './useGetMarkedBooks';

//MOBX 🔶
export function useMarkedBooks() {
  const { getMarkedBooks } = useGetMarkedBooks();

  useEffect(() => {
    getMarkedBooks();
  }, [getMarkedBooks]);

  const addBookToBookmarks = (book: IBookDetails) => {
    if (book) markedBooks.addToBookmarks(book);
  };

  const addBookToFinished = (book: IBookDetails) => {
    if (book) markedBooks.addToFinished(book);
  };

  const removeFromBookmarks = (
    bookId: string,
    updatedBook: Partial<IBookDetails> = { isBookmarked: false }
  ) => markedBooks.updateMarkedBook(bookId, updatedBook);

  const removeFromFinished = (
    bookId: string,
    updatedBook: Partial<IBookDetails> = { isFinished: false }
  ) => markedBooks.updateMarkedBook(bookId, updatedBook);

  const isBookmarked = (book: IBookDetails) =>
    markedBooks.bookmarkedBooks.filter(
      (b) => b.title === book.title && b.author === book.author
    ).length === 1;
  const isFinished = (book: IBookDetails) =>
    markedBooks.finishedBooks.filter(
      (b) => b.title === book.title && b.author === book.author
    ).length === 1;

  const getMarkedBookId = (book: IBookDetails) =>
    markedBooks.markedBooks.filter(
      (b) => b.title === book.title && b.author === book.author
    )[0]?._id;

  const toggleBookmark = (book: IBookDetails) => {
    if (book) {
      const bookId = getMarkedBookId(book);
      bookId && isBookmarked(book)
        ? removeFromBookmarks(bookId)
        : addBookToBookmarks(book);
    }
  };

  const toggleFinished = (book: IBookDetails) => {
    if (book) {
      const bookId = getMarkedBookId(book);
      bookId && isFinished(book)
        ? removeFromFinished(bookId)
        : addBookToFinished(book);
    }
  };

  return {
    isBookmarked,
    isFinished,
    toggleBookmark,
    toggleFinished,
  };
}

//REDUX 🔵

// export function useMarkedBooks() {
//   const dispatch = useAppDispatch();
//   const { isLoading, isNewBookMarked, markedBooks } = useAppSelector(
//     (state) => state.markedBooks
//   );
//   const { user } = useAppSelector((state) => state.user);

//   const bookmarkedBooks = useAppSelector(selectBookmarkedBooks);
//   const finishedBooks = useAppSelector(selectFinishedBooks);

//   useEffect(() => {
//     if (isNewBookMarked && user) {
//       dispatch(getAllMarkedBooks())
//         .unwrap()
//         .then()
//         .catch((error) => toast.error(error));
//     }
//   }, [dispatch, isNewBookMarked, user]);

//   const addBookToBookmarks = (bookDetails: IBookDetails) => {
//     if (bookDetails)
//       dispatch(addToBookmarks(bookDetails))
//         .unwrap()
//         .then()
//         .catch((error) => toast.error(error));
//   };
//   const addBookToFinished = (bookDetails: IBookDetails) => {
//     if (bookDetails)
//       dispatch(addToFinished(bookDetails))
//         .unwrap()
//         .then()
//         .catch((error) => toast.error(error));
//   };

//   const removeFromBookmarks = (
//     bookId: string,
//     updatedBook: Partial<IBookDetails> = { isBookmarked: false }
//   ) => {
//     dispatch(updateMarkedBook({ bookId, updatedBook }))
//       .unwrap()
//       .then()
//       .catch((error) => toast.error(error));
//   };
//   const removeFromFinished = (
//     bookId: string,
//     updatedBook: Partial<IBookDetails> = { isFinished: false }
//   ) => {
//     dispatch(updateMarkedBook({ bookId, updatedBook }))
//       .unwrap()
//       .then()
//       .catch((error) => toast.error(error));
//   };

//   const isBookMarked = (
//     booksList = bookmarkedBooks || finishedBooks,
//     book: IBookDetails
//   ) =>
//     booksList.filter((b) => b.title === book.title && b.author === book.author)
//       .length === 1;

//   const getMarkedBookId = (book: IBookDetails) =>
//     markedBooks.filter(
//       (b) => b.title === book.title && b.author === book.author
//     )[0]?._id;

//   return {
//     bookmarkedBooks,
//     finishedBooks,
//     isLoading,
//     markedBooks,
//     addBookToBookmarks,
//     addBookToFinished,
//     removeFromBookmarks,
//     removeFromFinished,
//     isBookMarked,
//     getMarkedBookId,
//   };
// }

export default useMarkedBooks;
