import React from 'react';
import BookCover from '../../components/BookCover/BookCover';
import BookDetails from '../../components/BookDetails/BookDetails';
import { useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import './bookmarks.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import Container from '../../components/Container/Container';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';

const Bookmarks = () => {
  const { currentBestsellersList } = useAppSelector((state) => state.books);
  return (
    <Container heading="Bookmarks">
      <MarkedBooks>
        {currentBestsellersList.map((book: IBookDetails, i: number) => (
          <div key={book.title} className="bookmarks-book">
            <BookCover cover={book.cover} isSmall />
            <BookDetails bookDetails={book} index={i} isMarked />
            <Dots className="single-icon" />
          </div>
        ))}
      </MarkedBooks>
    </Container>
  );
};

export default Bookmarks;
