import React from 'react';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';
import useGetMarkedBooks from '../hooks/useGetMarkedBooks';

const FinishedBooks = () => {
  const { finishedBooks, isLoading } = useGetMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Finished books" books={finishedBooks} />;
};

export default FinishedBooks;
