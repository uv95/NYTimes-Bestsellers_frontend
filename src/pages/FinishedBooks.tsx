import React from 'react';
import useMarkedBooks from '../hooks/useMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';

const FinishedBooks = () => {
  const { finishedBooks, isLoading } = useMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return <MarkedBooks heading="Finished books" books={finishedBooks} />;
};

export default FinishedBooks;
