import React from 'react';
import '../components/MarkedBooks/markedBooks.scss';
import useMarkedBooks from '../hooks/useMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';

const Bookmarks = () => {
  const { bookmarkedBooks, isLoading } = useMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Bookmarks" books={bookmarkedBooks} />;
};

export default Bookmarks;
