import React from 'react';
import { IBookDetails } from '../../utils/types';
import './markedBooks.scss';
import BookCover from '../BookCover/BookCover';
import dots from '../../assets/icons/menu-dots-vertical.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import Menu from '../Menu/Menu';
import Button from '../UI/Button/Button';
import useMarkedBooks from '../../hooks/useMarkedBooks';
import BookInfoShort from '../BookDetails/BookInfoShort';

type Props = {
  book: IBookDetails;
  index: number;
  openMenu: { title: string; opened: boolean };
  setOpenMenu: React.Dispatch<
    React.SetStateAction<{ title: string; opened: boolean }>
  >;
};

const MarkedBook = ({ book, index, openMenu, setOpenMenu }: Props) => {
  const { toggleBookmark, toggleFinished } = useMarkedBooks();

  return (
    <div className="markedBooks-book" data-testid="marked-book">
      <BookCover cover={book.cover} isSmall />
      <BookInfoShort book={book} index={index} isMarked />
      <img
        src={dots}
        alt="menu"
        className={`single-icon ${
          openMenu.opened && book.title === openMenu.title
            ? 'single-icon--opened'
            : ''
        }`}
        onClick={() =>
          setOpenMenu({ title: book.title, opened: !openMenu.opened })
        }
      />
      {openMenu.opened && book.title === openMenu.title ? (
        <Menu>
          <Button
            Icon={Bookmark}
            text={book.isBookmarked ? 'Bookmarked' : 'Bookmark'}
            isLeftAligned
            isColored={book.isBookmarked}
            onClick={() => toggleBookmark(book)}
          />
          <Button
            Icon={Checked}
            text={book.isFinished ? 'Finished' : 'Not Finished'}
            isLeftAligned
            isColored={book.isFinished}
            onClick={() => toggleFinished(book)}
          />
        </Menu>
      ) : null}
    </div>
  );
};

export default MarkedBook;
