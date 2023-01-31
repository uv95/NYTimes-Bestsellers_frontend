import React, { memo, useState } from 'react';
import { IBookDetails } from '../../utils/types';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import './markedBook.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import Menu from '../Menu/Menu';
import Button from '../UI/Button/Button';
import useMarkedBooks from '../../hooks/useMarkedBooks';

type Props = {
  book: IBookDetails;
  index: number;
};

const MarkedBook = memo(({ book, index }: Props) => {
  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const {
    removeBookFromBookmarks,
    addBookToBookmarks,
    removeBookFromFinished,
    addBookToFinished,
  } = useMarkedBooks();

  const closeMenuByClickingOutside = (e: React.BaseSyntheticEvent) => {
    e.target.id !== 'menu' &&
      e.target.id !== 'btn' &&
      openMenu.opened &&
      setOpenMenu({ ...openMenu, opened: false });
  };

  return (
    <>
      <div
        className="markedBooks-background"
        onClick={closeMenuByClickingOutside}
      ></div>

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
              text={book.isBookmarked ? 'Bookmarked' : 'Not Bookmarked'}
              isLeftAligned
              isColored={book.isBookmarked}
            />
            <Button
              Icon={Checked}
              text={book.isFinished ? 'Finished' : 'Not Finished'}
              isLeftAligned
              isColored={book.isFinished}
            />
          </Menu>
        ) : null}
      </div>
    </>
  );
});

export default MarkedBook;
