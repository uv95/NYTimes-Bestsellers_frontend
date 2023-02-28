import React, { useEffect } from 'react';
import './mainContent.scss';
import BookCover from '../BookCover/BookCover';
import { useAppSelector } from '../../hooks';
import ChooseDate from '../ChooseDate/ChooseDate';
import { IBookDetails } from '../../utils/types';
import { useGetMarkedBooks } from '../../hooks/useGetMarkedBooks';
import BookInfoFull from '../BookDetails/BookInfoFull';

type MainContentProps = { currentBestseller: IBookDetails | null };

const MainContent = ({ currentBestseller }: MainContentProps) => {
  //REDUX 🔵
  // const { currentBestseller } = useAppSelector((state) => state.bestsellers);

  //MOBX 🔶
  const { getMarkedBooks } = useGetMarkedBooks();

  useEffect(() => {
    getMarkedBooks();
  }, [getMarkedBooks]);

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
            <BookInfoFull book={currentBestseller} />
          </>
        ) : (
          <>
            <BookCover />
            <BookInfoFull />
          </>
        )}
      </div>
    </div>
  );
};

export default MainContent;
