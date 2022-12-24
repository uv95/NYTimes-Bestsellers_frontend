import React from 'react';
import './button.scss';
import { classNames } from '../../../utils/utils';

type Props = {
  outline?: boolean;
  isActive?: boolean;
  text: string;
  icon?: string;
  onClick: () => void;
};

const Button = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={`btn ${classNames(
        'btn',
        props.isActive && 'active',
        props.outline && 'outline'
      )}`}
    >
      <div className="btn__content">
        <img src={props.icon} alt="icon" />
        {props.text}
      </div>
    </div>
  );
};

export default Button;
