import React, { useState } from 'react';
import './markedBooks.scss';
import Container from '../Container/Container';
import { IBookDetails } from '../../utils/types';
import MarkedBook from './MarkedBook';

type Props = { heading: string; books: IBookDetails[] };

const MarkedBooks = ({ heading, books }: Props) => {
  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const closeMenuByClickingOutside = () => {
    openMenu.opened && setOpenMenu({ ...openMenu, opened: false });
  };

  return (
    <>
      <div
        className="markedBooks-background"
        style={{ zIndex: `${openMenu.opened ? '3' : '1'}` }}
        onClick={closeMenuByClickingOutside}
      ></div>
      <Container heading={heading}>
        {!books.length ? (
          <p className="container--noBooks" data-testid="no-books">
            No {heading === 'Bookmarks' ? 'bookmarked' : 'finished'} books yet!
          </p>
        ) : (
          <div className="markedBooks">
            {books.map((book: IBookDetails, i: number) => (
              <MarkedBook
                key={book.title + book.author}
                book={book}
                index={i}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
              />
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default MarkedBooks;
