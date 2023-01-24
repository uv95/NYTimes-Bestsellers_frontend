import { useEffect } from 'react';
import { getAllBestsellers } from '../features/books/booksSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { today } from '../utils/consts';

export function useGetCurrentBestsellers() {
  const dispatch = useAppDispatch();

  const { isLoading, currentBestsellersList, date, dateIsChanged } =
    useAppSelector((state) => state.books);

  useEffect(() => {
    if (dateIsChanged)
      dispatch(getAllBestsellers(date || today))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, date, dateIsChanged]);

  return { isLoading, currentBestsellersList };
}

export default useGetCurrentBestsellers;
