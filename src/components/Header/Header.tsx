import React, { useState } from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import { ReactComponent as Books } from '../../assets/icons/books.svg';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';

const Header = () => {
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
          onClick={() => setCurrentPage('Bestsellers')}
        />
      </div>

      <div className="header__section header__section--3">
        <Button
          text="Bookmarks"
          Icon={Bookmark}
          isActive={currentPage === 'Bookmarks'}
          onClick={() => setCurrentPage('Bookmarks')}
        />
        <Button
          text="Finished books"
          Icon={Checked}
          isActive={currentPage === 'Finished'}
          onClick={() => setCurrentPage('Finished')}
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
