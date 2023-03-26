import React from 'react';
import './markedBooksContainer.scss';

type Props = {
  children: React.ReactNode;
  heading: string;
};

const MarkedBooksContainer = ({ children, heading }: Props) => {
  return (
    <div className="markedBooksContainer">
      <h1 data-testid={heading === 'Bookmarks' ? 'bookmarks' : 'finished'}>
        {heading}
      </h1>
      {children}
    </div>
  );
};

export default MarkedBooksContainer;
