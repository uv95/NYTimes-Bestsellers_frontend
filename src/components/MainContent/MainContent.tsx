import React, { useEffect } from 'react';
import './mainContent.scss';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import { useAppSelector } from '../../hooks';
import ChooseDate from '../ChooseDate/ChooseDate';

const MainContent = () => {
  const { currentBestseller } = useAppSelector((state) => state.books);

  return (
    <div className="mainContent">
      <div className="mainContent__left">
        <h2>New & Trending</h2>
        <ChooseDate />
      </div>
      <div className="mainContent__right">
        {currentBestseller ? (
          <>
            <BookCover cover={currentBestseller.cover} />
            <BookDetails bookDetails={currentBestseller} hasDescription />
          </>
        ) : (
          <>
            <BookCover />
            <BookDetails hasDescription />
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
