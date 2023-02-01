import React from 'react';
import { IBookDetails } from '../../utils/types';
import './markedBooks.scss';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import './markedBooks.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import Menu from '../Menu/Menu';
import Button from '../UI/Button/Button';
import useMarkedBooks from '../../hooks/useMarkedBooks';

type Props = {
  book: IBookDetails;
  index: number;
  openMenu: { title: string; opened: boolean };
  setOpenMenu: React.Dispatch<
    React.SetStateAction<{ title: string; opened: boolean }>
  >;
};

const MarkedBook = ({ book, index, openMenu, setOpenMenu }: Props) => {
  const {
    addBookToBookmarks,
    addBookToFinished,
    removeFromBookmarks,
    removeFromFinished,
  } = useMarkedBooks();

  return (
    <div className="markedBooks-book">
      <BookCover cover={book.cover} isSmall />
      <BookDetails book={book} index={index} isMarked />
      <Dots
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
            onClick={() => {
              book.isBookmarked && book._id
                ? removeFromBookmarks(book._id)
                : addBookToBookmarks(book);
            }}
          />
          <Button
            Icon={Checked}
            text={book.isFinished ? 'Finished' : 'Not Finished'}
            isLeftAligned
            isColored={book.isFinished}
            onClick={() => {
              book.isFinished && book._id
                ? removeFromFinished(book._id)
                : addBookToFinished(book);
            }}
          />
        </Menu>
      ) : null}
    </div>
  );
};

export default MarkedBook;
