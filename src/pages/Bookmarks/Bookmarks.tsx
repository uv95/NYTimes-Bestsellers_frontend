import React, { useState } from 'react';
import BookCover from '../../components/BookCover/BookCover';
import BookDetails from '../../components/BookDetails/BookDetails';
import { useAppSelector } from '../../hooks';
import { IBookDetails } from '../../utils/types';
import './bookmarks.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import Container from '../../components/Container/Container';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/UI/Button/Button';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';

const Bookmarks = () => {
  const { currentBestsellersList } = useAppSelector(
    (state) => state.bestsellers
  );
  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const closeMenuByClickingOutside = (e: React.BaseSyntheticEvent) => {
    e.target.id !== 'menu' &&
      e.target.id !== 'btn' &&
      openMenu.opened &&
      setOpenMenu({ ...openMenu, opened: false });
  };

  return (
    <Container heading="Bookmarks" onClick={closeMenuByClickingOutside}>
      <MarkedBooks>
        {currentBestsellersList.map((book: IBookDetails, i: number) => (
          <div key={book.title + i} className="bookmarks-book">
            <BookCover cover={book.cover} isSmall />
            <BookDetails bookDetails={book} index={i} isMarked />
            <Dots
              className={`single-icon ${
                openMenu.opened && book.title === openMenu.title
                  ? 'single-icon--opened'
                  : ''
              }`}
              onClick={() =>
                setOpenMenu({ title: book.title, opened: !openMenu.opened })
              }
            />
            {openMenu.opened && book.title === openMenu.title ? (
              <Menu>
                <Button Icon={Bookmark} text="Bookmarked" isLeftAligned />
                <Button Icon={Checked} text="Finished" isLeftAligned />
              </Menu>
            ) : null}
          </div>
        ))}
      </MarkedBooks>
    </Container>
  );
};

export default Bookmarks;
