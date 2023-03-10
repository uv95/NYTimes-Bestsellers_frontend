import React from 'react';
import './container.scss';

type Props = {
  children: React.ReactNode;
  heading: string;
};

const Container = ({ children, heading }: Props) => {
  return (
    <div className="container">
      <h1 data-testid={heading === 'Bookmarks' ? 'bookmarks' : 'finished'}>
        {heading}
      </h1>
      {children}
    </div>
  );
};

export default Container;
