import React from 'react';
import './marked.scss';

type Props = { children: React.ReactNode; heading: string };

const MarkedBooks = ({ children, heading }: Props) => {
  return (
    <div className="marked">
      <h1>{heading}</h1>
      <div className="marked__content">{children}</div>
    </div>
  );
};

export default MarkedBooks;
