import React from 'react';
import './container.scss';

type Props = {
  children: React.ReactNode;
  heading: string;
  onClick?: any;
  // onClick?: () => void;
};

const Container = ({ children, heading, onClick }: Props) => {
  return (
    <div className="container" onClick={onClick}>
      <h1>{heading}</h1>
      {children}
    </div>
  );
};

export default Container;
