import React from 'react';
import './book.scss';

// type Props = { url: string };

const Book = () => {
  return (
    <div className="book__container">
      <div className="book">
        <div
          style={{
            backgroundImage: `url("https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_max1500/63028197-fredrik-bakman-trevozhnye-ludi.jpg")`,
          }}
          className="book__cover"
        >
          <div className="book__cover-edge"></div>
        </div>
        <div className="book__pages">
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
          <div className="page"></div>
        </div>
        <div className="book__lastPage"></div>
      </div>
      <div className="shadow"></div>
    </div>
  );
};

export default Book;
