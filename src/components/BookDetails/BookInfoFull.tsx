import React from 'react';
import './bookInfo.scss';
import Button from '../UI/Button/Button';
import { bestsellers, markedBooks } from '../../store-mobX';
import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { IBookDetails } from '../../utils/types';
import useMarkedBooks from '../../hooks/useMarkedBooks';

type Props = {
  book?: IBookDetails;
  index?: number;
  isMarked?: boolean;
};

const BookInfoFull = observer(({ book }: Props) => {
  const location = useLocation();

  const { toggleBookmark, toggleFinished, isBookmarked, isFinished } =
    useMarkedBooks();

  const addPreloaderClass = () =>
    (location.pathname.endsWith('/') ? bestsellers : markedBooks).state ===
    'pending'
      ? 'preloader'
      : '';

  return (
    <div className="bookInfo">
      <p className={`bookInfo-title ${addPreloaderClass()}`}>
        {book ? book.title : 'The Judges List'}
      </p>
      <p className={`bookInfo-author ${addPreloaderClass()}`}>
        By {book ? book.author : 'John Grisham'}
      </p>
      <p className={`bookInfo-description ${addPreloaderClass()}`}>
        {book
          ? book.description
          : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, reprehenderit inventore necessitatibus harum perspiciatis maxime itaque iure ipsum tempore facilis repellat.'}
      </p>
      <div className="bookInfo__buttons">
        <Button
          text={book && isBookmarked(book) ? 'Bookmarked' : 'Bookmark'}
          Icon={Bookmark}
          hasOutline={
            bestsellers.state !== 'pending' && book && !isBookmarked(book)
          }
          isOrange={book && isBookmarked(book)}
          isPreloader={bestsellers.state === 'pending'}
          isDisabled={bestsellers.state === 'pending'}
          onClick={() => book && toggleBookmark(book)}
          hasMobileVersion
        />
        <Button
          text={book && isFinished(book) ? 'Finished' : 'Not Finished'}
          Icon={Checked}
          hasOutline={
            bestsellers.state !== 'pending' && book && !isFinished(book)
          }
          isOrange={book && isFinished(book)}
          isPreloader={bestsellers.state === 'pending'}
          isDisabled={bestsellers.state === 'pending'}
          onClick={() => book && toggleFinished(book)}
          hasMobileVersion
        />
      </div>
    </div>
  );
});

export default BookInfoFull;
