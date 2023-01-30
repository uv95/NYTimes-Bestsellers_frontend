import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getAllMarkedBooks,
  selectBookmarkedBooks,
  selectFinishedBooks,
} from '../features/markedBooks/markedBooksSlice';

export function useGetMarkedBooks() {
  const dispatch = useAppDispatch();

  const { isLoading, isNewBookMarked } = useAppSelector(
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

  return { bookmarkedBooks, finishedBooks, isLoading };
}

export default useGetMarkedBooks;
