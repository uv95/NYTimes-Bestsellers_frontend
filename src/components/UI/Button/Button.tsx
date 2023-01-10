import React from 'react';
import './button.scss';
import { classNames } from '../../../utils/utils';

type Props = {
  hasOutline?: boolean;
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
        props.hasOutline && 'hasOutline'
      )}`}
    >
      <div className="btn__content">
        {props.icon && <img src={props.icon} alt="icon" />}
        {props.text}
      </div>
    </div>
  );
};

export default Button;
