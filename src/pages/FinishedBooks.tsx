import React from 'react';
import useGetMarkedBooks from '../hooks/useGetMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';

const FinishedBooks = () => {
  const { finishedBooks, isLoading } = useGetMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Finished books" books={finishedBooks} />;
};

export default FinishedBooks;
