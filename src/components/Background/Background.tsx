import React from 'react';
import './background.scss';

type Props = { children: React.ReactNode };

const Background = ({ children }: Props) => {
  return (
    <main className="background">
      <div className="container">{children}</div>
    </main>
  );
};

export default Background;
