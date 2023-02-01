import React, { useState } from 'react';
import './header.scss';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button/Button';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import { ReactComponent as Books } from '../../assets/icons/books.svg';
import { ReactComponent as Login } from '../../assets/icons/login.svg';

import {
  BOOKMARKS_ROUTE,
  FINISHED_BOOKS_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  USER_ACCOUNT_ROUTE,
} from '../../utils/consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Menu from '../Menu/Menu';
import { logout } from '../../features/user/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState('Bestsellers');
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <div
        className="menu-background"
        style={{ zIndex: `${openMenu ? '3' : '-1'}` }}
        onClick={() => setOpenMenu(false)}
      ></div>
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

        <div
          style={{ zIndex: `${openMenu ? '3' : '1'}` }}
          className="header__section header__section--3"
        >
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

          {user ? (
            <div
              style={{
                position: 'relative',
              }}
            >
              <User
                className="single-icon"
                onClick={() => setOpenMenu(!openMenu)}
              />
              {openMenu ? (
                <Menu>
                  <Button
                    text="Profile"
                    isLeftAligned
                    onClick={() => {
                      navigate(USER_ACCOUNT_ROUTE);
                      setOpenMenu(false);
                    }}
                  />

                  <Button
                    text="Log out"
                    isLeftAligned
                    onClick={() => {
                      dispatch(logout());
                      navigate('/');
                      setOpenMenu(false);
                    }}
                  />
                </Menu>
              ) : null}
            </div>
          ) : (
            <Login
              className="single-icon"
              onClick={() => navigate(LOGIN_ROUTE)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
