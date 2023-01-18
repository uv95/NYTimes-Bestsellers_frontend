import React, { useEffect, useState } from 'react';
import './aboveShelf.scss';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import { IBookDetails } from '../../utils/types';
import { getGenre, getNYTimesBestsellers } from '../../utils/utils';

const AboveShelf = () => {
  const [bestseller, setBestseller] = useState<IBookDetails>({
    cover: '',
    author: '',
    title: '',
    description: '',
    genre: '' || [],
  });
  useEffect(() => {
    const getBestsellers = async function () {
      const allBestsellers = await getNYTimesBestsellers();
      const firstBestseller = allBestsellers[0];

      const genre = await getGenre(
        firstBestseller.title,
        firstBestseller.author
      );

      setBestseller({
        cover: firstBestseller.book_image,
        author: firstBestseller.author,
        title: firstBestseller.title
          .split(' ')
          .map((word: string) => word[0] + word.slice(1).toLowerCase())
          .join(' '),
        description: firstBestseller.description,
        genre,
      });
    };
    getBestsellers();
  }, []);

  return (
    <div className="aboveShelf">
      <div className="aboveShelf__left">
        <h2>New & Trending</h2>
        <p>fgdfgdgfdhgf gsdhjgsdfhgfshj</p>
      </div>
      <div className="aboveShelf__right">
        <BookCover cover={bestseller.cover} />
        <BookDetails bookDetails={bestseller} />
      </div>
    </div>
  );
};

export default AboveShelf;
