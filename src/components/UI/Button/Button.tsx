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
  hasMobileVersion?: boolean;
  ariaLabel?: string;
  type?: 'submit';
};

const Button = ({ Icon, ...props }: Props) => {
  return (
    <button
      aria-label={props.ariaLabel}
      onClick={props.onClick}
      className={`btn ${classNames(
        'btn',
        props.isActive && 'active',
        props.hasOutline && 'hasOutline',
        props.isPreloader && 'isPreloader',
        props.isColored && 'colored',
        props.isLeftAligned && 'leftAligned',
        props.hasMobileVersion && 'mobile'
      )}`}
      disabled={props.isDisabled}
      type={props.type || 'button'}
    >
      <div
        className={`btn__content ${
          props.isActive ? 'btn--active__content' : ''
        } ${props.hasOutline ? 'btn--hasOutline__content' : ''}`}
      >
        {Icon && <Icon className="icon" />}
        {props.text && <p className="btn__content--text">{props.text}</p>}
      </div>
    </button>
  );
};

export default Button;
