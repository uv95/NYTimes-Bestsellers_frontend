import { useEffect } from 'react';
import { getAllBestsellers } from '../features/books/booksSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export function useGetAllBestsellers() {
  const dispatch = useAppDispatch();

  const { isLoading, currentBestsellersList } = useAppSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(getAllBestsellers())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, currentBestsellersList };
}

export default useGetAllBestsellers;
