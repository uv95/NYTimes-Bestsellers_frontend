import React from 'react';
import './menu.scss';

type Props = { children: React.ReactNode };

const Menu = ({ children }: Props) => {
  return (
    <menu id="menu" className="menu">
      {children}
    </menu>
  );
};

export default Menu;
