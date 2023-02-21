import React, { useState } from 'react';
import './markedBooks.scss';
import Container from '../Container/Container';
import { IBookDetails } from '../../utils/types';
import MarkedBook from './MarkedBook';

type Props = { heading: string; books: IBookDetails[] };

const MarkedBooks = ({ heading, books }: Props) => {
  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const closeMenuByClickingOutside = (e: React.BaseSyntheticEvent) => {
    // e.target.id !== 'menu' &&
    //   e.target.id !== 'btn' &&
    //   e.target.id !== 'btn-content' &&
    //   e.target.id !== 'btn-icon' &&
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
      </Container>
    </>
  );
};

export default MarkedBooks;
