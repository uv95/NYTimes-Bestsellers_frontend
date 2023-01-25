import React from 'react';
import './markedBooks.scss';

type Props = { children: React.ReactNode };

const MarkedBooks = ({ children }: Props) => {
  return <div className="markedBooks">{children}</div>;
};

export default MarkedBooks;
