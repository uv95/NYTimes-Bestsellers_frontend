import React from 'react';
import './button.scss';
import { classNames } from '../../../utils/classNames';

type Props = {
  hasOutline?: boolean;
  isActive?: boolean;
  isColored?: boolean;
  isLeftAligned?: boolean;
  text?: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick?: (arg?: React.FormEvent<HTMLFormElement> | any) => void;
  isPreloader?: boolean;
  isDisabled?: boolean;
};

const Button = ({ Icon, ...props }: Props) => {
  return (
    <button
      id="btn"
      onClick={props.onClick}
      className={`btn ${classNames(
        'btn',
        props.isActive && 'active',
        props.hasOutline && 'hasOutline',
        props.isPreloader && 'isPreloader',
        props.isColored && 'colored',
        props.isLeftAligned && 'leftAligned'
      )}`}
      disabled={props.isDisabled}
    >
      <div
        id="btn"
        className={`btn__content ${
          props.isActive ? 'btn--active__content' : ''
        } ${props.hasOutline ? 'btn--hasOutline__content' : ''}`}
      >
        {Icon && <Icon className="icon" id="btn" />}
        {props.text}
      </div>
    </button>
  );
};

export default Button;
