import React from 'react';
import '../components/MarkedBook/markedBook.scss';
import Container from '../components/Container/Container';
import MarkedBook from '../components/MarkedBook/MarkedBook';
import useGetMarkedBooks from '../hooks/useGetMarkedBooks';
import { IBookDetails } from '../utils/types';

const FinishedBooks = () => {
  const { finishedBooks, isLoading } = useGetMarkedBooks();

  if (isLoading) return <p>Loading...</p>;

  return (
    <Container heading="Finished books">
      <div className="markedBooks">
        {finishedBooks.map((book: IBookDetails, i: number) => (
          <MarkedBook key={book.title + book.author} book={book} index={i} />
        ))}
      </div>
    </Container>
  );
};

export default FinishedBooks;
