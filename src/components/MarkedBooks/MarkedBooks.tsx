import React, { useState } from 'react';
import './markedBooks.scss';
import MarkedBooksContainer from '../MarkedBooksContainer/MarkedBooksContainer';
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
      <MarkedBooksContainer heading={heading}>
        {!books.length ? (
          <p className="noBooks" data-testid="no-books">
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
      </MarkedBooksContainer>
    </>
  );
};

export default MarkedBooks;
