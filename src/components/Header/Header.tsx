import React, { useState } from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import { ReactComponent as Books } from '../../assets/icons/books.svg';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import {
  BOOKMARKS_ROUTE,
  FINISHED_BOOKS_ROUTE,
  HOME_ROUTE,
} from '../../utils/consts';

const Header = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('Bestsellers');

  return (
    <div className="header">
      <div className="header__section header__section--1">
        <h1>
          TheNewYorkTimes<span>BestSellers</span>
        </h1>
      </div>

      <div className="header__section header__section--2">
        <Button
          text="Trending"
          Icon={Books}
          isActive={currentPage === 'Bestsellers'}
          onClick={() => {
            setCurrentPage('Bestsellers');
            navigate(HOME_ROUTE);
          }}
        />
      </div>

      <div className="header__section header__section--3">
        <Button
          text="Bookmarks"
          Icon={Bookmark}
          isActive={currentPage === 'Bookmarks'}
          onClick={() => {
            setCurrentPage('Bookmarks');
            navigate(BOOKMARKS_ROUTE);
          }}
        />

        <Button
          text="Finished books"
          Icon={Checked}
          isActive={currentPage === 'Finished'}
          onClick={() => {
            setCurrentPage('Finished');
            navigate(FINISHED_BOOKS_ROUTE);
          }}
        />

        <Link to={''}>
          <User className="single-icon" />
        </Link>

        <Dots className="single-icon" />
      </div>
    </div>
  );
};

export default Header;
