import React, { useState } from 'react';
import Container from '../Container/Container';
import { IBookDetails } from '../../utils/types';
import './markedBooks.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import Menu from '../Menu/Menu';
import Button from '../UI/Button/Button';
import useMarkedBooks from '../../hooks/useMarkedBooks';

type Props = { heading: string; books: IBookDetails[] };

const MarkedBooks = ({ heading, books }: Props) => {
  const {
    removeBookFromBookmarks,
    addBookToBookmarks,
    removeBookFromFinished,
    addBookToFinished,
  } = useMarkedBooks();

  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const closeMenuByClickingOutside = (e: React.BaseSyntheticEvent) => {
    e.target.id !== 'menu' &&
      e.target.id !== 'btn' &&
      openMenu.opened &&
      setOpenMenu({ ...openMenu, opened: false });
  };

  return (
    <Container heading={heading} onClick={closeMenuByClickingOutside}>
      <div className="markedBooks">
        {books.map((book: IBookDetails, i: number) => (
          <div key={book.title + i} className="markedBooks-book">
            <BookCover cover={book.cover} isSmall />
            <BookDetails book={book} index={i} isMarked />
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
        ))}
      </div>
    </Container>
  );
};

export default MarkedBooks;
