import React from 'react';
import useMarkedBooks from '../hooks/useMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';
import { markedBooks } from '../store-mobX';
import { observer } from 'mobx-react-lite';
import { useGetMarkedBooks } from '../hooks/useGetMarkedBooks';

const FinishedBooks = observer(() => {
  const { finishedBooks } = useGetMarkedBooks();
  // const { finishedBooks } = useMarkedBooks();

  //REDUX 🔵
  // const { finishedBooks, isLoading } = useMarkedBooks();
  // if (isLoading) return <p>Loading...</p>;

  //MOBX 🔶
  if (markedBooks.state === 'pending')
    return <p className="isLoading">Loading...</p>;

  return <MarkedBooks heading="Finished books" books={finishedBooks} />;
});

export default FinishedBooks;
