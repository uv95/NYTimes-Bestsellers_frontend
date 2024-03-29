import React from 'react';
import './background.scss';
import Header from '../Header/Header';

type Props = { children: React.ReactNode };

const Background = ({ children }: Props) => {
  return (
    <main className="background">
      <div className="container">
        <Header />
        <div className="container__content">{children}</div>
      </div>
    </main>
  );
};

export default Background;
