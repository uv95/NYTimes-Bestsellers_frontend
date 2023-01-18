import React, { useEffect, useState } from 'react';
import './underShelf.scss';
import { ReactComponent as LeftArrow } from '../../assets/icons/left.svg';
import { ReactComponent as RightArrow } from '../../assets/icons/right.svg';
import BookCover from '../BookCover/BookCover';
import { IBookDetails } from '../../utils/types';
import BookDetails from '../BookDetails/BookDetails';
import { getNYTimesBestsellers } from '../../utils/utils';

// type Props = { children: React.ReactNode };

const UnderShelf = () => {
  const [bestsellers, setBestsellers] = useState<IBookDetails[]>([]);
  useEffect(() => {
    const getBestsellers = async function () {
      const allBestsellers = await getNYTimesBestsellers();
      const formattedBestsellers = allBestsellers.map((book: any) => {
        return {
          cover: book.book_image,
          author: book.author,
          title: book.title
            .split(' ')
            .map((word: string) => word[0] + word.slice(1).toLowerCase())
            .join(' '),
        };
      });
      setBestsellers(formattedBestsellers);
    };
    getBestsellers();
  }, []);

  return (
    <div className="underShelf">
      <div className="underShelf__left">Recent Bestsellers</div>
      <div className="underShelf__right">
        <div className="underShelf__right-leftArrow">
          <LeftArrow />
        </div>
        <div className="underShelf__right-books">
          {bestsellers &&
            bestsellers.slice(1, 5).map((book: IBookDetails) => (
              <div key={book.title} className="underShelf__right-books--item">
                <BookCover cover={book.cover} isSmall />
                <BookDetails bookDetails={book} isDetailsShort />
              </div>
            ))}
        </div>
        <div className="underShelf__right-rightArrow">
          <RightArrow />
        </div>
      </div>
    </div>
  );
};

export default UnderShelf;
