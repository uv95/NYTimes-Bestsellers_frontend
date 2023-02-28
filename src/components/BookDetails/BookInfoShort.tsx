import React from 'react';
import './bookInfo.scss';
import { bestsellers, markedBooks } from '../../store-mobX';
import { IBookDetails } from '../../utils/types';
import Button from '../UI/Button/Button';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

type Props = {
  book?: IBookDetails;
  index?: number;
  isMarked?: boolean;
};

const BookInfoShort = observer(({ book, isMarked, index }: Props) => {
  const location = useLocation();

  //REDUX 🔵
  // const dispatch = useAppDispatch();
  // const { isLoading } = useAppSelector((state) => state.bestsellers);

  const addPreloaderClass = () =>
    (location.pathname.endsWith('/') ? bestsellers : markedBooks).state ===
    'pending'
      ? 'preloader'
      : '';

  return (
    <div className="bookInfo-short">
      <div className="bookInfo-short__bookInfo">
        <p className={`bookInfo-short__bookInfo-title ${addPreloaderClass()}`}>
          {book ? book.title : 'The Judges List'}
        </p>
        <p className={`bookInfo-short__bookInfo-author ${addPreloaderClass()}`}>
          {book ? book.author : 'John Grisham'}
        </p>
      </div>
      {!isMarked && (
        <Button
          text="Open"
          hasOutline={bestsellers.state !== 'pending'}
          isPreloader={bestsellers.state === 'pending'}
          onClick={() => {
            //MOBX 🔶
            if (index !== undefined) bestsellers.setCurrentBestseller(index);
          }}
          //REDUX 🔵
          // onClick={() => {
          //   if (index !== undefined) dispatch(setCurrentBestseller(index));
          // }}
        />
      )}
    </div>
  );
});

export default BookInfoShort;
