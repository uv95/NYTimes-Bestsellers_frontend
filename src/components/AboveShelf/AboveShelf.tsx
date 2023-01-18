import React, { useEffect, useState } from 'react';
import './aboveShelf.scss';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import { useAppSelector } from '../../hooks';

const AboveShelf = () => {
  const { currentBestseller } = useAppSelector((state) => state.books);

  return (
    <div className="aboveShelf">
      <div className="aboveShelf__left">
        <h2>New & Trending</h2>
        <p>fgdfgdgfdhgf gsdhjgsdfhgfshj</p>
      </div>
      <div className="aboveShelf__right">
        {currentBestseller && (
          <>
            <BookCover cover={currentBestseller.cover} />
            <BookDetails bookDetails={currentBestseller} />
          </>
        )}
      </div>
    </div>
  );
};

export default AboveShelf;
