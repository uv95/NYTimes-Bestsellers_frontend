import React, { useState } from 'react';
import Container from '../../components/Container/Container';
import MarkedBooks from '../../components/MarkedBooks/MarkedBooks';
import useGetMarkedBooks from '../../hooks/useGetMarkedBooks';
import { IBookDetails } from '../../utils/types';
import './finished.scss';
import { ReactComponent as Dots } from '../../assets/icons/menu-dots-vertical.svg';
import { ReactComponent as Bookmark } from '../../assets/icons/bookmark.svg';
import { ReactComponent as Checked } from '../../assets/icons/checkbox.svg';
import BookCover from '../../components/BookCover/BookCover';
import BookDetails from '../../components/BookDetails/BookDetails';
import Menu from '../../components/Menu/Menu';
import Button from '../../components/UI/Button/Button';

type Props = {};

const FinishedBooks = (props: Props) => {
  const { finishedBooks, isLoading } = useGetMarkedBooks();

  const [openMenu, setOpenMenu] = useState({ title: '', opened: false });

  const closeMenuByClickingOutside = (e: React.BaseSyntheticEvent) => {
    e.target.id !== 'menu' &&
      e.target.id !== 'btn' &&
      openMenu.opened &&
      setOpenMenu({ ...openMenu, opened: false });
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <Container heading="Finished books" onClick={closeMenuByClickingOutside}>
      <MarkedBooks>
        {finishedBooks.map((book: IBookDetails, i: number) => (
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

export default FinishedBooks;
