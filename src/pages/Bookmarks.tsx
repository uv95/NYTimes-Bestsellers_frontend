import React from 'react';
import '../components/MarkedBooks/markedBooks.scss';
import useGetMarkedBooks from '../hooks/useGetMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';

const Bookmarks = () => {
  const { bookmarkedBooks, isLoading } = useGetMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Bookmarks" books={bookmarkedBooks} />;
};

export default Bookmarks;
