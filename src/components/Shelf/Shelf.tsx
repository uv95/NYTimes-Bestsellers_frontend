import React from 'react';
import './shelf.scss';

const Shelf = () => {
  return (
    <div className="shelf" data-testid="shelf">
      <div className="shelf-up"></div>
      <div className="shelf-front"></div>
      <div className="shelf-shadow">
        <div className="shelf-shadow--1"></div>
        <div className="shelf-shadow--2"></div>
        <div className="shelf-shadow--3"></div>
      </div>
    </div>
  );
};

export default Shelf;
