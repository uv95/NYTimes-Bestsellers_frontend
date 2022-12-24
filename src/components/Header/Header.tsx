import React, { useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import heart from '../../assets/icons/heart.svg';
import books from '../../assets/icons/books.svg';
import dots from '../../assets/icons/menu-dots-vertical.svg';
import search from '../../assets/icons/search.svg';

type Props = {};

const Header = (props: Props) => {
  const [currentPage, setCurrentPage] = useState('Bestsellers');

  return (
    <div className="header">
      <div className="header__section header__section--1">
        <h1>BOOKS</h1>
      </div>
      <div className="header__section header__section--2">
        <Button
          text="Bestsellers"
          icon={books}
          isActive={currentPage === 'Bestsellers'}
          onClick={() => setCurrentPage('Bestsellers')}
        />
        <Button
          text="Search"
          icon={search}
          isActive={currentPage === 'Search'}
          onClick={() => setCurrentPage('Search')}
        />
      </div>
      <div className="header__section header__section--3">
        <Link to={''}>
          <img className="favorites" src={heart} alt="favorites" />
        </Link>
        <Link to={''}>
          <div className="userPic"></div>
        </Link>

        <img className="menu" src={dots} alt="menu" />
      </div>
    </div>
  );
};

export default Header;
