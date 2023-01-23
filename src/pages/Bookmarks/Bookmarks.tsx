import React from 'react';
import BookCover from '../../components/BookCover/BookCover';
import BookDetails from '../../components/BookDetails/BookDetails';
import { useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import './bookmarks.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';

const Bookmarks = () => {
  const { currentBestsellersList } = useAppSelector((state) => state.books);
  return (
    <MarkedBooks heading="Bookmarks">
      {currentBestsellersList.map((book: IBookDetails, i: number) => (
        <div key={book.title} className="bookmarks-book">
          <BookCover cover={book.cover} isSmall />
          <BookDetails bookDetails={book} index={i} isMarked />
          <Dots className="single-icon" />
        </div>
      ))}
    </MarkedBooks>
  );
};

export default Bookmarks;
