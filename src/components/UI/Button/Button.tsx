import React from 'react';
import './button.scss';
import { classNames } from '../../../utils/utils';

type Props = {
  hasOutline?: boolean;
  isActive?: boolean;
  text: string;
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
};

const Button = ({ Icon, ...props }: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={`btn ${classNames(
        'btn',
        props.isActive && 'active',
        props.hasOutline && 'hasOutline'
      )}`}
    >
      <div
        className={`btn__content ${classNames(
          'btn',
          props.isActive && 'active',
          props.hasOutline && 'hasOutline'
        )}__content`}
      >
        {Icon && <Icon className="icon" />}
        {props.text}
      </div>
    </div>
  );
};

export default Button;
