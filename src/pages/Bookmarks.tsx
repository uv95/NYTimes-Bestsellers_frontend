import React from 'react';
import '../components/MarkedBooks/markedBooks.scss';
// import useMarkedBooks from '../hooks/useMarkedBooks';
import MarkedBooks from '../components/MarkedBooks/MarkedBooks';
import { markedBooks } from '../store-mobX';
import { observer } from 'mobx-react-lite';
import { useGetMarkedBooks } from '../hooks/useGetMarkedBooks';

const Bookmarks = observer(() => {
  const { bookmarkedBooks } = useGetMarkedBooks();
  // const { bookmarkedBooks } = useMarkedBooks();

  //REDUX 🔵
  // const { bookmarkedBooks, isLoading } = useMarkedBooks();
  // if (isLoading) return <p className="isLoading">Loading...</p>;

  //MOBX 🔶
  if (markedBooks.state === 'pending')
    return <p className="isLoading">Loading...</p>;

  return <MarkedBooks heading="Bookmarks" books={bookmarkedBooks} />;
});

export default Bookmarks;
