import { useEffect } from 'react';
import { getAllBestsellers } from '../features/bestsellers/bestsellersSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { today } from '../utils/consts';
import { toast } from 'react-toastify';

export function useGetCurrentBestsellers() {
  //REDUX 🔵

  const dispatch = useAppDispatch();

  const { isLoading, currentBestsellersList, date, isDateChanged } =
    useAppSelector((state) => state.bestsellers);

  useEffect(() => {
    if (isDateChanged)
      dispatch(getAllBestsellers(date || today))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
  }, [dispatch, date, isDateChanged]);

  return { isLoading, currentBestsellersList };
}

export default useGetCurrentBestsellers;
