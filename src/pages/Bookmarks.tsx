import React from 'react';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';
import useGetMarkedBooks from '../hooks/useGetMarkedBooks';

const Bookmarks = () => {
  const { bookmarkedBooks, isLoading } = useGetMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Bookmarks" books={bookmarkedBooks} />;
};

export default Bookmarks;
