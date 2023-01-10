import React, { useEffect, useState } from 'react';
import './aboveShelf.scss';
import BookCover from '../BookCover/BookCover';
import BookDetails from '../BookDetails/BookDetails';
import { IBookDetails } from '../../utils/types';

const AboveShelf = () => {
  const [bestseller, setBestseller] = useState<IBookDetails>({
    cover: '',
    author: '',
    title: '',
    description: '',
    year: '',
    genre: '' || [],
  });
  useEffect(() => {
    const getNYTimesBestsellers = async function () {
      const res = await fetch(
        'https://api.nytimes.com/svc/books/v3/lists/current/middle-grade-paperback-monthly.json?api-key=eIoal0qQr2Mwam9gXhcGUVF3ei0QpSMa'
      );
      const data = await res.json();

      const formattedTitle = data.results.books[0].title
        .split(' ')
        .map((el: string) => el + '+')
        .join('')
        .toLowerCase()
        .slice(0, -1);
      const formattedAuthor = data.results.books[0].author
        .split(' ')[1]
        .toLowerCase();

      const res2 = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${formattedTitle}+inauthor:${formattedAuthor}`
      );
      const data2 = await res2.json();

      setBestseller({
        cover: data.results.books[0].book_image,
        author: data.results.books[0].author,
        title: data.results.books[0].title
          .split(' ')
          .map((word: string) => word[0] + word.slice(1).toLowerCase())
          .join(' '),
        description: data2.items[0].volumeInfo.description,
        year: data2.items[0].volumeInfo.publishedDate,
        genre: data2.items[0].volumeInfo.categories,
      });
    };
    getNYTimesBestsellers();
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
